/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var QuestionsCollection = Backbone.Collection.extend({
        url: 'fixtures/questions'
    });

    return QuestionsCollection;
});
