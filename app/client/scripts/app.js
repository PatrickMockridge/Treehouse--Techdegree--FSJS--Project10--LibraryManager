angular.module("app", ['ngRoute', 'angularMoment'])
.controller('bookController', function(dataServiceBooks, $scope, $http, $location, $routeParams){
  $scope.ID = $routeParams.id;
  //get all books
  //$scope.firstPublishedFailure = (!Number.isInteger($scope.book.first_published) && $scope.book.first_published != null)
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
      $scope.success = "Book Successfully Added!";
      $scope.failure = false;
      console.log(response);
    }, function(error) {
      $scope.success = false;
      $scope.failure = true;
      $scope.errorMessages = error.data.errors
      console.log(error);
  });
  };

  $scope.updateBook = function() {
    dataServiceBooks.putID($scope.ID, $scope.book, function(response) {
        console.log(response);
        $scope.success = "Book Successfully Updated!";
        $scope.failure = false;
      }, function(error) {
        $scope.success = false;
        $scope.failure = true;
        $scope.errorMessages = error.data.errors
        console.log(error);
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
      $scope.success = "Patron Successfully Added!";
      $scope.failure = false;
      console.log(response);
    }, function(error) {
      $scope.success = false;
      $scope.failure = true;
      $scope.errorMessages = error.data.errors
      console.log(error);
  });
  };

  $scope.updatePatron = function() {
    dataServicePatrons.putID($scope.ID, updateObject, function(response) {
        $scope.success = "Book Successfully Updated!";
        $scope.failure = false;
        console.log(response.data);
        $scope.book = response.data;
          }, function(reason) {
            $scope.success = false;
            $scope.failure = true;
            $scope.errorMessages = error.data.errors
            console.log(error);
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
.controller('loanController', function(moment, dataServiceLoans, dataServicePatrons, dataServiceBooks, $scope, $http, $location, $routeParams){
  $scope.ID = $routeParams.id;
  $scope.returnDate = new moment().add(7,'d').format('YYYY-MM-DD');
  $scope.todaysDate = new moment().format('YYYY-MM-DD');
  console.log($scope.returnDate);
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
      console.log(response);
      $scope.success = "Loan Sucessfully Created!";
      $scope.failure = false;
    }, function(reason) {
      $scope.success = false;
      $scope.failure = true;
      $scope.errorMessages = error.data.errors
      console.log(error);
  });
  };

  $scope.updateLoan = function() {
    dataServiceLoans.putID($scope.ID, $scope.loan, function(response) {
        console.log(response);
        $scope.success = "Loan Sucessfully Updated!";
        $scope.failure = false;
          }, function(reason) {
            $scope.success = false;
            $scope.failure = true;
            $scope.errorMessages = error.data.errors
            console.log(error);
          });
        };

  $scope.getID = function() {
    dataServiceLoans.getID($scope.ID, function(response) {
    console.log(response.data[0]);
    $scope.loanDetails = response.data[0];
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
   this.addBook = function(book, callback, failure) {
     $http.post('http://localhost:5000/api/books', book)
          .then(callback, failure);
   };

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
 this.addPatron = function(patron, success, failure) {
   $http.post('http://localhost:5000/api/patrons', patron)
        .then(success, failure);
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
   this.createLoan = function(loan, callback, failure) {
     $http.post('http://localhost:5000/api/loans', loan)
          .then(success, failure);
   };

});
