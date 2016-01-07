/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var FooterView = Backbone.View.extend({
        template: JST['app/scripts/templates/footer.hbs'],

        tagName: 'div',

        id: 'footer',

        className: 'footer dark',

        events: {
            'mouseover .security': 'expand',
            'mouseleave .security': 'collapse'
        },

        color: null,

        initialize: function () {
            
        },

        render: function (color) {
            
            this.$el.html(this.template());
            
            return this;
        },

        expand: function() {
            this.$el.addClass('expanded');
        },

        collapse: function() {
            this.$el.removeClass('expanded');
        },

        onClose: function() {
            
        }
    });

    return FooterView;
});
