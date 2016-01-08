/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var SizeView = Backbone.View.extend({
        
        template: JST['app/scripts/templates/size.hbs'],

        tagName: 'div',

        id: 'size',

        className: 'size',

        events: {
            'click .titleSize>#plus:not(.disabled)': 'largerTitle',
            'click .titleSize>#minus:not(.disabled)': 'smallerTitle',
            'click .fontSize>#plus:not(.disabled)': 'largerFont',
            'click .fontSize>#minus:not(.disabled)': 'smallerFont',
            'click #save': 'save',
            'click #cancel': 'cancel'
        },

        initialize: function () {
            this.fontsize = App.fontsize;
            this.titlesize = App.titlesize;
        },

        render: function () {
            
            var _this = this;

            this.$el.html(this.template({
                titlesize: App.titlesize,
                fontsize: App.fontsize
            }));

            if(this.fontsize === 20) {
                this.$('.fontSize>#plus').attr('class','disabled');
            }
            if(this.fontsize === 10) {
                this.$('.fontSize>#minus').attr('class','disabled');
            }
            if(this.titlesize === 25) {
                this.$('.titleSize>#plus').attr('class','disabled');
            }
            if(this.titlesize === 10) {
                this.$('.titleSize>#minus').attr('class','disabled');
            }

            $('body').on('click', function(){
                $('body').off('click');
                _this.animateClose();
            });

            setTimeout(function(){
                _this.$el.animate({opacity:1},{duration:240, queue:false});
            }, 0);

            return this;
        },


        largerFont: function() {
            
            if(this.fontsize + 1 === 20) {
                this.$('.fontSize>#plus').attr('class','disabled');
            }
            if(this.fontsize + 1 > 10) {
                this.$('.fontSize>#minus').attr('class', false);
            }

            this.fontsize += 1;
            this.updateFont();
        },

        smallerFont: function() {

            if(this.fontsize - 1 === 10) {
                this.$('.fontSize>#minus').attr('class','disabled');
            }
            if(this.fontsize - 1 < 20) {
                this.$('.fontSize>#plus').attr('class', false);
            }
            
            this.fontsize -= 1;
            this.updateFont();
        },

        updateFont: function() {

            $("body *:not(.title, .labelFontSize, .labelTitleSize, .size #save, .size #cancel, .size > .label)").css('font-size', this.fontsize);
            this.$('.labelFontSize').html(this.fontsize);
        },

        

        largerTitle: function() {
            
            if(this.titlesize + 1 === 25) {
                this.$('.titleSize>#plus').attr('class','disabled');
            }
            if(this.titlesize + 1 > 10) {
                this.$('.titleSize>#minus').attr('class', false);
            }

            this.titlesize += 1;
            this.updateTitle();
        },

        smallerTitle: function() {
            
            if(this.titlesize - 1 === 10) {
                this.$('.titleSize>#minus').attr('class','disabled');
            }
            if(this.titlesize - 1 < 25) {
                this.$('.titleSize>#plus').attr('class', false);
            }

            this.titlesize -= 1;
            this.updateTitle();
        },

        updateTitle: function() {

            $(".title").css('font-size', this.titlesize);
            this.$('.labelTitleSize').html(this.titlesize);
        },

        save: function() {
            
            App.fontsize = this.fontsize;
            App.titlesize = this.titlesize;

            this.animateClose();
        },

        cancel: function() {
            
            $(".title").css('font-size', App.titlesize);
            $("body *:not(.title, .labelFontSize, .labelTitleSize, .size #save, .size #cancel, .size > .label)").css('font-size', App.fontsize);

            this.animateClose();
        },

        animateClose: function() {

            var _this = this;

            $('.fontsize').removeClass('editing');

            this.$el.animate({opacity:0},{
                duration:250, 
                queue:false, 
                complete:function(){
                    $('.fontsize').removeClass('editing');
                    App.sheet.innerHTML = "body * { font-size: " + App.fontsize + "px; } body .title { font-size: " + App.titlesize + "px; }";

                    setTimeout(function() {
                        _this.close();
                    }, 0);
                    
                }
            });
        },

        onClose: function() {
           App.Vent.trigger('menu:closedSizeView');
        }

    });

    return SizeView;
});
