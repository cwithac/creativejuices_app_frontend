angular.module('juicing-app').controller('juiceController', ['$http', '$scope',
function($http, $scope) {

//------------------------------------------------------
//VARIABLES
//------------------------------------------------------

  this.singleJuice = [];
  this.formData = {};
  this.filterBase = {};
  this.filterType = {};
  this.filterFlavor = {};
  this.editButton = false;
  this.deleteButton = false;
  this.userList = false;
  this.userProfile = false;
  this.addShown = false;
  this.editShown = false;
  this.showShown = false;
  this.showHowTo = true;
  this.addAlert = '';

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
      this.showShown = true;
      this.showHowTo = false;
    }.bind(this));
  };

//------------------------------------------------------
//ADD INDIVIDUAL JUICE ROUTE
//------------------------------------------------------

  this.addOneJuice = function() {
    this.addAlert = '';
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
      if (response.data.status === 201) {
        console.log('new juice', response);
        this.formData = {};
        this.addShown = false;
        this.showShown = false;
        this.showHowTo = true;
        this.getAllJuices();
      } else {
        console.log('response.data.status', response.data.status);
        this.addAlert = 'Please check your input and try again.'
      }

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
      this.editShown = false;
      this.showShown = false;
      this.userProfile = false;
      this.showHowTo = true;
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
      this.editShown = false;
      this.showShown = false;
      this.userProfile = false;
      this.showHowTo = true;
    }.bind(this));
  };

//------------------------------------------------------
// FILTERING WITHIN JUICE INDEX
//------------------------------------------------------
//REFERENCE: http://stackoverflow.com/questions/23983322/angularjs-checkbox-filter
//REFERENCE: https://github.com/adamsmith2012/events_app_frontend

  function noFilter(filterObj) {
    return Object.keys(filterObj).every(function (key) {
      return !filterObj[key];
    });
  };

    this.filterJuice = function(juice) {
      const baseFilter = this.filterBase;
      const typeFilter = this.filterType;
      const flavorFilter = this.filterFlavor;
      return (baseFilter[juice.tag_ingredients] || noFilter(baseFilter)) &&
             (typeFilter[juice.tag_type] || noFilter(typeFilter)) &&
             (flavorFilter[juice.tag_flavor] || noFilter(flavorFilter))
    }.bind(this);

    this.userListTrue = function() {
      const currentUser = $scope.userData.id;
      const juiceList = $scope.juices;
      this.userProfile = true;
      this.addShown = false;
      this.editShown = false;
      this.showShown = false;
      this.showHowTo = false;
        for (var i = 0; i < juiceList.length; i++) {
          if (currentUser === juiceList[i].user_id) {
            juiceList[i].userList = true;
            $scope.showButtons();
        } else {
            juiceList[i].userList = false;
        }
      };
    };

    this.userListFalse = function() {
      const currentUser = $scope.userData.id;
      const juiceList = $scope.juices;
      this.userProfile = false;
      this.showHowTo = true;
        for (var i = 0; i < juiceList.length; i++) {
          if (currentUser === juiceList[i].user_id) {
            juiceList[i].userList = false;
        } else {
            juiceList[i].userList = false;
        }
      };
    };

//------------------------------------------------------
// ADD/EDIT/SHOW HIDE/SHOW
//------------------------------------------------------

    this.showAddForm = function() {
      this.addShown = true;
      this.editShown = false;
      this.userProfile = false;
      this.showShown = false;
      this.showHowTo = false;
    };

    this.hideAddForm = function() {
      this.addShown = false;
      this.editShown = false;
      this.userProfile = false;
      this.showShown = false;
      this.showHowTo = true;
    };

    this.showEditForm = function() {
      this.addShown = false;
      this.userProfile = false;
      this.showShown = false;
      this.editShown = true;
      this.showHowTo = false;
    };

    this.hideEditForm = function() {
      this.addShown = false;
      this.editShown = false;
      this.userProfile = false;
      this.showShown = false;
      this.showHowTo = true;
    };

//------------------------------------------------------
// CALLS GET ALL JUICES AT WINDLOW LOAD
//------------------------------------------------------
  this.getAllJuices();


}]); // END juiceController
