/*
ImageAsset v 1.0

require: app.js v1.0 (AppLayer)
*/

function Background()
{
	this.redraw = true;
	this.imagebg = ImageAssets.getImageAssetByName('Background');
	this.images1 = ImageAssets.getImageAssetByName('Stars1');
	//this.images2 = ImageAssets.getImageAssetByName('Stars2');
	this.appLayer = new AppLayer('background', false);
	this.canvas = this.appLayer.canvas;
	this.context = this.appLayer.context;
	this.clip = [ {sx:0, sy:0, swidth:App.width, sheight:App.height}, 
					{sx:0, sy:0, swidth:App.width, sheight:App.height} ];
	
	this.draw = function()
	{	
		if (this.redraw)
		{
			this.context.clearRect(0, 0, this.imagebg.width, this.imagebg.height);
			this.context.drawImage(this.imagebg, this.clip[0].sx, this.clip[0].sy, this.clip[0].swidth, this.clip[0].sheight, 0, 0, App.width, App.height);
			this.context.drawImage(this.images1, this.clip[1].sx, this.clip[1].sy, this.clip[1].swidth, this.clip[1].sheight, 0, 0, App.width, App.height);
		}
		
		this.redraw = false;
	}
}