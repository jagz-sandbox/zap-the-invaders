function Animator(stepArray, stepCallback, finishCallback)
{
	this.steps = (stepArray == null) ? Utilities.getStepArray(0, 1, 0.1) : stepArray;
	this.onStep = 	(stepCallback == null) ? function () { console.log(this + ' Animator step'); } : stepCallback;
	this.onFinish = (finishCallback == null) ? function () { console.log(this + ' Animator finished'); } : finishCallback;
	
	this.animate = function()
	{	
		var step = this.steps.shift();
		
		if (this.steps.length > 0)
		{		
			this.onStep(step);
			var self = this;
			reqAnimationFrame(function(){self.animate();});
		}
		else
		{
			this.onFinish();
		}
	}
}