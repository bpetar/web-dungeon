

// id, name, model, x, z, icon
var pickables_array = [[2,"rock","models/rocky.js", 6,2, "media/rock.png"]];

//this is array of pickables on the ground, but also of those lying in the niches (added in niche.js)
var array_of_pickables = [];

//load pickable 3d models on the map
function load_pickables () {

	var loader = new THREE.JSONLoader();
	
	for(var i=0; i<pickables_array.length; i++) {
		var picki = create_game_object();
		picki.gameID = pickables_array[i][0];
		picki.name = pickables_array[i][1];
		picki.model = pickables_array[i][2];
		picki.position.x = pickables_array[i][3]*SQUARE_SIZE+2;
		picki.position.z = pickables_array[i][4]*SQUARE_SIZE+4;
		picki.position.y = 0;
		picki.icon = pickables_array[i][5];
		picki.niched = -1; //flag indicating if pickable is in the niche
		//alert("pera " + picki.model);
		loader.load( picki.model, picki.loadObject(picki) );
		
		array_of_pickables.push(picki);
	}

	//alert("pera1");
}
