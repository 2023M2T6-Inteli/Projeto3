// Express
var express = require('express');
var router = express.Router();

// GET /grades
router.get('/', (req, res, next) => {
    res.render('grades', {title: 'Gaba'})
});

router.get('/selectactv', (req, res, next) => {
    const sql = 'SELECT actv.id AS actv_id, actv.name AS actv_name FROM activities AS actv ORDER BY actv.id;'
    req.db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.status(200).json(rows);
    });
});

router.get('/selectclass', (req, res, next) => {
    const sql = 'SELECT reg.classroom_id AS class_id, class.name AS class_name, reg.student_id AS std_id, std.name AS std_name FROM registrations AS reg INNER JOIN classrooms AS class ON class.id = reg.classroom_id INNER JOIN students AS std ON std.id = reg.student_id WHERE class.user_id = 1 ORDER BY reg.classroom_id;';
    req.db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.status(200).json(rows);
    });
});

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

// GET/grades/verify
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
// POST /grades
router.post('/', (req, res, next) => {
    const {question_id, student_id, grade_percent} = req.body;
    const sql = 'INSERT INTO grades(question_id, student_id, grade_percent) VALUES (?, ?, ?)'

    req.db.run(sql, [question_id, student_id, grade_percent], function (err) {
        if (err) {
            return res.status(400).json({error: err.message});
        }
        res.status(201).json({id: this.lastID});
    });
});

// PUT /grades/:id
router.put('/:id', (req, res, next) => {
    const {question_id, student_id, grade_percent} = req.body;
    const sql = "UPDATE grades SET question_id = ?, student_id = ?, grade_percent = ? WHERE id = ?";

    req.db.run(sql, [question_id, student_id, grade_percent, req.params.id], function (err) {
        if (err) {
            return res.status(400).json({error: err.message});
        }
        res.status(200).json({changes: this.changes});
    });
});

// DELETE /grades/:id
router.delete('/:id', (req, res, next) => {
    const sql = 'DELETE FROM grades WHERE id = ?'

    req.db.run(sql, req.params.id, function (err) {
        if (err) {
            return res.status(400).json({error: err.message});
        }
        res.status(200).json({deleted: this.changes});
    });
});

module.exports = router;
