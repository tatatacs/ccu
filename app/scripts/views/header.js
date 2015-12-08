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

        className: 'header dark red',

        events: {
            'click div':'cenas'
        },

        initialize: function () {
            this.listenTo(App.Models.User, 'change', this.render);
        },

        render: function () {

            console.log('Rendering again');
            
            this.$el.html(this.template({
                cenas: 'batatas',
                user: App.Models.User.toJSON()
            }));

            return this;
        
        },

        cenas: function() {

            window.location.hash = '';
            
            if(this.$el.hasClass('red'))
                $('.red').switchClass( "red", "blue", 1000, "easeInOutQuad" );
            else
                $('.blue').switchClass( "blue", "red", 1000, "easeInOutQuad" );

        }
    });

    return HeaderView;
});
