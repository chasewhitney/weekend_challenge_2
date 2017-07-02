var toCalculate = {x:0, y:0};
mathToggle = 0; // used to determine state while buttons are pushed with a result already showing
numToggle = 0; // determines whether x or y is being manipulated
result = 0; // saves last result, used if more math is applied to result

$(document).ready(function(){
  console.log('jQuery sourced.');


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
      $('#result').append().text("Calculating...");
      //$('#display:last').append(" = " + response);
      // $('#display:last').delay(3000).queue(function(){
      //   $(this).append(" = " + response);
      //   $('#result').append().text("");
      // });
      setTimeout(function(){
        $('#display p').append(" = " + response);
        $('#result').append().text("");
      }, 3000);


      result = response;
    }

  });

}

function clear(){
  toCalculate = {x:0, y:0};
  numToggle = 0;
  $('#result').empty();
  $('#display p').empty();
}
// clicking numbers should add to num1
// clicking math should add type of math
// clicking math should change state so numbers add to num2

/*
$('button').on('click', function(){
  //console.log($('#num1').val());
  toCalculate.x = $('#num1').val();
  toCalculate.y = $('#num2').val();
  toCalculate.type = $(this).attr('id');
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

});
$('#subtract').on('click', function(){
  console.log($(this).attr('id'));
});
*/
