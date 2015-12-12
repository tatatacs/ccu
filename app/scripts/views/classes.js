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
        questionTemplate: JST['app/scripts/templates/question.hbs'],

        tagName: 'div',

        id: 'classes',

        className: 'classes',

        events: {
            'click .class': 'renderClasses',
            'click .question': 'writeQuestion'
        },

        initialize: function () {
            this.listenTo(App.Models.Color, 'change', this.render);
        },

        render: function () {
            App.Vent.trigger('title', { title: 'Minhas aulas' } );
            App.Vent.trigger('subtitle', { subtitle: App.Collections.Classes.length + " aulas" } );

            this.$el.html(this.template({
                classes: App.Collections.Classes.toJSON()
            }));
            return this;
        },

        renderClasses: function(ev) {

            if(!this.renderedClasses) {

                window.location.hash = 'courses/'+$(ev.currentTarget).attr('data-label');

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
        },

        renderClass: function(ev) {

            window.location.hash = 'courses/'+$(ev.currentTarget).attr('data-label');

            var classes = App.Collections.Classes.at($(ev.currentTarget).attr('data-index')).get('classes');

            App.Vent.trigger('breadcrumbs', { title: $(ev.currentTarget).attr('data-label') } );
            App.Vent.trigger('subtitle', { subtitle: '19-02-2015 às 17h30' } );

            this.$el.html(this.classTemplate({
                color: App.Models.Color.get('color')
            }));
            return this;
        },

        writeQuestion: function() {

            this.$el.html(this.questionTemplate({
                color: App.Models.Color.get('color')
            }));
        }   
    });

    return ClassesView;
});
