
//tapestries

//used in temp level loading
function reload_tapestries(levelObj)
{
	for(var i=0; i<levelObj.array_of_tapestries.length;i++)
	{
		scene.add(levelObj.array_of_tapestries[i].mesh);
	}
}

//load tapestrie 3d models on the map
function load_tapestries (loader,levelObj)
{
	for(var i=0; i<levelObj.tapestriesArr.length; i++) {
		var tapsy = create_game_object();
		tapsy.gameID = 0;
		tapsy.name = "tapestry";
		tapsy.model = levelObj.tapestriesArr[i][0];

		//position depending on orientation
		tapsy.orientation = levelObj.tapestriesArr[i][3];
		tapsy.position.y = 1;
		if(tapsy.orientation == 0)
		{
			//facing front
			tapsy.position.x = levelObj.tapestriesArr[i][1]*SQUARE_SIZE;
			tapsy.position.z = levelObj.tapestriesArr[i][2]*SQUARE_SIZE+4.8;
		}
		else if(tapsy.orientation == 1)
		{
			//facing right
			tapsy.position.x = levelObj.tapestriesArr[i][1]*SQUARE_SIZE-4.8;
			tapsy.position.z = levelObj.tapestriesArr[i][2]*SQUARE_SIZE;
			tapsy.rotation.set(0, -Math.PI/2, 0);
		}
		else if(tapsy.orientation == 2)
		{
			//facing back
			tapsy.position.x = levelObj.tapestriesArr[i][1]*SQUARE_SIZE;
			tapsy.position.z = levelObj.tapestriesArr[i][2]*SQUARE_SIZE-4.8;
			tapsy.rotation.set(0, Math.PI, 0);
		}
		else if(tapsy.orientation == 3)
		{
			//facing left
			tapsy.position.x = levelObj.tapestriesArr[i][1]*SQUARE_SIZE+4.8;
			tapsy.position.z = levelObj.tapestriesArr[i][2]*SQUARE_SIZE;
			tapsy.rotation.set(0, Math.PI/2, 0);
		}

		loadGameObjectCheck(loader, tapsy);
		levelObj.array_of_tapestries.push(tapsy);
	}

}
