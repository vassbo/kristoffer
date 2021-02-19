function processFile(file){
  if(file === undefined){
    file = "../files/default.txt";
  }
  //
  // var contents = "";
  // var reader = new FileReader();
  // reader.onload = function(e) {
  //   contents = e.target.result;
  // };
  //
  // debugger;
  // reader.readAsText(file);

  var board2 = "##########/n"+
              "#________#/n"+
              "#_######_#/n"+
              "#_#____#_#/n"+
              "#_#_##_#_#/n"+
              "#_#_##_#_#/n"+
              "#_#____#_#/n"+
              "#_######_#/n"+
              "#________#/n"+
              "##########";

  var board = "###################/n"+
              "#____X#X_#XX#XX#__#/n"+
              "#_X#__#_____#O_#S_#/n"+
              "#_###_#_###_##_##_#/n"+
              "#__#____X#_____#X_#/n"+
              "#X_#_X#_X#_X#X_#_##/n"+
              "##_#############__#/n"+
              "#X_#_X#X_#X____#__#/n"+
              "#__#X___X#___X_#X_#/n"+
              "#_###_#_###_##_##_#/n"+
              "#__#X_#_____#X_#__#/n"+
              "#X____#XX#XX#X___X#/n"+
              "###################/n";


  var lines = board.split("/n");
  board = [];

  lines.forEach(function(l){
    board.push(l.split(""));
  });

  return board;
}
