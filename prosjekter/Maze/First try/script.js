var T = THREE;

var w = window.innerWidth/8,
    h = window.innerHeight/8;

//containing THREEjs

var scene = new T.Scene(),
    camera = new T.PerspectiveCamera(75, w/h, 0.1, 100),
    renderer = new T.WebGLRenderer();

renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

renderer.domElement.style.width = '100vw';
renderer.domElement.style.height = '100vh';

var light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 0, 5);

scene.add(light);

var map3d, mapArr,
    colors = [0xff0000, 0xff7f00, 0xffff00, 0x00ff00, 0x0000ff, 0x4b0082, 0x8b00ff];

function renderMap(map){

    //scene.__webglObjects = [];

    var end = map[1],
        map = map[0];

    var mapObjGeom = new T.BoxGeometry(0, 0, 0),
        mapObjMat = new T.MeshBasicMaterial(),
        mapObj = new T.Mesh(mapObjGeom, mapObjMat);

    map3d = mapObj;

    scene.add(map3d);

    for(var x = 0; x < map.length; ++x){

        for(var y = 0; y < map[x].length; ++y){

            for(var z = 0; z < map[x][y].length; ++z){

                if(map[x][y][z].wall){

                    var geometry = new T.BoxGeometry(1, 1, 1),
                        material = new T.MeshLambertMaterial(
                            {color:colors[(x + y + z) % colors.length]}
                        ),
                        plane = new T.Mesh(geometry, material);

                    plane.position.x = x;
                    plane.position.y = -y;
                    plane.position.z = z;

                    mapObj.add(plane);
                }

            }
        }
    }



    var endObjGeom = new T.BoxGeometry(.8, .8, .8),
        endObjMaterial = new T.MeshLambertMaterial({
            color:0xffffff,
            opacity:0.5,
            transparent:true
        }),
        endObj = new T.Mesh(endObjGeom, endObjMaterial);

    endObj.position.x = end.x;
    endObj.position.y = end.y;
    endObj.position.z = end.z;

    mapObj.add(endObj);

}

function genMap(w, h, d){
                //width, height, depth (x, y, z);

    var map = [],
        stack = [];

    for(var x = 0; x < w; ++x){

        map.push([]);
        for(var y = 0; y < h; ++y){

            map[x].push([]);
            for(var z = 0; z < d; ++z){

                var cell = new Cell(x, y, z);
                if(x%2 === 1 || y % 2 === 1 || z%2 === 1) cell.visit();

                map[x][y].push(cell);
            }
        }
    }

    mapArr = map;

    var currentCell = map[0][0][0];
    currentCell.demolish();

    var end = currentCell,
        longestPath = 0;

    while(getUnvisited(map).length > 0){

        var neighbours = getUnvisitedNeighbours(map, currentCell);

        if(neighbours.length > 0){
            stack.push(currentCell);

            currentCell = getRandomItem(neighbours);

            removeWall(map, currentCell, getLastItem(stack));

        } else if( stack.length > 0){

            if(stack.length > longestPath){
                end = currentCell;
                longestPath = stack.length;
            }

            stack.pop();

            currentCell = getLastItem(stack);

        } else {

            currentCell = getRandomItem(getUnvisited(map));
        }

    }

    return [map, end];
}
function removeWall(map, cell1, cell2){
    cell1.demolish();
    cell2.demolish();

    var x = (cell1.x + cell2.x)/2,
        y = (cell1.y + cell2.y)/2,
        z = (cell1.z + cell2.z)/2;

    getCell(map, x, y, z).demolish();
}
function getRandomItem(ar){

    return ar[(Math.random() * ar.length) | 0];
}
function getLastItem(ar){
    return ar[ar.length-1];
}
function getNeighbours(map, cell){
    var neighbours = [],
        x = cell.x,
        y = cell.y,
        z = cell.z;

    neighbours.push(
        getCell(map, x + 2, y, z),
        getCell(map, x - 2, y, z),
        getCell(map, x, y + 2, z),
        getCell(map, x, y - 2, z),
        getCell(map, x, y, z + 2),
        getCell(map, x, y, z - 2)
    );

    return neighbours.filter(Boolean);
}
function getUnvisitedNeighbours(map, cell){

    var neighbours = getNeighbours(map, cell);

    return neighbours.filter(function(item){
        return !item.visited;
    });
}

function getCell(map, x, y, z){
    if(map[x] && map[x][y]) return map[x][y][z];
}

function getUnvisited(map){

    var width = map.length,
        height = map[0].length,
        depth = map[0][0].length,
        unvisited = [];

    for(var x = 0; x < width; ++x){

        for(var y = 0; y < height; ++y){

            for(var z = 0; z < depth; ++z){

                if(!map[x][y][z].visited) unvisited.push(map[x][y][z]);
            }
        }
    }

    return unvisited;
}

function Cell(x, y, z){
    this.visited = false;
    this.wall = true;

    this.x = x;
    this.y = y;
    this.z = z;
}
Cell.prototype.visit = function(){ this.visited = true;};
Cell.prototype.demolish = function(){
    this.visit();
    this.wall = false;
};

var pos = {
    x:0,
    y:0,
    z:0
};
var rot = {
    x:0,
    y:Math.PI,
    z:0
};
var directionKeys = [37, 40, 39, 38, 87, 83];
var directions = ['left', 'up', 'right', 'down', 'backward', 'forward'];
                //0     , 1   , 2      , 3     , 4          , 5
var currentDirection = 5;
var controls = {
    left:{
        dir:[4, 1, 5, 3],
        go: [-1, 0, 0]
    },
    up:{
        dir:[0, 4, 2, 5],
        go: [0, 1, 0]
    },
    right:{
        dir:[5, 1, 4, 3],
        go: [1, 0, 0]
    },
    down:{
        dir:[0, 5, 2, 4],
        go: [0, -1, 0]
    },
    forward:{
        dir:[0, 1, 2, 3],
        go: [0, 0, -1]
    },
    backward:{
        dir:[2, 3, 0, 1],
        go: [0, 0, 1]
    }
};

var quaternion = Math.PI/2;

document.addEventListener('keydown', function(e){
    var directionIndex = directionKeys.indexOf(e.keyCode),
        eventDirection = directions[ directionIndex ];

    if(directionIndex === -1) return;

    if(directionIndex < 4){
        //debugger;
        currentDirection = controls[ directions[currentDirection] ].dir[directionIndex];

        switch(eventDirection){
            case 'left': rot.y += quaternion; break;
            case 'up': rot.x += quaternion; break;
            case 'right': rot.y -= quaternion; break;
            case 'down': rot.x -= quaternion; break;
        }
    } else {
        var targetDirection = controls[ directions[currentDirection] ].go;

        if(eventDirection === 'backward'){
            move(targetDirection, -1);

        } else if(eventDirection === 'forward'){
            move(targetDirection, 1);
        }
    }
});

function move(array, direction){
    var x = array[0] * direction,
        y = array[1] * direction,
        z = array[2] * direction,

        //new X, Y, Z
        nX = pos.x + x,
        nY = pos.y + y,
        nZ = pos.z + z;

    var target = getCell(mapArr, nX, nY, nZ);

    if(target && !target.wall){
        pos.x = nX;
        pos.y = nY;
        pos.z = nZ;
    }
}

function useMap(x, y, z){
    renderMap(genMap(x, y, z));
}
useMap(21, 2, 21);

function anim(){
    window.requestAnimationFrame(anim);

    camera.rotation.x = camera.rotation.x + (rot.x - camera.rotation.x)/30;
    camera.rotation.y = camera.rotation.y + (rot.y - camera.rotation.y)/30;
    camera.rotation.z = camera.rotation.z + (rot.z - camera.rotation.z)/30;

    camera.position.x = camera.position.x + (pos.x - camera.position.x)/30;
    camera.position.y = camera.position.y + (pos.y - camera.position.y)/30;
    camera.position.z = camera.position.z + (pos.z - camera.position.z)/30;

    light.position.set(camera.position.x, camera.position.y, camera.position.z);

    renderer.render(scene, camera);
}

anim();
