var express = require('express');
var router = express.Router();

/* GET exam page. */
router.get('/', function(req, res, next) {
  if(req.session.auth){
    res.render('activities', { title: 'Gaba' });
    }
    else{
    res.redirect('/');
  }
});


module.exports = router;