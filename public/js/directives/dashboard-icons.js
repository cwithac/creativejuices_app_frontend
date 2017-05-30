angular.module('juicing-app').directive('dashboardIcons', function() {
  return {
    restrict: 'E',
    templateUrl: '../../partials/dashboard-icons.html',
    controller: 'juiceController',
    controllerAs: 'juiceCtrl'
  };
});
