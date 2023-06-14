var express = require('express');
var router = express.Router();

/* GET exam page. */
router.get('/', function(req, res, next) {
  res.render('activities', { title: 'Gaba' });
});

// GET/activities/api/:id
router.get('/api/:id', (req, res, next) => {
  const sql = 'SELECT * FROM activities WHERE id = ?'

  req.db.get(sql, [req.params.id], (err, row) => {
      if (err) {
          return res.status(400).json({error: err.message});
      }

      if (row === undefined) return res.sendStatus(404);

      res.status(200).json(row);
  });
});

// POST /api/activities
router.post('/api/', (req, res, next) => {
  const {name, user_id, classroom_id} = req.body;
  const sql = 'INSERT INTO activities(name, user_id, classroom_id) VALUES (?, ?, ?)'

  req.db.run(sql, [name, user_id, classroom_id], function (err) {
      if (err) {
          return res.status(400).json({error: err.message});
      }
      res.status(201).json({id: this.lastID});
  });
});

module.exports = router;
