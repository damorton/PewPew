game.TitleScreen = me.ScreenObject.extend({

	// constructor
	init: function(){
		this.parent(true);
		
		// title screen image
		this.title = null;
		this.font = null;
		this.scrollerfont = null;
		this.scrollertween = null;
		
		this.scroller = "Created by @MrDavidMorton";
		this.scrollerpos = 320;		
	},
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		if(this.title == null){
			this.title = me.loader.getImage("title_screen");
			// font to display the menu items
			//this.font = new me.BitmapFont("32x32_font", 32);
			this.font = new me.Font("Consolas", 16, "black");
			// set the scroller
			//this.scrollerfont = new me.BitmapFont("32x32_font", 32);
			this.scrollerfont = new me.Font("Consolas", 16, "black");
		}
		
		// reset to default value
		this.scrollerpos = 320;
		
		// a tween to animate the arrow
		this.scrollertween = new me.Tween(this).to({
			scrollerpos: -240
		}, 10000).onComplete(this.scrollover.bind(this)).start();
		
		// enable the keyboard
		me.input.bindKey(me.input.KEY.ENTER, "enter", true);
		
		// play something
		me.audio.play("cling");
	},
	
	scrollover: function(){	
		// reset to default values
		this.scrollerpos = 320;
		this.scrollertween = new me.Tween(this).to({
			scrollerpos: -240
		}, 10000).onComplete(this.scrollover.bind(this)).start();
	},
	
	// update function
	update: function(){
		// enter pressed
		if(me.input.isKeyPressed('enter')){
			me.state.change(me.state.PLAY);
		}
		return true;
	},
	
	// draw
	draw: function(context){
		context.drawImage(this.title, 0, 0);
		
		this.font.draw(context, "PRESS ENTER TO PLAY", 75, 150);
		this.scrollerfont.draw(context, this.scroller, this.scrollerpos, 220);
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		me.input.unbindKey(me.input.KEY.ENTER);
		
		// just in case
		this.scrollertween.stop();
	}
});
