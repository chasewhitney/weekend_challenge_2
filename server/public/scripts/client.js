var toCalculate = {x:0, y:0}; // numbers sent to server to be calculated
mathToggle = 0; // used to determine state while buttons are pushed with a result already showing
numToggle = 0; // determines whether x or y is being manipulated
result = 0; // saves last result, used if more math is applied to result
progressBoxes = []; // boxes that light up green to simulate calculating delay
progressDelay = 0; // used for delaying each box light up in sequence

$(document).ready(function(){
  console.log('jQuery sourced.');
  addBoxes();
  eventHandlers();
});

function eventHandlers(){
  $('.calculator').on('click', setXandY);
  $('#mathButtons').on('click', 'button', setCalculationType);
  $('#clear').on('click', clear);
  $('#submit').on('click', submitForCalculation);
}

function setXandY(){
  // sets the two numbers that will be used in the calculation
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
    // if starting fresh
    console.log('number clicked');
    // adds button id value to number to be calculated
    toCalculate.x += $(this).attr('id');
    // appends display
    $('#display p').append($(this).attr('id'));
  } else if (numToggle == 1){
    // if on second number to be calculated
    console.log('number clicked');
    toCalculate.y += $(this).attr('id');
    // appends display
    $('#display p').append($(this).attr('id'));
  }
}

function setCalculationType(){
  // sets type to id of math button clicked - add, subract, multiply, or divide
  toCalculate.type = $(this).attr('id');
  $('#display p').append(" " + $(this).data('sign') + " ");
  // sets state so 2nd number will be set
  numToggle = 1;
  mathToggle = 1;
}

function submitForCalculation(){
  // submits numbers to server to be calculated and calls displayResult
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
  // reset state
  toCalculate = {x:0, y:0};
  numToggle = 0;
  mathToggle = 0;
}

function displayResult(){
  // displays result after calculation
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
  // adds gray boxes to the DOM for calculation delay simulation
  for(var i = 0; i < 12; i++){
    var $box = $('<div class="box" data-boxid="' + i + '"></div>');
    $('#boxes').append($box);
    progressBoxes.push($box);
  }
}

function clear(){
  // resets the calculator
  toCalculate = {x:0, y:0};
  numToggle = 0;
  $('#result').empty();
  $('#display p').empty();
}

 function simulateCalculationDisplay(){
   // simulates 'calculating' state
   $('#result').append().text("Calculating...");
   for (i = 0; i < progressBoxes.length; i++){
     setTimeout(colorBoxes, progressDelay, i);
     progressDelay += 250;
   }
   setTimeout(resetBoxes, 4000);
 }

 function colorBoxes(i) {
   // used in coloring gray boxes green during calculation delay
   progressBoxes[i].css('background-color', 'lawngreen');
 }

 function resetBoxes(){
   // sets progress boxes back to gray after calculation is complete
   for (var n = 0; n < progressBoxes.length; n++){
     progressBoxes[n].css('background-color', 'gray');
     progressDelay = 0;
   }
 }
