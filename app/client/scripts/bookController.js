var app = angular.module("app");

app.controller('bookController', function($scope, $http,$location, $routeParams){
  $scope.ID = $routeParams.id;
  //get all books
  dataServiceBooks.getBooks(function(response) {
    console.log(response.data);
    $scope.books = response.data;
  });
  //get checked-out books
  dataService.getCheckedOutBooks(function(response) {
    console.log(response.data);
    $scope.checkedOutBooks = response.data;
  });
  //get overdue books
  dataServiceBooks.getOverDueBooks(function(response) {
    console.log(response.data);
    $scope.overdueBooks = response.data;
  });
 //new book object
 var newBook = {
   title: $scope.newBook.title,
   author: $scope.newBook.author,
   genre: $scope.newBook.genre,
   first_published: $scope.newBook.first_published,
 }
  $scope.addBook = function() {
      // add the recipe and then go to the detail screen
      dataServiceBooks.addBook(newBook, function(response) {
      $location.url('#/books/' + response.id);
    }, function(reason) {
      console.log(reason);
  });
  };

  $scope.updateBook = function() {
    dataServiceBooks.putID($scope.ID, $scope.book, function(response) {
        console.log(response.data);
        $scope.book = response.data;
          }, function(reason) {
            console.log(reason);
          });
        };

  $scope.getID = function() {
    dataServiceBooks.getID($scope.ID, function(response) {
    console.log(response);
    $scope.bookDetailObject = response;
    });
  };

  $scope.getBookLoans = function() {
    dataServiceBooks.getBookLoans($scope.ID, function(response) {
    console.log(response.data);
    $scope.bookLoans = response.data;
    });
  };
})
.service('dataServiceBooks', function($http) {
    //get all books
   this.getAll = function(callback) {
     $http.get('http://localhost:5000/api/books')
          .then(callback);
   };
   //get checked out books
  this.getCheckedOutBooks = function(callback) {
    $http.get('http://localhost:5000/api/books/checked_out')
         .then(callback);
   };
   //get overdue books
  this.getOverDueBooks = function(callback) {
    $http.get('http://localhost:5000/api/books/overdue')
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
        .then(callback, failure)
   };
   //add a new book
   this.addBook = function(book, callbackSuccess, callbackFailure) {
     $http.post('http://localhost:5000/api/books', book)
          .then(callbackSuccess, callbackFailure);
   };
   //get loans based on book ID
   this.getBookLoans = function(id, callback) {
     $http.get('http://localhost:5000/api/loans/' + id)
          .then(callback);

   //delete book from the database
  //  this.deleteID = function(id, callbackSuccess, callbackFailure) {
  //    $http.delete('http://localhost:5000/api/recipes/' + id)
  //         .then(callbackSuccess, callbackFailure)
  //  };
});
