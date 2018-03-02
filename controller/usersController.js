/**
 * @autor       Kristof Friess
 * @company     Zebresel
 * @copyright   Since 2018 by Zebresel - Deine Agentur für digitale Medien
 */

/*jshint esversion: 6 */
/*jshint node: true*/

const MainController = require('./mainController.js');
const errors         = require('./../core/helper/errors.js');

const Sequelize = require('sequelize');
const Op        = Sequelize.Op

class UsersController extends MainController
{
    init(next)
    {
        // default self wrap
        const self = this;

        super.init(function(){
            // default format is JSON
            self.format = MainController.FORMATS.JSON;

            next();
        });
    }

    actionIndex()
    {
        // default self wrap
        const self = this;

        // const variables for models
        const User = self._app.models.User;

        // retreive all users
        User.findAll({
            where: {
                deleted: false
            },
            order: [['name']]
        }).then(function(users) {

            self.render({
                users: users
            });

        }).catch(function (err) {
            self.redirect('/errors/500');
            console.error('Retrieve users failed', err);
        });
    }

    actionShow(userId)
    {
        // default self wrap
        const self = this;

        // const variables for models
        const User = self._app.models.User;

        // retreive all users
        User.findOne({
            where : {
                deleted: false,
                id: userId || self.param('id')
            }
        }).then(function(user) {

            if(!user)
            {
                self.redirect('/errors/404');
            }
            else
            {
                self.render({
                    user: user
                });
            }

        }).catch(function (err) {
            self.redirect('/errors/500');
            console.error('Retrieve user failed', err);
        });
    }

    actionMe()
    {
        this.actionShow(this._req.session.userId)
    }

    actionCreate()
    {
        // default self wrap
        const self = this;

        // const variables for models
        const User = self._app.models.User;

        // check remote data available?
        let remoteUser = self.param('user');

        if(!remoteUser)
        {
            self.redirect('/errors/406');
        }
        else
        {
            // generate new user
            let newUser = User.build();

            newUser.writeRemote(remoteUser);
            newUser.enabled = true;

            newUser.save().then(function() {

                self.render({
                    user: newUser
                });

            }).catch(function (err) {
                self.redirect('/errors/500');
                console.error('Create user failed', err);
            });
        }
    }

    actionUpdate()
    {
        // default self wrap
        const self = this;

        // const variables for models
        const User = self._app.models.User;

        // retreive all users
        User.findOne({
            where: {
                deleted: false,
                id: self.param('id')
            }
        }).then(function(user) {

            if(!user)
            {
                self.redirect('/errors/404');
            }
            else
            {
                let remoteUser = self.param('user');

                if(!remoteUser)
                {
                    self.redirect('/errors/400');
                }
                else
                {

                    user.update({
                        enabled: true
                    }).then(function(){
                        self.render({
                            user: user
                        });
                    }).catch(function (err) {
                        self.redirect('/errors/500');
                        console.error('Failed to update user failed', err);
                    });
                }
                
            }

        }).catch(function (err) {
            self.redirect('/errors/500');
            console.error('Retrieve user failed', err);
        });
    }

    actionDestroy()
    {
        // default self wrap
        const self = this;

        // const variables for models
        const User = self._app.models.User;

        // retreive all users
        User.findOne({
            where: {
                deleted: false,
                id: self.param('id')
            }
        }).then(function(user) {

            if(!user)
            {
                self.redirect('/errors/404');
            }
            else
            {
                user.update({deleted: true}).then(function(){
                    self.render({
                        user: user
                    });
                }).catch(function (err) {
                    self.redirect('/errors/500');
                    console.error('Failed to update user failed', err);
                });
            }

        }).catch(function (err) {
            self.redirect('/errors/500');
            console.error('Retrieve user failed', err);
        });
    }

    actionLogin()
    {
        // default self wrap
        const self = this;

        // const variables for models
        const User = self._app.models.User;


        // retrieve user email and password
        let email    = self.param('email');
        let password = self.param('password');

        // retrieve user with mail
        User.findOne({
            where : {
                deleted: false,
                email: email
            }
        }).then(function(user) {

            // if no use can be found or the password of the user wrong send an error
            if(!user || !user.comparePassword(password))
            {
                self.render({
                    error: errors(errors.codes.accounts.loginFailed)
                }, {
                    status: 401
                });
            }

            // if user and password ist correct user get a message that the account is disabled or blocked
            else if(user.get('failedLoginCount') > 3 || user.get('enabled') === false)
            {
                self.render({
                    error: errors(errors.codes.accounts.loginBlocked)
                }, {
                    status: 401
                });
            }

            // use login is valid
            else
            {
                // set user to seesion
                self._req.session.userId = user.id

                self.render({
                    user: user
                });
            }

        }).catch(function (err) {

            self.redirect('/errors/500');
            console.error('Retrieve user failed', err);

        });
    }
}

module.exports = UsersController;