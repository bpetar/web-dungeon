
function levelOnLoad()
{
	//info_dialog_div.style.display = "inline";
}

var levelNumber = 2;
var totalModels = 8;

// map arrays..
var floorsArr2D = [[16,0], [9,0], [8,0], [16,1], [9,1], [8,1], [4,2], [5,2], [6,2], [7,2], [8,2], [9,2], [12,2], [13,2], [15,2], [16,2], [15,3], [13,3], [6,3], [5,3], [4,3], [4,4], [10,4], [11,4], [12,4], [13,4], [14,4], [15,4], [10,5], [9,5], [8,5], [7,5], [6,5], [5,5], [4,5], [3,5], [10,6], [9,6], [8,6], [7,6], [4,6], [4,7], [5,7], [7,7], [8,7], [9,7], [10,7], [0,8], [1,8], [2,8], [5,8], [0,9], [1,9], [2,9], [3,9], [4,9], [5,9], [6,9], [7,9], [8,9], [9,9], [10,9], [13,9], [14,9], [15,9], [16,9], [17,9], [18,9], [19,9], [0,10], [1,10], [2,10], [8,10], [10,10], [13,10], [14,10], [15,10], [16,10], [17,10], [18,10], [19,10], [7,11], [8,11], [9,11], [10,11], [11,11], [12,11], [13,11], [14,11], [15,11], [16,11], [17,11], [18,11], [19,11], [20,11], [13,12], [14,12], [15,12], [16,12], [17,12], [18,12], [19,12], [13,13], [14,13], [15,13], [16,13], [17,13], [18,13], [19,13]];
var secretWallsArr = [[6,2,3]]; //x,y,orientation
var doorsArr3D = [[3,9,1,0,0,0,1], [12,11,1,0,0,0,1]]; //x,z,rot,open,mesh,animate flag,openable on click
var holesArr = [[7,7]];
var writtingsArr = [[11,11,0,"Offer gift to the Guardian, but be careful not to insult him!",0]]; 

//basic level textures
var floor_texture_file = 'maps/level2/media/floor.jpg';
var wall_texture_file = 'maps/level2/media/wall.jpg';
var ceiling_texture_file = 'maps/level2/media/ceiling.jpg';
var teleport_floor_texture_file = 'maps/level2/media/teleport_floor.jpg';
var wall_writting_texture_file = 'maps/level2/media/wallwrit.jpg';
var decorPillarModel = "";

//basic level models
var hole_model = 'maps/level2/models/hole.js';
var niche_model = 'maps/level2/models/niche.js';
var doorway_model = 'maps/level2/models/doorway.js';
var door_model = 'models/door.js';

//level related values
var fog_color = 0x226622;
var fog_intensity = 0.008525;
var ambient_music_file = 'maps/level2/media/mountain_path.mp3';

// id, name, model, x, z, icon
var tapestries_array = [["models/tapestry1.js", 16,0,2], ["models/tapestry1.js", 19,10,3], ["models/tapestry1.js", 19,12,3], ["models/tapestry1.js", 0,9,1], ["models/tapestry2.js", 6,2,3]];

// id, name, model, icon, slot
var container_pickables_array1 = [[1,"Ring","models/ring.js", "media/ring.png", 1, 0]];// id, name, model, icon, slot, picki
// id, name, model, x, z, orientation, mesh
var containers_array = [[1,"Chest","models/chest.js", 0,8,1, container_pickables_array1,0]];


// id, model, x, z, pressed, script functions..
var plates_array = [];
var pillar_array = [];
//buttons
var buttons_array = [];
//keyholes
var keyholes_array = [];

var win_area = [[7,2, "Secret area found!",0]];


//monsters

var IDLE_ANIM_DURATION = 6200;
var MONSTER_ATTACK_FRAME = 119;

function MonsterOnClick1()
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


function MonsterOnItemClick1(pickable)
{
	//if golem is idle react to pickable click
	if(this.mood == MONSTER_IDLE)
	{
		console.log("item on mosnter: " + pickable.name + ", id: " + pickable.gameID);
		if(pickable.gameID == 1) //1 is ID of ring in container on this level!
		{
			//add item to monster inventory, its his item now :)
			DisplayInfoDiv("Rock Golem takes ring from you!");
			var newMonsterItem = new Array();
			newMonsterItem[0] = pickable.id;
			newMonsterItem[1] = pickable.name;
			newMonsterItem[2] = pickable.model;
			newMonsterItem[3] = pickable.icon;
			newMonsterItem[4] = pickable;
			if(this.pickables != 0)
			{
				this.pickables.push(newMonsterItem);
			}
			else
			{
				console.log("monster has no pickable item list!");
			}
			
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
var monster_pickables_array = [[5,"Rock","models/rocky.js", "media/rock.png", 0], [6,"Rock","models/rocky.js", "media/rock.png", 0]];
// id, name, model, x, z, rot, hp, ac, attack
var monster_array = [[2,"Rock Golem","models/golem.js", 20,11,3, 100, 35, 20, 30, monster_pickables_array, MonsterOnClick1, MonsterOnItemClick1,0,90,90,138,140,179,0,"maps/level2/media/golem_wound.mp3","maps/level2/media/golem_death.mp3","maps/level2/media/golem_roar.mp3","maps/level2/media/golem_attack.mp3","maps/level2/media/golem_click.mp3"]];


//niches and their content
///////////////////////////////////////////////////////////////////////////////////////////////


// id, name, model, icon, useHint, script function onUse
var niche_pickables_array1 = [[4,"Scroll","models/scroll.js", "media/scrolly.png", "", "script_showScroll_lvl2_msg"]];
var niche_pickables_array2 = [];
var niche_pickables_array3 = [];
var niche_pickables_array4 = [];


//x,z,rot,content, script, open, wallcover, script func niche_onItemAdd
var nicheArr = [[3,5,1,niche_pickables_array1], [20,11,0,niche_pickables_array2, 1, 0, niche_onItemAdd], [20,11,3,niche_pickables_array3, 1, 0, niche_onItemAdd], [20,11,2,niche_pickables_array4, 1, 0, niche_onItemAdd]]; 

NICHES_CLOSED = 0;

function niche_onItemAdd (nicheID, itemID)
{
	console.log("item added to niche...");
	
	//change state to closed
	nicheArr[nicheID][4] = 0;
	
	//draw wall over niche
	var map = THREE.ImageUtils.loadTexture( wall_texture_file );
	map.wrapS = map.wrapT = THREE.RepeatWrapping;
	map.anisotropy = 16;
	var material = new THREE.MeshLambertMaterial( { ambient: 0xbbbbbb, map: map, side: THREE.DoubleSide } );	
	nicheArr[nicheID][5] = new THREE.Mesh( new THREE.PlaneGeometry( SQUARE_SIZE, 0.8*SQUARE_SIZE, 10, 10 ), material );
	nicheArr[nicheID][5].rotation.set(0, Math.PI/2, 0);
	//nicheArr[nicheID][5].receiveShadow = true;
	nicheArr[nicheID][5].position.y = 0.4*SQUARE_SIZE; //y
	if(nicheArr[nicheID][2] == 1) 
	{
		nicheArr[nicheID][5].position.x = (nicheArr[nicheID][0]-0.5)*SQUARE_SIZE+0.2; //x
		nicheArr[nicheID][5].position.z = (nicheArr[nicheID][1])*SQUARE_SIZE; //z
		nicheArr[nicheID][5].rotation.set(0, Math.PI/2, 0);
	}
	if(nicheArr[nicheID][2] == 3) 
	{
		nicheArr[nicheID][5].position.x = (nicheArr[nicheID][0]+0.5)*SQUARE_SIZE-0.3; //x
		nicheArr[nicheID][5].position.z = (nicheArr[nicheID][1])*SQUARE_SIZE; //z
		nicheArr[nicheID][5].rotation.set(0, -Math.PI/2, 0);
	}
	if(nicheArr[nicheID][2] == 0) 
	{
		nicheArr[nicheID][5].position.x = (nicheArr[nicheID][0])*SQUARE_SIZE; //x
		nicheArr[nicheID][5].position.z = (nicheArr[nicheID][1]+0.5)*SQUARE_SIZE-0.2; //z
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
		//play win sound
		audio_win2.play();
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////



//this is pickables
///////////////////////////////////////////////////

// id, name, model, x, z, icon, useage hint, use script, consumable
var pickables_array = [[2,"Rock","models/rocky.js", 12,2,0, "media/rock.png", "This is too hard to chew.."], [3,"Healing Potion","models/healing.js", 9,0,0, "media/potion.png", "Healing potion replenishes 15 hp!", "script_healingScript", 1]];
////////////////////////////////////////////////


//teleports

var teleport_array = [[18,11]];

var teleport_pos_x = 180; //position on map
var teleport_pos_z = 110; //position on map

function teleportGo()
{
	//pause game
	m_GamePaused = true;
	//show final register/feedback level complete screen!
	displayLevelCompleteDialog();
}
