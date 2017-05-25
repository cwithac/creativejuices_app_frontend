angular.module('juicing-app').directive('juiceShow', function() {
  return {
    restrict: 'E',
    templateUrl: '../../partials/juice-show.html',
    controller: 'juiceController',
    controllerAs: 'juiceCtrl'
  };
});
