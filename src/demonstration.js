$(document).ready(mainTimeline);

function mainTimeline() {
    stepNext();
    stepAdd();
    stepRemove();
    timelineReset();
    labelPositionToggler();
    labelTypeToggler();
}


function stepNext(){
    $('#stepNext').on('click', function (e) {
        var timelineSteps = $(this).parents('.demonstration-container').find('.timeline__item .timeline__step');
        var timelineStepsCount = timelineSteps.length;
        var timelineFinishedStepsCount = 0;
        var isStepAdded = false;
        timelineSteps.map(function(number, item){
            var isInProcess = $(item).hasClass('timeline__step_in-the-process');
            var isFinished = $(item).hasClass('timeline__step_finished');
            if( !isInProcess && !isFinished && !isStepAdded){
                $(item).addClass('timeline__step_in-the-process');
                isStepAdded = true;
            }
            else if( isInProcess && !isFinished && !isStepAdded ){
                $(item).removeClass('timeline__step_in-the-process');
                $(item).addClass('timeline__step_finished');
                timelineFinishedStepsCount++;
                isStepAdded = true;
            }
            else if( !isInProcess && isFinished){
                timelineFinishedStepsCount++;
                if (timelineStepsCount == timelineFinishedStepsCount){
                    alert('Линия заполнена!');
                }
            }
            else{}
        });
        console.log('proceed to the next step');
    });
}

function stepAdd(){
    $('#stepAdd').on('click', function (e) {
        var timelineItem = $(this).parents('.demonstration-container').find('.timeline__item');
        var timelineSteps = $(this).parents('.demonstration-container').find('.timeline__step');
        var timelineStep = $(timelineSteps[0]).clone();
        timelineStep.find('.timeline__label').text('New step');
        $(timelineStep).removeClass('timeline__step_finished');
        timelineItem.map(function(number, item){
            $(item).append(timelineStep);
        });
        console.log('step added');
    });
}

function stepRemove(){
    $('#stepRemove').on('click', function (e) {
        var timelineSteps = $(this).parents('.demonstration-container').find('.timeline__step');
        if(timelineSteps.length <= 2){
            alert('Достигнуто минимальное количество шагов!')
            return 0;
        }
        $(timelineSteps[timelineSteps.length-1]).remove();
        console.log('step removed');
    });
}

function timelineReset() {
    $('#timelineReset').on('click', function (e) {
        var steps = $(this).parents('.demonstration-container').find('.timeline__step');
        steps.map(function(number, item){
            $(item).removeClass('timeline__step_in-the-process');
            $(item).removeClass('timeline__step_finished');
        });
        console.log('timeline reseted');
    });
}

function labelPositionToggler(){
    $('#labelPositionToggler').on('click', function (e) {
        var timelineItems = $(this).parents('.demonstration-container').find('.timeline__item');
        timelineItems.map(function(number, item){
            $(item).toggleClass('timeline__item_label_bottom');
        });
        console.log('label position changed');
    });
}

function labelTypeToggler(){
    $('#labelTypeToggler').on('click', function (e) {
        var timelineItems = $(this).parents('.demonstration-container').find('.timeline__item');
        timelineItems.map(function(number, item){
            $(item).toggleClass('timeline__item_type-dots');
        });
        console.log('label type changed');
    });
}
