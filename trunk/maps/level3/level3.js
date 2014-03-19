
function onLoad()
{
	//info_dialog_div.style.display = "inline";
	//loading_div.style.display = "none";
	
	show_message(" <br> " + "You wake up." + " <br><br><br><br> <button id='info_dialog_button' style='cursor: pointer; width:134px; height: 34px; background: #00c url(media/button_light.png); background-size: 100% 100%;' onclick='hide_message();'> Ok </button>", 600, 300, "url(media/pannel_small.png)", "Copperplate, 'Copperplate Gothic Light', Garamond, Baskerville", "#ddddd0", "400", "20px");
	playerHPcurrent = 10;
	updatePlayerHealthBar();
	current_position = new THREE.Vector3(10,0,3); //16,0,12
	camera.position.x = 100;
	camera.position.y = 4;
	camera.position.z = 25; //115
	camera.look = new THREE.Vector3(100,4,35); //160,4,125
	camera.lookAt(camera.look);
	pointLight.position.set( 100, 4, 30 );
}

var levelNumber = 3;
var totalModels = 224;

// map arrays..
//var floorsArr2D = [[16,7], [16,8], [15,8], [14,8], [13,8], [12,8], [11,8], [10,8], [9,8], [8,8], [17,8], [18,8], [19,8], [19,7], [19,6], [18,6], [19,5], [19,4], [18,4], [19,3], [19,2], [18,2], [19,1], [16,6], [16,5], [16,4], [16,3], [16,2], [16,1], [17,2], [15,4], [15,6], [13,7], [13,6], [12,6], [13,5], [13,4], [12,4], [13,3], [13,2], [12,2], [13,1], [10,7], [10,6], [9,6], [10,5], [10,4], [9,4], [10,3], [10,2], [9,2], [10,1], [19,9], [19,10], [18,10],[19,11], [19,12], [18,12], [19,13], [19,14], [18,14], [19,15], [19,16], [18,16], [16,9], [16,10], [15,10],[16,11], [16,12], [15,12], [16,13], [16,14], [15,14], [16,15], [16,16], [15,16], [13,9], [13,10], [12,10],[13,11], [13,12], [12,12], [13,13], [13,14], [12,14], [13,15], [13,16], [12,16], [10,9], [10,10]];
var floorsArr2D = [[15,18], [14,18], [16,17], [15,17], [14,17], [16,16], [17,15], [16,15], [14,15], [13,15], [17,14], [14,14], [11,14], [17,13], [16,13], [14,13], [11,13], [9,13], [8,13], [16,12], [15,12], [14,12], [11,12], [10,12], [9,12], [5,12], [14,11], [9,11], [5,11], [3,11], [2,11], [1,11], [15,10], [14,10], [13,10], [12,10], [10,10], [9,10], [8,10], [5,10], [4,10], [3,10], [2,10], [1,10], [15,9], [12,9], [8,9], [5,9], [3,9], [2,9], [1,9], [13,8], [12,8], [11,8], [10,8], [8,8], [7,8], [6,8], [5,8], [13,7], [10,7], [9,7], [8,7], [5,7], [14,6], [13,6], [10,6], [13,5], [11,5], [10,5], [13,4], [10,4], [10,3], [9,3]];
var holesArr = [];
var holesAboveArr = [[15,0]];
var writtingsArr = [[10,10,1,"Punishment for killing a worm is work in the kitchen!",0]];
var secretWallsArr = []; //x,y,orientation
var doorsArr3D = [[16,3,0,0,0,0,1,7]]; //x,z,rot,open,mesh,animate flag,openable on click,open animation  0-slide/up/down 1-slide/down/up 2-slide/right/left 3-slide/left/right 4-rotatec/left/right 5-rotatec/right/left 6-rotateo/left/right 7-rotateo/right/left 8-rotateo/top/down 9-rotateo/down/up
var stairsArr = [[10,11,0,"maps/level3/models/slope.js",0,"level4"]];

//basic level textures
var floor_texture_file = 'maps/level3/models/dirtpath.png';
var wall_texture_file = 'maps/level3/media/wall.png';
var ceiling_texture_file = 'maps/level3/models/dirt.png';

var curved_walls = true;
var suporter_model = "models/suporter.js";
var curved_ceiling = false;
var wall_model = 'maps/level3/models/wallc.js';
var wall_model_curve_left = 'maps/level3/models/wallcl.js';
var wall_model_curve_right = 'maps/level3/models/wallcr.js';
var wall_model_durve_lr = 'maps/level3/models/walldlr.js';
var wall_model_durve_l = 'maps/level3/models/walldl.js';
var wall_model_durve_r = 'maps/level3/models/walldr.js';
var celing_model_fb = 'maps/level3/models/ceiling.js';
var wall_model_curve_writ = 'maps/level3/models/wallcwrit.js';
//var decorPillarModel = "maps/level3/models/decorPillar2.js";

//basic level models
var hole_above_model = 'maps/level3/models/hole_above.js';
var niche_model = 'maps/level3/models/nichecc.js';
var doorway_model = 'maps/level3/models/doorway.js';
var door_model = 'maps/level3/models/door.js';
var door_audio = 'media/creak.mp3';

//level related values
var ambient_music_file = 'maps/level3/media/wormhole.mp3';


function propOnClick1()
{
	DisplayInfoDiv("I was lucky to avoid these spikes!");
	show_speech_bubble("I was lucky to avoid serious injuries falling on these spikes.. <br><br> &nbsp; .. and Im pretty sure I went unconscious when I hit the ground, but why am I in my underwear? ", 600, 150, 0, "url(media/speech_bubble.png)", "Garamond, Baskerville", "#dddd70", "400", "22px");
}

function propOnClick2()
{
	DisplayInfoDiv("Many have died on these traps..");
}

function propOnClick3()
{
	DisplayInfoDiv("I cant climb up there..");
}

function propOnClick4()
{
	DisplayInfoDiv("Sharp sticks..");
}

//props x,z,model,onClick script
var propsArr = [[111,15,0,"models/spears.js",propOnClick1]];

// id, name, model, x, z, orientation, mesh
var containers_array = [];

// id, model, x, z, pressed, script functions..
var plates_array = [];

var pillar_array = [];

var nicheArr = [];
var tapestries_array = [];

//buttons
var buttons_array = [];

//keyholes
var keyholes_array = [];

function rootHealingScript()
{
	playerHPcurrent += 15;
	if (playerHPcurrent > playerHPmax)
	{
		playerHPcurrent = playerHPmax;
	}
	updatePlayerHealthBar();
}

// id, name, model, x, z, icon, useage hint, use script, consumable
var pickables_array = [[2,"Root","maps/level3/models/root.js", 10.5,4.5,6, "media/root.png", "This acctually heals my wounds..", rootHealingScript, 1], [3,"Stake","models/stake.js", 9,3,0, "media/stake.png", "Pointy stick, better then nothing.", 0, 0, 4, 4, 0, 0], [4,"Root","maps/level3/models/root.js", 10.5,6,6, "media/root.png", "Hard to chew but pays off..", rootHealingScript, 1]];
////////////////////////////////////////////////

var wormPickables = [];
function WormOnClick1()
{
	DisplayInfoDiv("Its squishy and slimy.");
	//Play tounchy sound
	this.audio_monster_click.play();
}
function WormOnItemClick1()
{
	DisplayInfoDiv("He doesn't need that.");
	//Play tounchy sound
	this.audio_monster_click.play();
}
var IDLE_ANIM_DURATION = 3300;
var MONSTER_ATTACK_FRAME = 40;
var monster_array = [[2,"Giant Worm","maps/level3/models/worm.js", 15,18,2, 20, 15, 10, 5, wormPickables, WormOnClick1, WormOnItemClick1,1,24,25,49,50,74,1,"maps/level3/media/worm_wound.mp3","maps/level3/media/worm_death.mp3","maps/level3/media/worm_roar.mp3","maps/level3/media/worm_attack.mp3","maps/level3/media/worm_click.mp3"], [12,"Giant Worm","maps/level3/models/worm.js", 6,8,2, 20, 15, 10, 5, wormPickables, WormOnClick1, WormOnItemClick1,1,24,25,49,50,74,1,"maps/level3/media/worm_wound.mp3","maps/level3/media/worm_death.mp3","maps/level3/media/worm_roar.mp3","maps/level3/media/worm_attack.mp3","maps/level3/media/worm_click.mp3"]];

function showScroll()
{
	console.log("Showing scroll content!");
	audio_scroll.play();
	show_message(" <br> " + "Section C3" + " <br><br><img src='maps/level3/media/map3.png'><br> <button id='info_dialog_button' style='cursor: pointer; width:134px; height: 34px; background: #00c url(media/button_scroll.png); background-size: 100% 100%;' onclick='hide_message();'> Ok </button>", 700, 700, "url(media/scroll.png)", "Papyrus, Garamond, Baskerville", "#001100", "800", "20px");
}

// id, name, model, icon, useHint, script function onUse
var niche_pickables_array1 = [[3,"Scroll","models/scroll.js", "media/scrolly.png", "", showScroll]];
var niche_item_offset = new THREE.Vector3(-1, -0.5, 0); //deeper, lower, sider
//x,z,rot,content, script, open, wallcover, script func niche_onItemAdd
var nicheArr = [[10,10,3,niche_pickables_array1]]; 


var teleport_array = [];

var point_light_color = 0xffffaa;
var point_light_intensity = 1.5;
fog_color = 0x111100;
fog_intensity = 0.008525;

function load_level_lights()
{

	//pointLight.color = 0xffff10; //not working?
	
	//spotLight = new THREE.SpotLight();
	//spotLight.position.set( 150, 24, 0 );
	//spotLight.target.position.set( 150, 0, 0 );
	//pointLight.castShadow = true;
	//scene.add( spotLight );

	var spotLight = new THREE.SpotLight();
	spotLight.position.set( 150, 24, 0 );
	spotLight.target.position.set( 150, 0, 0 );
	//pointLight.castShadow = true;
	scene.add( spotLight );

	console.log("pera spot");
	//spotLight = new THREE.SpotLight();
	//spotLight.position.set( 180, 24, 20 );
	//spotLight.target.position.set( 180, 0, 20 );
	//pointLight.castShadow = true;
	//scene.add( spotLight );
}
