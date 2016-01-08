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
        },


        render: function () {

            this.$el.html(this.template({
                user: App.Models.User.toJSON()
            }));


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
