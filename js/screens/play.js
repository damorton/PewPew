game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
	
		// load a level
		me.levelDirector.loadLevel("area01");
		// reset the score
		game.data.score = 0;
		
		// play the audio track
		me.audio.playTrack("dst-inertexponent");
		
		this.touched = false;	
		
		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
		// tap to jump
		me.input.registerPointerEvent('mousedown', me.game.viewport, this.onTouch);	
		me.input.registerPointerEvent('mouseup', me.game.viewport, this.onTouchEnd);	
	},
	
	onTouch: function(){
		
		playScreen.touched = true;		
	},
	
	onTouchEnd: function(){
		
		playScreen.touched = false;		
	},
	
	restart: function(){
		me.game.viewport.shake(12, 100);	
		me.game.viewport.fadeIn( '#000000', 200, function() {
			me.levelDirector.reloadLevel();
			me.state.current().changeLevel( );
		});
		game.data.deaths += 1;
		game.data.bullets = 0;
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
		
		// stop the current audio track
		me.audio.stopTrack();
	}
});
