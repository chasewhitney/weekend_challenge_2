mathResult = 0;

function doMath(package){
  if(package.type == "add"){
    console.log('package type is add');
    mathResult = parseInt(package.x) + parseInt(package.y);
  } else if(package.type == "subtract"){
    console.log('package type is subtract');
    mathResult = parseInt(package.x) - parseInt(package.y);
  } else if(package.type == "multiply"){
    console.log('package type is multiply');
    mathResult = parseInt(package.x) * parseInt(package.y);
  } else if(package.type == "divide"){
    console.log('package type is divide');
    mathResult = parseInt(package.x) / parseInt(package.y);
  }
  return mathResult;
}

module.exports = {doMath:doMath};
