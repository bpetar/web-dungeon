

// id, name, model, x, z, orientation
var containers_array = [[1,"crate","models/chest.js", 6,4,0]];
var array_of_containers = [];

//load chests on the map
function load_containers () {

	var loader = new THREE.JSONLoader();
	
	for(var i=0; i<containers_array.length; i++) {
		var chest = create_game_object();
		chest.gameID = containers_array[i][0];
		chest.name = containers_array[i][1];
		chest.model = containers_array[i][2];
		//position depends on orientation
		chest.position.x = containers_array[i][3]*SQUARE_SIZE;
		chest.position.z = containers_array[i][4]*SQUARE_SIZE+4;
		chest.orientation = containers_array[i][5];
		loader.load( chest.model, chest.loadObject(chest) );
		array_of_containers.push(chest);
	}
}
