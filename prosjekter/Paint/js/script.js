// the core of the program; appends the paint interface to the
// DOM element given as an argument (parent)
var cx;
function createPaint(parent) {
  var canvas = elt('canvas', {width: document.body.offsetWidth - 68, height: document.body.offsetHeight});
  cx = canvas.getContext('2d');
  var toolbar = elt('div', {class: 'toolbar'});
  // var toolbar = elt('div', {id: 'side-menu'});
  // var toolbar = document.getElementById("side-menu");

  // calls the every function in controls, passing in context,
  // then appending the returned results to the toolbar
  for (var name in controls)
    toolbar.appendChild(controls[name](cx));
  // document.getElementById("side-menu").appendChild(toolbar);

  var panel = elt('div', {class: 'picturepanel'}, canvas);
  parent.appendChild(elt('div', null, panel, toolbar));
}
