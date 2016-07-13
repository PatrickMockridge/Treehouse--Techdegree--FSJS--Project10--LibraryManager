(function() {
  'use strict';

     angular
       .module('app')
       .config(config);
    //
     function config($routeProvider) {
       $routeProvider
         .when('/', {
           controller: '',
           controllerAs: 'vm',
           templateUrl: '/views/home.html'
         })
          .when('/books', {
            controller: 'bookController',
            controllerAs: 'vm',
            templateUrl: '/views/all_books.html'
          })
          .when('/loans', {
            controller: '',
            controllerAs: 'vm',
            templateUrl: '/views/all_loans.html'
          })
          .when('/patrons', {
            controller: '',
            controllerAs: 'vm',
            templateUrl: '/views/all_patrons.html'
         })
         .when('/books/:id', {
           controller: 'bookController',
           controllerAs: 'vm',
           templateUrl: '/views/book_detail.html'
         })
         .when('/overdue_books', {
           controller: 'bookController',
           controllerAs: 'vm',
           templateUrl: '/views/overdue_books.html'
         })
         .when('/checked_out_books', {
           controller: 'bookController',
           controllerAs: 'vm',
           templateUrl: '/views/checked_books.html'
         })
         .when('/overdue_loans', {
           controller: 'bookController',
           controllerAs: 'vm',
           templateUrl: '/views/overdue_loans.html'
         })
         .when('/patrons/:id', {
           controller: '',
           controllerAs: 'vm',
           templateUrl: '/views/patron_detail.html'
        })
         .when('/new_book', {
           controller: 'bookController',
           controllerAs: 'vm',
           templateUrl: '/views/new_book.html'
         })
         .when('/new_loan', {
           controller: '',
           controllerAs: 'vm',
           templateUrl: '/views/new_loan.html'
         })
         .when('/new_patron', {
           controller: '',
           controllerAs: 'vm',
           templateUrl: '/views/new_patron.html'
         })
         .when('/return/:id', {
           controller: 'bookController',
           controllerAs: 'vm',
           templateUrl: '/views/return_book.html'
         })
         .otherwise({
           redirectTo: '/'
         });
     }
})();
