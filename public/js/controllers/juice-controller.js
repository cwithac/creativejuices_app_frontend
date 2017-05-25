angular.module('juicing-app').controller('juiceController', ['$http', '$scope',
function($http, $scope) {

//------------------------------------------------------
//VARIABLES
//------------------------------------------------------

  this.singleJuice = [];

//------------------------------------------------------
//INDEX ROUTE FOR ALL JUICES
//------------------------------------------------------

  this.getAllJuices = function() {
    $http({
      method: 'GET',
      url: $scope.baseURL + 'juices',
    }).then(function(response){
      $scope.juices = response.data;
      console.log('$scope.juices', $scope.juices);
    }.bind(this));
  };

//------------------------------------------------------
//SHOW INDIVIDUAL JUICE ROUTE
//------------------------------------------------------

  this.showOneJuice = function(juiceID) {
    $http({
      method: 'GET',
      url: $scope.baseURL + 'juices/' + juiceID,
    }).then(function(response){
      console.log('individual juice', response.data);
      this.singleJuice = response.data;
    }.bind(this));
  };

//------------------------------------------------------
// CALLS GET ALL JUICES AT WINDLOW LOAD
//------------------------------------------------------
  this.getAllJuices();


}]); // END juiceController
