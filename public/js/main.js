import gymRepo from './gym-repo.js';
import TraineesRenderer from './trainees-renderer.js';
import EventHandler from './events-handler.js';
import loadToggleImage from './master.js'

let traineesRenderer = new TraineesRenderer();
let eventHandler = new EventHandler(gymRepo, traineesRenderer);


var getTrainees = gymRepo.getTrainees();
getTrainees.then(function(data) {
  traineesRenderer.renderTrainees(data)
});

loadToggleImage()
