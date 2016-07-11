(function() {
  'use strict';

     angular
       .module('app')
       .config(config);
    //
     function config($routeProvider) {
       $routeProvider
         .when('/', {
           controller: 'bookController',
           controllerAs: 'vm',
           templateUrl: '/views/home.html'
         })
          .when('/books', {
            controller: '',
            controllerAs: 'vm',
            templateUrl: '/views/books.html'
          })
          .when('/loans', {
            controller: '',
            controllerAs: 'vm',
            templateUrl: '/views/loans.html'
          })
          .when('/patrons', {
            controller: '',
            controllerAs: 'vm',
            templateUrl: '/views/patrons.html'
         })
         .when('/books/:id', {
           controller: '',
           controllerAs: 'vm',
           templateUrl: '/views/books.html'
         })
         .when('/books/overdue', {
           controller: '',
           controllerAs: 'vm',
           templateUrl: '/views/books.html'
         })
         .when('/books/checked_out', {
           controller: '',
           controllerAs: 'vm',
           templateUrl: '/views/books.html'
         })
         .when('/patrons/:id', {
           controller: '',
           controllerAs: 'vm',
           templateUrl: '/views/patron_detail.html'
        })
         .when('/books/new', {
           controller: '',
           controllerAs: 'vm',
           templateUrl: '/views/new_book.html'
         })
         .when('/loans/new', {
           controller: '',
           controllerAs: 'vm',
           templateUrl: '/views/new_loan.html'
         })
         .when('/patrons/new', {
           controller: '',
           controllerAs: 'vm',
           templateUrl: '/views/new_patron.html'
         })
         .when('/return_book/:id', {
           controller: '',
           controllerAs: 'vm',
           templateUrl: '/views/return_book.html'
         })
         .otherwise({
           redirectTo: '/'
         });
     }
})();
