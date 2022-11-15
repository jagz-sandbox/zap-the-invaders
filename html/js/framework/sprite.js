function Spriter(image) 
{
	this.image = image;
	this.states = [];	
	this.sprite = null;
	this.currentState = 0;
	this.finished = true;
	
	this.addState = function(state)
	{
		this.states.push(state);
	}
		
	this.changeState = function(name)
	{
		this.playing = true;
		for (var i=0; i<this.states.length; i++)
		{
			if (this.states[i].name === name)
			{
				this.currentState = i;
				this.states[this.currentState].reset();
				this.updateSprite();
				return;
			}
		}
		
		return null;
	}
	
	this.updateSprite = function ()
	{
		this.sprite = this.states[this.currentState].getSpriteFrame();
		this.finished = this.states[this.currentState].ended;
	}
}

function SpriteState(name, frames, frameDuration, looping)
{
	this.name = (name == null) ? 'default' : name;	
	this.frames = frames;
	this.duration = (frameDuration == null) ? 1 : frameDuration;
	this.looping = (looping == null) ? true : looping;
	this.currentframe = 0;
	this.finished = true;
	this.frameTick = 0;
		
	this.getSpriteFrame = function(spriter)
	{
		var frame = this.frames[this.currentframe];
		
		if (this.currentframe < this.frames.length-1 )
		{
			if (this.frameTick++ >= this.duration)
			{
				this.currentframe++;
				this.frameTick = 0;
			}
			this.ended = false; 
		}		
		else
		{
			if (this.looping)
			{
				this.currentframe = 0;
				this.ended = false;
			}
			else
			{ this.ended = true; }
		}
		return frame;
	}
	
	this.reset = function()
	{
		this.currentframe = 0;
	}
}

function SpriteFrame(x, y, sw, sh)
{
	this.x = x;
	this.y = y;
	this.sw = sw;
	this.sh = sh;
}

