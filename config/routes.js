/**
 * @autor       Kristof Friess
 * @company     Zebresel
 * @copyright   Since 2018 by Zebresel - Deine Agentur für digitale Medien
 * @description Default Routing System              
 */

/*jshint esversion: 6 */
/*jshint node: true*/

module.exports =  {
	'/' : { 'controller' : 'pages', 'action' : 'index', 'method' : 'get' },

	// Frontend Routes (no REST used)
	'/application-dashboard/:id' : { 'controller' : 'pages', 'action' : 'applicationDashboard', 'method' : 'get' },

	// API Routes
	'/posts' : { 'controller' : 'posts', 'action' : 'index', 'method' : 'get' },
	'/applications/:appId/posts/' : { 'controller' : 'posts', 'action' : 'index', 'method' : 'get' },
	'/applications/:appId/dashboard/' : { 'controller' : 'dashboard', 'action' : 'application', 'method' : 'get' },
	'/posts' : { 'controller' : 'posts', 'action' : 'create', 'method' : 'post' },

	// Error Routes
	'/errors/:code' : { 'controller' : 'errors', 'action' : 'index', 'method' : 'get' },
};