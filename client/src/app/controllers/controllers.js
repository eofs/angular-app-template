var controllers = angular.module('myApp.controllers', ['ui.unique']);


controllers.controller('ExampleViewCtrl', ['$scope',
  function($scope) {
    $scope.makers = [
      {name: 'Skoda Auto', country: 'Czech Republic'},
      {name: 'Praga', country: 'Czech Republic'},
      {name: 'Tatra', country: 'Czech Republic'},
      {name: 'Audi', country: 'Germany'},
      {name: 'BMW', country: 'Germany'},
      {name: 'Opel', country: 'Germany'},
      {name: 'Porche', country: 'Germany'},
      {name: 'Cadillac', country: 'USA'},
      {name: 'Chrysler', country: 'USA'},
      {name: 'Ford', country: 'USA'},
      {name: 'Jeep', country: 'USA'}
    ];

    $scope.query = {
      order: 'name'
    };

    $scope.isCountry = function(maker) {
      return maker.country === $scope.query.country;
    }
  }
]);
