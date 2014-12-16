//save and load position

var xmlhttp;

function save_cb()
{
	if (xmlhttp.readyState==4 && xmlhttp.status==200)
	{
		console.log("game saved.." + xmlhttp.responseText);
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
	save_data["HPmax"] = playerHPmax
	//playerHPcurrent;
	save_data["HPcurrent"] = playerHPcurrent
	//strength
	save_data["strength"] = martin_strength;
	//dexterity
	save_data["dexterity"] = martin_dexterity;
	//attack
	save_data["attack"] = martin_attack;
	//defence
	save_data["defence"] = martin_defence;
	//position
	save_data["position"] = "" + current_position.x + "," + current_position.z
	//rotation
	save_data["rotation"] = 0; // ???

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
	//pickables on the ground
	//niches
	//chests, containers
	//keyholes
	//plates
	//buttons
	
	
	//monsters:
	
	//position
	//mood
	//hp
	//
	//journal entries
	//
	//dialogs? npc?
	
	var save_data_json_str = JSON.stringify( save_data );
	
	ajaxPost("save.php",save_cb,save_data_json_str);
}