function BattleField() {;}

BattleField.init = function(size) 
{
	BattleField.appLayer = new AppLayer('BattleField', false, size.w, size.h, null);	
}

BattleField.update = function ()
{
	
}

BattleField.draw = function()
{
	var canvas = BattleField.appLayer.canvas;
	var context = BattleField.appLayer.context;
	
	context.clearRect(0, 0, canvas.width, canvas.height);
}