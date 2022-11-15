function PauseOverlay() {;}


PauseOverlay.init = function(size)
{	
	PauseOverlay.layerName = 'PauseOverlay';	
	PauseOverlay.finishing = false;
	PauseOverlay.appLayer = new AppLayer(PauseOverlay.layerName, false, size.w, size.h, null);
	PauseOverlay.backimage = ImageAssets.getImageAssetByName("OverlayBack");
	
	var context = PauseOverlay.appLayer.context;
	
	context.textBaseline = 'top';	
	context.fillStyle = 'rgb(255,255,255)';
	context.textAlign = 'center';
	context.font = '30px "arial"';
	context.textBaseline = 'middle';
}

PauseOverlay.animateOut = function(onFinishMethod)
{
	if (!PauseOverlay.finishing)
	{
		PauseOverlay.onFinishMethod = onFinishMethod;
		var stepArray = Utilities.getStepArray(1, -0.05, 0.1, true, false, 4, 2, 100, 0);
		//console.log(stepArray);
		PauseOverlay.animator = new Animator(stepArray, PauseOverlay.animationStep, PauseOverlay.animationFinish);
		PauseOverlay.animator.animate(); 
		PauseOverlay.finishing = true;
	}
}

PauseOverlay.animationStep = function(step)
{
	PauseOverlay.appLayer.context.globalAlpha = step;
}

PauseOverlay.animationFinish = function()
{
	App.removeAppLayer(PauseOverlay.appLayer);
	PauseOverlay.onFinishMethod();
}

PauseOverlay.draw = function()
{	
	var canvas = PauseOverlay.appLayer.canvas;
	var context = PauseOverlay.appLayer.context;
	context.clearRect(0, 0, canvas.width, canvas.height);	
	context.drawImage(PauseOverlay.backimage, 0, 0, canvas.width, canvas.height);
	context.fillText('Get Ready!', canvas.width/2,  canvas.height/2);	
}