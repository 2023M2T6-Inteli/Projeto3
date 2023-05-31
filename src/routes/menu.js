var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('menu', { title: 'Gaba' });
});

router.get('/graphs', function(req, res, next) {
  const sql = 'SELECT grades.grade_percent, questions.max_grade_percent, criteria.description, students.name FROM grades INNER JOIN questions ON questions.id = grades.question_id INNER JOIN criteria ON criteria.id = questions.criterium_id INNER JOIN students ON students.id = grades.student_id WHERE questions.activity_id = 1 ORDER BY criteria.description;';
    req.db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.status(200).json(rows);
    });
  });

router.get('/classrooms', function(req, res, next) {
  const sql = 'SELECT id, name FROM classrooms;'
    req.db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.status(200).json(rows);
    });
  });  
module.exports = router;
