var toCalculate = {x:0, y:0};
numToggle = 0; // determines whether x or y is being manipulated

$(document).ready(function(){
  console.log('jQuery sourced.');


  $('.calculator').on('click', function(){
    if (numToggle == 0){
      console.log('number clicked');
      //adds button id value to number to be mathed
      toCalculate.x += $(this).attr('id');
    } else if (numToggle == 1){
      console.log('number clicked');
      toCalculate.y += $(this).attr('id');
    }
  });

  $('#mathButtons').on('click', 'button', function(){
    //sets type to id of math button clicked
    toCalculate.type = $(this).attr('id');
    //sets 2nd number to be manipulated
    numToggle = 1;
  });

  $('#clear').on('click', function(){
    toCalculate = {x:0, y:0};
    numToggle = 0;
    $('#result').empty();
  });

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

  });

});
function displayResult(){
  console.log('displaying result');
  $.ajax({
    type:'GET',
    url:'/result',
    success: function(response){
      $('#result').append().text("Result: " + response);
    }

  });

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
