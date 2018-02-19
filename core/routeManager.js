/**
 * @autor       Kristof Friess
 * @company     Zebresel
 * @copyright   Since 2018 by Zebresel - Deine Agentur für digitale Medien
 * @description Manager for all routings, simple adding controllers and views
 */

/*jshint esversion: 6 */
/*jshint node: true*/

const bodyParser = require('body-parser');

class RouteManager
{
	constructor(app, routes)
	{
		const self = this;

		self._app = app;
		self._routes = routes;

		// if the use transmit a path try require
		if(typeof self._routes === 'string')
		{
			self._routes = require(self._routes);
		}

		// setup the routes in express
		self.init();
	}

	init()
	{
		const self = this;
		// configuring express to use body-parser
		self._app.use(bodyParser.urlencoded({limit: '512mb', extended: true }));
		self._app.use(bodyParser.json({limit: '512mb'}));

		for (let path in self._routes)
		{
			let route  = self._routes[path];
			let method = route.method;

			self._app[method](path, function(req, res) {

				let actionName = 'action' + route.action[0].toUpperCase() + route.action.slice(1);
				let controllerClass = route.__controllerClass;

				// only load class if not already loaded
				if(!controllerClass)
				{
					controllerClass = route.__controllerClass = require(__dirname + '/../controller/' + route.controller + 'Controller.js');
				}

				let controllerInstance = new controllerClass(self._app, req, res, route.controller, route.action, route.method);

				// generate a next function for the init method
				let next = function(){
					controllerInstance[actionName]();
				};

				if(controllerInstance.init)
				{
					controllerInstance.init(next);
				}
				else
				{
					next();
				}
			});
		}	
	}
}

module.exports = RouteManager;