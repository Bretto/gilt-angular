'use strict';
/* App Controllers */

var controllers = angular.module('GiltApp.controllers', []);

controllers.controller('MainCtrl', function ($scope, $rootScope, $timeout, $compile, $log, $http){
$log.info('MainCtrl');
// testing now this works :)

});

controllers.controller('MainNavCtrl', function ($scope, $rootScope, $timeout, $compile, $log){
    $log.info('MainNavCtrl');

});

controllers.controller('MainContentCtrl', function ($scope, $rootScope, $timeout, $compile, $log){

    $log.info('MainContentCtrl');
});

controllers.controller('ProductsCtrl', function ($scope, $rootScope, $timeout, $compile, $log, $http, $routeParams, GILT){

    $log.info('ProductsCtrl');

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

controllers.controller('ProductCtrl', function ($scope, $log, $routeParams, GILT, $http){

    $log.info('ProductCtrl');

    var uri = $routeParams.uri.replace(/_/g,'/');
    var saleUrl = GILT.SALE + uri + GILT.APIKEY + GILT.CALLBACK;

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
















