/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var MainView = Backbone.View.extend({
        
        template: JST['app/scripts/templates/main.hbs'],

        tagName: 'div',

        id: 'main-page',

        className: 'main-page',

        events: {
            'click button':'informations'
        },

        title: 'Bem-vindo à universidade da 3a idade!',


        initialize: function () {
            
        },

        render: function () {
            App.Vent.trigger('title', { title: this.title } );
            App.Vent.trigger('subtitle', { subtitle: '' } );
            this.$el.html(this.template());
            return this;
        },

        informations: function() {

            window.location.hash = 'informations';

        }
    });

    return MainView;
});
