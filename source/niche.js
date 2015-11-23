

// niches and their content..

//load all niche pickables content
function load_niches(loader, levelObj) {
	
	//nicheArr
	for(var n=0; n<levelObj.nicheArr.length; n++)
	{
		var niche_pickables = levelObj.nicheArr[n][3];
		for(var i=0; i<niche_pickables.length; i++) {
			
			var picki = create_game_object();
			picki.gameID = niche_pickables[i];
			picki.itemID =all_items_array[niche_pickables[i]];

			var item = get_item_by_id(picki.itemID);
			picki.name = item.name;
			picki.description = item.desc;
			picki.model = item.model;
			
			picki.icon = item.icon;
			picki.icon2 = item.icon2;
			picki.useHint = item.useHint;
			
			picki.useScript = item.useScript;
			
			picki.consumable = (item.type == "consumable")?true:false;
			
			picki.type = item.type;
			
			if(item.type == "weapon")
			{
				picki.weapon_type = item.weapon_prop.type;
				picki.weapon_speed = item.weapon_prop.speed;
				picki.weapon_dmg = item.weapon_prop.damage;
				picki.weapon_dmg_bonus = item.weapon_prop.damage_bonus;
				picki.weapon_attack_bonus = item.weapon_prop.attack_bonus;
				//TODO:
				//"hand":"one", "damage_type":"piercing",
			}
			
			mover = -1+i/2;
			
			//check niche position and place pickable in it accordingly
			if(levelObj.nicheArr[n][2] == 0)
			{
				//front niche
				if(typeof niche_item_offset != 'undefined')
				{
					picki.position.x = levelObj.nicheArr[n][0]*SQUARE_SIZE+mover+niche_item_offset.z;
					picki.position.z = levelObj.nicheArr[n][1]*SQUARE_SIZE+6-niche_item_offset.x;
					picki.position.y = 4.0+niche_item_offset.y;
				}
				else
				{
					picki.position.x = levelObj.nicheArr[n][0]*SQUARE_SIZE+mover;
					picki.position.z = levelObj.nicheArr[n][1]*SQUARE_SIZE+6;
					picki.position.y = 4.0;
				}
			}
			else if(levelObj.nicheArr[n][2] == 3)
			{
				//left niche
				if(typeof niche_item_offset != 'undefined')
				{
					picki.position.x = levelObj.nicheArr[n][0]*SQUARE_SIZE+6-niche_item_offset.x;
					picki.position.z = levelObj.nicheArr[n][1]*SQUARE_SIZE+mover-niche_item_offset.z;
					picki.position.y = 4.0+niche_item_offset.y;
				}
				else
				{
					picki.position.x = levelObj.nicheArr[n][0]*SQUARE_SIZE+6;
					picki.position.z = levelObj.nicheArr[n][1]*SQUARE_SIZE+mover;
					picki.position.y = 4.0;
				}
			}
			else if(levelObj.nicheArr[n][2] == 1)
			{
				//right niche
				if(typeof niche_item_offset != 'undefined')
				{
					picki.position.x = levelObj.nicheArr[n][0]*SQUARE_SIZE-6+niche_item_offset.x;
					picki.position.z = levelObj.nicheArr[n][1]*SQUARE_SIZE+mover+niche_item_offset.z;
					picki.position.y = 4.0+niche_item_offset.y;
				}
				else
				{
					picki.position.x = levelObj.nicheArr[n][0]*SQUARE_SIZE-6;
					picki.position.z = levelObj.nicheArr[n][1]*SQUARE_SIZE+mover;
					picki.position.y = 4.0;
				}
			}
			else if(levelObj.nicheArr[n][2] == 2)
			{
				//back niche
				if(typeof niche_item_offset != 'undefined')
				{
					picki.position.x = levelObj.nicheArr[n][0]*SQUARE_SIZE-mover-niche_item_offset.z;
					picki.position.z = levelObj.nicheArr[n][1]*SQUARE_SIZE-6+niche_item_offset.x;
					picki.position.y = 4.0+niche_item_offset.y;
				}
				else
				{
					picki.position.x = levelObj.nicheArr[n][0]*SQUARE_SIZE+mover;
					picki.position.z = levelObj.nicheArr[n][1]*SQUARE_SIZE-6;
					picki.position.y = 4.0;
				}
			}
			
			picki.niched = n; //flag indicating if pickable is in the niche
			picki.plated = -1; //flag indicating if pickable is on the plate
			
			
			//loader.load( picki.model, picki.loadObject(picki) );
			loadGameObjectCheck(loader, picki);
			
			//add to array of all pickables on the map
			levelObj.array_of_pickables.push(picki);
		}
	}
}

//add item to niche
function add_to_niche (levelObj,nicheID, gObject) {

	//get niche from niche_array using nicheID
	var niche_pickables = levelObj.nicheArr[nicheID][3];
	var index = niche_pickables.length;
	niche_pickables[index] = new Array();
	
	niche_pickables[index][0] = gObject.gameID;
	niche_pickables[index][1] = gObject.name;
	niche_pickables[index][2] = gObject.description;
	niche_pickables[index][3] = gObject.model;
	niche_pickables[index][4] = gObject.icon;
	niche_pickables[index][5] = gObject.icon2;
	
	var mover = -1+index/2;
	//draw model in niche here
	//check niche position and place pickable in it accordingly
			if(levelObj.nicheArr[nicheID][2] == 0)
			{
				//front niche
				gObject.mesh.position.x = levelObj.nicheArr[nicheID][0]*SQUARE_SIZE+mover;
				gObject.mesh.position.z = levelObj.nicheArr[nicheID][1]*SQUARE_SIZE+6;
			}
			else if(levelObj.nicheArr[nicheID][2] == 3)
			{
				//left niche
				gObject.mesh.position.x = levelObj.nicheArr[nicheID][0]*SQUARE_SIZE+6;
				gObject.mesh.position.z = levelObj.nicheArr[nicheID][1]*SQUARE_SIZE+mover;
			}
			else if(levelObj.nicheArr[nicheID][2] == 1)
			{
				//right niche
				if(typeof niche_item_offset != 'undefined')
				{
					gObject.mesh.position.x = levelObj.nicheArr[nicheID][0]*SQUARE_SIZE-6+niche_item_offset.x;
					gObject.mesh.position.z = levelObj.nicheArr[nicheID][1]*SQUARE_SIZE+mover+niche_item_offset.z;
				}
				else
				{
					gObject.mesh.position.x = levelObj.nicheArr[nicheID][0]*SQUARE_SIZE-6;
					gObject.mesh.position.z = levelObj.nicheArr[nicheID][1]*SQUARE_SIZE+mover;
				}
			}
			else if(levelObj.nicheArr[nicheID][2] == 2)
			{
				//back niche
				gObject.mesh.position.x = levelObj.nicheArr[nicheID][0]*SQUARE_SIZE+mover;
				gObject.mesh.position.z = levelObj.nicheArr[nicheID][1]*SQUARE_SIZE-6;
			}
			
	if(typeof niche_item_offset != 'undefined')
	{
		gObject.mesh.position.y = 4.0+niche_item_offset.y;
	}
	else
	{
		gObject.mesh.position.y = 4.0;
	}

	gObject.mesh.visible = true;
    //add this pickable to array of pickables if not already there!
    if(get_pickable_item_by_id(currentlevelObj,pickable_at_hand.gameID) == 0)
    {
        currentlevelObj.array_of_pickables.push(pickable_at_hand);
    }
	gObject.niched = nicheID;
	//if there is script function for adding item, call it
	if(levelObj.nicheArr[nicheID].length>6)
	{
		var onItemAdd = levelObj.nicheArr[nicheID][6];
		onItemAdd(nicheID, gObject.gameID);
	}
	
}

//add item to niche
function remove_from_niche(levelObj,gObject) {

	//get niche pickables
	var niche_pickables = levelObj.nicheArr[gObject.niched][3];
	for(var i=0; i<niche_pickables.length; i++) {
		if(niche_pickables[i][0] == gObject.gameID)
		{
			niche_pickables.splice(i,1);
			gObject.niched = -1;
			return;
		}
	}
}

//check if player clicked in niche
function niche_clicked_in(levelObj,x_pos,y_pos) {

	//check if player is facing niche first
	for(var n=0; n<levelObj.nicheArr.length; n++)
	{
		if((current_position.x == levelObj.nicheArr[n][0])&&(current_position.z == levelObj.nicheArr[n][1]))
		{
			//standing in niche position, now lets check facing..
			var looker = new THREE.Vector3(0, 0, 0).add(camera.look);
			looker.sub(camera.position);
			if (looker.x > 0) {
				//facing left
				if((levelObj.nicheArr[n][2] == 3)&&(levelObj.nicheArr[n][4] != 0))
					return n;
			} else if (looker.x < 0) {
				//facing right
				if((levelObj.nicheArr[n][2] == 1)&&(levelObj.nicheArr[n][4] != 0))
					return n;
			} else if (looker.z < 0) {
				//facing back
				if((levelObj.nicheArr[n][2] == 2)&&(levelObj.nicheArr[n][4] != 0))
					return n;
			} else if (looker.z > 0) {
				//facing front
				if((levelObj.nicheArr[n][2] == 0)&&(levelObj.nicheArr[n][4] != 0))
					return n;
			}
			
		}
	}
	
	//calculate position of mouse click within the niche
	
	return -1;
}





