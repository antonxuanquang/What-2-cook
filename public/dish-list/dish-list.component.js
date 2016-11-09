'use strict';

angular.
module('dishList').
factory('dishListService', ['$http', function($http) {
    return {
        getDish: function(req) {
            return $http(req).then(function(response) {
                return response.data.recipes || response.data;
            }, function(err){
                return err;
            });
        }
    }
}])
.directive('scrollTrigger', ['$window', function($window) {
    return {
        link: function(scope, element, attrs) {
            var e = jQuery(element[0]);
            var scrollFunction = function() {
                if (window.pageYOffset + 1000 > e.context.offsetHeight) {
                    angular.element(document).unbind('scroll');
                    scope.$apply(attrs.scrollTrigger);
                    setTimeout(function() {
                        angular.element(document).bind('scroll', scrollFunction);
                    }, 1000);
                }
            };
            angular.element(document).bind('scroll', scrollFunction);
        }
    }
}])
.component('dishList', {
    templateUrl: 'dish-list/dish-list.template.html',
    controller: ['$http', 'dishListService', 
    function DishListController($http, dishListService) {
        var self = this;
        var page = 0;
        var req = {
            method: 'GET',
            url: 'dish',
            headers: {
                query: "",
                page: page
            }
        }

        self.page = req.headers.page;

        self.load = function() {
            dishListService.getDish(req).then(function(data) {
                if (!self.dishes) self.dishes = data;
                else {
                    data.forEach(function(element) {
                        if (element) self.dishes.push(element);
                    });
                }
                req.headers.page++;
            }, function(err) {
                console.log(err);
            });
        }
        self.load();        
    }]
});