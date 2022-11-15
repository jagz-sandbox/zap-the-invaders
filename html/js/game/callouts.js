function Callouts() {;}

Callouts.items = [];

Callouts.init = function(size)
{
	Callouts.appLayer = new AppLayer('Callouts', false, size.w, size.h, null);
}

Callouts.addPointsCallout = function(location, text)
{
	Callouts.items.push(new CalloutPoints(Callouts.appLayer, location, text));
}

Callouts.update = function()
{
	var tempArray = [];
	for (var i=0; i<Callouts.items.length; i++)
	{
		var callout = Callouts.items[i];
		callout.update();
		
		if (callout.alive)
		{ 
			tempArray.push(callout)
		}
	}
	
	Callouts.items = tempArray;
}

Callouts.draw = function()
{
	var canvas = Callouts.appLayer.canvas;
	var context = Callouts.appLayer.context;
	
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	for (var i=0; i<Callouts.items.length; i++)
	{
		Callouts.items[i].draw();
	}		
}

