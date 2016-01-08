/*global require*/
'use strict';

require.config({

    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        jQueryUI: '../bower_components/jquery-ui/jquery-ui',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/lodash/dist/lodash',
        handlebars: '../bower_components/handlebars/handlebars'
    },

    shim: {
        handlebars: {
            exports: 'Handlebars'
        },
        jQueryUI: {
            exports: "$",
            deps: ['jquery']
        },
    }
});

require([
    'backbone',
    'routes/router',
    'models/user',
    'models/color',
    'collections/classes',
    'collections/questions',
    'collections/responses',
    'views/modal'
], function (Backbone, Router, User, Color, Classes, Questions, Responses, Modal) {

    Backbone.View.prototype.close = function(){
      if(this.onClose){
        this.onClose();
      }
      this.remove();
      this.unbind();
    }

    window.App = {
    
        Models: {},

        Collections: {},
        
        Views: {},
        
        Helpers: {},

        Router: null,

        fontsize: 14,
        titlesize: 18,

        color: 'dark'
        
    };

    App.sheet = document.createElement('style')
    document.body.appendChild(App.sheet);

    App.Vent = _.extend({}, Backbone.Events);
    
    App.Models.User = new User();

    App.Collections.Classes = new Classes();

    App.Collections.Questions = new Questions();
    App.Collections.Responses = new Responses();

    App.Views.Modal = new Modal();
    App.Views.Modal.render();

    App.Router = new Router();

    Backbone.history.start();

    window.location.hash = '';

});
