'use strict';
/* App Controllers */

var controllers = angular.module('GiltApp.controllers', []);

controllers.controller('MainCtrl', function ($scope, $rootScope, $timeout, $compile, $log, $http){
    $log.info('MainCtrl');
});

controllers.controller('MainNavCtrl', function ($scope, $rootScope, $timeout, $compile, $log){
    $log.info('MainNavCtrl');
});

controllers.controller('MainContentCtrl', function ($scope, $rootScope, $timeout, $compile, $log){
    $log.info('MainContentCtrl');
});

controllers.controller('SalesCtrl', function ($scope, MainModel, $log, $http, $routeParams, GILT){
    $log.info('SalesCtrl');

    $scope.MainModel = MainModel;
    MainModel.saleType = $routeParams.type;

    var saleUrl = GILT.SALE + $routeParams.type + GILT.ACTIVE + GILT.APIKEY + GILT.CALLBACK;

    $http({method:GILT.METHOD, url:saleUrl}).success(success).error(error);

    function success(data, status) {
        $scope.status = status;
        $scope.data = data;
        $log.info(data);
    }

    function error(data, status) {
        $scope.data = data || "Request failed";
        $scope.status = status;
    }
});

controllers.controller('ProductsCtrl', function ($scope, $log, $routeParams, GILT, $http, MainModel){
    $log.info('ProductsCtrl');

    $scope.MainModel = MainModel;
    MainModel.saleType = $routeParams.type;
    MainModel.productURI = $routeParams.uri;

    var uri = $routeParams.uri.replace(/_/g,'/');
    var saleUrl = GILT.API + uri + GILT.APIKEY + GILT.CALLBACK;

    $http({method:GILT.METHOD, url:saleUrl}).success(success).error(error);

    function success(data, status) {
        $scope.status = status;
        $scope.data = data;
        $log.info(data);
    }

    function error(data, status) {
        $scope.data = data || "Request failed";
        $scope.status = status;
    }

});

controllers.controller('ProductCtrl', function ($scope, $log, $routeParams, GILT, $http, MainModel){
    $log.info('ProductCtrl');

    $scope.MainModel = MainModel;
    MainModel.saleType = $routeParams.type;
    MainModel.productURI = $routeParams.uri;
    MainModel.productID = $routeParams.id;

    var uri = $routeParams.uri.replace(/_/g,'/');
    var itemUrl = GILT.API + uri + GILT.APIKEY + GILT.CALLBACK;

    $http({method:GILT.METHOD, url:itemUrl}).success(success).error(error);

    function success(data, status) {
        $scope.status = status;
        $scope.data = data;
        $log.info(data);
    }

    function error(data, status) {
        $scope.data = data || "Request failed";
        $scope.status = status;
    }

});
















