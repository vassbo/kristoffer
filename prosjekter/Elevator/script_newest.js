
var currentFloor = 0;
// var floors = [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var floors = [
  9,
  8,
  7,
  6,
  5,
  4,
  3,
  2,
  1,
  0,
  -1,
  -2
];

// G = 0
// B = -1
// P = -2


var queue = [0];


initialize();
function initialize() {
  var btns = '';
  for (var i = 0; i < floors.length; i++) {
    // floors[i]
    var floor = floors[i];
    btns += '<div class="outside_buttons" id="outside_buttons' + floor + '">' +
      '<p class="floorNum">' + getFloorName(floor) + '</p>' +
      '<div style="display:inline-block;">' +
        '<button id="' + floor + 'up" class="metal radial outside" onclick="call(\'up\', this.id)">⬆</button>' +
        '<button id="' + floor + 'down" class="metal radial outside" onclick="call(\'down\', this.id)">⬇</button>' +
      '</div>' +
      '<div class="screen"><p><span class="screenFloor">G</span> <span class="screenDirection">⬆</span></p></div>' + // TODO: screen on load
    '</div>';
  }
  document.getElementById("floorsDiv").innerHTML += btns;

  goToFloor(currentFloor, true);
}

function getFloorName(floor) {
  if (floor == 0) floor = 'G';
  else if (floor == -1) floor = 'B';
  else if (floor == -2) floor = 'P';
  return floor;
}

function toNumber(floor) {
  if (floor == 'G') floor = 0;
  else if (floor == 'B') floor = -1;
  else if (floor == 'P') floor = -2;
  return floor;
}


var moving = false;
function goToFloor(floor, initialize) {
  console.log('floor');
  if (elevatorDoorOffset() !== 0 && Number(floor) !== currentFloor) { // not closed && request is not on current floor
    var checkDoor = setInterval(function () {
      if (elevatorDoorOffset() == -100) {
        setTimeout(function () {
          elevator_close();
        }, 3000);
      }
      if (elevatorDoorOffset() == 0) { // closed
        clearInterval(checkDoor);
        moveToFloor(floor);
        elevator_close();
      }
    }, 10);
  } else {
    // sortAsc();
    moveToFloor(queue[0], initialize);
  }
}


var trackFloor, floor2 = 0;
function moveToFloor(floor, initialize) {
  moving = true;
  var top = document.getElementById("outside_buttons" + floor).offsetTop;
  var elevatorHeight = document.getElementById("elevator").offsetHeight;
  var halfElevatorHeight = elevatorHeight / 2;
  var halfDivHeight = document.getElementsByClassName("outside_buttons")[0].offsetHeight / 2;
  document.getElementById("elevatorDiv").style.top = (top - halfElevatorHeight + halfDivHeight) + 'px';

  direction = getDirection(floor);
  updateScreens(currentFloor, direction);

  trackFloor = setInterval(function () {
    var query = document.querySelectorAll(".outside_buttons");
    for (var i = 0; i < query.length; i++) {
      var elevatorTop = document.getElementById("elevatorDiv").offsetTop;
      floor2 = query[i].getElementsByClassName("floorNum")[0].innerHTML;
      var outsideCenter = query[i].offsetTop + halfDivHeight;
      if (direction == '⬆' && outsideCenter < (elevatorTop + elevatorHeight) && outsideCenter > (elevatorTop - halfElevatorHeight)) {
        updateScreens(floor2, direction);
      } else if (direction == '⬇' && outsideCenter < (elevatorTop + elevatorHeight) && outsideCenter > elevatorTop) {
        updateScreens(floor2, direction);
      }
      // if (query[i].offsetTop > (top + halfElevatorHeight + halfDivHeight) && query[i].offsetTop < (top - halfElevatorHeight + halfDivHeight)) {
        //   updateScreens(floor, getDirection(floor));
        // }
    }
  }, 20);

  startInterval();

  if (initialize === true) {
    elevatorArrived(floor);
    queue.shift();
  } else if (floor == currentFloor) {
    elevatorArrived(floor);
    elevator_open();
  } else {
    setTimeout(function () {
      if (!queueActive) {
        currentFloor = Number(floor);
        updateScreens(floor, '');
        elevatorArrived(floor);
        elevator_open();
        queue.shift();
        if (queue.length > 0) {
          setTimeout(function () {
            goToFloor(queue[0]);
          }, 1000);
        }
      }
    }, 10000); // TODO: 12000
  }
}


var checkFloor = null;
var queueActive = false;
function startInterval() {
  if (checkFloor == null) {
    checkFloor = setInterval(function() {
      console.log('nul');
      var floor = toNumber(floor2);
      var bigger = false, firstBigger;
      var smaller = false, lastSmaller;
      for (var i = 0; i < queue.length; i++) {
        if (queue[i] > floor) {
          bigger = true;
          firstBigger = queue[i];
        } else if (queue[i] < floor) {
          smaller = true;
          lastSmaller = queue[i];
        }
      }

      console.log(floor);

      console.log(firstBigger);

      var direction = getDirection(firstBigger);
      console.log(direction);

      if (direction == '⬆') {
        console.log(queue);
        sortAsc();
        if (!bigger && smaller) i = queue.length - 1;
        if (floor !== firstBigger) {
          console.log(firstBigger);
          moveToFloor(firstBigger);
          queueActive = true;
          if (queue.length < 1) {
            clearInterval(trackFloor);
            clearInterval(checkFloor);
            checkFloor = null;
          }
        }
      } else if (direction == '⬇') {
        sortDesc();
      }

    }, 100);
  }
}



function elevatorArrived(floor) {
  clearInterval(trackFloor);
  // clearInterval(checkFloor);
  // checkFloor = null;
  moving = false;
  document.getElementById(floor).classList.remove("active");
  document.getElementById(floor + 'up').classList.remove("callActive");
  document.getElementById(floor + 'down').classList.remove("callActive");
}



function getDirection(newFloor) {
  newFloor = Number(newFloor);
  direction = '';
  if (newFloor > currentFloor) {
    direction = '⬆';
  } else if (newFloor < currentFloor) {
    direction = '⬇';
  }
  return direction;
}

function updateScreens(floor, direction) {
  floor = getFloorName(floor);
  var query = document.querySelectorAll(".screen");
  for (var i = 0; i < query.length; i++) {
    query[i].getElementsByClassName("screenFloor")[0].innerHTML = floor;
    query[i].getElementsByClassName("screenDirection")[0].innerHTML = direction;
  }
}





function elevator_open() {
  if (elevatorDoorOffset() !== -100 && !moving) { // 0 = closed, -100 = opened
    document.getElementsByClassName("elevator-door1")[0].classList.add("opened");
    document.getElementsByClassName("elevator-door2")[0].classList.add("opened");
    auto_close();
  }
}
function elevator_close() {
  if (elevatorDoorOffset() == -100 && !moving) { // 0 = closed, -100 = opened
    document.getElementsByClassName("elevator-door1")[0].classList.remove("opened");
    document.getElementsByClassName("elevator-door2")[0].classList.remove("opened");
  }
}

function elevatorDoorOffset() {
  return document.getElementsByClassName("elevator-door1")[0].offsetLeft;
}

var timeout;
function auto_close() {
  clearTimeout(timeout);
  var timing = 3500 - (Math.abs(elevatorDoorOffset()) / 100 * 3500);
  timeout = setTimeout(function() {
    elevator_close();
  }, timing + 5000);
}



var alarm = false;
function bell(id) {
  alarm = true;
  updateScreens(currentFloor, '<span style="font-size:30px;filter:grayscale(80%);">⚠️</span>');
  // alert...
}


// floor buttons
function floor(id) {
  if (!alarm && !document.getElementById(id).classList.contains("active") && currentFloor !== id) {
    document.getElementById(id).classList.add("active");
    var query = document.querySelectorAll('.active');
    if (query.length >= 12) {
      for (var i = 0; i < 12; i++) {
        query[i].classList.remove("active");
      }
      queue = [];
    } else {
      queue.push(Number(id));
      // console.log(queue);
      if (queue.length <= 1) goToFloor(id);
    }
  }
}

// selecting 11 of the buttons and clicking alarm will deselect everything...

// TODO: no text selecting...


function sortAsc() {
  queue = queue.sort(function(a, b) {return a-b;});
}
function sortDesc() {
  queue = queue.sort(function(a, b) {return b-a;});
}



// outside buttons
function call(direction, id) {
  if (!alarm) {
    document.getElementById(id).classList.add("callActive");
    goToFloor(id.replace(/[^0-9-]+/g, ''));
  }
}
