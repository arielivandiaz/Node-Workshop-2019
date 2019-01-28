var express = require('express');
var router = express.Router();
var sql = require('../services/sql');

/* GET home page. */
router.get('/', (req, res) => {

  sql.get_query(sql.check_db).then((database) => {

    if (database.length) {
      sql.get_query(sql.select).then((rows) => {

        if (rows.length) {
          res.render('index.ejs', {
            message: '',
            database: 1,
            table: 1,
            users: rows
          });
        } else {
          res.render('index.ejs', {
            message: 'No rows in table',
            database: 1,
            table: 1,
            users: 0
          });
        }

      }).catch((err) => setImmediate(() => {
        res.render('index.ejs', {
          message: 'No table',
          database: 1,
          table: 0,
          users: 0
        });

      }));
    } else {
      res.render('index.ejs', {
        message: 'No database',
        database: 0,
        table: 0,
        users: 0
      });
    }

  }).catch((err) => setImmediate(() => {
    console.log(err);
    throw err;

  }));

});

router.post('/create_database', (req, res) => {

  sql.get_query(sql.create).then((rows) => {

    res.redirect('/');

  }).catch((err) => setImmediate(() => {
    console.log(err);
    throw err;
  }));

});

router.post('/create_table', (req, res) => {

  sql.get_query(sql.create_table).then((rows) => {

    res.redirect('/');

  }).catch((err) => setImmediate(() => {
    console.log(err);
    throw err;
  }));

});

router.post('/delete_database', (req, res) => {

  sql.get_query(sql.delete_db).then((rows) => {

    res.redirect('/');

  }).catch((err) => setImmediate(() => {
    console.log(err);
    throw err;
  }));

});

router.post('/insert', (req, res) => {

  sql.get_query(sql.insert).then((rows) => {

    res.redirect('/');

  }).catch((err) => setImmediate(() => {
    console.log(err);
    throw err;
  }));

});


router.post('/insert_new', (req, res) => {

  var insert_new = 'INSERT INTO `workshop_node`.`info`( `user`, `info`, `repo`, `url`)';
  var values = ` VALUES ('` + req.body.name + `','User ','` + req.body.repo + `','` + req.body.url + `')`;

  sql.get_query(insert_new + values).then((rows) => {

    res.redirect('/');

  }).catch((err) => setImmediate(() => {
    console.log(err);
    throw err;
  }));

});

module.exports = router;