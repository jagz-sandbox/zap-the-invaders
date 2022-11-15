function HomeScreen() {;}

HomeScreen.init = function(size)
{	
	HomeScreen.finishing = false;
	HomeScreen.appLayer = new AppLayer('HomeScreen', false, size.w, size.h, null);
	HomeScreen.backimage = ImageAssets.getImageAssetByName("OverlayBack");
	HomeScreen.bounds = new Bounds(new Vector2d(0, 0), new Vector2d(size.w, size.h));
		
	var context = HomeScreen.appLayer.context;
	
	context.textBaseline = 'top';	
	context.fillStyle = 'rgb(255,255,255)';
	context.textAlign = 'center';
	context.font = '30px "arial"';
	context.textBaseline = 'middle';
}

HomeScreen.hitTest = function(coords)
{
	return HomeScreen.bounds.hitTest(coords);
}

HomeScreen.animateOut = function(onFinishMethod)
{
	if (! HomeScreen.finishing)
	{
		HomeScreen.onFinishMethod = onFinishMethod;		
		HomeScreen.animator = new Animator(Utilities.getStepArray(1, -0.1, 0.08, true, false, 4, 2), HomeScreen.animationStep, HomeScreen.animationFinish);
		HomeScreen.animator.animate(); 
		HomeScreen.finishing = true;
	}
}

HomeScreen.animationStep = function(step)
{
	HomeScreen.appLayer.context.globalAlpha = step;
}

HomeScreen.animationFinish = function()
{
	App.removeAppLayer(HomeScreen.appLayer);
	HomeScreen.onFinishMethod();
}

HomeScreen.draw = function()
{	
	var canvas = HomeScreen.appLayer.canvas;
	var context = HomeScreen.appLayer.context;
	context.clearRect(0, 0, canvas.width, canvas.height);	
	context.drawImage(HomeScreen.backimage, 0, 0, canvas.width, canvas.height);
	context.fillText('Tap To Begin', canvas.width/2,  canvas.height/2);	
}
