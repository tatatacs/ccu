/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var ProfileView = Backbone.View.extend({
        template: JST['app/scripts/templates/profile.hbs'],

        tagName: 'div',

        id: 'profile',

        className: 'profile',

        events: {},

        initialize: function () {
            
        },

        render: function () {
            App.Vent.trigger('title', { title: 'Página do aluno' } );
            App.Vent.trigger('subtitle', { subtitle: '' } );
            this.$el.html(this.template({
                model: App.Models.User.toJSON()
            }));
            return this;
        }
    });

    return ProfileView;
});
