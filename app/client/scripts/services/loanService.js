(function() {

'use strict';

angular

  .module("app")

  .service('dataServiceLoans', ['$http', function($http) {
      //get all loans
     this.getAll = function(callback) {
       $http.get('http://localhost:5000/api/loans')
            .then(callback);
     };
     //get checked out loans
    this.getCheckedOutLoans = function(callback) {
      $http.get('http://localhost:5000/api/loans/get/checked_out')
           .then(callback);
     };
     //get overdue loans
    this.getOverDueLoans = function(callback) {
      $http.get('http://localhost:5000/api/loans/get/overdue')
           .then(callback);
     };
     //get specific loan
    this.getID = function(id, callback) {
      $http.get('http://localhost:5000/api/loans/' + id)
           .then(callback);
     };
     //update a loan
    this.putID = function(id, data, callback, failure) {
     $http.put('http://localhost:5000/api/loans/' + id, data)
          .then(callback, failure);
     };
     //add a new loan 
     this.createLoan = function(loan, callback, failure) {
       $http.post('http://localhost:5000/api/loans/', loan)
            .then(callback, failure);
     };
}]);
})();
