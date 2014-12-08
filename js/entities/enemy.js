/**
 * Enemy Entity
 */
game.EnemyEntity = me.ObjectEntity.extend(
{	
	init: function (x, y, settings)
	{
		// define this here instead of tiled
		settings.image = "wheelie_right";
		settings.spritewidth = 32;
		
		// call the parent constructor
		this.parent(x, y , settings);
		
		this.startX = x;
		this.endX   = x+settings.width - settings.spritewidth; // size of sprite
		
		
		// make him start from the right
		this.pos.x = x + settings.width - settings.spritewidth;
		this.walkLeft = true;

		// walking & jumping speed
		this.setVelocity(1, 6);
		
		// make it collidable
		this.collidable = true;
		this.type = me.game.ENEMY_OBJECT;
		
		// bounding box
		//this.updateColRect(-1,0,4,20);
		
	},
	
		
	onCollision : function (res, obj)
	{
			
		// res.y >0 means touched by something on the bottom
		// which mean at top position for this one
		if (this.alive && (res.y > 0) && obj.falling)
		{
			//this.renderable.flicker(20);
			
		}
	},

	
	// manage the enemy movement
	update : function ()
	{
		// do nothing if not in viewport
		if (!this.inViewport)
			return false;
			
		if (this.alive)
		{
			if (this.walkLeft && this.pos.x <= this.startX)
			{
				this.walkLeft = false;
			}
			else if (!this.walkLeft && this.pos.x >= this.endX)
			{
				this.walkLeft = true;
			}
			
			this.flipX(this.walkLeft);
			this.vel.x += (this.walkLeft) ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick;

		}
		else
		{
			this.vel.x = 0;
		}
		// check & update movement
		this.updateMovement();
			
		if (this.vel.x!=0 ||this.vel.y!=0)
		{
			// update the object animation
			this.parent();
			return true;
		}
		return false;
	}
});