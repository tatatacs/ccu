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

        events: {},

        color: null,

        initialize: function () {
            this.listenTo(App.Models.Color, 'change', this.render);
        },

        render: function (color) {
            
            this.$el.html(this.template());
            
            this.$el.switchClass( this.color, App.Models.Color.get('color') );

            this.color = App.Models.Color.get('color');
            
            return this;
        },

        onClose: function() {
            
        }
    });

    return FooterView;
});
