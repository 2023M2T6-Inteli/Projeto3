var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const DBPATH = './database.db';

const urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('sign_in', { title: 'Gaba' });
});

/*Login*/ 
router.post('/sign_in',urlencodedParser, (req,res)=>{
  var name;
  //Garantir que a requisição tem código inicial correto
  res.statusCode = 200;
  //Define o cabeçalho da requisição
  res.setHeader('Acess-Control-Allow-Origin','*');
  //Inicializa o banco de dados
  var db = new sqlite3.Database(DBPATH);
  //Varíavel para a definição da sentença SQl
  var sql = 'SELECT * FROM users WHERE EMAIL = "' + req.body.email + '" AND encrypted_password = "' + req.body.encrypted_password + '"';
  var sqlpasta = `SELECT * FROM users WHERE users.id = "`
  // INNER JOIN Catalogo_Dados_Tabelas on Tabelas_Salvas.ID_TABELA = Catalogo_Dados_Tabelas.ID 
  // INNER JOIN Pastas on Tabelas_salvas.ID_PASTA = Pastas.ID_PASTA
  // INNER JOIN Usuarios on Pastas.ID_USER = Usuarios.ID_USER
  // WHERE Usuarios.ID_USER = "`;
  console.log(sql);
  db.all(sql, [], ( err,rows) => {
     if (err) {
         console.error(err);
         res.status(500).json({ error: 'An error occurred' });
       } else if (rows.length === 0) {
         res.status(401).json({ error: 'Invalid username or email' });
       } else if (rows[0].encrypted_password !== req.body.encrypted_password) {
         console.error(err);
         console.log(rows);
         res.status(401).json({ error: 'Invalid password' });
       } else {
          name = rows[0].first_name;
          sqlpasta += rows[0].id + `";`;
          console.log(sqlpasta);
          db.all(sqlpasta,[],(err,rows)=>{
              if(err){
                  console.log(err);
              }
              console.log(rows);
              if(rows !== null){
              res.render("/menu");}
              {
                  res.render("/menu");
              }
          })
      }
  });
})




module.exports = router;
