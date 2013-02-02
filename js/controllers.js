'use strict';
/* App Controllers */

var controllers = angular.module('GiltApp.controllers', []);

controllers.controller('MainCtrl', function ($scope, $rootScope, $timeout, $compile, $log, $http){

// testing now this works :)

});

controllers.controller('MainNavCtrl', function ($scope, $rootScope, $timeout, $compile, $log){


});

controllers.controller('MainContentCtrl', function ($scope, $rootScope, $timeout, $compile, $log){


});

controllers.controller('ProductCtrl', function ($scope, $rootScope, $timeout, $compile, $log, $http, GiltService, $routeParams){


    GiltService.fetchStore($routeParams.type,'/active.json').success(success).error(error);

    function success(data, status) {
        $scope.status = status;
        $scope.data = data;
        //$log.info(data);
    }

    function error(data, status) {
        $scope.data = data || "Request failed";
        $scope.status = status;
    }
});























