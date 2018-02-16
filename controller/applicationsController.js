/**
 * @autor       Kristof Friess
 * @company     Zebresel
 * @copyright   Since 2018 by Zebresel - Deine Agentur für digitale Medien
 */

/*jshint esversion: 6 */
/*jshint node: true*/

const ViewController = require('./../core/viewController.js');

class ApplicationsController extends ViewController
{
	init(next)
	{
		self.format = ViewController.FORMATS.JSON;
		next();
	}

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
}

module.exports = ApplicationsController;