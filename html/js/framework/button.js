Button.OFF = 'off';
Button.ON = 'on';

function Button(imageAsset, size, location)
{
	this.spriter = new Spriter(imageAsset);
	this.frames_off = [ new SpriteFrame(0, 0, size.w, size.h) ];
	this.frames_on = [ new SpriteFrame(size.w+1, 0, size.w, size.h) ];
	
	this.location = location;
	this.size = size;
	
	this.spriter.addState( new SpriteState(Button.OFF, this.frames_off, 1, false) );
	this.spriter.addState( new SpriteState(Button.ON , this.frames_on,  1, false) );	
		
	this.bounds = new Bounds(new Vector2d(location.x, location.y), new Vector2d(location.x+size.w, location.y+size.h));
	
	this.changeState = function(state)
	{
		this.spriter.changeState(state);
	}
	
	this.draw = function (appLayer)
	{
		this.spriter.updateSprite();
		
		var image = this.spriter.image;
		var sprite = this.spriter.sprite;
		var loc = this.location;
		
		appLayer.context.drawImage(image, sprite.x, sprite.y, sprite.sw, sprite.sh, loc.x, loc.y, this.size.w, this.size.h);
	}
}