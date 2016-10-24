'use strict';

angular.
module('dishList').
component('dishList', {
    templateUrl: 'dish-list/dish-list.template.html',
    controller: ['$http', function DishListController($http) {
        var self = this;
        $http.get('/dish').then(function(response) {
            self.dishes = response.data.recipes;
        });
    }]
});