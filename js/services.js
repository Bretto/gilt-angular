'use strict';


var services = angular.module('GiltApp.services', []);

services.constant('GILT', {
    ACTIVE : '/active.json',
    UPCOMING : '/upcoming.json',
    API : 'https://api.gilt.com/v1/',
    PRODUCT : 'https://api.gilt.com/v1/products/',
    SALE: 'https://api.gilt.com/v1/sales/',
    APIKEY: '?apikey=88658e0b728c695d6145ffde625f01f6',
    CALLBACK: '&callback=JSON_CALLBACK',
    METHOD: 'JSONP'
});

services.factory('MainModel', function ($http, $log, $rootScope, $routeParams, $location) {

    var mainModel = {
         saleType: ''
        ,productURI: ''
        ,productID: ''
    };

    mainModel.isNavActive = function (value){
        return (value === mainModel.saleType)? 'nav-active' : '';
    }

    mainModel.isEdgeActive = function (value){
        return (value === mainModel.saleType)? 'edge-active' : '';
    }

    mainModel.extruderAccent = function(){
        return 'extruder-' + mainModel.saleType;
    }

    mainModel.thumbnailAccent = function(){
        return 'thumbnail-' + mainModel.saleType;
    }

    return mainModel;
});



