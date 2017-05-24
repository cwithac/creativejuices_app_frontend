angular.module('juicing-app').controller('loginController', ['$http', '$scope',
function($http, $scope) {

  // this.test = "Testing loginController"

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
    });
  };

}]); // END loginController
