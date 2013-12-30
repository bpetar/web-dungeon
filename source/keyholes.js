
//keyholes

//this is array of keyholes
var array_of_keyholes = [];

//load keyhole 3d models on the map
function load_keyholes () {

	var loader = new THREE.JSONLoader();
	
	for(var i=0; i<keyholes_array.length; i++) {

		// id, model, x, z, pressed, script function..

		var keyhols = create_game_object();
		keyhols.gameID = keyholes_array[i][0];
		keyhols.name = "keyhole" + i;
		keyhols.locked = true;
		keyhols.model = keyholes_array[i][1];
		keyhols.orientation = keyholes_array[i][4];
		keyhols.onPressFunc = keyholes_array[i][5];
		keyhols.position.set((keyholes_array[i][2]-0.5)*SQUARE_SIZE,0.4*SQUARE_SIZE,(keyholes_array[i][3])*SQUARE_SIZE);
		keyhols.rotation.set(0, Math.PI/2, 0);
		
		loader.load( keyhols.model, keyhols.loadObject(keyhols) );
		
		array_of_keyholes.push(keyhols);
	}

}
