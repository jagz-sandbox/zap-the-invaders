function Invador() {;}

// State Constants
Invador.STATE_STARTING		= -1;
Invador.STATE_HOME 			= 0;
Invador.STATE_PAUSED 		= 1;
Invador.STATE_PLAYING 		= 2;
Invador.STATE_SETUP			= 3;
Invador.STATE_LEVELSUMMARY 	= 4;
Invador.STATE_GAMEOVER 		= 5;

Invador.MAX_MOVING_ENEMIES  = 5;
Invador.MAX_ENEMY_MOVE_WAIT  = 60;

// Properties
Invador.state = null;
Invador.frames = 0;
Invador.input = [];
Invador.player = null;
Invador.inputType = InputType.KEY;
Invador.inputWait = 90;
Invador.inputCurrentWait = 0;
Invador.movingEnemies = 1;
Invador.enemyMoveWait = 0;

// Objects
Invador.background = null;
Invador.interlude = null;
Invador.appSize = new Size2d(App.width, App.height);

Invador.start = function()
{		
	Invador.background = new Background();	
	Invador.state = Invador.STATE_STARTING;
	Invador.gameLoop();	

	UserSession.init();
	
	HomeScreen.init(Invador.appSize);	
	Input.init(Invador.inputType, Invador.appSize);
	Invador.state = Invador.STATE_HOME;
}

Invador.restart = function()
{		
	Invador.movingEnemies = 0;
	App.removeAllAppLayers();
	Invador.background = new Background();	
	Invador.state = Invador.STATE_STARTING;
	UserSession.init();	
	HomeScreen.init(Invador.appSize);
	Input.init(Invador.inputType, Invador.appSize);	
	Invador.state = Invador.STATE_HOME;
}

Invador.initGame = function()
{		
	SessionOverlay.init(Invador.appSize, UserSession);			
	BattleField.init(Invador.appSize);			
	
	Callouts.init(Invador.appSize);	
	
	GamePad.init(Invador.appSize);
	Input.init(Invador.inputType, Invador.appSize);
	
	Invador.startNextLevel();
}

Invador.startNextLevel = function()
{	
	Player.init(BattleField.appLayer, Player.Position_CENTERBOTTOM, new Vector2d(0, -64));
	UserSession.currentLevel++;
	if (Invador.movingEnemies < Invador.MAX_MOVING_ENEMIES)
	{ Invador.movingEnemies++; }
	
	UserSession.levelScore = 0;
	Invador.lastGamepadInput= Invador.thisGamepadInput = Input.INPUT_NULL;
	Invador.enemies = [];
	Invador.initEnemies();
	EnemyProjectiles.init(BattleField.appLayer);
	Invador.state = Invador.STATE_PLAYING;
}

Invador.gameLoop = function()
{	
	Invador.frames++;
	
	Invador.getInput();
	Invador.updateElements();
	Invador.drawElements();

	requestAnimationFrame(Invador.gameLoop); 
}

Invador.initEnemies = function()
{
	var rows = 3;
	var colSpace = 75;
	var perRow = 6;
	var rowY = [136, 68, 0];
	var enemyStart = 250;
	for (var i=0; i<rows; i++)
	{
		for (var j=0; j<perRow; j++)
		{
			var loc = new Vector2d(enemyStart + j*colSpace, rowY[i]);
			Invador.enemies.push(new Enemy(BattleField.appLayer, loc, 2, 2));
		}
	}
		
	Invador.enemyMoveWait = 0;
}

Invador.getInput = function()
{		
	if (Invador.state === Invador.STATE_PLAYING)
	{	
		if (Invador.inputType == InputType.TOUCH)  // Get input from GamePad hit testing via touch input
		{ Invador.input = GamePad.inputHitTest(Invador.inputType, Input.lastInput); }
		else if (Invador.inputType == InputType.KEY)  // Get input from keyboard presses
		{ Invador.input = Input.lastInput; }
	}
	else if (Invador.state === Invador.STATE_SETUP)
	{
		
	}
	else if (Invador.state === Invador.STATE_HOME)
	{		
		Invador.inputCurrentWait--;
		if (Input.hasInput() && Invador.inputCurrentWait < 0)
		{			
			HomeScreen.animateOut(Invador.initGame);		
		}
	}
	else if (Invador.state === Invador.STATE_LEVELSUMMARY)
	{
		Invador.inputCurrentWait--;
		if (Input.hasInput() && Invador.inputCurrentWait < 0)
		{			
			LevelSummary.animateOut(Invador.startNextLevel);	
		}
	}
	else if (Invador.state === Invador.STATE_GAMEOVER)
	{
		Invador.inputCurrentWait--;
		if (Input.hasInput() && Invador.inputCurrentWait < 0)
		{			
			GameOver.animateOut(Invador.restart);		
		}
	}
}

Invador.updateElements = function()
{	
	if (Invador.state === Invador.STATE_PLAYING)
	{	
		Invador.playerUpdate();	
		Invador.enemiesUpdate();
		EnemyProjectiles.update();
			
		if (Player.state == Player.STATE_DEAD)
		{
			UserSession.livesLeft -= 1;						
			if ( UserSession.livesLeft < 1 )
			{
				Invador.state = Invador.STATE_GAMEOVER;
				
				if (UserSession.currentScore > UserSession.highScore)
				{ UserSession.highScore = UserSession.currentScore; }
				
				GameOver.init(Invador.appSize);
				Input.init(Invador.inputType, Invador.appSize);
				Invador.inputCurrentWait = Invador.inputWait;
			}
			else
			{
				if (Invador.enemies.length < 1)
				{
					Invador.state = Invador.STATE_LEVELSUMMARY;	
					LevelSummary.init(Invador.appSize);
					Input.init(Invador.inputType, Invador.appSize);
				}
				else
				{
					Invador.state = Invador.STATE_SETUP;
					PauseOverlay.init(Invador.appSize);
					PauseOverlay.animateOut(function() { Invador.state = Invador.STATE_PLAYING; });
					Player.init(BattleField.appLayer, Player.Position_CENTERBOTTOM, new Vector2d(0, -64));
					Invador.resetEnemies();
				}
			}
			return;
		}
		else if (Invador.enemies.length < 1 && Player.state != Player.STATE_DYING)
		{
			Invador.state = Invador.STATE_LEVELSUMMARY;	
			LevelSummary.init(Invador.appSize);
			EnemyProjectiles.clear();
			Input.init(Invador.inputType, Invador.appSize);
			Invador.inputCurrentWait = Invador.inputWait;
		}
	}
	
	Callouts.update();
}

Invador.resetEnemies = function()
{
	for (var i=0; i<Invador.enemies.length; i++)
	{
		Invador.enemies[i].reset();
	}
	
	EnemyProjectiles.init(BattleField.appLayer);
	Invador.enemyMoveWait = 0;
}

Invador.playerUpdate = function()
{	
	if (Player.state != Player.STATE_DEAD)
	{		
		for (var i=0; i<Invador.enemies.length; i++)
		{
			var enemy = Invador.enemies[i];
			if (Player.collideTest(enemy))
			{					
				Player.kill();
				enemy.kill();
				Invador.enemyMoveWait = 0;
			}
		}
		
		var enemyProjectiles = EnemyProjectiles.getProjectiles();
		for (var i=0; i<enemyProjectiles.length; i++)
		{
			var projectile = enemyProjectiles[i];
			if (Player.collideTest(projectile))
			{					
				Player.kill();
				projectile.kill();
			}
			
			
		}
		
		var playerActions = [];
		var padStates = [];
		
		// Player and Projectile Update
		for (var i=0; i<Invador.input.length; i++)
		{			
			var thisInput = Invador.input[i]; 
			var action = null;			
			padStates.push(thisInput);
			
			if (thisInput == InputAction.LEFT)
			{ action = Player.MOVE_LEFT; }
			else if (thisInput == InputAction.UP)
			{ action = Player.MOVE_UP; }
			else if (thisInput == InputAction.RIGHT)
			{ action = Player.MOVE_RIGHT; }
			else if (thisInput == InputAction.DOWN)
			{ action = Player.MOVE_DOWN; }
			else if (thisInput == InputAction.FIRE)
			{ action = Player.FIRE; }			
			playerActions.push(action);			
		}
	
		Player.update(playerActions);
		
		// Gamepad Update
		GamePad.showInput(padStates);
	}
	else if (Player.state == Player.STATE_DEAD)
	{
		Player.update([]);
	}
}

Invador.enemiesUpdate = function()
{
	// Enemies Update
	var tempEnemies = [];
	for (var i=0; i<Invador.enemies.length; i++)
	{	
		var collideArray = [];
		for (var j=0; j<Player.missles.length; j++)
		{
			var enemy = Invador.enemies[i];
			if (Invador.enemies[i].collideTest(Player.missles[j]))
			{
				enemy.kill();
				Player.missles[j].kill();	
				Callouts.addPointsCallout(enemy.location, '+'+enemy.points);
				Invador.enemyMoveWait = 0;
			}
		}
		
		var enemy = Invador.enemies[i];	
		enemy.update(collideArray);
		
		if (enemy.state != Enemy.STATE_DEAD)
		{ tempEnemies.push(enemy); }		
		else if (enemy.state == Enemy.STATE_DEAD)
		{
			UserSession.currentScore += enemy.points;
			UserSession.levelScore += enemy.points;	
		}
	}
	
	Invador.enemies = tempEnemies;	
	
	for (var i=0; i<Invador.enemies.length && i<Invador.movingEnemies; i++)
	{
		var enemy = Invador.enemies[i];
		if(!enemy.isMoving) 
		{
			if (Invador.enemyMoveWait <= 0)
			{
				enemy.isMoving = true;
				Invador.enemyMoveWait = Invador.MAX_ENEMY_MOVE_WAIT; 
			}
			else
			{
				Invador.enemyMoveWait--;
			}
		}
	}
}

Invador.drawElements = function()
{
	if (Invador.state === Invador.STATE_PLAYING)
	{
		BattleField.draw();
		Player.draw();
		GamePad.draw();	
		EnemyProjectiles.draw();
		Invador.drawEnemies();
		Callouts.draw();
			
		SessionOverlay.draw(UserSession);
	}
	else if (Invador.state === Invador.STATE_SETUP)
	{
		BattleField.draw();
		SessionOverlay.draw(UserSession);
		PauseOverlay.draw();	
				
		Invador.drawEnemies();
		Callouts.draw();
	}
	else if (Invador.state === Invador.STATE_HOME)
	{
		HomeScreen.draw();
	}
	else if (Invador.state === Invador.STATE_LEVELSUMMARY)
	{
		BattleField.draw();
		SessionOverlay.draw(UserSession);		
		Invador.drawEnemies();
		EnemyProjectiles.draw();
		Callouts.draw();
		LevelSummary.draw(UserSession.currentLevel, UserSession.levelScore, UserSession.currentScore, UserSession.livesLeft);
	}
	else if (Invador.state === Invador.STATE_GAMEOVER)
	{
		SessionOverlay.draw(UserSession);
		GameOver.draw(UserSession.currentScore);
		BattleField.draw();
		Player.draw();
		Invador.drawEnemies();
		EnemyProjectiles.draw();
		Callouts.draw();
	}

	Invador.background.draw();
}

Invador.drawEnemies = function()
{
	for (var i=0; i<Invador.enemies.length; i++)
	{ Invador.enemies[i].draw(); }
}




