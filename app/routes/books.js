var express = require('express');
var router = express.Router();

var books = require('../models').books;
var loans = require('../models').loans;
var patrons = require('../models').patrons;

/* GET all books. */

router.get('/', function(req, res, next) {
  books.findAll({order: [["title", "DESC"]]})
  .then(function(books){
    res.json(books);
    })
    .catch(function(error){
      res.send(500, error);
   });
});

/* GET book details by ID */
router.get('/:id', function(req, res, next) {
  books.findAll({
    include: [{ model: loans, include: [{ model: patrons }] }],
    where: { id: req.params.id }
  })
  .then(function(bookDetail){
    res.json(bookDetail);
    })
    .catch(function(error){
      res.send(500, error);
   });
});

/* GET overdue books */
router.get('/overdue', function(req, res, next) {
  loans.findAll({
    //include: [{ model: books }],
    where: { return_by: { $lt: new Date() }, returned_on: null }
  })
  .then(function(overdueBooks){
    res.json(overdueBooks);
    })
    .catch(function(error){
      res.send(500, error);
   });
});

/* GET checked out books */
router.get('/checked_out', function(req, res, next) {
  loans.findAll({ include: [{ model: books }], where: { returned_on: null }})
  .then(function (checkedOutBooks) {
    res.json(checkedOutBooks);
    })
    .catch(function(error){
      res.send(500, error);
   });
});

/* POST new book */
router.post('/', function(req, res, next) {
  books.create(req.body)
  .then(function (book) {
    res.json(book);
    })
    .catch(function(error){
      res.send(500, error);
   });
});

/* UPDATE book */
router.put('/:id', function(req, res, next) {
  books.findById(req.params.id).then(function(book){
    if(book) {
      return book.update(req.body);
    } else {
      res.send(404)
    }
  })
  .then(function (book) {
    res.json(book);
    })
    .catch(function(error){
      res.send(500, error);
   });
});

/* DELETE book */
router.delete("/:id", function(req, res, next){
  books.findById(req.params.id)
  .then(function(book){
    if(book) {
      return book.destroy();
    }
    else {
      res.send(404)
    }
  })
  .catch(function(error){
    res.send(500,error);
  });
});

module.exports = router;
