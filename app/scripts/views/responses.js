/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var ResponsesView = Backbone.View.extend({
        template: JST['app/scripts/templates/responses.hbs'],
        questionTemplate: JST['app/scripts/templates/question.hbs'],

        tagName: 'div',

        id: 'responses',

        className: 'responses',

        events: {
            'click .new': 'newQuestion',
            'click .send': 'sendQuestion',
            'click .cancel': 'cancel'
        },

        initialize: function () {

        },

        render: function () {
            
            var _this = this;

            if(App.Collections.Responses.length === 0) {
                App.Collections.Responses.fetch({
                    success: function( collection, response ) {

                        App.Vent.trigger('title', { title: 'Dúvidas'})
                        App.Vent.trigger('subtitle', { subtitle: 'Tem 2 novas respostas'})
                        _this.$el.html(_this.template({
                            responses: collection.toJSON()
                        }));
                    }
                });
            } else {
                App.Vent.trigger('title', { title: 'Dúvidas'})
                App.Vent.trigger('subtitle', { subtitle: 'Tem 2 novas respostas'})
                _this.$el.html(_this.template({
                    responses: App.Collections.Responses.toJSON()
                }));
            }
            return this;
        },

        newQuestion: function() {

            App.Vent.trigger('title', { title: 'Nova dúvida'});
            App.Vent.trigger('subtitle', { subtitle: ''});

            this.$el.html(this.questionTemplate({
            }));
            
        },

        sendQuestion: function() {
            var name = this.$('input.name').val();
            var _class = this.$('input.class').val();
            var title = this.$('input.tit').val();
            var question = this.$('textarea.question').val();

            App.Collections.Responses.add([{ name: name, course: _class, title: title, date: '11 de Dezembro 2015', read: true, question: question }]);
            console.log(App.Collections.Responses);
            App.Collections.Questions.add([{ name: App.Models.User.get('name'), course: _class, title: title, date: '11 de Dezembro 2015', read: false, question: question }]);

            this.render();
        },

        cancel: function() {
            this.render();
        }


    });

    return ResponsesView;
});
