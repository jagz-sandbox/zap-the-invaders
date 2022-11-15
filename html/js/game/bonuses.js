function Bonuses() {;}

Bonuses.items = [];

Bonuses.init = function(size)
{
	Bonuses.appLayer = new AppLayer('Bonuses', false, size.w, size.h, null);
}

Bonuses.addPointsCallout = function(location, text)
{
	Bonuses.items.push(new CalloutPoints(Bonuses.appLayer, location, text));
}

Bonuses.update = function()
{
	var tempArray = [];
	for (var i=0; i<Bonuses.items.length; i++)
	{
		var callout = Bonuses.items[i];
		callout.update();
		
		if (callout.alive)
		{ 
			tempArray.push(callout)
		}
	}
	
	Bonuses.items = tempArray;
}

Bonuses.draw = function()
{
	var canvas = Bonuses.appLayer.canvas;
	var context = Bonuses.appLayer.context;
	
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	for (var i=0; i<Bonuses.items.length; i++)
	{
		Bonuses.items[i].draw();
	}		
}
