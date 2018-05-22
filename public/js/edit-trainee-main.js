import gymRepo from './gym-repo.js';
import TraineesRenderer from './trainees-renderer.js';
import EventHandler from './events-handler.js';
import Master from './master.js';

let traineesRenderer = new TraineesRenderer();
let eventHandler = new EventHandler(traineesRenderer, gymRepo);
let master = new Master();
master.datePicker(["datepicker1","datepicker2","datepicker3"]);

var getTrainee = gymRepo.getTrainee();
getTrainee.then(function(data) {
  if (data.length ===1) traineesRenderer.renderTrainee(data);
});
eventHandler.handleSaveEditTrainee();
