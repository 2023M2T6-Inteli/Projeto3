// Express
var express = require('express');
var router = express.Router();

// GET /students
router.get('/', (req, res, next) => {
    const sql = 'SELECT * FROM students'

    req.db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.status(200).json(rows);
    });
});

// GET/students/:id
router.get('/:id', (req, res, next) => {
    const sql = 'SELECT * FROM students WHERE id = ?'

    req.db.get(sql, [req.params.id], (err, row) => {
        if (err) {
            return res.status(400).json({error: err.message});
        }
        res.status(200).json(row);
    });
});

// POST /students
router.post('/', (req, res, next) => {
    const {namesubject} = req.body;
    const sql = 'INSERT INTO students(name) VALUES (?, ?, ?)'

    req.db.run(sql, [name], function (err) {
        if (err) {
            return res.status(400).json({error: err.message});
        }
        res.status(201).json({id: this.lastID});
    });
});

// PUT /students/:id
router.put('/:id', (req, res, next) => {
    const {name} = req.body;
    const sql = "UPDATE students SET name = ? WHERE id = ?";

    req.db.run(sql, [name, req.params.id], function (err) {
        if (err) {
            return res.status(400).json({error: err.message});
        }
        res.status(200).json({changes: this.changes});
    });
});

// DELETE /students/:id
router.delete('/:id', (req, res, next) => {
    const sql = 'DELETE FROM students WHERE id = ?'

    req.db.run(sql, req.params.id, function (err) {
        if (err) {
            return res.status(400).json({error: err.message});
        }
        res.status(200).json({deleted: this.changes});
    });
});

module.exports = router;
