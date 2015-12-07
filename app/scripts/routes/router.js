/*global define*/

define([
    'jquery',
    'backbone'
], function ($, Backbone) {
    'use strict';

    var RouterRouter = Backbone.Router.extend({
        
        routes: {
        	'':'start'
        },

        start: function() {
        	console.log('cenas');
        }

    });

    return RouterRouter;
});
