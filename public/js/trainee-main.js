import Master from './master.js';
import gymRepo from './gym-repo.js';
import TraineesRenderer from './trainees-renderer.js';
import EventHandler from './events-handler.js';

let traineesRenderer = new TraineesRenderer();
let eventHandler = new EventHandler(traineesRenderer, gymRepo);
let master = new Master();

master.loadTraineesPage(gymRepo,traineesRenderer);
eventHandler.handleRemoveTrainee();
eventHandler.HandleMoveToEditTraineePage();
eventHandler.searchInTable();
eventHandler.clearInputs();
