function InputTouch() {;}

InputTouch.eventStart 	= 'touchstart';
InputTouch.eventMove  	= 'touchmove';
InputTouch.eventEnd  	= 'touchend';
InputTouch.eventLeave 	= 'touchleave';
InputTouch.eventCancel 	= 'touchcancel';

InputTouch.nullCoords = null;
InputTouch.coords = InputTouch.nullCoords;
InputTouch.maxInputs = 3;
InputTouch.lastInput = [];

InputTouch.init = function(size)
{	
	App.removeAppLayer(InputTouch.appLayer);

	InputTouch.appLayer = new AppLayer('Input', true, size.w, size.h, null);
		
	var canvas = InputTouch.appLayer.canvas;	
	canvas.addEventListener(InputTouch.eventStart, InputTouch.handleEvent, false);
	canvas.addEventListener(InputTouch.eventMove, InputTouch.handleEvent, false);
	canvas.addEventListener(InputTouch.eventEnd, InputTouch.handleEvent, false);
}

InputTouch.hasInput = function()
{		
	return InputTouch.lastInput.length > 0;
}

InputTouch.handleEvent = function(event)
{		
	var touchInput = [];
	event.preventDefault();	
	for (var i=0; i<event.touches.length; i++)
	{
		touchInput.push( { type:event.type, coords: Utilities.translateTouchEvent(event.touches[i]) } );
	}
	
	console.log(InputTouch.lastInput.length);
	InputTouch.lastInput = touchInput;
	
	return false;
}