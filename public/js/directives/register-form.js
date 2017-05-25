angular.module('juicing-app').directive('registerForm', function() {
  return {
    restrict: 'E',
    templateUrl: '../../partials/register-form.html',
    controller: 'loginController',
    controllerAs: 'loginCtrl'
  };
});
