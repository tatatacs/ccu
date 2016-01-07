/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var LoginView = Backbone.View.extend({
        template: JST['app/scripts/templates/login.hbs'],

        tagName: 'div',

        id: 'login',

        className: 'login',

        events: {
            'click button.login':'login'
        },

        initialize: function () {
            this.listenTo(App.Models.Color, 'change', this.render);
        },

        render: function () {
            App.Vent.trigger('title', { title: 'Iniciar sessão' } );
            App.Vent.trigger('subtitle', { subtitle: '' } );
            
            this.$el.html(this.template({
                color: App.Models.Color.get('color')
            }));
            
            return this;
        },

        login: function() {
            var username = this.$('input.username').val();
            var password = this.$('input.password').val();

            switch(username) {
                case 'teacher':
                case 'professor':  {
                    var type = 'teacher';
                    App.Models.User.set({
                        'name': 'Maria Josefa da Conceição',
                        'age':  '38 anos',
                        'dob': '8 de Julho de 1977',
                        'sex': 'Feminino',
                        'nationality':'Portuguesa',
                        'natural': 'Portugal',
                        'contact': '932374910'
                    });
                } break;
                case 'student': {
                    var type = 'student';

                    App.Models.User.set({
                        'name': 'José Alberto Menezes',
                        'age':  '67 anos',
                        'dob': '10 de Novembro de 1948',
                        'sex': 'Masculino',
                        'nationality':'Portuguesa',
                        'natural': 'Cabo Verde',
                        'contact': '919234888'
                    });
                } break;
            }
            
            App.Models.User.set(type, true);
            App.Models.User.set('visitor', false);
        },

        onClose: function() {
            
        }
    });

    return LoginView;
});
