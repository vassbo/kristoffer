
// TODO: set cookies/second to include the user input

////////// Set vars //////////

// var active = false;
var cookie = {
  cookies: 0,
  time: 0,
  // cps: 0, // cookies per second
  cpc: { // cookies per click
    amount: 1,
    multiplier: 10, // %?? // default = 25%
    price: 50 // 40
  },
  upgrades: {
    auto: {
      name: 'Auto Clicker',
      amount: 0,
      cps: 1,
      multiplier: 20,
      price: 5
    },
    speed: {
      name: 'Speed Clicker',
      amount: 0,
      cps: 2,
      multiplier: 25,
      price: 100
    }
  },
  theme: {
    bgcolor: 'default',
    purchased: []
  }
}
console.log(cookie);

////////// Get Local Storage Support //////////

if (typeof(Storage) == 'undefined') {
  alert("Your browser doesn't support local storage, that means that your progress will not be saved!");
}
// delete localStorage.cookie;

////////// Check if browser window is active //////////

var tabActive = true;
window.addEventListener("focus", function(event) { tabActive = true; }, false);
window.addEventListener("blur", function(event) { tabActive = false; }, false);

////////// Local Storage //////////
// localStorage.removeItem('name');

// uncomment to reset:
// TODO: reset button
// localStorage.clicks = 0;
// localStorage.cookiesPerClick = 1;
// localStorage.cookiesPerSec = 0;
// localStorage.cookiesperclickAmount = 1;
// localStorage.cookiesperclickPrize = 40; // becomes 50
// localStorage.autoclickersAmount = 0;
// localStorage.autoclickersPrize = 5;
// localStorage.speedclickersAmount = 0;
// localStorage.speedclickersPrize = 100;
// localStorage.bgcolor = JSON.stringify(['true', 'false', 'false', 'false', 'false', 'false', 'false', 'false']);
// localStorage.selectedColor = 'defaultColor';
// localStorage.bgcolorhex = '#e0cdbc';




if (localStorage.cookie !== undefined) {
  cookie = JSON.parse(localStorage.cookie);
  updateClicks();


  document.getElementById('cookiesPerSecAmount').innerHTML = cookiesPerSec;
  
  // loop through array
  updateStore('cookiesperclick');
  function updateStore(name) {
    document.getElementById(name + 'Amount').innerHTML = localStorage.cookie.upgrades[name].amount;
    document.getElementById(name + 'Prize').innerHTML = Number(localStorage.cookiesperclickPrize) + Number(document.getElementById(name + 'Amount').innerHTML) * 10;
  }

  // update times...
  document.getElementById('time').innerHTML = secToHours(cookie.time);


  // background color
  // if (!localStorage.bgcolor) {
  //   localStorage.bgcolor = JSON.stringify(['true', 'false', 'false', 'false', 'false', 'false', 'false', 'false']);
  // }
  // var bgcolorArray = JSON.parse(localStorage.bgcolor);
  // if (!localStorage.selectedColor) {
  //   localStorage.selectedColor = 'defaultColor';
  // }
  var selectedColor = document.getElementById(localStorage.selectedColor);
  if (!localStorage.bgcolorhex) {
    localStorage.bgcolorhex = '#e0cdbc';
  }
  document.body.style.background = localStorage.bgcolorhex;
} else {
  // localStorage.cookie = JSON.stringify(cookie);
}





// var colorDiv = ['defaultColor', 'redColor', 'orangeColor', 'yellowColor', 'greenColor', 'blueColor', 'indigoColor', 'violetColor'];
// var i = 0;
// while (i <= 7) {
//   if (bgcolorArray[i] == 'true') {
//     var color = colorDiv[i];
//     var colorButton = document.getElementById(color);

//     colorButton.style.padding = "8px";
//     colorButton.style.height = '24px';
//     colorButton.innerHTML = "";

//     selectedColor.style.padding = "8px 8px 3px 8px";
//     selectedColor.style.height = '';
//     selectedColor.innerHTML = "<i id='" + color + "Prize' class='material-icons'>check_circle</i>";
//   }
//   i++;
// }

////////// Counter //////////

var cookiesPerClick = cookie.cpc.amount;
var cookiesPerSec = getPerSec();
function getPerSec() { // get cookies per second
  var count = 0;
  for (let i = 0; i < cookie.upgrades.length; i++) {
    count += cookie.upgrades[i].amount * cookie.upgrades[i].cps;
  }
  return count;
}
// var cps = cookiesPerClick + cookiesPerSec;
var cps = 0;



// store time and min
main();
setInterval(main, 1000);
function main() {
  // update cps (cookies per second)
  cps = getPerSec();
  document.getElementById('cookiesPerSecAmount').innerHTML = cps;
  // TODO: average cps

  // auto clicker
  cookie.cookies += cps;
  updateClicks();
  if (tabActive == true) {
    var i = 0;
    while (cps > 0 && Math.floor(Math.random() * 10) == i && i < 10) {
      cookieRain();
      i++;
    }
    // if (cps > 0) {
    //   cookieRain();
    // }
  }

  // update time
  if (tabActive) {
    if (cookie.time === undefined) cookie.time = 0;
    cookie.time++;
    if (cookie.time % 60 === 0) document.getElementById('time').innerHTML = secToHours(cookie.time);
  }

  // update clock
  var d = new Date();
  var h = ('0' + d.getHours()).substring(1);
  var m = ('0' + d.getMinutes()).substring(1);
  document.getElementById('clock').innerHTML = h + ":" + m;

  // save to localStorage
  // localStorage.cookie.cookies = JSON.stringify(cookie.cookies);
}

function secToHours(sec) {
  var h = sec / (60 * 60);
  var hours = Math.floor(h);
  var minutes = Math.floor((h - hours) * 60);
  return hours + " h and " + minutes + " m";
}

////////// Button menus //////////

var title = document.getElementById("title");
var mainMenu = document.getElementById("main").classList;
var back = document.getElementById("back").classList;
var activeMenu = "";

function button(id) {

  // remove "Btn"
  var currentName = id.slice(0, -3);

  // get element and store it
  var current = document.getElementById(currentName).classList;
  activeMenu = current;

  // make first letter uppercase and set as title
  var upperFirstLetter = currentName.charAt(0).toUpperCase() + currentName.slice(1);
  title.innerHTML = upperFirstLetter;

  // show and hide elements
  mainMenu.add("hidden");
  back.remove("hidden");
  current.remove("hidden");
}

function goBack() {
  title.innerHTML = "AddictClicker";
  mainMenu.remove("hidden");
  back.add("hidden");
  activeMenu.add("hidden");
}

////////// Clicks //////////

function clickCookie() {
  cookie.cookies += cookiesPerClick;
  updateClicks();
  cookieRain();

  cps += cookiesPerClick;
  document.getElementById('cookiesPerSecAmount').innerHTML = cps;
}

function updateClicks() {
  var c = cookie.cookies + ' cookies';
  if (cookie.cookies === 1) c.slice(0, -1);
  else if (cookie.cookies >= Math.pow(10, 12)) c = 'Infinite cookies';

  document.getElementById('clicks').innerHTML = c;
}

var pressed = false;
document.body.addEventListener("keydown", function(e) {
  if (e.key == ' ' && !pressed) {
    clickCookie();
    pressed = true;
    document.getElementById('image').querySelector('img').classList.add('pushed');
  }
});
document.body.addEventListener("keyup", function(e) {
  if (e.key == ' ') {
    document.getElementById('image').querySelector('img').classList.remove('pushed');
    pressed = false;
  }
});

////////// Cookie Rain //////////

// TODO: Cookie Rain
function cookieRain() {
  var cookieDiv = document.createElement("div");
  cookieDiv.id = "image";
  cookieDiv.style.top = "-60px";
  cookieDiv.style.zIndex = "-2";

  // var width = window.screen.availWidth;
  var width = window.innerWidth;
  var ranNum = Math.floor(Math.random() * (width - 250)) + 250;
  cookieDiv.style.left = ranNum + "px";

  document.body.appendChild(cookieDiv);

  var cookie = document.createElement("img");
  cookie.src = "cookie_tiny.png";
  var randomSize = Math.floor(Math.random() * 5) + 10; // 10 - 14
  cookie.style.height = randomSize + "vh";
  cookie.style.opacity = "0.6";
  cookie.setAttribute("draggable", false);
  cookie.setAttribute("onclick", 'removeMe(this)');

  cookieDiv.appendChild(cookie);

  // animate
  var ranSpeed = Math.floor(Math.random() * 12) + 0.5;
  var id = setInterval(frame, ranSpeed);
  var pos = -60;
  function frame() {
    // if (pos > window.screen.availWidth - 500) {
    if (pos > window.innerHeight + 100) {
      clearInterval(id);
      cookieDiv.remove();
    } else {
      pos++;
      cookieDiv.style.top = pos + 'px';
    }
  }
}

function removeMe(elem) {
  elem.remove();
  cookie.cookies += cookiesPerClick + 5;
  updateClicks();

  cps += cookiesPerClick + 5;
  document.getElementById('cookiesPerSecAmount').innerHTML = cps; //TODO: move
}

////////// Autoclickers //////////

function buy(what) {

  var amount = document.getElementById(what + 'Amount');
  var prize = document.getElementById(what + 'Prize');
  var cost = prize.innerHTML;

  // alert(cookie.cookies >= cost);
  // alert(Number(amount.innerHTML) + 1);
  // alert(document.getElementById(what + 'Prize').innerHTML);

  if (cookie.cookies >= cost && amount.innerHTML < 100) {

    if (what == 'autoclickers') {
      cookiesPerSec += 1;
      localStorage.cookiesPerSec = cookiesPerSec;
      newCost = Number(cost) + (Number(amount.innerHTML) + 1) * 20;
      localStorage.autoclickersPrize = cost;
      localStorage.autoclickersAmount = Number(amount.innerHTML) + 1;
    } else if (what == 'speedclickers') {
      cookiesPerSec += 2;
      localStorage.cookiesPerSec = cookiesPerSec;
      newCost = Number(cost) + (Number(amount.innerHTML) + 1) * 25;
      localStorage.speedclickersPrize = cost;
      localStorage.speedclickersAmount = Number(amount.innerHTML) + 1;
    } else if (what == 'cookiesperclick') {
      cookiesPerClick += 1;
      localStorage.cookiesPerClick = cookiesPerClick;
      newCost = Number(cost) + (Number(amount.innerHTML) + 1) * 10;
      localStorage.cookiesperclickPrize = cost;
      localStorage.cookiesperclickAmount = Number(amount.innerHTML) + 1;
    }
    document.getElementById('cookiesPerSecAmount').innerHTML = cookiesPerSec;
    cookie.cookies -= cost;
    amount.innerHTML = Number(amount.innerHTML) + 1;
    prize.innerHTML = newCost;
    updateClicks();

    if (amount.innerHTML == 100) {
      buy(what);
    }

  } else if (Number(amount.innerHTML) >= 100) {
    document.getElementById(what + 'Cookies').innerHTML = "";
    prize.innerHTML = "MAX";
    inform("Max amount of autoclickers reached");
  } else {
    inform("Not enough money");
  }
}

////////// Backgrounds //////////

function buybg(color) {

  var prize = '';
  if (document.getElementById(color + "Prize")) {
    prize = document.getElementById(color + "Prize");
  }
  if (cookie.cookies >= 1000 && prize.innerHTML == "1000 cookies") {
    cookie.cookies -= 1000;
    updateClicks();
    changeBG(color);
    storeBGs(color);
  } else if (cookie.cookies < 1000 && prize.innerHTML == "1000 cookies") {
    inform("Not enough money");
  } else if (prize.innerHTML != "1000 cookies") {
    changeBG(color);
  }
}

function changeBG(color) {
  selectedColor.style.padding = "8px";
  selectedColor.style.height = '24px';
  selectedColor.innerHTML = "";

  var colorButton = document.getElementById(color);
  selectedColor = colorButton;
  colorButton.style.padding = "8px 8px 3px 8px";
  selectedColor.style.height = '';
  colorButton.innerHTML = "<i id='" + color + "Prize' class='material-icons'>check_circle</i>";
  localStorage.selectedColor = color;

  bgcolor = '#e0cdbc';
  switch (color) {
    case 'redColor':
      bgcolor = '#c32020';
      break;
    case 'orangeColor':
      bgcolor = '#d98b2c';
      break;
    case 'yellowColor':
      bgcolor = '#d5d127';
      break;
    case 'greenColor':
      bgcolor = '#20c34f';
      break;
    case 'blueColor':
      bgcolor = '#2066c3';
      break;
    case 'indigoColor':
      bgcolor = '#8620c3';
      break;
    case 'violetColor':
      bgcolor = '#b820c3';
      break;
    default:
      bgcolor = '#e0cdbc';
      break;
  }
  localStorage.bgcolorhex = bgcolor;
  document.body.style.background = bgcolor;
}

function storeBGs(color) {
  switch (color) {
    case 'redColor':
      bgcolorArray[1] = 'true';
      break;
    case 'orangeColor':
      bgcolorArray[2] = 'true';
      break;
    case 'yellowColor':
      bgcolorArray[3] = 'true';
      break;
    case 'greenColor':
      bgcolorArray[4] = 'true';
      break;
    case 'blueColor':
      bgcolorArray[5] = 'true';
      break;
    case 'indigoColor':
      bgcolorArray[6] = 'true';
      break;
    case 'violetColor':
      bgcolorArray[7] = 'true';
      break;
  }
  localStorage.bgcolor = JSON.stringify(bgcolorArray);
}

////////// Inform //////////

function inform(text) {
  if (active == false) {
    active = true;

    var inform = document.getElementById('informDiv');
    var content = document.getElementById('inform');
    content.innerHTML = text;

    if (inform.classList.contains('slide-out')) {
      document.getElementById('informDiv').classList.remove('slide-out');
    }
    document.getElementById('informDiv').classList.add('slide-in');

    setTimeout(function () {
      document.getElementById('informDiv').classList.remove('slide-in');
      document.getElementById('informDiv').classList.add('slide-out');
      active = false;
    }, 4000); // 4 seconds
  }
}