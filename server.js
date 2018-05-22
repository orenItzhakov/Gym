var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const SERVER_PORT = 8080;

mongoose.connect( process.env.CONNECTION_STRING || 'mongodb://localhost/gymdb', function() {
    console.log("DB connection established!!!");
})

var Gym = require('./models/gymModel');
var Trainee = require('./models/traineeModel');

var app = express();

app.listen( process.env.PORT || SERVER_PORT, function() {
    console.log("Server run... Gym");
})
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//---------------------------------------------------------------------
app.get('/home', function(req, res) {
  res.sendfile(__dirname + '/public/homepage.html');
});
//---------------------------------------------------------------------

// 1) to handle getting all trainees
app.get('/trainees', function(req, res) {
  Trainee.find({}, function(error, result) {
    if (error) res.send(error);
    res.send(result);
  });
});

// 2) to handle add a new trainee
app.post('/trainees', function (req, res) {
  var newTrainee = new Trainee(req.body);
  newTrainee.save(function(err,resp) {
    res.send(resp);
  });
});

// 3) handling a delete req
app.delete('/trainees/:id', function(req, res) {
  Trainee.findByIdAndRemove({ _id: req.params.id }, function(err, deletedPost) {
    Trainee.find({}).exec(function(err, alltrainess) {
      if (err) res.send(err);
      else res.send(alltrainess);
    })
  })
})

// 4) to handle edit trainee

app.get('/trainee/:id', function(req, res) {
  Trainee.find({ _id: req.params.id }, function(error, result) {
    if (error) res.send(error);
    res.send(result);
  });
});

app.post("/trainees/:id", function(req, res) {
  let newTraineeForm = new Trainee(req.body)
  Trainee.findByIdAndUpdate(req.params.id, { $set: { trainees: newTraineeForm } }, function(err, resp) { // we ned to figure out how to make the changes of all field of the form, not just the name.
    if (err) throw err;
    else res.send({ status: "Ok" });
  });
});
