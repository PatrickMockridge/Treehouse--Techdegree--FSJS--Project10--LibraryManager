(function() {
'use strict';
angular
  .module("app")
  .controller('loanController', ['moment', '$scope', 'dataServiceLoans', 'dataServiceBooks', 'dataServicePatrons', '$routeParams', function(moment, $scope, dataServiceLoans,dataServiceBooks, dataServicePatrons, $routeParams){
    // define view model
    var vm = this;
    // get all books
    dataServiceBooks.getAll(function(response) {
      vm.getAllBooks = response.data;
    });
    // get all patrons
    dataServicePatrons.getAll(function(response) {
      vm.getAllPatrons = response.data;
    });
    // get loan id from route params
    vm.ID = $routeParams.id;
    // use moment to generate loaned on and return dates
    vm.returnDate = new moment().add(7,'d').format('YYYY-MM-DD');
    vm.todaysDate = new moment().format('YYYY-MM-DD');
    // get all loans
    dataServiceLoans.getAll(function(response) {
      vm.getAllLoans = response.data;
    });
    // get checked-out loans
     dataServiceLoans.getCheckedOutLoans(function(response) {
       vm.checkedOutLoans = response.data;
       console.log(vm.checkedOutLoans);
     });
     //get overdue loans
     dataServiceLoans.getOverDueLoans(function(response) {
       vm.overdueLoans = response.data;
     });
   // new loan object
    vm.newLoan = {};
    vm.newLoan.returned_on = null;
    // create loan function
    vm.createLoan = function() {

        dataServiceLoans.createLoan(vm.newLoan, function(response) {
          vm.success = "Loan Successfully Created!";
          vm.failure = false;
        }, function(error) {
          vm.success = false;
          vm.failure = true;
          vm.errorMessages = error.data.errors
        });
      };
    // update loan function
    vm.updateLoan = function() {
      dataServiceLoans.putID(vm.ID, vm.loan, function(response) {
          vm.success = "Loan Sucessfully Updated!";
          vm.failure = false;
            }, function(reason) {
              vm.success = false;
              vm.failure = true;
              vm.errorMessages = error.data.errors
            });
          };
    // get loan details from route params ID
    vm.getLoanDetails = function() {
      dataServiceLoans.getID(vm.ID, function(response) {
      vm.loanDetails = response.data[0];
      });
    };
    // get loan details function executed
    vm.getLoanDetails();
}]);
})();
