
//pressure plates

//this is array of plates
var array_of_plates = [];


//load plate 3d models on the map
function load_plates () {

	var loader = new THREE.JSONLoader();
	
	for(var i=0; i<plates_array.length; i++) {

		// id, model, x, z, pressed, script function..

		var platsy = create_game_object();
		platsy.gameID = plates_array[i][0];
		platsy.name = "plate" + i;
		platsy.model = plates_array[i][1];
		platsy.pressed = plates_array[i][4];
		platsy.onPressFunc = plates_array[i][5];
		platsy.onUnpressFunc = plates_array[i][6];
		platsy.position.y = 0;
		platsy.position.x = plates_array[i][2]*SQUARE_SIZE;
		platsy.position.z = plates_array[i][3]*SQUARE_SIZE;

		//loader.load( platsy.model, platsy.loadObject(platsy) );
		loadGameObjectCheck(loader, platsy);
		
		array_of_plates.push(platsy);
	}

}

function standing_on_plate()
{
	//check if player is standing on plate
	for(var n=0; n<plates_array.length; n++)
	{
		if((current_position.x == plates_array[n][2])&&(current_position.z == plates_array[n][3]))
		{
			//standing on plate position..
			return n;
		}
	}
	return -1;
}

function clicking_on_plate()
{
	for(var n=0; n<plates_array.length; n++)
	{
		//standing in front of plate?
		var looker = new THREE.Vector3(0, 0, 0).add(camera.look);
		looker.sub(camera.position);
		var lookie = new THREE.Vector3(0,0,0).add(looker);
		lookie.normalize();
					
		if(((current_position.z == plates_array[n][3]-1)&&(current_position.x == plates_array[n][2])&&(lookie.x==0)&&(lookie.z ==1))
		||((current_position.z == plates_array[n][3]+1)&&(current_position.x == plates_array[n][2])&&(lookie.x==0)&&(lookie.z ==-1))
		||((current_position.z == plates_array[n][3])&&(current_position.x == plates_array[n][2]+1)&&(lookie.x==+1)&&(lookie.z ==0))
		||((current_position.z == plates_array[n][3])&&(current_position.x == plates_array[n][2]-1)&&(lookie.x==-1)&&(lookie.z ==0)))
		{
			console.log("looking at plate yes!");
			return n;
		}
	}
	return -1;
}

function item_on_plate (item)
{
	//check if item is standing on plate
	for(var n=0; n<plates_array.length; n++)
	{
		if((item.x == plates_array[n][2])&&(item.z == plates_array[n][3]))
		{
			//item standing on plate position..
			console.log("item standing_on_plate yes!");
			return n;
		}
	}
	console.log("item standing_on_plate no :(");
	return -1;
}