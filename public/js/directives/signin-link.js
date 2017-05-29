angular.module('juicing-app').directive('signinLink', function() {
  return {
    restrict: 'E',
    templateUrl: '../../partials/signin-link.html',
    controller: 'loginController',
    controllerAs: 'loginCtrl'
  };
});
