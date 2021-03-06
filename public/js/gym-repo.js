/**
 * @class Responsible for storing and manipulating gym trainees, in-memory
 */
class GymRepo {
  constructor() {
    this.trainees = [];
  }

  async getTrainees() {
    let result = await $.ajax({
      method: "GET",
      url: '/trainees'
    })
    this.trainees = result;
    return this.trainees
  }

  async searchTraineesByValues(values) {
    let result = await $.ajax({
      method: "POST",
      url: '/trainees/search',
      data: values
    });
    return result;
  }

  async getTrainee() {
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    let result = await $.ajax({
      method: "GET",
      url: '/trainee/'+id,
    })
    return result;
  }

  async addTrainee(traineeData) {
    let result = await $.ajax({
      method: "POST",
      url: '/trainees',
      processData: false,
      contentType: false,
      data: traineeData
    })
    return result;
  }

  async saveEditTrainee(traineeData) {
    var id = traineeData.get("_id");
    traineeData.delete("_id");
    let result = await $.ajax({
      method: "POST",
      url: '/trainee/'+id,
      processData: false,
      contentType: false,
      data: traineeData
    })
    return result;
  }

  removeTrainee(traineetId) {
    return $.ajax({
      method: "DELETE",
      url: '/trainees/' + traineetId
    })
    .then((data) => {
      return this.trainees = data;
    })
  };

  getDataForChart(data) {
    var target = 0, left = 0, aboutToLeave = 0, newMembers = 0;
    for (let i = 0; i < data.length; i++) {
      var d1 = new Date();
      var d2 = new Date(data[i].dateMembershipEnd);
      var d3 = new Date(data[i].dateMembershipStart);
      if (d1.getMonth() == d2.getMonth() && d1.getTime() > d2.getTime() && d1.getDate() > d2.getDate()) left += 1;
      if (d1.getMonth() == d2.getMonth() && d1.getYear() == d2.getYear() && d1.getDate() < d2.getDate()) aboutToLeave += 1;
      if (d1.getMonth() == d3.getMonth() && d1.getYear() == d3.getYear() && d1.getDate() > d3.getDate()) newMembers += 1;
    }
    target = (left + aboutToLeave) - (newMembers) + 1;
    if (target<0) target=0;
    return [
        ['Category', 'How many trainees']
        , ['Target number - More members to sign up', target]
        , ['Left', left]
        , ['About to leave', aboutToLeave]
        , ['New members', newMembers]
      ];
  }
}

const gymRepo = new GymRepo();
export default gymRepo;
