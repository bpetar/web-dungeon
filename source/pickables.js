
//all items array. im so smart :)
//index of item is his gameID, and value is itemID from items.json
//every time you add pickable to the game, it must be added to this array
//if you have gameID of item and you need itemID you just type all_items_array[gameID]
all_items_array = [  0,   0,   2,   3,   2,   5,   4,   6,   7,   8,
                     6,   9,  10,  11,   6,   6,   6
				  ];

function load_saved_pickables(loader, saved_pickables, levelObj) {

	//{"gameID":2,"x":103,"y":6,"z":41,"niched":-1,"plated":-1}
	for(var i=0; i<saved_pickables.length; i++) {
		var picki = create_game_object();
		picki.gameID = saved_pickables[i].gameID;
		picki.itemID = all_items_array[saved_pickables[i].gameID];

		var item = get_item_by_id(picki.itemID);
		picki.name = item.name;
		picki.description = item.desc;
		picki.model = item.model;
		
		picki.position.x = saved_pickables[i].x;
		picki.position.z = saved_pickables[i].z;
		picki.position.y = saved_pickables[i].y;
		
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
		
		picki.niched = saved_pickables[i].niched; //flag indicating if pickable is in the niche
		
		picki.plated = saved_pickables[i].plated; //flag indicating if pickable is on the plate

		loadGameObjectCheck(loader, picki);
		
		//this is array of pickables on the ground, but also of those lying in the niches (added in niche.js)
		levelObj.array_of_pickables.push(picki);
	}

}

//used in temp level loading
function reload_pickables(levelObj)
{
	for(var i=0; i<levelObj.array_of_pickables.length;i++)
	{
        if(levelObj.array_of_pickables[i].visible)
            scene.add(levelObj.array_of_pickables[i].mesh);
	}
}

//remove element
function remove_pickable_from_array(pickArr,item)
{
    var index = pickArr.indexOf(item);
    pickArr.splice(index, 1);
}


//load pickable 3d models on the map
function load_pickables (loader, levelObj) {

	//pickables":[{"gameID":3,"x":88,"y":0,"z":26,"niched":-1,"plated":-1}
	load_saved_pickables(loader, levelObj.pickablesArr, levelObj);
}

function get_pickable_item_by_id(levelObj,id)
{
	for(var i=0; i< levelObj.array_of_pickables.length; i++)
	{
		if(levelObj.array_of_pickables[i].gameID == id)
		{
			return levelObj.array_of_pickables[i];
		}
	}
	
	return 0;
}