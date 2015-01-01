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
	
	var save_data = {"data_type":"save", "position":"12,12","desc":"data to be saved"};
	
	//player stats:
	
	//user_id
	save_data["user_id"] = 123;
	//level
	save_data["level"] = martin_level;
	//experience
	save_data["experience"] = martin_experience;
	//playerHPmax
	save_data["HPmax"] = playerHPmax;
	//playerHPcurrent;
	save_data["HPcurrent"] = playerHPcurrent;
	//strength
	save_data["strength"] = martin_strength;
	//dexterity
	save_data["dexterity"] = martin_dexterity;
	//attack
	save_data["attack"] = martin_attack;
	//defence
	save_data["defence"] = martin_defence;
	//position
	save_data["position"] = "" + current_position.x + "," + current_position.z;
	//rotation
	save_data["rotation"] = 0; // ???
	//level
	save_data["current_level"] = 3;

	//inventory items and slots:
	save_data["inventory"] = [];
	for (var i=0; i<inventory_array.length; i++)
	{
		save_data["inventory"][i] = inventory_array[i].slot + "," + inventory_array[i].gObject.gameID;
	}
	
	//equipped items 
	//helmet
	if(martin_equipment.helmet != 0) save_data["helmet"] = martin_equipment.helmet.id;
	//necklace
	if(martin_equipment.necklace != 0) save_data["necklace"] = martin_equipment.necklace.id;
	//armour
	if(martin_equipment.armour != 0) save_data["armour"] = martin_equipment.armour.id;
	//bracers
	if(martin_equipment.bracers != 0) save_data["bracers"] = martin_equipment.bracers.id;
	//left_hand_item
	if(martin_equipment.left_hand_item != 0) save_data["left_hand_item"] = martin_equipment.left_hand_item.id;
	//right_hand_item
	if(martin_equipment.right_hand_item != 0) save_data["right_hand_item"] = martin_equipment.right_hand_item.id;
	//boots
	if(martin_equipment.boots != 0) save_data["boots"] = martin_equipment.boots.id;
	//pants
	if(martin_equipment.pants != 0) save_data["pants"] = martin_equipment.pants.id;
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
			save_data["pickables"][j] = "" + array_of_pickables[i].gameID + "," + array_of_pickables[i].mesh.position.x + "," + array_of_pickables[i].mesh.position.y + "," + array_of_pickables[i].mesh.position.z + "," + array_of_pickables[i].niched;
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
		save_data["monsters"][m] = {};
		//id
		save_data["monsters"][m]["gameID"] = array_of_monsters[m].gameID;
		//position
		save_data["monsters"][m]["position"] = {};
		save_data["monsters"][m]["position"]["x"] = array_of_monsters[m].mesh.position.x;
		save_data["monsters"][m]["position"]["z"] = array_of_monsters[m].mesh.position.z;
		//mood
		save_data["monsters"][m]["mood"] = array_of_monsters[m].mood;
		//hp
		save_data["monsters"][m]["hp"] = array_of_monsters[m].hp;
	}

	//
	//journal entries
	//
	//dialogs? npc?
	
	var save_data_json_str = JSON.stringify( save_data );
	console.log(save_data_json_str);
	ajaxPost("save.php",save_cb,save_data_json_str);
}