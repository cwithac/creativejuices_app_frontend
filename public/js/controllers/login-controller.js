angular.module('juicing-app').controller('loginController', ['$http', '$scope',
function($http, $scope) {

//------------------------------------------------------
//VARIABLES
//------------------------------------------------------
  this.user = {};
  this.reigsterMessage = '';
  this.loginMessage = '';

//------------------------------------------------------
//REGISTER
//------------------------------------------------------

  this.register = function(registerData) {
    this.reigsterMessage = '';
    $http({
      method: 'POST',
      url: $scope.baseURL + 'users',
      data: {
        user: {
          display: registerData.display,
          username: registerData.username,
          password: registerData.password
        }
      }
    }).then(function(response){
      this.reigsterMessage = 'Successful Registration';
      console.log('registration', response);
      registerData.display = '';
      registerData.username = '';
      registerData.password = '';
    }.bind(this));
  };

//------------------------------------------------------
//LOG IN
//------------------------------------------------------
  this.login = function(loginData) {
    this.loginMessage = '';
    $http({
      method: 'POST',
      url: $scope.baseURL + 'users/login',
      data: {
        user: {
          username: loginData.username,
          password: loginData.password
        }
      }
    }).then(function(response){
      this.loginMessage = 'Successful Login';
      console.log('login', response);
      this.user = response.data.user;
      loginData.username = '';
      loginData.password = '';
      localStorage.setItem('token', JSON.stringify(response.data.token));
      $scope.isLoggedIn();
    }.bind(this));
  };

//------------------------------------------------------
//LOG OUT
//------------------------------------------------------
  this.logout = function() {
    localStorage.clear('token');
    location.reload();
  };

  //FOR TESTING ONLY
    // this.getUsers = function() {
    //   $http({
    //     url: $scope.baseURL + 'users',
    //     method: 'GET',
    //     headers: {
    //     'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
    //   }
    //   }).then(function(response){
    //     console.log(response);
    //     if (response.data.status != 401) {
    //       this.users = response.data;
    //     } else {
    //       this.error = "Unauthorized";
    //     }
    //   }.bind(this));
    // };

}]); // END loginController
