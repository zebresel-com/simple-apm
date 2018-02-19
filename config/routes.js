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
	'/login' : { 'controller' : 'pages', 'action' : 'login', 'method' : 'get' },
	'/application-dashboard/:id' : { 'controller' : 'pages', 'action' : 'applicationDashboard', 'method' : 'get' },

	// API Routes
	'/posts' : { 'controller' : 'posts', 'action' : 'index', 'method' : 'get' },
	'/applications/:appId/posts/' : { 'controller' : 'posts', 'action' : 'index', 'method' : 'get' },
	'/applications/:appId/dashboard/' : { 'controller' : 'dashboard', 'action' : 'application', 'method' : 'get' },
	'/posts' : { 'controller' : 'posts', 'action' : 'create', 'method' : 'post' },

	// API Routes USERS
	'/users' : { 'controller' : 'users', 'action' : 'index', 'method' : 'get' },
	'/users' : { 'controller' : 'users', 'action' : 'create', 'method' : 'post' },
	'/users/:id' : { 'controller' : 'users', 'action' : 'show', 'method' : 'get' },
	'/users/:id' : { 'controller' : 'users', 'action' : 'update', 'method' : 'put' },
	'/users/:id' : { 'controller' : 'users', 'action' : 'destroy', 'method' : 'delete' },

	'/sign-in' : { 'controller' : 'users', 'action' : 'login', 'method' : 'post' },
	'/me' : { 'controller' : 'users', 'action' : 'me', 'method' : 'get' },

	// Error Routes
	'/errors/:code' : { 'controller' : 'errors', 'action' : 'index', 'method' : 'get' },
};