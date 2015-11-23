
var NEW_SLOT_WIDTH = 64;

// list of items in the bag
var inventory_array = [];

//
function loadInventory(inventoryArr)
{
	var loader = new THREE.JSONLoader();
	console.log("loading inventory");
	for (i=0; i< inventoryArr.length; i++)
	{
		var inventory_item = create_game_object();
		inventory_item.gameID = inventoryArr[i].gameID;
		inventory_item.itemID = all_items_array[inventoryArr[i].gameID];

		var item = get_item_by_id(inventory_item.itemID);
		inventory_item.name = item.name;
		inventory_item.description = item.desc;
		inventory_item.model = item.model;
		inventory_item.icon = item.icon;
		inventory_item.icon2 = item.icon2;
		inventory_item.useHint = item.useHint;
		inventory_item.useScript = item.useScript;
		inventory_item.consumable = (item.type == "consumable")?true:false;
		inventory_item.type = item.type;
		if(item.type == "weapon")
		{
			inventory_item.weapon_type = item.weapon_prop.type;
			inventory_item.weapon_speed = item.weapon_prop.speed;
			inventory_item.weapon_dmg = item.weapon_prop.damage;
			inventory_item.weapon_dmg_bonus = item.weapon_prop.damage_bonus;
			inventory_item.weapon_attack_bonus = item.weapon_prop.attack_bonus;
			//TODO:
			//"hand":"one", "damage_type":"piercing",
		}
		inventory_item.niched = -1; //flag indicating if pickable is in the niche
		inventory_item.plated = -1; //flag indicating if pickable is in the niche
		//inventory_item.mesh = 0;
		//inventory_item.position.x = 0;
		//inventory_item.position.z = 0;
		//inventory_item.position.y = 0;
		
		loadGameObjectCheck(loader, inventory_item);

		add_to_inventory(inventory_item, inventoryArr[i].slot);
		
		//hmm i dont like this, but for now there is no other way to pick items from ground after loading game
		//currentlevelObj.array_of_pickables.push(inventory_item);
	}
}

//load inventory items without reloading of models and objects (only used when loading game saved on same level)
function loadInventoryNoReloading(inventoryArr)
{
	//var loader = new THREE.JSONLoader();
	console.log("loading inventory no reload");
	for (i=0; i< inventoryArr.length; i++)
	{
		for(j=0; j< array_of_pickables.length; j++)
		{
			if(inventoryArr[i].gameID == array_of_pickables[j].gameID)
			{
				var inventory_item = array_of_pickables[j];
				inventory_item.niched = -1; //flag indicating if pickable is in the niche
				inventory_item.plated = -1; //flag indicating if pickable is in the niche
				add_to_inventory(inventory_item, inventoryArr[i].slot);
				break;
			}
		}
	}
}


//TODO: remove this function
//inventory to post
function inventory_to_post()
{
	var inventory_post_string = "";
	for (var i=0; i<inventory_array.length; i++)
	{
		inventory_post_string = inventory_post_string + inventory_array[i].slot + ",,";
		inventory_post_string = inventory_post_string + inventory_array[i].gObject.gameID + ",,";
		inventory_post_string = inventory_post_string + inventory_array[i].gObject.name + ",,";
		inventory_post_string = inventory_post_string + inventory_array[i].gObject.model + ",,";
		inventory_post_string = inventory_post_string + inventory_array[i].gObject.icon + ",,";
		inventory_post_string = inventory_post_string + inventory_array[i].gObject.useHint + ",,";
		inventory_post_string = inventory_post_string + inventory_array[i].gObject.useScript + ",,";
		inventory_post_string = inventory_post_string + (inventory_array[i].gObject.consumable?1:0);
		
		if(i < inventory_array.length-1)
			inventory_post_string = inventory_post_string + "|||";
	}
	inventory_post_string = inventory_post_string + "";
	
	console.log(inventory_post_string);
	
	return inventory_post_string;
}

//add item to inventory
function add_to_inventory (gObject, slot) {

	//TODO check if inventory slot is occupied
	//if occupied, make switch between object in hand and object in inventory
	//alert("pera " + gObject.icon);
	
	//if inventory slot is free, place object in inventory
	
	var inventory_array_item = new Object();;
	inventory_array_item.slot = slot;
	inventory_array_item.gObject = gObject;
	
	inventory_array.push(inventory_array_item);
	
	var slot_icon = document.getElementById("gui_slot" + slot + "_item_icon");
	slot_icon.style.backgroundImage = "url("+gObject.icon2+")";
	slot_icon.style.backgroundSize = "100% 100%";
	
	console.log("pera added inventory item: " + gObject.icon);
	//TODO: start timer for automatic inventory draw back at later time..
	
	gObject.mesh.noremove = true;
}

document.getElementById("player1-inventory").onmousedown = function () {
    console.log("User clicked inventory");
    //return true; // Not needed, as long as you don't return false
};

function inventory_clicked_in_slot(x_pos,y_pos) {
	var pos = get_element_position_in_viewport("player1-inventory");
	var left = pos.x;
	var right = pos.x + 192;
	var bottom = pos.y + 192;
	var top = pos.y;
	
	//console.log("ev gi inventori: " + pos);
	
	if((x_pos > left)&&(x_pos < right))
	{
		
		if((y_pos > top) && (y_pos < bottom))
		{
			//clicked in the inventory.. 
			var row = 0;
			if(y_pos < top+NEW_SLOT_WIDTH)
				row = 0;
			else if(y_pos < top+2*NEW_SLOT_WIDTH)
				row = 1;
			else if(y_pos < top+3*NEW_SLOT_WIDTH)
				row = 2;
				
			if(x_pos < left+NEW_SLOT_WIDTH)
				return 1+row*3;
			if(x_pos < left+2*NEW_SLOT_WIDTH)
				return 2+row*3;
			if(x_pos < left+3*NEW_SLOT_WIDTH)
				return 3+row*3;
		}
	}
	
	return -1;
}

function inventory_item_clicked(x_pos,y_pos)
{
	var slot = inventory_clicked_in_slot(x_pos,y_pos);
	
	if(slot>0)
	{
		for (var i=0; i<inventory_array.length; i++)
		{
			if(inventory_array[i].slot == slot)
			{
				//var slot_icon = document.getElementById("gui_slot" + slot + "_item_icon");
				//slot_icon.src = "media/none.png";
				var ret = inventory_array[i].gObject;
				//inventory_array.splice(i,1);
				return ret;
			}
		}
	}	
	return 0;
}

function inventory_item_remove(item)
{
	for (var i=0; i<inventory_array.length; i++)
	{
		if(inventory_array[i].gObject == item)
		{
			var slot_icon = document.getElementById("gui_slot" + inventory_array[i].slot + "_item_icon");
			//slot_icon.src = "media/none.png";
			slot_icon.style.backgroundImage = "";
			inventory_array[i].gObject.mesh.noremove = false;
			inventory_array.splice(i,1);
			break;
		}
	}
}


function clear_inventory()
{
	for (var i=0; i<inventory_array.length; i++)
	{
		var slot_icon = document.getElementById("gui_slot" + inventory_array[i].slot + "_item_icon");
		//slot_icon.src = "media/none.png";
		slot_icon.style.backgroundImage = "";
	}
	
	//they say this is fastest solution for clearing an array :)
	while(inventory_array.length > 0) {
		inventory_array.pop();
	}
}

