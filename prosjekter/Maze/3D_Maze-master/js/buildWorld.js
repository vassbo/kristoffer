
function buildWorld(board){
  var x = 0, y = 0,
      walls = [],
      floorTiles = [];

      xOffset = board[0].length/2;
      yOffset = board.length/2;

    //   camera.position = new Vector3(board[0].length/2);

    //   var ground = BABYLON.Mesh.CreateGround("ground", board[0].length*size, board.length*size, 4, scene);
    var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "img/floor5.jpg", board[0].length*size*1.5, board.length*size*1.5, 50, 0, 0.1, scene, false);
      ground.checkCollisions = true;
      ground.position.y = size/2;

      var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
      groundMaterial.diffuseTexture = new BABYLON.Texture("img/floor5.jpg", scene);
      groundMaterial.diffuseTexture.uScale = 20;
      groundMaterial.diffuseTexture.vScale = 20;
    //   groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
      ground.material = groundMaterial;
      var firstPos = false;

      console.log(ground);

      var roof = BABYLON.Mesh.CreateGround("roof", board[0].length*size, board.length*size, 4, scene);
      roof.position.y = size*1.5;
      roof.position.x += size/2;
      roof.position.z -= size/2;
      roof.rotation.x = Math.PI;

      var roofMaterial = new BABYLON.StandardMaterial("sky", scene);
      roofMaterial.diffuseTexture = new BABYLON.Texture("img/sky.jpg", scene);
      roofMaterial.diffuseTexture.uScale = 20;
      roofMaterial.diffuseTexture.vScale = 20;
    //   groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
      roof.material = roofMaterial;

  board.forEach(function(yVal){
    yVal.forEach(function(xVal){
      if(xVal == '#'){
        var wall = BABYLON.Mesh.CreateBox("box" + x + y, size, scene);
        wall.position = new BABYLON.Vector3(-(x-xOffset) * size ,size,(y - yOffset) * size);

        wall.material = new BABYLON.StandardMaterial("texture1", scene);
        wall.material.diffuseTexture = new BABYLON.Texture("img/wall4.jpg", scene);
        //wall.material.bumpTexture = new BABYLON.Texture("img/wall4.jpg", scene);
        wall.checkCollisions = true;

        walls.push(wall);
    }else if (!firstPos && xVal == '_') {
        // var tile = BABYLON.Mesh.CreatePlane("tile" + x + y, size, scene);
        // tile.position = new BABYLON.Vector3((x-xOffset) * size ,size/2,(y - yOffset) * size);
        // tile.rotation.x =Math.PI/2;
        // tile.checkCollisions = true;
        // floorTiles.push(tile);
        firstPos = true;
        //camera.position = new Vector3(xVal * size, size/2 + 0.01, yVal * size);
    }
      x++;
    });
    x = 0;
    y++;
  });
  spawns(board);
  return {walls: walls, floor: floorTiles};
}

function spawns(board){
    printBoard(board);
    board[0].forEach(function(d, i) {
        if(d == '_'){
            var start = BABYLON.Mesh.CreatePlane("start", size, scene, false, BABYLON.Mesh.DOUBLESIDE);
            start.position = new BABYLON.Vector3(-(i-xOffset) * size ,size,(0 - yOffset) * size);
            start.material = new BABYLON.StandardMaterial("startTex", scene);
            start.material.diffuseColor = new BABYLON.Color3(0,1,0);
            start.material.alpha = 0.4;

            camera.position.x = -(i-xOffset) * size;
            camera.position.y = size;
            camera.position.z = -yOffset * size - size;

        }
    });

    board[board.length -1].forEach(function(d, i) {
        if(d == '_'){
            var end = BABYLON.Mesh.CreatePlane("end", size, scene, false, BABYLON.Mesh.DOUBLESIDE);
            end.position = new BABYLON.Vector3(-(i-xOffset) * size ,size,((board.length -1) - yOffset) * size);
            end.material = new BABYLON.StandardMaterial("startTex", scene);
            end.material.diffuseColor = new BABYLON.Color3(1,0,0);
            end.material.alpha = 0.4;


        }
    });
}

function printBoard(board){
    board.forEach(function(d){
        console.log(d.toString());
    });
}
