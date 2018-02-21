const Sequelize         = require('sequelize');

module.exports = function(sequelize)
{
    let Model = sequelize.define('Http', {
        path: {
            type: Sequelize.STRING,
            allowNull: false
        },
        method: {
            type: Sequelize.STRING,
            allowNull: false
        },
        min: {
        	type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        max: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        avg: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        count: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        application: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
      freezeTableName: true // Model tableName will be the same as the model name
    });

    return Model;
}