/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/color',
    'views/size'
], function ($, _, Backbone, JST, ColorView, SizeView ) {
    'use strict';

    var MenuView = Backbone.View.extend({
        
        template: JST['app/scripts/templates/menu.hbs'],

        tagName: 'div',

        id: 'menu',

        className: 'menu',

        events: {
            'click':'handle',
            'click button:not(.colorscheme, .colorscheme *, .fontsize, .fontsize *)': 'route',
            'click button.colorscheme': 'changeColors',
            'click button.fontsize': 'changeSizes'
        },

        handle: function(ev) {
            ev.stopPropagation();
            ev.preventDefault();
            return false;
        },

        initialize: function () {
            this.listenTo(App.Models.User, 'change', this.render);
            
            App.Vent.on('menu:closedSizeView', this.closeSize, this);
            App.Vent.on('menu:closedColorView', this.closeColor, this);
            App.Vent.on('menu:profile', this.render, this);
        },

        closedColorView: function() {
            this.colorView = null;
        },

        closedSizeView: function() {
            this.sizeView = null;
        },

        render: function () {
            var _this = this;
            

            App.Collections.Classes.fetch({
                success: function(collection, response) {
                    var json = {
                        student: App.Models.User.get('student'),
                        teacher: App.Models.User.get('teacher'),
                        visitor: App.Models.User.get('visitor'),
                        classes: response.novas
                    };
                    console.log(json);
                    _this.$el.html(_this.template(json));
                }
            });

            return this;
        },

        route: function(ev) {

            if(this.sizeView) {
                this.sizeView.animateClose();
                this.sizeView = null;
                $('.fontsize').removeClass('editing');
            }
            if(this.colorView) {
                this.colorView.close();
                this.colorView = null;
                $('.colorscheme').removeClass('editing');
            }
            if(($(ev.currentTarget).attr('data-route') === '') &&
                (App.Models.User.get('student') || App.Models.User.get('teacher'))) {
                this.$el.html(this.template({home:true}));
            } 

            this.$('.selected').removeClass('selected');
            $(ev.currentTarget).addClass('selected');

            window.location.hash = $(ev.currentTarget).attr('data-route');
        
        },

        changeColors: function(ev) {

            if(this.sizeView) {
                this.sizeView.animateClose();
                this.sizeView = null;
                $('.fontsize').removeClass('editing');
            }

            $(ev.currentTarget).addClass('editing');

            if(!this.colorView) {
                this.colorView = new ColorView();

                $(ev.currentTarget).append(this.colorView.render().el);

                this.$('.colorscheme>.pointer').removeClass('hidden');
            } 
        },

        changeSizes: function(ev) {

            if(this.colorView) {
                this.colorView.close();
                this.colorView = null;
                $('.colorscheme').removeClass('editing');
            }

            $(ev.currentTarget).addClass('editing');

            if(!this.sizeView) {
                this.sizeView = new SizeView();

                $(ev.currentTarget).append(this.sizeView.render().el);

                this.$('.fontsize>.pointer').removeClass('hidden');
            } 
        },

        closeSize: function() {
            this.sizeView = null;
        },

        closeColor: function() {
            this.colorView = null;
        },

        onClose: function() {

            App.Vent.off('menu:closedSizeView');
            App.Vent.off('menu:closedColorView');
            App.Vent.off('menu:profile');

            this.colorView.close();
            this.colorView = null;
            this.sizeView.close();
            this.sizeView = null;
        }
    });

    return MenuView;
});
