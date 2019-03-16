const express = require('express');
const router = express.Router();
const mysql = require('mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
  var connection = mysql.createConnection({
    host     : process.env.RDS_HOSTNAME,
    user     : process.env.RDS_USERNAME,
    password : process.env.RDS_PASSWORD,
    port     : process.env.RDS_PORT,
    database : process.env.RDS_DB 
  });
  
  connection.connect(function(err) {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
    }
  
    console.log('Connected to database.');
  });
  
  connection.query('Select * from course', function(err, result) {
    if(err) {
      console.error('Query error');
      console.error(err);
      res.render('error', err);
      return;
    }
    res.render('index', { title: 'Express', result: JSON.stringify(result) });
  });
  
  connection.end();

});

module.exports = router;
