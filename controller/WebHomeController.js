const {check ,validationResult} = require('express-validator/check'); //validator
const {matchedData} = require('express-validator/filter'); //sanitizer

// var connection = require('../connect');
var mongo = require('../mongo_connect');

var login = (req , res) => {
res.render('login' , {
  data : {},
  errors : {}
});
}

var postLogin = [
  check('email')
  .isEmail()
  .trim()
  .withMessage('The email doesnt look right!'),
  check('password')
  .isLength({ min :1 })
  .trim()
  .withMessage('Please enter the password'),

  //process request after validation and sanitization
  (req , res , next) => {
    //extract the validation errors from the request
    const err = validationResult(req);
    if(!err.isEmpty()){
      res.render('login',{
        data : req.body,
        errors : err.array()
      });
    return;
    }
    else{
      var email = req.body.email;
      var password = req.body.password;
      var query = {email : email , password : password};

      mongo.connect((err) => {
        if(err) {
          res.send({
            code : 400,
            message : 'error occured'
          });
          return;
        }
      var cursor = mongo.db.collection('admin').find(query).toArray().then((docs) => {
            showDashboard(req,res);
      } , (err) => {
          res.send({
            code : 400,
            message : 'error occured'
          });
          return;
      });
    });
  }}
];

var showDashboard = (req, res) => {
  mongo.connect( (err) => {
    if(err){
      res.send({
        code : 400,
        message : 'error occured'
      });
    return;
    }

    var cursor = mongo.db.collection('events').find().count().then( (count) => {
      res.render('dashboard', {count : count});
    } , (err) => {
      res.send({
        code : 400,
        message : 'error occured'
      });
    return;
    })
  })
}

var showEvents = (req, res) => {

  mongo.connect((err) => {
    if(err) {
      res.send({
        code : 400,
        message : 'error occured'
      });
      return;
    }

var cursor = mongo.db.collection('events').find().toArray().then((docs) => {
   res.render('events', {events : docs});
} , (err) => {
   console.log(err);
   return;
});
});
}

var showAddEvents = (req, res) => {
  res.render('add_events');
}

var showChangepassword = (req, res) => {
  res.render('change_password');
}

module.exports = {
  login,
  showDashboard,
  showEvents,
  showAddEvents,
  showChangepassword,
  postLogin
};
