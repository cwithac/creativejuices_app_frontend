// console.log('CreativeJuices app is connected.');

const app = angular.module('juicing-app', []);

app.controller('mainController', ['$http', '$scope', function($http, $scope){
  this.title = "Creative Juices"

//------------------------------------------------------
// VARIABLES
//------------------------------------------------------

  //TOGGLE FOR LOCAL/LIVE
  $scope.baseURL = 'http://localhost:3000/';
  // $scope.baseURL = 'https://creative-juices-api.herokuapp.com/';

  $scope.juices = [];

  $scope.userData = {};

//------------------------------------------------------
// CHECK IF A USER IS LOGGED IN
//------------------------------------------------------

  $scope.userLoggedIn = false;

  $scope.isLoggedIn = () => {
    // console.log('isLoggedIn function has been called');
    //Verifies a jwt user is created
    const jwt = localStorage.getItem('token');
    if (jwt !== 'undefined' && jwt !== undefined & jwt !== null) {
      // console.log('Yes, the user is logged in.');
      //Accesses user 'username' upon login
      $scope.userData.username = JSON.parse(localStorage.getItem('username'));
      //Accesses user 'id' upon login
      $scope.userData.id = JSON.parse(localStorage.getItem('user_id'));
      $scope.userLoggedIn = true;
    } else {
      // console.log('No, the user is not logged in.');
      $scope.userLoggedIn = false;
    }
  };

  //------------------------------------------------------
  // SHOW EDIT AND DELETE BUTTONS DEPENDENT ON USER LOGIN/CREATION
  //------------------------------------------------------

  $scope.showButtons = function() {
    const currentUser = $scope.userData.id;
    const juiceList = $scope.juices;
      for (var i = 0; i < juiceList.length; i++) {
        if (currentUser === juiceList[i].user_id) {
          juiceList[i].editButton = true;
          juiceList[i].deleteButton = true;
      } else {
          juiceList[i].editButton = false;
          juiceList[i].deleteButton = false;
      }
    };
  };

  //------------------------------------------------------
  // CALLS FUNCTION AT WINDOW LOAD
  //------------------------------------------------------

  $scope.isLoggedIn();

}]); //mainController END
