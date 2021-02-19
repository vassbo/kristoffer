document.body.addEventListener('click', uuid);

var keyDown = false;
document.body.addEventListener("keydown", function(e) {
  if (e.keyCode !== 18 && e.keyCode !== 17) {  // 18 = alt & 17 = ctrl
    if (keyDown === false) { uuid(); }
    keyDown = true;
  }
});
document.body.addEventListener("keyup", function() { keyDown = false; });

uuid();
function uuid() {
  var uuid = document.getElementById("uuid");
  // generate GUID
  uuid.innerHTML = guid();
  // select
  var selection = window.getSelection();
  var range = document.createRange();
  range.selectNodeContents(uuid);
  selection.removeAllRanges();
  selection.addRange(range);
  // copy
  document.execCommand('copy');
  document.getElementById('copied').classList.replace("fade-out", "fade-in");
  setTimeout(function() { document.getElementById('copied').classList.replace("fade-in", "fade-out"); }, 2000);
  // deselect
  if (window.getSelection) { window.getSelection().removeAllRanges(); }
  else if (document.selection) { document.selection.empty(); }
}

function guid() {
  return "ss-s-s-s-sss".replace(/s/g, s4);
}
function s4() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}
