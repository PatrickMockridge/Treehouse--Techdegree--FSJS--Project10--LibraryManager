(function() {

'use strict';

angular

  .module("app")

  .service('dataServiceBooks', ['$http', function($http) {
      //get all books
     this.getAll = function(callback) {
       $http.get('http://localhost:5000/api/books')
            .then(callback);
     };
     //get checked out books
    this.getCheckedOutBooks = function(callback) {
      $http.get('http://localhost:5000/api/books/get/checked_out')
           .then(callback);
     };
     //get overdue books
    this.getOverDueBooks = function(callback) {
      $http.get('http://localhost:5000/api/books/get/overdue')
           .then(callback);
     };
     //get specific book
    this.getID = function(id, callback) {
      $http.get('http://localhost:5000/api/books/' + id)
           .then(callback);
     };
     //update a book
    this.putID = function(id, data, callback, failure) {
     $http.put('http://localhost:5000/api/books/' + id, data)
          .then(callback, failure);
     };
     //add a new book
     this.addBook = function(book, callback, failure) {
       $http.post('http://localhost:5000/api/books', book)
            .then(callback, failure);
     };

}]);
})();
