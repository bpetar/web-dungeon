
//containers and their content..

var container_pickables_array1 = [[1,"ring","models/ring.js", "media/ring.png"]];// id, name, model, icon
// id, name, model, x, z, orientation
var containers_array = [[1,"chest","models/chest.js", 6,4,0, container_pickables_array1]];
var array_of_containers = [];
var currently_opened_container = -1;

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

//draw item icons in container gui
function container_fill_gui(containerID)
{
	var container_pickables_array = containers_array[containerID][6];
	//var container_pickables_array = containers_array[i][6];
	
	for(var c=0; c<container_pickables_array.length; c++)
	{
		var slot_icon = document.getElementById("container_slots" + 1 + "_item_icon");
		if(slot_icon)
		{
			slot_icon.src = container_pickables_array[c][3];
		}
	}
	container_div.style.display = "inline-block";
	currently_opened_container = containerID;
}

function container_item_clicked(x_pos,y_pos)
{
	var slot = container_clicked_in_slot(x_pos,y_pos);
	
	if(slot>0)
	{
		//get item from currently_opened_container and place it in hand..
		var container_pickables_array = containers_array[currently_opened_container][6];
		var picki = create_game_object();
		picki.gameID = container_pickables_array[slot-1][0];
		picki.name = container_pickables_array[slot-1][1];
		picki.model = container_pickables_array[slot-1][2];
		picki.icon = container_pickables_array[slot-1][3];
		picki.niched = -1;
		picki.visible = false;
		
		//lets make 3d model here in case player wants to drop it in 3D world.. 
		var loader = new THREE.JSONLoader();
		loader.load( picki.model, picki.loadObject(picki) );
		
		//remove image icon from gui
		var slot_icon = document.getElementById("container_slots" + slot + "_item_icon");
		if(slot_icon)
		{
			slot_icon.src = "media/none.png";
		}
		
		container_pickables_array.splice(slot-1,1);
		
		return picki;

		/*for (var i=0; i<container_array.length; i++)
		{
			if(container_array[i].slot == slot)
			{
				var slot_icon = document.getElementById("gui_slot" + slot + "_item_icon");
				slot_icon.src = "media/none.png";
				var ret = container_array[i].gObject;
				container_array.splice(i,1);
				return ret;
			}
		}*/
	}
	
	return 0;
}

//check if player clicked in container gui
function container_clicked_in_slot(x_pos,y_pos)
{
	return 1;
}

//check if player clicked on container 3d model
function container_clicked_on(x_pos,y_pos) {
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