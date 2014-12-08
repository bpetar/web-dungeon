
var NEW_SLOT_WIDTH = 64;

// list of items in the bag
var inventory_array = [];

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
			inventory_array.splice(i,1);
		}
	}
}


