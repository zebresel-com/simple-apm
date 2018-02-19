/**
 * @autor       Kristof Friess
 * @company     Zebresel
 * @copyright   Since 2018 by Zebresel - Deine Agentur für digitale Medien
 * @description Default Routing System              
 */

/*jshint esversion: 6 */
/*jshint node: true*/

const ViewController = require('./../core/viewController.js');

class MainController extends ViewController
{
    constructor(app, req, res, controller, action, method)
    {
        super(app, req, res, controller, action, method);

        this.userNeeded = true;
        this.loginNeeded = true;
    }

    init(next)
    {
        const self = this;

        // check content type and change response format if needed
        let contype = self._req.headers['content-type'];
        if(contype && contype.indexOf('application/json') !== -1)
        {
            self.format = MainController.FORMATS.JSON;
        }

        // check user is logged in?
        if(self.userNeeded === true && self._req.session && self._req.session.userId)
        {
            // const variables for models
            const User = self._app.models.User;

            // retreive all users
            User.findOne({
                deleted: false,
                id: self._req.session.userId
            }).then(function(user) {

                if(!user && self.loginNeeded)
                {
                    self.redirect('/login');
                }
                else
                {
                    self._req.currUser = user;
                    next();
                }

            }).catch(function (err) {
                self.redirect('/errors/500');
                console.error('Retrieve user failed', err);
            });
        }
        else if(self.userNeeded === true)
        {
            self.redirect('/login');
        }
        else
        {
            next();
        }
    }

}

module.exports = MainController;