function GamePad() {;}

GamePad.LEFT 		= InputAction.LEFT ;	
GamePad.FIRE 		= InputAction.FIRE;
GamePad.RIGHT 		= InputAction.RIGHT; 
GamePad.UP 			= InputAction.UP;
GamePad.DOWN 		= InputAction.DOWN; 	
GamePad.NOINPUT		= InputAction.NOINPUT;

GamePad.init = function(canvasSize)
{	
	var size = new Size2d(64, 64);
	GamePad.appLayer = new AppLayer('GamePad', false, canvasSize.w, canvasSize.h, null);
	GamePad.context = GamePad.appLayer.context;
	GamePad.canvas = GamePad.appLayer.canvas;
	
	GamePad.buttonLeft  = new Button(ImageAssets.getImageAssetByName('ControllerLeft'),  new Size2d(size.w, size.h), new Vector2d(0, canvasSize.h-size.h) );
	GamePad.buttonRight = new Button(ImageAssets.getImageAssetByName('ControllerRight'), new Size2d(size.w, size.h), new Vector2d(size.h+1, canvasSize.h-size.h) );
	GamePad.buttonFire  = new Button(ImageAssets.getImageAssetByName('ControllerFire'),  new Size2d(size.w, size.h), new Vector2d(canvasSize.w-size.w, canvasSize.h-size.h) );
	
	GamePad.redraw = true;
	GamePad.draw();
}

GamePad.inputHitTest = function(inputType, array)
{
	var inputs = [];
	
	if (inputType == InputType.TOUCH)
	{
		for (var i=0; i<array.length; i++)
		{	
			if ( GamePad.buttonLeft.bounds.hitTest(array[i].coords) )
			{
				inputs.push(GamePad.LEFT);
			}
			
			if ( GamePad.buttonRight.bounds.hitTest(array[i].coords) )
			{
				inputs.push(GamePad.RIGHT);
			}
			
			if ( GamePad.buttonFire.bounds.hitTest(array[i].coords) )
			{
				inputs.push(GamePad.FIRE);
			}
		}
	}
	
	return inputs;
}

GamePad.showInput = function(states)
{	
	GamePad.buttonLeft.changeState(Button.OFF);
	GamePad.buttonRight.changeState(Button.OFF);
	GamePad.buttonFire.changeState(Button.OFF);

	if (states == null || states.length <=0 ) { return; }

	for (var i=0; i<states.length; i++)
	{
		if (states[i] == GamePad.LEFT)
		{ GamePad.buttonLeft.changeState(Button.ON); }
		if (states[i] == GamePad.RIGHT)
		{ GamePad.buttonRight.changeState(Button.ON); }
		if (states[i] == GamePad.FIRE)
		{ GamePad.buttonFire.changeState(Button.ON); }
	}
}

GamePad.draw = function()
{
	GamePad.context.clearRect(0, 0, GamePad.canvas.width, GamePad.canvas.height);	

	GamePad.buttonLeft.draw(GamePad.appLayer);
	GamePad.buttonRight.draw(GamePad.appLayer);
	GamePad.buttonFire.draw(GamePad.appLayer);
}

