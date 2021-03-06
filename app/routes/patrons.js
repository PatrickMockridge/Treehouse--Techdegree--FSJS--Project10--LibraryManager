var express = require('express');
var router = express.Router();

var books = require('../models').books;
var loans = require('../models').loans;
var patrons = require('../models').patrons;

/* GET all patrons. */
router.get('/', function(req, res, next) {
  patrons.findAll({order: [["last_name", "DESC"]]}).then(function(loans){
    res.json(loans);
    })
    .catch(function(error){
      res.send(500, error);
   });
});

/* GET patron detail by ID. */
router.get('/:id', function(req, res, next) {
  patrons.findAll({ include: [{ model: loans, include: [{ model: books }] }], where: { id: req.params.id }})
  .then(function(patronDetail){
    res.json(patronDetail);
    })
    .catch(function(error){
      res.send(500, error);
   });
});



/* POST new patron */
router.post('/', function(req, res, next) {
  patrons.create(req.body)
  .then(function (patron) {
    res.json(patron);
    })
    .catch(function(error){
      res.send(500, error);
   });
});

/* UPDATE patron */
router.put('/:id', function(req, res, next) {
  loans.findById(req.params.id).then(function(patron){
    if(patron) {
      return patron.update(req.body);
    } else {
      res.send(404)
    }
  })
  .then(function (patron) {
    res.json(patron);
    })
    .catch(function(error){
      res.send(500, error);
   });
});

/* DELETE patron */
router.delete("/:id", function(req, res, next){
  loans.findById(req.params.id).then(function(patron){
    if(patron) {
      return patron.destroy();
    }
    else {
      res.send(404)
    }
  }).catch(function(error){
    res.send(500,error);
  });
});


module.exports = router;
