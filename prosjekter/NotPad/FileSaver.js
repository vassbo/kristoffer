/*
* FileSaver.js
* A saveAs() FileSaver implementation.
*
* By Eli Grey, http://eligrey.com
*
* License : https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md (MIT)
* source  : http://purl.eligrey.com/github/FileSaver.js
*/

var _global = window;

function bom (blob) {
  opts = { autoBom: false };
  return blob;
}

function download (url, name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.onload = function () {
    saveAs(xhr.response, name);
  };
  // xhr.onerror = function () {
  //   console.error('Could not download file!');
  // };
  xhr.send();
}

function click (node) {
    node.dispatchEvent(new MouseEvent('click'));
}

var saveAs = _global.saveAs || (

  // Use download attribute first if possible (#193 Lumia mobile)
  'download' in HTMLAnchorElement.prototype ? function saveAs (blob, name) {
    var URL = _global.URL || _global.webkitURL;
    var a = document.createElement('a');
    name = name || blob.name || 'download';

    a.download = name;
    a.rel = 'noopener'; // tabnabbing

    if (typeof blob === 'string') {
      // Support regular links
      a.href = blob;
      click(a, a.target = '_blank');
    } else {
      // Support blobs
      a.href = URL.createObjectURL(blob);
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 4E4); // 40s
      setTimeout(function () { click(a); }, 0);
    }
  }

  // Fallback to using FileReader and a popup
  : function saveAs (blob, name) {
    // Open a popup immediately do go around popup blocker
    // Mostly only available on user interaction and the fileReader is async so...
    popup = popup || open('', '_blank');
    if (popup) {
      popup.document.title =
      popup.document.body.innerText = 'downloading...';
    }

    if (typeof blob === 'string') return download(blob, name);

    var URL = _global.URL || _global.webkitURL;
    var url = URL.createObjectURL(blob);
    if (popup) popup.location = url;
    else location.href = url;
    popup = null; // reverse-tabnabbing #460
    setTimeout(function () { URL.revokeObjectURL(url); }, 4E4); // 40s
  }
);
