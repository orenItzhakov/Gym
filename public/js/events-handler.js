class EventHandler {

  constructor(traineesRenderer, gymRepo) {
    this.traineesRenderer = traineesRenderer;
    this.gymRepo = gymRepo;
  }

  async handleAddTrainee() {
    $('.saveTrainee').on('click', () => {
      if(true){
        var values = new FormData();
        values.append( 'imagePath', $( '#imagePath' )[0].files[0] );
        $('input').each(function() {
          values.append($(this).data('name') , $(this).val());
        });
        this.gymRepo.addTrainee(values).then(()=>{
          window.location = "trainees.html";
        });
      }
    });
  }

  async handleSaveEditTrainee() {
    $('.saveTrainee').on('click', () => {
      var values = new FormData();
      values.append( 'imagePath', $( '#imagePath' )[0].files[0] );
      $('input').each(function() {
        values.append($(this).data('name') , $(this).val());
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

  searchInTable(){
    $("#searchNameVal,#searchAddressVal").change(() => {
      var searchNameVal = $("#searchNameVal").val();
      var searchAddressVal = $("#searchAddressVal").val();
      var values = {
        fullName : searchNameVal,
        address : searchAddressVal
      }
      this.gymRepo.searchTraineesByValues(values).then((data)=>{
        this.traineesRenderer.renderTrainees(data);
      });
    });
  }

  clearInputs(){
    $('.searchDiv i').on('click', function () {
      $(this).closest(".searchDiv").find("input").val("");
    });
  }
}

export default EventHandler;
