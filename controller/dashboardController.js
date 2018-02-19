/**
 * @autor       Kristof Friess
 * @company     Zebresel
 * @copyright   Since 2018 by Zebresel - Deine Agentur für digitale Medien
 */

/*jshint esversion: 6 */
/*jshint node: true*/

const MainController = require('./mainController.js');

const Sequelize = require('sequelize');
const Op 		= Sequelize.Op

class DashboardController extends MainController
{
	init(next)
	{
		// default self wrap
		const self = this;

		// default format is JSON
		self.format = MainController.FORMATS.JSON;

		next();
	}

	/**
	 * This Method will render the application dashboard view.
	 */
	actionApplication()
	{
		// default self wrap
		const self = this;

		// const variables for models
		const Post 			= self._app.models.Post;
		const Application 	= self._app.models.Application;
		const Http 			= self._app.models.Http;

		// filtered  by app?
		const appId = self.param('appId');

		// is there an app id? should be so check the app is real
		Application.findOne({
			where: {
				deleted: false,
				id: Number(appId)
			}
		}).then(function(application){
			
			// no application found?
			if(!application)
			{
				self.redirect('/errors/404');
			}
			else
			{
				// retreive all dashboard data for display
				 
				// is there a defined time?
				const postTime = self.param('past-time') || 900; // last 15mins in s

				let where = {
					startTime: {
						[Op.gte] : Date.now() - (postTime * 1000)
					},
					type: {
						[Op.or] : ['memory', 'cpu', 'disk']
					},
					application: application.id
				};

				// -- Normal SQL to get every 10s 
				// SELECT COUNT(id), MAX(status) FROM `post` WHERE `startTime` >= '2018-02-15 19:15:00' GROUP BY UNIX_TIMESTAMP(`startTime`) DIV 10
				Post.findAll({
					where: where,
					order: [['startTime']],
					group: [
						[
							'type'
						],
						[
							self._app.sequelize.fn('UNIX_TIMESTAMP', self._app.sequelize.col('startTime')),
							self._app.sequelize.literal('DIV 10')
						]
					]
				}).then(function(posts){

					let result = {};
					let chart = {};
					let post = null;
					let type = null;
					// prepare for display
					for (let i = 0; i < posts.length; i++)
					{
						post = posts[i];
						type = post.type;

						// create array for type if needed
						if(!result[type])
						{
							result[type] = [];
						}
						
						// create array for type if needed
						if(!chart[type])
						{
							chart[type] = {
								labels : [],
								values : [],
								appValues : [],
							};
						}

						post.data = JSON.parse(post.data);
						if(type === 'cpu')
						{
							result[type].push({
								usage: post.data.usage,
								appUsage: post.data.appUsage,
								free: post.data.cores * 100 - post.data.usage,
								time: post.startTime.getTime()
							});

							chart[type].labels.push(post.startTime);
							chart[type].appValues.push(post.data.appUsage);
							chart[type].values.push(post.data.usage);
						}
						else if(type === 'memory')
						{
							result[type].push({
								total: post.data.total / 1024 / 1024, // converted to MiB
								free: post.data.free / 1024 / 1024, // converted to MiB
								app: post.data.app / 1024 / 1024, // converted to MiB
								time: post.startTime.getTime()
							});

							chart[type].labels.push(post.startTime);
							chart[type].appValues.push(post.data.app / 1024 / 1024);
							chart[type].values.push((post.data.total - post.data.free) / 1024 / 1024);
						}
						else if(type === 'disk')
						{
							result[type].push({
								used: (post.data.total - post.data.free) / 1000 / 1000, // converted to MB
								free: post.data.free / 1000 / 1000, // converted to MB
							});
						}
						else if(type === 'http')
						{
							result[type].push(post);
						}
					}

					if(result.cpu && result.cpu.length > 0)
					{
						result.cpuApp = result.cpu[result.cpu.length - 1].appUsage;
						result.cpuOther = result.cpu[result.cpu.length - 1].usage - result.cpuApp;
						result.cpuFree = result.cpu[result.cpu.length - 1].free;
					}
					else
					{
						result.cpuOther = -1.0;
						result.cpuApp = -1.0;
						result.cpuFree = -1.0;
					}


					if(result.memory && result.memory.length > 0)
					{
						result.memoryFree = result.memory[result.memory.length - 1].free;
						result.memoryApp = result.memory[result.memory.length - 1].app;
						result.memoryOther = result.memory[result.memory.length - 1].total - (result.memoryFree + result.memoryApp);
					}
					else
					{
						result.memoryFree = -1.0;
						result.memoryApp = -1.0;
						result.memoryOther = -1.0;
					}

					if(result.disk && result.disk.length > 0)
					{
						result.diskFree = result.disk[result.disk.length - 1].free;
						result.diskUsed = result.disk[result.disk.length - 1].used;
					}
					else
					{
						result.diskFree = -1.0;
						result.diskUsed = -1.0;
					}


					result.chart = chart;

					// retrieve http requests
					Http.findAll({
						where: {
							deleted: false
						},
						order: [['max', 'DESC']],
					}).then(function(https){

						result.https = https;

						self.render({
							dashboard: result
						});

					}).catch(function (err) {
			  			self.redirect('/errors/500');
			  			console.error('Tryed to retrive an application, but failed', err);
					});
				});
			}
			

		}).catch(function (err) {
  			self.redirect('/errors/500');
  			console.error('Tryed to retrive an application, but failed', err);
		});
	}
}

module.exports = DashboardController;