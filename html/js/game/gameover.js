function GameOver() {;}


GameOver.init = function(size)
{	
	GameOver.layerName = 'GameOver';	
	GameOver.finishing = false;
	GameOver.appLayer = new AppLayer(GameOver.layerName, false, size.w, size.h, null);
	GameOver.backimage = ImageAssets.getImageAssetByName("OverlayBack");
	
	var context = GameOver.appLayer.context;
	
	context.textBaseline = 'top';	
	context.fillStyle = 'rgb(255,255,255)';
	context.textAlign = 'center';
	context.font = '30px "arial"';
	context.textBaseline = 'middle';
}

GameOver.setTextStyle = function(id)
{
	var context = GameOver.appLayer.context;
	switch (id)
	{
		case 'big':
			GameOver.lineHeight = 64;	
			context.fillStyle = 'rgb(255,255,255)';
			context.textAlign = 'center';
			context.font = '30px "arial"';
			context.textBaseline = 'middle';
			break;
		
		case 'small':
			GameOver.lineHeight = 32;
			context.fillStyle = 'rgb(255,255,255)';
			context.textAlign = 'center';
			context.font = '15px "arial"';
			context.textBaseline = 'middle';
			break;

		
	}
}

GameOver.animateOut = function(onFinishMethod)
{
	if (!GameOver.finishing)
	{
		GameOver.onFinishMethod = onFinishMethod;
		var stepArray = Utilities.getStepArray(1, 0.0, 0.1, true, false, 4, 2, 0, 0);
		GameOver.animator = new Animator(stepArray, GameOver.animationStep, GameOver.animationFinish);
		GameOver.animator.animate(); 
		GameOver.finishing = true;
	}
}

GameOver.animationStep = function(step)
{
	GameOver.appLayer.context.globalAlpha = step;
}

GameOver.animationFinish = function()
{
	App.removeAppLayer(GameOver.appLayer);
	GameOver.onFinishMethod();
}

GameOver.draw = function(finalScore)
{	
	var canvas = GameOver.appLayer.canvas;
	var context = GameOver.appLayer.context;
	context.clearRect(0, 0, canvas.width, canvas.height);	
	context.drawImage(GameOver.backimage, 0, 0, canvas.width, canvas.height);
	GameOver.setTextStyle('big');
	context.fillText('Game Over!', canvas.width/2,  canvas.height/2 - GameOver.lineHeight);
	GameOver.setTextStyle('small');
	context.fillText('Final Score: ' + finalScore, canvas.width/2,  canvas.height/2);
	context.fillText('Tap to restart', canvas.width/2,  canvas.height/2 + GameOver.lineHeight);
}