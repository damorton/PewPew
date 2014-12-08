/**
 * Player Entity
 */
game.PlayerEntity = me.ObjectEntity.extend(
{	
  
  /* -----

		constructor
		
	  ------			*/
	
	init:function (x, y, settings)
	{
		// call the constructor
		this.settings = settings;		
		this.parent(x, y , settings);
		
		// set the default horizontal & vertical speed (accel vector)
		this.setVelocity(3, 10);		
		
		// adjust the bounding box
		//this.updateColRect(-1, 0, -1, 0);
		
		// set the display to follow our position on both axis
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
	
		this.renderable.addAnimation("walk", [0, 1]);
		this.renderable.addAnimation("idle", [2, 3], 400);
		this.renderable.addAnimation("fire", [4], 400);
		
		this.renderable.setCurrentAnimation("idle");
		
		this.godMode = false;
		
		this.jumpCount = 0;
		this.maxJumps = 1;
		this.walkingSpeed = 1;
		this.sprintSpeed = 2;
		this.sprintIncreaseSpeed = .1;
		this.slowDownSpeed = .25;
		
	},
	
	fire: function(){
		if(game.data.bullets < 0){
			// out of bullets
			console.log("out of bullets " + game.data.bullets);
		}else{
			if(!this.renderable.isCurrentAnimation("fire"))this.renderable.setCurrentAnimation("fire");
			// fire bullet
			game.data.bullets -= 1;
		}
		
	},

	/* -----

		update the player pos
		
	  ------			*/
	update : function ()
	{	
			
		/*
		// godMode
		if(game.data.godMode){
			if(controllers[0].buttons[3] && this.yButtonReleased){
				console.log("god mode");
				if(this.godMode){
					this.godMode = false;;
					this.renderable.setCurrentAnimation("walk");
					this.gravity = .98;
				}else{
					this.godMode = true;
					this.renderable.setCurrentAnimation("god");
					this.gravity = .5;
				}
				
			}
		}
		
		
		
		// firing bullets
		if((me.input.isKeyPressed('left') || controllers[0].axes[0] == -1) ||
		(me.input.isKeyPressed('right') || controllers[0].axes[0] == 1) &&
		controllers[0].buttons[5]){
			console.log("trigger fired");
			if(!this.renderable.isCurrentAnimation("fire"))this.renderable.setCurrentAnimation("fire");
		}
		
		
		// sprinting - x button
		if((controllers[0].buttons[2] == 1 && (
			controllers[0].axes[0] == -1 || 
			controllers[0].axes[0] == 1))
			) {
			
			this.maxVel.x += this.sprintIncreaseSpeed;
			if(this.maxVel.x >= this.sprintSpeed) this.maxVel.x = this.sprintSpeed;
			
			this.animationspeed += 50;
		}else{
			this.maxVel.x -= this.slowDownSpeed;
			if(this.maxVel.x <= this.walkingSpeed) this.maxVel.x = this.walkingSpeed;
			
			this.animationspeed -= 50;
		}
		
		
	
		// flying
		if (me.input.isKeyPressed('up') || controllers[0].buttons[3] == 1)
		{				
			// update the entity velocity
			this.vel.y -= this.accel.y * me.timer.tick;
			if(this.vel.y >= 60) this.vel.y = 10;
		}
		
		
		if (me.input.isKeyPressed('left') || controllers[0].axes[0] == -1)
		{	
			if(controllers[0].buttons[5] && this.rightTrigButtonReleased){				
				this.fire();
			}else {
				if(!this.renderable.isCurrentAnimation("walk"))this.renderable.setCurrentAnimation("walk");
			}
			
			// flip the sprite on horizontal axis
			this.flipX(true);
			// update the entity velocity
			this.vel.x -= this.accel.x * me.timer.tick;				
		}
		else if (me.input.isKeyPressed('right') || controllers[0].axes[0] == 1)
		{	
			if(controllers[0].buttons[5] && this.rightTrigButtonReleased){				
				this.fire();
			}else {
				if(!this.renderable.isCurrentAnimation("walk"))this.renderable.setCurrentAnimation("walk");
			}
			
			// unflip the sprite
			this.flipX(false);
			// update the entity velocity
			this.vel.x += this.accel.x * me.timer.tick;			
		}else {	
			if(controllers[0].buttons[5] && this.rightTrigButtonReleased){
				
				this.fire();
			}else {
				if(!this.renderable.isCurrentAnimation("idle"))this.renderable.setCurrentAnimation("idle");
			}
			this.vel.x = 0;
			
		}
		
		
		if ((me.input.isKeyPressed('jump') || controllers[0].buttons[0]) && this.xButtonReleased || (playScreen.touched && this.touchReleased))
		{	
			
			if(this.jumpCount < this.maxJumps){
				// set current vel to the maximum defined value
				// gravity will then do the rest
				this.vel.y = -this.maxVel.y * me.timer.tick;
				// set the jumping flag
				this.jumping = true;
				this.jumpCount++;
				me.audio.play("jump");			
			}				
								
		}
		
		if(!this.jumping && !this.falling) this.jumpCount = 0;		
				
		// check if the A button was released
		if(controllers[0].buttons[0] == 0){
			this.xButtonReleased = true;
		}else{
			this.xButtonReleased = false;
		}
		
		// check if the X button was released
		if(controllers[0].buttons[3] == 0){
			this.yButtonReleased = true;
		}else{
			this.yButtonReleased = false;
		}
		
		// check if the Right trigger button was released
		if(controllers[0].buttons[5] == 0){
			this.rightTrigButtonReleased = true;
		}else{
			this.rightTrigButtonReleased = false;
		}
		
*/
		
		// godMode
		if(game.data.godMode){
			if(me.input.isKeyPressed('x')){
				console.log("god mode");
				if(this.godMode){
					this.godMode = false;;
					this.renderable.setCurrentAnimation("walk");
					this.gravity = .98;
				}else{
					this.godMode = true;
					this.renderable.setCurrentAnimation("god");
					this.gravity = .5;
				}
				
			}
		}
		
		
		
		// firing bullets
		if((me.input.isKeyPressed('left') ||	me.input.isKeyPressed('right')) && me.input.isKeyPressed('fire')){
			console.log("trigger fired");
			if(!this.renderable.isCurrentAnimation("fire"))this.renderable.setCurrentAnimation("fire");
		}
		
		
		// sprinting - x button
		if(me.input.isKeyPressed('shift') && 
		(me.input.isKeyPressed('left') || me.input.isKeyPressed('right')))
			 {			
			this.maxVel.x += this.sprintIncreaseSpeed;
			if(this.maxVel.x >= this.sprintSpeed) this.maxVel.x = this.sprintSpeed;
			
			this.animationspeed += 50;
		}else{
			this.maxVel.x -= this.slowDownSpeed;
			if(this.maxVel.x <= this.walkingSpeed) this.maxVel.x = this.walkingSpeed;
			
			this.animationspeed -= 50;
		}
		
		if (me.input.isKeyPressed('left'))
		{	
			if(me.input.isKeyPressed('fire')  && this.fireReleased){				
				this.fire();
			}else {
				if(!this.renderable.isCurrentAnimation("walk"))this.renderable.setCurrentAnimation("walk");
			}
			
			// flip the sprite on horizontal axis
			this.flipX(true);
			// update the entity velocity
			this.vel.x -= this.accel.x * me.timer.tick;				
		}
		else if (me.input.isKeyPressed('right'))
		{	
			if(me.input.isKeyPressed('fire')  && this.fireReleased){				
				this.fire();
			}else {
				if(!this.renderable.isCurrentAnimation("walk"))this.renderable.setCurrentAnimation("walk");
			}
			
			// unflip the sprite
			this.flipX(false);
			// update the entity velocity
			this.vel.x += this.accel.x * me.timer.tick;			
		}else {	
			if(me.input.isKeyPressed('fire') && this.fireReleased){				
				this.fire();
			}else {
				if(!this.renderable.isCurrentAnimation("idle"))this.renderable.setCurrentAnimation("idle");
			}
			this.vel.x = 0;
			
		}
		
		
		if (me.input.isKeyPressed('up'))
		{	
			
			if(this.jumpCount < this.maxJumps){
				// set current vel to the maximum defined value
				// gravity will then do the rest
				this.vel.y = -this.maxVel.y * me.timer.tick;
				// set the jumping flag
				this.jumping = true;
				this.jumpCount++;
				me.audio.play("jump");			
			}				
								
		}
		
		// check if the Right trigger button was released
		if(me.input.isKeyPressed('fire')){
			this.fireReleased = true;
		}else{
			this.fireReleased = false;
		}
		
		if(!this.jumping && !this.falling) this.jumpCount = 0;		
				
		// check & update player movement
		updated = this.updateMovement();
	 
		// check for collision
		var res = me.game.collide(this);
		 
		if (res)
		{
			if (res.obj.type == me.game.ENEMY_OBJECT)
			{
			   if ((res.y>0) && !this.jumping)
			   {
				  // bounce (force jump)
				  this.falling = false;
				  this.vel.y = -this.maxVel.y * me.timer.tick;
				  // set the jumping flag
				  this.jumping = true;
				  game.data.score += 250;
				  // play sfx
				  me.audio.play("stomp");
			   }
			   else
			   {
					playScreen.restart();
			   }
			}
		}
	 
		
		
		this.parent();	
		
		// else inform the engine we did not perform
		// any update (e.g. position, animation)
		return true;		
	}

});