class EventHandler {

  constructor(traineesRenderer, gymRepo) {
    this.traineesRenderer = traineesRenderer;
    this.gymRepo = gymRepo;
  }

  async handleAddTrainee() {
    $('.saveTrainee').on('click', () => {
      var values = {};
      $('input').each(function() {
        values[$(this).data('name')] = $(this).val();
      });
      this.gymRepo.addTrainee(values).then(()=>{
        window.location = "trainees.html";
      });
    });
  }

  async handleSaveEditTrainee() {
    $('.saveTrainee').on('click', () => {
      var values = {};
      $('input').each(function() {
        values[$(this).data('name')] = $(this).val();
      });
      this.gymRepo.saveEditTrainee(values).then(()=>{
        window.location = "trainees.html";
      });
    });
  }

  handleRemoveTrainee() {
    let insideRepo = this.gymRepo;
    let insideTraineesRender = this.traineesRenderer;
    $('.pages').on('click', '.delete', function() {
      let traineeId = $(this).closest('.trainee').data().id;
      insideRepo.removeTrainee(traineeId).then((updatedTraineesList) => {
        insideTraineesRender.renderTrainees(updatedTraineesList);
      });
    });
  }

  HandleMoveToEditTraineePage() {
    $('.pages').on('click', '.edit', function() {
      let traineeId = $(this).closest('.trainee').data().id;
      window.location = "editTrainee.html?id="+traineeId;
    });
  }
}

export default EventHandler;
