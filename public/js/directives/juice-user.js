angular.module('juicing-app').directive('juiceUser', function() {
  return {
    restrict: 'E',
    templateUrl: '../../partials/juice-user.html',
    controller: 'juiceController',
    controllerAs: 'juiceCtrl'
  };
});
