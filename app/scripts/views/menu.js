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
            'click button:not(.colorscheme, .fontsize, .fontsize *)': 'route',
            'click button.colorscheme': 'changeColors',
            'click button.fontsize': 'changeSizes'
        },

        initialize: function () {
            this.listenTo(App.Models.User, 'change', this.render);
            App.Vent.on('menu:closedColorView', this.closedColorView, this);
            App.Vent.on('menu:closedSizeView', this.closedSizeView, this);
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
                    
                    _this.$el.html(_this.template({
                        student: App.Models.User.get('student'),
                        teacher: App.Models.User.get('teacher'),
                        visitor: App.Models.User.get('visitor'),
                        classes: response.novas
                    }));
                }
            });

            return this;
        },

        route: function(ev) {
            
            console.log('routed it anyway like the lil bitch i am')

            if(this.sizeView) {
                this.sizeView.animateClose();
                this.sizeView = null;
            }
            if(this.colorView) {
                this.colorView.close();
                this.colorView = null;
            }

            window.location.hash = $(ev.currentTarget).attr('data-route');
        
        },

        changeColors: function(ev) {

            if(!this.colorView) {
                this.colorView = new ColorView();

                $(ev.currentTarget).append(this.colorView.render().el);

                this.$('.colorscheme>.pointer').removeClass('hidden');
            }
        },

        changeSizes: function(ev) {

            if(!this.sizeView) {
                this.sizeView = new SizeView();

                $(ev.currentTarget).append(this.sizeView.render().el);

                this.$('.fontsize>.pointer').removeClass('hidden');
            } 
        },

        onClose: function() {

            App.Vent.off('menu:closedColorView');
            App.Vent.off('menu:closedSizeView');

            this.colorView.close();
            this.colorView = null;
            this.sizeView.close();
            this.sizeView = null;
        }
    });

    return MenuView;
});
