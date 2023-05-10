// Express
var express = require('express');
var router = express.Router();

// SQLite
const sqlite3 = require('sqlite3').verbose();
const DBPATH = './database.db';

/* GET /classrooms */
router.get('/', function (req, res, next) {
    let db = new sqlite3.Database(DBPATH);
    let sql = 'SELECT * FROM classrooms ORDER BY classrooms.name COLLATE NOCASE';
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close();
});

/* GET /classrooms/:id */
router.get('/:id', function (req, res, next) {
    let db = new sqlite3.Database(DBPATH);
    let sql = 'SELECT * FROM classrooms WHERE classrooms.id = ? ORDER BY classrooms.name COLLATE NOCASE';
    db.all(sql, [req.params['id']], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows[0]);
    });
    db.close();
});

/* POST /classrooms */
router.post('/', function (req, res, next) {
    let db = new sqlite3.Database(DBPATH);
    const sql = "INSERT INTO classrooms (name, user_id, subject) VALUES (?, ?, ?)";
    db.run(sql, [req.body.name, req.body.user_id, req.body.subject], err => {
        if (err) {
            throw err;
        }
        res.json({message: "success"});
    });
    db.close();
});

/* PUT /classrooms/:id */
router.put('/:id', function (req, res, next) {
    let db = new sqlite3.Database(DBPATH);
    const sql = "UPDATE classrooms SET name = ?, user_id = ?, subject = ? WHERE id = ?";
    db.run(sql, [req.body.name, req.body.user_id, req.body.subject, req.params["id"]], err => {
        if (err) {
            throw err;
        }
        res.json({message: "success"});
    });
    db.close();
});

/* DELETE /classrooms/:id */
router.delete('/:id', function (req, res, next) {
    let db = new sqlite3.Database(DBPATH);
    const sql = "DELETE FROM classrooms WHERE id = ?";
    db.run(sql, [req.params["id"]], err => {
        if (err) {
            throw err;
        }
        res.json({message: "success"});
    });
    db.close();
});

module.exports = router;
