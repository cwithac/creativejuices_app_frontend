angular.module('juicing-app').directive('appHowto', function() {
  return {
    restrict: 'E',
    templateUrl: '../../partials/app-howto.html',
    controller: 'juiceController',
    controllerAs: 'juiceCtrl'
  };
});
