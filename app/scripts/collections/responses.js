/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var ResponsesCollection = Backbone.Collection.extend({
        url: 'fixtures/responses'
    });

    return ResponsesCollection;
});
