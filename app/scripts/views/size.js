/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var SizeView = Backbone.View.extend({
        template: JST['app/scripts/templates/size.hbs'],

        tagName: 'div',

        id: 'size',

        className: 'size hidden',

        fontsize: 14,
        titlesize: 18,

        events: {
            'click #plus': 'larger',
            'click #minus': 'smaller'
        },

        initialize: function () {
            
        },

        render: function () {
            
            this.$el.html(this.template({size:this.fontsize}));

            return this;
        },

        larger: function() {
            
            this.fontsize += 1;
            this.titlesize += 1;

            $('body *').css('font-size', this.fontsize + 'px');
            $('body .title').css('font-size', this.titlesize + 'px');

            this.render();
        },

        smaller: function() {
            
            this.fontsize -= 1;
            this.titlesize -= 1;

            $('body *').css('font-size', this.fontsize + 'px');
            $('body .title').css('font-size', this.titlesize + 'px');

            this.render();
        },

        

    });

    return SizeView;
});
