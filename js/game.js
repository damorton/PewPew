
/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		// score
		score : 0,
		lives : 3,
		deaths : 0,
		bullets : 0, 
		godMode : false
	},
	
    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init("screen", 320, 240, true, 'auto')) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }
		
		/*
		// Firefox - register controllers
		controllers = {};
		function connecthandler(e) {
			console.log("Controller connected");
			addgamepad(e.gamepad);
		}
		function addgamepad(gamepad) {
			controllers[gamepad.index] = gamepad;
		}

		function disconnecthandler(e) {
			removegamepad(e.gamepad);
		}

		function removegamepad(gamepad) {			
			delete controllers[gamepad.index];
		}
		
		window.addEventListener("gamepadconnected", connecthandler);
		window.addEventListener("gamepaddisconnected", disconnecthandler);
		
		
		// Chrome - register controllers and scan its status
		if (navigator.webkitGetGamepads) {
			console.log("Controller connected");
			setInterval(scangamepads, 20);			
		}		
		function scangamepads() {
			gamepads = navigator.webkitGetGamepads();
			for (var i = 0; i < gamepads.length; i++) {
				if (gamepads[i]) {
					if (!(gamepads[i].index in controllers)) {
						addgamepad(gamepads[i]);
					} else {
						controllers[gamepads[i].index] = gamepads[i];
					}
				}
			}
		}
		*/
		// add "#debug" to the URL to enable the debug Panel
		if (document.location.hash === "#debug") {
			window.onReady(function () {
				me.plugin.register.defer(debugPanel, "debug");
			});
		}

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);
     
        // Load the resources.
        me.loader.preload(game.resources);

        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
    },



    // Run on game resources loaded.
    "loaded" : function () {
		
		titleScreen = new game.TitleScreen();
		playScreen = new game.PlayScreen();
        me.state.set(me.state.TITLE, titleScreen);
        me.state.set(me.state.PLAY, playScreen);
		
		me.state.transition("fade", "#FFFFFF", 250);
		
		// add our player entity in the entity pool
		me.entityPool.add("mainPlayer", game.PlayerEntity);
		me.entityPool.add("CoinEntity", game.CoinEntity);
		me.entityPool.add("EnemyEntity", game.EnemyEntity);
			
		// enable the keyboard
		// TODO bind shift key for sprinting
		me.input.bindKey(me.input.KEY.LEFT, "left");
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		me.input.bindKey(me.input.KEY.UP, "up");
		me.input.bindKey(me.input.KEY.DOWN, "down");
		me.input.bindKey(me.input.KEY.SHIFT, "shift");
		me.input.bindKey(me.input.KEY.Z, "fire");		
		me.input.bindKey(me.input.KEY.X, "jump", true);

        // Start the game.
        me.state.change(me.state.TITLE);
    }
};