angular.module('juicing-app').controller('loginController', ['$http', '$scope',
function($http, $scope) {

//------------------------------------------------------
//VARIABLES
//------------------------------------------------------
  this.user = {};
  this.reigsterMessage = '';
  this.loginMessage = '';
  this.registerShow = false;
  this.loginShow = false;

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
      this.reigsterMessage = 'Thank you for registering with Creative Juices.  Please sign in to continue.';
      this.registerShow = false;
      this.loginShow = false;
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
      //JWT
      localStorage.setItem('token', JSON.stringify(response.data.token))
      //Username
      localStorage.setItem('username', JSON.stringify(response.data.user.username));
      //User ID
      localStorage.setItem('user_id', JSON.stringify(response.data.user.id));
      $scope.isLoggedIn();
      this.registerShow = false;
      this.loginShow = false;
    }.bind(this));
  };

//------------------------------------------------------
//LOG OUT
//------------------------------------------------------
  this.logout = function() {
    localStorage.clear('token');
    location.reload();
  };

//------------------------------------------------------
//SHOW/HIDE REGISTRATION & LOGIN
//------------------------------------------------------

  this.showRegister = function() {
    this.registerShow = true;
  };

  this.hideRegister = function() {
    this.registerShow = false;
  };

  this.showLogin = function() {
    this.loginShow = true;
  };

  this.hideLogin = function() {
    this.loginShow = false;
  };


}]); // END loginController
