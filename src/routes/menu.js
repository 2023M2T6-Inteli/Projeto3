var express = require('express');
var router = express.Router();

//for use user id (req.session.user_id)

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.auth){
    res.render('menu', { title: 'Gaba' });
  } else{
    res.redirect('/');
  }
});

router.get('/graphs', function(req, res, next) {

  const actv_id = parseInt(req.query.actvId);
  const class_id = parseInt(req.query.classId);

  const sql = `SELECT grd.grade_percent, quest.max_grade_percent, crt.description, std.name FROM grades as grd INNER JOIN questions as quest ON quest.id = grd.question_id INNER JOIN criteria as crt ON crt.id = quest.criterium_id INNER JOIN students as std ON std.id = grd.student_id INNER JOIN activities as actv ON actv.id = quest.activity_id WHERE quest.activity_id = ${actv_id} AND actv.classroom_id = ${class_id} ORDER BY crt.description;`;
    req.db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.status(200).json(rows);
    });
  });

router.get('/classtivities', function(req, res, next) {
  const sql = 'SELECT actv.id as actv_id, actv.name as actv_name, actv.created_at, class.id as class_id, class.name as class_name FROM activities as actv INNER JOIN classrooms as class ON class.id = actv.classroom_id;'
    req.db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.status(200).json(rows);
    });
  });  
module.exports = router;

