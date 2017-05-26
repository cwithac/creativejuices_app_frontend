console.log('CreativeJuices app is connected.');

const app = angular.module('juicing-app', []);

app.controller('mainController', ['$http', '$scope', function($http, $scope){
  this.title = "Creative Juices"

//------------------------------------------------------
// VARIABLES
//------------------------------------------------------

  //TOGGLE FOR LOCAL/LIVE
  // $scope.baseURL = 'http://localhost:3000/'
  $scope.baseURL = 'https://creative-juices-api.herokuapp.com/'

  $scope.juices = [];

//------------------------------------------------------
// CHECK IF A USER IS LOGGED IN
//------------------------------------------------------

  $scope.userLoggedIn = false;

  $scope.isLoggedIn = () => {
    console.log('isLoggedIn function has been called');
    const jwt = localStorage.getItem('token');
    if (jwt !== 'undefined' && jwt !== undefined & jwt !== null) {
      console.log('Yes, the user is logged in.');
      $scope.userLoggedIn = true;
    } else {
      console.log('No, the user is not logged in.');
      $scope.userLoggedIn = false;
    }
  }

  $scope.isLoggedIn();

}]); //mainController END
