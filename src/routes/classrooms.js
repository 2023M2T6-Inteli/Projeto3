var express = require('express');
var router = express.Router();

/* GET /classrooms */
router.get('/', function (req, res, next) {
    res.send('List of classrooms')
});

/* GET /classrooms/:id */
router.get('/:id', function (req, res, next) {
    const id = req.params['id']
    res.send(`Classroom ${id}`)
});

/* POST /classrooms */
router.post('/', function (req, res, next) {
    res.send('Created classroom')
});

/* PUT /classrooms/:id */
router.put('/:id', function (req, res, next) {
    const id = req.params['id']
    res.send(`Updated classroom ${id}`)
});

/* DELETE /classrooms/:id */
router.delete('/:id', function (req, res, next) {
    const id = req.params['id']
    res.send(`Deleted classroom ${id}`);
});

module.exports = router;
