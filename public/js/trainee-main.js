import GymRepo from './gym-repo.js';
import TraineesRenderer from './trainees-renderer.js';
import EventHandler from './events-handler.js';

let gymRepo = new GymRepo();
let traineesRenderer = new TraineesRenderer();
let eventHandler = new EventHandler(traineesRenderer, gymRepo);


async function loadPage() {
    let data = await gymRepo.getTrainees();
    traineesRenderer.renderTrainees(data)
}

loadPage();
eventHandler.handleRenderTrainees();
eventHandler.handleRemoveTrainee();

// eventHandler.handleAddTrainee();
// eventHandler.handleRemoveTrainee();
// eventHandler.HandleEditTrainee();