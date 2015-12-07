/*global define*/

define([
    'jquery',
    'backbone',
    'views/header',
    'views/menu',
    'views/footer'
], function ($, Backbone, Header, Menu, Footer) {
    'use strict';

    var RouterRouter = Backbone.Router.extend({
        
        routes: {
        	'':'start'
        },

        start: function() {
        	if(!App.Views.header)
                App.Views.header = new Header();
            if(!App.Views.menu)
                App.Views.menu = new Menu();
            if(!App.Views.footer)
                App.Views.footer = new Footer();
            
            $('#header').replaceWith(App.Views.header.render().el);
            $('#menu').replaceWith(App.Views.menu.render().el);
            $('#footer').replaceWith(App.Views.footer.render().el);
        }

    });

    return RouterRouter;
});
