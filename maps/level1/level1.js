
function level1OnLoad()
{
	//info_dialog_div.style.display = "inline";
}

function level1OnFirstLoad()
{
	//info_dialog_div.style.display = "inline";
}

//var levelNumber = 1;
//var totalModels = 12;

// map arrays..
//var floorsArr2D = [];
//var secretWallsArr = []; //x,y,orientation,model,hint
//var doorsArr3D = []; //x,z,rot,open,mesh,animate flag,openable on click
//var holesArr = [];
//var writtingsArr = []; 

//var models3D = ['maps/level1/models/hole.js', 'maps/level1/models/niche.js', 'maps/level1/models/doorway.js', 'maps/level1/models/door.js', 'models/tapestry1.js', 'models/tapestry2.js', 'maps/level1/models/chest2.js', 'maps/level1/models/pillar.js', 'maps/level1/models/button_small.js', 'models/keyhole.js', 'models/crystal.js', 'models/rocky.js'];

//basic level textures
//var floor_texture_file = '';
//var wall_texture_file = '';
//var ceiling_texture_file = '';
//var teleport_floor_texture_file = '';
//var wall_writting_texture_file = '';
//var decorPillarModel = "";

//basic level models
//var hole_model = '';
//var niche_model = '';
//var doorway_model = '';
//var door_model = '';

//level related values
//var ambient_music_file = '';
//var win_area = [[17,9, "Secret area found!",0]];

// id, name, model, x, z, icon
//var tapestries_array = [];

// id, name, model, icon, slot
//var container_pickables_array1 = [[1,"Gold key","models/key.js", "media/key.png", 1, 0]];// id, name, model, icon, slot, picki
// id, name, model, x, z, orientation, mesh
//var containers_array = [[1,"Chest","maps/level1/models/chest2.js", 18,11,0, container_pickables_array1, 0]];

// id, model, x, z, pressed, script functions..
//var plates_array = [];

//var pillar_array = [];

//buttons
//var buttons_array = [];

//keyholes
//var keyholes_array = [];


//monsters
var IDLE_ANIM_DURATION = 3300;
var MONSTER_ATTACK_FRAME = 40;

//on click script functions
function level1MonsterOnClick1()
{
	if(this.mood == MONSTER_MAD)
	{
		DisplayInfoDiv("It seems angry..");
		//Play tounchy mad sound
		this.audio_monster_click.play();
	}
	else
	{
		DisplayInfoDiv("It seems demotivated..");
		//Play tounchy sound
		this.audio_monster_click.play();
	}
}

function level1MonsterOnItemClick1(pickable)
{
	DisplayInfoDiv("It doesn't want to take it..");
	// soundy Play tounchy mad sound
	this.audio_monster_click.play();
	return false;
}

//monster inventory items: id, name, model, icon, picki
//var monster_pickables_array1 = [];
// id, name, model, x, z, rot, hp, ac, attack, dmg, pickables, onclick, onitemclick, idlestart, idleend, walkstart, walkend, attackstart, attackend, mood
//var monster_array = [[2,"Crystal Elemental Pera","models/crystal.js", 11,14,3, 10, 35, 10, 5, monster_pickables_array1, MonsterOnClick1, MonsterOnItemClick1,1,25,25,50,50,75,1,"maps/level1/media/crystal_wound.mp3","maps/level1/media/crystal_death.mp3","maps/level1/media/crystal_roar.mp3","maps/level1/media/crystal_attack.mp3","maps/level1/media/crystal_click.mp3"], [3,"Crystal Elemental Djoka","models/crystal.js", 6,14,1, 15, 35, 10, 5, monster_pickables_array1, MonsterOnClick1, MonsterOnItemClick1,1,25,25,50,50,75,1,"maps/level1/media/crystal_wound.mp3","maps/level1/media/crystal_death.mp3","maps/level1/media/crystal_roar.mp3","maps/level1/media/crystal_attack.mp3","maps/level1/media/crystal_click.mp3"]];


//niches and their content
///////////////////////////////////////////////////////////////////////////////////////////////

function level1OnKeyClick()
{
	console.log("gold key to open door");
	
	openDoor(currentlevelObj.array_of_doors[2]);

	//temp hack
	//load_teleport();
}

function level1OnPressButton1()
{
	console.log("button to open door");
	
	openDoor(currentlevelObj.array_of_doors[1]);
}

function level1OnPressPlate1()
{
	console.log("plate to open dooor");

	openDoor(currentlevelObj.array_of_doors[0]);
}

function level1OnUnpressPlate1()
{
	console.log("plate to close door");
	closeDoor(currentlevelObj.array_of_doors[0]);
}



// id, name, model, icon, useHint, script function onUse
//var niche_pickables_array1 = [[3,"Scroll","models/scroll.js", "media/scrolly.png", "", "script_showScroll_lvl1_msg"]];

//x,z,rot,content, script, open, wallcover, script func niche_onItemAdd
//var nicheArr = [[16,5,3,niche_pickables_array1]]; 

/*NICHES_CLOSED = 0;

function niche_onItemAdd (nicheID, itemID)
{
	console.log("item added to niche...");
	
	//change state to closed
	nicheArr[nicheID][4] = 0;
	
	//draw wall over niche
	var map = THREE.ImageUtils.loadTexture( 'media/wall.jpg' );
	map.wrapS = map.wrapT = THREE.RepeatWrapping;
	map.anisotropy = 16;
	var material = new THREE.MeshLambertMaterial( { ambient: 0xbbbbbb, map: map, side: THREE.DoubleSide } );	
	nicheArr[nicheID][5] = new THREE.Mesh( new THREE.PlaneGeometry( SQUARE_SIZE, 0.8*SQUARE_SIZE, 1, 1 ), material );
	nicheArr[nicheID][5].rotation.set(0, Math.PI/2, 0);
	//nicheArr[nicheID][5].receiveShadow = true;
	nicheArr[nicheID][5].position.y = 0.4*SQUARE_SIZE; //y
	if(nicheArr[nicheID][2] == 1) 
	{
		nicheArr[nicheID][5].position.x = (nicheArr[nicheID][0]-0.5)*SQUARE_SIZE; //x
		nicheArr[nicheID][5].position.z = (nicheArr[nicheID][1])*SQUARE_SIZE; //z
		nicheArr[nicheID][5].rotation.set(0, Math.PI/2, 0);
	}
	if(nicheArr[nicheID][2] == 3) 
	{
		nicheArr[nicheID][5].position.x = (nicheArr[nicheID][0]+0.5)*SQUARE_SIZE; //x
		nicheArr[nicheID][5].position.z = (nicheArr[nicheID][1])*SQUARE_SIZE; //z
		nicheArr[nicheID][5].rotation.set(0, -Math.PI/2, 0);
	}
	if(nicheArr[nicheID][2] == 0) 
	{
		nicheArr[nicheID][5].position.x = (nicheArr[nicheID][0])*SQUARE_SIZE; //x
		nicheArr[nicheID][5].position.z = (nicheArr[nicheID][1]+0.5)*SQUARE_SIZE; //z
		nicheArr[nicheID][5].rotation.set(0, 0, 0);
	}
	if(nicheArr[nicheID][2] == 2) 
	{
		nicheArr[nicheID][5].position.x = (nicheArr[nicheID][0])*SQUARE_SIZE; //x
		nicheArr[nicheID][5].position.z = (nicheArr[nicheID][1]-0.5)*SQUARE_SIZE; //z
		nicheArr[nicheID][5].rotation.set(0, Math.PI, 0);
	}
	scene.add( nicheArr[nicheID][5] );
	
	//remove pickable item from game, this niche is eating items!
	console.log("removing pickable..." + itemID);
	for (var i=0; i< array_of_pickables.length; i++)
	{
		console.log("removing pickable in for..." + array_of_pickables[i].gameID);
		if(array_of_pickables[i].gameID == itemID)
		{
			console.log("removing pickable..." + i);
			array_of_pickables[i].mesh.visible = false; //TODO: not really removing mesh from scene here, we should do it to free mem
			array_of_pickables.splice(i,1);
		}
	}
	
	NICHES_CLOSED++;
	
	if (NICHES_CLOSED == 3)
	{
		//open portal...
		console.log("open portal...");
		//load teleport();
		load_teleport();
		
	}
}
*/
//////////////////////////////////////////////////////////////////////////////////////////////



//this is pickables
///////////////////////////////////////////////////

// id, name, model, x, z, icon, useage hint, use script, consumable
//var pickables_array = [];
////////////////////////////////////////////////


//teleports
/*
var teleport_array = [[5,14]];

//var teleport_pos = new THREE.Vector3(160, 0, 110); //position on map
var teleport_pos_x = 50; //position on map
var teleport_pos_z = 140; //position on map

function changeLevel()
{
	//window.location.href = 'cuber.php?lvl=level2';
	
	post_to_url('cuber.php?lvl=level2', {inventory: inventory_to_post()});
}

function teleportGo()
{
	//should we realy make user wait just so he can hear enchanted sound effect? at least add some fade out effect... (fade in black loading screen)
	audio_enchant.play();
	//block movement here
	setTimeout(changeLevel, 300);
}*/

//var fog_color = 0x000033;
//var fog_intensity = 0.008525;
//var point_light_color = 0xaaaaff;
//var point_light_intensity = 1.6;

/*function load_level_lights()
{
				//light2 = new THREE.DirectionalLight( 0xffffff );
				//light2.position.set( 50, 50, 50 ).normalize();
				//light2.castShadow = true;
				//scene.add( light2 );
				
				//light2 = new THREE.DirectionalLight( 0xffffff );
				//light2.position.set( -50, -30, -50 ).normalize();
				//light2.castShadow = true;
				//scene.add( light2 );

				//light2 = new THREE.DirectionalLight( 0xffffff );
				//light2.position.set( 50, -10, -30 ).normalize();
				//light2.castShadow = true;
				//scene.add( light2 );
}*/