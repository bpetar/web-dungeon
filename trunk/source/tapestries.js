

// id, name, model, x, z, icon
var tapestries_array = [["models/tapestry1.js", 16,0,2], ["models/tapestry1.js", 19,10,3], ["models/tapestry1.js", 19,12,3], ["models/tapestry1.js", 0,9,1], ["models/tapestry2.js", 6,2,3]];

//load tapestie 3d models on the map
function load_tapestries () {

	var loader = new THREE.JSONLoader();
	
	for(var i=0; i<tapestries_array.length; i++) {
		var tapsy = create_game_object();
		tapsy.gameID = 0;
		tapsy.name = "tapestry";
		tapsy.model = tapestries_array[i][0];

		//position depending on orientation
		tapsy.orientation = tapestries_array[i][3];
		tapsy.position.y = 1;
		if(tapsy.orientation == 0)
		{
			//facing front
			tapsy.position.x = tapestries_array[i][1]*SQUARE_SIZE;
			tapsy.position.z = tapestries_array[i][2]*SQUARE_SIZE+4.8;
		}
		else if(tapsy.orientation == 1)
		{
			//facing right
			tapsy.position.x = tapestries_array[i][1]*SQUARE_SIZE-4.8;
			tapsy.position.z = tapestries_array[i][2]*SQUARE_SIZE;
			tapsy.rotation.set(0, -Math.PI/2, 0);
		}
		else if(tapsy.orientation == 2)
		{
			//facing back
			tapsy.position.x = tapestries_array[i][1]*SQUARE_SIZE;
			tapsy.position.z = tapestries_array[i][2]*SQUARE_SIZE-4.8;
			tapsy.rotation.set(0, Math.PI, 0);
		}
		else if(tapsy.orientation == 3)
		{
			//facing left
			tapsy.position.x = tapestries_array[i][1]*SQUARE_SIZE+4.8;
			tapsy.position.z = tapestries_array[i][2]*SQUARE_SIZE;
			tapsy.rotation.set(0, Math.PI/2, 0);
		}


		loader.load( tapsy.model, tapsy.loadObject(tapsy) );
	}

	//alert("pera1");
}
