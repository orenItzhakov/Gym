var mongoose = require('mongoose');

let traineesSchema = new mongoose.Schema({
  fullName: String,
  gender: String,
  age: Number,
  phoneNumber: String,
  address: String,
  dateMedicalAssuranceEnd : Date,
  dateMembershipStart: Date,
  dateMembershipEnd: Date,
  imagePath: String,
  isActive: Boolean
});

let Trainee = mongoose.model('trainees', traineesSchema);

module.exports = Trainee;
