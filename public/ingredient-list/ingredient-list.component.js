'use strict';

angular
.module('ingredientList').
factory('ingredientListService', ['$http', function($http) {
    
    return {
        getIngredient: function(req) {
            return $http(req).then(function(response) {
                return response.data;
            }, function(err){
                return err;
            });
        }
    }
}])
.directive('ingredientList', ['ingredientListService', '$http', 
    function(ingredientListService, $http) {
    return {
        transclude: true,
        templateUrl: 'ingredient-list/ingredient-list.template.html',
        link: function(scope, element, attr) {
            var req = {
                method: 'GET',
                url: 'dish/' + scope.dish.recipe_id
            }
            if (scope.dish.recipe_id) {
                ingredientListService.getIngredient(req).then(function(data) {
                    // console.log(data);
                    scope.ingredientList = data;
                })
            }
        }
    }
}]);