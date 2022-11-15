function Missle(imageasset, location, direction, boundry, speed)
{
	this.image = ImageAssets.getImageAssetByName(imageasset);
	this.size = new Size2d(this.image.width, this.image.height);
	this.direction = direction;
	this.speed = (speed == null) ? 1 : speed;
	this.loc = location;
	this.alive = true;
	this.bounds = new Bounds(new Vector2d(0,0), new Vector2d(0,0));
	this.boundry = boundry;
	this.boundry.size = this.size;
	this.update();
}

Missle.prototype.kill = function()
{
	this.alive = false;
}

Missle.prototype.collideTest = function(coords)
{
	return this.bounds.collideTest(coords);
}

Missle.prototype.update = function()
{
	if (!this.alive) { return; }
	
	if ( this.boundry.boundryHitTest( this.loc ).length <= 0)
	{
		this.loc.x += this.direction.x * this.speed;
		this.loc.y += this.direction.y * this.speed;
		
		this.bounds.min.x = this.loc.x;
		this.bounds.min.y = this.loc.y;
		this.bounds.max.x = this.loc.x + this.size.w;
		this.bounds.max.y = this.loc.y + this.size.h;	
	}
	else
	{
		this.kill();
	}
}

Missle.prototype.draw = function(context)
{
	context.drawImage(this.image, this.loc.x, this.loc.y, this.size.w, this.size.h);
}