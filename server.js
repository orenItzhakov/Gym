var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const multer = require('multer');
``
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

//MULTER CONFIG: to get file photos to temp server storage
const multerConfig = {

  //specify diskStorage (another option is memory)
  storage: multer.diskStorage({

    //specify destination
    destination: function(req, file, next){
      next(null, './public/imgs/profileImages');
    },

    //specify the filename to be unique
    filename: function(req, file, next){
      // console.log(file);
      //get the file mimetype ie 'image/jpeg' split and prefer the second value ie'jpeg'
      const ext = file.mimetype.split('/')[1];
      //set the file fieldname to a unique name containing the original name, current datetime and the extension.
      req.fullFileName = file.fieldname + '-' + Date.now() + '.' + ext;

      next(null, req.fullFileName);
    }
  }),

  // filter out and prevent non-image files.
  fileFilter: function(req, file, next){
        if(!file){
          next();
        }

      // only permit image mimetypes
      const image = file.mimetype.startsWith('image/');
      if(image){
        console.log('photo uploaded');
        next(null, true);
      }else{
        console.log("file not supported")
        return next();
      }
  }
};

//---------------------------------------------------------------------

app.get('/home', function(req, res) {
  res.sendfile(__dirname + '/public/homepage.html');
});

//---------------------------------------------------------------------

// 1) to handle getting all trainees
app.get('/trainees', function(req, res) {
  Trainee.find({}, function(error, result) {
    if (error) res.send(error);
    else res.send(result);
  });
});

//to handle getting trainees with search values
app.post('/trainees/search', function(req, res) {
  console.log(req.body);
  var searchFullName =new RegExp(req.body.fullName, 'i');
  var searchAddress =new RegExp(req.body.address, 'i');
  Trainee.find({fullName : searchFullName , address:searchAddress}, function(error, result) {
    if (error) res.send(error);
    else res.send(result);
  });
});

// 2) to handle add a new trainee
app.post('/trainees', multer(multerConfig).single('imagePath') , function (req, res) {
  var all = req.body;
  all["imagePath"] = req.fullFileName;
  var newTrainee = new Trainee(all);
  newTrainee.save(function(err,resp) {
    if (err) res.send(err);
    else res.send(resp);
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
    else res.send(result);
  });
});

app.post("/trainee/:id", multer(multerConfig).single('imagePath') , function(req, res) {
  var allData = req.body;
  if( typeof allData["imagePath"] === 'string') allData["imagePath"] = req.fullFileName; //if we also upload a file
  else allData["imagePath"] = allData["originalPath"];
  delete allData["originalPath"];

  Trainee.update({_id : req.params.id}, allData , { multi: false }, function(err, resp) { // we ned to figure out how to make the changes of all field of the form, not just the name.
    if (err) throw err;
    else res.send(resp);
  });
});
