/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var MenuView = Backbone.View.extend({
        template: JST['app/scripts/templates/menu.hbs'],

        tagName: 'div',

        id: 'menu',

        className: 'menu red light',

        events: {},

        initialize: function () {
            //this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        }
    });

    return MenuView;
});
