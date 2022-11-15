/*
Loader v 1.0

description:
	A loader bootstrap to allow for loading of scripts and image assets

preload: n/a

require:
	app.js v1.0 
	imageassets.js v1.0
	scriptassets.js v1.0
	animator.js v1.0
*/
function Loader() {;}

Loader.onLoadFinished = null;
Loader.status = "Initiating Load";
Loader.head = App.doc.getElementsByTagName('head')[0];
Loader.isRunning = false;
Loader.progress = '-';
Loader.progressImage = new Image();
Loader.progressImage.src = 'assets/image/loaderbar.png';
Loader.progressWidth = 1;

Loader.mainLoop = function()
{		
	if (Loader.isRunning)
	{
		reqAnimationFrame(function()
		{ 
			if (Loader.imagesToLoad.length > 0)
			{
				Loader.checkImagesLoad();
				Loader.draw(false);
				Loader.mainLoop();	
			}
			else
			{
				Loader.status = 'loading complete';	
				Loader.animator = new Animator(Utilities.getStepArray(1, -0.1, 0.05, true, false, 4, 2), Loader.animateOutFrame, Loader.finish);					
				Loader.animator.animate();
			}
		}, this.animateTimeout);
	}
}

Loader.setOnLoadFinished = function(method)
{
	Loader.onLoadFinished = method;
}

Loader.finish = function()
{
	App.removeAppLayer(Loader.appLayer);
	Loader.onLoadFinished();
}

Loader.animateOutFrame = function(step)
{
	Loader.appLayer.context.globalAlpha = step;	
	Loader.draw(true);
}

Loader.draw = function(lastFrame)
{
	Loader.appLayer.context.clearRect(0, 0, Loader.appLayer.canvas.width, Loader.appLayer.canvas.height);
	Loader.appLayer.context.fillText(Loader.status, Loader.appLayer.canvas.width/2, Loader.appLayer.canvas.height/2);
	
	if (!lastFrame)
	{
		Loader.progressWidth = (Loader.progressWidth < 100) ? Loader.progressWidth + 1 : 1;		
	}
	
	Loader.appLayer.context.drawImage(Loader.progressImage, Loader.appLayer.canvas.width/2 - Loader.progressWidth/2,
			Loader.appLayer.canvas.height/2 + 10, Loader.progressWidth, Loader.progressImage.height);
}

Loader.start = function(scripts)
{
	Loader.appLayer = new AppLayer('loading', false);
	Loader.status = "Loading";
	Loader.scriptsToLoad = ScriptAssets;
	Loader.isRunning = true;
	Loader.loadJavaScriptFiles();
	Loader.appLayer.context.globalAlpha = 1.0;
	
	Loader.appLayer.context.fillStyle = 'rgb(255,255,255)';
	Loader.appLayer.context.textAlign = 'center';
	Loader.appLayer.context.font = '15px "arial"';
}

Loader.loadJavaScriptFiles = function()
{
	var self = this;
	var scriptObj = Loader.scriptsToLoad.shift();	
	var jsFile = scriptObj.script;
	var script = App.doc.createElement('script');
	script.setAttribute('language', 'javascript');
	script.setAttribute('type', 'text/javascript');
	script.setAttribute('src', jsFile);
	App.doc.getElementsByTagName('head')[0].appendChild(script);
	
	Loader.status = "loading scripts";
	script.onload = function()
	{
		if (Loader.scriptsToLoad.length > 0)
		{ Loader.loadJavaScriptFiles(); }
		else
		{
			Loader.mainLoop();
			Loader.imagesToLoad = ImageAssets;
		}
	}
} 

Loader.checkImagesLoad = function()
{	
	if (Loader.imagesToLoad[0].image.complete)
	{
		var shifted = Loader.imagesToLoad.shift();
	}
	else
	{
		Loader.status = "loading image " + Loader.imagesToLoad[0].name;
	}
}






