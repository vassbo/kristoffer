/************************************************************************
 * controls
 ***********************************************************************/

// holds static methods to initialize the various controls;
// Object.create() is used to create a truly empty object
var controls = Object.create(null);

// controls.tool = function(cx) {
//   var select = elt('select');
//
//   // populate the tools
//   for (var name in tools)
//     select.appendChild(elt('option', null, name));
//
//   // calls the particular method associated with the current tool
//   cx.canvas.addEventListener('mousedown', function(event) {
//
//     // is the left mouse button being pressed?
//     if (event.which == 1) {
//
//       // the event needs to be passed to the method to determine
//       // what the mouse is doing and where it is
//       tools[select.value](event, cx);
//       // don't select when user is clicking and dragging
//       event.preventDefault();
//     }
//   });
//
//   return elt('div', null, 'Tool: ', select);
// };
//
// // color module
// controls.color = function(cx) {
//   var input = elt('input', {type: 'color'});
//
//   // on change, set the new color style for fill and stroke
//   input.addEventListener('change', function() {
//     cx.fillStyle = input.value;
//     cx.strokeStyle = input.value;
//   });
//   return elt('div', null, 'Color: ', input);
// };
//
// // brush size module
// controls.brushSize = function(cx) {
//   var select = elt('select');
//
//   // various brush sizes
//   var sizes = [1, 2, 3, 5, 8, 12, 25, 35, 50, 75, 100];
//
//   // build up a select group of size options
//   sizes.forEach(function(size) {
//     select.appendChild(elt('option', {value: size}, size + ' pixels'));
//   });
//
//   // on change, set the new stroke thickness
//   select.addEventListener('change', function() {
//     cx.lineWidth = select.value;
//   });
//   return elt('div', null, 'Brush size: ', select);
// };

// save
// controls.save = function(cx) {
//   // MUST open in a new window because of iframe security stuff
//   var link = elt('a', {href: '/', target: '_blank'}, 'Save');
//   function update() {
//     try {
//       link.href = cx.canvas.toDataURL();
//     } catch(e) {
//       // some browsers choke on big data URLs
//
//       // also, if the server response doesn't include a header that tells the browser it
//       // can be used on other domains, the script won't be able to look at it;
//       // this is in order to prevent private information from leaking to a script;
//       // pixel data, data URL or otherwise, cannot be extracted from a "tainted canvas"
//       // and a SecurityError is thrown
//       if (e instanceof SecurityError)
//         link.href = 'javascript:alert(' +
//           JSON.stringify('Can\'t save: ' + e.toString()) + ')';
//       else
//         window.alert("Nope.");
//         throw e;
//     }
//   }
//   link.addEventListener('mouseover', update);
//   link.addEventListener('focus', update);
//   return link;
// };

// // open a file
// controls.openFile = function(cx) {
//   var input = elt('input', {type: 'file'});
//   input.addEventListener('change', function() {
//     if (input.files.length == 0) return;
//     var reader = new FileReader();
//     reader.addEventListener('load', function() {
//       loadImageURL(cx, reader.result);
//     });
//     reader.readAsDataURL(input.files[0]);
//   });
//   return elt('div', null, 'Open file: ', input);
// };
//
// // open a URL
// controls.openURL = function(cx) {
//   var input = elt('input', {type: 'text'});
//   var form = elt('form', null, 'Open URL: ', input,
//                  elt('button', {type: 'submit'}, 'load'));
//   form.addEventListener('submit', function(event) {
//     event.preventDefault();
//     loadImageURL(cx, form.querySelector('input').value);
//   });
//   return form;
// };
