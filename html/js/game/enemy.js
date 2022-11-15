
// CONSTANTS
Enemy.STATE_ALIVE 	= 100;
Enemy.STATE_DYING 	= 101;
Enemy.STATE_DEAD	= 102;

// Enemy/missle adjustments
Enemy.maxProjectiles = 2; // Max number of missles allowed to be alive a one time
Enemy.missleDirection = new Vector2d(0, 1);
Enemy.minTicks = 60;
Enemy.maxTicks = 120;

// Properties
Enemy.prototype.projectileSpeed = 8; // Speed of the missles
Enemy.prototype.speed = 5;
Enemy.prototype.size = new Size2d(64 ,64);
Enemy.prototype.waitTicks = Enemy.minTicks / 4;
Enemy.prototype.alive = true;
Enemy.prototype.boundry;
Enemy.prototype.bounds;
Enemy.prototype.points = 100;
Enemy.prototype.location;
Enemy.prototype.initLocation;
Enemy.prototype.isMoving = false;

function Enemy(appLayer, location, minSpeed, maxSpeed)
{	
	this.appLayer = appLayer;
	this.location = location;
	this.startLoc = new Vector2d(location.x, location.y);
	this.state = Enemy.STATE_ALIVE;
	this.speedMin = (minSpeed == null) ? 1 : minSpeed;
	this.speedMax = (maxSpeed == null) ? 1 : maxSpeed;
	this.projectileSpeed = Math.max(this.speedMin, this.speedMax) + 2;
	
	this.speed = Utilities.random(this.speedMin, this.speedMax);
	this.direction = new Vector2d(Utilities.random(-1, 1), Utilities.random(1, 1)); 

	var moveFrames = [];
	var explodeFrames = [];
	
	var spritesFrames = [moveFrames, explodeFrames];
	var elemSprites = [1, 7]; 

	var col = 0;
	
	for (var i=0; i<spritesFrames.length; i++)
	{
		for (var j=0; j < elemSprites[i]; j++) 
		{
			spritesFrames[i].push(new SpriteFrame(this.size.w * col, 0, this.size.w, this.size.h)) ;		
			col++;
		}
	}
	
	this.spriter = new Spriter(ImageAssets.getImageAssetByName('Enemy'));	
	this.spriter.addState(new SpriteState('move', moveFrames, 1, false));
	this.spriter.addState(new SpriteState('explode', explodeFrames, 2, false));
	this.spriter.changeState('move');
		
	this.boundry = new Boundry(new Vector2d(0, 0), new Vector2d(appLayer.canvas.width, appLayer.canvas.height+64), this.size);
	this.missleBoundry = new Boundry(new Vector2d(0,0), new Vector2d(appLayer.canvas.width, appLayer.canvas.height));
	this.bounds = new Bounds(new Vector2d(this.location.x, this.location.y), new Vector2d(this.size.w, this.size.h));
	
	this.bounds.min = this.location;
	this.bounds.max.x = this.location.x + this.size.w;
	this.bounds.max.y = this.location.y + this.size.h;
}

Enemy.prototype.reset = function()
{	
	this.location = new Vector2d(this.startLoc.x, this.startLoc.y);
	this.isMoving = false;
}

Enemy.prototype.addMissle = function()
{	
	var location = new Vector2d(this.location.x + this.size.w/2, this.location.y + this.size.h);
	var missle = new Missle('EnemyMissle', location, Enemy.missleDirection, this.missleBoundry, this.projectileSpeed);
	EnemyProjectiles.addProjectile(missle);	
	this.waitTicks = Utilities.random(Enemy.minTicks, Enemy.maxTicks);
}

Enemy.prototype.kill = function()
{
	this.spriter.changeState('explode');
	this.state = Enemy.STATE_DYING;
}

Enemy.prototype.collideTest = function(collideObject)
{
	if (this.state == Enemy.STATE_DYING) { return false; }
		
	if (this.bounds.collideTest(collideObject))
	{ return true; }
	
	return false;
}

Enemy.prototype.update = function()
{		
	if (this.state == Enemy.STATE_DYING && this.spriter.finished)
	{
		this.state = Enemy.STATE_DEAD;
	}
	else if (this.state == Enemy.STATE_ALIVE && this.isMoving)
	{ 	
		var boundryCollisions = this.boundry.boundryHitTest(this.location);
		if ( boundryCollisions.length > 0 )
		{ 	
			for (var i=0; i<boundryCollisions.length; i++)
			{
				if (boundryCollisions[i] == Boundry.COLIDE_LEFT)
				{ this.direction = new Vector2d(1, Utilities.random(1, 1)); }
				if (boundryCollisions[i] == Boundry.COLIDE_RIGHT)
				{ this.direction = new Vector2d(-1, Utilities.random(1, 1));  }
				if (boundryCollisions[i] == Boundry.COLIDE_TOP)
				{ ;  }
				if (boundryCollisions[i] == Boundry.COLIDE_BOTTOM)
				{ this.location.y = this.boundry.min.y - this.size.h ;	this.direction = new Vector2d(Utilities.random(-1, 1), Utilities.random(1, 1)); }				
			}			
		}
					
		if (this.waitTicks <= 0)
		{  this.addMissle(); }
		else
		{  this.waitTicks--;  }
		
		this.location.x += this.direction.x * this.speed;
		this.location.y += this.direction.y * this.speed;
		this.bounds.min = this.location;
		this.bounds.max.x = this.location.x + this.size.w;
		this.bounds.max.y = this.location.y + this.size.h;
	}
}

Enemy.prototype.draw = function()
{	
	var image = this.spriter.image;
	var sprite = this.spriter.sprite;
	var bounds = this.bounds;
	var context = this.appLayer.context;
	var canvas = this.appLayer.canvas;
	var location = this.location;
	
	this.spriter.updateSprite();
	
	context.drawImage(image, sprite.x, sprite.y, sprite.sw, sprite.sh, location.x, location.y, this.size.w, this.size.h);
}