'use strict';

angular
.module('ingredientList')
.component('ingredientList',{
    template: '<p>{{$ctrl.test}}</p>',
    controller: ['$http', 
    function IngredientListController($http) {
        var self = this;
        self.test = "blah";        
    }]
});