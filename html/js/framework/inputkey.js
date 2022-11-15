KeyCode_SHIFT			= 16;
KeyCode_CTRL			= 17;
KeyCode_ALT				= 18;
KeyCode_SPACE 			= 32;
KeyCode_LEFT			= 37;
KeyCode_UP				= 38;
KeyCode_RIGHT			= 39;
KeyCode_DOWN			= 40;

KeyCode_NUMONE			= 97;
KeyCode_NUMTWO			= 98;
KeyCode_NUMTHREE		= 99;
KeyCode_NUMFOUR			= 100;
KeyCode_NUMFIVE			= 101;
KeyCode_NUMSIX			= 102;
KeyCode_NUMSEVEN		= 103;
KeyCode_NUMEIGHT		= 104;
KeyCode_NUMNINE			= 105;

KeyCode_A				= 65;
KeyCode_W				= 87;
KeyCode_D				= 68;
KeyCode_S				= 83;

function InputKey() {;}

InputKey.lastInput = [];

InputKey.init = function()
{
	InputKey.LEFT_CODE		= KeyCode_LEFT; 
	InputKey.LEFT_CODE_ALT	= KeyCode_A;
	
	InputKey.UP_CODE		= KeyCode_UP;
	InputKey.UP_CODE_ALT	= KeyCode_W;
	
	InputKey.RIGHT_CODE 	= KeyCode_RIGHT; 
	InputKey.RIGHT_CODE_ALT	= KeyCode_D;
	
	InputKey.DOWN_CODE 		= KeyCode_DOWN; 
	InputKey.DOWN_CODE_ALT	= KeyCode_S;
	
	InputKey.FIRE_CODE 		= KeyCode_SPACE;
	InputKey.FIRE_CODE_ALT	= KeyCode_CTRL;

	InputKey.LEFT 		= InputAction.LEFT;	
	InputKey.UP 		= InputAction.UP;
	InputKey.RIGHT 		= InputAction.RIGHT;	
	InputKey.DOWN 		= InputAction.DOWN;
	InputKey.FIRE 		= InputAction.FIRE;

	InputKey.LEFT_PRESSED 		= false;	
	InputKey.UP_PRESSED 		= false;
	InputKey.RIGHT_PRESSED 		= false;	
	InputKey.DOWN_PRESSED 		= false;
	InputKey.FIRE_PRESSED 		= false;
	
	window.addEventListener('keydown', InputKey.handleEvent, false);
	window.addEventListener('keyup', InputKey.handleEvent, false);
}

InputKey.hasInput = function()
{		
	return (InputKey.LEFT_PRESSED || InputKey.UP_PRESSED || InputKey.RIGHT_PRESSED || InputKey.DOWN_PRESSED || InputKey.FIRE_PRESSED);
}

InputKey.handleEvent = function(event)
{		
	var pressed = (event.type == 'keydown') ? true : false;
	switch (event.keyCode)
	{
		case InputKey.LEFT_CODE:
		case InputKey.LEFT_CODE_ALT:
			InputKey.LEFT_PRESSED = pressed;			
			break;
			
		case InputKey.UP_CODE:
		case InputKey.UP_CODE_ALT:
			InputKey.UP_PRESSED = pressed;
			break;
		
		case InputKey.RIGHT_CODE:
		case InputKey.RIGHT_CODE_ALT:
			InputKey.RIGHT_PRESSED = pressed;
			break;
		
		case InputKey.DOWN_CODE:
		case InputKey.DOWN_CODE_ALT:
			InputKey.DOWN_PRESSED = pressed;
			break;
			
		case InputKey.FIRE_CODE:
		case InputKey.FIRE_CODE_ALT:
			InputKey.FIRE_PRESSED = pressed;
			break;
	}
	var inputs = [];
	
	if (InputKey.LEFT_PRESSED) 	{ inputs.push(InputKey.LEFT); }
	if (InputKey.UP_PRESSED) 	{ inputs.push(InputKey.UP); }
	if (InputKey.RIGHT_PRESSED) { inputs.push(InputKey.RIGHT); }
	if (InputKey.DOWN_PRESSED) 	{ inputs.push(InputKey.DOWN); }
	if (InputKey.FIRE_PRESSED) 	{ inputs.push(InputKey.FIRE); }
	
	if (inputs.lenght > 0)
	{ event.preventDefault(); }
		
	InputKey.lastInput = inputs;
	
}
