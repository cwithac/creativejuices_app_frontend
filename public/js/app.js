console.log('CreativeJuices app is connected.');

var app = angular.module('juicing-app', []);

app.controller('mainController', ['$http', '$scope', function($http, $scope){
  this.title = "Creative Juices"

  $scope.baseURL = 'http://localhost:3000/'
  // $scope.baseURL = HEROKU

}]); //mainController END
