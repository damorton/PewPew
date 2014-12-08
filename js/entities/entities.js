// TODO
/*
	a player entity
*/

game.PlayerEntity = me.ObjectEntity.extend({
	
	/*
		constructor
	*/
	init: function(x, y, settings){
		
		// call the constructor
		this.parent(x, y, settings);
		
		// set the default horizontal and vertical speed (acceleration velocity)
		this.setVelocity(8, 17);
		
		// adjust the bounding box
		this.updateColRect(8, 48, -1, 0);
						
		// set the display/viewport to follow our players position on both axis
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
		
	},
	
	/*
		update the player position
	*/
	update: function(){
				
		if (me.input.isKeyPressed('left'))
		{
			// flip the sprite on horizontal axis
			this.flipX(true);
			// update the entity velocity
			this.vel.x -= this.accel.x * me.timer.tick;
		}
		else if (me.input.isKeyPressed('right'))
		{
			// unflip the sprite
			this.flipX(false);
			// update the entity velocity
			this.vel.x += this.accel.x * me.timer.tick;
		}
		else
		{
			this.vel.x = 0;
		}
		if (me.input.isKeyPressed('jump'))
		{	
			if (!this.jumping && !this.falling) 
			{
				// set current vel to the maximum defined value
				// gravity will then do the rest
				this.vel.y = -this.maxVel.y * me.timer.tick;
				// set the jumping flag
				this.jumping = true;				
			}
		}
		
		// check & update player movement
		updated = this.updateMovement();
		
		var res = me.game.collide(this);
		
		if(res){
			// if we collide with an enemy
			if(res.obj.type == me.game.ENEMY_OBJECT){
				// check if we jumped on it
				if((res.y > 0) && !this.jumping){
					// bounce (force jump)
					this.falling = false;
					this.vel.y = -this.maxVel.y * me.timer.tick;
					
					// set jumping flag
					this.jumping = true;
					
				}else{				
					 
				}
			}
		}
			 
		// update animation
		if (this.vel.x!=0 || this.vel.y!=0)
		{
			// update object animation
			this.parent();
			return true;
		}
		
		// else inform the engine we did not perform
		// any update (e.g. position, animation)
		return false;
		
	}
});