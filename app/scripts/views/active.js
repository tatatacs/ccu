/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/courses',
    'views/main',
    'views/login',
    'views/classes',
    'views/content',
    'views/profile',
    'views/questions',
    'views/responses'
], function ($, _, Backbone, JST, CoursesView, MainView, LoginView, ClassesView, ContentView, ProfileView, QuestionsView, ResponsesView) {
    'use strict';

    var ActiveView = Backbone.View.extend({
        template: JST['app/scripts/templates/active.hbs'],

        tagName: 'div',

        id: 'content',

        className: 'content',

        events: {},

        initialize: function () {
            App.Vent.on('breadcrumbs', this.breadcrumbs, this);
            App.Vent.on('subtitle', this.subtitle, this);
            App.Vent.on('title', this.title, this);
        },

        render: function () {
            
            this.$el.html(this.template());
        
            return this;

        },

        switchViews: function(type) {
            
            var _this = this;

            if(this.subview) {
                this.subview.close();
                this.subview = null;
            }

            switch(type) {
                case 'courses':     
                    this.subview = new CoursesView();
                    break;
                case 'classes':     
                    this.subview = new ClassesView();
                    break;
                case 'main':     
                    this.subview = new MainView();
                    break;
                case 'login':     
                    this.subview = new LoginView();
                    break;

                case 'profile':     
                    this.subview = new ProfileView();
                    break;
                case 'questions':     
                    this.subview = new QuestionsView();
                    break;
                case 'responses':     
                    this.subview = new ResponsesView();
                    break;
                case 'contacts': 
                case 'calendar': 
                case 'informations':     
                    this.subview = new ContentView({type: type});
                    break;

            }

            this.render();
            setTimeout(function() {
                _this.$('.content-wrapper').html(_this.subview.render().el);
            }, 0);
        },

        subtitle: function(params) {
            this.$('.subtitle').html(params.subtitle);
        },

        title: function(params) {
            this.$('.title').html(params.title);
        },

        breadcrumbs: function(params) {
            this.$('.title').append(' > ' + params.title);
        },

        onClose: function() {
            App.Vent.off('breadcrumbs');
            App.Vent.off('title');
            App.Vent.off('subtitle');
        }
    });

    return ActiveView;
});
