var questions = [
  'Har personen brunt hår',
  'Er personen blond',
  'Er personen skallet',
  'Er personen fra amerika',
  'Er personen fra europa',
  'Er personen fra norge',
  'Er det en gutt',
  'Er det en jente',
  'Er det en mann',
  'Er det en kvinne',
  'Er personen forfatter',
  'Er personen kjent for skuespill',
  'Er personen fiktiv',
  'Bruker personen briller',
  'Bruker personen kjole',
  'Liker personen å synge',
  'Har personen bart',
  'Har personen skjegg'
];


var query = {
  'fasit': ['er det'], // e.g: er det Queen Elizabeth
  'kjønn': ['mann', 'kvinne', 'gutt', 'jente', 'hokjønn', 'hankjønn'], // e.g: er det en mann
  'hårfarge': ['blond', 'skallet', 'skalla', 'hår', 'hårfarge'],  // e.g: har den blondt hår
  'kommer_fra': ['fra', 'kommer', 'født', 'nasjonalitet', 'produsert', 'skaper', 'skapt'], // e.g: kommer den fra england
  'bosted': ['bor ', 'bosted', 'nasjonalitet', 'statsborger'], // e.g: bor den i norge
  'bruker': ['bruker', 'har', 'på seg', 'klede', 'kler'], // e.g: bruker den briller || har personen skjegg
  'yrke': ['yrke', 'jobb'], // e.g: jobber den som forfatter
  'hobby': ['liker', 'hobby', 'pleier'], // e.g: liker personen å gå tur
  'kjent_for': ['kjent', 'kjenner', 'forbinder', 'tenker', 'lager'], // e.g: er den kjent for sine bøker
  'andre_er': [' er ', 'person', 'han ', 'hun ', 'snakker'], // e.g: er personen kongelig
  'andre_har': ['person', 'han ', 'hun' , 'har ', 'snakker'] // e.g: har personen kone
};

var personer = {
  'kong_harald': {
    'questions': [false, false, true, false, true, true, false, false, true, false, false, false, false, false, false, false, false, false],
    'fasit': ['kong harald', 'kongen'],
    'kjønn': ['mann', 'hankjønn'],
    'hårfarge': ['skallet', 'skalla'],
    'kommer_fra': ['europa', 'norge', 'nord', 'skandinavia', 'oslo'],
    'bosted': ['europa', 'norge', 'nord', 'skandinavia', 'oslo'],
    'bruker': ['dress', 'slips'],
    'yrke': ['konge', 'politiker'],
    'hobby': [''],
    'kjent_for': ['politikk', 'politiker', 'tale'],
    'andre_er': ['kongelig', 'gammel', 'ekte', ' rik', 'norsk', 'konge'],
    'andre_har': ['masse penger', 'søsken', 'kone', 'barn', 'sønn', 'datter']
  },
  'alan_walker': {
    'questions': [true, false, false, false, true, false, false, false, true, false, false, false, false, false, false, false, true, true],
    'fasit': ['alan walker'],
    'kjønn': ['mann', 'hankjønn'],
    'hårfarge': ['brunt'],
    'kommer_fra': ['england', 'storbritania', 'northampton'],
    'bosted': ['europa', 'norge', 'nord', 'skandinavia'],
    'bruker': ['maske'],
    'yrke': ['dj', 'musikkprodusent', 'komponist'],
    'hobby': ['musikk'],
    'kjent_for': ['musikk', 'edm', 'house', 'dj', 'youtube', 'faded'],
    'andre_er': ['walker', 'dj', 'musikkprodusent', 'komponist', 'ekte', 'norsk', 'engelsk'],
    'andre_har': ['kjærest']
  },
  'snøhvit': {
    'questions': [false, false, false, true, false, false, false, true, false, true, false, false, true, false, true, true, false, false],
    'fasit': ['snøhvit', 'snehvit'],
    'kjønn': ['kvinne', 'dame', 'jente', 'hokjønn'],
    'hårfarge': ['svart'],
    'kommer_fra': ['amerika', 'usa', 'disney', 'tysk', 'disney'],
    'bosted': ['eventyrland', 'skog'],
    'bruker': ['kjole', 'høye hæler'],
    'yrke': ['prinsesse'],
    'hobby': [''],
    'kjent_for': ['eventyr', 'fantasi', 'prinsesse', 'disney', 'snø', 'gul', 'blå', 'speil'],
    'andre_er': ['prinsesse', 'ung', 'fiktiv', 'oppdiktet', 'eventyr', 'fantasi', 'speil'],
    'andre_har': ['']
  },
  'askepott': {
    'questions': [false, true, false, true, false, false, false, true, false, true, false, false, true, false, true, true, false, false],
    'fasit': ['askepott'],
    'kjønn': ['kvinne', 'dame', 'jente', 'hokjønn'],
    'hårfarge': ['blondt', 'brun', 'gul', 'orasj'],
    'kommer_fra': ['amerika', 'usa', 'disney'],
    'bosted': ['eventyrland'],
    'bruker': ['kjole', 'høye hæler', 'øredobber'],
    'yrke': ['hushjelp'],
    'hobby': ['hjelp'],
    'kjent_for': ['eventyr', 'fantasi', 'prinsesse', 'disney', 'sko', 'fattig', 'gresskar', 'ball'],
    'andre_er': ['prinsesse', 'ung', 'fiktiv', 'oppdiktet', 'eventyr', 'fantasi'],
    'andre_har': ['stemor', 'stesøstre']
  },
  'dronning_elizabeth': {
    'questions': [false, false, false, false, true, false, false, false, false, true, false, false, false, false, true, true, false, false],
    'fasit': ['elizabeth alexandra mary', 'elizabeth', 'dronning elizabeth', 'queen elizabeth'],
    'kjønn': ['kvinne', 'dame', 'hokjønn'],
    'hårfarge': ['kvit', 'hvit'],
    'kommer_fra': ['europa', 'storbritania', 'england', 'london'],
    'bosted': ['europa', 'storbritania', 'england', 'london'],
    'bruker': ['kjole', 'øredobber'],
    'yrke': ['dronning', 'politiker'],
    'hobby': [''],
    'kjent_for': ['politikk', 'politiker'],
    'andre_er': ['kongelig', 'gammel', 'ekte', ' rik', 'engelsk'],
    'andre_har': ['masse penger', 'søster', 'søsken']
  },
  'dronning_sonja': {
    'questions': [true, true, false, false, true, true, false, false, false, true, false, false, false, false, true, true, false, false],
    'fasit': ['dronning sonja', 'sonja', 'dronningen'],
    'kjønn': ['kvinne', 'dame', 'hokjønn'],
    'hårfarge': ['brun', 'blond'],
    'kommer_fra': ['europa', 'norge', 'nord', 'skandinavia', 'oslo'],
    'bosted': ['europa', 'norge', 'nord', 'skandinavia', 'oslo'],
    'bruker': ['kjole', 'øredobber'],
    'yrke': ['dronning', 'politiker'],
    'hobby': [''],
    'kjent_for': ['politikk', 'politiker'],
    'andre_er': ['kongelig', 'gammel', 'ekte', ' rik', 'norsk', 'dronning'],
    'andre_har': ['masse penger', 'barn', 'sønn', 'datter']
  },
  'kronprins_haakon': {
    'questions': [true, false, false, false, true, true, false, false, true, false, false, false, false, false, false, true, true, true],
    'fasit': ['kronprins haakon', 'haakon', 'kronprins håkon', 'haakon magnus', 'kronprinsen'],
    'kjønn': ['mann', 'hankjønn'],
    'hårfarge': ['brun'],
    'kommer_fra': ['europa', 'norge', 'nord', 'skandinavia', 'oslo'],
    'bosted': ['europa', 'norge', 'nord', 'skandinavia', 'oslo'],
    'bruker': ['dress', 'slips'],
    'yrke': ['kronprins', 'politiker'],
    'hobby': [''],
    'kjent_for': ['politikk', 'politiker', 'tale'],
    'andre_er': ['kongelig', 'ung', 'ekte', ' rik', 'norsk'],
    'andre_har': ['masse penger', 'søsken', 'datter', 'sønn', 'barn', 'søster', 'kone', 'bart', 'skjegg']
  },
  'elon_musk': {
    'questions': [true, false, false, true, false, false, false, false, true, false, false, true, false, false, false, false, false, false],
    'fasit': ['elon musk'],
    'kjønn': ['mann', 'hankjønn'],
    'hårfarge': ['brun'],
    'kommer_fra': ['afrika', 'sør afrika', 'sør-afrika', 'pretoria', 'johannesburg'],
    'bosted': ['amerika', 'usa'],
    'bruker': ['dress'],
    'yrke': ['gründer', 'grunder', 'grunnlegger', 'investor', 'oppfinner'],
    'hobby': [''],
    'kjent_for': ['paypal', 'spacex', 'tesla', 'ingeniør', 'skuespill'],
    'andre_er': ['ung', 'ekte', ' rik', 'amerikansk'],
    'andre_har': ['masse penger', 'søsken', 'brødre', 'kone']
  },
  'donald_trump': {
    'questions': [false, true, false, true, false, false, false, false, true, false, false, false, false, false, false, false, false, false],
    'fasit': ['trump', 'donald trump'],
    'kjønn': ['mann', 'hankjønn'],
    'hårfarge': ['blond'],
    'kommer_fra': ['amerika', 'usa', 'new york', 'jamaica'],
    'bosted': ['amerika', 'usa', 'new york', 'manhattans'],
    'bruker': ['dress', 'slips'],
    'yrke': ['president', 'forretning'],
    'hobby': [''],
    'kjent_for': ['politikk', 'politiker', 'president', 'forretning', 'trump tower'],
    'andre_er': ['merkelig', 'rar', 'gammel', 'ekte', ' rik', 'forretning', 'president', 'amerikansk'],
    'andre_har': ['masse penger', 'søsken', 'datter', 'sønn', 'søster', 'brødre', 'kone']
  },
  'barack_obama': {
    'questions': [false, false, false, true, false, false, false, false, true, false, false, false, false, false, false, true, false, false],
    'fasit': ['obama', 'barack obama'],
    'kjønn': ['mann', 'hankjønn'],
    'hårfarge': ['grå', 'svart'],
    'kommer_fra': ['amerika', 'usa', 'hawaii', 'honolulu'],
    'bosted': ['amerika', 'usa', 'new york', 'manhattans'],
    'bruker': ['dress', 'slips'],
    'yrke': ['president', 'jurist', 'politiker'],
    'hobby': [''],
    'kjent_for': ['politikk', 'politiker', 'president', 'jurist', 'politiker'],
    'andre_er': ['gammel', 'ekte', ' rik', 'president', 'svart', 'mørkhud', 'amerikansk'],
    'andre_har': ['masse penger', 'søsken', 'datter', 'sønn', 'søster', 'brødre', 'kone']
  },
  'donald_duck': {
    'questions': [false, false, false, true, false, false, false, false, true, false, false, false, true, false, false, false, false, false],
    'fasit': ['donald duck', 'donald'],
    'kjønn': ['mann', 'hankjønn'],
    'hårfarge': ['hvit'],
    'kommer_fra': ['amerika', 'disney', 'andeby'],
    'bosted': ['andeby'],
    'bruker': ['genser', 'jumper'],
    'yrke': ['onkel skrue'],
    'hobby': [''],
    'kjent_for': ['donald'],
    'andre_er': ['ung', 'fiktiv', 'oppdiktet', 'and', 'tullete'],
    'andre_har': ['nevø', 'søster', 'uflaks', 'nebb']
  },
  'onkel_skrue': {
    'questions': [false, false, false, true, false, false, false, false, true, false, false, false, true, true, false, false, false, false],
    'fasit': ['onkel skrue', 'skrue mcduck'],
    'kjønn': ['mann', 'hankjønn'],
    'hårfarge': ['hvit'],
    'kommer_fra': ['amerika', 'disney', 'andeby'],
    'bosted': ['andeby'],
    'bruker': ['frakk', 'briller'],
    'yrke': [''],
    'hobby': [''],
    'kjent_for': ['donald', 'penger'],
    'andre_er': ['gammel', 'fiktiv', 'oppdiktet', 'and', ' rik', 'gretten'],
    'andre_har': ['lykkemynt', 'masse penger']
  },
  'petter_smart': {
    'questions': [false, false, false, true, false, false, false, false, true, false, false, false, true, true, false, false, false, false],
    'fasit': ['petter smart'],
    'kjønn': ['mann', 'hankjønn'],
    'hårfarge': ['hvit'],
    'kommer_fra': ['amerika', 'disney', 'andeby'],
    'bosted': ['andeby'],
    'bruker': ['briller'],
    'yrke': ['oppfinner'],
    'hobby': ['oppfinner'],
    'kjent_for': ['donald', 'oppfinnelser'],
    'andre_er': ['fiktiv', 'oppdiktet', 'and', 'smart'],
    'andre_har': ['']
  },
  'skomaker_andersen': {
    'questions': [false, true, false, false, true, true, false, false, true, false, false, false, true, true, false, true, false, false],
    'fasit': ['skomaker andersen', 'jens petrus andersen', 'jens petrus'],
    'kjønn': ['mann', 'hankjønn'],
    'hårfarge': ['hvit', 'blond'],
    'kommer_fra': ['europa', 'skandinavia', 'norge'],
    'bosted': ['europa', 'skandinavia', 'norge'],
    'bruker': ['briller'],
    'yrke': ['skomaker'],
    'hobby': ['skomaker'],
    'kjent_for': ['skomakergata', 'tøflus'],
    'andre_er': ['fiktiv', 'oppdiktet', 'skomaker', 'norsk'],
    'andre_har': ['']
  },
  'kristoffer_vassbø': {
    'questions': [true, false, false, false, true, true, true, false, false, false, false, false, false, false, false, true, false, false],
    'fasit': ['kristoffer vassbø', 'kristoffer'],
    'kjønn': ['gutt', 'hankjønn'],
    'hårfarge': ['brun'],
    'kommer_fra': ['europa', 'skandinavia', 'norge', 'rogaland', 'time', 'lye'],
    'bosted': ['europa', 'skandinavia', 'norge', 'rogaland', 'time', 'lye'],
    'bruker': [''],
    'yrke': [''],
    'hobby': [''],
    'kjent_for': [''],
    'andre_er': ['ekte', 'norsk'],
    'andre_har': ['']
  }
};



// Personer:
// Kong Harald, Alan Walker, Snøhvit, Askepott, Dronning Elizabeth, Dronning Sonja, Kronprins Haakon, Elon Musk, Donald Trump, Barack Obama, Donald Duck, Onkel Skrue, Petter Smart, Skomaker Andersen, Kristoffer Vassbø, ...
