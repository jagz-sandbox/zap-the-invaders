function LevelSummary() {;}


LevelSummary.init = function(size)
{	
	LevelSummary.layerName = 'LevelSummary';	
	LevelSummary.finishing = false;
	LevelSummary.appLayer = new AppLayer(LevelSummary.layerName, false, size.w, size.h, null);
	LevelSummary.backimage = ImageAssets.getImageAssetByName("OverlayBack");
	
	var context = LevelSummary.appLayer.context;
	
	context.textBaseline = 'top';	
	context.fillStyle = 'rgb(255,255,255)';
	context.textAlign = 'center';
	context.font = '30px "arial"';
	context.textBaseline = 'middle';
}


LevelSummary.setTextStyle = function(id)
{
	var context = LevelSummary.appLayer.context;
	switch (id)
	{
		case 'big':
			LevelSummary.lineHeight = 30;	
			context.fillStyle = 'rgb(255,255,255)';
			context.textAlign = 'center';
			context.font = '30px "arial"';
			context.textBaseline = 'middle';
			break;
		
		case 'small':
			LevelSummary.lineHeight = 24;
			context.fillStyle = 'rgb(255,255,255)';
			context.textAlign = 'center';
			context.font = '15px "arial"';
			context.textBaseline = 'middle';
			break;		
	}
}

LevelSummary.animateOut = function(onFinishMethod)
{
	if (!LevelSummary.finishing)
	{
		LevelSummary.onFinishMethod = onFinishMethod;
		var stepArray = Utilities.getStepArray(1, -0.05, 0.1, true, false, 4, 2, 0, 0);
		LevelSummary.animator = new Animator(stepArray, LevelSummary.animationStep, LevelSummary.animationFinish);
		LevelSummary.animator.animate(); 
		LevelSummary.finishing = true;
	}
}

LevelSummary.animationStep = function(step)
{
	LevelSummary.appLayer.context.globalAlpha = step;
}

LevelSummary.animationFinish = function()
{
	App.removeAppLayer(LevelSummary.appLayer);
	LevelSummary.onFinishMethod();
}

LevelSummary.draw = function(currentLevel, levelScore, totalScore, liveLeft)
{	
	var canvas = LevelSummary.appLayer.canvas;
	var context = LevelSummary.appLayer.context;
	context.clearRect(0, 0, canvas.width, canvas.height);	
	context.drawImage(LevelSummary.backimage, 0, 0, canvas.width, canvas.height);
	LevelSummary.setTextStyle('big');
	context.fillText('Level ' + currentLevel + ' Summary', canvas.width/2,  canvas.height/2 - LevelSummary.lineHeight*2);
	LevelSummary.setTextStyle('small');
	context.fillText('Level Score: ' + levelScore, canvas.width/2,  canvas.height/2);	
	context.fillText('Total Score: ' + totalScore, canvas.width/2,  canvas.height/2 + LevelSummary.lineHeight);
	context.fillText('Lives Remaining: ' + liveLeft, canvas.width/2,  canvas.height/2 + LevelSummary.lineHeight*2);
	LevelSummary.setTextStyle('big');
	context.fillText('Tap to continue', canvas.width/2,  canvas.height/2 + LevelSummary.lineHeight*3);
}






















