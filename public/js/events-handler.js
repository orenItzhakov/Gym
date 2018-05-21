class EventHandler {

    constructor(traineesRenderer, gymRepo) {
        this.traineesRenderer = traineesRenderer;
        this.gymRepo = gymRepo;
    }


    async handleAddTrainee() {
        $('.saveTrainee').on('click', () => {
            const values = {};
            $('input').each(function() {
                values[($(this).attr('class')).replace(' hasDatepicker','')] = $(this).val();
            });
            this.gymRepo.addTrainee(values);
            window.location = "trainees.html";
        })
    }


    handleRenderTrainees() {
        $('.trainees').on('click', () => {
            this.gymRepo.getTrainees(() => {
                this.traineesRenderer.renderTrainees(this.gymRepo.trainees)
            })

        })
    }

    handleRemoveTrainee() {
        let insideRepo = this.gymRepo;
        let insideTraineesRender = this.traineesRenderer;
        $('.pages').on('click', '.delete', function() {
            let traineeId = $(this).closest('.trainee').data().id;
            insideRepo.removeTrainee(traineeId).then((updatedTraineesList) => {
                insideTraineesRender.renderTrainees(updatedTraineesList);
            })
        })
    }

    HandleEditTrainee() {
        let $traineeForm = $(this).closest('.trainee-form') // need to know the way you orginized the html.
        let traineesId = $traineeForm.data().id
        this.gymRepo.editTrainee(traineesId, traineeForm);
    }
}


export default EventHandler;
