// Express
var express = require('express');
var router = express.Router();

// GET /registrations
router.get('/', (req, res, next) => {
    const sql = 'SELECT * FROM registrations'

    req.db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.status(200).json(rows);
    });
});

// GET/registrations/:id
router.get('/:id', (req, res, next) => {
    const sql = 'SELECT * FROM registrations WHERE id = ?'

    req.db.get(sql, [req.params.id], (err, row) => {
        if (err) {
            return res.status(400).json({error: err.message});
        }
        res.status(200).json(row);
    });
});

// POST /registrations
router.post('/', (req, res, next) => {
    const {classroom_id, student_id} = req.body;
    const sql = 'INSERT INTO registrations(classroom_id, student_id) VALUES (?, ?)'

    req.db.run(sql, [classroom_id, student_id], function (err) {
        if (err) {
            return res.status(400).json({error: err.message});
        }
        res.status(201).json({id: this.lastID});
    });
});

// NOTE: It does not make sense to update a registrations since it's a joining table

// DELETE /registrations/:id
router.delete('/:id', (req, res, next) => {
    const sql = 'DELETE FROM registrations WHERE id = ?'

    req.db.run(sql, req.params.id, function (err) {
        if (err) {
            return res.status(400).json({error: err.message});
        }
        res.status(200).json({deleted: this.changes});
    });
});

module.exports = router;
