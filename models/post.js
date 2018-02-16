const Sequelize         = require('sequelize');

module.exports = function(sequelize)
{
    let Post = sequelize.define('Post', {
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
      freezeTableName: true // Model tableName will be the same as the model name
    });

    return Post;
}