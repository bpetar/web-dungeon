
//containers and their content..

// id, name, model, icon, slot
var container_pickables_array1 = [[1,"ring","models/ring.js", "media/ring.png", 1, 0]];// id, name, model, icon, slot, picki
// id, name, model, x, z, orientation
var containers_array = [[1,"chest","models/chest.js", 0,8,1, container_pickables_array1]];
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
		chest.orientation = containers_array[i][5];
		if(chest.orientation == 0)
		{
			chest.position.x = containers_array[i][3]*SQUARE_SIZE;
			chest.position.z = containers_array[i][4]*SQUARE_SIZE+4;
			chest.rotation.y = 0;
		}
		else if(chest.orientation == 1)
		{
			chest.position.x = containers_array[i][3]*SQUARE_SIZE-4;
			chest.position.z = containers_array[i][4]*SQUARE_SIZE;
			chest.rotation.y = -Math.PI/2;
		}
		else if(chest.orientation == 2)
		{
			chest.position.x = containers_array[i][3]*SQUARE_SIZE;
			chest.position.z = containers_array[i][4]*SQUARE_SIZE-4;
			chest.rotation.y = -Math.PI;
		}
		else if(chest.orientation == 3)
		{
			chest.position.x = containers_array[i][3]*SQUARE_SIZE+4;
			chest.position.z = containers_array[i][4]*SQUARE_SIZE;
			chest.rotation.y = Math.PI/2;
		}
		
		loader.load( chest.model, chest.loadObject(chest) );
	}
}

//draw item icons in container gui
function container_fill_gui(containerID)
{
	var container_pickables_array = containers_array[containerID][6];
	
	for(var c=0; c<container_pickables_array.length; c++)
	{
		var slot = container_pickables_array[c][4];
		var slot_icon = document.getElementById("container_slots" + slot + "_item_icon");
		if(slot_icon)
		{
			slot_icon.src = container_pickables_array[c][3];
		}
	}
	container_div.style.display = "inline-block";
	currently_opened_container = containerID;
}

//add pickable item to current container
function add_to_container(gObject, slot) 
{

	if(currently_opened_container>-1)
	{
		var container_pickables_array = containers_array[currently_opened_container][6];
		
		var newContainerItem = new Array();
		newContainerItem[0] = gObject.id; //gameID ???
		newContainerItem[1] = gObject.name;
		newContainerItem[2] = gObject.model;
		newContainerItem[3] = gObject.icon;
		newContainerItem[4] = slot;
		newContainerItem[5] = gObject;
		
		//TODO check if container slot is occupied
		//if occupied, make switch between object in hand and object in container
		//alert("pera " + gObject.icon);
		
		//if container slot is free, place object in container
		container_pickables_array.push(newContainerItem);
		var slot_icon = document.getElementById("container_slots" + slot + "_item_icon");
		slot_icon.src = gObject.icon;
	}
	//TODO: start timer for automatic inventory draw back at later time..

}

function container_item_clicked(x_pos,y_pos)
{
	var slot = container_clicked_in_slot(x_pos,y_pos);
	
	if(slot>0)
	{
		//get item from currently_opened_container and place it in hand..
		var container_pickables_array = containers_array[currently_opened_container][6];
		for(var i=0; i<container_pickables_array.length; i++)
		{
			if(container_pickables_array[i][4] == slot)
			{
				//WE SHOULD NOT CREATE GAME OBJECT HERE IF IT IS ALREADY CREATED AND PLACED IN CONTAINER DURING THE GAME
				var picki = 0;
				if(container_pickables_array[i][5] == 0)
				{
					console.log("creating new item..");
					picki = create_game_object();
					picki.gameID = container_pickables_array[i][0];
					picki.name = container_pickables_array[i][1];
					picki.model = container_pickables_array[i][2];
					picki.icon = container_pickables_array[i][3];
					picki.niched = -1;
					picki.visible = false;
					//lets make 3d model here in case player wants to drop it in 3D world.. 
					var loader = new THREE.JSONLoader();
					loader.load( picki.model, picki.loadObject(picki) );
				}
				else
				{
					picki = container_pickables_array[i][5];
					console.log("not creating item, but using object already created..");
				}
				
				array_of_pickables.push(picki);
				
				//remove image icon from gui
				var slot_icon = document.getElementById("container_slots" + slot + "_item_icon");
				if(slot_icon)
				{
					slot_icon.src = "media/none.png";
				}
				
				container_pickables_array.splice(i,1);
				
				return picki;
			}
		}
	}
	
	return 0;
}

//check if player clicked in container gui
function container_clicked_in_slot(x_pos,y_pos)
{
	var left = windowHalfX - (NUM_SLOTS_INVENTORY_ROW/2*SLOT_WIDTH);
	var right = windowHalfX + (NUM_SLOTS_INVENTORY_ROW/2*SLOT_WIDTH);
	var bottom = SLOT_WIDTH + NUM_CONTAINER_ROWS*SLOT_WIDTH;
	var top = SLOT_WIDTH;
	
	if((x_pos > left)&&(x_pos < right))
	{
		if((y_pos > top) && (y_pos < bottom))
		{
			//clicked in the container gui.. 
			if(x_pos < left+SLOT_WIDTH)
				return 1;
			if(x_pos < left+2*SLOT_WIDTH)
				return 2;
			if(x_pos < left+3*SLOT_WIDTH)
				return 3;
			if(x_pos < left+4*SLOT_WIDTH)
				return 4;
		}
	}

	return -1;
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
	
	//TODO calculate position of mouse click within the container
	
	return -1;
}