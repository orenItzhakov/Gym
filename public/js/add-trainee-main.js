import GymRepo from './gym-repo.js';
import TraineesRenderer from './trainees-renderer.js';
import EventHandler from './events-handler.js';
import Master from './master.js';


let gymRepo = new GymRepo();
let traineesRenderer = new TraineesRenderer();
let eventHandler = new EventHandler(traineesRenderer, gymRepo);
let master = new Master();
master.datePicker(["datepicker1","datepicker2","datepicker3"]);

eventHandler.handleAddTrainee();
