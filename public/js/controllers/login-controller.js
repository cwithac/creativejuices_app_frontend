angular.module('juicing-app').controller('loginController', ['$http', '$scope',
function($http, $scope) {

  //FOR TESTING ONLY
  // this.test = "Testing loginController"
  this.user = {};

  this.login = function(userPass) {
    console.log(userPass);
    $http({
      method: 'POST',
      url: $scope.baseURL + 'users/login',
      data: {
        user: {
          username: userPass.username,
          password: userPass.password
        }
      },
    }).then(function(response){
      console.log(response);
      this.user = response.data.user;
      localStorage.setItem('token', JSON.stringify(response.data.token));
    }.bind(this));
  };

//FOR TESTING ONLY
  this.getUsers = function() {
    $http({
      url: $scope.baseURL + 'users',
      method: 'GET',
      headers: {
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
    }
    }).then(function(response){
      console.log(response);
      if (response.data.status != 401) {
        this.users = response.data;
      } else {
        this.error = "Unauthorized";
      }
    }.bind(this));
  };

}]); // END loginController
