'use strict';


// Declare app level module which depends on filters, and services
angular.module('GiltApp', ['GiltApp.filters', 'GiltApp.services', 'GiltApp.directives', 'GiltApp.controllers']).
    config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.
        when('/', {templateUrl:'partial/hero.html'}).
        when('/:type', {controller:'ProductCtrl', templateUrl:'partial/products.html'}).
        otherwise({redirectTo:'/'});
    $locationProvider.html5Mode(false);
}]);

