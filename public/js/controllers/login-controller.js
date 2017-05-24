angular.module('juicing-app').controller('loginController', ['$http', '$scope',
function($http, $scope) {

  // this.test = "Testing loginController"

  this.login = function(userPass) {
    console.log(userPass);
  };

}]); // END loginController
