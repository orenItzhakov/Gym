var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const SERVER_PORT = 8080;

mongoose.connect('mongodb://localhost/GymDB', function() {
    console.log("DB connection established!!! SERVER_PORT = 8080");
})

var Gym = require('./models/gymModel');
var Trainee = require('./models/traineeModel');

var app = express();

app.listen(SERVER_PORT, function() {
    console.log("Server run... Gym");
})
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 1) to handle getting all trainees
app.get('/trainees', function(req, res) {
    console.log('GET trainee SERVER call');
    Trainee.find({}, function(error, result) {
        if (error) {
            res.send(error);
        }
        // console.log(result)
        res.send(result);
    });
});
//---------------------------------------------------------------------
app.get('/home', function(req, res) {
    res.sendfile(__dirname + '/public/homepage.html');
});
//---------------------------------------------------------------------
// app.post('/trainees', (req, res) => {
//     var newTrainee = new Trainee(req.body);
//     console.log(req.body);
//     if (newTrainee.fullName == undefined) {
//         console.error(err);
//     } else {
//         newTrainee.save((err, post) => {
//
//             console.log('POST ADDED')
//             res.send(post);
//
//         })
//     }
//
// });

app.post('/trainees', function (req, res) {
  var newTrainee = new Trainee(req.body);
  console.log(req.body);
  newTrainee.save(function(requ,resp) {
    res.send(resp);
  });
});

//---------------------------------------------------------------------

// 3) handling a delete req

app.delete('/trainees/:id', function(req, res) {
    Trainee.findByIdAndRemove({ _id: req.params.id }, function(err, deletedPost) {
        Trainee.find({}).exec(function(err, alltrainess) {
            if (err) {
                console.error(err)
                res.send("somthing went wrong")
            } else {
                // console.log("what are you???")
                // console.log(alltrainess)
                res.send(alltrainess)
            }
        })
    })
})

// 4) to handle edit trainee
app.post("/trainees/:id", function(req, res) {
    let newTraineeForm = new Trainee(req.body)
    Trainee.findByIdAndUpdate(req.params.id, { $set: { trainees: newTraineeForm } }, function(err, resp) { // we ned to figure out how to make the changes of all field of the form, not just the name.
        if (err) throw err;
        else res.send({ status: "Ok" });
    });
});
