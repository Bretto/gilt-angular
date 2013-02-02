'use strict';
/* http://docs-next.angularjs.org/api/angular.module.ng.$filter */

var filters = angular.module('GiltApp.filters', []);

filters.filter('cleanURL', function() {
    return function(input) {
        var output = input.replace(/https:\/\/api.gilt.com\/v1\/sales\//, '').replace(/\//g, '_');
        return output;
    }
});