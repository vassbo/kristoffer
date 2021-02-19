var object = [
  "Lyspæra virker ikkje", 'sett i en ny lyspære',
  "Det er for mykje regn", 'ta på deg bedre klær',
  "Det er for varmt", 'skru ned ovnen',
  "Det er for kaldt", 'ta et teppe rundt deg',
  "Eg er svolten", 'ta deg litt mat',
  "Eg er tørst", 'ta deg litt vatn',
  "Blomsten min visner", 'hell litt vann på den og la den få litt sollys',
  "Eg er sliten", 'slapp litt av',
  "Eg kjeder meg", 'bare finn på noko',
  "Eg er trøtt", 'gå og legg deg',
  "Klokka virker ikkje", 'bytt batteri'
];

generate();
function generate() {
  var problems = [];
  var solutions = [];
  for (var i = 0; i < object.length; i += 2) {
    problems.push(i);
    solutions.push(i + 1);
  }
  shuffle(problems);
  shuffle(solutions);
  createOutput(problems, solutions);
}


function createOutput(problems, solutions) {
  var out = '';
  for (var i = 0; i < problems.length; i++) {
    out += '<div class="group">' + (i + 1) + '. Jeg har et problem: ' +
    '<span class="problem">' + object[problems[i]] + '..</span>' +
    ' ---- ' +
    '<span class="solution">' + object[solutions[i]] + '!</span></div>';
  }
  document.getElementById("output").innerHTML = out;
}



function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}
