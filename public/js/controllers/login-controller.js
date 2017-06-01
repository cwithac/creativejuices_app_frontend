angular.module('juicing-app').controller('loginController', ['$http', '$scope',
function($http, $scope) {

//------------------------------------------------------
//VARIABLES
//------------------------------------------------------
  this.user = {};
  this.registerMessage = '';
  this.welcomeMessage = false;
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
      if (response.data.status === 201) {
        console.log('registration', response);
        this.registerMessage = 'Thank you for registering with Creative Juices.  Please sign in to continue.';
        //saves and sends register information direct to login function
          this.loginData = {
            username: registerData.username,
            password: registerData.password
          }
          this.login();
        registerData.display = '';
        registerData.username = '';
        registerData.password = '';
        closeRegisterModal();
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
//loginCtrl. needed in login-form.html to pass this.loginData through with register>login functionality.

  this.login = function(loginData) {
    this.welcomeMessage = false;
    this.registerMessage = '';
    this.loginMessage = '';
    $http({
      method: 'POST',
      url: $scope.baseURL + 'users/login',
      data: {
        user: this.loginData
      }
    }).then(function(response){
      if (response.data.status === 200) {
        this.welcomeMessage = true;
        console.log('login', response);
        this.user = response.data.user;
        //JWT
        localStorage.setItem('token', JSON.stringify(response.data.token))
        //Username
        localStorage.setItem('username', JSON.stringify(response.data.user.username));
        //User ID
        localStorage.setItem('user_id', JSON.stringify(response.data.user.id));
        $scope.isLoggedIn();
        closeLoginModal();
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
//------------------------------------------------------
//jQuery
//------------------------------------------------------

const $registerModal = $('#register-modal');
const $loginModal = $('#login-modal');
const $registerLink = $('#register-open');
const $loginLink = $('#login-open');
const $registerClose = $('#register-close');
const $loginClose = $('#login-close');


const openLoginModal = () => {
  $loginModal.css('display', 'block');
  $registerModal.css('display', 'none');
};

const closeLoginModal = () => {
  $loginModal.css('display', 'none');
};

const openRegisterModal = () => {
  $registerModal.css('display', 'block');
  $loginModal.css('display', 'none');
};

const closeRegisterModal = () => {
  $registerModal.css('display', 'none');
};

$loginLink.on('click',  openLoginModal);
$loginClose.on('click', closeLoginModal);
$registerLink.on('click', openRegisterModal);
$registerClose.on('click', closeRegisterModal);


}]); // END loginController
