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
      dataServiceBooks.addBook($scope.newBook, function(response) {
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
.controller('loanController', function(dataServiceLoans, dataServicePatrons, dataServiceBooks, $scope, $http, $location, $routeParams){
  $scope.ID = $routeParams.id;
  //get all books
  dataServiceBooks.getAll(function(response) {
    $scope.getAllBooks = response.data;
    console.log($scope.getAllBooks);
  });
  //get all patrons
  dataServicePatrons.getAll(function(response) {
    $scope.getAllPatrons = response.data;
    console.log($scope.getAllPatrons);
  });
  //get all loans
  dataServiceLoans.getAll(function(response) {
    $scope.getAllLoans = response.data;
    console.log($scope.getAllLoans);
  });
  //get checked-out books
   dataServiceLoans.getCheckedOutLoans(function(response) {
     console.log(response.data);
     $scope.checkedOutLoans = response.data;
   });
   //get overdue books
   dataServiceLoans.getOverDueLoans(function(response) {
     console.log(response.data[0].book);
     $scope.overdueLoans = response.data;
   });
 //new book object
  $scope.newLoan = new Object();
  $scope.newLoan.returned_on = null;

  $scope.createLoan = function() {
      // add the recipe and then go to the detail screen
      dataServiceLoans.createLoan($scope.newLoan, function(response) {
      $location.url('#/loans/' + response.id);
    }, function(reason) {
      console.log(reason);
  });
  };

  $scope.updateLoan = function() {
    dataServiceLoans.putID($scope.ID, $scope.loan, function(response) {
        console.log(response.data);
        $scope.loan = response.data;
          }, function(reason) {
            console.log(reason);
          });
        };

  $scope.getID = function() {
    dataServiceLoans.getID($scope.ID, function(response) {
    console.log(response.data[0]);
    $scope.LoanDetails = response.data[0];
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

})
.service('dataServiceLoans', function($http) {
    //get all books
   this.getAll = function(callback) {
     $http.get('http://localhost:5000/api/loans')
          .then(callback);
   };
   //get checked out books
  this.getCheckedOutLoans = function(callback) {
    $http.get('http://localhost:5000/api/loans/get/checked_out')
         .then(callback);
   };
   //get overdue books
  this.getOverDueLoans = function(callback) {
    $http.get('http://localhost:5000/api/loans/get/overdue')
         .then(callback);
   };
   //get specific book
  this.getID = function(id, callback) {
    $http.get('http://localhost:5000/api/loans/' + id)
         .then(callback);
   };
   //update a book
  this.putID = function(id, data, callback, failure) {
   $http.put('http://localhost:5000/api/loans/' + id, data)
        .then(callback, failure);
   };
   //add a new book
   this.createLoan = function(loan, callbackSuccess, callbackFailure) {
     $http.post('http://localhost:5000/api/loans', loan)
          .then(callbackSuccess, callbackFailure);
   };

   //delete book from the database
  //  this.deleteID = function(id, callbackSuccess, callbackFailure) {
  //    $http.delete('http://localhost:5000/api/recipes/' + id)
  //         .then(callbackSuccess, callbackFailure)
  //  };
});
