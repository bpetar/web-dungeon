

// niches and their content..

//load all niche pickables content
function loadNiches() {
	//nicheArr
	for(var n=0; n<nicheArr.length; n++)
	{
		var loader = new THREE.JSONLoader();
		var niche_pickables = nicheArr[n][3];
		for(var i=0; i<niche_pickables.length; i++) {
			var picki = create_game_object();
			picki.gameID = niche_pickables[i][0];
			picki.name = niche_pickables[i][1];
			picki.description = niche_pickables[i][2];
			picki.model = niche_pickables[i][3];
			mover = -1+i/2;
			
			//check niche position and place pickable in it accordingly
			if(nicheArr[n][2] == 0)
			{
				//front niche
				if(typeof niche_item_offset != 'undefined')
				{
					picki.position.x = nicheArr[n][0]*SQUARE_SIZE+mover+niche_item_offset.z;
					picki.position.z = nicheArr[n][1]*SQUARE_SIZE+6-niche_item_offset.x;
					picki.position.y = 4.0+niche_item_offset.y;
				}
				else
				{
					picki.position.x = nicheArr[n][0]*SQUARE_SIZE+mover;
					picki.position.z = nicheArr[n][1]*SQUARE_SIZE+6;
					picki.position.y = 4.0;
				}
			}
			else if(nicheArr[n][2] == 3)
			{
				//left niche
				if(typeof niche_item_offset != 'undefined')
				{
					picki.position.x = nicheArr[n][0]*SQUARE_SIZE+6-niche_item_offset.x;
					picki.position.z = nicheArr[n][1]*SQUARE_SIZE+mover-niche_item_offset.z;
					picki.position.y = 4.0+niche_item_offset.y;
				}
				else
				{
					picki.position.x = nicheArr[n][0]*SQUARE_SIZE+6;
					picki.position.z = nicheArr[n][1]*SQUARE_SIZE+mover;
					picki.position.y = 4.0;
				}
			}
			else if(nicheArr[n][2] == 1)
			{
				//right niche
				if(typeof niche_item_offset != 'undefined')
				{
					picki.position.x = nicheArr[n][0]*SQUARE_SIZE-6+niche_item_offset.x;
					picki.position.z = nicheArr[n][1]*SQUARE_SIZE+mover+niche_item_offset.z;
					picki.position.y = 4.0+niche_item_offset.y;
				}
				else
				{
					picki.position.x = nicheArr[n][0]*SQUARE_SIZE-6;
					picki.position.z = nicheArr[n][1]*SQUARE_SIZE+mover;
					picki.position.y = 4.0;
				}
			}
			else if(nicheArr[n][2] == 2)
			{
				//back niche
				if(typeof niche_item_offset != 'undefined')
				{
					picki.position.x = nicheArr[n][0]*SQUARE_SIZE-mover-niche_item_offset.z;
					picki.position.z = nicheArr[n][1]*SQUARE_SIZE-6+niche_item_offset.x;
					picki.position.y = 4.0+niche_item_offset.y;
				}
				else
				{
					picki.position.x = nicheArr[n][0]*SQUARE_SIZE+mover;
					picki.position.z = nicheArr[n][1]*SQUARE_SIZE-6;
					picki.position.y = 4.0;
				}
			}
			
			picki.icon = niche_pickables[i][4];
			picki.icon2 = niche_pickables[i][5];
			picki.niched = n; //flag indicating if pickable is in the niche
			picki.plated = -1; //flag indicating if pickable is on the plate
			
			picki.useHint = niche_pickables[i][6];
			if(niche_pickables[i].length>7)
			{
				picki.useScript = niche_pickables[i][7];
			}
			
			//loader.load( picki.model, picki.loadObject(picki) );
			loadGameObjectCheck(loader, picki);
			
			//add to array of all pickables on the map
			array_of_pickables.push(picki);
		}
	}
}

//add item to niche
function add_to_niche (nicheID, gObject) {

	//get niche from niche_array using nicheID
	var niche_pickables = nicheArr[nicheID][3];
	var index = niche_pickables.length;
	niche_pickables[index] = new Array();
	
	niche_pickables[index][0] = gObject.gameID;
	niche_pickables[index][1] = gObject.name;
	niche_pickables[index][2] = gObject.model;
	niche_pickables[index][3] = gObject.icon;
	
	var mover = -1+index/2;
	//draw model in niche here
	//check niche position and place pickable in it accordingly
			if(nicheArr[nicheID][2] == 0)
			{
				//front niche
				gObject.mesh.position.x = nicheArr[nicheID][0]*SQUARE_SIZE+mover;
				gObject.mesh.position.z = nicheArr[nicheID][1]*SQUARE_SIZE+6;
			}
			else if(nicheArr[nicheID][2] == 3)
			{
				//left niche
				gObject.mesh.position.x = nicheArr[nicheID][0]*SQUARE_SIZE+6;
				gObject.mesh.position.z = nicheArr[nicheID][1]*SQUARE_SIZE+mover;
			}
			else if(nicheArr[nicheID][2] == 1)
			{
				//right niche
				if(typeof niche_item_offset != 'undefined')
				{
					gObject.mesh.position.x = nicheArr[nicheID][0]*SQUARE_SIZE-6+niche_item_offset.x;
					gObject.mesh.position.z = nicheArr[nicheID][1]*SQUARE_SIZE+mover+niche_item_offset.z;
				}
				else
				{
					gObject.mesh.position.x = nicheArr[nicheID][0]*SQUARE_SIZE-6;
					gObject.mesh.position.z = nicheArr[nicheID][1]*SQUARE_SIZE+mover;
				}
			}
			else if(nicheArr[nicheID][2] == 2)
			{
				//back niche
				gObject.mesh.position.x = nicheArr[nicheID][0]*SQUARE_SIZE+mover;
				gObject.mesh.position.z = nicheArr[nicheID][1]*SQUARE_SIZE-6;
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
	//if there is script function for adding item, call it
	if(nicheArr[nicheID].length>6)
	{
		var onItemAdd = nicheArr[nicheID][6];
		onItemAdd(nicheID, gObject.gameID);
	}
	
}

//add item to niche
function remove_from_niche (gObject) {

	//get niche pickables
	var niche_pickables = nicheArr[gObject.niched][3];
	for(var i=0; i<niche_pickables.length; i++) {
		if(niche_pickables[i][0] == gObject.gameID)
		{
			niche_pickables.splice(i,1);
			return;
		}
	}
}

//check if player clicked in niche
function niche_clicked_in(x_pos,y_pos) {

	//check if player is facing niche first
	for(var n=0; n<nicheArr.length; n++)
	{
		if((current_position.x == nicheArr[n][0])&&(current_position.z == nicheArr[n][1]))
		{
			//standing in niche position, now lets check facing..
			var looker = new THREE.Vector3(0, 0, 0).add(camera.look);
			looker.sub(camera.position);
			if (looker.x > 0) {
				//facing left
				if((nicheArr[n][2] == 3)&&(nicheArr[n][4] != 0))
					return n;
			} else if (looker.x < 0) {
				//facing right
				if((nicheArr[n][2] == 1)&&(nicheArr[n][4] != 0))
					return n;
			} else if (looker.z < 0) {
				//facing back
				if((nicheArr[n][2] == 2)&&(nicheArr[n][4] != 0))
					return n;
			} else if (looker.z > 0) {
				//facing front
				if((nicheArr[n][2] == 0)&&(nicheArr[n][4] != 0))
					return n;
			}
			
		}
	}
	
	//calculate position of mouse click within the niche
	
	return -1;
}





