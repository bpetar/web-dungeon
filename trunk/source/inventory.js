

// list of items in the bag
var inventory_array = [];


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
	slot_icon.src = gObject.icon;
	
	//TODO: start timer for automatic inventory draw back at later time..
}

function inventory_clicked_in_slot(x_pos,y_pos) {
	var left = windowHalfX - (NUM_SLOTS_INVENTORY_ROW/2*SLOT_WIDTH);
	var right = windowHalfX + (NUM_SLOTS_INVENTORY_ROW/2*SLOT_WIDTH);
	var bottom = window.innerHeight - 20;
	var top = window.innerHeight - 130;
	
	if((x_pos > left)&&(x_pos < right))
	{
		
		if((y_pos > top) && (y_pos < bottom))
		{
			//clicked in the inventory.. 
			
			//alert("x_pos: " + x_pos + ", left: " + left + ", SLOT_WIDTH: " + SLOT_WIDTH);
			
			if(x_pos < left+SLOT_WIDTH)
			{
				//alert("x_peos: " + x_pos + ", left: " + left + ", SLOT_WIDTH: " + SLOT_WIDTH);
				return 1;
			}
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

function inventory_item_clicked(x_pos,y_pos)
{
	var slot = inventory_clicked_in_slot(x_pos,y_pos);
	
	if(slot>0)
	{
		for (var i=0; i<inventory_array.length; i++)
		{
			if(inventory_array[i].slot == slot)
			{
				var slot_icon = document.getElementById("gui_slot" + slot + "_item_icon");
				slot_icon.src = "media/none.png";
				return inventory_array[i].gObject;
			}
		}
	}	
	return 0;
}


