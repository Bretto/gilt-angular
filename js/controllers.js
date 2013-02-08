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

controllers.controller('SalesCtrl', function ($scope, MainModel, $log, $http, $routeParams, GILT, $timeout, data){
    $log.info('SalesCtrl');

    $scope.MainModel = MainModel;
    MainModel.saleType = $routeParams.type;

    $scope.data = data;

    // this is a hack to get the current view to refresh after fade-in
//    $timeout(function(){
//        $scope.$digest();
//    },0 )

});

controllers.controller('ProductsCtrl', function ($scope, $log, $routeParams, GILT, $http, MainModel, data, $timeout){
    $log.info('ProductsCtrl');

    $scope.MainModel = MainModel;
    MainModel.saleType = $routeParams.type;
    MainModel.productURI = $routeParams.uri;

    $scope.data = data;
    $scope.isSoldOut = (data.products) ? false : true;

//    $timeout(function(){
//        $scope.$digest();
//    },0 );

});

controllers.controller('ProductCtrl', function ($scope, $log, $routeParams, GILT, $http, MainModel, promiseData, $timeout){
    $log.info('ProductCtrl');

    $scope.MainModel = MainModel;
    MainModel.saleType = $routeParams.type;
    MainModel.productURI = $routeParams.uri;
    MainModel.productID = $routeParams.id;

    $scope.data = promiseData.data;
    $scope.item = promiseData.item;

//    $timeout(function(){
//        $scope.$digest();
//    },0 );

});
















