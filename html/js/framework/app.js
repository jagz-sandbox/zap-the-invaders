/*
App v 1.0

preload: n/a

dependencies:
	loader.js v1.0
	
note:
	includes App.Context class
*/
reqAnimationFrame = null; // This MUST be global

function AppLayer(id, isInteractive, width, height, classes)
{	
	extraClass = (classes == null) ? '' : classes + ' ';
	this.index = App.appLayers.length;
	this.id = id;
	var cssClass = (isInteractive) ? extraClass + App.css.gameobject : extraClass + App.css.gameobject +  ' ' + App.css.nomouse;
	var _canvas = App.doc.createElement('canvas');
	_canvas.id = this.id;
	_canvas.className = cssClass;
	
	if (width == null || height == null)
	{
		_canvas.width = App.width;
		_canvas.height = App.height;
	}
	else
	{
		_canvas.width = width;
		_canvas.height = height;
	}
	
	this.canvas = App.container.appendChild(_canvas);	
	this.context = this.canvas.getContext('2d');
	
	App.appLayers.push(this);
	
	return this;
}

function App() {;}
// Init the app
App.init = function(parentDiv, width, height)
{
	// Assign objects to keep the application from calling the DOM
	App.doc = document;
	App.base = App.doc.getElementById(parentDiv);
	App.head = App.doc.getElementsByTagName('head')[0];
	App.width = width;
	App.height = height;
	App.appLayers = [];
	
	// Global CSS classes
	App.css = new Object();
	App.css.nomouse		= 'nomouse';
	App.css.gameobject	= 'gameobject';

	// Animator setup
	if 	(window.requestAnimationFrame != null) { reqAnimationFrame  = window.requestAnimationFrame; }
	else if (window.webkitRequestAnimationFrame != null) { reqAnimationFrame  = window.webkitRequestAnimationFrame; }
	else if (window.mozRequestAnimationFrame != null) { reqAnimationFrame  = window.mozRequestAnimationFrame; }
	else { App.reqAnimationFrame  = window.setTimeout; }
		
	// Add the based context/canvas
	var div = App.doc.createElement('div');
	div.id = 'app';
	div.style.width = App.width + 'px';
	div.style.height = App.height + 'px';
	App.container = App.base.appendChild(div);	
	App.doLoad();
}

// Start the app
App.doLoad = function()
{
	// Load the scriptasset.js file and object
	var jsScript = App.doc.createElement('script');
	jsScript.setAttribute('language', 'javascript');
	jsScript.setAttribute('type', 'text/javascript');
	jsScript.setAttribute('src', 'js/framework/scriptasset.js');
	App.head.appendChild(jsScript);
	
	// Load the loader.js object/script once the scriptasset.js is ready 
	jsScript.onload = function()
	{		
		var loadScript = App.doc.createElement('script');
		loadScript.setAttribute('language', 'javascript');
		loadScript.setAttribute('type', 'text/javascript');
		loadScript.setAttribute('src', 'js/framework/loader.js');
		App.head.appendChild(loadScript);
		
		// Set what to do when the loader is finished
		loadScript.onload = function()
		{			
			Loader.setOnLoadFinished( function()
				{
					App.onLoadFinished();
				});
			
			// Start the loader once the script is loaded
			Loader.start();
		}
	}	
}

App.onLoadFinished = function()
{
	Invador.start();
}

App.removeAllAppLayers = function()
{
	for (var i=0; i<App.appLayers.length; i++)
	{ 	
		App.container.removeChild(App.appLayers[i].canvas);
	}
	
	App.appLayers = [];
	return;
}

App.removeAppLayer = function(object)
{
	var tempArray = [];
	for (var i=0; i<App.appLayers.length; i++)
	{ 	
		if (App.appLayers[i] == object)
		{
			App.container.removeChild(App.appLayers[i].canvas);
		}
		else
		{
			tempArray.push(App.appLayers[i]);
		}
	}
	
	App.appLayers = tempArray;
	return;
}

App.removeAppLayerById = function(id)
{
	var tempArray = [];
	for (var i=0; i<App.appLayers.length; i++)
	{ 	
		if (App.appLayers[i].id == id)
		{
			App.container.removeChild(App.appLayers[i].canvas);
		}
		else
		{
			tempArray.push(App.appLayers[i]);
		}
	}
	
	App.appLayers = tempArray;
	return;
}