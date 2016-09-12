
//keyholes

//used in temp level loading
function reload_keyholes(levelObj)
{
	for(var i=0; i<levelObj.array_of_keyholes.length;i++)
	{
		scene.add(levelObj.array_of_keyholes[i].mesh);
	}
}

//load keyhole 3d models on the map
function load_keyholes (loader,levelObj) {

	for(var i=0; i<levelObj.keyholesArr.length; i++) {

		// id, model, x, z, pressed, script function..

		var keyhols = create_game_object();
		keyhols.gameID = levelObj.keyholesArr[i][0];
		keyhols.name = "keyhole" + i;
		keyhols.locked = 1;
		keyhols.model = levelObj.keyholesArr[i][1];
		keyhols.map_position.x = levelObj.keyholesArr[i][2];
		keyhols.map_position.z = levelObj.keyholesArr[i][3];
		keyhols.orientation = levelObj.keyholesArr[i][4];

		//set position depending on orientation
		if(keyhols.orientation==0)
		{
			keyhols.position.set((levelObj.keyholesArr[i][2])*SQUARE_SIZE,0.4*SQUARE_SIZE,(levelObj.keyholesArr[i][3]+0.5)*SQUARE_SIZE);
			keyhols.rotation.set(0, 0, 0);
		}
		if(keyhols.orientation==1)
		{
			keyhols.position.set((levelObj.keyholesArr[i][2]-0.5)*SQUARE_SIZE,0.4*SQUARE_SIZE,(levelObj.keyholesArr[i][3])*SQUARE_SIZE);
			keyhols.rotation.set(0, Math.PI/2, 0);
		}
		if(keyhols.orientation==2)
		{
			keyhols.position.set((levelObj.keyholesArr[i][2])*SQUARE_SIZE,0.4*SQUARE_SIZE,(levelObj.keyholesArr[i][3]-0.5)*SQUARE_SIZE);
			keyhols.rotation.set(0, 2*Math.PI/2, 0);
		}
		if(keyhols.orientation==3)
		{
			keyhols.position.set((levelObj.keyholesArr[i][2]+0.5)*SQUARE_SIZE,0.4*SQUARE_SIZE,(levelObj.keyholesArr[i][3])*SQUARE_SIZE);
			keyhols.rotation.set(0, 3*Math.PI/2, 0);
		}
		
		//get js function from string
		var onPressFn = window[levelObj.keyholesArr[i][5]];
		if(typeof onPressFn === 'function') 
		{
			keyhols.onPressFunc = onPressFn;
		}
		else
		{
			keyhols.onPressFunc = missing_click_function;
		}
			
		loadGameObjectCheck(loader, keyhols);
		
		levelObj.array_of_keyholes.push(keyhols);
	}

}

//load saved keyhole state
function load_saved_keyhole_states(loader, levelObj, saved_keyholes) 
{

	for(var i=0; i<levelObj.array_of_keyholes.length; i++) 
	{
		levelObj.array_of_keyholes[i].locked = saved_keyholes[i];
	}
}

//load saved keyholes
function load_saved_keyholes (loader, levelObj, saved_keyholes) {

	for(var i=0; i<levelObj.keyholesArr.length; i++) {

		// id, model, x, z, orientation, script function..

		var keyhols = create_game_object();
		keyhols.gameID = levelObj.keyholesArr[i][0];
		keyhols.name = "keyhole" + i;
		keyhols.locked = saved_keyholes[i];
		keyhols.model = levelObj.keyholesArr[i][1];
		keyhols.map_position.x = levelObj.keyholesArr[i][2];
		keyhols.map_position.z = levelObj.keyholesArr[i][3];
		keyhols.orientation = levelObj.keyholesArr[i][4];

		//set position depending on orientation
		if(keyhols.orientation==0)
		{
			keyhols.position.set((levelObj.keyholesArr[i][2])*SQUARE_SIZE,0.4*SQUARE_SIZE,(levelObj.keyholesArr[i][3]+0.5)*SQUARE_SIZE);
			keyhols.rotation.set(0, 0, 0);
		}
		if(keyhols.orientation==1)
		{
			keyhols.position.set((levelObj.keyholesArr[i][2]-0.5)*SQUARE_SIZE,0.4*SQUARE_SIZE,(levelObj.keyholesArr[i][3])*SQUARE_SIZE);
			keyhols.rotation.set(0, Math.PI/2, 0);
		}
		if(keyhols.orientation==2)
		{
			keyhols.position.set((levelObj.keyholesArr[i][2])*SQUARE_SIZE,0.4*SQUARE_SIZE,(levelObj.keyholesArr[i][3]-0.5)*SQUARE_SIZE);
			keyhols.rotation.set(0, 2*Math.PI/2, 0);
		}
		if(keyhols.orientation==3)
		{
			keyhols.position.set((levelObj.keyholesArr[i][2]+0.5)*SQUARE_SIZE,0.4*SQUARE_SIZE,(levelObj.keyholesArr[i][3])*SQUARE_SIZE);
			keyhols.rotation.set(0, 3*Math.PI/2, 0);
		}
		
		//get js function from string
		var onPressFn = window[levelObj.keyholesArr[i][5]];
		if(typeof onPressFn === 'function') 
		{
			keyhols.onPressFunc = onPressFn;
		}
		else
		{
			keyhols.onPressFunc = missing_click_function;
		}
			
		loadGameObjectCheck(loader, keyhols);
		
		levelObj.array_of_keyholes.push(keyhols);
	}

}