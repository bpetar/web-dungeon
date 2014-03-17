
function onLoad()
{
	info_dialog_div.style.display = "inline";
}

var levelNumber = 1;

// map arrays..
var floorsArr2D = [[13,15], [12,15], [11,15], [10,15], [9,15], [6,15], [5,15], [4,15], [16,14], [15,14], [14,14], [13,14], [12,14], [11,14], [10,14], [9,14], [8,14], [7,14], [6,14], [5,14], [4,14], [16,13], [13,13], [12,13], [11,13], [10,13], [9,13], [6,13], [5,13], [4,13], [16,12], [16,11], [16,10], [17,9], [16,9], [16,8], [16,7], [16,6], [16,5], [16,4], [16,3], [16,2], [16,1], [16,0]];
var secretWallsArr = [[16,9,3,0,"This wall seems odd"]]; //x,y,orientation,model,hint
var doorsArr3D = [[16,3,0,0,0,0,0], [16,7,0,0,0,0,0], [16,11,0,0,0,0,0]]; //x,z,rot,open,mesh,animate flag,openable on click
var holesArr = [];
var writtingsArr = [[16,1,1,"Put some weight..",0]]; 

var models3D = ['maps/level1/models/hole.js', 'maps/level1/models/niche.js', 'maps/level1/models/doorway.js', 'maps/level1/models/door.js', 'models/tapestry1.js', 'models/tapestry2.js', 'maps/level1/models/chest2.js', 'maps/level1/models/pillar.js', 'maps/level1/models/button_small.js', 'models/keyhole.js', 'models/crystal.js', 'models/rocky.js'];

//basic level textures
var floor_texture_file = 'maps/level1/media/floor_11_1.png';
var wall_texture_file = 'maps/level1/media/stone_wall_01_01.png';
var ceiling_texture_file = 'maps/level1/media/ceiling.png';
var teleport_floor_texture_file = 'maps/level1/media/teleport_floor.png';
var wall_writting_texture_file = 'maps/level1/media/wallwrit.png';
var decorPillarModel = "maps/level1/models/decorPillar.js";

//basic level models
var hole_model = 'maps/level1/models/hole.js';
var niche_model = 'maps/level1/models/niche.js';
var doorway_model = 'maps/level1/models/doorway.js';
var door_model = 'maps/level1/models/door.js';

//level related values
var ambient_music_file = 'media/ambient_music.mp3';
var win_area = [[17,9, "Secret area found!",0]];

// id, name, model, x, z, icon
var tapestries_array = [["models/tapestry1.js", 16,0,2], ["models/tapestry2.js", 16,9,3]];

// id, name, model, icon, slot
var container_pickables_array1 = [[1,"Gold key","models/key.js", "media/key.png", 1, 0]];// id, name, model, icon, slot, picki
// id, name, model, x, z, orientation, mesh
var containers_array = [[1,"Chest","maps/level1/models/chest2.js", 17,9,3, container_pickables_array1, 0]];

// id, model, x, z, pressed, script functions..
var plates_array = [[1, "models/plynth.js", 16,1,0,onPressPlate1,onUnpressPlate1]];

var pillar_array = [[2, "maps/level1/models/pillar.js", 12,14]];

//buttons
var buttons_array = [[1, "maps/level1/models/button_small.js", 16,6,1,onPressButton1]];

//keyholes
var keyholes_array = [[1, "models/keyhole.js", 16,9,1,onKeyClick]];


//monsters
var IDLE_ANIM_DURATION = 3300;
var MONSTER_ATTACK_FRAME = 40;

//on click script functions
function MonsterOnClick1()
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

function MonsterOnItemClick1(pickable)
{
	DisplayInfoDiv("It doesn't want to take it..");
	// soundy Play tounchy mad sound
	this.audio_monster_click.play();
	return false;
}

//monster inventory items: id, name, model, icon, picki
var monster_pickables_array1 = [];
// id, name, model, x, z, rot, hp, ac, attack, dmg, pickables, onclick, onitemclick, idlestart, idleend, walkstart, walkend, attackstart, attackend, mood
var monster_array = [[2,"Crystal Elemental Pera","models/crystal.js", 11,14,3, 10, 35, 10, 5, monster_pickables_array1, MonsterOnClick1, MonsterOnItemClick1,1,25,25,50,50,75,1,"maps/level1/media/crystal_wound.mp3","maps/level1/media/crystal_death.mp3","maps/level1/media/crystal_roar.mp3","maps/level1/media/crystal_attack.mp3","maps/level1/media/crystal_click.mp3"], [3,"Crystal Elemental Djoka","models/crystal.js", 6,14,1, 15, 35, 10, 5, monster_pickables_array1, MonsterOnClick1, MonsterOnItemClick1,1,25,25,50,50,75,1,"maps/level1/media/crystal_wound.mp3","maps/level1/media/crystal_death.mp3","maps/level1/media/crystal_roar.mp3","maps/level1/media/crystal_attack.mp3","maps/level1/media/crystal_click.mp3"]];


//niches and their content
///////////////////////////////////////////////////////////////////////////////////////////////

function onKeyClick()
{
	console.log("gold key to open door");
	
	doorsArr3D[2][5] = 1; //animate flag
	doorsArr3D[2][3] = 1; // open/close flag
	
	audio_door.load();
	audio_door.play();

	//temp hack
	load_teleport();
}

function onPressButton1()
{
	console.log("button to open door");
	
	doorsArr3D[1][5] = 1; //animate flag
	doorsArr3D[1][3] = 1; // open/close flag
	
	audio_door.load();
	audio_door.play();
}

function onPressPlate1()
{
	console.log("plate to open door");

	doorsArr3D[0][5] = 1; //animate flag
	doorsArr3D[0][3] = 1; // open/close flag
	
	audio_door.load();
	audio_door.play();
}

function onUnpressPlate1()
{
	console.log("plate to close door");
	doorsArr3D[0][5] = 1; //animate flag
	doorsArr3D[0][3] = 0; // open/close flag

	audio_door.load();
	audio_door.play();
}


function showScroll()
{
	console.log("Showing scroll content!");
	audio_scroll.play();
	show_message(" <br> " + "Search the walls.." + " <br><br><br> <button id='info_dialog_button' style='cursor: pointer; width:134px; height: 34px; background: #00c url(media/button_scroll.png); background-size: 100% 100%;' onclick='hide_message();'> Ok </button>", 600, 300, "url(media/scroll.png)", "Papyrus, Garamond, Baskerville", "#001100", "800", "20px");
}

// id, name, model, icon, useHint, script function onUse
var niche_pickables_array1 = [[3,"Scroll","models/scroll.js", "media/scrolly.png", "", showScroll]];

//x,z,rot,content, script, open, wallcover, script func niche_onItemAdd
var nicheArr = [[16,5,3,niche_pickables_array1]]; 

NICHES_CLOSED = 0;

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

//////////////////////////////////////////////////////////////////////////////////////////////



//this is pickables
///////////////////////////////////////////////////
function healingScript()
{
	playerHPcurrent += 15;
	if (playerHPcurrent > playerHPmax)
	{
		playerHPcurrent = playerHPmax;
	}
	updatePlayerHealthBar();
}

// id, name, model, x, z, icon, useage hint, use script, consumable
var pickables_array = [[2,"Rock","models/rocky.js", 16,0,0, "media/rock.png", "This is too hard to chew.."]];
////////////////////////////////////////////////


//teleports

var teleport_array = [[5,14]];

//var teleport_pos = new THREE.Vector3(160, 0, 110); //position on map
var teleport_pos_x = 50; //position on map
var teleport_pos_z = 140; //position on map

function changeLevel()
{
	window.location.href = 'cuber.php?lvl=level2';
}

function teleportGo()
{
	audio_enchant.play();
	setTimeout(changeLevel, 1000);
	
}

var fog_color = 0x000033;
var fog_intensity = 0.008525;
var point_light_color = 0xaaaaff;
function load_level_lights()
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
}