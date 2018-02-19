/**
 * @autor       Kristof Friess
 * @company     Zebresel
 * @copyright   Since 2018 by Zebresel - Deine Agentur für digitale Medien
 * @description Default Routing System              
 */

/*jshint esversion: 6 */
/*jshint node: true*/

const path  = require('path');
const ejs   = require('ejs');

const OUTPUT_FORMATS = {
    HTML: 'html',
    JSON: 'json',
};

/**
 * The View Controller Class is the parent of all classes and used for all view controller of the hole project
 * @param {object} req        request object for the current request
 * @param {object} res        response object for the current request
 * @param {string} controller name of the called controller
 * @param {string} action     name of the called action
 */
class ViewController
{
    constructor(app, req, res, controller, action, method)
    {
        const self = this;

        // write private variables
        self._app = app;
        self._req = req;
        self._res = res;
        self._controller = controller;
        self._action = action;
        self._method = method;
        self.format = OUTPUT_FORMATS.HTML;
    }

    /**
     * This method will render out the current view of this controller used the params and the options
     * @param  {object} params parameter for the view which can be used for rendering
     * @param  {[type]} opt    options for the rendering system ejs
     * @return {object}        returns it self
     */
    render(params, opt)
    {
        const self = this;

        // initial empty render
        params  = params || {};
        opt     = opt || {};

        // check is status?
        if(opt.status)
        {
            self._res.status(opt.status);
        }

        if(self.format === OUTPUT_FORMATS.JSON)
        {
            self._res.type('json')
            self._res.send(JSON.stringify(params));
        }
        else
        {
            // check the user disabled the layout or like to us a other layout path?
            let layout = opt.layout || path.resolve(self.viewPath() + '/layout.html.ejs');
            params.self = self;

            // extend params with i18n
            params.l = self._req.l
            params.ln = self._req.ln

            ejs.renderFile(path.resolve(self.viewPath() + '/' + self._controller + '/'+self._action+'.html.ejs'), params, opt, function(err, str) {

                // if there is any error, render the error out
                if(err)
                {
                    console.log(err)
                    self._res.send(err);
                }
                else
                {
                    // there is now layout? Ok then render the html string out
                    if(layout === false)
                    {
                        self._res.send(str);
                    }

                    // there is a layout (default)
                    else
                    {
                        // set the initial view rendering as body param for the layout
                        params.body = str;

                        // render the layout out
                        ejs.renderFile(layout, params, opt, function(err, str) {

                            console.log(err);
                            // error on rendering the layout
                            if(err)
                            {
                                self._res.send(err);
                            }

                            // send out final page (rendered)
                            else
                            {
                                self._res.send(str);
                            }
                        });
                    }
                }

            });
        }

        return self;    
    }

    /**
     * This method will return the value for a key, used for request or url params
     * @param  {string} key
     * @return {mixed} value fo the key
     */
    param(key)
    {
        if(this._req.query && typeof this._req.query[key] !== 'undefined')
        {
            return this._req.query[key]; 
        }
        else if( this._req.body && typeof this._req.body[key] !== 'undefined')
        {
            return this._req.body[key];
        }

        return this._req.params[key];
    }

    /**
     * This method will return the current view path relative to this file
     * @return {string} view path like '/../views' (without tail slash)
     */
    viewPath()
    {
        return __dirname + '/../views';
    }

    /**
     * Do redirect to the given URL or Path
     * @param {string} url Can be a URL like http://www.example.com or a path like '/errors/500'
     */
    redirect(url)
    {
        this._res.redirect(url);
    }
}

ViewController.FORMATS = OUTPUT_FORMATS;

module.exports = ViewController;