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

    const sql = `SELECT reg.classroom_id AS class_id, class.name AS class_name, reg.student_id AS std_id, std.name AS std_name FROM registrations AS reg INNER JOIN classrooms AS class ON class.id = reg.classroom_id INNER JOIN students AS std ON std.id = reg.student_id WHERE class.user_id = ${userId};`

    req.db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(400).json({error: err.message});
        }
        res.status(200).json(rows);
    });
});

// POST /classrooms
router.post('/', (req, res, next) => {
    const {name, user_id, subject} = req.body;
    const sql = 'INSERT INTO classrooms(name, user_id, subject) VALUES (?, ?, ?)'

    req.db.run(sql, [name, user_id, subject], function (err) {
        if (err) {
            return res.status(400).json({error: err.message});
        }
        res.status(201).json({id: this.lastID});
    });
});

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
