var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const crypto = require('crypto-js');

const DBPATH = './database.db';

const urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('sign_in', { title: 'Gaba' });
});

/* Login */
router.post('/sign_in', urlencodedParser, (req, res) => {
  var name;
  // Ensure the request has the correct initial code
  res.statusCode = 200;
  // Set the request header
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Initialize the database
  var db = new sqlite3.Database(DBPATH);
  // Variable to define the SQL statement
  var sql = 'SELECT * FROM users WHERE EMAIL = "' + req.body.email + '"';
  var sqlpasta = `SELECT * FROM users WHERE users.id = "`;
  console.log(sql);
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    } else if (rows.length === 0) {
      res.status(401).json({ error: 'Invalid username or email' });
    } else {
      // Compare the user-provided password with the encrypted password stored in the database
      var encryptedPassword = crypto.SHA256(req.body.encrypted_password).toString();
      if (rows[0].encrypted_password !== encryptedPassword) {
        console.error(err);
        console.log(rows);
        res.status(401).json({ error: 'Invalid password' });
      } else {
        name = rows[0].first_name;
        sqlpasta += rows[0].id + `";`;
        console.log(sqlpasta);
        db.all(sqlpasta, [], (err, rows) => {
          if (err) {
            console.log(err);
          }
          console.log(rows);
          if (rows !== null) {
            res.render("menu");
          } else {
            res.render("menu");
          }
        });
      }
    }
  });
});


// Create a new user
router.post('/sign_up', urlencodedParser, (req, res) => {
  // Ensure the request has the correct initial code
  res.statusCode = 200;
  // Set the request header
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Initialize the database
  var db = new sqlite3.Database(DBPATH);
  // Encrypt the password using CryptoJS
  var encryptedPassword = crypto.SHA256(req.body.encrypted_password).toString();
  // Variable to define the SQL statement
  var sql = 'INSERT INTO users (id, first_name, last_name, email, encrypted_password) VALUES(null,"' + req.body.first_name + '","' + req.body.last_name + '","' + req.body.email + '","' + encryptedPassword + '");';
  console.log(sql);
  db.run(sql, [], err => {
    if (err) {
      console.log("Error inserting data");
      // Log the error to the console to prevent a general crash
      throw err;
    }
  });
  db.close();
  res.render("tutorial");
  res.end();
});

module.exports = router;
