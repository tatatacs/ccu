/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var ColorView = Backbone.View.extend({
        template: JST['app/scripts/templates/color.hbs'],

        tagName: 'div',

        id: 'color',

        color: 'red',

        className: 'color',

        events: {
            'click': 'handle',
            'click .picker': 'changeColors',
            'click #save': 'save',
            'click #cancel': 'cancel'
        },

        initialize: function () {
            this.color = App.color;
        },

        render: function () {
            
            var _this = this;

            this.$el.html(this.template());

            $('body').on('click', function(){
                $('body').off('click');
                _this.animateClose();
            });

            setTimeout(function(){
                _this.$('.picker[data-class="' + App.color + '"]').addClass('selected');
                _this.$el.animate({opacity:1},{duration:240, queue:false});
            }, 0);
            return this;
        },

        handle: function(ev) {
            ev.stopPropagation();
            ev.preventDefault();
            return false;
        },


        changeColors: function(ev) {

            $('body').removeClass().addClass($(ev.currentTarget).attr('data-class'));
            $('.picker').removeClass('selected');
            $(ev.currentTarget).addClass('selected');

        },


        save: function() {
            
            App.color = $('.picker.selected').attr('data-class');

            this.animateClose();
        },

        cancel: function() {

            $('body').addClass(App.color);

            this.animateClose();
        },

        animateClose: function() {

            var _this = this;

            $('.colorscheme').removeClass('editing');
            
            this.$el.animate({opacity:0},{
                duration:250, 
                queue:false, 
                complete:function(){
                    $('.colorscheme').removeClass('editing');
                    setTimeout(function() {
                        _this.close();
                    }, 0);
                    
                }
            });
        },

        onClose: function() {
           App.Vent.trigger('menu:closedColorView');
        }
    });

    return ColorView;
});
