/*global define*/

define([
    'jquery',
    'backbone',
    'views/header'
], function ($, Backbone, Header) {
    'use strict';

    var RouterRouter = Backbone.Router.extend({
        
        routes: {
        	'':'start'
        },

        start: function() {
        	App.Views.header = new Header();
            $('#header').replaceWith(App.Views.header.render().el);
        }

    });

    return RouterRouter;
});
