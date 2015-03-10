//save and load position


//when user gets to site (game) first time, there is no cookie.
//create cookie with user id
//create tmp user in database
//load start of the game
//create new story
//create new save node

//when temp user saves first time on first level - save first level to current save node in first story of temp user in database 
//when temp user moves to another level, save first level to current save node and load second level
//when temp user saves on level n, move all levels from current save node to backend

//when temp user closes browser, nothing is saved

//when user returns, if there are save nodes -> load one with biggest id (automatic continue)
//when user returns, if there are temp levels, discard them?

//when user clicks 'start from beginning' ignore saved levels

//each load is start of new story (and each time user clicks new start)
//each story can consists of several saved games
//each saved game consists ofseveral levels (change during that session)
//branching causes each save to point to parent save, eventually pointing to new game node

//all levels touched by player during the session are saved in that save node.
//save node id should indicate last save (biggest id increment)
//save node session is created as soon as game is loaded, and its filled with levels as player moves on.

//one save slot version has only one story. it can have numerous save nodes, but they are in a straight line.
//load always loads last one.
//start from beginning starts new story and previous one is deleted


var xmlhttp;

function save_cb()
{
	if (xmlhttp.readyState==4 && xmlhttp.status==200)
	{
		console.log("game saved.." + xmlhttp.responseText);
		addToConsole("Game saved..","#BBFFBB");
	}
	else
	{
		console.log("save_cb: " + xmlhttp.readyState);
	}
}

function save_position()
{
	//ajax send data to server
	
	//if user logged on
	
	//else use some cookie identification
	
	if (playerDead)
	{
		addToConsole("Can't save game while dead.","#BBFFBB");
		return;
	}
	
	var save_data = {"data_type":"save", "desc":"data to be saved"};
	
	//player stats:
	
	//user_id
	save_data["user_id"] = 123;
	//level
	save_data["martin_level"] = martin_level;
	//experience
	save_data["martin_experience"] = martin_experience;
	//playerHPmax
	save_data["martin_HPmax"] = playerHPmax;
	//playerHPcurrent;
	save_data["martin_HPcurrent"] = playerHPcurrent;
	//strength
	save_data["martin_strength"] = martin_strength;
	//dexterity
	save_data["martin_dexterity"] = martin_dexterity;
	//attack
	save_data["martin_attack"] = martin_attack;
	//defence
	save_data["martin_defence"] = martin_defence;
	//position
	save_data["position"] = {};
	save_data["position"]["x"] = current_position.x
	save_data["position"]["z"] = current_position.z;
	//rotation
	save_data["rotation"] = current_rotation;
	//level
	save_data["current_level"] = 3;

	//inventory items and slots:
	save_data["inventory"] = [];
	for (var i=0; i<inventory_array.length; i++)
	{
		save_data["inventory"][i] = {};
		save_data["inventory"][i]["slot"] = inventory_array[i].slot;
		save_data["inventory"][i]["gameID"] = inventory_array[i].gObject.gameID;
	}
	
	//equipped items 
	//helmet
	if(martin_equipment.helmet != 0) save_data["helmet"] = martin_equipment.helmet.gameID;
	//necklace
	if(martin_equipment.necklace != 0) save_data["necklace"] = martin_equipment.necklace.gameID;
	//armour
	if(martin_equipment.armour != 0) save_data["armour"] = martin_equipment.armour.gameID;
	//bracers
	if(martin_equipment.bracers != 0) save_data["bracers"] = martin_equipment.bracers.gameID;
	//left_hand_item
	if(martin_equipment.left_hand_item != 0) save_data["left_hand_item"] = martin_equipment.left_hand_item.gameID;
	//right_hand_item
	if(martin_equipment.right_hand_item != 0) save_data["right_hand_item"] = martin_equipment.right_hand_item.gameID;
	//boots
	if(martin_equipment.boots != 0) save_data["boots"] = martin_equipment.boots.gameID;
	//pants
	if(martin_equipment.pants != 0) save_data["pants"] = martin_equipment.pants.gameID;
	//

	//level state: all levels that were touched should be saved. not just current level. 
	//player could go through three levels before hitting save button and all three levels should be saved.
	//in turtle game, we use to save temp levels once player leaves them (goes to next one), 
	//and these temp levels were used if player goes back to them (all without saving game).
	//we could do something like that here.
	
	//doors
	var j = 0;
	save_data["doors"] = [];
	for(var i=0; i<doorsArr3D.length; i++)
	{
		//if doors are opened, save that
		if(doorsArr3D[i][3] == 1)
		{
			save_data["doors"][j] = i; //we just save index of doors that are opened, so only opened doors are saved.
			j++;
		}
	}
	
	//pickables on the ground, niches
	j = 0;
	save_data["pickables"] = [];
	for (i=0; i< array_of_pickables.length; i++)
	{
		// atm, pickables remain in this array even when placed in inventory or consumed. 
		// only way to know they are still on the ground is that mesh is visible.
		if(array_of_pickables[i].mesh.visible)
		{
			//save item id, position, niched
			save_data["pickables"][j] = {};
			save_data["pickables"][j]["gameID"] = array_of_pickables[i].gameID;
			save_data["pickables"][j]["x"] = array_of_pickables[i].mesh.position.x;
			save_data["pickables"][j]["y"] = array_of_pickables[i].mesh.position.y;
			save_data["pickables"][j]["z"] = array_of_pickables[i].mesh.position.z;
			save_data["pickables"][j]["niched"] = array_of_pickables[i].niched;
			save_data["pickables"][j]["plated"] = array_of_pickables[i].plated;
			j++;
		}
	}
	
	//chests, containers
	//keyholes
	//plates
	//buttons
	
	
	//monsters:
	save_data["monsters"] = [];
	for(var m=0; m<array_of_monsters.length; m++)
	{
		if(array_of_monsters[m].alive)
		{
			save_data["monsters"][m] = {};
			//id
			save_data["monsters"][m]["gameID"] = array_of_monsters[m].gameID;
			//position
			save_data["monsters"][m]["position"] = {};
			save_data["monsters"][m]["position"]["x"] = array_of_monsters[m].position.x;
			save_data["monsters"][m]["position"]["z"] = array_of_monsters[m].position.z;
			//rotation
			save_data["monsters"][m]["rotation"] = array_of_monsters[m].rotation;
			//mood
			save_data["monsters"][m]["mood"] = array_of_monsters[m].mood;
			//hp
			save_data["monsters"][m]["hp"] = array_of_monsters[m].hp;
		}
	}

	//
	//journal entries
	//
	//dialogs? npc?
	
	var save_data_json_str = JSON.stringify( save_data );
	console.log(save_data_json_str);
	
	setCookie("saved_game", save_data_json_str, 90);
	
	ajaxPost("save.php",save_cb,save_data_json_str);
}

//new game
function newGameOnSameLevel()
{
	//clear current monsters and stop them
	for(var j=0; j<array_of_monsters.length;j++)
	{
		array_of_monsters[j].alive = false;
		array_of_monsters[j].mesh.visible = false;
		array_of_monsters[j].should_move= false;
		array_of_monsters[j].should_turn= false;
		array_of_monsters[j].should_attack= false;
	}
	
	//place monsters in saved position and activate them
	for(var i=0; i<monster_array.length;i++)
	{
		for(var j=0; j<array_of_monsters.length;j++)
		{
			if(array_of_monsters[j].gameID == monster_array[i][0])
			{
				array_of_monsters[j].alive = true;
				array_of_monsters[j].mesh.visible = true;
				array_of_monsters[j].position.x = monster_array[i][3];//.position.x;
				array_of_monsters[j].position.z = monster_array[i][4];//last_saved_data.monsters[i].position.z;
				array_of_monsters[j].target.x = monster_array[i][3];//.position.x;
				array_of_monsters[j].target.z = monster_array[i][4];//last_saved_data.monsters[i].position.z;
				array_of_monsters[j].mesh.position.x = array_of_monsters[j].position.x*SQUARE_SIZE;
				array_of_monsters[j].mesh.position.z = array_of_monsters[j].position.z*SQUARE_SIZE;
				array_of_monsters[j].rotation = monster_array[j][5];
				array_of_monsters[j].mood = monster_array[j][19];
				array_of_monsters[j].hp = monster_array[j][6];//.hp;
			}
		}
	}
		
	//clear current pickables
	for(var i=0; i<array_of_pickables.length;i++)
	{
		array_of_pickables[i].mesh.visible = false;
	}
	
	//make them visible and place them where saved game says so
	for(var i=0; i<pickables_array.length;i++)
	{
		for(var j=0; j<array_of_pickables.length;j++)
		{
			//we must add gameID beside itemID, and check status of game items to put in place.
			//once gameID is added we can remove that additional check if mesh is visible
			if(array_of_pickables[j].gameID == pickables_array[i].gameID)
			{
				array_of_pickables[j].mesh.visible = true;
				array_of_pickables[j].position.x = pickables_array[i].x;
				array_of_pickables[j].position.z = pickables_array[i].z;
				array_of_pickables[j].position.y = pickables_array[i].y;
				array_of_pickables[j].mesh.position.x = pickables_array[i].x;
				array_of_pickables[j].mesh.position.z = pickables_array[i].z;
				array_of_pickables[j].mesh.position.y = pickables_array[i].y;
				array_of_pickables[j].niched = pickables_array[i].niched; //flag indicating if pickable is in the niche
				array_of_pickables[j].plated = pickables_array[i].plated; //flag indicating if pickable is on the plate
				break;
			}
		}
		
	}
	
	//niches, well one niche item on first level:
	var niche_pickables = nicheArr[0][3];
	for(var i=0; i<niche_pickables.length; i++) 
	{
		for(var j=0; j<array_of_pickables.length;j++)
		{
			if(array_of_pickables[j].gameID == niche_pickables[i])
			{
				var niche_item_uffset = new THREE.Vector3(-1, -0.5, 0); //deeper, lower, sider
				var emover = -1+i/2;
				array_of_pickables[j].position.x = nicheArr[0][0]*SQUARE_SIZE-6+niche_item_uffset.x;
				array_of_pickables[j].position.z = nicheArr[0][1]*SQUARE_SIZE+emover+niche_item_uffset.z;
				array_of_pickables[j].position.y = 4.0+niche_item_uffset.y;
				array_of_pickables[j].mesh.position.x = nicheArr[0][0]*SQUARE_SIZE-6+niche_item_uffset.x;
				array_of_pickables[j].mesh.position.z = nicheArr[0][1]*SQUARE_SIZE+emover+niche_item_uffset.z;
				array_of_pickables[j].mesh.position.y = 4.0+niche_item_uffset.y;
				array_of_pickables[j].mesh.visible = true;
				array_of_pickables[j].niched = 0;
				break;
			}
		}
	}
	
	//inventory
	clear_inventory();
	loadInventoryNoReloading([]);
	
	
	//equipment
	//equipped items 
	if(martin_equipment.left_hand_item)
	{
		martin_equipment.left_hand_item = 0;
		document.getElementById("player1-hand-l-main").style.backgroundImage = "url(media/lhand.png)";
		document.getElementById("player1-hand-l-main").style.backgroundSize = "100% 100%";
	}
	// right_hand_item
	if(martin_equipment.right_hand_item)
	{
		martin_equipment.right_hand_item = 0;
		document.getElementById("player1-hand-r-main").style.backgroundImage = "url(media/rhand.png)";
		document.getElementById("player1-hand-r-main").style.backgroundSize = "100% 100%";
	}
	// helmet
	//if(martin_equipment.helmet != 0) save_data["helmet"] = martin_equipment.helmet.id;
	// necklace
	//if(martin_equipment.necklace != 0) save_data["necklace"] = martin_equipment.necklace.id;
	// armour
	//if(martin_equipment.armour != 0) save_data["armour"] = martin_equipment.armour.id;
	// bracers
	//if(martin_equipment.bracers != 0) save_data["bracers"] = martin_equipment.bracers.id;
	// boots
	//if(martin_equipment.boots != 0) save_data["boots"] = martin_equipment.boots.id;
	// pants
	//if(martin_equipment.pants != 0) save_data["pants"] = martin_equipment.pants.id;

}

//load game without models reloading
function loadGameOnSameLevel()
{
	//clear current monsters and stop them
	for(var j=0; j<array_of_monsters.length;j++)
	{
		array_of_monsters[j].alive = false;
		array_of_monsters[j].mesh.visible = false;
		array_of_monsters[j].should_move= false;
		array_of_monsters[j].should_turn= false;
		array_of_monsters[j].should_attack= false;
	}
	
	//place monsters in saved position and activate them
	for(var i=0; i<last_saved_data.monsters.length;i++)
	{
		for(var j=0; j<array_of_monsters.length;j++)
		{
			if(array_of_monsters[j].gameID == last_saved_data.monsters[i].gameID)
			{
				array_of_monsters[j].alive = true;
				array_of_monsters[j].mesh.visible = true;
				array_of_monsters[j].position.x = last_saved_data.monsters[i].position.x;
				array_of_monsters[j].position.z = last_saved_data.monsters[i].position.z;
				array_of_monsters[j].target.x = last_saved_data.monsters[i].position.x;
				array_of_monsters[j].target.z = last_saved_data.monsters[i].position.z;
				array_of_monsters[j].mesh.position.x = last_saved_data.monsters[i].position.x*SQUARE_SIZE;
				array_of_monsters[j].mesh.position.z = last_saved_data.monsters[i].position.z*SQUARE_SIZE;
				array_of_monsters[j].rotation = last_saved_data.monsters[i].rotation;
				array_of_monsters[j].mood = last_saved_data.monsters[i].mood;
				array_of_monsters[j].hp = last_saved_data.monsters[i].hp;
			}
		}
	}
		
	//clear current pickables
	for(var i=0; i<array_of_pickables.length;i++)
	{
		array_of_pickables[i].mesh.visible = false;
	}
	
	//make them visible and place them where saved game says so
	for(var i=0; i<last_saved_data.pickables.length;i++)
	{
		for(var j=0; j<array_of_pickables.length;j++)
		{
			//we must add gameID beside itemID, and check status of game items to put in place.
			//once gameID is added we can remove that additional check if mesh is visible
			if((array_of_pickables[j].gameID == last_saved_data.pickables[i].gameID)&&(array_of_pickables[j].mesh.visible == false))
			{
				array_of_pickables[j].mesh.visible = true;
				array_of_pickables[j].position.x = last_saved_data.pickables[i].x;
				array_of_pickables[j].position.z = last_saved_data.pickables[i].z;
				array_of_pickables[j].position.y = last_saved_data.pickables[i].y;
				array_of_pickables[j].niched = last_saved_data.pickables[i].niched; //flag indicating if pickable is in the niche
				array_of_pickables[j].plated = last_saved_data.pickables[i].plated; //flag indicating if pickable is on the plate
				break;
			}
		}
		
	}
	
	//inventory
	loadInventoryNoReloading(last_saved_data.inventory)
	
	
	//equipment
	//equipped items 
	if(last_saved_data.left_hand_item)
	{
		martin_equipment.left_hand_item = get_pickabe_item_by_id(last_saved_data.left_hand_item);
		document.getElementById("player1-hand-l-main").style.backgroundImage = "url("+martin_equipment.left_hand_item.icon+")";
		document.getElementById("player1-hand-l-main").style.backgroundSize = "100% 100%";
	}
	// right_hand_item
	if(last_saved_data.right_hand_item)
	{
		martin_equipment.right_hand_item = get_pickabe_item_by_id(last_saved_data.right_hand_item);
		document.getElementById("player1-hand-r-main").style.backgroundImage = "url("+martin_equipment.right_hand_item.icon+")";
		document.getElementById("player1-hand-r-main").style.backgroundSize = "100% 100%";
	}
	// helmet
	//if(martin_equipment.helmet != 0) save_data["helmet"] = martin_equipment.helmet.id;
	// necklace
	//if(martin_equipment.necklace != 0) save_data["necklace"] = martin_equipment.necklace.id;
	// armour
	//if(martin_equipment.armour != 0) save_data["armour"] = martin_equipment.armour.id;
	// bracers
	//if(martin_equipment.bracers != 0) save_data["bracers"] = martin_equipment.bracers.id;
	// boots
	//if(martin_equipment.boots != 0) save_data["boots"] = martin_equipment.boots.id;
	// pants
	//if(martin_equipment.pants != 0) save_data["pants"] = martin_equipment.pants.id;

}


//load game
function loadGame()
{
	
	//load game
	console.log(last_saved_data);
	current_position = new THREE.Vector3(last_saved_data.position.x,0,last_saved_data.position.z);
	current_rotation = last_saved_data.rotation;
	
	playerDead = false; 
	player1_face_div.style.opacity = "1.0";
	
	hide_message();
	
	//player data
	martin_level = last_saved_data.martin_level;
	//experience
	martin_experience = last_saved_data.martin_experience;
	//playerHPmax
	playerHPmax = last_saved_data.martin_HPmax;
	//playerHPcurrent;
	playerHPcurrent = last_saved_data.martin_HPcurrent;
	//strength
	martin_strength = last_saved_data.martin_strength;
	//dexterity
	martin_dexterity = last_saved_data.martin_dexterity;
	//attack
	martin_attack = last_saved_data.martin_attack;
	//defence
	martin_defence = last_saved_data.martin_defence;
	
	//camera
	if((current_rotation==0)||(current_rotation==2)) camera.position.x = current_position.x*10;
	else if(current_rotation==1) camera.position.x = current_position.x*10-5;
	else camera.position.x = current_position.x*10+5;
	
	camera.position.y = 4;
	
	if((current_rotation==1)||(current_rotation==3)) camera.position.z = current_position.z*10;
	else if(current_rotation==0) camera.position.z = current_position.z*10-5; //115
	else camera.position.z = current_position.z*10+5;
	
	if(current_rotation==0) camera.look = new THREE.Vector3(current_position.x*10,4,current_position.z*10+5); //160,4,125
	else if(current_rotation==1) camera.look = new THREE.Vector3(current_position.x*10+5,4,current_position.z*10); //160,4,125
	else if(current_rotation==2) camera.look = new THREE.Vector3(current_position.x*10,4,current_position.z*10-5); //160,4,125
	else camera.look = new THREE.Vector3(current_position.x*10-5,4,current_position.z*10); //160,4,125
	camera.lookAt(camera.look);
	
	//lights
	pointLight.position.set(current_position.x*SQUARE_SIZE, 4, current_position.z*SQUARE_SIZE);

	//if loading game on the same level just move the player and stuff back in saved position
	if(current_level == last_saved_data.current_level)
	{
		loadGameOnSameLevel();
	}
	else 
	{
		//load everything from start
	}

	//level
	current_level = last_saved_data.current_level;
	
	//doors
	//this must be called before load_level();
	load_saved_doors(last_saved_data.doors);

}

function newGame()
{
	//if we are on the first (third) level, just move the player and stuff back in start position, without loading everything from start.
	//else load everything from start

	console.log("New start..");
	
	current_position.x = 10;
	current_position.z = 3;
	current_rotation = 0;
	
	playerDead = false; 
	player1_face_div.style.opacity = "1.0";
	
	hide_message();
	show_message("(you wake up)" + " <br><br> <div id='info_dialog_button' style='cursor: pointer; margin:auto; padding-top:9px; font-size:14px; width:94px; height: 25px; background: #00c url(media/gui/buttons.png); background-size: 100% 100%;' onclick='hide_message();'> Ok </div>", 600, 200, "url(media/gui/dialog2.png)", "Copperplate, 'Copperplate Gothic Light', Papyrus, Garamond, Baskerville", "#ddddd0", "400", "20px");

	remove_element_class("player1-hand-r","shadow");
	remove_element_class("player1-hand-l","shadow");
	weapon_tip_shown=false;
	inventory_tip_shown=false;
	remove_element_class("player1-inventory","shadow");
	
	//player data
	martin_level = 1;
	//experience
	martin_experience = 1;
	//playerHPmax
	playerHPmax = 30;
	//playerHPcurrent;
	playerHPcurrent = 10;
	updatePlayerHealthBar();
	//strength
	martin_strength = 10;
	//dexterity
	martin_dexterity = 10;
	//attack
	martin_attack = 10;
	//defence
	martin_defence = 10;
	
	//camera
	if((current_rotation==0)||(current_rotation==2)) camera.position.x = current_position.x*10;
	else if(current_rotation==1) camera.position.x = current_position.x*10-5;
	else camera.position.x = current_position.x*10+5;
	
	camera.position.y = 4;
	
	if((current_rotation==1)||(current_rotation==3)) camera.position.z = current_position.z*10;
	else if(current_rotation==0) camera.position.z = current_position.z*10-5; //115
	else camera.position.z = current_position.z*10+5;
	
	if(current_rotation==0) camera.look = new THREE.Vector3(current_position.x*10,4,current_position.z*10+5); //160,4,125
	else if(current_rotation==1) camera.look = new THREE.Vector3(current_position.x*10+5,4,current_position.z*10); //160,4,125
	else if(current_rotation==2) camera.look = new THREE.Vector3(current_position.x*10,4,current_position.z*10-5); //160,4,125
	else camera.look = new THREE.Vector3(current_position.x*10-5,4,current_position.z*10); //160,4,125
	camera.lookAt(camera.look);
	
	//lights
	pointLight.position.set(current_position.x*SQUARE_SIZE, 4, current_position.z*SQUARE_SIZE);

	//if loading game on the same level just move the player and stuff back in saved position
	if(current_level == 3)
	{
		newGameOnSameLevel();
	}
	else 
	{
		//load everything from start
	}

	//level
	current_level = 3;
	
	//doors
	if(doorsArr3D[0][3] == 1)
	{
		doorsArr3D[0][3] = 0;
		setDoorClosed(doorsArr3D[0]);
	}

	addToConsole("New Game started..","#BBFFBB");
	
}

