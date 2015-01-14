

//this is array of pickables on the ground, but also of those lying in the niches (added in niche.js)
var array_of_pickables = [];

function load_saved_pickables(saved_pickables) {

	var loader = new THREE.JSONLoader();
	//{"gameID":2,"x":103,"y":6,"z":41,"niched":-1}
	for(var i=0; i<saved_pickables.length; i++) {
		var picki = create_game_object();
		var item = get_item_by_id(saved_pickables[i].gameID);
		console.log(item);
							
		picki.gameID = saved_pickables[i].gameID;
		
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
		
		if(item.type == "weapon")
		{
			picki.weapon_speed = item.weapon_prop.speed;
			picki.weapon_dmg = item.weapon_prop.damage;
			picki.weapon_dmg_bonus = item.weapon_prop.damage_bonus;
			picki.weapon_attack_bonus = item.weapon_prop.attack_bonus;
			//TODO:
			//"type":"melee", "hand":"one", "damage_type":"piercing",
		}
		
		picki.niched = saved_pickables[i].niched; //flag indicating if pickable is in the niche
		
		picki.plated = saved_pickables[i].plated; //flag indicating if pickable is on the plate

		loadGameObjectCheck(loader, picki);
		
		array_of_pickables.push(picki);
	}

}

//load pickable 3d models on the map
function load_pickables () {

	var loader = new THREE.JSONLoader();
	
	for(var i=0; i<pickables_array.length; i++) {
		var picki = create_game_object();
		picki.gameID = pickables_array[i][0];
		picki.name = pickables_array[i][1];
		picki.description = pickables_array[i][2];
		picki.model = pickables_array[i][3];
		picki.position.x = pickables_array[i][4]*SQUARE_SIZE-2;
		picki.position.z = pickables_array[i][5]*SQUARE_SIZE-4;
		picki.position.y = pickables_array[i][6];
		picki.icon = pickables_array[i][7];
		picki.icon2 = pickables_array[i][8];
		picki.useHint = pickables_array[i][9];
		if(pickables_array[i].length>10)
		{
			//console.log("pickable script function being loaded: " + picki.name);
			picki.useScript = pickables_array[i][10];
		}
		if(pickables_array[i].length>11)
		{
			picki.consumable = (pickables_array[i][11] == 1)?true:false;
		}
		if(pickables_array[i].length>15)
		{
			picki.weapon_speed = pickables_array[i][12];
			picki.weapon_dmg = pickables_array[i][13];
			picki.weapon_dmg_bonus = pickables_array[i][14];
			picki.weapon_attack_bonus = pickables_array[i][15];
		}
		picki.niched = -1; //flag indicating if pickable is in the niche
		picki.plated = -1; //flag indicating if pickable is in the niche

		loadGameObjectCheck(loader, picki);
		//loader.load( picki.model, picki.loadObject(picki) );
		
		array_of_pickables.push(picki);
	}

}
