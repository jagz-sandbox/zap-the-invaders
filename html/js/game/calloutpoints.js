CalloutPoints.LIFE_FRAME = 10;
CalloutPoints.OFFSET = new Vector2d(0, 0);
CalloutPoints.CanvasSize;
CalloutPoints.stepAlphaArray = Utilities.getStepArray(0.05, 1.1, 0.1, false, false).concat(Utilities.getStepArray(1, 0.05, 0.1, false, false));
CalloutPoints.stepSizeArray = Utilities.getStepArray(20, 10, 1, false, false);

function CalloutPoints(appLayer, location, text)
{
	this.appLayer = appLayer;
	this.location = (location == null) ? new Vector2d(0, 0) : location;
	this.text = text;
	this.alive = true;
	this.LifeFrames = CalloutPoints.LIFE_FRAME ;
	this.animateAlphaSteps = CalloutPoints.stepAlphaArray.concat();	
	this.animateSizeSteps = CalloutPoints.stepSizeArray.concat();
	this.alpha = 1;
	this.fontSize = 15;
}

CalloutPoints.prototype.update = function()
{
	if (this.animateAlphaSteps.length <= 0 || CalloutPoints.stepSizeArray.lenght <= 0)
	{ this.alive = false; }
	else
	{
		this.alpha = this.animateAlphaSteps.pop();
		this.fontSize = this.animateSizeSteps.pop();
	}
}

CalloutPoints.prototype.setFontStyle = function()
{
	var context = this.appLayer.context;
	context.fillStyle = 'rgba(128, 128, 255, ' + this.alpha + ')';
	context.textAlign = 'center';
	context.font = this.fontSize + 'px "arial bold italic"';
	context.textBaseline = 'middle';
	context.shadowBlur = 10;
	context.shadowColor = 'rgb(128, 128, 255)';
	shadowOffsetX = 5;
	shadowOffsetY = 10;
}

CalloutPoints.prototype.draw = function()
{	
	var canvas = this.appLayer.canvas;
	var context = this.appLayer.context;
	
	this.setFontStyle();
	context.fillText(this.text, this.location.x + CalloutPoints.OFFSET.x, this.location.y + CalloutPoints.OFFSET.y);
}


