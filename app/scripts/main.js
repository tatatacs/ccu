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
    'models/user'
], function (Backbone, Router, User) {

    window.App = {
    
        Models: {
            User: new User()
        },

        Collections: {},
        
        Views: {},
        
        Router: new Router(),
        
        Helpers: {},
        
        Vent: _.extend({}, Backbone.Events)
    
    };

    Backbone.history.start();
});
