'use strict';


var services = angular.module('GiltApp.services', []);

services.constant('GILT', {
    ACTIVE : '/active.json',
    UPCOMING : '/upcoming.json',
    PRODUCT : 'https://api.gilt.com/v1/products/',
    SALE: 'https://api.gilt.com/v1/sales/',
    APIKEY: '?apikey=88658e0b728c695d6145ffde625f01f6',
    CALLBACK: '&callback=JSON_CALLBACK',
    METHOD: 'JSONP'
});

services.factory('MainModel', function ($http, $log, $rootScope, $routeParams, $location) {

    var MainModel = {

    };

    return MainModel;
});



