angular.module('juicing-app').directive('logoutForm', function() {
  return {
    restrict: 'E',
    templateUrl: '../../partials/logout-form.html',
    controller: 'loginController',
    controllerAs: 'loginCtrl'
  };
});
