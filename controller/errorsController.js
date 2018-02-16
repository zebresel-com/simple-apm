/**
 * @autor       Kristof Friess
 * @company     Zebresel
 * @copyright   Since 2018 by Zebresel - Deine Agentur für digitale Medien
 * @description Default Routing System              
 */

/*jshint esversion: 6 */
/*jshint node: true*/

const ViewController = require('./../core/viewController.js');
const errorMessages = require('./../core/helper/errors.js');

class PagesController extends ViewController
{
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
		}, errorCode);
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

module.exports = PagesController;