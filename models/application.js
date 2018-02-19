const Sequelize         = require('sequelize');

module.exports = function(sequelize)
{
    let Model = sequelize.define('Application', {
        name: {
            type: Sequelize.STRING
        }
    }, {
      freezeTableName: true // Model tableName will be the same as the model name
    });

    return Model;
}