function Bounds(vectorMin, vectorMax)
{
	this.min = vectorMin;
	this.max = vectorMax;
	
	this.hitTest = function(vector)
	{
		if (vector.x >= this.min.x && vector.x <= this.max.x && 
			vector.y >= this.min.y && vector.y <= this.max.y)
		{ return true; }
		else
		{ return false; }
	}
	
	this.collideTest = function(object)
	{	
		var bounds = object.bounds;
		var midx = bounds.min.x + ((bounds.max.x - bounds.min.x)/2);
		var midy = bounds.min.y + ((bounds.max.y - bounds.min.y)/2);
		
		var coords = [
			// clockwise vectors
			  new Vector2d(bounds.min.x, bounds.min.y) // top left
			, new Vector2d(midx, bounds.min.y) // top mid
			, new Vector2d(bounds.max.x, bounds.min.y) // top right
			, new Vector2d(bounds.max.x, midy) // right mid
			, new Vector2d(bounds.max.x, bounds.max.y) // bottom right	
			, new Vector2d(midx, bounds.max.y) // bottom mid
			, new Vector2d(bounds.min.x, bounds.max.y) // bottom left
			, new Vector2d(bounds.min.x, midy) // left mid			
		];
					
		for (var j=0; j<coords.length; j++)
		{
			if ( this.hitTest(coords[j]) )
			{
				
				return true;
			}
		}
		
		return false;
	}
}
