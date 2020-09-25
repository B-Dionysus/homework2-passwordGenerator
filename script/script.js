// Global variables
var passLength=8;
var passLowerCase=true;
var passUpperCase=false;
var passNumeric=false;
var passSpecial=false;
var maxPassLength=40;

init();


// -------------------------------------------------------------
// --                 init()                                  --
// --                   Runs when the page is loaded          --
// -------------------------------------------------------------
function init(){
  updatePassRequirements(document.getElementById("length-input"));
}

// -------------------------------------------------------------
// --         updatePassRequirements()                        --
// --                   Runs when the user changes one of     --
// --                   the options for password generation   --
// --                   (Called from the inputs in index.html)--
// -------------------------------------------------------------
function updatePassRequirements(obj){
  if(obj.id==="length-input"){
    passLength=obj.value;
  }
  if(obj.id==="include-lowercase"){
    passLowerCase=obj.checked;
  }
  if(obj.id==="include-uppercase"){
    passUpperCase=obj.checked;
  }
  if(obj.id==="include-numeric"){
    passNumeric=obj.checked;
  }
  if(obj.id==="include-special"){
    passSpecial=obj.checked;
  }

// -------------------------------------------------------------
// --         sanityCheck()                                   --
// --                   Runs when the user changes one of     --
// --                   the options for password generation   --
// --                   (Called from the inputs in index.html)--
// -------------------------------------------------------------
  sanityCheck();

    // The default password text is a message that describe the password constraints
    // We have to store it as an array so that we can figure out which element is the
    // penultimate one and then add the word "and" after it. Ugh.
    var msg=["A password of length "+passLength];
    if(passLowerCase) msg.push(", with lowercase characters");
    if(passUpperCase) msg.push(", with uppercase characters");
    if(passNumeric) msg.push(", with number characters");
    if(passSpecial) msg.push(", with special characters");


    // First, we make a copy of the last element (excluding the initial comma)
    // and copy it to the end of the array
    msg.push(msg[msg.length-1].substring(1));
    // Then we set was *was* the last element, but is not the penultimate element, 
    // to "and"
    msg[msg.length-2]=" and";
    msg.push(".");
    var output="";
    for(m of msg) output+=m;
  document.getElementById("password").value=output;
}

// -------------------------------------------------------------
// --    generateRandomCharacter()                            --
// --               Returns a random unicode value based      --
// --               on the user's preferences.                --     
// -------------------------------------------------------------
function generateRandomCharacter() {

  var charCategories=[];

  // Each possible category (e.g., lowercase letters, numberic letters, &c.) has 
  // a unicode max and min. For exampl, lowercase "a" is 97, and lowercase "z" is 122
  var lowerBounds={
    max:122,
    min:97
  };
  var upperBounds={
    max:90,
    min:65
  };
  var numericBounds={
    max:57,
    min:48
  };
  var specialBounds={
    // This does not include :, ;, <, =, > ? or @, chars 58-64
    max:47,
    min:33
  };

  // Based on what the user has chosen, add this to the charCategories array
  if(passLowerCase) charCategories.push(lowerBounds);
  if(passUpperCase) charCategories.push(upperBounds);
  if(passNumeric) charCategories.push(numericBounds);
  if(passSpecial) charCategories.push(specialBounds);

  // Pick a category at random
  var randCat=Math.floor(Math.random()*charCategories.length);

  // Now pick an individual char from that category
  var catLength=charCategories[randCat].max-charCategories[randCat].min;
  var randChar=Math.floor(Math.random()*catLength)+charCategories[randCat].min;

  return randChar;
}


function generatePassword(){
  passChar=generateRandomCharacter();
  console.log(passChar);
  document.querySelector("#password").value=String.fromCharCode(passChar);


}



function sanityCheck(){
  if(!passLowerCase && !passUpperCase && !passNumeric && !passSpecial){
    // We can't have a password without anything in it!
    passLowerCase=true;
    document.getElementById("include-lowercase").checked=true;
  }
  if(passLength>maxPassLength){
    // Larger passwords are more secure, but let's set a limit somewhere!
    passLength=maxPassLength;
    document.getElementById("length-input").value=maxPassLength;
  }
  if(passLength<1){
    // We probably shouldn't allow the user to have a one character password
    // But we certainly can't let them have a -5 character password!
    passLength=1;
    document.getElementById("length-input").value=1;
  }
}








// Assignment Code
var generateBtn = document.querySelector("#generate");



// Add event listener to generate button
generateBtn.addEventListener("click", generatePassword);
