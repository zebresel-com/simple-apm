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

class PostsController extends MainController
{

	constructor(app, req, res, controller, action, method)
	{
		super(app, req, res, controller, action, method);

		if(action === 'create')
		{
			this.userNeeded = false;
			this.loginNeeded = false;
		}
	}

	init(next)
	{
		// default self wrap
		const self = this;

		// default format is JSON
		self.format = MainController.FORMATS.JSON;

		// app only actions
		const onlyApp = ['create'];

		// check correct contenttyp
		let contype = self._req.headers['content-type'];
		if ((self._method === 'POST' || self._method === 'PUT') && (!contype || contype.indexOf('application/json') === -1))
		{
			self.render({}, {
				status: 401
			});
		}
		else if(onlyApp.indexOf(self._action) !== -1)
		{
			// check application is selected
			let secret = self._req.headers['x-apm-app-secret'];
			// retreive all applications for a list display
			self._app.models.Application.findOne({
				where: {
				    deleted: false,
				    appSecret: secret
				}
			}).then(function(application){

				self._req.application = application;
				next();

			});
		}
		else
		{
			next();
		}
	}

	actionCreate()
	{
		// default self wrap
		const self = this;

		// const variables for models
		const Post = self._app.models.Post;

		// remote params
		let remotePost = self.param('post');
		let remotePosts = self.param('posts');

		console.log(remotePost, remotePosts);

		if(remotePost)
		{
			remotePost.application = self._req.application.get('id');

			// create new post with params
			Post.create(remotePost).then(function(post){

				// check dispatch is needed?
				if(remotePost.type === 'http')
				{
					self.dispatchTypeHttp(remotePost);
				}

			});
		}
		// multiupdate
		else if(remotePosts)
		{
			for (let i = 0; i < remotePosts.length; i++)
			{
				remotePosts[i].application = self._req.application.get('id');

				// create new post with params
				Post.create(remotePosts[i]).then(function(post){
					// check dispatch is needed?
					if(remotePosts[i].type === 'http')
					{
						self.dispatchTypeHttp(remotePosts[i]);
					}
				});
			}
		}

		// alwaye all is fine!
		self.render({
			'status':'ok'
		});
	}

	actionIndex()
	{
		// default self wrap
		const self = this;

		// const variables for models
		const Post = self._app.models.Post;

		// filtered  by app?
		const appId = self.param('appId');

		// is there a defined time?
		const postTime = self.param('past-time') || 900; // last 15mins in s

		let where = {
			startTime: {
				[Op.gte] : Date.now() - (postTime * 1000)
			}
		};

		if(appId)
		{
			where.application = Number(appId);
		}

		// retreive all applications for a list display
		Post.findAll({
			where: where,
			order: [['startTime']]
		}).then(function(posts){

			let result = {};
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

				post.data = JSON.parse(post.data);
				if(type === 'cpu')
				{
					result[type].push({
						usage: post.data.usage,
						time: post.startTime.getTime()
					});
				}
				else if(type === 'memory')
				{
					result[type].push({
						total: post.data.total / 1024 / 1024, // converted to MB
						free: post.data.free / 1024 / 1024, // converted to MB
						time: post.startTime.getTime()
					});
				}
				else if(type === 'http')
				{
					result[type].push(post);
				}
			}

			if(result.cpu && result.cpu.length > 0)
			{
				result.cpuUsage = result.cpu[result.cpu.length - 1].usage;
			}
			else
			{
				result.cpuUsage = -1.0;
			}


			if(result.memory && result.memory.length > 0)
			{
				result.memoryFree = result.memory[result.memory.length - 1].free;
				result.memoryUsed = result.memory[result.memory.length - 1].total - result.memoryFree;
			}
			else
			{
				result.memoryFree = -1.0;
				result.memoryUsed = -1.0;
			}
			

			self.render({
				posts: posts,
				dashboard: result
			});
		});
	}


	dispatchTypeHttp(remotePost)
	{
		const self = this;
		const Http = self._app.models.Http;
		const path = remotePost.data.path;

		// check path is available
		if(path)
		{
			// check there is already an entry?
			Http.findOne({
				where: {
					deleted: false,
					path: path
				}
			}).then(function(http){

				if(!http)
				{
					http = Http.build();
				}

				http.path = path;
				http.count += 1;

				http.max = http.max > remotePost.data.duration ? http.max : remotePost.data.duration;
				// FIXME: Min === 0 is not the best start value
				http.min = (http.min !== 0 && http.min < remotePost.data.duration) ? http.min : remotePost.data.duration;
				http.avg = ((http.avg * (http.count-1))  + remotePost.data.duration) / http.count;

				http.save().then(function() {

		            // Save done

		        }).catch(function (err) {
		            console.error('Save of http failed', err);
		        });
			});
		}
	}
}

module.exports = PostsController;