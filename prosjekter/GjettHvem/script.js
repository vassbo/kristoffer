
var out = '';
for (var i = 0; i < questions.length; i++) {
  out += '<div id="' + i + '" onclick="question(this);">' + questions[i] + '?</div>';
}
document.getElementById("questions").innerHTML = out;

function question(elem) {
  var id = elem.id;
  elem.classList.add("asked");
  document.getElementById("question").innerHTML = elem.innerHTML;
  if (personer[person].questions[id]) {
    document.getElementById("answer").innerHTML = "Ja!";
  } else {
    document.getElementById("answer").innerHTML = "Nei!";
  }
}


var person = '';
generatePerson();
function generatePerson() {
  var keys = Object.keys(personer);
  var random = Math.floor(Math.random() * keys.length);
  person = keys[random];
}



document.getElementById("input").focus();
document.getElementById("input").addEventListener('change', function() {
  var val = this.value;
  var valArray = getWords(val);
  var finished = false;
  if (valArray.length >= 3) {
    val = capitalizeFirstLetter(val);
    var keys = Object.keys(query);
    var compared;
    for (var i = 0; i < keys.length; i++) {
      var values = Object.values(query[keys[i]]);
      // console.log(personer[person][keys[i]]);
      compared = compare(val, values, personer[person][keys[i]]);
      if (compared && keys[i] == 'fasit') { finished = true; }
      if (compared) { break; }
    }
    if (finished) {
      document.getElementById("answer").innerHTML = "Gratulerer!!!!";
      document.getElementById("finish").innerHTML = "Det var <u>" + getPerson() + "</u>!";
      document.getElementById("finish").classList.remove("hidden");
      document.getElementById("again").classList.remove("hidden");
      document.getElementById("again").addEventListener('click', restart);
    } else if (compared) {
      document.getElementById("answer").innerHTML = "Ja!";
    } else {
      document.getElementById("answer").innerHTML = "Nei!";
    }
  } else {
    document.getElementById("answer").innerHTML = "For kort!";
  }
  document.getElementById("question").innerHTML = val;
  // console.log(Object.keys(query));
});


function compare(val, query, personQuery) {
  var valQuery = " " + val;
  var includes = false;
  for (var i = 0; i < query.length; i++) {
    if (valQuery.toLowerCase().includes(query[i])) {
      // console.log(i + ": " + val.toLowerCase() + " == " + query[i]);
      includes = true;
      break;
    }
  }
  var personIncludes = false;
  for (var j = 0; j < personQuery.length; j++) {
    if (personQuery[j] !== "" && valQuery.toLowerCase().includes(personQuery[j])) {
      personIncludes = true;
      break;
    }
  }
  var out = false;
  if (includes && personIncludes) {
    out = true;
  }
  return out;
}




function getWords(val) {
  while (val[0] == " ") {
    val = val.slice(1, val.length);
  }
  while (val[val.length - 1] == " ") {
    val = val.slice(0, val.length - 1);
  }
  while (val.includes("  ")) {
    var index = val.indexOf("  ");
    val = val.slice(0, index) + val.slice(index + 1, val.length);
  }
  val = val.split(" ");
  return val;
}



function capitalizeFirstLetter(string) {
  if (!string.includes("?")) {
    string += "?";
  }
  return string[0].toUpperCase() + string.slice(1);
}



function getPerson() {
  personArray = person.split("_");
  var out = '';
  for (var i = 0; i < personArray.length; i++) {
    if (i !== 0) { out += ' '; }
    out += personArray[i][0].toUpperCase() + personArray[i].slice(1);
  }
  return out;
}






function restart() {
  var query = document.querySelectorAll(".asked");
  for (var i = 0; i < query.length; i++) { query[i].classList.remove("asked"); }

  document.getElementById("question").innerHTML = "Still et spørsmål!";
  document.getElementById("answer").innerHTML = "";
  document.getElementById("finish").innerHTML = "";
  document.getElementById("finish").classList.add("hidden");
  document.getElementById("again").classList.add("hidden");
  document.getElementById("again").removeEventListener('click', restart);

  document.getElementById("input").value = "";
  document.getElementById("input").focus();

  generatePerson();
}
