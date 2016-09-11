
function level2OnLoad(levelObj)
{
	//info_dialog_div.style.display = "inline";
	console.log("is this adding new dom elements each time? do we need this like that?");
	levelObj.audio_ambient = document.createElement('audio');
	var source_ambient = document.createElement('source');
	source_ambient.src = levelObj.ambient_music_file;
	levelObj.audio_ambient.appendChild(source_ambient);
	
	levelObj.audio_ambient.volume = 0.5;
	levelObj.audio_ambient.loop = false;
	levelObj.audio_ambient.play();

}

function level2OnFirstLoad()
{
	//info_dialog_div.style.display = "inline";
	GLOBAL_LEVEL2_NICHES_CLOSED = 0;
}

//monsters TODO
var IDLE_ANIM_DURATION = 6200;
var MONSTER_ATTACK_FRAME = 119;

function level2MonsterOnClick1()
{
	if(this.mood == MONSTER_MAD)
	{
		DisplayInfoDiv("It seems mad at you now..");
		//Play tounchy mad sound
		this.audio_monster_roar.play();
	}
	else
	{
		DisplayInfoDiv("Big guy, better not make him angry..");
		//Play tounchy sound
		this.audio_monster_click.play();
	}
}

function level2MonsterOnItemClick1(pickable)
{
	//if golem is idle react to pickable click
	if(this.mood == MONSTER_IDLE)
	{
		console.log("item on monster: " + pickable.name + ", id: " + pickable.gameID);
		if(pickable.gameID == 12) //12 is ID of ring in container on this level!
		{
			//add item to monster inventory, its his item now :)
			DisplayInfoDiv("Rock Golem takes ring from you!");
			this.pickables.push({"gameID":pickable.gameID});
			//we dont have to remove item from level pickable array because 
			//it should already be removed if its in players hand

			// Play Golem happy sound
			this.audio_monster_click.play();
			
			//monster move from guarding pos
			this.mood = MONSTER_WALK;
			console.log("monster will walk now");
			
			//return true if item is consumed
			return true;
		}
		else
		{
			//monster get angry
			this.mood = MONSTER_MAD;
			// Play tounchy mad sound
			this.audio_monster_roar.play();
			
			console.log("monster got mad");
			DisplayInfoDiv("This offer makes Rock Golem angry!!");
		}
		
	}
	else if(this.mood == MONSTER_MAD)
	{
		//DisplayInfoDiv("Too late to bribe.. fight or flight!");
		// soundy Play tounchy mad sound
	}
	
	return false;
}

//monster inventory items: id, name, model, icon, picki
//var monster_pickables_array = [[5,"Rock","models/rocky.js", "media/rock.png", 0], [6,"Rock","models/rocky.js", "media/rock.png", 0]];
// id, name, model, x, z, rot, hp, ac, attack
//var monster_array = [[2,"Rock Golem","models/golem.js", 20,11,3, 100, 35, 20, 30, monster_pickables_array, MonsterOnClick1, MonsterOnItemClick1,0,90,90,138,140,179,0,"maps/level2/media/golem_wound.mp3","maps/level2/media/golem_death.mp3","maps/level2/media/golem_roar.mp3","maps/level2/media/golem_attack.mp3","maps/level2/media/golem_click.mp3"]];


//niches and their content
///////////////////////////////////////////////////////////////////////////////////////////////

var GLOBAL_LEVEL2_NICHES_CLOSED = 0;

function level2Niche1_OnItemAdd(levelObj, nichi, gObject)
{
	console.log("niche1 added item: " + gObject.name);
}

function level2Niche1_OnItemRemove(levelObj, nichi, gObject)
{
	console.log("niche1 removed item: " + gObject.name);
}

function level2Niche2_OnItemAdd(levelObj, nichi, gObject)
{
	console.log("niche2 added item: " + gObject.name);

	//change state to closed
	nichi.opened = 0;

	//draw wall over niche
	var map = THREE.ImageUtils.loadTexture( levelObj.wall_texture_file );
	map.wrapS = map.wrapT = THREE.RepeatWrapping;
	map.anisotropy = 16;
	var material = new THREE.MeshLambertMaterial( { ambient: 0xbbbbbb, map: map, side: THREE.DoubleSide } );	
	nichi.coverModel = new THREE.Mesh( new THREE.PlaneGeometry( SQUARE_SIZE, 0.8*SQUARE_SIZE, 10, 10 ), material );
	nichi.coverModel.rotation.set(0, Math.PI/2, 0);
	//nichi.coverModel.receiveShadow = true;
	nichi.coverModel.position.y = 0.4*SQUARE_SIZE; //y
	//if(nichi.orientation == 0) 
	nichi.coverModel.position.x = (nichi.map_position.x)*SQUARE_SIZE; //x
	nichi.coverModel.position.z = (nichi.map_position.z+0.5)*SQUARE_SIZE-0.2; //z
	nichi.coverModel.rotation.set(0, 0, 0);
	scene.add( nichi.coverModel );
	
	//remove pickable item from game, this niche is eating items!
	//console.log("removing pickable..." + gObject.gameID);
	for (var i=0; i< levelObj.array_of_pickables.length; i++)
	{
		//console.log("removing pickable in for..." + levelObj.array_of_pickables[i].gameID);
		if(levelObj.array_of_pickables[i].gameID == gObject.gameID)
		{
			//console.log("removing pickable..." + i);
			levelObj.array_of_pickables[i].mesh.visible = false; //TODO: not really removing mesh from scene here, we should do it to free mem
			levelObj.array_of_pickables.splice(i,1);
		}
	}


	GLOBAL_LEVEL2_NICHES_CLOSED++;
	
	if (GLOBAL_LEVEL2_NICHES_CLOSED == 3)
	{
		//open portal...
		console.log("open portal...");
		//load teleport();
		//load_teleport();
		//play win sound
		audio_win2.play();
		DisplayInfoDiv(" ..and third niche activated something!");
	}
	else
	{
		DisplayInfoDiv(" ..and niche suddenly closed!");
	}

}

function level2Niche2_OnItemRemove(levelObj, nichi, gObject)
{
	console.log("niche2 removed item: " + gObject.name);
}

function level2Niche3_OnItemAdd(levelObj, nichi, gObject)
{
	console.log("niche3 added item: " + gObject.name);

	//change state to closed
	nichi.opened = 0;

	//draw wall over niche
	var map = THREE.ImageUtils.loadTexture( levelObj.wall_texture_file );
	map.wrapS = map.wrapT = THREE.RepeatWrapping;
	map.anisotropy = 16;
	var material = new THREE.MeshLambertMaterial( { ambient: 0xbbbbbb, map: map, side: THREE.DoubleSide } );	
	nichi.coverModel = new THREE.Mesh( new THREE.PlaneGeometry( SQUARE_SIZE, 0.8*SQUARE_SIZE, 10, 10 ), material );
	nichi.coverModel.rotation.set(0, Math.PI/2, 0);
	//nichi.coverModel.receiveShadow = true;
	nichi.coverModel.position.y = 0.4*SQUARE_SIZE;
	//if(nichi.orientation == 3) 
	nichi.coverModel.position.x = (nichi.map_position.x+0.5)*SQUARE_SIZE-0.3; //x
	nichi.coverModel.position.z = (nichi.map_position.z)*SQUARE_SIZE; //z
	nichi.coverModel.rotation.set(0, -Math.PI/2, 0);
	scene.add( nichi.coverModel );
	
	//remove pickable item from game, this niche is eating items!
	//console.log("removing pickable..." + gObject.gameID);
	for (var i=0; i< levelObj.array_of_pickables.length; i++)
	{
		//console.log("removing pickable in for..." + levelObj.array_of_pickables[i].gameID);
		if(levelObj.array_of_pickables[i].gameID == gObject.gameID)
		{
			//console.log("removing pickable..." + i);
			levelObj.array_of_pickables[i].mesh.visible = false; //TODO: not really removing mesh from scene here, we should do it to free mem
			levelObj.array_of_pickables.splice(i,1);
		}
	}

	GLOBAL_LEVEL2_NICHES_CLOSED++;
	
	if (GLOBAL_LEVEL2_NICHES_CLOSED == 3)
	{
		//open portal...
		console.log("open portal...");
		//load teleport();

		//play win sound
		audio_win2.play();
		DisplayInfoDiv(" ..and third niche activated something!");
	}
	else
	{
		DisplayInfoDiv(" ..and what just happened?!");
	}

}

function level2Niche3_OnItemRemove(levelObj, nichi, gObject)
{
	console.log("niche3 removed item: " + gObject.name);
}

function level2Niche4_OnItemAdd(levelObj, nichi, gObject)
{
	console.log("niche4 added item: " + gObject.name);

	//change state to closed
	nichi.opened = 0;

	//draw wall over niche
	var map = THREE.ImageUtils.loadTexture( levelObj.wall_texture_file );
	map.wrapS = map.wrapT = THREE.RepeatWrapping;
	map.anisotropy = 16;
	var material = new THREE.MeshLambertMaterial( { ambient: 0xbbbbbb, map: map, side: THREE.DoubleSide } );	
	nichi.coverModel = new THREE.Mesh( new THREE.PlaneGeometry( SQUARE_SIZE, 0.8*SQUARE_SIZE, 10, 10 ), material );
	nichi.coverModel.rotation.set(0, Math.PI/2, 0);
	//nichi.coverModel.receiveShadow = true;
	nichi.coverModel.position.y = 0.4*SQUARE_SIZE; 
	//if(nichi.orientation == 2) 
	nichi.coverModel.position.x = (nichi.map_position.x)*SQUARE_SIZE; //x
	nichi.coverModel.position.z = (nichi.map_position.z-0.5)*SQUARE_SIZE; //z
	nichi.coverModel.rotation.set(0, Math.PI, 0);
	scene.add( nichi.coverModel );
	
	//remove pickable item from game, this niche is eating items!
	//console.log("removing pickable..." + gObject.gameID);
	for (var i=0; i< levelObj.array_of_pickables.length; i++)
	{
		//console.log("removing pickable in for..." + levelObj.array_of_pickables[i].gameID);
		if(levelObj.array_of_pickables[i].gameID == gObject.gameID)
		{
			//console.log("removing pickable..." + i);
			levelObj.array_of_pickables[i].mesh.visible = false; //TODO: not really removing mesh from scene here, we should do it to free mem
			levelObj.array_of_pickables.splice(i,1);
		}
	}
	
	GLOBAL_LEVEL2_NICHES_CLOSED++;
	
	if (GLOBAL_LEVEL2_NICHES_CLOSED == 3)
	{
		//open portal...
		console.log("open portal...");
		//load teleport();
		//load_teleport();
		//play win sound
		audio_win2.play();
		DisplayInfoDiv(" ..and third niche activated something!");
	}
	else
	{
		DisplayInfoDiv(" ..and niche ate my item!");
	}

}

function level2Niche4_OnItemRemove(levelObj, nichi, gObject)
{
	console.log("niche4 removed item: " + gObject.name);
}



//teleports

//var teleport_array = [[18,11]];

//var teleport_pos_x = 180; //position on map
//var teleport_pos_z = 110; //position on map

/*function teleportGo()
{
	//pause game
	m_GamePaused = true;
	//show final register/feedback level complete screen!
	displayLevelCompleteDialog();
}*/
