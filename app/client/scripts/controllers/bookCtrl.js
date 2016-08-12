(function() {
'use strict';
angular
  .module("app")
  .controller('bookController', ['dataServiceBooks', 'Pagination', '$routeParams', function(dataServiceBooks, Pagination, $routeParams){
    // define view model
    var vm = this;
    // define ID of book from routeparams
    vm.ID = $routeParams.id;
    // get all books
    dataServiceBooks.getAll(function(response) {
      vm.getAllBooks = response.data;
    });
    //get checked-out books
    dataServiceBooks.getCheckedOutBooks(function(response) {
      vm.checkedOutBooks = response.data;
    });
    // get overdue books
    dataServiceBooks.getOverDueBooks(function(response) {
      vm.overdueBooks = response.data;
    });
    // new book object
    vm.newBook = {};
    // add a book
    vm.addBook = function() {
        // add the recipe and then go to the detail screen
        dataServiceBooks.addBook(vm.newBook, function(response) {
          vm.success = "Book Successfully Added!";
          vm.failure = false;
        }, function(error) {
          vm.success = false;
          vm.failure = true;
          vm.errorMessages = error.data.errors
        });
      };
      // update book
      vm.updateBook = function() {
        dataServiceBooks.putID(vm.ID, vm.bookDetails, function(response) {
          console.log(response);
          vm.success = "Book Successfully Updated!";
          vm.failure = false;
        }, function(error) {
          vm.success = false;
          vm.failure = true;
          vm.errorMessages = error.data.errors
          console.log(error);
            });
          };
      // get book details based upon ID
      vm.getID = function() {
        dataServiceBooks.getID(vm.ID, function(response) {
          vm.bookDetails = response.data[0];
        });
      };
      // execute get ID function
      vm.getID();

      //vm.pagination = Pagination.getNew(10);
      //vm.pagination.numPages = Math.ceil(vm.getAllBooks.length/vm.pagination.perPage)

}]);
})();
