
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
		keyhols.locked = true;
		keyhols.model = levelObj.keyholesArr[i][1];
		keyhols.orientation = levelObj.keyholesArr[i][4];
		keyhols.position.set((levelObj.keyholesArr[i][2]-0.5)*SQUARE_SIZE,0.4*SQUARE_SIZE,(levelObj.keyholesArr[i][3])*SQUARE_SIZE);
		keyhols.rotation.set(0, Math.PI/2, 0);
		
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
