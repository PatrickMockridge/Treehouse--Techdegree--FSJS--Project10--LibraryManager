var express = require('express');
var router = express.Router();

var books = require('../models').books;
var loans = require('../models').loans;
var patrons = require('../models').patrons;

/* GET all loans. */
router.get('/', function(req, res, next) {
  loans.findAll({
    include: [{ model: books }, { model: patrons }],
  }).then(function(loans){
    res.json(loans);
    })
    .catch(function(error){
      res.send(500, error);
   });
});

/* GET checked out loans. */
router.get('/get/checked_out', function(req, res, next) {
  loans.findAll({
    where: { returned_on: null },
    order: [["loaned_on", "DESC"]]
  })
  .then(function(loans){
    res.json(loans);
    })
    .catch(function(error){
      res.send(500, error);
   });
});

/* GET loan based on loan id */
router.get('/:id', function(req, res, next) {
  loans.findAll({where: {book_id: req.params.id}}).then(function(loans){
    res.json(loans);
    })
    .catch(function(error){
      res.send(500, error);
   });
});

/* GET overdue loans. */
router.get('/get/overdue', function(req, res, next) {
  loans.findAll({where: { return_by: { $lt: new Date() }, returned_on: null }}).then(function(loans){
    res.json(loans);
    })
    .catch(function(error){
      res.send(500, error);
   });
});

/* POST new loan */
router.post('/', function(req, res, next) {
  loans.create(req.body)
  .then(function (book) {
    res.json(loan);
    })
    .catch(function(error){
      console.log(error);
      res.send(500, error);
   });
});

/* UPDATE loan */
router.put('/:id', function(req, res, next) {
  loans.findById(req.params.id).then(function(loan){
    if(loan) {
      return loan.update(req.body);
    } else {
      res.send(404)
    }
  })
  .then(function (loan) {
    res.json(loan);
    })
    .catch(function(error){
      res.send(500, error);
   });
});

/* DELETE loan */
router.delete("/:id", function(req, res, next){
  loans.findById(req.params.id).then(function(loan){
    if(loan) {
      return loan.destroy();
    }
    else {
      res.send(404)
    }
  }).catch(function(error){
    res.send(500,error);
  });
});



module.exports = router;
