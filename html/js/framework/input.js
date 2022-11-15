function InputType () {;}
InputType.TOUCH = 100;
InputType.KEY	= 101;
InputType.MOUSE	= 102;

function InputAction() {;}
InputAction.LEFT 	= 'left';
InputAction.FIRE 	= 'fire';
InputAction.RIGHT 	= 'right';
InputAction.UP 		= 'up';
InputAction.DOWN 	= 'down';
InputAction.NOINPUT	= 'noinput';

function Input() {;}
Input.init = function(type, size)
{
	if (type == InputType.TOUCH)
	{
		InputTouch.init(size);
		Input = InputTouch;
	}
	else if (type == InputType.KEY)
	{ 
		InputKey.init();
		Input = InputKey;
	}
}