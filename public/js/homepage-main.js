import GymRepo from './gym-repo.js';
import HomePageRender from './homePage-renderer.js';

let gymRepo = new GymRepo();
let homePageRender = new HomePageRender();
google.charts.load("current", {packages:["corechart"]});


var getTrainees = gymRepo.getTrainees();
getTrainees.then(function(data) {
    var arr = gymRepo.getDataForChart(data);
    homePageRender.drawChart(arr);
});

// eventHandler.handleRenderTrainees();
// eventHandler.handleAddTrainee();
// eventHandler.handleRemoveTrainee();
// eventHandler.HandleEditTrainee();
