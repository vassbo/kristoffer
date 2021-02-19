
window.addEventListener('DOMContentLoaded', function() {
      // set up canvas and 3D engine
      var canvas = document.getElementById('renderCanvas');
      var engine = new BABYLON.Engine(canvas, true);



      // pointer lock object forking for cross browser
      canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;
      document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;

      canvas.onclick = function() {
        canvas.requestPointerLock();
      };

      // pointer lock event listeners
      // Hook pointer lock state change events for different browsers
      document.addEventListener('pointerlockchange', lockChangeAlert, false);
      document.addEventListener('mozpointerlockchange', lockChangeAlert, false);

      function lockChangeAlert() {
        if(document.pointerLockElement === canvas ||
        document.mozPointerLockElement === canvas) {
          console.log('The pointer lock status is now locked');
          document.addEventListener("mousemove", canvasLoop, false);
        } else {
          console.log('The pointer lock status is now unlocked');
          document.removeEventListener("mousemove", canvasLoop, false);
        }
      }


      function canvasLoop(e) {
        var movementX = e.movementX || e.mozMovementX || 0;
        var movementY = e.movementY || e.mozMovementY ||  0;
        x += movementX;
        y += movementY;
        canvasDraw();
        console.log("X position: " + x + ', Y position: ' + y);
      }

      // helper function
      function degToRad(degrees) {
        var result = Math.PI/180 * degrees;
        return result;
      }




      // create a scene
      var createScene = function() {
      	// create a basic scene object
      	var scene = new BABYLON.Scene(engine);

      	// create camera
        var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(-63, 1, 14), scene); // (0, 1, -8)
        camera.attachControl(canvas, true);

//Set gravity for the scene (G force like, on Y-axis)
    scene.gravity = new BABYLON.Vector3(0, -0.9, 0);



    // Enable Collisions
    scene.collisionsEnabled = true;

    //Then apply collisions and gravity to the active camera
    camera.checkCollisions = true;
    camera.applyGravity = true;

    //Set the ellipsoid around the camera (e.g. your player's size)
    camera.ellipsoid = new BABYLON.Vector3(1.4, 3, 1.4);

    camera.keysUp = [87]; // W
    camera.keysDown = [83]; // S
    camera.keysLeft = [65]; // A
    camera.keysRight = [68]; // D
    camera.speed = [0.8];
    camera.angularSensibility = [3000];
    // camera.fov = [1000];

    // Create rendering pipeline
    // var pipeline = new BABYLON.StandardRenderingPipeline("standard", scene, 1.0, null, [camera]);
    // pipeline.lensTexture = pipeline.lensFlareDirtTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/lensdirt.jpg", scene);
    // pipeline.lensStarTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/lensstar.png", scene);
    // pipeline.lensColorTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/lenscolor.png", scene);
    // pipeline.MotionBlurEnabled = true;
    // pipeline.motionStrength = 0.5;
    // pipeline.motionBlurSamples = 32;
    // pipeline.DepthOfFieldEnabled = true;
    // pipeline.depthOfFieldDistance = 20;


    // camera.inertia = this.inertia;
    // camera.angularSensibility = this.angularSensibility;
    // return cam;

    // _initPointerLock : function() {
    //     var _this = this;
    //     // Request pointer lock
    //     var canvas = this.scene.getEngine().getRenderingCanvas();
    //     // On click event, request pointer lock
    //     canvas.addEventListener("click", function(evt) {
    //         canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
    //         if (canvas.requestPointerLock) {
    //             canvas.requestPointerLock();
    //         }
    //     }, false);
    //
    //     // Event listener when the pointerlock is updated (or removed by pressing ESC for example).
    //     var pointerlockchange = function (event) {
    //         _this.controlEnabled = (
    //                            document.mozPointerLockElement === canvas || document.webkitPointerLockElement === canvas || document.msPointerLockElement === canvas || document.pointerLockElement === canvas);
    //         // If the user is alreday locked
    //         if (!_this.controlEnabled) {
    //             _this.camera.detachControl(canvas);
    //         } else {
    //             _this.camera.attachControl(canvas);
    //         }
    //     };
    //
    //     // Attach events to the document
    //     document.addEventListener("pointerlockchange", pointerlockchange, false);
    //     document.addEventListener("mspointerlockchange", pointerlockchange, false);
    //     document.addEventListener("mozpointerlockchange", pointerlockchange, false);
    //     document.addEventListener("webkitpointerlockchange", pointerlockchange, false);
    // }


    //
    // window.addEventListener("keyup", onKeyUp, false);
    // function onKeyUp(event) {
    //   switch (event.keyCode) {
    //     case 32:
    //     camera.position.y += 1;
    //     camera.position.y += 1;
    //     camera.position.y += 1;
    //     camera.position.y -= 1;
    //     // camera.position.y -= 1;
    //     // camera.position.y -= 1;
    //     break;
    //   }}


    // var camera = this.scene.cameras[0];
    // camera.animations = [];
    // var a = new BABYLON.Animation(    "a",    "position.y", 20,    BABYLON.Animation.ANIMATIONTYPE_FLOAT,    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    //
    // // Animation keys
    // var keys = [];
    // keys.push({ frame: 0, value: camera.position.y });
    // keys.push({ frame: 10, value: camera.position.y + 2 });
    // keys.push({ frame: 20, value: camera.position.y });
    // a.setKeys(keys);var easingFunction = new BABYLON.CircleEase();
    // easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
    // a.setEasingFunction(easingFunction);
    // camera.animations.push(a);
    // this.scene.beginAnimation(camera, 0, 20, false);

    //finally, say which mesh will be collisionable
    // ground.checkCollisions = true;
    // box.checkCollisions = true;





//         scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
//         camera.applyGravity = true;
//         //Set the ellipsoid around the camera (e.g. your player's size)
// camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
// Enable Collisions
// scene.collisionsEnabled = true;
// camera.checkCollisions = true;
// ground.checkCollisions = true;
// box.checkCollisions = true;

// var speedCharacter = 8;
// var gravity = 0.15;
// // var character = Your mesh;
//
// character.ellipsoid = new BABYLON.Vector3(0.5, 1.0, 0.5);
// character.ellipsoidOffset = new BABYLON.Vector3(0, 1.0, 0);
//
// var forwards = new BABYLON.Vector3(parseFloat(Math.sin(character.rotation.y)) / speedCharacter, gravity, parseFloat(Math.cos(character.rotation.y)) / speedCharacter);
// forwards.negate();
// character.moveWithCollisions(forwards);
// // or
// var backwards = new BABYLON.Vector3(parseFloat(Math.sin(character.rotation.y)) / speedCharacter, -gravity, parseFloat(Math.cos(character.rotation.y)) / speedCharacter);
// character.moveWithCollisions(backwards);
//
// camera.collisionRadius = new BABYLON.Vector3(0.5, 0.5, 0.5);





        //var camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 8, 60, new BABYLON.Vector3(0, 20, -60), scene);
        camera.setTarget(new BABYLON.Vector3(3, 0, 10));
        camera.attachControl(canvas, true);

      	// create light
      	var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 10, 0), scene);
        var roofLight = new BABYLON.HemisphericLight("roofLight", new BABYLON.Vector3(0, -10, 0), scene);
        // var light2 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(2, -5, -2), scene);

      //   light.diffuse = new BABYLON.Color3(1, 1, 1);
      // light.specular = new BABYLON.Color3(1, 1, 1);
      // light.range = 300;


        var material = new BABYLON.StandardMaterial('material1', scene);
        material.diffuseTexture = new BABYLON.Texture('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8v2vnBuSfULt3Opp4kV-WwKFe_9TJ4fQUC4gDrOW3fJCKgWYM', scene);
        // Original: https://github.com/zoe2000/3D-Maze-Demo/blob/master/wall.jpg
        // Steel: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8v2vnBuSfULt3Opp4kV-WwKFe_9TJ4fQUC4gDrOW3fJCKgWYM
        // Wood: https://static.vecteezy.com/system/resources/previews/000/210/125/non_2x/vector-grunge-wood-texture-background.jpg
        // Bush: https://thumbs.dreamstime.com/b/shrubbery-green-hedges-background-texture-79630425.jpg


        // create a general function to create box
        function createWall(length, isVertical, positionX, positionZ) {
          // length - width of the wall
          // width - thickness of the wall, 2 by default
          // height - height of the wall, 10 by default
          // isVertical -  boolean, horizontal by default
          // positionX - left to right
          // positionZ - top to down
          var defaultHeight = 10;
          var defaultWidth = 2;

          var box = BABYLON.Mesh.CreateBox('box', 1.0, scene);
          box.scaling.x = length*3;
          box.scaling.y = defaultHeight;
          box.scaling.z = defaultWidth*3;
          box.material = material;
          if (isVertical) {
            box.rotation.y = Math.PI/2;
          }
          box.position.x = positionX*3;
          box.position.z = positionZ*3;
          box.checkCollisions = true;
        }
      	// create sphere shape
        // first horizontal wall
      	var sideTop = createWall(34, false, 0, 0);
        // left wall
        var sideLeft = createWall(38, true, -21, -20);
        // bottom wall
        var sideBottom = createWall(38, false, -3, -40);
        // right wall
        var sideRight = createWall(36, true, 18, -17);

        // from left to right
        createWall(4, true, -16 ,-3);
        createWall(4, true, -12, -5);
        createWall(4, false, -9, -4);
        createWall(6, true, -16, -10);
        createWall(4, false, -13, -8);

        createWall(8, false, -13, -12);
        createWall(6, true, -8, -10);
        createWall(14, false, 0, -8);
        createWall(4, true, -2, -5);
        createWall(16, false, 9, -4);
        createWall(4, true, 8, -9);
        createWall(4, true, 12, -9);
        createWall(6, false, 10, -12);
        createWall(8, false, -1, -12);

        createWall(4, false, -18, -16);
        createWall(4, false, -18, -20);
        createWall(10, true, -12, -18);
        createWall(6, true, -8, -18);
        createWall(6, false, -4, -16);
        createWall(8, true, 0, -19);
        createWall(12, true, 4, -17);
        createWall(8, true, 8, -17);
        createWall(8, true, 12, -19);
        createWall(12, false, -10, -24);
        createWall(16, false, 9, -24);
        createWall(6, true, 0, -24);
        createWall(12, true, -3, -26);
        createWall(6, false, -16, -30);
        createWall(4, false, -15, -34);
        createWall(6, true, -12, -32);
        createWall(10, true, -8, -34);
        createWall(8, false, 0, -32);
        createWall(4, true, 5, -31);
        createWall(8, false, 8, -28);
        createWall(12, true, 13, -33);
        createWall(4, true, 8, -37);

        // var ground = BABYLON.Mesh.CreateGround("ground1", 200, -200, 1, scene);

        // Ground
        var ground = BABYLON.Mesh.CreatePlane("ground", 150.0, scene);
        // var terrainMaterial = new BABYLON.TerrainMaterial("terrainMaterial", scene);
        // terrainMaterial.diffuseTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/grass.png", scene);
        // ground.material = terrainMaterial;
        // ground.material = new BABYLON.StandardMaterial("material2", scene);
        // ground.diffuseTexture = new BABYLON.Texture('https://www.babylonjs-playground.com/textures/grass.png', scene);
        // ground.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
        // ground.material.backFaceCulling = false;
        ground.position = new BABYLON.Vector3(0, -5, -50);
        ground.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);
        ground.checkCollisions = true;

        // var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "textures/heightMap.png", 100, 100, 100, 0, 10, scene, false);
	var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
	groundMaterial.diffuseTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/ground.jpg", scene);
	groundMaterial.diffuseTexture.uScale = 20;
	groundMaterial.diffuseTexture.vScale = 20;
	// groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	ground.material = groundMaterial;



  // Slope
  var slope = BABYLON.Mesh.CreatePlane("slope", 14.24, scene);
  slope.position = new BABYLON.Vector3(6, 0, -63.92);
  slope.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);
  slope.rotation.x = 580.4;
  slope.checkCollisions = true;
  //
  var slopeMaterial = new BABYLON.StandardMaterial("slope", scene);
	slopeMaterial.diffuseTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/ground.jpg", scene);
	slopeMaterial.diffuseTexture.uScale = 2;
	slopeMaterial.diffuseTexture.vScale = 2;
	slope.material = slopeMaterial;



  // var f = new BABYLON.Vector4(0.5,0, 1, 1); // front image = half the whole image along the width
  // var b = new BABYLON.Vector4(0,0, 0.5, 1); // back image = second half along the width
  // var roof = BABYLON.MeshBuilder.CreatePlane("roof", {height:1, width: 0.665, sideOrientation: BABYLON.Mesh.DOUBLESIDE, frontUVs: f, backUVs: b}, scene);


  var roof = BABYLON.Mesh.CreatePlane("roof", 150.0, scene);
  roof.position = new BABYLON.Vector3(0, 5, -50);
  roof.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);
  // roof.rotation.y = Math.PI/2;
  roof.rotation.x = 300.01; // Math.PI / 4;
  // roof.checkCollisions = true;

  var roofMaterial = new BABYLON.StandardMaterial("roof", scene);
  roofMaterial.diffuseTexture = new BABYLON.Texture("https://st2.depositphotos.com/4977761/11538/i/950/depositphotos_115386868-stock-photo-texture-of-a-dark-stone.jpg", scene);
  roofMaterial.diffuseTexture.uScale = 20;
  roofMaterial.diffuseTexture.vScale = 20;
  roof.material = roofMaterial;





  // var music = new BABYLON.Sound("music", "music.wav",
  //     scene, null, { loop: true, autoplay: true, spatialSound: true });

      // Load the sound and play it automatically once ready
      // var music1 = new BABYLON.Sound("Violons11", "https://www.babylonjs-playground.com/sounds/violons11.wav", scene,
      //     soundReady, { loop: true });
      // var music2 = new BABYLON.Sound("Violons18", "https://www.babylonjs-playground.com/sounds/violons18.wav", scene,
      //     soundReady, { loop: true });
      // var music3 = new BABYLON.Sound("Cellolong", "https://www.babylonjs-playground.com/sounds/cellolong.wav", scene,
      //     soundReady, { loop: true });
      //
      // var soundsReady = 0;
      //
      // function soundReady() {
      //     soundsReady++;
      //     if (soundsReady === 3) {
      //         music1.play();
      //         music2.play();
      //         music3.play();
      //     }
      // }




        // var skyMaterial = new BABYLON.SkyMaterial("skyMaterial", scene);
        // skyMaterial.backFaceCulling = false;
        //
        // skyMaterial.turbidity = 1; // Represents the amount (scattering) of haze as opposed to molecules in atmosphere
        // skyMaterial.luminance = 1; // Controls the overall luminance of sky in interval ]0, 1,190[
        //
        // // Control the planet's orientation over the sun
        // skyMaterial.inclination = 0.5; // The solar inclination, related to the solar azimuth in interval [0, 1]
        // skyMaterial.azimuth = 0.25; // The solar azimuth in interval [0, 1]
        //
        // // Manually set the sun position
        // skyMaterial.useSunPosition = true; // Do not set sun position from azimuth and inclination
        // skyMaterial.sunPosition = new BABYLON.Vector3(0, 100, 0);
        // skyMaterial.rayleigh = 2; // Represents the sky appearance (globally)
        //
        // // Mie scattering (from [Gustav Mie](https://en.wikipedia.org/wiki/Gustav_Mie))
        // // Related to the haze particles in atmosphere
        //
        // // The amount of haze particles following the Mie scattering theory
        // skyMaterial.mieDirectionalG = 0.8;
        //
        // skyMaterial.mieCoefficient = 0.005; // The mieCoefficient in interval [0, 0.1], affects the property skyMaterial.mieDirectionalG
        //
        // // Set the horizon elevation relative to the camera position
        // skyMaterial.cameraOffset.y = scene.activeCamera.globalPosition.y;
        //
        // var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
        // skybox.material = skyMaterial;





        // Skybox
         var skybox = BABYLON.Mesh.CreateBox("skyBox", 5000.0, scene);
         var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
         skyboxMaterial.backFaceCulling = false;
         skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("https://www.babylonjs.com/assets/skybox/TropicalSunnyDay", scene);
         skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
         skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
         skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
         skyboxMaterial.disableLighting = true;
         skybox.material = skyboxMaterial;

         // skyboxMaterial.turbidity = 1; // Represents the amount (scattering) of haze as opposed to molecules in atmosphere
         // skyboxMaterial.luminance = 1; // Controls the overall luminance of sky in interval ]0, 1,190[
         // //
         // // // Control the planet's orientation over the sun
         // skyboxMaterial.inclination = 0.5; // The solar inclination, related to the solar azimuth in interval [0, 1]
         // skyboxMaterial.azimuth = 0.25; // The solar azimuth in interval [0, 1]
         // //
         // // // Manually set the sun position
         // skyboxMaterial.useSunPosition = true; // Do not set sun position from azimuth and inclination
         // skyboxMaterial.sunPosition = new BABYLON.Vector3(0, 100, 0);
         // skyboxMaterial.rayleigh = 2; // Represents the sky appearance (globally)
         // //
         // // // Mie scattering (from [Gustav Mie](https://en.wikipedia.org/wiki/Gustav_Mie))
         // // // Related to the haze particles in atmosphere
         // //
         // // // The amount of haze particles following the Mie scattering theory
         // skyboxMaterial.mieDirectionalG = 0.8;
         // //
         // skyboxMaterial.mieCoefficient = 0.005; // The mieCoefficient in interval [0, 0.1], affects the property skyMaterial.mieDirectionalG

         // scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
         scene.fogDensity = 0.08;
         scene.fogColor = new BABYLON.Color3(0.7, 0.7, 0.7); // 0.9, 0.9, 0.85


// Flashlight
var light0 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 100, 100), scene);
light0.parent = camera;
// if(event.delta > 0) {
//   camera.radius += 2; //Distance > between the camera and the target
// } else if(event.delta < 0) {
//   camera.radius -= 2; //Distance < between the camera and the target
// }
// // camera.target = new BABYLON.Vector3(box.position.x, box.position.y + 5, box.position.z);// The camera looks at the target
// camera.radius = 30; //Distance between the camera and the target





         var cameraJump = function() {
   		var cam = scene.cameras[0];

   		cam.animations = [];

   		var a = new BABYLON.Animation(
   		    "a",
   		    "position.y", 20,
   		    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
   		    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

   		// Animation keys
   		var keys = [];
   		keys.push({ frame: 0, value: cam.position.y });
      // keys.push({ frame: 5, value: cam.position.y + 3 });
   		keys.push({ frame: 12, value: cam.position.y + 7 });
      // keys.push({ frame: 15, value: cam.position.y + 3 });
   		keys.push({ frame: 20, value: cam.position.y });
   		a.setKeys(keys);

   		var easingFunction = new BABYLON.CircleEase();
   		easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
   		a.setEasingFunction(easingFunction);

   		cam.animations.push(a);



   		scene.beginAnimation(cam, 0, 20, false);
   	};
    var canJump = true;

         window.onkeypress = function(e){
             var key = e.keyCode ? e.keyCode : e.which;
             // console.log(key + " pressed");

             if (canJump && key == 32) {
                cameraJump();
                canJump = false;
                setTimeout(function () {
                    canJump = true;
                }, 1000);
            }
         };

         window.onkeydown = function(e){
             var key = e.keyCode ? e.keyCode : e.which;
             if(key == 16 || key == 82){ // Sprint (shift/r)
                 camera.speed = 1.6;
                 camera.fov = [0.9];
             } else if(key == 90){ // Zoom (z)
                 camera.fov = [0.3];
             } else if(key == 88){ // Fly (x)
                 camera.applyGravity = false;
             } else if(key == 67){ // No-clip (c)
                 box.checkCollisions = false;
             } else if (key == 8) { // Spawn (Backspace)
               camera.position.x = -63;
               camera.position.y = 1;
               camera.position.z = 14;
             } else if (key == 96) { // Coordinates (Numpad 0)
                 console.log(Math.round(camera.position.x), Math.round(camera.position.y), Math.round(camera.position.z));
             }
         };
         window.onkeyup = function(e){
             var key = e.keyCode ? e.keyCode : e.which;
             if(key == 16 || key == 82){
                 camera.speed = 0.8;
                 camera.fov = [0.8];
             } else if(key == 90){
                 camera.fov = [0.8];
             } else if(key == 88){
                 camera.applyGravity = true;
             } else if(key == 67){
                 box.checkCollisions = true;
             }
         };






//          var lensFlareSystem = new BABYLON.LensFlareSystem("lensFlareSystem", light0, scene);
//          var flare00 = new BABYLON.LensFlare(0.2, 0, new BABYLON.Color3(1, 1, 1), "https://www.babylonjs.com/assets/lens5.png", lensFlareSystem);
// var flare01 = new BABYLON.LensFlare(0.5, 0.2, new BABYLON.Color3(0.5, 0.5, 1), "https://www.babylonjs.com/assets/lens4.png", lensFlareSystem);
// var flare02 = new BABYLON.LensFlare(0.2, 1.0, new BABYLON.Color3(1, 1, 1), "https://www.babylonjs.com/assets/lens4.png", lensFlareSystem);
// var flare03 = new BABYLON.LensFlare(0.4, 0.4, new BABYLON.Color3(1, 0.5, 1), "https://www.babylonjs.com/assets/Flare.png", lensFlareSystem);
// var flare04 = new BABYLON.LensFlare(0.1, 0.6, new BABYLON.Color3(1, 1, 1), "https://www.babylonjs.com/assets/lens5.png", lensFlareSystem);
// var flare05 = new BABYLON.LensFlare(0.3, 0.8, new BABYLON.Color3(1, 1, 1), "https://www.babylonjs.com/assets/lens4.png", lensFlareSystem);





      	return scene;

      };
      var scene = createScene();

      // register a render loop to repeatedly render the scene
      engine.runRenderLoop(function() {
      	scene.render();
      });

      // watch for browser/canvas resize events
      window.addEventListener('resize', function(){
      	engine.resize();
      });
    });
