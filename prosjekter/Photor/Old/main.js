// Created by SaddleSneeze

var brightness;
var contrast;
var hue;
var sepia;
var grayscale;
var saturation;
var opacity;
var blurry;
var rotatez;
var rotatey;
var rotatex;
var size;

var canvas;

$(function() {
  //start of filtering function
  $('input[type=range]').on('input', function() {
    //get each filter range value
    brightness = $('#brange').val();
    contrast = $('#crange').val();
    hue = $('#hrange').val();
    sepia = $('#seprange').val();
    grayscale = $('#grange').val();
    saturation = $('#satrange').val();
    opacity = $('#oprange').val();
    blurry = $('#blrange').val();
    rotatez = $('#rotzrange').val();
    rotatey = $('#rotyrange').val();
    rotatex = $('#rotxrange').val();
    size = $('#sizerange').val();

    var red = $('#red').val();
    var green = $('#green').val();
    var blue = $('#blue').val();
    var transp = $('#transp').val();
    var txtsize = $('#txtsize').val();
    //setting filter value
    $('#bval').text(brightness + '%');
    $('#cval').text(contrast + '%');
    $('#hval').text(hue + '°');
    $('#sepval').text(sepia + '%');
    $('#gval').text(grayscale + '%');
    $('#satval').text(saturation + '%');
    $('#opval').text(opacity + '%');
    $('#blval').text(blurry + 'px');
    $('#rzval').text(rotatez + '°');
    $('#ryval').text(rotatey + '°');
    $('#rxval').text(rotatex + '°');
    $('#sizeval').text(size + '%');
    //applying filter to the image
    $('#edit, #img1, #img2, #img3, #img4, #img5, #img6, #img7, #img8, #img9, #img10').css({
      'filter': 'brightness(' + brightness + '%)' +
        'contrast(' + contrast + '%)' +
        'hue-rotate(' + hue + 'deg)' +
        'sepia(' + sepia + '%)' +
        'grayscale(' + grayscale + '%)' +
        'saturate(' + saturation + '%)' +
        'opacity(' + opacity + '%)' +
        'blur(' + blurry + 'px)',
      '-webkit-filter': 'brightness(' + brightness + '%)' +
        'contrast(' + contrast + '%)' +
        'hue-rotate(' + hue + 'deg)' +
        'sepia(' + sepia + '%)' +
        'grayscale(' + grayscale + '%)' +
        'saturate(' + saturation + '%)' +
        'opacity(' + opacity + '%)' +
        'blur(' + blur + 'px)',
      '-moz-filter': 'brightness(' + brightness + '%)' +
        'contrast(' + contrast + '%)' +
        'hue-rotate(' + hue + 'deg)' +
        'sepia(' + sepia + '%)' +
        'grayscale(' + grayscale + '%)' +
        'saturate(' + saturation + '%)' +
        'opacity(' + opacity + '%)' +
        'blur(' + blur + 'px)'
    });

    $("#edit").css('transform',
      'rotateZ(' + rotatez + 'deg)' +
      'rotateY(' + rotatey + 'deg)' +
      'rotateX(' + rotatex + 'deg)');

    //$("#edit").css('width', $("#edit").width(size*5.75));
    $("#edit").css('width', $("#edit").width(100 * size / 104.15 + '%'));

    $("#textinput").css('color',
      "rgb(" + red + "," + green + "," + blue + "," + transp + ")");

    // $("#textinput").css('font-size', txtsize);
    // $("#textinput").css({'font-size(' + fontsize + 'px)'});

    $("#textinput").css('font-size', txtsize + 'px');

    //.style.top=tp+"px";

  }); //end of filtering function

  // var inv = 0;
  // $('#invert').on('click', function() {
  //   if (inv === 0) {
  //     $('#edit, #img1, #img2, #img3, #img4, #img5, #img6, #img7, #img8, #img9, #img10').css({
  //       'filter': 'invert(1)'
  //     });
  //     inv = 1;
  //   } else {
  //     $('#edit, #img1, #img2, #img3, #img4, #img5, #img6, #img7, #img8, #img9, #img10').css({
  //       'filter': 'invert(0)'
  //     });
  //     inv = 0;
  //   }
  // });


  $('input[type=checkbox]').on('input', function() {

    if ($('#icon-toggle-1').is(':checked')) {
      $("#textinput").css({
        "font-weight": "bold"
      });
    } else {
      $("#textinput").css({
        "font-weight": "normal"
      });
    }

    if ($('#icon-toggle-2').is(':checked')) {
      $("#textinput").css({
        "font-style": "italic"
      });
    } else {
      $("#textinput").css({
        "font-style": "normal"
      });
    }

    var three = $('#icon-toggle-3').is(':checked');
    var four = $('#icon-toggle-4').is(':checked');
    if (three && !four) {
      $("#textinput").css({
        "text-decoration": "underline"
      });
    } else if (four && !three) {
      $("#textinput").css({
        "text-decoration": "line-through"
      });
    } else if (three && four) {
      $("#textinput").css({
        "text-decoration": "line-through underline"
      });
    } else {
      $("#textinput").css({
        "text-decoration": "none"
      });
    }

  });

  //img1
  $('#img1').on('click', function() {
    $('#edit').attr('src', 'https://stmed.net/sites/default/files/night-sky-wallpapers-30833-9599712.jpg');
  });
  //img2
  $('#img2').on('click', function() {
    $('#edit').attr('src', 'https://wallpaperplay.com/walls/full/c/4/9/87852.jpg');
  });
  //img3
  $('#img3').on('click', function() {
    $('#edit').attr('src', 'http://hdqwalls.com/wallpapers/ocean-sky-sunset-beach.jpg');
  });
  //img4
  $('#img4').on('click', function() {
    $('#edit').attr('src', 'http://eskipaper.com/images/red-forest-2.jpg');
  });
  //img5
  $('#img5').on('click', function() {
    $('#edit').attr('src', 'https://stmed.net/sites/default/files/black-mountain-wallpapers-27777-1226025.jpg');
  }); //end of photo selection function
  $('#fix').on('click', function() {
    alert('Under construction!');
  });

  $('#reset').on('click', function() {
    $('#bval').text(100 + '%');
    $('#cval').text(100 + '%');
    $('#hval').text(0 + '°');
    $('#sepval').text(0 + '%');
    $('#gval').text(0 + '%');
    $('#satval').text(100 + '%');
    $('#opval').text(100 + '%');
    $('#blval').text(0 + 'px');
    $('#rzval').text(0 + '°');
    $('#ryval').text(0 + '°');
    $('#rxval').text(0 + '°');
    $('#sizeval').text(100 + '%');

    brightness = $('#brange').val();
    contrast = $('#crange').val();
    hue = $('#hrange').val();
    sepia = $('#seprange').val();
    grayscale = $('#grange').val();
    saturation = $('#satrange').val();
    opacity = $('#oprange').val();
    blurry = $('#blrange').val();
    rotatez = $('#rotzrange').val();
    rotatey = $('#rotyrange').val();
    rotatex = $('#rotxrange').val();
    size = $('#sizerange').val();

    // var red = $('#red').val();
    // var green = $('#green').val();
    // var blue = $('#blue').val();
    // var transp = $('#transp').val();
    // var txtsize = $('#txtsize').val();

    $('#edit, #img1, #img2, #img3, #img4, #img5, #img6, #img7, #img8, #img9, #img10').css({
      'filter': 'brightness(' + 100 + '%)' +
        'contrast(' + 100 + '%)' +
        'hue-rotate(' + 0 + 'deg)' +
        'sepia(' + 0 + '%)' +
        'grayscale(' + 0 + '%)' +
        'saturate(' + 100 + '%)' +
        'opacity(' + 100 + '%)' +
        'blur(' + 0 + 'px)',
      '-webkit-filter': 'brightness(' + 100 + '%)' +
        'contrast(' + 100 + '%)' +
        'hue-rotate(' + 0 + 'deg)' +
        'sepia(' + 0 + '%)' +
        'grayscale(' + 0 + '%)' +
        'saturate(' + 100 + '%)' +
        'opacity(' + 100 + '%)' +
        'blur(' + 0 + 'px)',
      '-moz-filter': 'brightness(' + 100 + '%)' +
        'contrast(' + 100 + '%)' +
        'hue-rotate(' + 0 + 'deg)' +
        'sepia(' + 0 + '%)' +
        'grayscale(' + 0 + '%)' +
        'saturate(' + 100 + '%)' +
        'opacity(' + 100 + '%)' +
        'blur(' + 0 + 'px)'
    });

    $("#edit").css('transform',
      'rotateZ(' + 0 + 'deg)' +
      'rotateY(' + 0 + 'deg)' +
      'rotateX(' + 0 + 'deg)');

    $("#edit").css('width', $("#edit").width(100 * 100 / 104.15 + '%'));

    // $("#textinput").css('color',
    //   "rgb(" + 0 + "," + 0 + "," + 0 + "," + 0 + ")");
    //
    // $("#textinput").css('font-size', 0);


    document.getElementById("brange").value = "100";
    document.getElementById("crange").value = "100";
    document.getElementById("hrange").value = "0";
    document.getElementById("seprange").value = "0";
    document.getElementById("grange").value = "0";
    document.getElementById("satrange").value = "100";
    document.getElementById("oprange").value = "100";
    document.getElementById("blrange").value = "0";
    document.getElementById("rotzrange").value = "0";
    document.getElementById("rotyrange").value = "0";
    document.getElementById("rotxrange").value = "0";
    document.getElementById("sizerange").value = "100";
  });

  $('#hardreset').on('click', function() {
    location.reload();
  });



  var showFavs = document.querySelector('#show-favs');
  showFavs.addEventListener('click', function() {

    $("#show-favs").toggleClass('mdl-button--colored mdl-button--primary');
    $("#show-favs").toggleClass('rotateBack rotate');
    $("#imgFavButton").toggleClass('FavButtonNone imgFavButton');
    $("#txtFavButton").toggleClass('FavButtonNone txtFavButton');
    $("#downloadFavButton").toggleClass('FavButtonNone downloadFavButton');
    $("#infoFavButton").toggleClass('FavButtonNone infoFavButton');

  });


  var img6;
  var img7;
  var img8;
  var img9;
  var img10;
  var img = 6;
  var dialog = document.querySelectorAll('dialog')[0];
  var showDialogButton = document.querySelector('#show-dialog');
  if (!dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
  }
  showDialogButton.addEventListener('click', function() {
    dialog.showModal();
    $("#show-favs").toggleClass('mdl-button--colored mdl-button--primary');
    $("#show-favs").toggleClass('rotateBack rotate');
    $("#imgFavButton").toggleClass('FavButtonNone imgFavButton');
    $("#txtFavButton").toggleClass('FavButtonNone txtFavButton');
    $("#downloadFavButton").toggleClass('FavButtonNone downloadFavButton');
    $("#infoFavButton").toggleClass('FavButtonNone infoFavButton');
  });
  dialog.querySelector('.close').addEventListener('click', function() {
    dialog.close();
  });
  dialog.querySelector('.add').addEventListener('click', function() {
    var add = document.getElementById("form").value;
    if (add === "") {
      alert("No link");
    } else {
      $('#edit').attr('src', add);

      switch (img) {
        case 6:
          $('#img6').attr('src', add);
          img = 7;
          dialog.close();
          img6 = add;
          break;
        case 7:
          $('#img7').attr('src', add);
          img = 8;
          dialog.close();
          img7 = add;
          break;
        case 8:
          $('#img8').attr('src', add);
          img = 9;
          dialog.close();
          img8 = add;
          break;
        case 9:
          $('#img9').attr('src', add);
          img = 10;
          dialog.close();
          img9 = add;
          break;
        case 10:
          $('#img10').attr('src', add);
          img = 11;
          dialog.close();
          img10 = add;
          break;
        default:
          dialog.close();
          var conf = confirm("Image places full! Would you like to override an existing spot?");
          if (conf == true) {
            img = 6;
            $('#img6').attr('src', add);
            img = 7;
            img6 = add;
          } else {
            img = 11;
          }
      }
    }
  });

  $('#img6').on('click', function() {
    $('#edit').attr('src', img6);
  });
  $('#img7').on('click', function() {
    $('#edit').attr('src', img7);
  });
  $('#img8').on('click', function() {
    $('#edit').attr('src', img8);
  });
  $('#img9').on('click', function() {
    $('#edit').attr('src', img9);
  });
  $('#img10').on('click', function() {
    $('#edit').attr('src', img10);
  });



  var dialog2 = document.querySelectorAll('dialog')[1];
  var showDialogButton2 = document.querySelector('#download');
  if (!dialog2.showModal) {
    dialogPolyfill.registerDialog(dialog2);
  }
  showDialogButton2.addEventListener('click', function() {

    canvas = document.getElementById('canvasimg');
    var ctx = canvas.getContext('2d');

    // ctx.filter = "sepia(80%)";
    /*ctx.filter =
    'brightness('+brightness+'%)' +
    'contrast('+contrast+'%)' +
    'hue-rotate('+hue+'deg)' +
    'sepia('+sepia+'%)' +
    'grayscale('+grayscale+'%)' +
    'saturate('+saturation+'%)' +
    'opacity('+opacity+'%)' +
    'blur('+blur+'px)';

    ctx.css('transform',
    'rotateZ(' + rotatez + 'deg)' +
    'rotateY(' + rotatey + 'deg)' +
    'rotateX(' + rotatex + 'deg)');

    ctx.css('width', ctx.width(100*size/104.2+'%'));*/

    var img = document.getElementById("edit");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // $("canvas").css('height','auto');

    /*var canvas = document.getElementById("canvasimg");
var ctx = canvas.getContext("2d");
var ox = canvas.width / 2;
var oy = canvas.height / 2;
ctx.font = "42px serif";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillStyle = "#800";
ctx.fillRect(ox / 2, oy / 2, ox, oy);*/

    dialog2.showModal();
    $("#show-favs").toggleClass('mdl-button--colored mdl-button--primary');
    $("#show-favs").toggleClass('rotateBack rotate');
    $("#imgFavButton").toggleClass('FavButtonNone imgFavButton');
    $("#txtFavButton").toggleClass('FavButtonNone txtFavButton');
    $("#downloadFavButton").toggleClass('FavButtonNone downloadFavButton');
    $("#infoFavButton").toggleClass('FavButtonNone infoFavButton');
  });
  dialog2.querySelector('.cancel').addEventListener('click', function() {
    dialog2.close();
  });
  dialog2.querySelector('.download').addEventListener('click', function() {


    dialog2.close();
  });



  var dialog3 = document.querySelectorAll('dialog')[2];
  var showDialogButton3 = document.querySelector('#info');
  if (!dialog3.showModal) {
    dialogPolyfill.registerDialog(dialog3);
  }
  showDialogButton3.addEventListener('click', function() {
    dialog3.showModal();
  });
  dialog3.querySelector('.ok').addEventListener('click', function() {
    dialog3.close();
  });





  $('#text').on('click', function() {
    document.getElementById("home").style.display = "none";
    document.getElementById("textdiv").style.display = "flex";

    $("#show-favs").toggleClass('mdl-button--colored mdl-button--primary');
    $("#show-favs").toggleClass('rotateBack rotate');
    $("#imgFavButton").toggleClass('FavButtonNone imgFavButton');
    $("#txtFavButton").toggleClass('FavButtonNone txtFavButton');
    $("#downloadFavButton").toggleClass('FavButtonNone downloadFavButton');
    $("#infoFavButton").toggleClass('FavButtonNone infoFavButton');

    $('#text').attr("disabled", true);

  });

  $('#textinput').on('input', function() {
    var txtinput = document.getElementById("textinput").value;
    if (txtinput !== "") {
      $('#addtext').removeAttr("disabled");
    } else {
      $('#addtext').attr("disabled", true);
    }
  });

  $('#canceltext').on('click', function() {
    document.getElementById("home").style.display = "flex";
    document.getElementById("textdiv").style.display = "none";
    $('#text').removeAttr("disabled");
  });
  $('#canceltext2').on('click', function() {
    document.getElementById("textdiv").style.display = "flex";
    document.getElementById("arrows").style.display = "none";
    document.getElementById("centeredText").style.display = "none";
  });
  $('#hometxt').on('click', function() {
    document.getElementById("home").style.display = "flex";
    document.getElementById("arrows").style.display = "none";
    document.getElementById("centeredText").style.display = "none";
    $('#text').removeAttr("disabled");
  });

  $('#addtext').on('click', function() {
    document.getElementById("arrows").style.display = "flex";
    document.getElementById("textdiv").style.display = "none";

    var red = $('#red').val();
    var green = $('#green').val();
    var blue = $('#blue').val();
    var transp = $('#transp').val();
    var txtsize = $('#txtsize').val();

    $("#centeredText").css('color', "rgb(" + red + "," + green + "," + blue + "," + transp + ")");
    // $("#centeredText").css('font-size', txtsize);
    $("#centeredText").css('font-size', txtsize + 'px');
    if ($('#icon-toggle-1').is(':checked')) {
      $("#centeredText").css({
        "font-weight": "bold"
      });
    } else {
      $("#centeredText").css({
        "font-weight": "normal"
      });
    }
    if ($('#icon-toggle-2').is(':checked')) {
      $("#centeredText").css({
        "font-style": "italic"
      });
    } else {
      $("#centeredText").css({
        "font-style": "normal"
      });
    }
    var three = $('#icon-toggle-3').is(':checked');
    var four = $('#icon-toggle-4').is(':checked');
    if (three && !four) {
      $("#centeredText").css({
        "text-decoration": "underline"
      });
    } else if (four && !three) {
      $("#centeredText").css({
        "text-decoration": "line-through"
      });
    } else if (three && four) {
      $("#centeredText").css({
        "text-decoration": "line-through underline"
      });
    } else {
      $("#centeredText").css({
        "text-decoration": "none"
      });
    }

    var txt = document.getElementById("textinput").value;
    document.getElementById("centeredText").innerHTML = txt;
    document.getElementById("centeredText").style.display = "flex";
  });

  $('#resettext').on('click', function() {
    $("#textinput").css('color', "rgb(" + 0 + "," + 0 + "," + 0 + "," + 1 + ")");
    $("#textinput").css('font-size', 16);
    $("#textinput").css({
      "font-weight": "normal"
    });
    $("#textinput").css({
      "font-style": "normal"
    });
    $("#textinput").css({
      "text-decoration": "none"
    });

    // icon toggle color grey WIP
    $('#icon-toggle-1').prop('checked', false);
    $('#icon-toggle-1').attr('checked', false);
    $('#icon-toggle-2').prop('checked', false);
    $('#icon-toggle-2').attr('checked', false);
    $('#icon-toggle-3').prop('checked', false);
    $('#icon-toggle-3').attr('checked', false);

    /*$("#red").slider("value", 100);*/
    //add animation to sliders?
    document.getElementById("red").value = "0";
    document.getElementById("green").value = "0";
    document.getElementById("blue").value = "0";
    document.getElementById("transp").value = "1";
    document.getElementById("txtsize").value = "16";
  });

  $('#addtext2').on('click', function() {
    //get ready for text #2...??
    document.getElementById("home").style.display = "flex";
    document.getElementById("arrows").style.display = "none";
    $("#centeredText").css('border-width', '0');
    $('#text').removeAttr("disabled");
  });


  var movesize = $('#movesize').val();
  $('input[type=range]').on('input', function() {
    movesize = $('#movesize').val();
    $('#movesizeval').text(movesize + 'px');

    var txtrot = $('#txtrot').val();
    $('#txtrotval').text(txtrot + '°');
    $("#centeredText").css('transform', 'rotate(' + txtrot + 'deg)');
  });



  var leftright = 30;
  var updown = 30;
  $('#left').on('click', function() {
    leftright -= Number(movesize);
    $("#centeredText").css({
      "left": leftright + "px"
    });
  });
  $('#up').on('click', function() {
    updown -= Number(movesize);
    $("#centeredText").css({
      "top": updown + "px"
    });
  });
  $('#down').on('click', function() {
    updown += Number(movesize);
    $("#centeredText").css({
      "top": updown + "px"
    });
  });
  $('#right').on('click', function() {
    leftright += Number(movesize);
    $("#centeredText").css({
      "left": leftright + "px"
    });
  });



}); //end of entire function


var img6;
var img7;
var img8;
var img9;
var img10;
var img = 6;

function PreviewImage() {
  var file = new FileReader();
  file.readAsDataURL(document.getElementById("files").files[0]);

  file.onload = function(file) {
    document.getElementById("edit").src = file.target.result;

    /*switch(img) {
        case 6:
            document.getElementById("img6").src = file.target.result;
            img = 7;
            img6 = file;
        break;
        case 7:
            document.getElementById("img7").src = file.target.result;
            img = 8;
            img7 = file;
        break;
        case 8:
            document.getElementById("img8").src = file.target.result;
            img = 9;
            img8 = file;
        break;
        case 9:
            document.getElementById("img9").src = file.target.result;
            img = 10;
            img9 = file;
        break;
        case 10:
            document.getElementById("img10").src = file.target.result;
            img = 11;
            img10 = file;
        break;
        default:
            alert("Image places full! Would you like to override?");
    }*/
  };

  document.querySelector('dialog').close();
}


var canvas = document.getElementById("canvasimg");

download_img = function(el) {
  var image = canvas.toDataURL("image/jpg");
  el.href = image;
};
