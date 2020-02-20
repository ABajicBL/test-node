const express = require('express');

var app = express();

const hbs = require('hbs');

//app.get('/', (req, res) => {
//  res.send('<h1>Hello Express!</h1>');
//});

app.use( (req,res, next) => {
  res.render('maintence.hbs' ,{
    pageTitle: 'About Page',
  })
});



app.use( (req,res, next) => {

  var now = new Date().toString();
  console.log('middleware 11');
  console.log(`${now}:  ${req.method} ${req.url}`);
  //ovdje nesto ne razumijem jer se ne hvataju svi get zahtjevi
  // ne reaguje kada dobavlja http://localhost:3000/about

  //console.log(req);
  next();
});


app.get('/', (req, res) => {
  res.render('homeB.hbs',{
    pageTitle: 'Home page',
    welcomeMessage: 'Welcome to my website'
  })
});

app.get('/about', (req, res) => {
  res.render('aboutB.hbs',{
    pageTitle: 'About Page',
  });
});


app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  })
})


hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');



app.use(express.static(__dirname + '/public'));

  //http://expressjs.com/en/4x/api.html#req.method



app.use( (req,res, next) => {

  console.log('middleware 22');

  next();
});
/*
An Express application is essentially a series of middleware function calls

Middleware functions are functions that have access to the request
object (req), the response object (res), and the next middleware function in
the application’s request-response cycle. The next middleware function is
commonly denoted by a variable named next.

The n e x t argument exists so you can tell Express when your middleware
function is done, and this is useful because you can have as much middleware
as you like registered to a single Express app.

This example shows a middleware function with no mount path. The function is
executed every time the app receives a request.
var app = express()

app.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})


This example shows a middleware function mounted on the /user/:id path.
The function is executed for any type of HTTP request on the /user/:id path.

app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
})


This example shows a route and its handler function (middleware system).
The function handles GET requests to the /user/:id path.

app.get('/user/:id', function (req, res, next) {
  res.send('USER')
})


*/







hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
