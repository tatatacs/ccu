/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var ClassesView = Backbone.View.extend({
        template: JST['app/scripts/templates/classes.hbs'],
        classTemplate: JST['app/scripts/templates/class.hbs'],
        teacherTemplate: JST['app/scripts/templates/visitorClasses.hbs'],
        questionTemplate: JST['app/scripts/templates/question.hbs'],

        tagName: 'div',

        id: 'classes',

        className: 'classes',

        events: {
            'click .class': 'renderClasses',
            'click .question': 'writeQuestion',
            'click #play': 'play',
            'click #pause': 'pause'
        },

        initialize: function () {

        },

        play: function() {

        },

        render: function () {
            if(App.Models.User.get('student')) {
                App.Vent.trigger('title', { title: 'Minhas aulas' } );
                App.Vent.trigger('subtitle', { subtitle: 'Inscrito em ' + App.Collections.Classes.length + " cursos" } );

                this.$el.html(this.template({
                    classes: App.Collections.Classes.toJSON()
                }));
                return this;
            } else {
                App.Vent.trigger('title', { title: 'Minhas aulas' } );
                App.Vent.trigger('subtitle', { subtitle: '' } );

                this.$el.html(this.teacherTemplate({
                    classes: App.Collections.Classes.toJSON()
                }));
                return this;
            }
        },

        renderClasses: function(ev) {

            if(App.Models.User.get('student')) {

                if(!this.renderedClasses) {

                    this.course = $(ev.currentTarget).attr('data-label');

                    window.location.hash = 'courses/'+ $(ev.currentTarget).attr('data-label');

                    var classes = App.Collections.Classes.at($(ev.currentTarget).attr('data-index')).get('classes');

                    App.Vent.trigger('breadcrumbs', { title: $(ev.currentTarget).attr('data-label') } );
                    App.Vent.trigger('subtitle', { subtitle: classes.length + " aulas" } );

                    this.$el.html(this.template({
                        display: true,
                        classes: classes
                    }));

                    this.renderedClasses = true;

                } else {
                    this.renderClass(ev);
                }
                return this;
            } else {

                if(!this.renderedClasses) {

                    this.course = $(ev.currentTarget).attr('data-label');

                    window.location.hash = 'courses/'+ $(ev.currentTarget).attr('data-label');

                    var classes = App.Collections.Classes.at($(ev.currentTarget).attr('data-index')).get('classes');

                    App.Vent.trigger('breadcrumbs', { title: $(ev.currentTarget).attr('data-label') } );
                    App.Vent.trigger('subtitle', { subtitle: classes.length + " aulas" } );

                    $('.content').append('<button class="addClass">Adicionar nova aula</button>');

                    this.$el.html(this.teacherTemplate({
                        teacher: true,
                        classes: classes
                    }));

                    this.renderedClasses = true;

                } else {
                    this.renderClass(ev);
                }
            }
        },

        renderClass: function(ev) {

            $('button.addClass').remove();

            this.currentClass = $(ev.currentTarget).attr('data-label');

            window.location.hash = 'courses/'+$(ev.currentTarget).attr('data-label');

            var classes = App.Collections.Classes.at($(ev.currentTarget).attr('data-index')).get('classes');

            App.Vent.trigger('breadcrumbs', { title: $(ev.currentTarget).attr('data-label') } );
            App.Vent.trigger('subtitle', { subtitle: '19-02-2015 às 17h30' } );

            this.$el.html(this.classTemplate({
                student: App.Models.User.get('student')
            }));
            return this;
        },

        writeQuestion: function() {

            App.Vent.trigger('modal:question', { teacher: 'Joao Pedro Marreiros', class: this.currentClass, course: this.course });
            
            /*this.$el.html(this.questionTemplate({
                teacher: 'Joao Pedro Marreiros'
            }));*/
        }   
    });

    return ClassesView;
});
