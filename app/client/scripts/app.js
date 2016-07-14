angular.module("app", ['ngRoute'])
.controller('bookController', function(dataServiceBooks, $scope, $http, $location, $routeParams){
  $scope.ID = $routeParams.id;
  //get all books
  dataServiceBooks.getAll(function(response) {
    $scope.getAllbooks = response.data;
    console.log($scope.getAllbooks);
  });
  //get checked-out books
   dataServiceBooks.getCheckedOutBooks(function(response) {
     console.log(response.data);
     $scope.checkedOutBooks = response.data;
   });
   //get overdue books
   dataServiceBooks.getOverDueBooks(function(response) {
     console.log(response.data[0].book);
     $scope.overdueBooks = response.data;
   });
 //new book object
  $scope.newBook = new Object();

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
    console.log(response.data[0]);
    $scope.bookDetails = response.data[0];
    });
  };

  $scope.getID();
})
.controller('patronController', function(dataServicePatrons, $scope, $http, $location, $routeParams){
  $scope.ID = $routeParams.id;
  //get all books
  dataServicePatrons.getAll(function(response) {
    $scope.getAllPatrons = response.data;
    console.log($scope.getAllPatrons);
  });
 //new patron object
  $scope.newPatron = new Object();
  // add a patron
  $scope.addPatron = function() {
      // add the recipe and then go to the detail screen
      dataServicePatrons.addPatron($scope.newPatron, function(response) {
      console.log(response);
      $location.url('http://localhost5000/#/patrons');
    }, function(reason) {
      console.log(reason);
  });
  };

  // var updateObject = {
  //   first_name: $scope.patronDetails.first_name,
  //   last_name: $scope.patronDetails.last_name,
  //   address: $scope.patronDetails.address,
  //   library_id: $scope.patronDetails.library_id,
  //   zip_code: $scope.patronDetails.zip_code
  // }

  $scope.updatePatron = function() {
    dataServicePatrons.putID($scope.ID, updateObject, function(response) {
        console.log(response.data);
        $scope.book = response.data;
          }, function(reason) {
            console.log(reason);
          });
        };

  $scope.getID = function() {
    dataServicePatrons.getID($scope.ID, function(response) {
    console.log(response.data[0]);
    $scope.patronDetails = response.data[0];
    });
  };

  $scope.getID();
})
.service('dataServiceBooks', function($http) {
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
   this.addBook = function(book, callbackSuccess, callbackFailure) {
     $http.post('http://localhost:5000/api/books', book)
          .then(callbackSuccess, callbackFailure);
   };
   //get loans based on book ID
   this.getBookLoans = function(id, callback) {
     $http.get('http://localhost:5000/api/loans/' + id)
          .then(callback);
   };

   //delete book from the database
  //  this.deleteID = function(id, callbackSuccess, callbackFailure) {
  //    $http.delete('http://localhost:5000/api/recipes/' + id)
  //         .then(callbackSuccess, callbackFailure)
  //  };
})
.service('dataServicePatrons', function($http) {
  //get all patrons
 this.getAll = function(callback) {
   $http.get('http://localhost:5000/api/patrons')
        .then(callback);
 };
 //get specific book
this.getID = function(id, callback) {
  $http.get('http://localhost:5000/api/patrons/' + id)
       .then(callback);
 };
 //update a book
this.putID = function(id, data, callback, failure) {
 $http.put('http://localhost:5000/api/patrons/' + id, data)
      .then(callback, failure);
 };
 //add a new book
 this.addPatron = function(patron, callbackSuccess, callbackFailure) {
   $http.post('http://localhost:5000/api/patrons', patron)
        .then(callbackSuccess, callbackFailure);
 };


});
