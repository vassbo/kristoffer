var createScene = function(){
    // create a basic BJS Scene object
    var scene = new BABYLON.Scene(engine);

    // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
    camera = new BABYLON.UniversalCamera("Camera", new BABYLON.Vector3(0,0 ,0), scene);
    //BABYLON.ArcRotateCamera("ArcRotateCamera", Math.PI/2, Math.PI/4, 200, new BABYLON.Vector3(0, 0, 0), scene);

    var light2 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 1, 0), scene);
    light2.diffuse = new BABYLON.Color3(1, 1, 1);
    light2.specular = new BABYLON.Color3(1, 1, 1);
    light2.groundColor = new BABYLON.Color3(0, 0, 0);
    light2.intensity = 0.3;


    camera.speed = 1;

    camera.keysUp = [87, 38]; // W
    camera.keysDown = [83, 40]; // S
    camera.keysLeft = [65, 37]; // A
    camera.keysRight = [68, 39]; // D

    // target the camera to scene origin
    //camera.setTarget(BABYLON.Vector3.Zero());

    // attach the camera to the canvas
    camera.attachControl(canvas, false);

    scene.gravity = new BABYLON.Vector3(0,-0.5,0);

    camera.applyGravity = true;

    camera.ellipsoid = new BABYLON.Vector3(1, 2, 1);

    scene.collisionsEnabled = true;
    camera.checkCollisions = true;

    //scene.workerCollisions = true;

    // create a basic light, aiming 0,1,0 - meaning, to the sky
    // var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);

    //fog

    scene.fogMode = BABYLON.Scene.FOGMODE_EXP2;
    scene.fogDensity = 0.03;
    // var halloweenIncarnate = new BABYLON.SpotLight("Spot0", camera.position, camera.rotation, 0.8, 2, scene);
    // var halloweenIncarnate = new BABYLON.PointLight("Spot0", camera.position, scene);

    // halloweenIncarnate.intensity = 1;
    // halloweenIncarnate.range = 20;


    BABYLON.SceneOptimizer.OptimizeAsync(scene);
    // return the created scene
    return scene;
};
