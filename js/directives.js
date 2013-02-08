'use strict';
/* http://docs-next.angularjs.org/api/angular.module.ng.$compileProvider.directive */

var directives = angular.module('GiltApp.directives', []);


directives.directive('renderComplete', function ($log) {
    return {
        replace:false,
        restrict:'A',
        link:function (scope, elem, attr, ctrl) {
            if (scope.$last === true) {
                scope.renderComplete();
            }
        }
    }
});

directives.directive('setHeightFrom', function ($log, $parse, $timeout) {

    function link(scope, element, attr, ctrl) {

        scope.$watch(function () {
            return $('#' + attr.setHeightFrom).height();
        }, function (newValue) {
            //$log.info('setHeightFrom' + newValue);

            $timeout(function(){
                $('#' + attr.setHeightFrom).scope().$digest();
            }, 100);

            element.height(newValue + 20);
        });
    }

    return {
        restrict:'A',
        link:link
    }
});

directives.directive('imgFadeIn', function ($log, $parse, $timeout) {
    function link(scope, element, attr, ctrl) {

        element.load(function () {
            $log.info('load')
            $(this).fadeTo(500,1);
        });
    }

    return {
        restrict:'A',
        link:link
    }
});


directives.directive('mainNav', function ($log, $parse) {

    function link(scope, elem, attr, ctrl) {

    }

    return {
        replace:true,
        restrict:'E',
        scope:{},
        templateUrl:'partial/main-nav.html',
        link:link
    }
});

directives.directive('mainContent', function ($log, $parse) {

    function link(scope, elem, attr, ctrl) {
    }

    return {
        replace:true,
        restrict:'E',
        scope:{},
        templateUrl:'partial/main-content.html',
        link:link
    }
});

directives.directive('saleThumb', function ($log, $parse, $timeout) {

    function link(scope, element, attr, ctrl) {

    }

    return {
        replace:true,
        restrict:'E',
        templateUrl:'partial/sale-thumb.html',
        link:link
    }
});


directives.directive('salePopup', function ($log, $parse, $timeout) {

    function link(scope, element, attr, ctrl) {

        // By default, the tooltip is not open.
        scope.isOpen = false;

        // Calculate the current position and size of the directive element.
        function getPosition(elem) {
            return {
                width:elem.prop('offsetWidth'),
                height:elem.prop('offsetHeight'),
                top:elem.prop('offsetTop'),
                left:elem.prop('offsetLeft')
            };
        }

        // Show the tooltip popup element.
        function show() {
            var position,
                ttWidth,
                ttHeight,
                ttPosition,
                limit;

            // Set the initial positioning.
            element.css({ top:0, left:0, display:'block' });

            position = getPosition(element.parent());

            limit = getPosition(element.parent().parent());

            // Get the height and width of the tooltip so we can center it.
            ttWidth = element.prop('offsetWidth');
            ttHeight = element.prop('offsetHeight');

            var scrollTop = $(document).scrollTop()
            var scrollBottom = $(window).scrollTop() + $(window).height();

            ttPosition = {};

            function getX(v) {
                var x;
                if (v - ttWidth < 0) {
                    x = 'right';
                } else {
                    x = 'left';
                }
                return x;
            }


            function getY(v) {
                var y;

                if (v - ttHeight / 2 < scrollTop) {
                    y = 'top';
                } else if (v + position.height + ttHeight / 2 > scrollBottom) {
                    y = 'bottom';
                } else {
                    y = 'middle';
                }

                return y;
            }

            function getTop(v) {
                var top;

                if (v === 'top') {
                    top = position.top + 'px';
                } else if (v === 'bottom') {
                    top = ((position.top + position.height) - ttHeight) + 'px';
                } else if (v === 'middle') {
                    top = ((position.top + position.height / 2) - ttHeight / 2) + 'px';
                }

                return top;
            }

            function getLeft(v) {
                var left;

                if (v === 'right') {
                    left = (position.left + position.width) + 'px';
                } else {
                    left = (position.left - ttWidth) + 'px';
                }

                return left;
            }

            function getArrowTop(v) {
                var top;

                if (v === 'top') {
                    top = 20 + 'px'
                } else if (v === 'bottom') {
                    top = ttHeight - 60 + 'px';
                } else if (v === 'middle') {
                    top = (ttHeight / 2 ) - 20 + 'px';
                }

                return top;
            }

            function getArrowLeft(v) {
                var left;

                if (v === 'right') {
                    left = -20 + 'px';
                } else {
                    left = ttWidth + 'px';
                }

                return left;
            }

            ttPosition.x = getX(position.left);
            ttPosition.y = getY(position.top);

            ttPosition.left = getLeft(ttPosition.x);
            ttPosition.top = getTop(ttPosition.y);

            var arrowPosition = {};

            scope.getArrow = function () {
                var arrow;
                if (ttPosition.x === 'left') {
                    arrow = (ttPosition.y === 'top') ? 'arrow-right-b' : 'arrow-right-w';
                } else {
                    arrow = (ttPosition.y === 'top') ? 'arrow-left-b' : 'arrow-left-w';
                }
                return arrow;
            }

            arrowPosition.left = getArrowLeft(ttPosition.x);
            arrowPosition.top = getArrowTop(ttPosition.y);

            // Now set the calculated positioning.
            element.css(ttPosition);
            $('.arrow').css(arrowPosition);

            // And show the tooltip.
            scope.isOpen = true;
        }

        // Hide the tooltip popup element.
        function hide() {
            // First things first: we don't show it anymore.
            //tooltip.removeClass( 'in' );
            scope.isOpen = false;
            //element.remove();

        }


        var timeoutId;

        element.parent().bind('mouseenter', function () {
            timeoutId = $timeout(function () {
                scope.$apply(show);
            }, 1000);


        });
        element.parent().bind('mouseleave', function () {
            scope.$apply(hide);
            $timeout.cancel(timeoutId);
        });
    }

    return {
        restrict:'E',
        replace:true,
        templateUrl:'partial/sale-popup.html',
        link:link
    }
});

directives.directive('productThumb', function ($log, $parse, $http, GILT) {

    function link(scope, elem, attr, ctrl) {

        var productUrl = scope.item + GILT.APIKEY + GILT.CALLBACK;

        $http({method:GILT.METHOD, url:productUrl}).success(success).error(error);

        function success(data, status) {
            scope.status = status;
            scope.data = data;
            //$log.info(data);
        }

        function error(data, status) {
            scope.data = data || "Request failed";
            scope.status = status;
        }
    }

    return {
        replace:true,
        restrict:'E',
        templateUrl:'partial/product-thumb.html',
        link:link
    }
});

directives.directive('testView', function ($http, $templateCache, $route, $anchorScroll, $compile, $controller, $log, $timeout) {

    return {
        restrict:'ECA',
        terminal:true,
        link:function (scope, element, attr) {
            var lastScope, locals, template, state, templateLoaded,
                time = 1000,
                onloadExp = attr.onload || '';

            scope.$on('$routeChangeStart', fadeOut);

            scope.$on('$routeChangeSuccess', update);
            update();


            function destroyLastScope() {
                if (lastScope) {
                    lastScope.$destroy();
                    lastScope = null;
                }
            }

            function clearContent() {
                element.html('');
                destroyLastScope();
            }

            function compileTemplate(){
                element.html(template);
                destroyLastScope();

                var link = $compile(element.contents()),
                    current = $route.current,
                    controller;

                lastScope = current.scope = scope.$new();
                if (current.controller) {
                    locals.$scope = lastScope;
                    controller = $controller(current.controller, locals);
                    element.contents().data('$ngControllerController', controller);
                }

                link(lastScope);
                lastScope.$emit('$viewContentLoaded');
                lastScope.$eval(onloadExp);

                $timeout(function(){
                    lastScope.$digest();
                },0 );

                // $anchorScroll might listen on event...
                $anchorScroll();
            }

            function fadeIn(){
                compileTemplate();
                templateLoaded = false;
                element.fadeTo(time, 1, function () {
                    $log.info('fade-in content');
                    fadeInComplete();
                });
            }

            function fadeInComplete() {
                $log.info('fade-in content complete');
            }

            function fadeOut(){

                if (element.html() !== ''){
                    state = 'fading-out-template';
                    element.fadeTo(time,0, function () {
                        fadeOutComplete();
                    });
                }else{
                    state = 'waiting-for-template';
                }
            }

            function fadeOutComplete() {
                clearContent();
                state = 'waiting-for-template';
                if(templateLoaded){
                    fadeIn();
                }
            }

            function update() {

                templateLoaded = true;
                locals = $route.current && $route.current.locals;
                template = locals && locals.$template;

                if (template && template !== '') {

                    $log.info('Content Loaded');

                    if(state === 'fading-out-template') return;

                    fadeIn();
                }
            }
        }
    };
});