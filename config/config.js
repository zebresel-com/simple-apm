/**
 * @autor       Kristof Friess
 * @company     Zebresel
 * @copyright   Since 2018 by Zebresel - Deine Agentur für digitale Medien
 * @description Used global configuration
 */

/*jshint esversion: 6 */
/*jshint node: true*/

module.exports =  {
	'db' : { 
		'host': process.env.DB_HOST || 'localhost',
		'user': process.env.DB_USER || 'root',
		'password': process.env.DB_PASSWORD || 'root',
		'name': process.env.DB_NAME || 'simple_apm',
		'dialect': process.env.DB_DIALECT || 'mysql',	// 'mysql' or 'mariadb' or 'sqlite' or 'postgres' or 'mssql'
		//'path' : process.env.DB_PATH || 'data/amp.sqlite' // used for sqlite only
	},
	'port' : process.env.PORT || 3000,
	'sslPort' : process.env.SSL_PORT || 3443,
	'sessionSecret' : process.env.SESSION_SECRET || '5g8289b9Cc2p36T26Lj97cu45ef3w86T1V1r4K8QiG366K93Z8Xj19k3Y74259VP',
};