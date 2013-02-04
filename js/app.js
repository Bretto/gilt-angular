'use strict';


// Declare app level module which depends on filters, and services
angular.module('GiltApp', ['GiltApp.filters', 'GiltApp.services', 'GiltApp.directives', 'GiltApp.controllers']).
    config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.
        when('/', {templateUrl:'partial/hero.html'}).
        when('/sale/:type', {controller:'SalesCtrl', templateUrl:'partial/sales.html'}).
        when('/sale/:type/product/:uri', {controller:'ProductsCtrl', templateUrl:'partial/products.html'}).
        when('/sale/:type/product/:uri/item/:id', {controller:'ProductCtrl', templateUrl:'partial/product.html'}).
        otherwise({redirectTo:'/'});
    $locationProvider.html5Mode(false);
}]);

