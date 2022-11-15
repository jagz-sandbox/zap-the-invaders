function EnemyProjectiles() {;}

EnemyProjectiles.init = function(appLayer)
{	
	EnemyProjectiles.appLayer = appLayer;
	EnemyProjectiles.clear();
}

EnemyProjectiles.clear = function()
{
	EnemyProjectiles.projectiles = [];
}

EnemyProjectiles.addProjectile = function(projectile)
{
	EnemyProjectiles.projectiles.push(projectile);
}

EnemyProjectiles.getProjectiles = function()
{
	return EnemyProjectiles.projectiles;
}


EnemyProjectiles.update = function()
{
	var tempArray = [];
	for (var i=0; i<EnemyProjectiles.projectiles.length; i++)
	{
		var projectile = EnemyProjectiles.projectiles[i];
		if (projectile.alive)
		{
			projectile.update();
			tempArray.push(projectile);
		}
	}
	
	EnemyProjectiles.projectiles = tempArray;
}

EnemyProjectiles.draw = function()
{
	var context = EnemyProjectiles.appLayer.context;
	
	for (var i=0; i<EnemyProjectiles.projectiles.length; i++)
	{
		var projectile = EnemyProjectiles.projectiles[i];
		projectile.draw(context);
	}
}