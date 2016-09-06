
//containers and their content..

var currently_opened_container = -1;

//used in temp level loading
function reload_containers(levelObj)
{
	for(var i=0; i<levelObj.array_of_containers.length;i++)
	{
		scene.add(levelObj.array_of_containers[i].mesh);
	}
}


//load saved chests on the map
function load_saved_containers (loader, saved_containers, levelObj) 
{
	for(var i=0; i<levelObj.containersArr.length; i++) 
	{
		var chest = create_game_object();
		chest.gameID = levelObj.containersArr[i][0];
		chest.name = levelObj.containersArr[i][1];
		chest.model = levelObj.containersArr[i][2];
		
		chest.xpos = levelObj.containersArr[i][3];
		chest.ypos = levelObj.containersArr[i][4];
				
		//position depends on orientation
		chest.orientation = levelObj.containersArr[i][5];
		if(chest.orientation == 0)
		{
			chest.position.x = levelObj.containersArr[i][3]*SQUARE_SIZE;
			chest.position.z = levelObj.containersArr[i][4]*SQUARE_SIZE+4;
			chest.rotation.y = 0;
		}
		else if(chest.orientation == 1)
		{
			chest.position.x = levelObj.containersArr[i][3]*SQUARE_SIZE-4;
			chest.position.z = levelObj.containersArr[i][4]*SQUARE_SIZE;
			chest.rotation.y = -Math.PI/2;
		}
		else if(chest.orientation == 2)
		{
			chest.position.x = levelObj.containersArr[i][3]*SQUARE_SIZE;
			chest.position.z = levelObj.containersArr[i][4]*SQUARE_SIZE-4;
			chest.rotation.y = -Math.PI;
		}
		else if(chest.orientation == 3)
		{
			chest.position.x = levelObj.containersArr[i][3]*SQUARE_SIZE+4;
			chest.position.z = levelObj.containersArr[i][4]*SQUARE_SIZE;
			chest.rotation.y = Math.PI/2;
		}
		
		//loader.load( chest.model, chest.loadObject(chest) );
		loadGameObjectCheck(loader, chest);
		
		chest.array_of_chest_pickables = [];

		//create container slot objects. they were dynamic at first, 
		//but multiple item take/put would create new, and i think they were leaked eventually
		for(var gi=0; gi<NUM_CONTAINER_ROWS*NUM_CONTAINER_COLS; gi++)
		{
			var container_array_item = {"slot":-1,"gObject":0};
			chest.array_of_chest_pickables.push(container_array_item);
		}
		
		//load pickables
		for(var p=0; p<saved_container[i].container_pickables.length; p++)
		{
			var gameItem = load_item_by_id(saved_container[i].container_pickables[p].gameID);
			chest.array_of_chest_pickables[saved_container[i].container_pickables[p].slot-1].slot = saved_container[i].container_pickables[p].slot;
			chest.array_of_chest_pickables[saved_container[i].container_pickables[p].slot-1].gObject = gameItem;
		}
		
		levelObj.array_of_containers.push(chest);
	}
}


//load chests on the map (first time entering map, loading from json)
function load_containers (loader, levelObj) {

	for(var i=0; i<levelObj.containersArr.length; i++) {
		var chest = create_game_object();
		chest.gameID = levelObj.containersArr[i][0];
		chest.name = levelObj.containersArr[i][1];
		chest.model = levelObj.containersArr[i][2];
		
		chest.xpos = levelObj.containersArr[i][3];
		chest.ypos = levelObj.containersArr[i][4];
				
		//position depends on orientation
		chest.orientation = levelObj.containersArr[i][5];
		if(chest.orientation == 0)
		{
			chest.position.x = levelObj.containersArr[i][3]*SQUARE_SIZE;
			chest.position.z = levelObj.containersArr[i][4]*SQUARE_SIZE+4;
			chest.rotation.y = 0;
		}
		else if(chest.orientation == 1)
		{
			chest.position.x = levelObj.containersArr[i][3]*SQUARE_SIZE-4;
			chest.position.z = levelObj.containersArr[i][4]*SQUARE_SIZE;
			chest.rotation.y = -Math.PI/2;
		}
		else if(chest.orientation == 2)
		{
			chest.position.x = levelObj.containersArr[i][3]*SQUARE_SIZE;
			chest.position.z = levelObj.containersArr[i][4]*SQUARE_SIZE-4;
			chest.rotation.y = -Math.PI;
		}
		else if(chest.orientation == 3)
		{
			chest.position.x = levelObj.containersArr[i][3]*SQUARE_SIZE+4;
			chest.position.z = levelObj.containersArr[i][4]*SQUARE_SIZE;
			chest.rotation.y = Math.PI/2;
		}
		
		//loader.load( chest.model, chest.loadObject(chest) );
		loadGameObjectCheck(loader, chest);
		
		chest.array_of_chest_pickables = [];

		//create container slot objects. they were dynamic at first, 
		//but multiple item take/put would create new, and i think they were leaked eventually
		for(var gi=0; gi<NUM_CONTAINER_ROWS*NUM_CONTAINER_COLS; gi++)
		{
			var container_array_item = {"slot":-1,"gObject":0};
			chest.array_of_chest_pickables.push(container_array_item);
		}
		
		//load pickables
		for(var p=0; p<levelObj.containersArr[i][6].length; p++)
		{
			var gameItem = load_item_by_id(levelObj.containersArr[i][6][p].gameID);
			chest.array_of_chest_pickables[levelObj.containersArr[i][6][p].slot-1].slot = levelObj.containersArr[i][6][p].slot;
			chest.array_of_chest_pickables[levelObj.containersArr[i][6][p].slot-1].gObject = gameItem;
		}
		
		levelObj.array_of_containers.push(chest);
	}
}

function containerItemPut(slot)
{
	var item=0;
	console.log("heee");
	
	//check if there is item in container in that slot
	if(currentlevelObj.array_of_containers[currently_opened_container].array_of_chest_pickables[slot-1].gObject != 0)
	{
		//get item
		item = currentlevelObj.array_of_containers[currently_opened_container].array_of_chest_pickables[slot-1].gObject;
		//remove from container
		//currentlevelObj.array_of_containers[currently_opened_container].array_of_chest_pickables.splice(i,1);
		//document.getElementById("container_slots" + slot + "_item_icon").src = "media/gui/slot.png";
		//break;
	}
	
	//var container_array_item = new Object();
	currentlevelObj.array_of_containers[currently_opened_container].array_of_chest_pickables[slot-1].slot = slot;
	currentlevelObj.array_of_containers[currently_opened_container].array_of_chest_pickables[slot-1].gObject = pickable_at_hand;
	//currentlevelObj.array_of_containers[currently_opened_container].array_of_chest_pickables.push(container_array_item);
	document.getElementById("container_slots" + slot + "_item_icon").src = pickable_at_hand.icon2;
	document.getElementById("container_slots" + slot + "_item_icon").style.cursor = 'pointer';

	//if slot is already occupied - replace
	if(item)
	{
		pickable_at_hand = item;
		//pickable_at_hand_icon.style.display = "block";
		pickable_at_hand_icon = document.getElementById("pickable_at_hand_id");
		pickable_at_hand_icon.src = pickable_at_hand.icon;
	}
	else
	{
		pickable_at_hand = 0;
		pickable_at_hand_icon.style.display = "none";
		pickable_at_hand_icon = 0;
	}
}

//player clicked in container slot..
function containerItemClick(slot)
{
	//var item=0;
	
	console.log("huuu");
	
	//find item in array with given slot
	/*for(var i=0; i<currentlevelObj.array_of_containers[currently_opened_container].array_of_chest_pickables.length; i++)
	{
		if(currentlevelObj.array_of_containers[currently_opened_container].array_of_chest_pickables[i].slot == slot)
		{
			//get item
			item = currentlevelObj.array_of_containers[currently_opened_container].array_of_chest_pickables[i].gObject;
			//remove from container
			currentlevelObj.array_of_containers[currently_opened_container].array_of_chest_pickables[i].gObject = 0;
			//currentlevelObj.array_of_containers[currently_opened_container].array_of_chest_pickables.splice(i,1);
			document.getElementById("container_slots" + slot + "_item_icon").src = "media/gui/slot.png";
			break;
		}
	}*/
	
	//set pickable at hand
	if(currentlevelObj.array_of_containers[currently_opened_container].array_of_chest_pickables[slot-1].gObject)
	{
		pickable_at_hand = currentlevelObj.array_of_containers[currently_opened_container].array_of_chest_pickables[slot-1].gObject;
		pickable_at_hand_icon = document.getElementById("pickable_at_hand_id");
		pickable_at_hand_icon.src = pickable_at_hand.icon;
		//remove from container
		currentlevelObj.array_of_containers[currently_opened_container].array_of_chest_pickables[slot-1].gObject = 0;
		document.getElementById("container_slots" + slot + "_item_icon").src = "media/gui/slot.png";
		document.getElementById("container_slots" + slot + "_item_icon").style.cursor = 'default';
	}
}

//draw item icons in container gui
function container_fill_gui(containerID, levelObj)
{
	var container_pickables_array = levelObj.array_of_containers[containerID].array_of_chest_pickables;
	
	for(var c=0; c<container_pickables_array.length; c++)
	{
		//get item from id
		var gameItem = container_pickables_array[c].gObject;
		if(gameItem)
		{
			var slot = container_pickables_array[c].slot;
			var slot_icon = document.getElementById("container_slots" + slot + "_item_icon");
			if(slot_icon)
			{
				slot_icon.src = gameItem.icon2;
				slot_icon.style.cursor = 'pointer';
				//slot_icon.src = "media/gui/key.png";//item.icon;
			}
		}
	}
	container_div.style.display = "inline-block";
	currently_opened_container = containerID;
}

//add pickable item to current container
function add_to_container(gObject, slot) 
{

	/*if(currently_opened_container>-1)
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
	}*/
	
	//start timer for automatic inventory draw back at later time..

}

function container_mouse_over_slot(x_pos,y_pos)
{
	/*var slot = container_clicked_in_slot(x_pos,y_pos);
	
	if(slot>0)
	{
		//get item from currently_opened_container and place it in hand..
		var container_pickables_array = containers_array[currently_opened_container][6];
		for(var i=0; i<container_pickables_array.length; i++)
		{
			if(container_pickables_array[i][4] == slot)
			{
				return slot;
			}
		}
	}
	
	return -1;*/
}

function container_item_clicked(x_pos,y_pos)
{
	/*var slot = container_clicked_in_slot(x_pos,y_pos);
	
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
					picki.plated = -1;
					picki.visible = false;
					//lets make 3d model here in case player wants to drop it in 3D world.. 
					var loader = new THREE.JSONLoader();
					//loader.load( picki.model, picki.loadObject(picki) );
					loadGameObjectCheck(loader, picki);
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
	}*/
	
	return 0;
}

//check if player clicked in container gui
function container_clicked_in_slot(x_pos,y_pos)
{
	var left = windowHalfX - (NUM_CONTAINER_COLS/2*small_SLOT_WIDTH) - 20;
	var right = windowHalfX + (NUM_CONTAINER_COLS/2*small_SLOT_WIDTH) - 20;
	var bottom = 4*small_SLOT_WIDTH + NUM_CONTAINER_ROWS*small_SLOT_WIDTH;
	var top = 4*small_SLOT_WIDTH;
	
	if((x_pos > left)&&(x_pos < right))
	{
		if((y_pos > top) && (y_pos < bottom))
		{
			//clicked in the container gui.. 
			if(x_pos < left+small_SLOT_WIDTH)
				return 1;
			if(x_pos < left+2*small_SLOT_WIDTH)
				return 2;
			if(x_pos < left+3*small_SLOT_WIDTH)
				return 3;
			if(x_pos < left+4*small_SLOT_WIDTH)
				return 4;
		}
	}

	return -1;
}

//check if player standing in front of container
function looking_at_container(levelObj) {
	//check if player is facing container
	for(var n=0; n<levelObj.array_of_containers.length; n++)
	{
		if((current_position.x == levelObj.array_of_containers[n].xpos)&&(current_position.z == levelObj.array_of_containers[n].ypos))
		{
			//standing in container position, now lets check facing..
			var looker = new THREE.Vector3(0, 0, 0).add(camera.look);
			looker.sub(camera.position);
			if (looker.x > 0) {
				//facing left
				if(levelObj.array_of_containers[n].orientation == 3)
					return n;
			} else if (looker.x < 0) {
				//facing right
				if(levelObj.array_of_containers[n].orientation == 1)
					return n;
			} else if (looker.z < 0) {
				//facing back
				if(levelObj.array_of_containers[n].orientation == 2)
					return n;
			} else if (looker.z > 0) {
				//facing front
				if(levelObj.array_of_containers[n].orientation == 0)
					return n;
			}
		}
	}
	
	return -1;
}