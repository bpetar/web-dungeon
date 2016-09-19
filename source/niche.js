

// niches and their content..

//used in temp level loading
function reload_niches(levelObj)
{
	for(var i=0; i<levelObj.array_of_niches.length;i++)
	{
		//scene.add(levelObj.array_of_niches[i].mesh);
	}
}

///load all niches but not pickables
function load_just_niches(levelObj) {
	
	//nicheArr
	for(var n=0; n<levelObj.nicheArr.length; n++)
	{
		var nichi = create_game_object();
		nichi.onItemAddFn = missing_niche_add_function;
		nichi.onItemRemoveFn = missing_niche_remove_function;
		nichi.onToggleOpenCloseFn = missing_niche_toggle_function;

		nichi.map_position.x = levelObj.nicheArr[n][0];
		nichi.map_position.z = levelObj.nicheArr[n][1];
		nichi.orientation = levelObj.nicheArr[n][2];

		if(levelObj.nicheArr[n].length>4)
		{
			//new niche atributes
			nichi.id = n;
			nichi.gameID = levelObj.nicheArr[n][4];
			nichi.name = "niche" + n;
			nichi.coverModel = levelObj.nicheArr[n][5]; //if empty string "" use default niche model for that level
			
			//nichi.opened = levelObj.nicheArr[n][6]; //not used anymore

			//get js function from string
			var onItemAddFn = window[levelObj.nicheArr[n][7]];
			if(typeof onItemAddFn === 'function')
			{
				nichi.onItemAddFn = onItemAddFn;
			}
			var onItemRemoveFn = window[levelObj.nicheArr[n][8]];
			if(typeof onItemRemoveFn === 'function')
			{
				nichi.onItemRemoveFn = onItemRemoveFn;
			}
			var onToggleOpenCloseFn = window[levelObj.nicheArr[n][9]];
			if(typeof onToggleOpenCloseFn === 'function')
			{
				nichi.onToggleOpenCloseFn = onToggleOpenCloseFn;
			}
		}

		levelObj.array_of_niches.push(nichi);
	}
}

//load all niche pickables content
function load_niches(loader, levelObj) {
	
	//nicheArr
	for(var n=0; n<levelObj.nicheArr.length; n++)
	{
		var nichi = create_game_object();
		nichi.onItemAddFn = missing_niche_add_function;
		nichi.onItemRemoveFn = missing_niche_remove_function;
		nichi.onToggleOpenCloseFn = missing_niche_toggle_function;

		nichi.map_position.x = levelObj.nicheArr[n][0];
		nichi.map_position.z = levelObj.nicheArr[n][1];
		nichi.orientation = levelObj.nicheArr[n][2];

		if(levelObj.nicheArr[n].length>4)
		{
			//new niche atributes
			nichi.id = n;
			nichi.gameID = levelObj.nicheArr[n][4];
			nichi.name = "niche" + n;
			nichi.coverModel = levelObj.nicheArr[n][5]; //if empty string "" use default niche model for that level
			
			//nichi.opened = levelObj.nicheArr[n][6]; //not used anymore

			//get js function from string
			var onItemAddFn = window[levelObj.nicheArr[n][7]];
			if(typeof onItemAddFn === 'function')
			{
				nichi.onItemAddFn = onItemAddFn;
			}
			var onItemRemoveFn = window[levelObj.nicheArr[n][8]];
			if(typeof onItemRemoveFn === 'function')
			{
				nichi.onItemRemoveFn = onItemRemoveFn;
			}
			var onToggleOpenCloseFn = window[levelObj.nicheArr[n][9]];
			if(typeof onToggleOpenCloseFn === 'function')
			{
				nichi.onToggleOpenCloseFn = onToggleOpenCloseFn;
			}
		}

		levelObj.array_of_niches.push(nichi);

		var niche_pickables = levelObj.nicheArr[n][3];
		for(var i=0; i<niche_pickables.length; i++) {
			
			var picki = create_game_object();
			picki.gameID = niche_pickables[i].gameID;
			picki.itemID =all_items_array[niche_pickables[i].gameID];

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

//get_number_of_items_in_niche(nicheID)
function get_number_of_items_in_niche(levelObj, nicheID)
{
	var numberOfItemsInNiche = 0;
	for (var i = 0; i < levelObj.array_of_pickables.length; i++)
	{
		if(levelObj.array_of_pickables[i].niched == nicheID)
			numberOfItemsInNiche++;
	}

	return numberOfItemsInNiche;
}

//add item to niche
function add_to_niche (levelObj,nicheID, gObject) {

	//get niche from niche_array using nicheID
	var nichi = 0;
	for(var n = 0; n < levelObj.array_of_niches.length; n++)
	{
		nichi = levelObj.array_of_niches[n];
		if(nichi.id == nicheID)
		{
			//found our niche
			break;
		}
	}
	

	//add item to array
	//var niche_pickables = levelObj.nicheArr[nicheID][3];
	var index = get_number_of_items_in_niche(levelObj, nicheID);
	//niche_pickables[index] = gObject.gameID;
	
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
	
	if(nichi)
		nichi.onItemAddFn(levelObj, nichi, gObject);
}

//remove item from niche
function remove_from_niche(levelObj,gObject) {

	//get niche from niche_array using nicheID == gObject.niched
	var nichi = 0;
	for(var n = 0; n < levelObj.array_of_niches.length; n++)
	{
		nichi = levelObj.array_of_niches[n];
		if(nichi.id == gObject.niched)
		{
			//found our niche
			nichi.onItemRemoveFn(levelObj, gObject.niched, gObject);
			break;
		}
	}

	//get niche pickables
	//var niche_pickables = levelObj.nicheArr[gObject.niched][3];
	//it happens so that object is marked niched but its not in niche.
	//thats why we set it here to -1 at start.
	gObject.niched = -1;
	/*for(var i=0; i<niche_pickables.length; i++) {
		if(niche_pickables[i] == gObject.gameID)
		{
			niche_pickables.splice(i,1);
			return;
		}
	}*/
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





