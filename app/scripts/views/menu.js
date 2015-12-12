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

        colorView: new ColorView(),
        sizeView: new SizeView(),

        events: {
            'click button:not(.colorscheme, .fontsize)': 'route',
            'click button.colorscheme': 'changeColors',
            'click button.fontsize': 'changeSizes'
        },

        initialize: function () {
            this.listenTo(App.Models.User, 'change', this.render);
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

                    _this.$('.color').replaceWith(_this.colorView.render().el);
                    _this.$('.size').replaceWith(_this.sizeView.render().el);
                }
            });

            return this;
        },

        route: function(ev) {
            
            window.location.hash = $(ev.currentTarget).attr('data-route');
        
        },

        changeColors: function() {
            this.colorView.$el.toggleClass('hidden');
            this.$('.colorscheme>.pointer').toggleClass('hidden');
        },

        changeSizes: function() {
            this.sizeView.$el.removeClass('hidden');
            this.$('.fontsize>.pointer').removeClass('hidden');
        },

        onClose: function() {
            this.colorView.close();
            this.colorView = null;
            this.sizeView.close();
            this.sizeView = null;
        }
    });

    return MenuView;
});
