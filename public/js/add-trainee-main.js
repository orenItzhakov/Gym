import GymRepo from './gym-repo.js';
import TraineesRenderer from './trainees-renderer.js';
import EventHandler from './events-handler.js';

let gymRepo = new GymRepo();
let traineesRenderer = new TraineesRenderer();
let eventHandler = new EventHandler(traineesRenderer, gymRepo);
// let eventHandler = new EventHandler();


// eventHandler.handleRenderTrainees();
eventHandler.handleAddTrainee();
// eventHandler.handleRemoveTrainee();
// eventHandler.HandleEditTrainee();
// gymRepo.addTrainee()

$(document).ready(function() {
  $( "#datepicker1 , #datepicker2 , #datepicker3" ).datepicker();
});
