

// id, name, model, x, z
pickables_array = [[1,"healing","models/healing.js", 2,5], [2,"holy symbol","models/tost.js", 6,4]];

//load pickable 3d models on the map
function load_pickables () {

	var loader = new THREE.JSONLoader();
	
	for(var i=0; i<pickables_array.length; i++) {
		var picki = create_game_object();
		picki.id = pickables_array[i][0];
		picki.name = pickables_array[i][1];
		picki.model = pickables_array[i][2];
		picki.position.x = pickables_array[i][3]*SQUARE_SIZE+2;
		picki.position.z = pickables_array[i][4]*SQUARE_SIZE+4;
		loader.load( picki.model, picki.loadObject(picki) );
	}

	alert("pera1");
}
