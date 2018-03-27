const Sequelize         = require('sequelize');

module.exports = function(sequelize)
{
    let Model = sequelize.define('HttpRequest', {
        path: {
            type: Sequelize.STRING,
            allowNull: false
        },
        method: {
            type: Sequelize.STRING,
            allowNull: false
        },
        duration: {
        	type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        query: {
            type: Sequelize.STRING,
            allowNull: true
        },
        httpCode: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        application: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'httpRequest',
        freezeTableName: true // Model tableName will be the same as the model name
    });

    return Model;
}