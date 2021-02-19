// initialize the app
var appDiv = document.querySelector('#paint-app');
createPaint(appDiv);

cx.canvas.addEventListener('mousedown', function(event) {

  // is the left mouse button being pressed?
  if (event.which == 1) {

    // the event needs to be passed to the method to determine
    // what the mouse is doing and where it is
    var select = document.getElementsByClassName("selected")[0].classList[0];
    tools[select](event, cx);
    // don't select when user is clicking and dragging
    event.preventDefault();
  }
});


cx.lineWidth = 5;


var query = document.querySelectorAll('.tool');
for (var i = 0; i < query.length; i++) {
  query[i].addEventListener('click', toolClicked);
}
function toolClicked() {
  document.getElementsByClassName("selected")[0].classList.remove('selected');
  this.classList.add('selected');
  var query = document.querySelectorAll('.option');
  for (var i = 0; i < query.length; i++) {
    query[i].classList.add('hidden');
  }
  switch (this.classList[0]) {
    case 'Line':
      enable('Color');
      enable('Size');
      break;
    case 'Erase':
      enable('Size');
      enable('ClearAll');
      break;
    case 'Text':
      enable('Color');
      enable('Text');
      break;
    case 'Spray':
      enable('Color');
      enable('Size');
      break;
    case 'Rectangle':
      enable('Color');
      break;
    case 'PickColor':
    case 'FloodFill':
      break;
    case 'Download':
      enable('DownloadPNG');
      enable('DownloadJSON');
      break;
    case 'Upload':
      // enable('UploadPNG');
      // enable('UploadJSON');
      // enable('UploadURL');
      enable('Upload');
      break;
    default:
      enable('Color');
  }
  document.getElementById("optionName").innerHTML = document.getElementsByClassName("selected")[0].classList[0] + ':';
  enable('Name');
}

function enable(id) {
  if (id == 'Size') document.getElementById("sizeName").innerHTML = document.getElementsByClassName("selected")[0].classList[0];
  document.getElementById('option' + id).classList.remove('hidden');
}


var query = document.querySelectorAll('.option');
for (var i = 0; i < query.length; i++) {
  switch (query[i].id.slice(6, query[i].id.length)) {
    case 'Color':
      query[i].addEventListener('change', function(e) {
        // var select = document.getElementsByClassName("selected")[0].innerText;
        cx.fillStyle = e.target.value;
        cx.strokeStyle = e.target.value;
      });
      break;
    case 'Size':
      query[i].addEventListener('change', function(e) {
        // var select = document.getElementsByClassName("selected")[0].innerText;
        cx.lineWidth = e.target.value;
      });
      break;
    case 'ClearAll':
      query[i].addEventListener('click', function(e) {
        if (confirm('Are you sure you want to clear everything?')) {
          var canvas = document.querySelector('canvas');
          cx.clearRect(0, 0, canvas.width, canvas.height);
        }
      });
      break;
    case 'Upload':
      query[i].querySelector('input').addEventListener('change', function(e) {
        var input = e.target;
        if (input.files.length == 0) return;
        var reader = new FileReader();
        reader.addEventListener('load', function() {
          loadImageURL(cx, reader.result);
        });
        reader.readAsDataURL(input.files[0]);
        // console.log(input.files[0]);
      });
      query[i].querySelector('button').addEventListener('click', function(event) {
        event.preventDefault();
        loadImageURL(cx, event.target.closest('div').querySelector('#uploadURL').value);
      });
      break;
  }
}



// download button
var link = document.getElementById("optionDownloadPNG");
function update() {
  try {
    link.href = cx.canvas.toDataURL();
  } catch(e) {
    // some browsers choke on big data URLs

    // also, if the server response doesn't include a header that tells the browser it
    // can be used on other domains, the script won't be able to look at it;
    // this is in order to prevent private information from leaking to a script;
    // pixel data, data URL or otherwise, cannot be extracted from a "tainted canvas"
    // and a SecurityError is thrown
    if (e instanceof SecurityError)
      link.href = 'javascript:alert(' + JSON.stringify('Can\'t save: ' + e.toString()) + ')';
    else
      window.alert("Nope.");
      throw e;
  }
}
link.addEventListener('mouseover', update);
link.addEventListener('focus', update);


/************************************************************************
 * resources
 *
 * Canvas Rendering Context 2D API
 * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
 *
 * Eloquent JavaScript Ch 19, Project: A Paint Program
 * http://eloquentjavascript.net/19_paint.html
 ***********************************************************************/
