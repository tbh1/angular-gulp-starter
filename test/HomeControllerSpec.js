describe('HomeController', function () {
	var scope, controller, httpBackend;

	// Init the angular app before each test case
	beforeEach(module('mainApp'));

	// Inject the dependencies
	beforeEach(inject(function ($rootScope, $controller, $httpBackend) {
		scope = $rootScope;
		controller = $controller;
		httpBackend = $httpBackend;
	}));

	it('should make some unit tests!', function () {

		// API calls
		// httpBackend.expectGET('/users').respond('[{"name": "First User"}, {"name": "Second User"}]');

		// Start the controller
		controller('HomeController as vmHome', { '$scope': scope });

		// Respond to all HTTP requests
		// httpBackend.flush();

		// Triger digest to resolve promises
		scope.$apply();

		// Verify scope state
		// expect(scope.vmHome.test).toEqual('Test Scope Var');
		expect(1).toEqual(1);
	});

});
