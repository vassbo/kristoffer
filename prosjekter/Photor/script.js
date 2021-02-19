
//---------- MADE BY KRISTOFFER VASSBØ IN 2019 ----------//

var d = document;

//---------- ON LOAD ----------//

function onStart() {

  var image = d.getElementById("mainImage");

  var screenHeight = window.screen.availHeight;
  var imageWidth = image.naturalWidth;
  var imageHeight = image.naturalHeight;
  var aspectRatio = imageWidth / imageHeight;

  if (aspectRatio > 1.7) {
    image.style.width = "82vw";
    image.style.height = "auto";

    // vertical align middle:
    // var margin = imageHeight/2 - screenHeight/2;
    // var margin = screenHeight/6;
    // var margin = screenHeight / aspectRatio*2;
    // var margin = screenHeight / 2;
    // getImage.style.marginTop = "-" + margin + "vh";
  } else {
    image.style.width = "auto";
    image.style.height = "97vh";
  }
  input("id");
}

//---------- MENU BUTTONS ----------//

// var active;
var activeMenu = "";
function button(id) {
  d.getElementsByClassName('footerText')[0].innerHTML = '<u>&copy Kristoffer Vassbø 2019</u>';

  // remove "Btn"
  var currentName = id.slice(0, -3);
  // clicked button id classes
  var current = d.getElementById(currentName).classList;
  var upperCurrentName = currentName.charAt(0).toUpperCase() + currentName.slice(1);
  var title = d.getElementById("title");
  // main menu buttons
  var mainMenu = d.getElementById("main").classList;
  // small buttons
  var back = d.getElementById("back").classList;
  var settings = d.getElementById("settingsBtn").classList;

  // for the text border:
  var i = 0;
  var textDiv = d.getElementsByClassName("textOnImageDiv");
  if (id == "backBtn") {

    title.innerHTML = "Photor";
    // show
    mainMenu.remove("hidden");
    settings.remove("hidden");
    // hide
    d.getElementById(activeMenu).classList.add("hidden");
    back.add("hidden");

    // text border
    if (activeMenu == "text" && textDiv[0]) {
      while (i < numberOfText) {
        textDiv[i].style.border = "none";
        textDiv[i].style.padding = "1px";
        i++;
      }
    }

  } else if (id == "aboutSet") {
    if (activeMenu == "") {
      button("aboutBtn");
    } else {
      button("backBtn");
      button("aboutBtn");
    }
    d.getElementsByClassName('footerText')[0].innerHTML = 'Made with ❤ by Kristoffer';
  } else {

    title.innerHTML = upperCurrentName;
    activeMenu = currentName;
    // show
    current.remove("hidden");
    back.remove("hidden");
    // hide
    mainMenu.add("hidden");
    settings.add("hidden");

    // text border
    if (id == "textBtn" && textDiv[0]) {
      while (i < numberOfText) {
          textDiv[i].style.border = "1px dashed red";
          textDiv[i].style.padding = "0px";
          i++;
      }
    }

  }
}

//---------- VALUES ----------//

/* set default values */
var sliders = [
  "brightness",
  "contrast",
  "hue-rotate",
  "saturate",
  "grayscale",
  "sepia",
  "opacity",
  "blur",
  "invert"
];
var l = sliders.length;

// Was replaced with defaultValue.
// var values = [ "100", "100", "0", "100", "0", "0", "100", "0" ];

// these values will change locally when a value is changed. (might want to be stored in the browser!?)
var currentValues = [ "100", "100", "0", "100", "0", "0", "100", "0", "0" ];

//---------- LOCAL STORAGE ----------//

// var currentValues;
// if (localStorage.currentValues) {
//   currentValues2 = localStorage.currentValues;
//   currentValues = currentValues2;
// } else {
//   currentValues = localStorage.currentValues = [ "100", "100", "0", "100", "0", "0", "100", "0" ];
// }
// currentValues = localStorage.currentValues = [ "100", "100", "0", "100", "0", "0", "100", "0" ];
// alert(currentValues);
// var currentValues;

// // localStorage.removeItem("currentValues");
// local();
// function local() {
//   // var values = localStorage.setItem("currentValues", currentValues);
//   // alert(values);
//   // alert(currentValues);
//
//   if (typeof(Storage) !== "undefined") {
//     if (localStorage.currentValues) {
//       // currentValues = [ "100", "100", "0", "100", "0", "0", "100", "0" ];
//       localStorage.currentValues = currentValues;
//       // currentValues2 = localStorage.currentValues;
//       // currentValues = currentValues2;
//       // alert(currentValues[0]);
//     } else {
//       currentValues = localStorage.currentValues = [ "100", "100", "0", "100", "0", "0", "100", "0" ];
//       // currentValues = localStorage.currentValues;
//       alert("k");
//     }
//     // alert("You have clicked the button " + localStorage.currentValues + " time(s).");
//     // alert(localStorage.currentValues);
//     // alert(currentValues);
//   } else {
//     alert("Sorry, your browser does not support web storage...");
//   }
// }

// // currentValues = [ "100", "100", "0", "100", "0", "0", "100", "0" ];

// // Check browser support
// if (typeof(Storage) !== "undefined") {
//   var getLocal = localStorage.getItem("currentValues");
//   // Store
//   if (localStorage.currentValues) {
//     currentValues = [ "100", "100", "0", "100", "0", "0", "100", "0" ];
//     localStorage.setItem("currentValues", currentValues);
//     // currentValues = getLocal;
//     // alert("stored");
//   } else {
//     currentValues = [ "100", "100", "0", "100", "0", "0", "100", "0" ];
//     var loc = localStorage.setItem("currentValues", currentValues);
//     currentValues = getLocal;
//     alert(loc);
//     // alert(currentValues);
//     // localStorage.removeItem("currentValues");
//     // alert("got");
//   }
//
//   // Retrieve
//   // document.getElementById("result").innerHTML = localStorage.getItem("currentValues");
// } else {
//   var currentValues = [ "100", "100", "0", "100", "0", "0", "100", "0" ];
//   alert("Sorry, your browser does not support Web Storage...");
// }



// function clickCounter() {
//   if (typeof(Storage) !== "undefined") {
//     if (localStorage.currentValues) {
//       localStorage.currentValues = Number(localStorage.currentValues)+1;
//     } else {
//       localStorage.currentValues = 1;
//     }
//     alert("You have clicked the button " + localStorage.currentValues + " time(s).");
//   } else {
//     alert("Sorry, your browser does not support web storage...");
//   }
// }




//---------- INPUTS ----------//

// execute on load, reset, shuffle, slider change or input change
var inverted = false;
function input(id) {

  var activeFilters = "";
  var i = 0;
  var type = id.substr(-5);

  var currentName;
  var currentInput;
  var currentSlider;

  if (type == "Input") {
    while (i < l) {

      currentName = sliders[i];
      currentInput = d.getElementById(currentName + "Input").value;
      currentSlider = d.getElementById(currentName + "Slider");

      if (currentInput !== "") {
        currentSlider.value = currentInput;
      }
      i++;
    }
    // TODO: This wont get executed why? (Input change wont affect image)
    input("id");
  } else {
    while (i < l) {

      var activeName;
      currentName = sliders[i];
      currentSlider = d.getElementById(currentName + "Slider").value;
      currentInput = d.getElementById(currentName + "Input");
      var currentInputUnit = d.getElementById(currentName + "InputUnit");
      // update the local values
      currentValues[i] = currentSlider;

      if (currentName == "hue-rotate") { // for degrees
        activeName = currentName + "(" + currentSlider + "deg)";
        currentInput.value = currentSlider;
        currentInputUnit.value = "°";
      } else if (currentName == "blur") { // for pixels
        activeName = currentName + "(" + currentSlider + "px)";
        currentInput.value = currentSlider;
        currentInputUnit.value = "px";
      } else if (currentName == "invert") { // for invert only
        if (inverted == false && id == "invertSlider") {
          activeName = "invert(1)";
          inverted = true;
        } else if (inverted == true && id !== "invertSlider") {
          activeName = "invert(1)";
        } else {
          activeName = "invert(0)";
          inverted = false;
        }
      } else { // for percentage
        activeName = currentName + "(" + currentSlider + "%)";
        currentInput.value = currentSlider;
        currentInputUnit.value = "%";
      }
      activeFilters = activeFilters + activeName;
      i++;
    }
    // local(); // local storage
    d.getElementById("mainImage").style.filter = activeFilters;
  }
}

var activeRotate = 'rotateZ(0deg) rotateY(0deg) rotateX(0deg)';
function rotate(id) {

  var type = id.slice(7);
  var activeValues;

  var rotateXS = d.getElementById("rotateXSlider");
  var rotateYS = d.getElementById("rotateYSlider");
  var rotateZS = d.getElementById("rotateZSlider");
  var rotateXI = d.getElementById("rotateXInput");
  var rotateYI = d.getElementById("rotateYInput");
  var rotateZI = d.getElementById("rotateZInput");

  if (type == "Input") {
    activeValues = 'rotateZ(' + rotateZI.value + 'deg)' + 'rotateY(' + rotateYI.value + 'deg)' + 'rotateX(' + rotateXI.value + 'deg)';
    rotateXS.value = rotateXI.value;
    rotateYS.value = rotateYI.value;
    rotateZS.value = rotateZI.value;
  } else {
    activeValues = 'rotateZ(' + rotateZS.value + 'deg)' + 'rotateY(' + rotateYS.value + 'deg)' + 'rotateX(' + rotateXS.value + 'deg)';
    rotateXI.value = rotateXS.value;
    rotateYI.value = rotateYS.value;
    rotateZI.value = rotateZS.value;
  }
  activeRotate = activeValues;
  zoomScale();
}

var scaleX = 1;
var scaleY = 1;
var activeZoom = 'scale(1, 1)';
function zoom(id) {

  var ratio = d.getElementById("zoomRatio").checked;

  var type = id.substr(-5);
  var xy = id.slice(4).charAt(0);

  var zoomXS = d.getElementById("zoomXSlider");
  var zoomXI = d.getElementById("zoomXInput");
  var zoomYS = d.getElementById("zoomYSlider");
  var zoomYI = d.getElementById("zoomYInput");

  if (type == "Input") {
    if (xy == "X" && ratio == true) {
      scaleX = zoomXI.value;
      zoomXS.value = scaleX;

      scaleY = scaleX;
      zoomYS.value = scaleX;
      zoomYI.value = scaleX;
    } else if (xy == "X" && ratio == false) {
      scaleX = zoomXI.value;
      zoomXS.value = scaleX;
    } else if (xy == "Y" && ratio == true) {
      scaleY = zoomYI.value;
      zoomYS.value = scaleY;

      scaleX = scaleY;
      zoomXS.value = scaleY;
      zoomXI.value = scaleX;
    } else if (xy == "Y" && ratio == false) {
      scaleY = zoomYI.value;
      zoomYS.value = scaleY;
    }
  } else {
    if (xy == "X" && ratio == true) {
      scaleX = zoomXS.value;
      zoomXI.value = scaleX;

      scaleY = scaleX;
      zoomYI.value = scaleX;
      zoomYS.value = scaleX;
    } else if (xy == "X" && ratio == false) {
      scaleX = zoomXS.value;
      zoomXI.value = scaleX;
    } else if (xy == "Y" && ratio == true) {
      scaleY = zoomYS.value;
      zoomYI.value = scaleY;

      scaleX = scaleY;
      zoomXI.value = scaleY;
      zoomXS.value = scaleX;
    } else if (xy == "Y" && ratio == false) {
      scaleY = zoomYS.value;
      zoomYI.value = scaleY;
    }
  }
  activeZoom = 'scale(' + scaleX + ', ' + scaleY + ')';
  zoomScale();
}

function zoomScale() {
  image.style.transform = activeZoom + activeRotate;
}

//---------- TEXT ----------//

/* set default text values */
var textSliders = [
  "RedSlider",
  "GreenSlider",
  "BlueSlider",
  "OpacitySlider",
  "SizeSlider",
  "Bold",
  "Italic",
  "Underline",
  "LineThrough"
];
var currentTextValues = [ "255", "255", "255", "100", "16", "normal", "normal", "none", "none" ];
var ctv = currentTextValues;
var tl = textSliders.length;

function text(id) {
  var type = id.slice(4);
  // alert(type);
  var txt = d.getElementById("textInput");
  var hex = d.getElementById("hexInput");
  var currentS = d.getElementById(id).value;
  var inputId = id.slice(0, -6) + "Input";
  var currentI = d.getElementById(inputId);
  var i = 0;

  while (i < tl) {
    if (textSliders[i] == type) {
      if (i > 4) {
        var check = d.getElementById(id).checked;
        if (check == true) {
          if (i == 5) {
            ctv[i] = "bold";
          } else if (i == 6) {
            ctv[i] = "italic";
          } else if (i == 7) {
            ctv[i] = "underline";
          } else if (i == 8) {
            ctv[i] = "line-through";
          }
          d.getElementsByClassName("formats")[i-5].style.color = "white";
        } else {
          if (i == 5 || i == 6) {
            ctv[i] = "normal";
          } else if (i == 7 || i == 8) {
            ctv[i] = "none";
          }
          d.getElementsByClassName("formats")[i-5].style.color = "rgba(255, 255, 255, 0.3)";
        }
      } else {
        ctv[i] = currentS;
        currentI.value = currentS;
      }
    } else if (type == "RotateSlider") {
      currentI.value = currentS;
    }
    i++;
  }

  txt.style.color = 'rgba(' + ctv[0] + ', ' + ctv[1] + ', ' + ctv[2] + ', ' + ctv[3] / 100 + ')';
  txt.style.borderColor = 'rgb(' + ctv[0] + ', ' + ctv[1] + ', ' + ctv[2] + ')';
  hex.value = rgbToHex(Number(ctv[0]), Number(ctv[1]), Number(ctv[2]));
  txt.style.fontSize = ctv[4] + "px";
  txt.style.fontWeight = ctv[5];
  txt.style.fontStyle = ctv[6];

  txt.style.transform = 'rotateZ(' + d.getElementById("textRotateSlider").value + 'deg';

  var n = "none";
  if (ctv[7] !== n && ctv[8] == n) {
    txt.style.textDecoration = ctv[7];
  } else if (ctv[7] == n && ctv[8] !== n) {
    txt.style.textDecoration = ctv[8];
  } else if (ctv[7] !== n && ctv[8] !== n) {
    txt.style.textDecoration = ctv[7] + " " + ctv[8];
  } else if (ctv[7] == n && ctv[8] == n) {
    txt.style.textDecoration = n;
  }
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
function hexToRgb(hex) {
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    d.getElementById("textRedSlider").value = r;
    text("textRedSlider");
    d.getElementById("textGreenSlider").value = g;
    text("textGreenSlider");
    d.getElementById("textBlueSlider").value = b;
    text("textBlueSlider");

    return r + "," + g + "," + b;
}

function textInput(id) {
  var currentI = d.getElementById(id).value;
  var silderId = id.slice(0, -5) + "Slider";
  var currentS = d.getElementById(silderId);
  var i = 0;


  if (id == "hexInput") {
    if (currentI.charAt(0) == "#") {
      hexToRgb(currentI.slice(1));
    } else {
      hexToRgb(currentI);
      // sliderId = "textRedSlider";
    }
    // alert(currentI);
    // alert(hexToRgb(r));
  } else if (id == "textRotateInput") {
    currentS.value = currentI;
    text("textRotateSlider");
  } else {
    while (i < tl-4) {
      if (textSliders[i] == silderId.slice(4)) {
        currentS.value = currentI;
      }
      i++;
    }
    text(silderId);
  }
}

var numberOfText = 1;
function addText() {
  if (d.getElementById("textInput").value !== "") {

  var textDiv = d.createElement("div");
  textDiv.setAttribute('class', 'textOnImageDiv');
  textDiv.setAttribute('id', 'textDiv' + numberOfText);
  textDiv.style.border = "1px dashed red";
  d.getElementById("image").appendChild(textDiv);

  var text = d.createElement("p");
  text.innerText = d.getElementById("textInput").value;
  text.setAttribute('class', 'textOnImage');
  d.getElementById("textDiv" + numberOfText).appendChild(text);

  // for updating the position
  zoom("zoomXSlider");

  // Make the DIV element draggable:
  dragElement(document.getElementById('textDiv' + numberOfText));

  numberOfText++;

  text.style.color = 'rgba(' + ctv[0] + ', ' + ctv[1] + ', ' + ctv[2] + ', ' + ctv[3] / 100 + ')';
  text.style.fontSize = ctv[4] + "px";
  text.style.fontWeight = ctv[5];
  text.style.fontStyle = ctv[6];

  text.style.transform = 'rotateZ(' + d.getElementById("textRotateSlider").value + 'deg';

  var n = "none";
  if (ctv[7] !== n && ctv[8] == n) {
    text.style.textDecoration = ctv[7];
  } else if (ctv[7] == n && ctv[8] !== n) {
    text.style.textDecoration = ctv[8];
  } else if (ctv[7] !== n && ctv[8] !== n) {
    text.style.textDecoration = ctv[7] + " " + ctv[8];
  } else if (ctv[7] == n && ctv[8] == n) {
    text.style.textDecoration = n;
  }
  // alert(1);
}
}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById('textDiv' + numberOfText)) {
    // if present, the header is where you move the DIV from:
    document.getElementById('textDiv' + numberOfText).onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}


//---------- UPLOAD ----------//
// TODO: Loading animation.

var storedImages = ['https://stmed.net/sites/default/files/night-sky-wallpapers-30833-9599712.jpg'];
var imgNumber = 1;
function addImage() {
  var add = document.getElementById("urlInput").value;
  if (add !== "") {
    appendImg(add);
  } else {
    alert("No URL!");
  }
}

var loadImage = function(event) {
  // var file = new FileReader();
  // file.readAsDataURL(document.getElementById("files").files[0]);
  // file.onload = function(file) {
  // document.getElementById("mainImage").src = file.target.result;

  var url = URL.createObjectURL(event.target.files[0]);
  var output = d.getElementById('mainImage').src = url;

  appendImg(url);
};

function appendImg(src) {
  d.getElementById('mainImage').setAttribute('src', src);

  var img = d.createElement("img");
  img.setAttribute('onclick', 'loadImg(this.id)');
  img.setAttribute('class', 'menuImage');
  img.setAttribute('id', 'img' + imgNumber);
  img.setAttribute('src', src);
  img.setAttribute('alt', 'Image not found!');

  storedImages.push(src);
  imgNumber++;

  d.getElementsByClassName("menuImg")[0].appendChild(img);
}

// execute when the small preview image is clicked
function loadImg(id) {
  d.getElementById('mainImage').src = storedImages[id.slice(3)];
}

function loadImages(src) {
  d.getElementById('mainImage').setAttribute('src', src);
}


//---------- EXPORT ----------//

// convert image to base64 javascript url

function download() {
  var name = d.getElementById('fileNameInput').value;
  var node = document.getElementById('image');
  // getBase64FromImage(document.getElementById('mainImage').src);
  // url();
  // var node = document.getElementById('image'); // to get (rotation, size and) text

  if (name !== "") {
    node.style.marginLeft = '0px';
    image.style.transform = 'none';

    // alert(node.style.width);
    // alert(d.getElementById("mainImage").naturalWidth);
    // node.style.width = d.getElementById("mainImage").naturalWidth + "px";


    domtoimage.toPng(node).then(function (dataUrl) {
      // var img = new Image();
      // img.src = dataUrl;
      // document.body.appendChild(img);

      var download = document.createElement('a');
      download.href = dataUrl;
      download.download = name + '.' + dataUrl.charAt(11) + dataUrl.charAt(12) + dataUrl.charAt(13);
      download.click();


      node.style.marginLeft = '250px';
      rotate('rotateXSlider');
    })
    .catch(function (error) {
      console.error('Oops, something went wrong!', error);
    });
  } else {
    alert("File name can't be empty!");
  }
}

// function url() {
//   var url = document.getElementById('mainImage').src;
//   // alert(url);
//   var xmlHTTP = new XMLHttpRequest();
//   // var xmlHTTP = xhr.XMLHttpRequest();
//   xmlHTTP.open('GET', url, true);
//   // alert(xmlHTTP);
//   xmlHTTP.responseType = 'arraybuffer';
//   xmlHTTP.onload = function(e) {
//     var arr = new Uint8Array(this.response);
//     alert(arr);
//     var raw = String.fromCharCode.apply(null,arr);
//     var b64 = base64.encode(raw);
//     var dataURL="data:image/png;base64," + b64;
//     alert(dataURL);
//   };
//   xmlHTTP.send();
// }

// function getBase64FromImage(url, onSuccess, onError) {
//     var xhr = new XMLHttpRequest();
//
//     xhr.responseType = "arraybuffer";
//     xhr.open("GET", url);
//
//     xhr.onload = function () {
//         var base64, binary, bytes, mediaType;
//
//         bytes = new Uint8Array(xhr.response);
//         //NOTE String.fromCharCode.apply(String, ...
//         //may cause "Maximum call stack size exceeded"
//         binary = [].map.call(bytes, function (byte) {
//             return String.fromCharCode(byte);
//         }).join('');
//         mediaType = xhr.getResponseHeader('content-type');
//         base64 = [
//             'data:',
//             mediaType ? mediaType + ';':'',
//             'base64,',
//             btoa(binary)
//         ].join('');
//         onSuccess(base64);
//     };
//     xhr.onerror = onError;
//     xhr.send();
// }


//---------- SETTINGS ----------//

function backColor(value) {
    d.body.style.backgroundColor = value;
    d.body.style.backgroundColor = '#' + value;
}

//---------- RESET ----------//

function resetFilters() {
  if (confirm('Any changes in "Filters" will be overwritten! Continue?') == true) {

    var i = 0;
    while (i < l) {

      if (sliders[i] == "invert") {
        inverted = false;
      } else {
        var currentSlider = d.getElementById(sliders[i] + "Slider");
        currentSlider.value = currentSlider.defaultValue;
      }
      i++;
    }
    input("id");
  }
}
function singleReset(id) {

  var currentName = id.slice(0, -5);
  for (var i = 0; i < l; i++) {
    if (currentName == sliders[i]) {

      var currentSlider = d.getElementById(sliders[i] + "Slider");
      currentSlider.value = currentSlider.defaultValue;
      input("id");
    }
  }
}

function resetRotate() {
  if (confirm('Any changes in "Rotate" will be overwritten! Continue?') == true) {

    d.getElementById("rotateXSlider").value = 0;
    d.getElementById("rotateYSlider").value = 0;
    d.getElementById("rotateZSlider").value = 0;
    rotate("id");
  }
}
function singleRotateReset(id) {
  d.getElementById(id.slice(0, -5) + "Slider").value = 0;
  rotate("id");
}

function resetZoom() {
  if (confirm('Any changes in "Zoom" will be overwritten! Continue?') == true) {

    d.getElementById("zoomXSlider").value = 1;
    d.getElementById("zoomYSlider").value = 1;
    zoom("zoomXSlider");
    zoom("zoomYSlider");
  }
}

function resetText() {
  if (confirm('Any changes in "Text" will be overwritten! Continue?') == true) {

    i = 0;
    while (i < tl) {
      var id = "text" + textSliders[i];
      var get = d.getElementById(id);
      if (i > 4) {
        if (i == 5 || i == 6) {
          ctv[i] = "normal";
        } else if (i == 7 || i == 8) {
          ctv[i] = "none";
        }
        get.checked = false;
      } else {
        get.value = get.defaultValue;
      }
      text(id);
      i++;
    }
    d.getElementById("textRotateSlider").value = 0;
    text("textRotateSlider");
  }
}

function resetSettings() {
  if (confirm('Restore default settings?') == true) {
    d.getElementById('bgcInput').value = '#aba8ad';
    d.getElementById('localCheck').checked = false;
  }
}

//---------- EXTRA BUTTONS ----------//

//--- SHUFFLE ---//
function shuffle() {

  var sliderChange = false;
  var confirmation;
  var i = 0;

  while (i < l) {
    if (d.getElementById(sliders[i] + "Slider").defaultValue !== currentValues[i]) {
      sliderChange = true;
    }
    i++;
  }
  if (sliderChange == true) {
    confirmation = confirm('All your prevoius changes in "Filters" will be overwritten! Continue?');
  }

  if (confirmation == true || sliderChange == false) {
    var max = [ "800", "800", "360", "300", "100", "100", "100", "10", "1" ];
    i = 0;

    while (i < l-3) { // exclude opacity, blur and invert
      d.getElementById(sliders[i] + "Slider").value = Math.floor(Math.random() * max[i]) + 1;
      i++;
    }
    input("id");
  }
}

//--- QUICK ZOOM ---//

function quickZoom(id) {
  var scaleX = d.getElementById("zoomXSlider");
  var scaleY = d.getElementById("zoomYSlider");
  if (id == "zoomIn") {
    scaleX.value = Number(scaleX.value) + 0.1;
    scaleY.value = Number(scaleY.value) + 0.1;
  } else {
    scaleX.value = Number(scaleX.value) - 0.1;
    scaleY.value = Number(scaleY.value) - 0.1;
  }
  zoom("zoomXSlider");
  zoom("zoomYSlider");
}
