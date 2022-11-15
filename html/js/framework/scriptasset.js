/*
ScriptAssets

require: N/A

notes: Scripts should appear in the order of priority/dependence (ie: if scriptA.js needs scriptB.js scriptA.js needs to appear first)
*/
ScriptAssets =
[
	new ScriptAsset('Utils', 'js/framework/utils.js')
	//, new ScriptAsset('Giant', 'js/giant.js') // For load testing
	, new ScriptAsset('Shared', 'js/framework/shared.js')
	, new ScriptAsset('InputTouch', 'js/framework/inputtouch.js')
	, new ScriptAsset('Input', 'js/framework/inputkey.js')
	, new ScriptAsset('Input', 'js/framework/input.js')
	, new ScriptAsset('Bounds', 'js/framework/bounds.js')
	, new ScriptAsset('Boundry', 'js/framework/boundry.js')
	, new ScriptAsset('GameObject', 'js/framework/gameobject.js')
	, new ScriptAsset('Sprite', 'js/framework/sprite.js')
	, new ScriptAsset('ImageAsset', 'js/framework/imageasset.js')
	, new ScriptAsset('Animator', 'js/framework/animator.js')
	, new ScriptAsset('Overlayer', 'js/framework/overlayer.js')		
	, new ScriptAsset('Button', 'js/framework/button.js')	
	, new ScriptAsset('GamePad', 'js/game/gamepad.js')
	, new ScriptAsset('Background', 'js/game/background.js')
	, new ScriptAsset('HomeScreen', 'js/game/homescreen.js')
	, new ScriptAsset('HomeScreen', 'js/game/pauseoverlay.js')
	, new ScriptAsset('SessionOverlay', 'js/game/gameover.js')
	, new ScriptAsset('SessionOverlay', 'js/game/levelsummary.js')
	, new ScriptAsset('Player', 'js/game/player.js')
	, new ScriptAsset('UserSession', 'js/game/usersession.js')
	, new ScriptAsset('SessionOverlay', 'js/game/sessionoverlay.js')
	, new ScriptAsset('Missle', 'js/game/battlefield.js')
	, new ScriptAsset('Missle', 'js/game/missle.js')
	, new ScriptAsset('Enemy', 'js/game/enemyprojectiles.js')
	, new ScriptAsset('Enemy', 'js/game/enemy.js')
	, new ScriptAsset('Enemy', 'js/game/calloutpoints.js')
	, new ScriptAsset('Enemy', 'js/game/callouts.js')
	, new ScriptAsset('Enemy', 'js/game/bonuses.js')
	
	, new ScriptAsset('Invador Game', 'js/game/invador.js') // always last
];

function ScriptAsset(assetName, uri)
{
	this.name = assetName;
	this.script = uri;
}