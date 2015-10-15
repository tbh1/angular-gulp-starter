angular.module('mainApp').controller('HomeController',
function($timeout, $log) {

	'use strict';
	var vm = this;

	var downArrowTimer = $timeout(function () {
		vm.showDownArrow = true;
	}, 4000);

	vm.hideDownArrow = function () {
		$timeout.cancel(downArrowTimer);
		vm.showDownArrow = false;
	};

});
