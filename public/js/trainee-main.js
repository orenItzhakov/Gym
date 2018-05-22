import Master from './master.js';
import GymRepo from './gym-repo.js';
import TraineesRenderer from './trainees-renderer.js';
import EventHandler from './events-handler.js';

let gymRepo = new GymRepo();
let traineesRenderer = new TraineesRenderer();
let eventHandler = new EventHandler(traineesRenderer, gymRepo);
let master = new Master();


async function loadPage() {
    let data = await gymRepo.getTrainees();
    traineesRenderer.renderTrainees(data)
}

loadPage();
eventHandler.handleRenderTrainees();
eventHandler.handleRemoveTrainee();
