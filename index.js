/**
 * @autor       Kristof Friess
 * @company     Zebresel
 * @copyright   Since 2018 by Zebresel - Deine Agentur für digitale Medien
 * @description This is the main controller which initialized the APM Webpage and API              
 */

/*jshint esversion: 6 */
/*jshint node: true*/

// CLASSES
const RouteManager      = require('./core/routeManager.js');
const Sequelize         = require('sequelize');

// Variables
const express           = require('express');
const app               = express();
const http              = require('http').Server(app);
const router            = new RouteManager(app, require('./config/routes.js'))
const expressLess       = require('express-less');
const env               = require('node-env-file');
const fs                = require('fs');
const i18n              = require('i18n');

// Load another ENV file - and overwrite any defined ENV variables.
if(fs.existsSync(__dirname + '/.env'))
{
    env(__dirname + '/.env', {overwrite: true});
}

// setup i18n
i18n.configure({
    locales:['en'],
    directory: __dirname + '/messages',
    api: {
      '__': 't',  //now req.__ becomes req.t 
      '__n': 'tn' //and req.__n can be called as req.tn 
    }
});

// Config should be load after env, because of overwrites
app.config = require('./config/config.js');

// static routes
app.use('/assets', express.static('assets'));

// initial setup for css
app.use('/assets/css', expressLess(__dirname + '/src/less', { compress: true }));

// combine express and i18n
app.use(i18n.init);

// setup database
app.sequelize = new Sequelize(app.config.db.name, app.config.db.user, app.config.db.password, {
    host: app.config.db.host,
    dialect: app.config.db.dialect,
    logging: true, // SQL Logging
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

    // Used for SQLite only
    // storage: app.config.db.path // like 'path/to/database.sqlite'
});

// load all models to app
app.models = {};

const modelDir = './models';
const modelFiles = fs.readdirSync(modelDir);

for (let i = modelFiles.length - 1; i >= 0; i--)
{
    let className = modelFiles[i].charAt(0).toUpperCase() + modelFiles[i].substr(1, modelFiles[i].length - 4);
    app.models[className] = require(modelDir + '/' + modelFiles[i])(app.sequelize);
}

// start simple server to read
http.listen(app.config.port, function() {
    console.log('listening on *:' + this.address().port);
});
