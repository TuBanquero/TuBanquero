var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var url = 'mongodb://localhost:27017/tubanquero';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TuBanquero' });
});

router.get('/list', function(req,res,){
  var MongoClient = mongodb.MongoClient;
  MongoClient.connect(url, function(err,db){
    if (err){
      console.log('Unable to connect to server', err);
    } else {
      console.log('Connection established');
      //var collection = db.collection('users');
      var collection = db.db().collection('users');
      collection.find({}).toArray(function(err,result){
        if(err){
          res.send(err);
        } else if(result.length){
          res.render('userlist', {
            users : result,
            title: 'Users list'
          });
        } else {
          res.send('No documents found');
        }
        db.close();
      });
    }
  });
});

router.post('/adduser', function(req,res){
  var MongoClient = mongodb.MongoClient;
  MongoClient.connect(url, function(err,db){
    if (err){
      console.log('Unable to connect to server');
    } else {
      console.log('Connected to server');
      var collection = db.db().collection('users');
      var user = {name: req.body.name, email: req.body.email, phone: req.body.phone};
      collection.insert([user], function(err,result){
        if(err){
          console.log(err);
        } else {
          res.redirect('list');
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
  res.render('user', { title: 'Profile' });
});

module.exports = router;
