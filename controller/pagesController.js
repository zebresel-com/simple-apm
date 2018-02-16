/**
 * @autor       Kristof Friess
 * @company     Zebresel
 * @copyright   Since 2018 by Zebresel - Deine Agentur für digitale Medien
 * @description Default Routing System              
 */

/*jshint esversion: 6 */
/*jshint node: true*/

const ViewController = require('./../core/viewController.js');

class PagesController extends ViewController
{
	// init(next)
	// {
	// 	console.log('before other actions');
	// 	next();
	// }

	actionIndex()
	{
		// default self wrap
		const self = this;

		// const variables for models
		const Application = self._app.models.Application;

		// retreive all applications for a list display
		Application.findAll({
			where: {
			    deleted: false
			}
		}).then(function(applications){

			self.render({
				applications: applications
			});
		});
	}

	actionApplicationDashboard()
	{
		// default self wrap
		const self = this;

		self.jsFiles = [
			'/assets/js/appDashboard.js'
		];

		// const variables for models
		const Application = self._app.models.Application;

		// retreive all applications for a list display
		Application.findOne({
			where: {
			    deleted: false,
			    id: self.param('id')
			}
		}).then(function(application){

			if(!application)
			{
				self.redirect('/errors/404');	
			}
			else
			{
				self.render({
					application: application
				});
			}
			
		}).catch(function (err) {
  			self.redirect('/errors/500');
  			console.error('Tryed to retrive an application, but failed', err);
		});;
	}
}

module.exports = PagesController;