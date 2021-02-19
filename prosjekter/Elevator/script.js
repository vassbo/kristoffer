
// TODO: styles
// TODO: outside buttons...

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
  0, // G: ground
  -1, // B: basement
  -2 // P: parking
];

// TODO: local storage? ...
var elevator = {
  currentFloor: 0,
  moving: false,
  direction: '', // ⬆ / ⬇ // TODO: REMOVE movingDirection...?
  moveSpeed: 1000, // 10000 // TODO: 12000
  doorSpeed: 1000, // the time it takes for the doors to open/close // 3500
  closingCooldown: 5000, // used when opened generally
  closingCooldownFaster: 3000 // used when a new floor is in the queue
};

var queue = []; // 0


(function initialize() {
  var btns = '';
  for (var i = 0; i < floors.length; i++) {
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

  goToFloor(elevator.currentFloor, true);
})();

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
  return Number(floor);
}







function goToFloor(floor, initialize) {
  console.log(elevatorDoorOffset());
  if (elevatorDoorOffset() !== 0 && Number(floor) !== elevator.currentFloor) { // not closed && request is not on current floor
    var checkDoor = setInterval(function () {
      if (elevatorDoorOffset() == -100) { // is this nessesary????????
        setTimeout(function () {
          // console.log('Closing2');
          elevator_close();
        }, elevator.closingCooldownFaster);
      }
      if (elevatorDoorOffset() == 0) { // closed
        clearInterval(checkDoor);
        moveToFloor(floor);
        elevator_close();
      }
    }, 10);
  } else {
    // sortAsc();
    moveToFloor(getNextFloor(floor), initialize); // queue[0]
  }
}










var floor2 = 0, floorTwo = 0;
function moveToFloor(floor, initialize) {
  elevator.moving = true;
  console.log(floor);
  var top = document.getElementById("outside_buttons" + floor).offsetTop;
  var elevatorHeight = document.getElementById("elevator").offsetHeight;
  var halfElevatorHeight = elevatorHeight / 2;
  var halfDivHeight = document.getElementsByClassName("outside_buttons")[0].offsetHeight / 2;
  document.getElementById("elevatorDiv").style.top = (top - halfElevatorHeight + halfDivHeight) + 'px';

  elevator.direction = getDirection(floor);
  updateScreens(elevator.currentFloor, elevator.direction);

  var trackFloor = setInterval(function () {
    var query = document.querySelectorAll(".outside_buttons");
    for (var i = 0; i < query.length; i++) {
      var elevatorTop = document.getElementById("elevatorDiv").offsetTop;
      floor2 = query[i].getElementsByClassName("floorNum")[0].innerHTML;
      var outsideCenter = query[i].offsetTop + halfDivHeight;
      if (elevator.direction == '⬆' && outsideCenter < (elevatorTop + elevatorHeight) && outsideCenter > (elevatorTop - halfElevatorHeight)) {
        updateScreens(floor2, elevator.direction);
        floorTwo = floor2;
      } else if (elevator.direction == '⬇' && outsideCenter < (elevatorTop + elevatorHeight) && outsideCenter > elevatorTop) {
        updateScreens(floor2, elevator.direction);
        floorTwo = floor2;
      }
      // if (query[i].offsetTop > (top + halfElevatorHeight + halfDivHeight) && query[i].offsetTop < (top - halfElevatorHeight + halfDivHeight)) {
      //   updateScreens(floor, getDirection(floor));
      // }
    }
  }, 20);



  var queueActive = false;
  var next = getNextFloor(toNumber(floorTwo));
  var checkFloor = setInterval(function () {
    // if (elevator.direction == '⬆') { // movingDirection
    //   sortAsc();
    // } else if (elevator.direction == '⬇') { // movingDirection
    //   sortDesc();
    // }
    console.log('------');
    console.log(floor); // 5
    console.log(next); // 4
    if (floor !== next) { // queue[0]
      console.log('ARRIVED!!!!');
      queueActive = true;
      clearInterval(trackFloor);
      clearInterval(checkFloor);
      moveToFloor(next); // goToFloor??  ||  queue[0]
      // removeCurrentFloor();
    }
  }, 10);



  if (initialize === true) {
    clearInterval(trackFloor);
    clearInterval(checkFloor);
    elevatorArrived(floor);
    removeCurrentFloor();
  } else if (floor == elevator.currentFloor) {
    clearInterval(trackFloor);
    clearInterval(checkFloor);
    elevatorArrived(floor);
    elevator_open();
  } else {
    setTimeout(function () {
      if (!queueActive) {
        elevator.currentFloor = Number(floor);
        updateScreens(floor, '');
        clearInterval(trackFloor);
        clearInterval(checkFloor);
        elevatorArrived(floor);
        elevator_open();
        removeCurrentFloor();
        if (queue.length > 0) {
          setTimeout(function () {
            goToFloor(getNextFloor(toNumber(floor2))); // TODO: WIP
          }, 1000); // start go to next action 1 second after arrival
        }
      }
      document.getElementById('debug').querySelector('.queue').innerHTML = queue;
    }, elevator.moveSpeed);
  }
}


function removeCurrentFloor() {
  queue.splice(queue.indexOf(elevator.currentFloor), 1);
}



function getNextFloor(floor) {
  console.log('~~~~~~~~~~~~~~~~~');
  console.log(floor);
  // var i = 0;
  sortAsc();
  document.getElementById('debug').querySelector('.queue').innerHTML = queue;
  // queue.sort();
  var bigger = false;
  var smaller = false;
  var out = floor;
  for (var i = 0; i < queue.length; i++) {
    if (queue[i] >= floor) {
      bigger = queue[i]; // smallest bigger
      break;
    } else if (queue[i] < floor) {
      smaller = queue[i]; // biggest smaller
    }
  }

  console.log(bigger);
  console.log(smaller);

  if (elevator.direction == '⬆') { // movingDirection
    if (bigger !== false) {
      out = bigger;
    } else if (smaller !== false) {
      out = smaller;
      elevator.direction = '⬇'; // movingDirection
    }
  } else if (elevator.direction == '⬇') { // movingDirection
    if (smaller !== false) {
      out = smaller;
    } else if (bigger !== false) {
      out = bigger;
      elevator.direction = '⬆'; // movingDirection
    }
  }

  document.getElementById('debug').querySelector('.nextFloor').innerHTML = out;
  return out;
}











function elevatorArrived(floor) {
  // clearInterval(trackFloor);
  elevator.moving = false;
  document.getElementById(floor).classList.remove("active");
  document.getElementById(floor + 'up').classList.remove("callActive");
  document.getElementById(floor + 'down').classList.remove("callActive");
}



function getDirection(newFloor) {
  newFloor = Number(newFloor);
  elevator.direction = '';
  if (newFloor > elevator.currentFloor) {
    elevator.direction = '⬆';
  } else if (newFloor < elevator.currentFloor) {
    elevator.direction = '⬇';
  }
  document.getElementById('debug').querySelector('.direction').innerHTML = elevator.direction;
  return elevator.direction;
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
  if (elevatorDoorOffset() !== -100 && !elevator.moving) { // 0 = closed, -100 = opened
    document.getElementsByClassName("elevator-door1")[0].classList.add("opened");
    document.getElementsByClassName("elevator-door2")[0].classList.add("opened");
    auto_close();
  }
}
function elevator_close() {
  if (elevatorDoorOffset() == -100 && !elevator.moving) { // 0 = closed, -100 = opened
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
  var timing = elevator.doorSpeed - (Math.abs(elevatorDoorOffset()) / 100 * elevator.doorSpeed);
  timeout = setTimeout(function() {
    elevator_close();
  }, timing + elevator.closingCooldown);
}



// TODO: alarm
var alarm = false;
function bell(id) {
  alarm = true;
  updateScreens(elevator.currentFloor, '<span style="font-size:30px;filter:grayscale(80%);">⚠️</span>');
  // alert...
}


// floor buttons
function floor(id) {
  if (!alarm && !document.getElementById(id).classList.contains("active") && elevator.currentFloor !== id) {
    document.getElementById(id).classList.add("active");
    var query = document.querySelectorAll('.active');
    if (query.length >= 12) {
      for (var i = 0; i < 12; i++) {
        query[i].classList.remove("active");
      }
      queue = [];
    } else {
      queue.push(Number(id));
      console.log(queue);
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
    queue.push(Number(id.replace(/[^0-9-]+/g, '')));
    // queue.push('up2');
    // '2' + 'up2' + 'down2' ....
    goToFloor(id.replace(/[^0-9-]+/g, ''));
  }
}
