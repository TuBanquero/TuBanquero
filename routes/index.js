var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TuBanquero' });
});

router.get('/list', function(req,res,){
  var MongoClient = mongodb.MongoClient;

  var url = 'mongodb://localhost:27017/tubanquero';

  MongoClient.connect(url, function(err,db){
    if (err){
      console.log('Unable to connect to the server', err);
    } else {
      console.log('Connection established');
      //var collection = db.collection('users');
      var collection = db.db().collection('users');
      collection.find({}).toArray(function(err,result){
        if(err){
          res.send(err);
        } else if(result.length){
          res.render('userlist', {
            users : result
          });
        } else {
          res.send('No documents found');
        }
        db.close();
      });
    }
  });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.get('/user', function(req, res, next) {
  res.render('user', { title: 'Login' });
});

module.exports = router;
