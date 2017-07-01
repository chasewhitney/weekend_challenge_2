$(document).ready(function(){
  console.log('jQuery sourced.');
  var toCalculate = {};

  $('#add').on('click', function(){
    //console.log($('#num1').val());
    toCalculate.x = $('#num1').val();
    toCalculate.y = $('#num2').val();
    toCalculate.type = "Add";
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
