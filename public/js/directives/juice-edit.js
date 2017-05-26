angular.module('juicing-app').directive('juiceEdit', function() {
  return {
    restrict: 'E',
    templateUrl: '../../partials/juice-edit.html',
    controller: 'juiceController',
    controllerAs: 'juiceCtrl'
  };
});
