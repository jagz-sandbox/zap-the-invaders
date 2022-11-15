/*
ImageAsset v 1.0

require: N/A
*/

function ImageAssets() {;}

ImageAssets.images =
[
	new ImageAsset('Background', 'assets/image/background.jpg')
	, new ImageAsset('Stars1', 'assets/image/stars1.png')
	, new ImageAsset('FPOSprite', 'assets/image/sprites_fpo.png')
	, new ImageAsset('ControllerLeft', 'assets/image/sprites_controller_left.png')
	, new ImageAsset('ControllerRight', 'assets/image/sprites_controller_right.png')
	, new ImageAsset('ControllerFire', 'assets/image/sprites_controller_fire.png')
	, new ImageAsset('Player', 'assets/image/sprites_player.png')
	, new ImageAsset('OverlayBack', 'assets/image/overlayback.png')
	, new ImageAsset('Missle', 'assets/image/missle.png')
	, new ImageAsset('Enemy', 'assets/image/sprites_enemy.png')	
	, new ImageAsset('EnemyMissle', 'assets/image/missle_enemy.png')	
		
	//, new ImageAsset('GiantRemote', 'http://www.josephagonzalez.com/linkouts/giant.jpg') // for load testing
];

ImageAssets.getImageAssetByName = function(name)
{
	for(var i=0; i<ImageAssets.images.length; i++)
	{		
		if (ImageAssets.images[i].name == name)
		{
			return ImageAssets.images[i].image;
		}
	}	
	return null;
}


function ImageAsset(assetName, uri)
{
	this.name = assetName;
	this.image = new Image();
	this.image.src = uri;
}

