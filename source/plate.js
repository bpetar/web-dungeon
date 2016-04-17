
//pressure plates

//used in temp level loading
function reload_plates(levelObj)
{
	for(var i=0; i<levelObj.array_of_plates.length;i++)
	{
		scene.add(levelObj.array_of_plates[i].mesh);
	}
}

//load plate 3d models on the map
function load_plates (loader,levelObj) {

	for(var i=0; i<levelObj.platesArr.length; i++) {

		// id, model, x, z, pressed, script function..

		var platsy = create_game_object();
		platsy.gameID = levelObj.platesArr[i][0];
		platsy.name = "plate" + i;
		platsy.model = levelObj.platesArr[i][1];
		platsy.pressed = levelObj.platesArr[i][4];
		
		//get js function from string
		var onPressFn = window[levelObj.platesArr[i][5]];
		if(typeof onPressFn === 'function') 
		{
			platsy.onPressFunc = onPressFn;
		}
		else
		{
			platsy.onPressFunc = missing_click_function;
		}
		
		
		//get js function from string
		var onUnPressFn = window[levelObj.platesArr[i][6]];
		if(typeof onUnPressFn === 'function') 
		{
			platsy.onUnpressFunc = onUnPressFn;
		}
		else
		{
			platsy.onUnpressFunc = missing_click_function;
		}
		
		platsy.position.y = 0;
		platsy.position.x = levelObj.platesArr[i][2]*SQUARE_SIZE;
		platsy.position.z = levelObj.platesArr[i][3]*SQUARE_SIZE;

		//loader.load( platsy.model, platsy.loadObject(platsy) );
		loadGameObjectCheck(loader, platsy);
		
		levelObj.array_of_plates.push(platsy);
	}

}

function standing_on_plate(levelObj)
{
	//check if player is standing on plate
	for(var n=0; n<levelObj.platesArr.length; n++)
	{
		if((current_position.x == levelObj.platesArr[n][2])&&(current_position.z == levelObj.platesArr[n][3]))
		{
			//standing on plate position..
			return n;
		}
	}
	return -1;
}

function standingOnPlatePos(x,z,levelObj)
{
	//check if player is standing on plate
	for(var n=0; n<levelObj.platesArr.length; n++)
	{
		if((x == levelObj.platesArr[n][2])&&(z == levelObj.platesArr[n][3]))
		{
			//standing on plate position..
			return n;
		}
	}
	return -1;
}

function clicking_on_plate(levelObj)
{
	for(var n=0; n<levelObj.platesArr.length; n++)
	{
		//standing in front of plate?
		var looker = new THREE.Vector3(0, 0, 0).add(camera.look);
		looker.sub(camera.position);
		var lookie = new THREE.Vector3(0,0,0).add(looker);
		lookie.normalize();
					
		if(((current_position.z == levelObj.platesArr[n][3]-1)&&(current_position.x == levelObj.platesArr[n][2])&&(lookie.x==0)&&(lookie.z ==1))
		||((current_position.z == levelObj.platesArr[n][3]+1)&&(current_position.x == levelObj.platesArr[n][2])&&(lookie.x==0)&&(lookie.z ==-1))
		||((current_position.z == levelObj.platesArr[n][3])&&(current_position.x == levelObj.platesArr[n][2]+1)&&(lookie.x==+1)&&(lookie.z ==0))
		||((current_position.z == levelObj.platesArr[n][3])&&(current_position.x == levelObj.platesArr[n][2]-1)&&(lookie.x==-1)&&(lookie.z ==0)))
		{
			console.log("looking at plate yes!");
			return n;
		}
	}
	return -1;
}

function someItemIsOnThePlate(plateID,levelObj)
{
	for(var n=0; n<levelObj.array_of_pickables.length; n++)
	{
		if(levelObj.array_of_pickables[n].plated == plateID)
			return true;
	}
	
	return false;
}

//this function checks item on any plate, I dont think this is used anywhere??
function item_on_plate(item,levelObj)
{
	//check if item is standing on plate
	for(var n=0; n<levelObj.platesArr.length; n++)
	{
		if((item.x == levelObj.platesArr[n][2])&&(item.z == levelObj.platesArr[n][3]))
		{
			//item standing on plate position..
			console.log("item standing_on_plate yes!");
			return n;
		}
	}
	console.log("item standing_on_plate no :(");
	return -1;
}