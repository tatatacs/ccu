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

        className: 'footer',

        events: {},

        initialize: function () {
            //this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        }
    });

    return FooterView;
});
