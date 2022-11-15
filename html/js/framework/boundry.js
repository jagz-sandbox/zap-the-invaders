Boundry.COLIDE_LEFT 	= 100;
Boundry.COLIDE_RIGHT 	= 101;
Boundry.COLIDE_TOP 		= 102;
Boundry.COLIDE_BOTTOM	= 103;

function Boundry(vectorMin, vectorMax, size)
{
	this.min = vectorMin;
	this.max = vectorMax;
	
	this.size = (size == null) ? 0 : size;
}

Boundry.prototype.boundryHitTest = function(location)
{
	/*return (location.x < this.min.x ||
			location.x > this.max.x ||
			location.y < this.min.y ||
			location.y > this.max.y);*/
			
	var results = [];
	
	if (location.x < this.min.x)
	{ results.push(Boundry.COLIDE_LEFT); }
	
	if (location.x > this.max.x - this.size.w)
	{ results.push(Boundry.COLIDE_RIGHT); }
	
	if (location.y < this.min.y)
	{ results.push(Boundry.COLIDE_TOP); }
	
	if (location.y > this.max.y - this.size.h)
	{ results.push(Boundry.COLIDE_BOTTOM); }
	
	return results;
}