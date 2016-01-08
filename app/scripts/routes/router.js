/*global define*/

define([
    'jquery',
    'backbone',
    'views/header',
    'views/menu',
    'views/footer',
    'views/active'
], function ($, Backbone, Header, Menu, Footer, Active) {
    'use strict';

    var RouterRouter = Backbone.Router.extend({
        
        routes: {
        	'':'main',
            'courses':'courses',
            'news': 'news',
            'classes': 'classes',
            'login':'login',
            'contacts': 'contacts',
            'informations': 'informations',
            'profile': 'profile',
            'responses': 'responses',
            'respond': 'respond',
            'questions': 'questions',
            'question': 'question',
            'calendar': 'calendar',
            'undefined': 'undefined'
        },

        initialize: function() {
            
            this.listenTo(App.Models.User, 'change', this.profile);

            if(!App.Views.header)
                App.Views.header = new Header();
            if(!App.Views.menu)
                App.Views.menu = new Menu();
            if(!App.Views.footer)
                App.Views.footer = new Footer();
            if(!App.Views.active)
                App.Views.active = new Active();
            
            $('#header').replaceWith(App.Views.header.render().el);
            $('#menu').replaceWith(App.Views.menu.render().el);
            $('#content').replaceWith(App.Views.active.render().el);
            $('#footer').replaceWith(App.Views.footer.render().el);
        },

        main: function() {

            App.Views.active.switchViews('main');

        },

        calendar: function() {

            App.Views.active.switchViews('calendar');

        },

        news: function() {

            App.Views.active.switchViews('main');
            setTimeout(function() {
                App.Vent.trigger('title', {title: "Notícias"});
            }, 0);

        },


        responses: function() {

            App.Views.active.switchViews('responses');

        },

        questions: function() {

            App.Views.active.switchViews('questions');

        },

        courses: function() {
            
            App.Views.active.switchViews('courses');

        },

        contacts: function() {
            
            App.Views.active.switchViews('contacts');

        },

        informations: function() {
            
            App.Views.active.switchViews('informations');

        },

        profile: function() {
            App.Vent.trigger('menu:profile');
            App.Views.active.switchViews('profile');

        },

        classes: function() {
            
            App.Views.active.switchViews('classes');

        },


        login: function() {
            
            App.Views.active.switchViews('login');
        },

        undefined: function() {
            window.location.hash = '';
        },

        reboot: function() {
            
        }

    });

    return RouterRouter;
});
