var express = require('express');
var engine = require('ejs-locals'); // to provide layout functionality
var bodyParser = require('body-parser');
var validator = require('express-validator');

var routes = require('./routes/web'); //including web routes
var app = express();

app.engine('ejs',engine);
app.set('view engine','ejs');

var middleware = [
  express.static('public'),
  bodyParser.urlencoded(),
  validator()
];

app.use(middleware);

app.use('/admin',routes); //adding a prefix 'admin' to all web routes. Any route beginning with 'admin' will be handled by the specified module

app.listen(3000,() => {
  console.log('listening to port 3000');
});
