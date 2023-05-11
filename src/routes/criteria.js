// Express
var express = require('express');
var router = express.Router();

// GET /criteria
router.get('/', (req, res, next) => {
    const sql = 'SELECT * FROM criteria'

    req.db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.status(200).json(rows);
    });
});

// GET/criteria/:id
router.get('/:id', (req, res, next) => {
    const sql = 'SELECT * FROM criteria WHERE id = ?'

    req.db.get(sql, [req.params.id], (err, row) => {
        if (err) {
            return res.status(400).json({error: err.message});
        }
        res.status(200).json(row);
    });
});

// POST /criteria
router.post('/', (req, res, next) => {
    const {name, mec_code, subject} = req.body;
    const sql = 'INSERT INTO criteria(name, mec_code, subject) VALUES (?, ?, ?)'

    req.db.run(sql, [name, mec_code, subject], function (err) {
        if (err) {
            return res.status(400).json({error: err.message});
        }
        res.status(201).json({id: this.lastID});
    });
});

// PUT /criteria/:id
router.put('/:id', (req, res, next) => {
    const {name, mec_code, subject} = req.body;
    const sql = "UPDATE criteria SET name = ?, mec_code = ?, subject = ? WHERE id = ?";

    req.db.run(sql, [name, mec_code, subject, req.params.id], function (err) {
        if (err) {
            return res.status(400).json({error: err.message});
        }
        res.status(200).json({changes: this.changes});
    });
});

// DELETE /criteria/:id
router.delete('/:id', (req, res, next) => {
    const sql = 'DELETE FROM criteria WHERE id = ?'

    req.db.run(sql, req.params.id, function (err) {
        if (err) {
            return res.status(400).json({error: err.message});
        }
        res.status(200).json({deleted: this.changes});
    });
});

module.exports = router;
