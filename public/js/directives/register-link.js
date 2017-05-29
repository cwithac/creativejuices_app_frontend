angular.module('juicing-app').directive('registerLink', function() {
  return {
    restrict: 'E',
    templateUrl: '../../partials/register-link.html',
    controller: 'loginController',
    controllerAs: 'loginCtrl'
  };
});
