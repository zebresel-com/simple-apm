const Sequelize         = require('sequelize');
const bcrypt 			= require('bcrypt');

module.exports = function(sequelize)
{
    let Model = sequelize.define('User', {
        name: {
            type: Sequelize.STRING(60),
            allowNull: false
        },
        email: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        passwordHash: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        failedLoginCount: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        lastLogin: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        lastActive: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        enabled: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        permissions: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
        
    }, {
       tableName: 'user',
       freezeTableName: true // Model tableName will be the same as the model name
    });

    Model.prototype.toJSON = function()
    {
    	let jsonObj = this.get();

    	delete jsonObj.deleted;
    	delete jsonObj.passwordHash;

    	return jsonObj;
    };

    Model.prototype.writeRemote = function(remote)
    {
    	if(remote.name)
    	{
    		this.name = remote.name;
    	}

    	if(remote.email)
    	{
    		this.email = remote.email;
    	}

    	if(remote.enabled)
    	{
    		this.enabled = remote.enabled;
    	}

    	if(remote.permissions)
    	{
    		this.permissions = remote.permissions;
    	}


    	if(remote.password)
    	{
    		this.passwordHash = bcrypt.hashSync(remote.password, 10);
    	}
    }

    Model.prototype.comparePassword = function(password)
    {
    	return bcrypt.compareSync(password, this.passwordHash);
    }

    return Model;
}