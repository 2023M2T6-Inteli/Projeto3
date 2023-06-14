// Import required modules
var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const crypto = require('crypto-js');
const DBPATH = './database.sqlite'; // Path to the database file
const urlencodedParser = bodyParser.urlencoded({ extended: false });
// Function to open the database
function openDatabase() {
  return new sqlite3.Database(DBPATH);
}
// Function to close the database
function closeDatabase(db) {
  db.close();
}
// Function to update user data
function updateUser(userId, firstName, lastName, email, encryptedPassword) {
  const db = openDatabase();
  // Check if the user exists before updating the data
  const checkUserSql = `SELECT * FROM users WHERE id = ?`;
  db.get(checkUserSql, [userId], (err, row) => {
    if (err) {
      console.error(err);
      closeDatabase(db);
      return;
    }
    if (!row) {
      console.log('User not found');
      closeDatabase(db);
      return;
    }
    // Update user data
    const updateSql = `UPDATE users SET first_name = ?, last_name = ?, email = ?, encrypted_password = ? WHERE id = ?`;
    const params = [firstName, lastName, email, encryptedPassword, userId];
    db.run(updateSql, params, function(err) {
      if (err) {
        console.error(err);
        closeDatabase(db);
        return;
      }
      console.log(`User updated successfully: ${this.changes} row(s) modified`);
      closeDatabase(db);
    });
  });
}
/* GET profile page. */
router.get('/', function(req, res, next) {
  if(req.session.auth){
    res.render('profile', { title: 'Gaba' });
    }
    else{
    res.redirect('/');
  }
});
// GET form data (user's info)
router.get('/getData', function(req, res, next) {
  const sql = `SELECT * FROM users WHERE id = ${req.session.user_id}`;
    req.db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.status(200).json(rows);
    });
});
//User is fixed for testing purposes
/* POST update profile */
router.post('/', urlencodedParser, function(req, res, next) {
  const userId = req.session.user_id; // ID of the user to be updated
  const firstName = req.body.first_name; // Value provided by the form for the first name
  const lastName = req.body.last_name; // Value provided by the form for the last name
  const email = req.body.email; // Value provided by the form for the email
  const newPassword = req.body.encrypted_password; // Value provided by the form for the new password
  const encryptedPassword = crypto.SHA256(newPassword).toString();
  updateUser(userId, firstName, lastName, email, encryptedPassword);
  // Display an alert on the page indicating that the user has been successfully updated
  res.write('<script>alert("Perfil atualizado com sucesso!"); window.location.href = "/profile";</script>');
  res.end();
});
module.exports = router;