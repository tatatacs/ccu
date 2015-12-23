/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'collections/courses'
], function ($, _, Backbone, JST, CoursesCollection) {
    'use strict';

    var CoursesView = Backbone.View.extend({
        
        courses: JST['app/scripts/templates/courses.hbs'],
        classes: JST['app/scripts/templates/classes.hbs'],
        visitorClass: JST['app/scripts/templates/visitorClass.hbs'],

        tagName: 'div',

        collection: new CoursesCollection(),

        id: 'courses',

        className: 'courses',

        events: {
            'click .course[data-router!="contactos"]': 'renderClasses',
            'click .course[data-router="contactos"]': 'contacts',
            'click .class': 'renderClass'
        },

        subtitle: '',

        initialize: function () {
            this.listenTo(this.collection, 'change', this.render);
            this.listenTo(App.Models.Color, 'change', this.render);
        },

        render: function () {

            var _this = this;

            this.collection.fetch({
                success: function(collection, response) {
                    
                    App.Vent.trigger('title', { title: 'Cursos' } );
                    App.Vent.trigger('subtitle', { subtitle: collection.length + " cursos" } );
                    _this.$el.html(_this.courses({
                        color: App.Models.Color.get('color'),
                        courses:collection.toJSON()
                    }));
                    
                } 
            })

            return this;
        },

        renderClasses: function(ev) {

            window.location.hash = 'courses/'+$(ev.currentTarget).attr('data-router');

            var classes = this.collection.at(0).get('classes');

            App.Vent.trigger('breadcrumbs', { title: $(ev.currentTarget).find('.label').html() } );
            App.Vent.trigger('subtitle', { subtitle: classes.length + " aulas em " + $(ev.currentTarget).find('.label').html() } );

            this.$el.html(this.classes({
                classes: classes
            }));
        },

        renderClass: function(ev) {
            
            window.location.hash = window.location.hash + '/' + $(ev.currentTarget).html();

            var classes = this.collection.at(0).get('classes');

            App.Vent.trigger('breadcrumbs', { title: $(ev.currentTarget).html() } );
            App.Vent.trigger('subtitle', { subtitle: 'Professor João Santos' } );

            this.$el.html(this.visitorClass({
            }));
        
        },

        contacts: function() {
            window.location.hash = 'contacts';
        },

        onClose: function() {
            
        }
    });

    return CoursesView;
});
