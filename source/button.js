
//buttons

//used in temp level loading
function reload_buttons(levelObj)
{
	for(var i=0; i<levelObj.array_of_buttons.length;i++)
	{
		scene.add(levelObj.array_of_buttons[i].mesh);
	}
}

//load button 3d models on the map
function load_buttons (loader, levelObj) {

	for(var i=0; i<levelObj.buttonsArr.length; i++) {

		// id, model, x, z, pressed, script function..

		var butsy = create_game_object();
		butsy.gameID = levelObj.buttonsArr[i][0];
		butsy.name = "button" + i;
		butsy.model = levelObj.buttonsArr[i][1];
		butsy.pressed = 0;
		butsy.map_position.set(levelObj.buttonsArr[i][2],0,levelObj.buttonsArr[i][3]);
		butsy.orientation = levelObj.buttonsArr[i][4];
		
		//set position depending on orientation
		if(butsy.orientation==0)
		{
			butsy.position.set((levelObj.buttonsArr[i][2])*SQUARE_SIZE,0.4*SQUARE_SIZE,(levelObj.buttonsArr[i][3]+0.5)*SQUARE_SIZE);
			butsy.rotation.set(0, 0, 0);
		}
		if(butsy.orientation==1)
		{
			butsy.position.set((levelObj.buttonsArr[i][2]-0.5)*SQUARE_SIZE,0.4*SQUARE_SIZE,(levelObj.buttonsArr[i][3])*SQUARE_SIZE);
			butsy.rotation.set(0, Math.PI/2, 0);
		}
		if(butsy.orientation==2)
		{
			butsy.position.set((levelObj.buttonsArr[i][2])*SQUARE_SIZE,0.4*SQUARE_SIZE,(levelObj.buttonsArr[i][3]-0.5)*SQUARE_SIZE);
			butsy.rotation.set(0, 2*Math.PI/2, 0);
		}
		if(butsy.orientation==3)
		{
			butsy.position.set((levelObj.buttonsArr[i][2]+0.5)*SQUARE_SIZE,0.4*SQUARE_SIZE,(levelObj.buttonsArr[i][3])*SQUARE_SIZE);
			butsy.rotation.set(0, 3*Math.PI/2, 0);
		}
		
		//get js function from string
		var onPressFn = window[levelObj.buttonsArr[i][5]];
		if(typeof onPressFn === 'function') 
		{
			butsy.onPressFunc = onPressFn;
		}
		else
		{
			butsy.onPressFunc = missing_click_function;
		}

		loadGameObjectCheck(loader, butsy);
		
		levelObj.array_of_buttons.push(butsy);
	}

}


//load button 3d models on the map
function load_saved_buttons (loader, levelObj, saved_buttons) {

	for(var i=0; i<levelObj.buttonsArr.length; i++) {

		// id, model, x, z, pressed, script function..

		var butsy = create_game_object();
		butsy.gameID = levelObj.buttonsArr[i][0];
		butsy.name = "button" + i;
		butsy.model = levelObj.buttonsArr[i][1];
		butsy.pressed = saved_buttons[i];
		butsy.map_position.set(levelObj.buttonsArr[i][2],0,levelObj.buttonsArr[i][3]);
		butsy.orientation = levelObj.buttonsArr[i][4];
	
		//set position depending on orientation
		if(butsy.orientation==0)
		{
			butsy.position.set((levelObj.buttonsArr[i][2])*SQUARE_SIZE,0.4*SQUARE_SIZE,(levelObj.buttonsArr[i][3]+0.5)*SQUARE_SIZE);
			butsy.rotation.set(0, 0, 0);
		}
		if(butsy.orientation==1)
		{
			butsy.position.set((levelObj.buttonsArr[i][2]-0.5)*SQUARE_SIZE,0.4*SQUARE_SIZE,(levelObj.buttonsArr[i][3])*SQUARE_SIZE);
			butsy.rotation.set(0, Math.PI/2, 0);
		}
		if(butsy.orientation==2)
		{
			butsy.position.set((levelObj.buttonsArr[i][2])*SQUARE_SIZE,0.4*SQUARE_SIZE,(levelObj.buttonsArr[i][3]-0.5)*SQUARE_SIZE);
			butsy.rotation.set(0, 2*Math.PI/2, 0);
		}
		if(butsy.orientation==3)
		{
			butsy.position.set((levelObj.buttonsArr[i][2]+0.5)*SQUARE_SIZE,0.4*SQUARE_SIZE,(levelObj.buttonsArr[i][3])*SQUARE_SIZE);
			butsy.rotation.set(0, 3*Math.PI/2, 0);
		}

		//if button is pressed, load it budged
		if(butsy.pressed == 1)
		{
			//budge depends on orientation
			if(butsy.orientation == 1)
				butsy.position.x -= 0.05;
			if(butsy.orientation == 3)
				butsy.position.x += 0.05;
			if(butsy.orientation == 0)
				butsy.position.z += 0.05;
			if(butsy.orientation == 2)
				butsy.position.z -= 0.05;
		}

		//get js function from string
		var onPressFn = window[levelObj.buttonsArr[i][5]];
		if(typeof onPressFn === 'function') 
		{
			butsy.onPressFunc = onPressFn;
		}
		else
		{
			butsy.onPressFunc = missing_click_function;
		}

		loadGameObjectCheck(loader, butsy);
		
		levelObj.array_of_buttons.push(butsy);
	}

}

