function SessionOverlay() {;}

SessionOverlay.init = function(size)
{	
	SessionOverlay.appLayer = new AppLayer('SessionOverlay', false, size.w, size.h, null);
	SessionOverlay.redraw = true;	
	SessionOverlay.horizontalPad = 10;
	SessionOverlay.verticalPad = 10;
	
	var context = SessionOverlay.appLayer.context;
	SessionOverlay.lineHeight = 24;	
	context.fillStyle = 'rgb(255,255,255)';
	context.textAlign = 'left';
	context.font = '15px "arial"';
	context.textBaseline = 'top';
}

SessionOverlay.setTextStyle = function(id)
{
	var context = SessionOverlay.appLayer.context;
	switch (id)
	{
		case 'left':
			context.textAlign = 'left';
			break;
		
		case 'right':			
			context.textAlign = 'right';
			break;	
	}
}

SessionOverlay.update = function()
{
	
}

SessionOverlay.draw = function(sessionObject)
{		
	var canvas = SessionOverlay.appLayer.canvas;
	var context = SessionOverlay.appLayer.context;
	context.clearRect(0, 0, canvas.width, canvas.height);	
	SessionOverlay.setTextStyle('left');
	context.fillText('Level ' + sessionObject.currentLevel, SessionOverlay.horizontalPad, SessionOverlay.verticalPad);
	context.fillText('Score: ' + sessionObject.currentScore, SessionOverlay.horizontalPad, SessionOverlay.verticalPad+SessionOverlay.lineHeight*1);
	context.fillText('Lives: ' + sessionObject.livesLeft, SessionOverlay.horizontalPad, SessionOverlay.verticalPad+SessionOverlay.lineHeight*2);
	SessionOverlay.setTextStyle('right')
	context.fillText('High Score: ' + sessionObject.highScore, canvas.width - SessionOverlay.horizontalPad, SessionOverlay.verticalPad);
	SessionOverlay.redraw = false;
}