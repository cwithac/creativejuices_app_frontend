angular.module('juicing-app').directive('messages', function() {
  return {
    restrict: 'E',
    templateUrl: '../../partials/messages.html',
    controller: 'loginController',
    controllerAs: 'loginCtrl'
  };
});
