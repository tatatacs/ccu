/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var CoursesCollection = Backbone.Collection.extend({

    	url: '../../fixtures/courses'

    });

    return CoursesCollection;
});
