// Express
var express = require('express');
var router = express.Router();

// GET /classrooms
router.get('/', (req, res, next) => {
    const sql = 'SELECT * FROM classrooms'

    req.db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.status(200).json(rows);
    });
});

// GET/classrooms/:id
router.get('/:id', (req, res, next) => {
    const sql = 'SELECT * FROM classrooms WHERE id = ?'

    req.db.get(sql, [req.params.id], (err, row) => {
        if (err) {
            return res.status(400).json({error: err.message});
        }
        res.status(200).json(row);
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
