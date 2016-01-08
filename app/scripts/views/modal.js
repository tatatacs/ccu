/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var ModalView = Backbone.View.extend({
        template: JST['app/scripts/templates/modal.hbs'],
        questionTemplate: JST['app/scripts/templates/question.hbs'],

        tagName: 'div',

        id: 'modal',

        className: 'seeThrough',

        events: {
            'click .cancel': 'animateClosed',
            'click .send': 'sendQuestion'
        },

        initialize: function () {
            App.Vent.on('modal:question', this.question, this);
        },

        render: function () {
            this.$el.html(this.template());

            $('body').prepend(this.$el);
            return this;
        },

        question: function(params) {

            this.$('.title').html('Dúvida: ' + params.class);

            this.$('.content').html(this.questionTemplate({
                teacher: params.teacher,
                currentClass: params.class,
                course: params.course
            }));

            this.animateOpen();

        },

        sendQuestion: function() {
            var name = this.$('input.name').val();
            var _class = this.$('input.classname').val();
            var title = this.$('input.tit').val();
            var question = this.$('textarea.question').val();

            App.Collections.Responses.add([{ name: name, course: _class, title: title, date: this.nowDate(), read: true, question: question }]);
            App.Collections.Questions.add([{ name: App.Models.User.get('name'), course: _class, title: title, date: this.nowDate(), read: false, question: question }]);

            this.animateClosed();
        },

        animateOpen: function() {

            var _this = this;

            this.$el.animate({opacity:1},{duration:300, queue:false, complete: function() {
                _this.$el.removeClass('seeThrough');
            }});
        },

        nowDate: function() {
            var date = new Date();
            var months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

            return date.getDate() + " " + months[date.getMonth()] + ' ' + date.getFullYear();
        },

        animateClosed: function() {

            var _this = this;
            
            this.$el.animate({opacity:0},{duration:300, queue:false, complete: function() {
                _this.$el.addClass('seeThrough');
                _this.$('.title').html('');
                _this.$('.content').html('');
            }});
        },

        onClose: function() {
            App.Vent.off('modal:question');
        }
    });

    return ModalView;
});
