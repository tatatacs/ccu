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
            this.listenTo( App.Models.Color, 'change', this.render);
        },

        render: function () {
            App.Vent.trigger('title', { title: 'Página do aluno' } );
            App.Vent.trigger('subtitle', { subtitle: '' } );
            this.$el.html(this.template({
                model: App.Models.User.toJSON(),
                color: App.Models.Color.get('color')
            }));
            return this;
        }
    });

    return ProfileView;
});
