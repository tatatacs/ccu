/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'jQueryUI'
], function ($, _, Backbone, JST) {
    'use strict';

    var HeaderView = Backbone.View.extend({
        
        template: JST['app/scripts/templates/header.hbs'],

        tagName: 'div',

        id: 'header',

        className: 'header dark',

        events: {
            'click .profile':'profile',
            'click .login':'login',
            'click .logout': 'logout'
        },

        color: null,

        initialize: function () {
            this.listenTo(App.Models.User, 'change', this.render);
            this.listenTo(App.Models.Color, 'change', this.render);
        },


        render: function () {

            this.$el.html(this.template({
                user: App.Models.User.toJSON(),
                color: App.Models.Color.get('color')
            }));


            if(!this.$el.hasClass(App.Models.Color.get('color'))) {
                this.$el.switchClass( this.color, App.Models.Color.get('color') );
                this.color = App.Models.Color.get('color');
            }

            return this;
        
        },

        profile: function() {

            window.location.hash = 'profile';


        },

        login: function() {
            window.location.hash = 'login';
        },

        logout: function() {
            App.Models.User.set({
                'name': '',
                'age':  '',
                'dob': '',
                'sex': '',
                'nationality':'',
                'natural': '',
                'contact': '',
                'teacher': false,
                'student': false,
                'visitor': true
            });

            window.location.hash = '';
        },

        onClose: function() {
            
        }
    });

    return HeaderView;
});
