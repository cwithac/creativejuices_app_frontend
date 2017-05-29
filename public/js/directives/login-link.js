angular.module('juicing-app').directive('loginLink', function() {
  return {
    restrict: 'E',
    templateUrl: '../../partials/login-link.html',
    controller: 'loginController',
    controllerAs: 'loginCtrl'
  };
});
