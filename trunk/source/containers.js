
//containers and their content..

var container_pickables_array1 = [[1,"healing","models/healing.js", "media/potion.png"]];// id, name, model, icon
// id, name, model, x, z, orientation
var containers_array = [[1,"crate","models/chest.js", 6,4,0, container_pickables_array1]];
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

//check if player clicked in container
function container_clicked_in(x_pos,y_pos) {
	//check if player is facing container first
	for(var n=0; n<containers_array.length; n++)
	{
		if((current_position.x == containers_array[n][3])&&(current_position.z == containers_array[n][4]))
		{
			//standing in container position, now lets check facing..
			var looker = new THREE.Vector3(0, 0, 0).add(camera.look);
			looker.sub(camera.position);
			if (looker.x > 0) {
				//facing left
				if(containers_array[n][5] == 3)
					return n;
			} else if (looker.x < 0) {
				//facing right
				if(containers_array[n][5] == 1)
					return n;
			} else if (looker.z < 0) {
				//facing back
				if(containers_array[n][5] == 2)
					return n;
			} else if (looker.z > 0) {
				//facing front
				if(containers_array[n][5] == 0)
					return n;
			}
			
		}
	}
	
	//calculate position of mouse click within the container
	
	return -1;
}