angular.module('juicing-app').controller('juiceController', ['$http', '$scope',
function($http, $scope) {

//------------------------------------------------------
//VARIABLES
//------------------------------------------------------

  this.singleJuice = [];
  this.formData = {};

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
//SHOW INDIVIDUAL JUICE ROUTE
//------------------------------------------------------

  this.addOneJuice = function() {
    $http({
      method: 'POST',
      url: $scope.baseURL + 'juices',
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
      },
      data : {
        juice: {
          title: this.formData.title,
          ingredients: this.formData.ingredients,
          notes: this.formData.notes,
          tag_type: this.formData.tag_type,
          tag_ingredients: this.formData.tag_ingredients,
          tag_flavor: this.formData.tag_flavor
        }
      }
    }).then(function(response){
      console.log('new juice', response);
      this.formData = {};
      this.getAllJuices();
    }.bind(this));
  };

//------------------------------------------------------
// CALLS GET ALL JUICES AT WINDLOW LOAD
//------------------------------------------------------
  this.getAllJuices();


}]); // END juiceController
