/*global require*/
'use strict';

require.config({
    shim: {
        handlebars: {
            exports: 'Handlebars'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/lodash/dist/lodash',
        handlebars: '../bower_components/handlebars/handlebars'
    }
});

require([
    'backbone',
    'routes/router'
], function (Backbone, Router) {

    window.App = {
        Models: {},
        Collections: {},
        Views: {},
        Router: new Router(),
        Helpers: {},
        Vent: _.extend({}, Backbone.Events)
    };

    Backbone.history.start();
});
