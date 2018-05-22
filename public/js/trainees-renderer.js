    /**
     * @class Responsible for rendering users page and user details in the HTML
     */
    class TraineesRenderer {
      constructor() {
        this.$trainees = $(".trainees");
        this.$traineesTemplate = $('#trainees-template').html();
      }

      async renderTrainees(trainees) {
        this.$trainees.empty();
        let template = Handlebars.compile(this.$traineesTemplate);
        Handlebars.registerHelper("dateFormat", function(dataFormat) {
          var dateFormat = new Date(dataFormat);
          var dd = dateFormat.getDate();
          var mm = dateFormat.getMonth()+1; //January is 0!
          var yyyy = dateFormat.getFullYear();
          if(dd<10) dd='0'+dd;
          if(mm<10) mm='0'+mm;
          var dateFormat = mm+'/'+dd+'/'+yyyy;
          return dateFormat;
        });
        let newHTML = template({trainees:trainees});
        this.$trainees.append(newHTML);
      }

      async renderTrainee(trainee) {
        for(var key in trainee[0]){
          if( key=="dateMembershipStart" || key=="dateMembershipEnd" || key=="dateMedicalAssuranceEnd" ){
            var dateFormat = new Date(trainee[0][key]);
            var dd = dateFormat.getDate();
            var mm = dateFormat.getMonth()+1; //January is 0!
            var yyyy = dateFormat.getFullYear();
            if(dd<10) dd='0'+dd;
            if(mm<10) mm='0'+mm;
            trainee[0][key] = mm+'/'+dd+'/'+yyyy;
          }
          $('[data-name="'+key+'"]').val(trainee[0][key]);
        }
      }
    }
    export default TraineesRenderer;
