/*
	coin entity
*/

game.CoinEntity = me.CollectableEntity.extend({
	
	// extending the init function is not necessary
	// unless adding more initialization code
	init: function(x, y, settings){
		// call the parent constructor
		this.parent(x, y, settings);
	}, 
	
	// this function is called by the engine when
	// an object is touched by something
	onCollision: function(){
		// do something when collected
		
		// play sfx 
		me.audio.play("cling");
		
		// give some score
		game.data.bullets += 3;
		
		// make sure it can no longer be collected again
		this.collidable = false;
		
		this.updateColRect(8, 17, 15, 17);
		
		// remove it
		me.game.remove(this);
		
	}
});