var express = require('express');
var router = express.Router();

/* GET exam page. */
router.get('/', function (req, res, next) {
  if (req.session.auth) {
    res.render('activities', { title: 'Gaba' });
  }
  else {
    res.redirect('/');
  }
});

// GET/activities/api
router.get('/api', (req, res, next) => {
  const sql = 'SELECT * FROM activities'

  req.db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(rows);
  });
});

// GET/activities/api/:id
router.get('/api/:id', (req, res, next) => {
  const sql = 'SELECT * FROM questions WHERE activity_id = ?'

  req.db.all(sql, [req.params.id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(rows);
  });
});

// POST /api/activities
router.post('/api/', (req, res, next) => {
  const { name } = req.body;
  const userId = req.session.user_id;
  const sql = "INSERT INTO activities(name, user_id, created_at) VALUES (?, ?, datetime('now'))"

  req.db.run(sql, [name, userId], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID });
  });
});

module.exports = router;
