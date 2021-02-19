  window.addEventListener('DOMContentLoaded', function() {
      canvas = document.getElementById('renderCanvas');
      engine = new BABYLON.Engine(canvas, true);

      scene = createScene();

      board = makeMaze(15,15);

      miniMap = miniMap().board(board);

      engine.runRenderLoop(function() {
          miniMap.drawMap();
         scene.render();
      });

      window.addEventListener('resize', function() {
        engine.resize();
      });





      buildWorld(board);

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
		keys.push({ frame: 10, value: cam.position.y + 5 });
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
          console.log(key + " pressed");

          if (canJump && key == 32) {
             cameraJump();
             canJump = false;
             setTimeout(function () {
                 canJump = true;
             }, 1000);
         }else if (key == 96) {
             console.log(Math.round(camera.position.x), Math.round(camera.position.y), Math.round(camera.position.z));
         }
      };

      window.onkeydown = function(e){
          var key = e.keyCode ? e.keyCode : e.which;
          if(key == 16){
              camera.speed = 3;
          }
      };
      window.onkeyup = function(e){
          var key = e.keyCode ? e.keyCode : e.which;
          if(key == 16){
              camera.speed = 1;
          }
      };



  });
