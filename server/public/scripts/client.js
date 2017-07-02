$(document).ready(function(){
  console.log('jQuery sourced.');
  var toCalculate = {};

  $('button').on('click', function(){
    //console.log($('#num1').val());
    toCalculate.x = $('#num1').val();
    toCalculate.y = $('#num2').val();
    toCalculate.type = $(this).attr('id');
    console.log(toCalculate);

    $.ajax({
      type: 'POST',
      url: '/add',
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
