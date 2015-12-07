/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var HeaderView = Backbone.View.extend({
        
        template: JST['app/scripts/templates/header.hbs'],

        tagName: 'div',

        id: 'header',

        className: 'header',

        events: {},

        initialize: function () {
            //this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            
            this.$el.html(this.template({
                cenas: 'batatas'
            }));

            return this;
        
        }
    });

    return HeaderView;
});
