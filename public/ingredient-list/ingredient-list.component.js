'use strict';

angular
.module('ingredientList').
factory('ingredientListService', ['$http', function($http) {
    
    return {
        transclude: true,
        getIngredient: function(req) {
            return $http(req).then(function(response) {
                return response.data.recipes || response.data;
            }, function(err){
                return err;
            });
        }
    }
}])
// .component('ingredientList',{
//     transclude: true,
//     templateUrl: 'ingredient-list/ingredient-list.template.html',
//     controller: ['$http', '$attrs', 'ingredientListService',
//     function IngredientListController($http, $attrs, ingredientListService) {
//         // console.log('test');
//         var self = this;
//         console.log($attrs);
//         // console.log('this');
//         self.test = $attrs.ingredientId;
//         // var req = {
//         //     method: 'GET',
//         //     url: 'dish'
//         // }
//     }]
// });
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
                    scope.ingredientList = data.ingredients;
                })
            }
        }
    }
}]);