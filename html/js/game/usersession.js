function UserSession() {;}

UserSession.highScore = 0;

UserSession.init = function()
{
	UserSession.currentLevel = 0;
	UserSession.currentScore = 0;
	UserSession.levelScore = 0;
	UserSession.livesLeft = 3;	
}