var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.auth){
    res.render('print', { title: 'Gaba' });
    }
    else{
    res.redirect('/');
  }
});

module.exports = router;

