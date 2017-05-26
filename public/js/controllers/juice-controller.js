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
//EDIT INDIVIDUAL JUICE
//------------------------------------------------------

  this.editOneJuice = function(juice) {
    $http({
      method: 'PUT',
      url: $scope.baseURL + 'juices/' + juice.id,
      headers: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
        },
      data: {
        juice: {
          title: juice.title,
          ingredients: juice.ingredients,
          notes: juice.notes,
          tag_type: juice.tag_type,
          tag_ingredients: juice.tag_ingredients,
          tag_flavor: juice.tag_flavor
        }
      }
    }).then(function(response){
      console.log('edited juice', response);
      this.getAllJuices();
      this.singleJuice = "";
    }.bind(this));
  };

//------------------------------------------------------
//DELETE INDIVIDUAL JUICE
//------------------------------------------------------

  this.deleteOneJuice = function(juice) {
    $http({
      method: 'DELETE',
      url: $scope.baseURL + 'juices/' + juice.id,
      headers: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
        }
    }).then(function(response){
      console.log('deleted juice', response);
      this.getAllJuices();
    }.bind(this));
  };

//------------------------------------------------------
// CALLS GET ALL JUICES AT WINDLOW LOAD
//------------------------------------------------------
  this.getAllJuices();


}]); // END juiceController
