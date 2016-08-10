(function() {
'use strict';
angular
  .module("app")
  .controller('patronController', ['dataServicePatrons', '$routeParams', function (dataServicePatrons, $routeParams) {
    // define view model
    var vm = this;
    // get ID from route params
    vm.ID = $routeParams.id;
    // get all books
    dataServicePatrons.getAll(function(response) {
      vm.getAllPatrons = response.data;
    });
   // new patron object
    vm.newPatron = {};
    // add a patron
    vm.addPatron = function() {
        // add the recipe and then go to the detail screen
        dataServicePatrons.addPatron(vm.newPatron, function(response) {
        vm.success = "Patron Successfully Added!";
        vm.failure = false;
      }, function(error) {
        vm.success = false;
        vm.failure = true;
        vm.errorMessages = error.data.errors;
    });
    };
    //update a patron 
    vm.updatePatron = function() {
      dataServicePatrons.putID(vm.ID, updateObject, function(response) {
          vm.success = "Book Successfully Updated!";
          vm.failure = false;
          vm.book = response.data;
            }, function(reason) {
              vm.success = false;
              vm.failure = true;
              vm.errorMessages = error.data.errors;
            });
          };
    // get specific patron function
    vm.getID = function() {
      dataServicePatrons.getID(vm.ID, function(response) {
      console.log(response.data[0]);
      vm.patronDetails = response.data[0];
      });
    };
    // execute get specific patron function
    vm.getID();
}]);
})();
