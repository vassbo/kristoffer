/************************************************************************
 * tools
 ***********************************************************************/

// drawing tools
var tools = Object.create(null);

// line tool
// onEnd is for the erase function, which uses it to reset
	// the globalCompositeOperation to source-over
tools.Line = function(event, cx, onEnd) {
  cx.lineCap = 'round';

  // mouse position relative to the canvas
  var pos = relativePos(event, cx.canvas);
  trackDrag(function(event) {
    cx.beginPath();

    // move to current mouse position
    cx.moveTo(pos.x, pos.y);

    // update mouse position
    pos = relativePos(event, cx.canvas);

    // line to updated mouse position
    cx.lineTo(pos.x, pos.y);

    // stroke the line
    cx.stroke();
  }, onEnd);
};

// erase tool
tools.Erase = function(event, cx) {

  // globalCompositeOperation determines how drawing operations
  // on a canvas affect what's already there
  // 'destination-out' makes pixels transparent, 'erasing' them
  // NOTE: this has been deprecated
  cx.globalCompositeOperation = 'destination-out';
  tools.Line(event, cx, function() {
    cx.globalCompositeOperation = 'source-over';
  });
};

// text tool
tools.Text = function(event, cx) {
  var text = prompt('Text:', '');
  if (text) {
    var pos = relativePos(event, cx.canvas);
    // for simplicity, text size is brush size, locked to sans-serif
    var elem = document.getElementById("optionText").children[0];
    var value = elem.options[elem.selectedIndex].value;
    cx.font = Math.max(7, value) + 'px sans-serif';
    cx.fillText(text, pos.x, pos.y);
  }
};

// spray paint tool
tools.Spray = function(event, cx) {
  var radius = cx.lineWidth / 2;
  var area = radius * radius * Math.PI;
  var dotsPerTick = Math.ceil(area / 30);

  var currentPos = relativePos(event, cx.canvas);
  var spray = setInterval(function() {
    for (var i = 0; i < dotsPerTick; i++) {
      var offset = randomPointInRadius(radius);
      cx.fillRect(currentPos.x + offset.x,
                  currentPos.y + offset.y, 1, 1);
    }
  }, 25);
  trackDrag(function(event) {
    currentPos = relativePos(event, cx.canvas);
  }, function() {
    clearInterval(spray);
  });
};

/************************************************************************
 * exercises
 ***********************************************************************/

/**
 * allows the user to click and drag out a rectangle on the canvas
 *
 * @param {Object} event - mousedown event (specifically left button)
 * @param {Object} cx - the canvas 2d context object
 */
tools.Rectangle = function(event, cx) {
  var leftX, rightX, topY, bottomY
  var clientX = event.clientX,
      clientY = event.clientY;

  // placeholder rectangle
  var placeholder = elt('div', {class: 'placeholder'});

  // cache the relative position of mouse x and y on canvas
  var initialPos = relativePos(event, cx.canvas);

  // used for determining correct placeholder position
  var xOffset = clientX - initialPos.x,
      yOffset = clientY - initialPos.y;

  trackDrag(function(event) {
    document.body.appendChild(placeholder);

    var currentPos = relativePos(event, cx.canvas);
    var startX = initialPos.x,
        startY = initialPos.y;

    // assign leftX, rightX, topY and bottomY
    if (startX < currentPos.x) {
      leftX = startX;
      rightX = currentPos.x;
    } else {
      leftX = currentPos.x;
      rightX = startX;
    }

    if (startY < currentPos.y) {
      topY = startY;
      bottomY = currentPos.y;
    } else {
      topY = currentPos.y;
      bottomY = startY;
    }

  	// set the style to reflect current fill
    placeholder.style.background = cx.fillStyle;

  	// set div.style.left to leftX, width to rightX - leftX
    placeholder.style.left = leftX + xOffset + 'px';
    placeholder.style.top = topY + yOffset + 'px';
    placeholder.style.width = rightX - leftX + 'px';
    placeholder.style.height = bottomY - topY + 'px';
  }, function() {

    // add rectangle to canvas with leftX, rightX, topY and bottomY
    cx.fillRect(leftX, topY, rightX - leftX, bottomY - topY);

  	// destroy placeholder
    document.body.removeChild(placeholder);
  });
};

/**
 * allows the user to load the color of a specific pixel
 *
 * @param {Object} event - mousedown event (specifically left button)
 * @param {Object} cx - the canvas 2d context object
 */
// TODO: rewrite with pixel object
tools['PickColor'] = function(event, cx) {
  try {
    var colorPos = relativePos(event, cx.canvas),
        // returns an array [r, g, b, opacity];
        imageData = cx.getImageData(colorPos.x, colorPos.y, 1, 1),
        colorVals = imageData.data,
        color = '';

    // build the color
    color += 'rgb(';

    // only need first three args
    for (var i = 0; i < colorVals.length - 1; i++) {
      color += colorVals[i];

      // only need two commas
      if (i < 2)
        color += ',';
    }
    color += ')';

    cx.fillStyle = color;
    cx.strokeStyle = color;

  } catch(e) {
    if (e instanceof SecurityError)
        alert('Whoops! Looks like you don\'t have permission to do that!');
      else
        throw e;
  }
};

// helpers for flood fill

// iterates over N, S, E and W neighbors and performs a function fn
function forEachNeighbor(point, fn) {
  fn({x: point.x - 1, y: point.y});
  fn({x: point.x + 1, y: point.y});
  fn({x: point.x, y: point.y - 1});
  fn({x: point.x, y: point.y + 1});
}

// checks if 2 points in data, point1 and point2, have the same color
function isSameColor(data, point1, point2) {
  var offset1 = (point1.x + point1.y * data.width) * 4;
  var offset2 = (point2.x + point2.y * data.width) * 4;

  for (var i = 0; i < 4; i++) {
    if (data.data[offset1 + i] != data.data[offset2 + i]) {
      return false;
    }
  }
  return true;
}

// end flood fill helpers

// NOTE: in my first attempt, I was creating Pixel objects and pushing them
// to isPainted instead of Booleans; that wasn't a great idea...
// I suspect there was too much initialization for the browser to handle
// and it choked fatally :(

// I think I would still like to see this done with a Pixel object, if not
// merely for the ability to extend it to done some more advanced things

/**
 * paints all adjacent matching pixels
 */
tools["FloodFill"] = function(event, cx) {
  var imageData = cx.getImageData(0, 0, cx.canvas.width, cx.canvas.height),
      // get sample point at current position, {x: int, y: int}
  		sample = relativePos(event, cx.canvas),
      isPainted = new Array(imageData.width * imageData.height),
      toPaint = [sample];

  // while toPaint.length > 0
  while(toPaint.length) {
    // current point to check
    var current = toPaint.pop(),
        id = current.x + current.y * imageData.width;

    // check if current has already been painted
    if (isPainted[id]) continue;
    else {

      // if it hasn't, paint current and set isPainted to true
      cx.fillRect(current.x, current.y, 1, 1);
      isPainted[id] = true;
    }

    // for every neighbor (new function)
    forEachNeighbor(current, function(neighbor) {
      if (neighbor.x >= 0 && neighbor.x < imageData.width &&
          neighbor.y >= 0 && neighbor.y < imageData.height &&
          isSameColor(imageData, sample, neighbor)) {
        toPaint.push(neighbor);
      }
    });
  }
};
