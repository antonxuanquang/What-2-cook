describe('dish List controller', function() {
    var controller;
    var scope;
    
    beforeEach(angular.mock.module('dishList'));

    beforeEach(inject(function ($controller, $rootScope) {
        controller = $controller;
        scope = $rootScope.$new();
    }));
});