
// TODO: no context menu!



// src: https://stackoverflow.com/questions/32061301/chain-of-div-elements-following-a-mouse





function rotate(element, radians) {
  if (!neonPaused) {
    radians += Math.PI / 2;
    var s = 'rotate(' + radians + 'rad)';
    $(element).css('-moz-transform', s)
        .css('-webkit-transform', s)
        .css('-o-transform', s)
        .css('-ms-transform', s);
  }
}

var currentStage = 0,
    currentColor = 'rgb(0, 255, 0)',
    container = $('#neonBoard');

var neonRadius = Math.max(neon.width, neon.height),
    maxDistance = 1.5 * neonRadius,
    frameRate = 60,
    damping = 9 * frameRate / 30,
    width = container.width(),
    height = container.height(),
    border = parseInt(container.css('border-left-width'), 10),
    left = container.offset().left + border,
    top = container.offset().top + border,
    mouse = { x: width / 5, y: height / 5, mouse: true };

function launch() {

  initStage();

}



function initStage() {
  // changeNeon(currentColor);
  container.append(neon.element);


  var stage = stages[currentStage];
  var keys = Object.keys(stage);
  $('#currentStage').text(currentStage);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (key == 'message') {
      var newElem = document.createElement("div");
      newElem.classList.add('message');
      newElem.innerText = stage[key];
      document.body.appendChild(newElem);
    } else if (key == 'start') {
      neon.x = stage[key].x;
      neon.y = stage[key].y;
      console.log(neon);
      
      positionneon();
      follow();
    } else if (key == 'width' || key == 'height') {
      $('#neonBoard').css(key, stage[key]);
      $('#neonBoard').css('position', 'absolute');
      setTimeout(function () {
        window.scrollTo(0, 0);
      }, 200);
      // window.scroll({
      //   top: 0,
      //   left: 0,
      //   behavior: 'smooth'
      // });
    } else if (key == 'startColor') {
      // currentColor = colors[stage[key]];
      changeNeon(colors[stage[key]]);
    } else { ///
      if (key == 'exit') { ///
        stage[key].type = key;
        stage[key].collidable = false;
        createElem(stage[key]);
      } else {
        for (let j = 0; j < stage[key].length; j++) {
          if (stage[key][j].count == undefined) stage[key][j].count = 1;
          for (let k = 0; k < stage[key][j].count; k++) { // TODO: ...
            stage[key][j].collidable = false;
            if (key == 'bars') {
              stage[key][j].type = 'bar';
              stage[key][j].collidable = true;
            } else if (key == 'changers') stage[key][j].type = 'color';
            createElem(stage[key][j]);
            if (stage[key][j].direction == 'vertical') stage[key][j].y += getNumber(bar.width);
            else stage[key][j].x += getNumber(bar.width);
          }
        }
      }
    }
  }
}
// TODO: move this...
function getNumber(string) {
  return Number(string.replace(/\D+/g, ''));
}

function positionneon() {
  $(neon.element).css({ left: neon.x - neon.width / 2,
      top: neon.y - neon.height / 2 });
  rotate(neon.element, neon.angle);
}

function changeNeon(color) {
  var neonElem = $('#neon');
  if ($('#neon') == undefined) neonElem = neonElem.element;
  $(neonElem).css('border-bottom-color', color);
  $(neonElem).css('filter', 'drop-shadow(0 0 10px ' + color + ')');
  if ($(neonElem).css('border-bottom-color') !== undefined) currentColor = $(neonElem).css('border-bottom-color');
  $('#currentColor').text(currentColor);
  setTimeout(function () {
    changeOpactiy();
  }, 10);
}

function changeOpactiy() {
  var collidables = $('.collidable');
  for (var i = 0; i < collidables.length; i++) {
    if (collidables[i].style.background == currentColor) {
      collidables[i].style.opacity = '0.3';
      collidables[i].style.boxShadow = 'none';
    } else {
      collidables[i].style.opacity = null;
      collidables[i].style.boxShadow = collidables[i].style.background + '0px 0px 10px 1px';
      // collidables[i].style.boxShadow = 'initial';
    }
  }
}



// var gamePaused = false; // TODO: this <--

var collided = 0;
function follow() {
  function update() {    
    var dx = mouse.x - neon.x,
        dy = mouse.y - neon.y,
        dd = Math.hypot(dx, dy),
        angle = neon.angle = Math.atan2(dy, dx),
        direction = (dd < neonRadius ? -1 : 1);
    if (dd - neonRadius < 0.5) {
      rotate(neon.element, neon.angle);
      return;
    }
    $('#neonX').text($('#neon')[0].offsetLeft);
    $('#neonY').text($('#neon')[0].offsetTop);
    if (collided >= 20) collided = 0; 
    var collide = neonColliding();
    // checkColorChanger();
    var colorCollide = checkElemCollide($('.colorChanger'));
    if (colorCollide !== false) {
      $('#neon')[0].style.borderBottomColor = colorCollide.style.background;
      changeNeon(colorCollide.style.background);
      colorCollide.style.transform = 'scale(1.5)';
      setTimeout(function () {
        colorCollide.style.transform = null;
      }, 300);
    }
    var length = 30;
    if (collide !== false || collided > 0) {
      // TODO: better colliding
      // var dx = mouse.x + neon.x,
      //     dy = mouse.y + neon.y,
      //     dd = Math.hypot(dx, dy),
      //     angle = neon.angle = Math.atan2(dy, dx),
      //     direction = (dd < neonRadius ? 1 : -1);
      if (collide == 'top') {
        neon.y -= length;
        // neon.y += direction * Math.sin(angle) * dd / damping;
      } else if (collide == 'bottom') {
        neon.y += length;
        // neon.y += direction * Math.sin(angle) * dd / damping;
      } else if (collide == 'left') {
        neon.x -= length;
        // neon.x += direction * Math.cos(angle) * dd / damping;
      } else if (collide == 'right') {
        neon.x += length;
        // neon.x += direction * Math.cos(angle) * dd / damping;
      }
      
      positionneon();
      collided++;
      // console.log(collided);
      return;
    }
    // console.log(direction);
    // console.log(angle);
    // console.log(dd);
    // console.log(damping);
    // TODO: moving at the start....
    
    neon.x += direction * Math.cos(angle) * dd / damping;
    neon.y += direction * Math.sin(angle) * dd / damping;
    // console.log(neon);
    
    positionneon();

    if (checkElemCollide($('#exit')) && !neonPaused) {
      console.log('exit');
      neonPaused = true; // TODO: unpause...
      // slide neon to center of exit
      // transform scale...
      let count = 0;
      // transition top & left
      var posInterval = setInterval(() => {
        neon.x = $('#exit').offset().left + $('#exit').innerWidth() / 2;
        neon.y = $('#exit').offset().top + $('#exit').innerHeight() / 2;
        count++;
        if (count > 100) clearInterval('posInterval');
      }, 100);
      positionneon(); // TODO: not doing anything???
      $('#neon').css('transition', '.8s transform');
      $('#neon').css('transform', 'scale(4)');
      setTimeout(() => {
        $('#neon').css('transition', '');
      }, 1000);
      // move camera??..
      // shrink exit + neon... / stretch exit horisontal??
      // ....
      // next lvl + store in localstorage + (create localstorage var...)
    }
  }
  update();
  // TODO: fade in neon
  window.setTimeout(function() {
    neon.moveInterval = window.setInterval(update, 1000 / frameRate);
  }, 1000)
}



var prevCollision = true;
function neonColliding() {
  var neonTop = $('#neon')[0].offsetTop,
      neonLeft = $('#neon')[0].offsetLeft,
      collisionElems = $('.collidable'),
      collision = false;
  for (var i = 0; i < collisionElems.length; i++) {
    var elemTop = collisionElems[i].offsetTop,
        elemLeft = collisionElems[i].offsetLeft,
        elemHeight = collisionElems[i].offsetHeight,
        elemWidth = collisionElems[i].offsetWidth,
        elemBottom = elemTop + elemHeight,
        elemRight = elemLeft + elemWidth,
        elemColor = collisionElems[i].style.background;
    if (currentColor !== elemColor) {
      if (neonTop + neon.height > elemTop && neonTop < elemBottom && neonLeft + neon.width > elemLeft && neonLeft < elemRight) {
        collision = prevCollision;
        // 296 + 30 > 297 && 296 + 30 < 297 - 20 / 3
        // 326 > 297 && 326 < 290,3

        // 323 > 325 -
        // console.log('-------------');
        // console.log((neonTop < elemBottom).toString() + ' + && + ' + (neonTop > elemBottom - elemHeight / 3).toString());
        // console.log(neonTop + '>' + elemBottom + '-' + elemHeight / 3);
        if (neonTop + neon.height > elemTop && neonTop + neon.height < elemTop + elemHeight / 3) collision = 'top';
        else if (neonTop < elemBottom && neonTop > elemBottom - elemHeight / 3) collision = 'bottom';
        else if (neonLeft + neon.width > elemLeft && neonLeft + neon.width < elemLeft + elemWidth / 3) collision = 'left';
        else if (neonLeft < elemRight && neonLeft > elemLeft + elemWidth / 3) collision = 'right';
        if (collision !== true) prevCollision = collision;
        if (collision == true) collision = prevCollision;
        // console.log('NEON TOP: ' + (neonTop + neon.height));
        // console.log('ELEM TOP: ' + elemTop);
        console.log(collision);
        break;
      }
    }
  }
  return collision;
}

function checkElemCollide(elem) {
  var neonTop = $('#neon')[0].offsetTop,
      neonLeft = $('#neon')[0].offsetLeft,
      collided = false;
  for (var i = 0; i < elem.length; i++) {
    var elemTop = elem[i].offsetTop,
        elemLeft = elem[i].offsetLeft,
        elemHeight = elem[i].offsetHeight,
        elemWidth = elem[i].offsetWidth,
        elemBottom = elemTop + elemHeight,
        elemRight = elemLeft + elemWidth,
        elemColor = elem[i].style.background;
    if (currentColor !== elemColor) {
      if (neonTop + neon.height > elemTop && neonTop < elemBottom && neonLeft + neon.width > elemLeft && neonLeft < elemRight) {
        collided = elem[i];
        break;
      }
    }
  }
  return collided;
}



function createElem(object) {
  var newElem = document.createElement("div");
  if (object.type == 'bar') {
    if (object.direction == 'vertical') {
      newElem.style.width = bar.height;
      newElem.style.height = bar.width;
    } else if (object.direction == 'horizontal') {
      newElem.style.width = bar.width;
      newElem.style.height = bar.height;
    }
    newElem.classList.add(object.type);
    newElem.classList.add(object.color);
    newElem.style.boxShadow = '0 0 10px 1px ' + colors[object.color];
  } else if (object.type == 'color') {
    newElem.style.width = '30px';
    newElem.style.height = '30px';
    newElem.classList.add('colorChanger');
    newElem.classList.add(object.color);
    newElem.style.boxShadow = '0 0 10px 1px ' + colors[object.color];
  } else if (object.type == 'exit') {
    newElem.id = object.type;
  }
  if (object.collidable) newElem.classList.add('collidable');
  newElem.style.background = colors[object.color];
  newElem.style.position = 'absolute';
  var styleWidth = newElem.style.width.replace(/\D+/g, '');
  var styleHeight = newElem.style.height.replace(/\D+/g, '');
  newElem.style.left = object.x - styleWidth / 2 + 'px';
  newElem.style.top = object.y - styleHeight / 2 + 'px';
  document.body.appendChild(newElem);
}


// TODO: page bars overfow no scroll

var neonPaused = false;
var mouseX = 0,
    mouseY = 0,
    pageScrollX = 0,
    pageScrollY = 0,
    scrollInterval = null;
function mouseUpdate(event) {
  if (!neonPaused) {
    event = event || window.event;
    // TODO:
    mouse.x = event.pageX - left;
    mouse.y = event.pageY - container.offset().top + border; // TODO: ??????
    // console.log(event.pageY);
    // console.log(container.offset().top + border);
    // console.log(left);
    mouseX = mouse.x;
    mouseY = mouse.y;
    var pagePiece = 5; // 1/8
    var scrollSpeed = 6; // 6

    if (mouseX - window.scrollX > window.innerWidth - window.innerWidth / pagePiece && neon.x - window.scrollX > window.innerWidth - window.innerWidth / 2) {
      pageScrollX = scrollSpeed;
    } else if (mouseX - window.scrollX < window.innerWidth / pagePiece && neon.x - window.scrollX < window.innerWidth / 2) {
      pageScrollX = scrollSpeed * -1;
    } else {
      pageScrollX = 0;
    }
    $('#mouseX').text((mouseX - window.scrollX).toFixed());
    $('#mouseY').text((mouseY - window.scrollY).toFixed());

    // console.log(neon.y - window.scrollY); // 248.5
    // console.log(window.innerHeight - window.innerHeight / 2); // 219
    // console.log(page);
    // TODO: bugged when colliding and scrolling on the y access..
    // not updating neon pos....
    
    if (mouseY - window.scrollY > window.innerHeight - window.innerHeight / pagePiece && neon.y - window.scrollY > window.innerHeight - window.innerHeight / 2) {
      pageScrollY = scrollSpeed;
    } else if (mouseY - window.scrollY < window.innerHeight / pagePiece && neon.y - window.scrollY < window.innerHeight / 2) {
      pageScrollY = scrollSpeed * -1;
    } else {
      pageScrollY = 0;
    }
    if (pageScrollX !== 0 || pageScrollY !== 0) {
      startScrollInterval();
    } else {
      clearInterval(scrollInterval);
      scrollInterval = null;
    }
    // if (neonPaused) {
    //   console.log(currentColor);
    //   changeNeon(currentColor);
    //   neonPaused = false;
    // }
  // } else {
  //   $(neon.element).css('border-bottom-color', '#ff0000');
  //   $(neon.element).css('filter', 'drop-shadow(0 0 10px #ff0000)');
  //   neonPaused = true;
  }
}
container.mousemove(mouseUpdate);
// var ctrl = false;
document.addEventListener('keydown', function(e) {
  if (e.ctrlKey && !neonPaused) {    
    $(neon.element).css('border-bottom-color', '#ff0000');
    $(neon.element).css('filter', 'drop-shadow(0 0 10px #ff0000)');
    neonPaused = true;
  }
});
document.addEventListener('keyup', function(e) {
  if (neonPaused && !e.ctrlKey) {
    if (!checkElemCollide($('#exit'))) {
      changeNeon(currentColor);
      neonPaused = false;
      // mouseUpdate(e); // this will not work because it don't have mouse pos
    }
  }
});

function startScrollInterval() {
  if (scrollInterval == null) {
    scrollInterval = setInterval(function() {
      if (!neonPaused) {
        window.scrollBy(pageScrollX, pageScrollY);
        $('#scrollX').text(window.scrollX.toFixed());
        $('#scrollY').text(window.scrollY.toFixed());
        // console.log(mouse.x);
        // console.log($('#neonBoard').css('height').replace(/\D+/g, ''));
        if (mouse.x < $('#neonBoard').css('width').replace(/\D+/g, '') - window.innerWidth / 8 && mouse.x > 0 + window.innerWidth / 8) {
          mouse.x += pageScrollX;
        }
        if (mouse.y < $('#neonBoard').css('height').replace(/\D+/g, '') - window.innerHeight / 8 && mouse.y > 0 + window.innerHeight / 8) {
          mouse.y += pageScrollY;
        }
      }
    }, 10);
  }
}




// function launch() {
//   initneons($('#neonBoard'));
// }

$(document).ready(launch);

// $(window).resize(function() {
//   $('.neonSegment').remove();
//   launch();
// });
