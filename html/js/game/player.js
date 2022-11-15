function Player() {;}

Player.STATE_ALIVE 		= 100;
Player.STATE_DYING 		= 101;
Player.STATE_DEAD		= 102;
	
Player.MOVE_LEFT 		= 0;
Player.MOVE_RIGHT 		= 1;
Player.MOVE_UP 			= 2;
Player.MOVE_DOWN 		= 3;
Player.FIRE 			= 10;

Player.Position_LEFTTOP 		= 100;
Player.Position_CENTERTOP 		= 101;
Player.Position_RIGHTOP 		= 102;
Player.Position_LEFTMIDDLE 		= 103;
Player.Position_CENTERMIDDLE 	= 104;
Player.Position_RIGHTMIDDLE 	= 105;
Player.Position_LEFTBOTTOM 		= 106;
Player.Position_CENTERBOTTOM 	= 107;
Player.Position_RIGHTBOTTOM 	= 108;

Player.appLayer = null;
Player.location = null;
Player.boundry 	= null;
Player.spriteSize = new Size2d(64, 64);

// Player/missle adjustments
Player.speed 			= 5;
Player.projectileSpeed 	= 8; // Speed of the missles
Player.maxProjectiles 	= 2; // Max number of missles allowed to be alive a one time
Player.minTicks 		= 10; // Minimum frames between missles
Player.canFire 			= true;


Player.wrapAround 		= false;
Player.moveHorizontal 	= true;
Player.moveVertical 	= false;

Player.waitTicks = 0; // Holder for frames left before next missle allowed (set automatically)

Player.actions = [];

Player.init = function(appLayer, position, positionOffset)
{
	Player.appLayer = appLayer;
	
	var playerPosition = (position == null) ? Position_CENTERBOTTOM : position;
	var offset = (positionOffset == null) ? new Vector2d(0,0) : positionOffset;
	
	var left = 0 + offset.x;
	var top = 0  + offset.y;
	var center = appLayer.canvas.width/2 - Player.spriteSize.w/2 + offset.x;
	var middle = appLayer.canvas.height/2 - Player.spriteSize.h/2 + offset.y;
	var right = appLayer.canvas.width - Player.spriteSize.w  + offset.x;
	var bottom = appLayer.canvas.height - Player.spriteSize.h  + offset.y;

	switch (playerPosition)
	{
		case Player.Position_LEFTTOP:
			Player.location = new Vector2d(left, top);
			break;
		case Player.Position_CENTERTOP:
			Player.location = new Vector2d(center, top);
			break;
		case Player.Position_RIGHTOP:
			Player.location = new Vector2d(right, top);
			break;
		case Player.Position_LEFTMIDDLE:
			Player.location = new Vector2d(left, middle);
			break;
		case Player.Position_CENTERMIDDLE:
			Player.location = new Vector2d(center, middle);
			break;
		case Player.Position_RIGHTMIDDLE:
			Player.location = new Vector2d(right, middle);
			break;
		case Player.Position_LEFTBOTTOM:
			Player.location = new Vector2d(left, bottom);
			break;
		case Player.Position_CENTERBOTTOM:
			Player.location = new Vector2d(center, bottom);
			break;
		case Player.Position_RIGHTBOTTOM:
			Player.location = new Vector2d(right, bottom);
			break;
	}
	
	Player.boundry = new Boundry(new Vector2d(0,0), new Vector2d(appLayer.canvas.width-Player.spriteSize.w, appLayer.canvas.height-Player.spriteSize.h), Player.spriteSize);	
	Player.spriter = new Spriter(ImageAssets.getImageAssetByName('Player'));
	
	Player.missles = [];
	Player.missleBoundry = new Boundry(new Vector2d(0,0), new Vector2d(appLayer.canvas.width, appLayer.canvas.height));
	
	var moveFrames = [];
	var shieldFrames = [];
	var explodeFrames = [];
	
	var spritesFrames = [moveFrames, shieldFrames, explodeFrames];
	var elemSprites = [2, 3, 5]; 

	var col = 0;
	
	for (var i=0; i<spritesFrames.length; i++)
	{
		for (var j=0; j < elemSprites[i]; j++) 
		{
			spritesFrames[i].push(new SpriteFrame(Player.spriteSize.w * col, 0, Player.spriteSize.w, Player.spriteSize.h)) ;		
			col++;
		}
	}
	
	Player.spriter.addState(new SpriteState('move', moveFrames, 1, false));
	Player.spriter.addState(new SpriteState('fire', shieldFrames, 1, false));
	Player.spriter.addState(new SpriteState('explode', explodeFrames, 1, false));
	Player.spriter.changeState('move');
		
	Player.bounds = new Bounds(new Vector2d(0, 0), new Vector2d(0, 0));
	Player.state = Player.STATE_ALIVE;
}

Player.addMissle = function(location)
{		
	if (Player.canFire)
	{
		var missleDirection = new Vector2d(0, -1);
		Player.missles.push(new Missle('Missle', location, missleDirection, Player.missleBoundry , Player.projectileSpeed));
		Player.waitTicks = Player.minTicks;
	}
}

Player.collideTest = function(collideObject)
{
	if (Player.state == Player.STATE_DYING) { return false; }
		
	if (this.bounds.collideTest(collideObject))
	{ return true; }
	
	return false;
}

Player.kill = function()
{
	Player.spriter.changeState('explode');
	Player.state = Player.STATE_DYING;
}

Player.update = function(actions, speed, collideArray)
{		
	if (Player.state == Player.STATE_DYING && Player.spriter.finished && Player.missles.length <= 0)
	{
		Player.state = Player.STATE_DEAD;
	}

	if (Player.state == Player.STATE_ALIVE)
	{
		var loc = Player.location;
		var boundry = Player.boundry;
		var bounds = Player.bounds;
		
		var actionValue = (speed == null) ? Player.speed : speed;
		var newState = 'move';
				
		for (var i=0; i<actions.length; i++)
		{
			var action = actions[i];
			if (action === Player.MOVE_LEFT && Player.moveHorizontal)
			{
				if (loc.x >= boundry.min.x)
				{
					newState = 'move'; 
					loc.x -= actionValue;
				}
				else if (Player.wrapAround)
				{
					loc.x = boundry.max.x - actionValue;
				}
			}
			else if (action === Player.MOVE_RIGHT && Player.moveHorizontal)
			{
				if (loc.x <= boundry.max.x)
				{
					newState = 'move'; 
					loc.x += actionValue;
				}
				else if (Player.wrapAround)
				{
					loc.x = boundry.min.x + actionValue;
				}
			}
			else if (action === Player.MOVE_UP && Player.moveVertical)
			{
				if (loc.y >= boundry.min.y)
				{
					newState = 'move'; 
					loc.y -= actionValue;
				}
				else if (Player.wrapAround)
				{
					loc.y = boundry.max.y;
				}
			}
			else if (action === Player.MOVE_DOWN  && Player.moveVertical)
			{ 
				if (loc.y <= boundry.max.y)
				{
					newState = 'move'; 
					loc.y += actionValue;
				}
				else if (Player.wrapAround)
				{
					loc.y = boundry.min.y + actionValue;
				}
			}
			else if (action === Player.FIRE)
			{			
				var missleLoc = new Vector2d(Player.location.x + Player.spriteSize.w/2, Player.location.y);
				Player.addMissle(missleLoc, boundry, Player.projectileSpeed);	
				newState = 'fire';					
			}
			Player.spriter.changeState(newState);
		}
		
		bounds.min.x = loc.x + 15;
		bounds.min.y = loc.y + 15;
		bounds.max.x = loc.x + this.spriteSize.w - 15;
		bounds.max.y = loc.y + this.spriteSize.h - 15;
		
			
		if (Player.waitTicks <= 0 && Player.missles.length < Player.maxProjectiles)
		{  Player.canFire = true; }
		else
		{  Player.waitTicks--; Player.canFire = false; }
	}
	
	var tempProjectiles = [];
	for (var i=0; i<Player.missles.length; i++)
	{
		var missle = Player.missles[i];			
		missle.update();
		
		if (missle.alive)
		{
			tempProjectiles.push(missle);
		}
	}
	
	Player.missles = tempProjectiles;	
}

Player.draw = function()
{
	var image = Player.spriter.image;
	var sprite = Player.spriter.sprite;	
	var context = Player.appLayer.context;
	var canvas = Player.appLayer.canvas;
	var loc = Player.location;

	Player.spriter.updateSprite();
	context.drawImage(image, sprite.x, sprite.y, sprite.sw, sprite.sh, loc.x, loc.y, Player.spriteSize.w, Player.spriteSize.h);
	
	for (var i=0; i<Player.missles.length; i++)
	{
		Player.missles[i].draw(context);
	}
}
