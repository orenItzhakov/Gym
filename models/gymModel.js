var mongoose = require('mongoose');

let gymSchema = new mongoose.Schema({
  name: String,
  address: String,
  trainees: []
});

let Gym = mongoose.model('gyms', gymSchema);

module.exports = Gym;
