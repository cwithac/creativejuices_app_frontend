angular.module('juicing-app').directive('juiceIndex', function() {
  return {
    restrict: 'E',
    templateUrl: '../../partials/juice-index.html',
    controller: 'juiceController',
    controllerAs: 'juiceCtrl'
  };
});
