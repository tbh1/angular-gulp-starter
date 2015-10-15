(function () {

  angular
  .module('mainApp', ['ui.router'])
  .config(function ($locationProvider, $stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

    .state('home', {
      url: '/home',
      templateUrl: 'components/home/home.html',
      controller: 'HomeController as vmHome'
    })

    .state('blog', {
      url: '/blog',
      templateUrl: 'components/blog/blog.html',
      controller: 'BlogController as vmBlog'
    });

  // $locationProvider.html5Mode(true);
});

})();
