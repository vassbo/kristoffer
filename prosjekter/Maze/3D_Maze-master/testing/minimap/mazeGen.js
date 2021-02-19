var makeMaze = function(height, width){
  // width /= 2;
  // height /= 2;
  var maze="", a;
  for(var i = 0; i <= 2 * width; i++){
    for(var j = 0; j <= 2 * height; j++){
      maze+='#';
    }
    maze+='\n';
  }

  var lines = maze.split("\n");

  lines.splice(lines.length-1, 1);

  maze = [];

  lines.forEach(function(l){
    maze.push(l.split(""));
  });

  function mazeStep(r,c){
      var i,vector=[[0,0],[0,0],[0,0]]; /* 3 possible directions */
      function R(val){
          if(typeof val=="undefined")return vector[i][0];
          vector[i][0]=val;
      }
      function C(val){
          if(typeof val=="undefined")return vector[i][1];
          vector[i][1]=val;
      }
      while(1){
          i=0; /* create a list of possible options */
          if(r>1            &&maze[r-2][c]!=="_"){R(r-2);C(c);i++;}
          if(r< width*2-1 &&maze[r+2][c]!=="_"){R(r+2);C(c);i++;}
          if(c>1            &&maze[r][c-2]!=="_"){R(r);C(c-2);i++;}
          if(c< height*2-1 &&maze[r][c+2]!=="_"){R(r);C(c+2);i++;}
          /* i is never > 3 because path behind is cleared */
          if(i==0)break; /* check for dead end */
          i=Math.floor((Math.random()*i))|0; /* random direction */
          maze[R()][C()]="_"; /* knock out block */
          maze[(R()+r)/2|0][(C()+c)/2|0]="_"; /* clear to it */
          mazeStep(R(),C());
      }
  }

  function mazeWalk(){
  	var i,r,c;
  	c=height|1;
    //c= 1 + Math.floor(Math.random() * height * 2 - 1);
  	maze[0][c]='_';
    //c= 1 + Math.floor(Math.random() * height * 2 - 1);
    maze[2*width][c]='_';
  	i=Math.floor((Math.random()*2));
  	c=(i) ? 1|0 :(2*height-1);
    r=width|1;
    maze[r][c]='_';

    // var start = Math.floor(Math.random() * 4);
    // switch (start) {
    //   case 0://top
    //     r = 1 + Math.floor(Math.random()*width*2 - 2);
    //     c = 1;
    //     console.log("top");
    //     break;
    //   case 1://right
    //     r = width*2-1;
    //     c = 1 + Math.floor(Math.random()*height*2 - 2);
    //     console.log("right");
    //     break;
    //   case 2://bottom
    //     r = 1 + Math.floor(Math.random()*width*2 - 2);
    //     c = height*2-1;
    //     console.log("bottom");
    //     break;
    //   case 3://left
    //     r = 1;
    //     c = 1 + Math.floor(Math.random()*height*2 - 2);
    //     console.log("left");
    //     break;
    //
    //   default:
    //     console.log("Incorrect Side Option");
    //
    // }
    // console.log(r, c);
    // maze[r][c] = '_';
  	mazeStep(r,c);
  }

  mazeWalk();

  // maze.forEach(function(r){
  //   console.log(r);
  // });
return maze;
};
