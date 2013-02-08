'use strict';


// Declare app level module which depends on filters, and services
angular.module('GiltApp', ['GiltApp.filters', 'GiltApp.services', 'GiltApp.directives', 'GiltApp.controllers']).
    config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.
        when('/', {templateUrl:'partial/hero.html'}).
        when('/sale/:type', {templateUrl:'partial/sales.html', controller:'SalesCtrl',
            resolve:{
                data:function ($q, $route, GILT, $http, $log)
                {
                    var deferred = $q.defer();

                    var successCb = function (result)
                    {
                        deferred.resolve(result);
                        $log.info(result);
                    };

                    var errorCb = function (error)
                    {
                        $log.info(error);
                    };

                    var saleUrl = GILT.SALE + $route.current.params.type + GILT.ACTIVE + GILT.APIKEY + GILT.CALLBACK;
                    $http({method:GILT.METHOD, url:saleUrl}).success(successCb).error(errorCb);

                    return deferred.promise;
                }
            }
        }).
        when('/sale/:type/product/:uri', {templateUrl:'partial/products.html', controller:'ProductsCtrl',
            resolve:{
                data:function ($q, $route, GILT, $http, $log)
                {
                    var deferred = $q.defer();

                    var successCb = function (result)
                    {
                        deferred.resolve(result);
                        $log.info(result);
                    };

                    var errorCb = function (error)
                    {
                        $log.info(error);
                    };

                    var uri = $route.current.params.uri.replace(/_/g,'/');
                    var productURI = GILT.API + uri + GILT.APIKEY + GILT.CALLBACK;

                    $http({method:GILT.METHOD, url:productURI}).success(successCb).error(errorCb);

                    return deferred.promise;
                }
            }
        }).
        //when('/sale/:type/product/:uri/item/:id', {controller:'ProductCtrl', templateUrl:'partial/product.html'}).
        when('/sale/:type/product/:uri/item/:id', {templateUrl:'partial/product.html', controller:'ProductCtrl',
            resolve:{
                promiseData:function ($q, $route, GILT, $http, $log)
                {
                    var deferred = $q.defer();
                    var promiseData = {};

                    var successCb = function (result)
                    {
                        //deferred.resolve(result);
                        promiseData.item = result;
                        $http({method:GILT.METHOD, url:productURI}).success(successCb2).error(errorCb2);
                        $log.info(result);
                    };

                    var errorCb = function (error)
                    {
                        $log.info(error);
                    };

                    var successCb2 = function (result)
                    {
                        promiseData.data = result;
                        deferred.resolve(promiseData);
                        $log.info(result);
                    };

                    var errorCb2 = function (error)
                    {
                        $log.info(error);
                    };

                    var id = $route.current.params.id.replace(/_/g,'/');
                    var itemURI = GILT.API + id + GILT.APIKEY + GILT.CALLBACK;
                    var uri = $route.current.params.uri.replace(/_/g,'/');
                    var productURI = GILT.API + uri + GILT.APIKEY + GILT.CALLBACK;

                    $http({method:GILT.METHOD, url:itemURI}).success(successCb).error(errorCb);

                    return deferred.promise;
                }
            }
        }).
        otherwise({redirectTo:'/'});
    $locationProvider.html5Mode(false);
}]);

