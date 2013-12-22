
//pressure plates

//this is array of plates
var array_of_buttons = [];


//load plate 3d models on the map
function load_buttons () {

	var loader = new THREE.JSONLoader();
	
	for(var i=0; i<buttons_array.length; i++) {

		// id, model, x, z, pressed, script function..

		var butsy = create_game_object();
		butsy.gameID = buttons_array[i][0];
		butsy.name = "button" + i;
		butsy.model = buttons_array[i][1];
		butsy.pressed = false;
		butsy.orientation = buttons_array[i][4];
		butsy.onPressFunc = buttons_array[i][5];
		butsy.position.set((buttons_array[i][2]-0.5)*SQUARE_SIZE,0.4*SQUARE_SIZE,(buttons_array[i][3])*SQUARE_SIZE);
		butsy.rotation.set(0, Math.PI/2, 0);
		
		loader.load( butsy.model, butsy.loadObject(butsy) );
		
		array_of_buttons.push(butsy);
	}

}
