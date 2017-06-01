angular.module('juicing-app').controller('loginController', ['$http', '$scope',
function($http, $scope) {

//------------------------------------------------------
//VARIABLES
//------------------------------------------------------
  this.user = {};
  this.registerMessage = '';
  this.welcomeMessage = false;
  this.loginMessage = '';
  // this.registerShow = false;
  // this.loginShow = false;

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
      if (response.data.status === 201) {
        console.log('registration', response);
        this.registerMessage = 'Thank you for registering with Creative Juices.  Please sign in to continue.';
        // this.registerShow = false;
        // this.loginShow = false;
        registerData.display = '';
        registerData.username = '';
        registerData.password = '';
      } else if (response.data.status === 422){
        this.registerMessage = 'The username you have selected is already in use.  Please try again.'
      } else {
        this.registerMessage = 'The system is currently down.  Please try again later.'
      }
    }.bind(this));
  };

//------------------------------------------------------
//LOG IN
//------------------------------------------------------
  this.login = function(loginData) {
    this.welcomeMessage = false;
    this.registerMessage = '';
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
      if (response.data.status === 200) {
        this.welcomeMessage = true;
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
        // this.registerShow = false;
        // this.loginShow = false;
      } else {
        this.loginMessage = "Username and password combination are not recognized.  Please try again."
      }
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

  // this.showRegister = function() {
  //   this.registerShow = true;
  //   this.loginShow = false;
  //   this.registerMessage = '';
  //   this.loginMessage = '';
  // };
  //
  // this.hideRegister = function() {
  //   this.registerShow = false;
  //   this.loginShow = false;
  // };
  //
  // this.showLogin = function() {
  //   this.loginShow = true;
  //   this.registerShow = false;
  //   this.registerMessage = '';
  //   this.loginMessage = '';
  // };
  //
  // this.hideLogin = function() {
  //   this.loginShow = false;
  //   this.registerShow = false;
  // };


}]); // END loginController
