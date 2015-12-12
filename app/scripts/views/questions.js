/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var QuestionsView = Backbone.View.extend({
        template: JST['app/scripts/templates/questions.hbs'],
        responseTemplate: JST['app/scripts/templates/response.hbs'],

        tagName: 'div',

        id: 'questions',

        className: 'questions',

        events: {
            'click .question': 'writeResponse',
            'click .send': 'sendResponse'
        },

        initialize: function () {
            this.listenTo(App.Models.Color, 'change', this.render);
        },

        render: function () {
            
            var _this = this;
            if(App.Collections.Questions.length === 0) {
                App.Collections.Questions.fetch({
                    success: function( collection, response ) {

                        App.Vent.trigger('title', { title: 'Dúvidas'})
                        App.Vent.trigger('subtitle', { subtitle: 'Tem 2 novas dúvidas'})
                        _this.$el.html(_this.template({
                            questions: collection.toJSON(),
                            color: App.Models.Color.get('color')
                        }));
                    }
                });
            } else {
                App.Vent.trigger('title', { title: 'Dúvidas'})
                App.Vent.trigger('subtitle', { subtitle: 'Tem 2 novas dúvidas'})
                _this.$el.html(_this.template({
                    questions: App.Collections.Questions.toJSON(),
                    color: App.Models.Color.get('color')
                }));
            }
            return this;
        },

        writeResponse: function(ev) {
            
            App.Vent.trigger('title', { title: 'Nova resposta'})
            App.Vent.trigger('subtitle', { subtitle: ''})

            this.questionIndex = $(ev.currentTarget).attr('data-index');

            var question = App.Collections.Questions.at(this.questionIndex);

            this.$el.html(this.responseTemplate({
                question: question.toJSON()
            }));
        },

        sendResponse: function() {
            
            var response = this.$('textarea.response').val();

            App.Collections.Questions.at(this.questionIndex).set({
                'response':response,
                'read':true
            });

            this.render();
        }
    });

    return QuestionsView;
});
