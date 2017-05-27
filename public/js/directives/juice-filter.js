angular.module('juicing-app').directive('juiceFilter', function() {
  return {
    restrict: 'E',
    templateUrl: '../../partials/juice-filter.html',
    controller: 'juiceController',
    controllerAs: 'juiceCtrl'
  };
});
