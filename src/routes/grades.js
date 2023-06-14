// Express
var express = require('express');
var router = express.Router();

// GET /grades
router.get('/', function(req, res, next) {
    if(req.session.auth){
      res.render('grades', { title: 'Gaba' });
      }
      else{
      res.redirect('/');
    }
  });

//returns data to construct the activities select element
router.get('/selectactv', (req, res, next) => {
    const sql = `SELECT actv.id AS actv_id, actv.name AS actv_name FROM activities AS actv WHERE actv.user_id = ${req.session.user_id} ORDER BY actv.name;`
    req.db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.status(200).json(rows);
    });
});


//returns data to construct the classrooms select element
router.get('/selectclass', (req, res, next) => {
    const sql = `SELECT reg.classroom_id AS class_id, class.name AS class_name, reg.student_id AS std_id, std.name AS std_name FROM registrations AS reg INNER JOIN classrooms AS class ON class.id = reg.classroom_id INNER JOIN students AS std ON std.id = reg.student_id WHERE class.user_id = ${req.session.user_id} ORDER BY reg.classroom_id;`;
    req.db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.status(200).json(rows);
    });
});


//returns data to construct the grading modals
router.get('/modal', (req, res, next) => {
    
    const actv_id = parseInt(req.query.actvId);
    const class_id = parseInt(req.query.classId);

    const sql = `SELECT reg.classroom_id AS class_id, reg.student_id AS std_id, std.name AS std_name, actv.id AS actv_id, quest.id AS quest_id, quest.max_grade_percent AS quest_max_grade FROM registrations AS reg INNER JOIN students AS std ON std.id = reg.student_id INNER JOIN activities AS actv ON actv.id = quest.activity_id INNER JOIN questions AS quest ON quest.activity_id = actv.id WHERE actv.id = ${actv_id} AND reg.classroom_id = ${class_id} ORDER BY reg.classroom_id;`;
    req.db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.status(200).json(rows);
    });
});


//verifies if an activity is associated with a classroom or not
router.get('/verify', (req, res, next) => {
    let actv_id = parseInt(req.query.actvId);
    let class_id = parseInt(req.query.classId);

    const sql = `SELECT id FROM activities WHERE name = (SELECT name FROM activities WHERE id = ${actv_id}) AND classroom_id = ${class_id};`;

    req.db.all(sql, [], (err, row) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        if (row === undefined || row.length < 1) return res.sendStatus(404);

        res.status(200).json(row);
    });
});


//adds grades to the database
router.post('/addGrade', (req, res, next) => {
    const quest_id = parseInt(req.query.questId);
    const std_id = parseInt(req.query.stdId);
    const grade = parseInt(req.query.grade);

    const sql = `INSERT INTO grades(question_id, student_id, grade_percent) VALUES (${quest_id}, ${std_id}, ${grade});`

    req.db.run(sql, [], function (err) {
        if (err) {
            console.log(err)
            return res.status(400).json({error: err.message});
        }
        res.status(201).json();
    });
});


//duplicates activities to associate them with new classrooms
router.post('/duplicate', (req, res, next) => {
    const actv_id = parseInt(req.query.actvId);
    const class_id = parseInt(req.query.classId);
    const user_id = parseInt(req.session.user_id);

    const sql = `INSERT INTO activities (name, created_at, user_id, classroom_id) VALUES((SELECT name FROM activities WHERE id = ${actv_id}), datetime('now'), ${user_id}, ${class_id});`

    req.db.run(sql, [], function (err) {
        if (err) {
            console.log(err)
            return res.status(400).json({error: err.message});
        }
        res.status(201).send({id: this.lastID});
    });
});


//clones questions from duplicated activities
router.post('/clone', (req, res, next) => {
    const quest_id = parseInt(req.query.questId);
    const actv_id = parseInt(req.query.actvId);

    const sql = `INSERT INTO questions (content, activity_id, criterium_id, max_grade_percent) VALUES((SELECT content FROM questions WHERE id = ${quest_id}), ${actv_id}, (SELECT criterium_id FROM questions WHERE id = ${quest_id}), (SELECT max_grade_percent FROM questions WHERE id = ${quest_id}));`

    req.db.run(sql, [], function (err) {
        if (err) {
            console.log(err)
            return res.status(400).json({error: err.message});
        }
        res.status(201).send({id: this.lastID});
    });
});


//returns data to export a csv file
router.get('/export', (req, res, next) => {
    let actv_id = parseInt(req.query.actvId);

    const sql = `SELECT actv.name AS Atividade, std.name AS Estudante, SUM(g.grade_percent) AS Nota FROM questions AS quest INNER JOIN grades AS g ON g.question_id = quest.id INNER JOIN registrations AS reg ON reg.classroom_id = actv.classroom_id INNER JOIN activities AS actv ON actv.id = quest.activity_id INNER JOIN students AS std ON std.id = g.student_id AND std.id = reg.student_id WHERE actv.id = ${actv_id} GROUP BY std.id;`;

    req.db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.status(200).json(rows);
    });
});


module.exports = router;
