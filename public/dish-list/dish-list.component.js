'use strict';

angular.
module('dishList').
factory('dishListService', ['$http', function($http) {
    return {
        getDish: function(req) {
            return $http(req).then(function(response) {
                return response.data.recipes;
            });
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
                        self.dishes.push(element);
                    });
                }
                req.headers.page++;
            });
        }

        self.load();

        
        // var self = this;
        // var page = 0;
        // var dishes = [];

        // self.load = function () {
        //     console.log(page);
        //     $http({
        //         method: 'GET',
        //         url: 'dish',
        //         headers: {
        //             query: "",
        //             page: page
        //         }
        //     }).then(function(response){
        //         if (!self.dishes) {
        //             self.dishes = response.data.recipes;
        //             console.log('create new dishes');
        //         } else {
        //             self.dishes.concat(response.data.recipes);
        //             console.log('push array');
        //             console.log(self.dishes);
        //         }
        //         page++;
        //     }, function(error){
        //         console.log(error);
        //     });
        // }
        // self.load();
        
    }]
});