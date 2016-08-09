(function() {

'use strict';

angular

  .module("app")

  .service('dataServicePatrons', ['$http', function($http) {
    //get all patrons
   this.getAll = function(callback) {
     $http.get('http://localhost:5000/api/patrons')
          .then(callback);
   };
   //get specific patron
  this.getID = function(id, callback) {
    $http.get('http://localhost:5000/api/patrons/' + id)
         .then(callback);
   };
   //update a patron
  this.putID = function(id, data, callback, failure) {
   $http.put('http://localhost:5000/api/patrons/' + id, data)
        .then(callback, failure);
   };
   //add a new patron 
   this.addPatron = function(patron, success, failure) {
     $http.post('http://localhost:5000/api/patrons', patron)
          .then(success, failure);
   };

}]);
})();
