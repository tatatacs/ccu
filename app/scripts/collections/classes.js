/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone, ClassesModel) {
    'use strict';

    var ClassesCollection = Backbone.Collection.extend({
        url: 'fixtures/classes',

        parse: function(response) {
        	return response.classes;
        }
    });

    return ClassesCollection;
});
