angular.module('mainApp').directive('onScroll', function ($window, $log) {
  return {
    restrict: 'A',
    scope: {
      onScroll: '='
    },
    link: function(scope, element, attrs) {
      $log.info(scope.onScroll);
      angular.element($window).bind("scroll", function () {
        scope.onScroll();
        scope.$apply();
      });
    }
  };
});
