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

directives.directive('productPreview', function ($log, $parse) {

    function link(scope, element, attr, ctrl) {

        // Register the event listeners.
        element.bind( 'mouseenter', function() {
            scope.isOpen = true;
        });
        element.bind( 'mouseleave', function() {
            scope.isOpen = false;
        });
    }

    return {
        replace:true,
        restrict:'E',
        templateUrl:'partial/product-preview.html',
        link:link
    }
});

directives.directive('productDetail', function ($log, $parse) {

    function link(scope, element, attr, ctrl) {

        // By default, the tooltip is not open.
        scope.isOpen = false;

        // Calculate the current position and size of the directive element.
        function getPosition(elem) {
            return {
                width: elem.prop( 'offsetWidth' ),
                height: elem.prop( 'offsetHeight' ),
                top: elem.prop( 'offsetTop' ),
                left: elem.prop( 'offsetLeft' )
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
            element.css({ top: 0, left: 0, display: 'block' });

            position = getPosition(element.parent());

            limit = getPosition(element.parent().parent());

            // Get the height and width of the tooltip so we can center it.
            ttWidth = element.prop( 'offsetWidth' );
            ttHeight = element.prop( 'offsetHeight' );

            var scrollTop = $(document).scrollTop()
            var scrollBottom = $(window).scrollTop() + $(window).height();

            ttPosition = {};

            function getX(v){
                var x;
                if(v - ttWidth < 0){
                    x = 'right';
                }else{
                    x = 'left';
                }
                return x;
            }


            function getY(v){
                var y;

                if(v - ttHeight/2 < scrollTop ){
                    y = 'top';
                }else if(v + position.height + ttHeight/2 > scrollBottom){
                    y = 'bottom';
                }else{
                    y = 'middle';
                }

                return y;
            }

            function getTop(v){
                var top;

                if(v === 'top'){
                    top = position.top  + 'px';
                }else if(v === 'bottom'){
                    top = ((position.top + position.height)  - ttHeight)  + 'px';
                }else if(v === 'middle'){
                    top = ((position.top + position.height / 2)  - ttHeight/2) + 'px';
                }

                return top;
            }

            function getLeft(v){
                var left;

                if( v === 'right' ){
                    left = (position.left + position.width) + 'px';
                }else{
                    left = (position.left - ttWidth) + 'px';
                }

                return left;
            }

            function getArrowTop(v){
                var top;

                if(v === 'top'){
                    top = 20 + 'px'
                }else if(v === 'bottom'){
                    top = ttHeight - 60 + 'px';
                }else if(v === 'middle'){
                    top =  (ttHeight / 2 ) - 20 + 'px';
                }

                return top;
            }

            function getArrowLeft(v){
                var left;

                if( v === 'right' ){
                    left = -20 + 'px';
                }else{
                    left = ttWidth + 'px';
                }

                return left;
            }

            ttPosition.x = getX(position.left);
            ttPosition.y = getY(position.top);

            ttPosition.left = getLeft(ttPosition.x);
            ttPosition.top = getTop(ttPosition.y);

            var arrowPosition = {};

            scope.getArrow = function(){
                var arrow;
                if(ttPosition.x === 'left'){
                    arrow = 'arrow-right';
                }else{
                    arrow = 'arrow-left';
                }
                return arrow;
            }

            arrowPosition.left = getArrowLeft(ttPosition.x);
            arrowPosition.top = getArrowTop(ttPosition.y);

            // Now set the calculated positioning.
            element.css( ttPosition );
            $('.arrow').css( arrowPosition );

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

        // Register the event listeners.
        element.parent().bind( 'mouseenter', function() {
            scope.$apply( show );
        });
        element.parent().bind( 'mouseleave', function() {
            scope.$apply( hide );
        });
    }

    return {
        restrict:'E',
        replace: true,
        templateUrl:'partial/product-detail.html',
        link:link
    }
});