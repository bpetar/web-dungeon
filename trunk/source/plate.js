
//pressure plates



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

		loader.load( platsy.model, platsy.loadObject(platsy) );
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
			return true;
		}
	}
	return false;
}
