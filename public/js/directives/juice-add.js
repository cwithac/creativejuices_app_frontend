angular.module('juicing-app').directive('juiceAdd', function() {
  return {
    restrict: 'E',
    templateUrl: '../../partials/juice-add.html',
    controller: 'juiceController',
    controllerAs: 'juiceCtrl'
  };
});
