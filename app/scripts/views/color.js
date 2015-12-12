/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var ColorView = Backbone.View.extend({
        template: JST['app/scripts/templates/color.hbs'],

        tagName: 'div',

        id: 'color',

        color: 'red',

        className: 'color hidden',

        events: {
            'click .scheme': 'changeColors'
        },

        initialize: function () {
            //this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        },

        changeColors: function(ev) {

            //if($(ev.currentTarget).attr('data-color') === App.color);
            //    return;

            App.Models.Color.set('color', $(ev.currentTarget).attr('data-color'));
        }
    });

    return ColorView;
});
