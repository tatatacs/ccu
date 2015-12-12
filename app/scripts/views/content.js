/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var ContentView = Backbone.View.extend({

        tagName: 'div',

        id: 'content',

        className: 'content',

        events: {},

        initialize: function (params) {
            
            switch(params.type) {
                case 'contacts':
                    this.template = JST['app/scripts/templates/contacts.hbs'];
                    this.title = 'Contactos';
                    this.subtitle = 'Das 9h às 12h e das 13h as 18h';
                    break;
                case 'informations':
                    this.template = JST['app/scripts/templates/informations.hbs'];
                    this.title = 'Informações';
                    this.subtitle = '';
                    break;
                case 'calendar':
                    this.template = JST['app/scripts/templates/calendar.hbs'];
                    this.title = 'Calendário';
                    this.subtitle = '';
                    break;
            }   

        },

        render: function () {

            this.$el.html(this.template());
            App.Vent.trigger('title', { title: this.title } );
            App.Vent.trigger('subtitle', { subtitle: this.subtitle } );
            return this;
        }
    });

    return ContentView;
});
