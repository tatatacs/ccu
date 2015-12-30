/*global require*/
'use strict';

require.config({

    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        jQueryUI: '../bower_components/jquery-ui/jquery-ui',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/lodash/dist/lodash',
        handlebars: '../bower_components/handlebars/handlebars'
    },

    shim: {
        handlebars: {
            exports: 'Handlebars'
        },
        jQueryUI: {
            exports: "$",
            deps: ['jquery']
        },
    }
});

require([
    'backbone',
    'routes/router',
    'models/user',
    'models/color',
    'collections/classes',
    'collections/questions',
    'collections/responses'
], function (Backbone, Router, User, Color, Classes, Questions, Responses) {

    Backbone.View.prototype.close = function(){
      this.remove();
      this.unbind();
      if (this.onClose){
        this.onClose();
      }
    }

    window.App = {
    
        Models: {},

        Collections: {},
        
        Views: {},
        
        Helpers: {},

        Router: null,

        fontsize: 14,
        titlesize: 18,

        color: 'red'
        
    };

    App.sheet = document.createElement('style')
    document.body.appendChild(App.sheet);

    App.Vent = _.extend({}, Backbone.Events);
    
    App.Models.User = new User();

    App.Models.Color = new Color({color:'red'});

    App.Collections.Classes = new Classes();

    App.Collections.Questions = new Questions();
    App.Collections.Responses = new Responses();

    App.Router = new Router();

    Backbone.history.start();

});
