// Express
var express = require('express');
var router = express.Router();

// GET /classrooms
router.get('/', (req, res, next) => {
    res.render('classrooms', { title: 'Gaba' });
});

// GET/classrooms/:id
router.get('/select', (req, res, next) => {

    const userId = parseInt(req.query.userId);

    const sql = `SELECT reg.classroom_id AS class_id, class.name AS class_name, reg.student_id AS std_id, std.name AS std_name FROM registrations AS reg INNER JOIN classrooms AS class ON class.id = reg.classroom_id INNER JOIN students AS std ON std.id = reg.student_id WHERE class.user_id = ${userId} ORDER BY reg.classroom_id;`

    req.db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(400).json({error: err.message});
        }
        res.status(200).json(rows);
    });
});

// POST /classrooms
router.post('/addStudent', (req, res, next) => {
    const sql = `INSERT INTO students(name) VALUES ("${req.query.stdName}");`
    const class_id = req.query.classId;

    let std_id = '';
    req.db.run(sql, [], function (err) {
        if (err) {
            return res.status(400).json({error: err.message});
        }
        std_id = this.lastID;
        secondPost(req, res, class_id, std_id);
        res.status(201).json();
    });
});

function secondPost(req, res, class_id, std_id){
    const sql = `INSERT INTO registrations(classroom_id, student_id) VALUES (${parseInt(class_id)}, ${std_id});`

    req.db.run(sql, [], function (err) {
        if (err) {
            return res.status(400).json({error: err.message});
        }
        res.status(201).json();
    });

};


// PUT /classrooms/:id
router.put('/:id', (req, res, next) => {
    const {name, user_id, subject} = req.body;
    const sql = "UPDATE classrooms SET name = ?, user_id = ?, subject = ? WHERE id = ?";

    req.db.run(sql, [name, user_id, subject, req.params.id], function (err) {
        if (err) {
            return res.status(400).json({error: err.message});
        }
        res.status(200).json({changes: this.changes});
    });
});

// DELETE /classrooms/:id
router.delete('/:id', (req, res, next) => {
    const sql = 'DELETE FROM classrooms WHERE id = ?'

    req.db.run(sql, req.params.id, function (err) {
        if (err) {
            return res.status(400).json({error: err.message});
        }
        res.status(200).json({deleted: this.changes});
    });
});

module.exports = router;
