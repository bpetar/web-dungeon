
// map arrays..
var floorsArr2D = [[16,0], [16,1], [16,2], [16,3], [16,4]];
var secretWallsArr = [[6,2,3]]; //x,y,orientation
var doorsArr3D = [[16,3,0,0,0,0]]; //x,z,rot,open,mesh,openable on click
var holesArr = [];
var writtingsArr = [[16,1,1,"Put some weight.."]]; 

//basic level textures
var floor_texture_file = 'maps/level2/media/floor_11_1.png';
var wall_texture_file = 'maps/level2/media/stone_wall_01_01.png';
var ceiling_texture_file = 'maps/level2/media/ceiling.png';
var teleport_floor_texture_file = 'maps/level2/media/teleport_floor.png';
var wall_writting_texture_file = 'maps/level2/media/wallwrit.png';

//basic level models
var hole_model = 'maps/level2/models/hole.js';
var niche_model = 'maps/level2/models/niche.js';
var doorway_model = 'maps/level2/models/doorway.js';
var door_model = 'models/door.js';

//level related values
fog_color = 0x555599;
fog_intensity = 0.009525;

// id, name, model, x, z, icon
var tapestries_array = [["models/tapestry1.js", 16,0,2]];

// id, name, model, icon, slot
//var container_pickables_array1 = [[1,"ring","models/ring.js", "media/ring.png", 1, 0]];// id, name, model, icon, slot, picki
// id, name, model, x, z, orientation
var containers_array = [];

//monster inventory items: id, name, model, icon, picki
//var monster_pickables_array = [[5,"rock","models/rocky.js", "media/rock.png", 0], [6,"rock","models/rocky.js", "media/rock.png", 0]];
// id, name, model, x, z, rot, hp, ac, attack
var monster_array = [];

// id, model, x, z, pressed, script functions..
var plates_array = [[1, "models/plynth.js", 16,1,0,onPressPlate1,onUnpressPlate1]];

var pillar_array = [[2, "models/pillar.js", 15,2]];
	
//niches and their content
///////////////////////////////////////////////////////////////////////////////////////////////

function onPressPlate1()
{
	console.log("plate to open door");
	
	doorsArr3D[0][5] = 1; //animate flag
	doorsArr3D[0][3] = 1; // open/close flag
}

function onUnpressPlate1()
{
	console.log("plate to close door");
	doorsArr3D[0][5] = 1; //animate flag
	doorsArr3D[0][3] = 0; // open/close flag
}


function showScroll()
{
	console.log("Showing scroll content!");
	show_message(" <br> " + "The world built on dreams reaches for the dreams built in this world. Are you in a dream?" + " <br><br> <button onclick='hide_message();'> Ok </button>", 600, 300);
}

// id, name, model, icon
var niche_pickables_array1 = [[4,"scroll","models/scroll.js", "media/scrolly.png", "Player reads the scroll", showScroll]];
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
	var map = THREE.ImageUtils.loadTexture( 'media/wall.jpg' );
	map.wrapS = map.wrapT = THREE.RepeatWrapping;
	map.anisotropy = 16;
	var material = new THREE.MeshLambertMaterial( { ambient: 0xbbbbbb, map: map, side: THREE.DoubleSide } );	
	nicheArr[nicheID][5] = new THREE.Mesh( new THREE.PlaneGeometry( SQUARE_SIZE, 0.8*SQUARE_SIZE, 1, 1 ), material );
	nicheArr[nicheID][5].rotation.set(0, Math.PI/2, 0);
	nicheArr[nicheID][5].receiveShadow = true;
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
}

// id, name, model, x, z, icon, useage hint, use script, consumable
var pickables_array = [[2,"rock","models/rocky.js", 16,0, "media/rock.png", "This is too hard to chew.."]];
////////////////////////////////////////////////
