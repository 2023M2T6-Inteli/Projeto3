// Importing required modules
var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

// Path to the database file
const DBPATH = './database.db';

// Creating a parser for URL-encoded data
const urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET home page. */
router.get('/', function(req, res, next) {
  // Rendering a view called 'sign_in' and passing a title parameter
  res.render('sign_in', { title: 'Gaba' });
});

/* Login */
router.post('/sign_in', urlencodedParser, (req, res) => {
  var name;
  // Ensure the response has the correct initial status code
  res.statusCode = 200;
  // Set the header for the response to allow cross-origin requests from any domain
  res.setHeader('Acess-Control-Allow-Origin', '*');
  // Initialize the database connection
  var db = new sqlite3.Database(DBPATH);
  // Define the SQL statement to check if the user's email and encrypted password match any records in the 'users' table
  var sql = 'SELECT * FROM users WHERE EMAIL = "' + req.body.email + '" AND encrypted_password = "' + req.body.encrypted_password + '"';
  // Define the SQL statement to fetch user information based on their ID
  var sqlpasta = `SELECT * FROM users WHERE users.id = "`
  console.log(sql);
  // Execute the SQL statement
  db.all(sql, [], (err, rows) => {
    if (err) {
      // Handle database errors
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    } else if (rows.length === 0) {
      // If no matching records are found, return an error response indicating invalid username or email
      res.status(401).json({ error: 'Invalid username or email' });
    } else if (rows[0].encrypted_password !== req.body.encrypted_password) {
      // If the encrypted password in the database does not match the provided password, return an error response indicating invalid password
      console.error(err);
      console.log(rows);
      res.status(401).json({ error: 'Invalid password' });
    } else {
      // If the credentials are valid, retrieve the user's first name and ID
      name = rows[0].first_name;
      // Update the 'sqlpasta' statement to fetch user information based on their ID
      sqlpasta += rows[0].id + `";`;
      console.log(sqlpasta);
      // Execute the updated 'sqlpasta' statement
      db.all(sqlpasta, [], (err, rows) => {
        if (err) {
          // Handle any errors during the execution of the second query
          console.log(err);
        }
        console.log(rows);
        if (rows !== null) {
          // If the second query returns any rows, render the "menu" view
          res.render("menu");
        } else {
          // If the second query does not return any rows, render the "menu" view
          res.render("menu");
        }
      })
    }
  });
})

// Exporting the router module
module.exports = router;

