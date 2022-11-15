function Utilities() {;}

Utilities.random = function (min, max)
{
	var result = Math.floor( Math.random() * (max - min + 1) + min );

	return result;
}

// Global function to translate a mouse/touch event (parameter) to the canvas coordinate system
Utilities.translateEvent = function (eventType, event)
{
	var e;
	switch (eventType)
	{
		// Touch Events
		case 'touch':
			e = {target:event.target, x:event.changedTouches[0].clientX, y:event.changedTouches[0].clientY};
			break;
		
		// Mouse Events
		case 'mouse':
		default:
			e = {target:event.target, x:event.clientX, y:event.clientY};
			break;
	}	

	
	//determine X and Y offsets based on the ratio of scaled tagret (oX = offsetX, oY=offsetY)
	var oX = e.target.width/e.target.clientWidth; 
	var oY = e.target.height/e.target.clientHeight;
		
	// Multiple the event x & y based on the ratio above
	// then subtract the target's space offset from the screen, also multiplied by the ratio
	// then subtract the target's scroll offset, also multiplied by the ration
	var eventX = parseInt((e.x * oX) - (e.target.offsetLeft*oX) - (document.body.scrollLeft*oX));
	var eventY = parseInt((e.y * oY) - (e.target.offsetTop*oY) + (document.body.scrollTop*oY));  
	
	// Return the x & y based as an object
	return new Vector2d(eventX, eventY);
}

// Global function to translate a touch only event (parameter) to the canvas coordinate system
Utilities.translateTouchEvent = function (touch)
{
	var targetX = touch.clientX - touch.target.offsetLeft;
	var targetY = touch.clientY - touch.target.offsetTop;
	
	return new Vector2d(targetX, targetY);
}

//
// easeSpeed = what divisor to use when determining how many steps to replicate. The high the number, the less extra steps are added
// 		example: an easeSpeed of 2 would cause half the of the steps to repeat, if used for easeIn AND easeOut it would produce exactly twice the steps
// easeStrength = how many of the same steps are replicated to created the ease. The higher the number, the slower the ease and longer the transition
// startPause/endPause = how many frames to extend the start and/or end 
Utilities.getStepArray = function (start, stop, increment, easeIn, easeOut, easeSpeed, easeStrength, startPause, endPause)
{
	var places
	
	if((''+increment).split('.').length > 1)
	{ places = (''+increment).split('.')[1].length; }
	else
	{ places = 0; }
	
	var speed = (easeSpeed == null || easeSpeed > 8 || easeSpeed < 2) ? 4 : easeSpeed;
	var strenght = (easeStrength == null) ? 2 : easeStrength;
	var startFrames = (startPause == null) ? 0 : startPause;
	var endFrames = (endPause == null) ? 0 : endPause;
	
	var startArray = [];
	for (var i=0; i<startFrames; i++) { startArray.push(start); }
		
	var tempsteps = [];
	var steps = [];
	if (start <= stop)
	{
		for (var i=start; i<=stop; i += increment)
		{
			var step = parseFloat(i.toFixed(places));
			tempsteps.push(step);
		}
	}
	else
	{
		for (var i=start; i>=stop; i -= increment)
		{
			var step = parseFloat(i.toFixed(places));
			tempsteps.push(step);		
		}
	}
	
	var easeInMax = Math.floor(tempsteps.length/speed);
	var easeOutMin = tempsteps.length - Math.floor(tempsteps.length/speed);
		
	for (var i=0; i<tempsteps.length; i++)
	{
		steps.push(tempsteps[i]);
		if ( (easeIn && i < easeInMax)  || (easeOut && i > easeOutMin) )
		{
			for (var j=0; j<strenght; j++)
			{ steps.push(tempsteps[i]); }
		}
		
	}
	
	var endArray = [];
	for (var i=0; i<endFrames; i++) { endArray.push(steps[steps.length-1]); }
	
	var returnValue = startArray.concat(steps, endArray);
	return returnValue;
}
