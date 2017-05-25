angular.module('juicing-app').controller('juiceController', ['$http', '$scope',
function($http, $scope) {

//------------------------------------------------------
//VARIABLES
//------------------------------------------------------

//------------------------------------------------------
//INDEX ROUTE FOR ALL JUICES
//------------------------------------------------------

  this.getAllJuices = function() {
    $http({
      method: 'GET',
      url: $scope.baseURL + 'juices',
    }).then(function(response){
      console.log('all juices', response);
      $scope.juices = response.data;
      console.log('$scope.juices', $scope.juices);
    }.bind(this));
  };

  this.getAllJuices();

}]); // END juiceController
