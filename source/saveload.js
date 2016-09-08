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

//when user clicks 'start from beginning' ignore saved levels and start new story

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
	
	//are you sure you want to save?
	if(arrayOfGameStories.length>1)
	{
		if (confirm("You started new game and this save will overwrite your previous saved game. Are you sure?") == true) {
			console.log("He is sure...");
			arrayOfGameStories.splice(0,currentStory); //delete all stories up to last one.
			currentStory = 0;
		} else {
			console.log("We saved a life today.");
			return;
		}
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
	save_data["current_level"] = current_level;
	
	//game global quirks
	save_data["quirks"] = game_quirks;

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
	
    //in this game we have visited levels in dynamic array so we go through that array and save all levels in a loop
    //arrayOfGameStories[0][0] stores what is saved before, we overwrite levels in there.
 
    save_data["levels"] = arrayOfGameStories[0][0].levels;
    
    //if(newgame) save_data["levels"] = {}; //!!!! NEW STORY
    
    for (var vli=0; vli<arrayOfVisitedLevels.length; vli++)
	{
        save_data["levels"]["id"+arrayOfVisitedLevels[vli].id] = {}; //overwrite if exists

        //doors
        save_data["levels"]["id"+arrayOfVisitedLevels[vli].id]["doors"] = [];
        var j = 0;
        for(var i=0; i<arrayOfVisitedLevels[vli].array_of_doors.length; i++)
        {
            //if doors are opened, save that
            if(arrayOfVisitedLevels[vli].array_of_doors[i].open == 1)
            {
                save_data["levels"]["id"+arrayOfVisitedLevels[vli].id]["doors"][j] = i; //we just save index of doors that are opened, so only opened doors are saved.
                j++;
            }
        }

        //pickables on the ground, niches
        j = 0;
        save_data["levels"]["id"+arrayOfVisitedLevels[vli].id]["pickables"] = [];
        for (i=0; i< arrayOfVisitedLevels[vli].array_of_pickables.length; i++)
        {
            // atm, pickables remain in this array even when placed in inventory or consumed. 
            // only way to know they are still on the ground is that mesh is visible.
            if(arrayOfVisitedLevels[vli].array_of_pickables[i].mesh.visible)
            {
                //save item id, position, niched
                save_data["levels"]["id"+arrayOfVisitedLevels[vli].id]["pickables"][j] = {};
                save_data["levels"]["id"+arrayOfVisitedLevels[vli].id]["pickables"][j]["gameID"] = arrayOfVisitedLevels[vli].array_of_pickables[i].gameID;
                save_data["levels"]["id"+arrayOfVisitedLevels[vli].id]["pickables"][j]["x"] = arrayOfVisitedLevels[vli].array_of_pickables[i].mesh.position.x;
                save_data["levels"]["id"+arrayOfVisitedLevels[vli].id]["pickables"][j]["y"] = arrayOfVisitedLevels[vli].array_of_pickables[i].mesh.position.y;
                save_data["levels"]["id"+arrayOfVisitedLevels[vli].id]["pickables"][j]["z"] = arrayOfVisitedLevels[vli].array_of_pickables[i].mesh.position.z;
                save_data["levels"]["id"+arrayOfVisitedLevels[vli].id]["pickables"][j]["niched"] = arrayOfVisitedLevels[vli].array_of_pickables[i].niched;
                save_data["levels"]["id"+arrayOfVisitedLevels[vli].id]["pickables"][j]["plated"] = arrayOfVisitedLevels[vli].array_of_pickables[i].plated;
                j++;
            }
        }

        //containers
		save_data["levels"]["id"+arrayOfVisitedLevels[vli].id]["containers"] = [];
		for (var c=0; c<arrayOfVisitedLevels[vli].array_of_containers.length; c++)
		{
			save_data["levels"]["id"+arrayOfVisitedLevels[vli].id]["containers"][c] = {};
			save_data["levels"]["id"+arrayOfVisitedLevels[vli].id]["containers"][c]["container_pickables"] = [];
			var cp_index = 0;
			for (var cp=0; cp<arrayOfVisitedLevels[vli].array_of_containers[c].array_of_chest_pickables.length; cp++)
			{
				///
				if(arrayOfVisitedLevels[vli].array_of_containers[c].array_of_chest_pickables[cp].gObject != 0)
				{
					save_data["levels"]["id"+arrayOfVisitedLevels[vli].id]["containers"][c]["container_pickables"][cp_index] = {"slot":arrayOfVisitedLevels[vli].array_of_containers[c].array_of_chest_pickables[cp].slot, "gameID":arrayOfVisitedLevels[vli].array_of_containers[c].array_of_chest_pickables[cp].gObject.gameID};
					cp_index++;
				}
			}
		}

        //monsters:
        save_data["levels"]["id"+arrayOfVisitedLevels[vli].id]["monsters"] = [];
        var mindex = 0;
        for(var m=0; m<arrayOfVisitedLevels[vli].array_of_monsters.length; m++)
        {
            if(arrayOfVisitedLevels[vli].array_of_monsters[m].alive)
            {
                save_data["levels"]["id"+arrayOfVisitedLevels[vli].id]["monsters"][mindex] = {};
                //id
                save_data["levels"]["id"+arrayOfVisitedLevels[vli].id]["monsters"][mindex]["gameID"] = arrayOfVisitedLevels[vli].array_of_monsters[m].gameID;
                //position
                save_data["levels"]["id"+arrayOfVisitedLevels[vli].id]["monsters"][mindex]["position"] = {};
                save_data["levels"]["id"+arrayOfVisitedLevels[vli].id]["monsters"][mindex]["position"]["x"] = arrayOfVisitedLevels[vli].array_of_monsters[m].position.x;
                save_data["levels"]["id"+arrayOfVisitedLevels[vli].id]["monsters"][mindex]["position"]["z"] = arrayOfVisitedLevels[vli].array_of_monsters[m].position.z;
                //rotation
                save_data["levels"]["id"+arrayOfVisitedLevels[vli].id]["monsters"][mindex]["rotation"] = arrayOfVisitedLevels[vli].array_of_monsters[m].rotation;
                //mood
                save_data["levels"]["id"+arrayOfVisitedLevels[vli].id]["monsters"][mindex]["mood"] = arrayOfVisitedLevels[vli].array_of_monsters[m].mood;
                //hp
                save_data["levels"]["id"+arrayOfVisitedLevels[vli].id]["monsters"][mindex]["hp"] = arrayOfVisitedLevels[vli].array_of_monsters[m].hp;
                
                mindex++;
            }
        }
    }
    
    
    //currentlevelObj
    {
        save_data["levels"]["id"+currentlevelObj.id] = {}; //overwrite if exists

        //doors
        save_data["levels"]["id"+currentlevelObj.id]["doors"] = [];
        var j = 0;
        for(var i=0; i<currentlevelObj.array_of_doors.length; i++)
        {
            //if doors are opened, save that
            if(currentlevelObj.array_of_doors[i].open == 1)
            {
                save_data["levels"]["id"+currentlevelObj.id]["doors"][j] = i; //we just save index of doors that are opened, so only opened doors are saved.
                j++;
            }
        }

        //pickables on the ground, niches
        j = 0;
        save_data["levels"]["id"+currentlevelObj.id]["pickables"] = [];
        for (i=0; i< currentlevelObj.array_of_pickables.length; i++)
        {
            // atm, pickables remain in this array even when placed in inventory or consumed. 
            // only way to know they are still on the ground is that mesh is visible.
            if(currentlevelObj.array_of_pickables[i].mesh.visible)
            {
                //save item id, position, niched
                save_data["levels"]["id"+currentlevelObj.id]["pickables"][j] = {};
                save_data["levels"]["id"+currentlevelObj.id]["pickables"][j]["gameID"] = currentlevelObj.array_of_pickables[i].gameID;
                save_data["levels"]["id"+currentlevelObj.id]["pickables"][j]["x"] = currentlevelObj.array_of_pickables[i].mesh.position.x;
                save_data["levels"]["id"+currentlevelObj.id]["pickables"][j]["y"] = currentlevelObj.array_of_pickables[i].mesh.position.y;
                save_data["levels"]["id"+currentlevelObj.id]["pickables"][j]["z"] = currentlevelObj.array_of_pickables[i].mesh.position.z;
                save_data["levels"]["id"+currentlevelObj.id]["pickables"][j]["niched"] = currentlevelObj.array_of_pickables[i].niched;
                save_data["levels"]["id"+currentlevelObj.id]["pickables"][j]["plated"] = currentlevelObj.array_of_pickables[i].plated;
                j++;
            }
        }


		//containers
		save_data["levels"]["id"+currentlevelObj.id]["containers"] = [];
		for (var c=0; c<currentlevelObj.array_of_containers.length; c++)
		{
			save_data["levels"]["id"+currentlevelObj.id]["containers"][c] = {};
			save_data["levels"]["id"+currentlevelObj.id]["containers"][c]["container_pickables"] = [];
			var cp_index = 0;
			for (var cp=0; cp<currentlevelObj.array_of_containers[c].array_of_chest_pickables.length; cp++)
			{
				//save container slot only if it has object 
				if(currentlevelObj.array_of_containers[c].array_of_chest_pickables[cp].gObject != 0)
				{
					save_data["levels"]["id"+currentlevelObj.id]["containers"][c]["container_pickables"][cp_index] = {"slot":currentlevelObj.array_of_containers[c].array_of_chest_pickables[cp].slot, "gameID":currentlevelObj.array_of_containers[c].array_of_chest_pickables[cp].gObject.gameID};
					cp_index++;
				}
			}
		}


        //monsters:
        save_data["levels"]["id"+currentlevelObj.id]["monsters"] = [];
        var mindex = 0;
        for(var m=0; m<currentlevelObj.array_of_monsters.length; m++)
        {
            if(currentlevelObj.array_of_monsters[m].alive)
            {
                save_data["levels"]["id"+currentlevelObj.id]["monsters"][mindex] = {};
                //id
                save_data["levels"]["id"+currentlevelObj.id]["monsters"][mindex]["gameID"] = currentlevelObj.array_of_monsters[m].gameID;
                //position
                save_data["levels"]["id"+currentlevelObj.id]["monsters"][mindex]["position"] = {};
                save_data["levels"]["id"+currentlevelObj.id]["monsters"][mindex]["position"]["x"] = currentlevelObj.array_of_monsters[m].position.x;
                save_data["levels"]["id"+currentlevelObj.id]["monsters"][mindex]["position"]["z"] = currentlevelObj.array_of_monsters[m].position.z;
                //rotation
                save_data["levels"]["id"+currentlevelObj.id]["monsters"][mindex]["rotation"] = currentlevelObj.array_of_monsters[m].rotation;
                //mood
                save_data["levels"]["id"+currentlevelObj.id]["monsters"][mindex]["mood"] = currentlevelObj.array_of_monsters[m].mood;
                //hp
                save_data["levels"]["id"+currentlevelObj.id]["monsters"][mindex]["hp"] = currentlevelObj.array_of_monsters[m].hp;
                
                mindex++;
            }
        }
    }
	
	//chests, containers
	//keyholes
	//plates
	//buttons
	//
	//journal entries
	//
	//dialogs? npc?
	
	var save_data_json_str = JSON.stringify( save_data );
	console.log(save_data_json_str);
	
	setCookie("saved_game", save_data_json_str, 90);
	
	arrayOfGameStories[0][0] = save_data;
	
	saved_game = true;
	
	ajaxPost("save.php",save_cb,save_data_json_str);
}


function newGameMainMenu()
{
	main_menu_div.style.display = "none";
	//audio_maintheme.pause();
	audio_change_volume(audio_maintheme,0);

	//player data
	martin_level = 1;
	//experience
	martin_experience = 1;
	//playerHPmax
	playerHPmax = 30;
	//playerHPcurrent;
	playerHPcurrent = 10;
	//strength
	martin_strength = 10;
	//dexterity
	martin_dexterity = 10;
	//attack
	martin_attack = 10;
	//defence
	martin_defence = 10;

	//load lights
	load_lights();

	//load level walls and floors etc..
	loadLevel(4,0);
	arrayOfVisitedLevels = [];

	loadCharacter();
	
	updatePlayerHealthBar();

	show_message("(you wake up)" + " <br><br> <div id='info_dialog_button' style='cursor: pointer; margin:auto; padding-top:9px; font-size:14px; width:94px; height: 25px; background: #00c url(media/gui/buttons.png); background-size: 100% 100%;' onclick='hide_message();'> Ok </div>", 600, 200, "url(media/gui/dialog2.png)", "Copperplate, 'Copperplate Gothic Light', Papyrus, Garamond, Baskerville", "#ddddd0", "400", "20px");

}

//new game
function newGameOnSameLevel()
{
	nextlevelObj = {};
	//currentlevelObj = {};
	arrayOfVisitedLevels = [];

	var story = [];
	arrayOfGameStories.push(story);
	currentStory = arrayOfGameStories.length-1;
	arrayOfGameStories[currentStory].push({'levels':{}});
	
	//clear current monsters and stop them
	for(var m=0; m<currentlevelObj.array_of_monsters.length;m++)
	{
		currentlevelObj.array_of_monsters[m].alive = false;
		currentlevelObj.array_of_monsters[m].mesh.visible = false;
		currentlevelObj.array_of_monsters[m].should_move= false;
		currentlevelObj.array_of_monsters[m].should_turn= false;
		currentlevelObj.array_of_monsters[m].should_attack= false;
	}
	
	//place monsters in original position and activate them
	for(var i=0; i<currentlevelObj.monsterArr.length;i++)
	{
		for(var m=0; m<currentlevelObj.array_of_monsters.length;m++)
		{
			if(currentlevelObj.array_of_monsters[m].gameID == currentlevelObj.monsterArr[i][0])
			{
				currentlevelObj.array_of_monsters[m].alive = true;
				currentlevelObj.array_of_monsters[m].mesh.visible = true;
				currentlevelObj.array_of_monsters[m].position.x = currentlevelObj.monsterArr[i][3];
				currentlevelObj.array_of_monsters[m].position.z = currentlevelObj.monsterArr[i][4];
				currentlevelObj.array_of_monsters[m].target.x = currentlevelObj.monsterArr[i][3];
				currentlevelObj.array_of_monsters[m].target.z = currentlevelObj.monsterArr[i][4];
				currentlevelObj.array_of_monsters[m].mesh.position.x = currentlevelObj.array_of_monsters[m].position.x*SQUARE_SIZE;
				currentlevelObj.array_of_monsters[m].mesh.position.z = currentlevelObj.array_of_monsters[m].position.z*SQUARE_SIZE;
				currentlevelObj.array_of_monsters[m].rotation = currentlevelObj.monsterArr[i][5];
				currentlevelObj.array_of_monsters[m].mesh.rotation = new THREE.Vector3(0, currentlevelObj.monsterArr[i][5]*Math.PI/2, 0);
				currentlevelObj.array_of_monsters[m].target_rotation = currentlevelObj.monsterArr[i][5];
				currentlevelObj.array_of_monsters[m].mood = currentlevelObj.monsterArr[i][19];
				currentlevelObj.array_of_monsters[m].hp = currentlevelObj.monsterArr[i][6];
			}
		}
	}
	
	//clear current container content
	for(var c=0; c<currentlevelObj.array_of_containers.length;c++)
	{
		for(var cp=0; cp<currentlevelObj.array_of_containers[c].array_of_chest_pickables.length;cp++)
		{
			currentlevelObj.array_of_containers[c].array_of_chest_pickables[cp].slot = -1;
			currentlevelObj.array_of_containers[c].array_of_chest_pickables[cp].gObject = 0;
		}
	}
	//load saved container content
	load_saved_containers_content(globalJSONloader, arrayOfGameStories[0][0].levels["id"+currentlevelObj.id].containers, level_obj);


	//clear current pickables
	for(var i=0; i<currentlevelObj.array_of_pickables.length;i++)
	{
		currentlevelObj.array_of_pickables[i].mesh.visible = false;
	}
	currentlevelObj.array_of_pickables = []; //this should free the memory
	
	load_saved_pickables(globalJSONloader,currentlevelObj.pickablesArr,currentlevelObj);
	
	
	//niches, well one niche item on first level:
	for(var n=0; n<currentlevelObj.nicheArr.length; n++) 
	{
		var niche_pickables = currentlevelObj.nicheArr[n][3]; 
		for(var i=0; i<niche_pickables.length; i++) 
		{
			//for(var j=0; j<currentlevelObj.array_of_pickables.length;j++)
			{
				//if(currentlevelObj.array_of_pickables[j].gameID == niche_pickables[i])
				{
					var nicki = create_game_object();
					nicki.gameID = niche_pickables[i];
					nicki.itemID =all_items_array[niche_pickables[i]];

					var item = get_item_by_id(nicki.itemID);
					nicki.name = item.name;
					nicki.description = item.desc;
					nicki.model = item.model;
					
					nicki.icon = item.icon;
					nicki.icon2 = item.icon2;
					nicki.useHint = item.useHint;
					
					nicki.useScript = item.useScript;
					
					nicki.consumable = (item.type == "consumable")?true:false;
					
					nicki.type = item.type;
					
					if(item.type == "weapon")
					{
						nicki.weapon_type = item.weapon_prop.type;
						nicki.weapon_speed = item.weapon_prop.speed;
						nicki.weapon_dmg = item.weapon_prop.damage;
						nicki.weapon_dmg_bonus = item.weapon_prop.damage_bonus;
						nicki.weapon_attack_bonus = item.weapon_prop.attack_bonus;
						//TODO:
						//"hand":"one", "damage_type":"piercing",
					}
					var niche_item_uffset = new THREE.Vector3(-1, -0.5, 0); //deeper, lower, sider
					var emover = -1+i/2;
					nicki.position.x = currentlevelObj.nicheArr[n][0]*SQUARE_SIZE-6+niche_item_uffset.x;
					nicki.position.z = currentlevelObj.nicheArr[n][1]*SQUARE_SIZE+emover+niche_item_uffset.z;
					nicki.position.y = 4.0+niche_item_uffset.y;
					nicki.niched = 0;
					nicki.plated = -1; //flag indicating if pickable is on the plate
				
					//loader.load( picki.model, picki.loadObject(picki) );
					loadGameObjectCheck(globalJSONloader, nicki);
					
					currentlevelObj.array_of_pickables.push(nicki);
				}
			}
		}
	}
	
	//inventory
	clear_inventory();
	//loadInventoryNoReloading([]);
	
	
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
	
	
	//restart music
	if(typeof currentlevelObj.audio_ambient != 'undefined')
	{
		currentlevelObj.audio_ambient.currentTime = 0;
		console.log("restart ambient music on new game on same level");
	}

	
	//doors
	if(currentlevelObj.array_of_doors[0].open == 1)
	{
		currentlevelObj.array_of_doors[0].open = 0;
		setDoorClosed(currentlevelObj.array_of_doors[0]);
	}
	
	//hide speech bubble
	if(document.getElementById( "gui-speech" ).style.display == "block")
		document.getElementById( "gui-speech" ).style.display = "none";

}



//new game
function newGameOnDifferentLevel()
{
	
	//clear scene, clear current level
	for( var i = scene.children.length - 1; i >= 0; i--) 
	{
		var tmpobj = scene.children[i];
		{
			//console.log("removing " + tmpobj.name);
			scene.remove(tmpobj);
		}
	}
	
	//inventory
	clear_inventory();
	//loadInventoryNoReloading([]);

	//stop the music, stop the fights, animations, actions, remove dialogs and what not?
	if(typeof currentlevelObj.audio_ambient != 'undefined')
	{
		currentlevelObj.audio_ambient.pause();
		currentlevelObj.audio_ambient.currentTime = 0;
		console.log("stop the ambient music, it will be played from start on new game");
	}

	//hide speech bubble
	if(document.getElementById( "gui-speech" ).style.display == "block")
		document.getElementById( "gui-speech" ).style.display = "none";

	nextlevelObj = {};
	currentlevelObj = {};
	arrayOfVisitedLevels = [];
		
	var story = [];
	arrayOfGameStories.push(story);
	currentStory = arrayOfGameStories.length-1;
	arrayOfGameStories[currentStory].push({'levels':{}});
	
	newGameMainMenu();
		
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
	
	
	//TODO: restart music
	
	//doors
	/*if(currentlevelObj.array_of_doors[0].open == 1)
	{
		currentlevelObj.array_of_doors[0].open = 0;
		setDoorClosed(currentlevelObj.array_of_doors[0]);
	}*/
	

}


//load game
function loadGameOnDifferentLevel()
{
	
	loading_msg_span.innerHTML = "Loading...";
	loading_msg_text_span.innerHTML = "Loading saved game.";
	loading_div.style.display = "block";

	//clear scene, clear current level
	for( var i = scene.children.length - 1; i >= 0; i--) 
	{
		var tmpobj = scene.children[i];
		{
			//console.log("removing " + tmpobj.name);
			scene.remove(tmpobj);
		}
	}
	
	//inventory
	clear_inventory();
	//loadInventoryNoReloading(arrayOfGameStories[0][0].inventory)
	//???loadInventory(arrayOfGameStories[0][0].inventory)
	
	//stop the music, stop the fights, animations, actions, remove dialogs and what not?
	if(typeof currentlevelObj.audio_ambient != 'undefined')
	{
		currentlevelObj.audio_ambient.pause();
		currentlevelObj.audio_ambient.currentTime = 0;
		console.log("stop the ambient music, it will be played from start on loaded level");
	}

	//hide speech bubble
	if(document.getElementById( "gui-speech" ).style.display == "block")
		document.getElementById( "gui-speech" ).style.display = "none";

	nextlevelObj = {};
	currentlevelObj = {};
	arrayOfVisitedLevels = [];
	
	//???	
	//var story = [];
	//arrayOfGameStories.push(story);
	//currentStory = arrayOfGameStories.length-1;
	//arrayOfGameStories[currentStory].push({'levels':{}});
	if(currentStory>0) arrayOfGameStories.splice(1,currentStory); //delete all stories except 0.
	currentStory = 0;
	
	load_saved_level_MainMenu(arrayOfGameStories[0][0],arrayOfGameStories[0][0].current_level);

	//load lights
	load_lights();
		
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
	
	if(arrayOfGameStories[0][0].left_hand_item)
	{
		martin_equipment.left_hand_item = load_item_by_id(arrayOfGameStories[0][0].left_hand_item);//get_pickable_item_by_id(arrayOfGameStories[0][0].left_hand_item);
		document.getElementById("player1-hand-l-main").style.backgroundImage = "url("+martin_equipment.left_hand_item.icon+")";
		document.getElementById("player1-hand-l-main").style.backgroundSize = "100% 100%";
	}
	// right_hand_item
	if(arrayOfGameStories[0][0].right_hand_item)
	{
		martin_equipment.right_hand_item = load_item_by_id(arrayOfGameStories[0][0].right_hand_item);//get_pickable_item_by_id(arrayOfGameStories[0][0].right_hand_item);
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
	
	
	updateModelLoading("end of level load");

	addToConsole("Game loaded..","#BBFFBB");
	
	//TODO: restart music

}


//load game without models reloading
function loadGameOnSameLevel()
{
	
	loading_msg_span.innerHTML = "Loading...";
	loading_msg_text_span.innerHTML = "Loading saved game.";
	loading_div.style.display = "block";

	nextlevelObj = {};
	//currentlevelObj = {};
	arrayOfVisitedLevels = [];
	
	if(currentStory>0) arrayOfGameStories.splice(1,currentStory); //delete all stories except 0.
	currentStory = 0;
	
	//clear current monsters and stop them
	for(var j=0; j<currentlevelObj.array_of_monsters.length;j++)
	{
		currentlevelObj.array_of_monsters[j].alive = false;
		currentlevelObj.array_of_monsters[j].mesh.visible = false;
		currentlevelObj.array_of_monsters[j].should_move= false;
		currentlevelObj.array_of_monsters[j].should_turn= false;
		currentlevelObj.array_of_monsters[j].should_attack= false;
	}
	
	//place monsters in saved position and activate them
	for(var i=0; i<arrayOfGameStories[0][0].levels["id"+currentlevelObj.id].monsters.length;i++)
	{
		for(var j=0; j<currentlevelObj.array_of_monsters.length;j++)
		{
			if(currentlevelObj.array_of_monsters[j].gameID == arrayOfGameStories[0][0].levels["id"+currentlevelObj.id].monsters[i].gameID)
			{
				currentlevelObj.array_of_monsters[j].alive = true;
				currentlevelObj.array_of_monsters[j].mesh.visible = true;
				currentlevelObj.array_of_monsters[j].position.x = arrayOfGameStories[0][0].levels["id"+currentlevelObj.id].monsters[i].position.x;
				currentlevelObj.array_of_monsters[j].position.z = arrayOfGameStories[0][0].levels["id"+currentlevelObj.id].monsters[i].position.z;
				currentlevelObj.array_of_monsters[j].target.x = arrayOfGameStories[0][0].levels["id"+currentlevelObj.id].monsters[i].position.x;
				currentlevelObj.array_of_monsters[j].target.z = arrayOfGameStories[0][0].levels["id"+currentlevelObj.id].monsters[i].position.z;
				currentlevelObj.array_of_monsters[j].mesh.position.x = arrayOfGameStories[0][0].levels["id"+currentlevelObj.id].monsters[i].position.x*SQUARE_SIZE;
				currentlevelObj.array_of_monsters[j].mesh.position.z = arrayOfGameStories[0][0].levels["id"+currentlevelObj.id].monsters[i].position.z*SQUARE_SIZE;
				currentlevelObj.array_of_monsters[j].rotation = arrayOfGameStories[0][0].levels["id"+currentlevelObj.id].monsters[i].rotation;
				currentlevelObj.array_of_monsters[j].mesh.rotation = new THREE.Vector3(0, arrayOfGameStories[0][0].levels["id"+currentlevelObj.id].monsters[i].rotation*Math.PI/2, 0);
				currentlevelObj.array_of_monsters[j].target_rotation = arrayOfGameStories[0][0].levels["id"+currentlevelObj.id].monsters[i].rotation;
				currentlevelObj.array_of_monsters[j].mood = arrayOfGameStories[0][0].levels["id"+currentlevelObj.id].monsters[i].mood;
				currentlevelObj.array_of_monsters[j].hp = arrayOfGameStories[0][0].levels["id"+currentlevelObj.id].monsters[i].hp;
			}
		}
	}
	
	//clear current container content
	for(var c=0; c<currentlevelObj.array_of_containers.length;c++)
	{
		for(var cp=0; cp<currentlevelObj.array_of_containers[c].array_of_chest_pickables.length;cp++)
		{
			currentlevelObj.array_of_containers[c].array_of_chest_pickables[cp].slot = -1;
			currentlevelObj.array_of_containers[c].array_of_chest_pickables[cp].gObject = 0;
		}
	}
	//load saved container content
	load_saved_containers_content(globalJSONloader, arrayOfGameStories[0][0].levels["id"+currentlevelObj.id].containers, currentlevelObj);

	//clear current pickables
	for(var i=0; i<currentlevelObj.array_of_pickables.length;i++)
	{
		currentlevelObj.array_of_pickables[i].mesh.visible = false;
	}
	currentlevelObj.array_of_pickables = []; //this should free the memory
	
	load_saved_pickables(globalJSONloader,arrayOfGameStories[0][0].levels["id"+currentlevelObj.id].pickables,currentlevelObj);
	
	//inventory
	clear_inventory();
	//loadInventoryNoReloading(arrayOfGameStories[0][0].inventory)
	loadInventory(arrayOfGameStories[0][0].inventory)
	
	
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
	
	if(arrayOfGameStories[0][0].left_hand_item)
	{
		martin_equipment.left_hand_item = load_item_by_id(arrayOfGameStories[0][0].left_hand_item);//get_pickable_item_by_id(arrayOfGameStories[0][0].left_hand_item);
		document.getElementById("player1-hand-l-main").style.backgroundImage = "url("+martin_equipment.left_hand_item.icon+")";
		document.getElementById("player1-hand-l-main").style.backgroundSize = "100% 100%";
	}
	// right_hand_item
	if(arrayOfGameStories[0][0].right_hand_item)
	{
		martin_equipment.right_hand_item = load_item_by_id(arrayOfGameStories[0][0].right_hand_item);//get_pickable_item_by_id(arrayOfGameStories[0][0].right_hand_item);
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
	
	
	//doors
	load_saved_doors_same_level(currentlevelObj,arrayOfGameStories[0][0].levels["id"+currentlevelObj.id].doors);	

	updateModelLoading("end of level load");

	addToConsole("Game loaded..","#BBFFBB");
}


//load game from main menu
//saved game has all levels, but we load just one where player is at.
//RAM will only have that one level.
//load_saved_level_MainMenu(arrayOfGameStories[0][0],arrayOfGameStories[0][0].current_level);
function load_saved_level_MainMenu(saved_data,level_id)
{
	audio_change_volume(audio_maintheme,0);
	
	gameState = GAME_STATE_LOADING;
	modelNumber = 0;
	relativeLevelModelCount = 0;
	
	//load level js file dinamically, proceed with loadJSONfileMainMenu when script is ready (onload)
	var fileref = document.createElement("script");
	fileref.type = "text/javascript";
	fileref.src = "maps/level"+level_id+"/level"+level_id+".js";
	document.body.appendChild(fileref);
	
	fileref.onload = function() {
		loadJSONfileMainMenu(level_id,saved_data);
    };
}

function loadJSONfileMainMenu(id,saved_data)
{
	//get items json async, after JSON is retrieved call the function to proceed with level loading
	ajaxGet("maps/level"+id+"/level"+id+".json",function(){load_level_JSON_cb_MainMenu(id,saved_data)},true);
}

function load_level_JSON_cb_MainMenu(levelId,saved_data)
{
	console.log("get_levels_cb levelId: " + levelId);
	if (xmlhttp.readyState==4 && xmlhttp.status==200)
	{
		// Javascript function JSON.parse to parse JSON data
        var levelJson = JSON.parse(xmlhttp.responseText);
		nextlevelObj = levelJson["level"];
		nextlevelObj.array_of_doors = [];
		nextlevelObj.array_of_doorways = [];
		nextlevelObj.array_of_buttons = [];
		nextlevelObj.array_of_keyholes = [];
		nextlevelObj.array_of_containers = [];
		nextlevelObj.array_of_pillars = [];
		nextlevelObj.array_of_props = [];
		nextlevelObj.array_of_animated_props = [];
		nextlevelObj.array_of_monsters = [];
		nextlevelObj.array_of_pickables = [];
		nextlevelObj.array_of_plates = [];
		nextlevelObj.array_of_stairs = [];
		nextlevelObj.array_of_lights = [];
		nextlevelObj.array_of_tapestries = [];
		nextlevelObj.array_of_niches = [];
		console.log("get_levels_cb: level acquired.. totalModels:" + levelJson["level"]["totalModels"]);
		loadLevelJsonSavedGameMainMenu(nextlevelObj,levelId,saved_data);
	}
	else
	{
		console.log("get_levels_cb: " + xmlhttp.readyState);
		nextlevelObj = {};
		//TODO: display error
	}
}

function loadLevelJsonSavedGameMainMenu(nextlevelObj,levelId,saved_data)
{
	
	if(nextlevelObj == {})
	{
		//display no more levels info..
		displayLevelInCompleteDialog();
		return;
	}
	
	//load next level
	currentlevelObj = nextlevelObj;
	current_level = levelId;

	//load level walls and floors etc..
	load_level_obj_saved(currentlevelObj,saved_data);

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
	
	//one light that follows player around
	pointLight.position.set( current_position.x*10, 4, current_position.z*10 );

	//TODO dont write this on first level
	//addToConsole("Moved to another level.","#BBFFBB");
	
	//setTimeout(function(){remove_loading_screen()}, 500);
	updateModelLoading("end of level load");
		
	console.log("kraj");

}

function loadLevelJsonSavedGame(nextlevelObj,levelId,entrance,saved_data)
{
	
	if(nextlevelObj == {})
	{
		//display no more levels info..
		displayLevelInCompleteDialog();
		return;
	}
	
	//when player opens website and starts new game or load, current_level should be 0, so ne need for cleanup
	if(current_level != 0)
	{
		loading_msg_span.innerHTML = "Loading...";
		loading_msg_text_span.innerHTML = "Moving to a new level.";
		loading_div.style.display = "block";
		
		//clear scene, clear current level
		for( var i = scene.children.length - 1; i >= 0; i--) 
		{
			var tmpobj = scene.children[i];
			if(!tmpobj.noremove)
			{
				//console.log("removing " + tmpobj.name);
				scene.remove(tmpobj);
			}
			else
			{
				//console.log("skipping " + tmpobj.name);
			}
		}

	}
	
	//load next level
	currentlevelObj = nextlevelObj;
	current_level = levelId;
	current_position = new THREE.Vector3(nextlevelObj.levelEntrances[entrance][0],0,nextlevelObj.levelEntrances[entrance][1]);
	current_rotation = nextlevelObj.levelEntrances[entrance][2];
    
	//load level walls and floors etc..
	load_level_obj_saved(currentlevelObj,saved_data);

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
	
	//one light that follows player around
	pointLight.position.set( current_position.x*10, 4, current_position.z*10 );

	//TODO dont write this on first level
	//addToConsole("Moved to another level.","#BBFFBB");
	
	//setTimeout(function(){remove_loading_screen()}, 500);
	updateModelLoading("end of level load");
		
	console.log("kraj");

}

//load floors and walls and holes and niches and all basic and static level elements
function load_level_obj_saved(level_obj,saved_data)
{	
	//load lights specific for each level
	load_level_lights(level_obj);
	
	//load floors and holes and ceilings
	load_floors_level(globalJSONloader, level_obj);
	
	//walls
	load_walls_level(globalJSONloader, level_obj);

    //this must be done before load_doors();
    for (i=0; i<saved_data.levels["id"+current_level].doors.length; i++)
	{
		//seems like levels.doors only contains open doors, so we set them here to 1?
		level_obj.doorsArr[saved_data.levels["id"+current_level].doors[i]][3] = 1;
	}
	//doors
	load_doors(globalJSONloader, level_obj);
	
	//pillars are in props.js file
	load_pillars(globalJSONloader, level_obj);
	
	//buttons
	load_buttons(globalJSONloader, level_obj);
	
	//load chests
	load_saved_containers(globalJSONloader, saved_data.levels["id"+current_level].containers, level_obj);

	//props
	load_props(globalJSONloader, level_obj);
	
	//animated props
	load_animated_props(globalJSONloader, level_obj);

	//monsters
	load_saved_monsters(globalJSONloader, level_obj, saved_data.levels["id"+current_level].monsters);
	
	//pickables
	load_saved_pickables(globalJSONloader, saved_data.levels["id"+current_level].pickables, level_obj);

	//niches - for some reason we dont need to reload niches. they are there with pickables.
	//load_niches(globalJSONloader, level_obj);

	//keyholes
	load_keyholes(globalJSONloader, level_obj);
	
	//stairs
	load_stairs(globalJSONloader, level_obj);
	
	//load lights loads just point light,
	//this must be done after scene is cleared, and after json is loaded
	//load_lights();
		
	scene.fog.color.r = level_obj.fog_color[0];
	scene.fog.color.g = level_obj.fog_color[1];
	scene.fog.color.b = level_obj.fog_color[2];
	scene.fog.density = level_obj.fog_density;
	
	//load tapestries
	load_tapestries(globalJSONloader, level_obj);
	
	//load pressure plates (plynths)
	load_plates(globalJSONloader, level_obj);
	
	//level specific action on load
	//levelOnLoad(); level3OnLoad(level_obj);
	var onLoadFn = window[level_obj.levelOnLoad];
	if(typeof onLoadFn === 'function') 
	{
		onLoadFn(level_obj);
	}

    //we load player inventory here, its unfortunate but cant think of better now
    //because async level loading, we have to make sure inventory is loaded after level
    //because of loading percentages, pickable arrays etc
    // 
    //so here we are sure level is loaded, and we call it here, 
    //but it would be better to somehow call it from main loading function and make it run after this..
    loadInventory(saved_data.inventory);
    
    if(saved_data.left_hand_item)
    {
        martin_equipment.left_hand_item = load_item_by_id(saved_data.left_hand_item);
        document.getElementById("player1-hand-l-main").style.backgroundImage = "url("+martin_equipment.left_hand_item.icon+")";
        document.getElementById("player1-hand-l-main").style.backgroundSize = "100% 100%";
    }
    // right_hand_item
    if(saved_data.right_hand_item)
    {
        martin_equipment.right_hand_item = load_item_by_id(saved_data.right_hand_item);
        document.getElementById("player1-hand-r-main").style.backgroundImage = "url("+martin_equipment.right_hand_item.icon+")";
        document.getElementById("player1-hand-r-main").style.backgroundSize = "100% 100%";
    }
	
	//console.log("level end time:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: " + Date.now());
}


//load game while playing
function loadGame()
{
	
	//load game
	console.log(arrayOfGameStories[0][0]);
	current_position = new THREE.Vector3(arrayOfGameStories[0][0].position.x,0,arrayOfGameStories[0][0].position.z);
	current_rotation = arrayOfGameStories[0][0].rotation;
	
	playerDead = false; 
	player1_face_div.style.opacity = "1.0";
	
	hide_message();
	
	//player data
	martin_level = arrayOfGameStories[0][0].martin_level;
	//experience
	martin_experience = arrayOfGameStories[0][0].martin_experience;
	//playerHPmax
	playerHPmax = arrayOfGameStories[0][0].martin_HPmax;
	//playerHPcurrent;
	playerHPcurrent = arrayOfGameStories[0][0].martin_HPcurrent;
	updatePlayerHealthBar();
	//strength
	martin_strength = arrayOfGameStories[0][0].martin_strength;
	//dexterity
	martin_dexterity = arrayOfGameStories[0][0].martin_dexterity;
	//attack
	martin_attack = arrayOfGameStories[0][0].martin_attack;
	//defence
	martin_defence = arrayOfGameStories[0][0].martin_defence;
	
	//quirks
	game_quirks = arrayOfGameStories[0][0].quirks;
	
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
	
	//if loading game on the same level just move the player and stuff back in saved position
	if(current_level == arrayOfGameStories[0][0].current_level)
	{
		loadGameOnSameLevel();
	}
	else 
	{
		//load everything from start
		current_level = arrayOfGameStories[0][0].current_level;
		loadGameOnDifferentLevel();
	}
	
	//set lights
	pointLight.position.set(current_position.x*SQUARE_SIZE, 4, current_position.z*SQUARE_SIZE);

	//level specific action on load
	//levelOnLoad();
	
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
	//show_message("(you wake up)" + " <br><br> <div id='info_dialog_button' style='cursor: pointer; margin:auto; padding-top:9px; font-size:14px; width:94px; height: 25px; background: #00c url(media/gui/buttons.png); background-size: 100% 100%;' onclick='hide_message();'> Ok </div>", 600, 200, "url(media/gui/dialog2.png)", "Copperplate, 'Copperplate Gothic Light', Papyrus, Garamond, Baskerville", "#ddddd0", "400", "20px");

	game_quirks.q1 = 0;
	game_quirks.q2 = 0;
	game_quirks.q3 = 0;
	game_quirks.q4 = 0;
	game_quirks.q5 = 0;
	game_quirks.q6 = 0;
	game_quirks.q7 = 0;
	game_quirks.q8 = 0;
	game_quirks.q9 = 0;
	game_quirks.q10 = 0;
	remove_element_class("player1-hand-r","shadow");
	remove_element_class("player1-hand-l","shadow");
	remove_element_class("player1-inventory","shadow");
	document.getElementById('id-character-screen-container').style.display='none';
	characterHudOpened = false;

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
		newGameOnDifferentLevel();
	}

	//level
	current_level = 3;
	
	addToConsole("New Game started..","#BBFFBB");

	//level specific action on load
	//levelOnLoad();
	
}

