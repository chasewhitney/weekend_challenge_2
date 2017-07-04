var toCalculate = {x:0, y:0};
mathToggle = 0; // used to determine state while buttons are pushed with a result already showing
numToggle = 0; // determines whether x or y is being manipulated
result = 0; // saves last result, used if more math is applied to result
progressBoxes = [];
progressDelay = 0;

$(document).ready(function(){
  console.log('jQuery sourced.');
  addBoxes();
  $('.calculator').on('click', function(){
    // if an equals sign is found in display..
    if($('#display').text().indexOf("=") != -1) {
      // if applying math to a result
      if (mathToggle == 1) {
        numToggle = 1;
        toCalculate.x = result;
      } else {
        // if number buttons are pushed immediately after a result, clear
        clear();
      }
    }
    if (numToggle == 0){
      console.log('number clicked');
      //adds button id value to number to be mathed
      toCalculate.x += $(this).attr('id');
      //appends display
      $('#display p').append($(this).attr('id'));
    } else if (numToggle == 1){
      console.log('number clicked');
      toCalculate.y += $(this).attr('id');
      //appends display
      $('#display p').append($(this).attr('id'));
    }
  });

  $('#mathButtons').on('click', 'button', function(){
    //sets type to id of math button clicked
    toCalculate.type = $(this).attr('id');
    $('#display p').append(" " + $(this).data('sign') + " ");
    //sets 2nd number to be manipulated
    numToggle = 1;
    mathToggle = 1;
  });

  $('#clear').on('click', clear);

  $('#submit').on('click', function(){

    console.log(toCalculate);

    $.ajax({
      type: 'POST',
      url: '/math',
      data: toCalculate,
      success: function(response){
        console.log('post was successful');
      }
    });
    displayResult();
    toCalculate = {x:0, y:0};
    numToggle = 0;
    mathToggle = 0;
  });
});

function displayResult(){
  console.log('displaying result');
  $.ajax({
    type:'GET',
    url:'/result',
    success: function(response){
      simulateCalculationDisplay();
      setTimeout(function(){
        $('#display p').append(" = " + response);
        $('#result').append().text("");
      }, 3000);
      result = response;
    }
  });
}

function addBoxes(){
  for(var i = 0; i < 12; i++){
    var $box = $('<div class="box" data-boxid="' + i + '"></div>');
    $('#boxes').append($box);
    progressBoxes.push($box);

  }
}

function clear(){
  toCalculate = {x:0, y:0};
  numToggle = 0;
  $('#result').empty();
  $('#display p').empty();
}

 function simulateCalculationDisplay(){
   $('#result').append().text("Calculating...");
   for (i = 0; i < progressBoxes.length; i++){
     setTimeout(colorBoxes, progressDelay, i);
     progressDelay += 250;
   }
   setTimeout(resetBoxes, 4000);
 }

 function colorBoxes(i) {
   progressBoxes[i].css('background-color', 'lawngreen');
 }

 function resetBoxes(){
   for (var n = 0; n < progressBoxes.length; n++){
     progressBoxes[n].css('background-color', 'gray');
     progressDelay = 0;
   }
 }
