const Sequelize         = require('sequelize');

module.exports = function(sequelize)
{
    let Model = sequelize.define('Post', {
        type: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: {
        	type: Sequelize.INTEGER
        },
        startTime: {
        	type: Sequelize.DATE
        },
        endTime: {
        	type: Sequelize.DATE
        },
        data: {
            type: Sequelize.JSON
        },
        application: {
            type: Sequelize.JSON
        },
    }, {
        tableName: 'post',
        freezeTableName: true // Model tableName will be the same as the model name
    });

    return Model;
}