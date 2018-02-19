/**
 * @autor       Kristof Friess
 * @company     Zebresel
 * @copyright   Since 2018 by Zebresel - Deine Agentur für digitale Medien
 * @description Default Routing System              
 */

/*jshint esversion: 6 */
/*jshint node: true*/

const MainController = require('./mainController.js');
const errorMessages = require('./../core/helper/httpErrors.js');

class ErrorsController extends MainController
{
	constructor(app, req, res, controller, action, method)
	{
		super(app, req, res, controller, action, method);

		this.loginNeeded = false;
	}

	init(next)
	{
		// default self wrap
		const self = this;
		
		if(self._req.headers['accept'].indexOf('application/json') !== -1)
		{
			self.format = ViewController.FORMATS.JSON;
		}

		next();
	}

	actionIndex()
	{
		// default self wrap
		const self = this;

		// const variables for models
		const errorCode = self.param('code') || 500;

		let message = self.codeMessage(errorCode)
		message.code = errorCode;
		self.render({
			error: message
		}, { status: errorCode});
	}

	codeMessage(code)
	{
		let msg = errorMessages[code];
		if(msg)
		{
			return msg;
		}

		return errorMessages['500'];
	}
}

module.exports = ErrorsController;