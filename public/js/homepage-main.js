import GymRepo from './gym-repo.js';
import HomePageRender from './homePage-renderer.js';
import Master from './master.js';

let gymRepo = new GymRepo();
let homePageRender = new HomePageRender();
let master = new Master();

google.charts.load("current", {packages:["corechart"]});

var getTrainees = gymRepo.getTrainees();
getTrainees.then(function(data) {
  var arr = gymRepo.getDataForChart(data);
  homePageRender.drawChart(arr);
});
