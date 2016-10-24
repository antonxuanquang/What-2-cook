'use strict';

angular.
    module('dishList').
    component('dishList', {
        templateUrl: 'dish-list/dish-list.template.html',
        controller: function DishListController() {
            this.things = "blah";
        }
    });