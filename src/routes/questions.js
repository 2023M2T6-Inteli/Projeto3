// Express
var express = require('express');
var router = express.Router();

// GET /questions
router.get('/', (req, res, next) => {
    const sql = 'SELECT * FROM questions'

    req.db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.status(200).json(rows);
    });
});

// GET/questions/:id
router.get('/:id', (req, res, next) => {
    const sql = 'SELECT * FROM questions WHERE id = ?'

    req.db.get(sql, [req.params.id], (err, row) => {
        if (err) {
            return res.status(400).json({error: err.message});
        }

        if (row === undefined) return res.sendStatus(404);

        res.status(200).json(row);
    });
});

// POST /questions
router.post('/', (req, res, next) => {
    const {content, activity_id, criterium_id, max_grade_percent} = req.body;
    const sql = 'INSERT INTO questions(content, activity_id, criterium_id, max_grade_percent) VALUES (?, ?, ?, ?)'

    req.db.run(sql, [content, activity_id, criterium_id, max_grade_percent], function (err) {
        if (err) {
            return res.status(400).json({error: err.message});
        }
        res.status(201).json({id: this.lastID});
    });
});

// PUT /questions/:id
router.put('/:id', (req, res, next) => {
    const {content, activity_id, criterium_id, max_grade_percent} = req.body;
    const sql = "UPDATE questions SET content = ?, activity_id = ?, criterium_id = ?, max_grade_percent = ? WHERE id = ?";

    req.db.run(sql, [content, activity_id, criterium_id, max_grade_percent, req.params.id], function (err) {
        if (err) {
            return res.status(400).json({error: err.message});
        }
        res.status(200).json({changes: this.changes});
    });
});

// DELETE /questions/:id
router.delete('/:id', (req, res, next) => {
    const sql = 'DELETE FROM questions WHERE id = ?'

    req.db.run(sql, req.params.id, function (err) {
        if (err) {
            return res.status(400).json({error: err.message});
        }
        res.status(200).json({deleted: this.changes});
    });
});

module.exports = router;
