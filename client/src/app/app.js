var myApp = angular.module('myApp', [
  // Dependencies
  'ngRoute',
  'myApp.controllers',
  'templates.views'
]);

myApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html'
      })
      .when('/example', {
        templateUrl: 'partials/example.html',
        controller: 'ExampleViewCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
]);
