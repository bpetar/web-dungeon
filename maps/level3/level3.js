
function levelOnLoad()
{
	//info_dialog_div.style.display = "inline";
	//loading_div.style.display = "none";
	
	show_message("(you wake up)" + " <br><br> <div id='info_dialog_button' style='cursor: pointer; margin:auto; padding-top:9px; font-size:14px; width:94px; height: 25px; background: #00c url(media/gui/buttons.png); background-size: 100% 100%;' onclick='hide_message();'> Ok </div>", 600, 200, "url(media/gui/dialog2.png)", "Copperplate, 'Copperplate Gothic Light', Papyrus, Garamond, Baskerville", "#ddddd0", "400", "20px");
	playerHPcurrent = 10;
	updatePlayerHealthBar();
	//current_position = new THREE.Vector3(10,0,3); //16,0,12
	//camera.position.x = current_position.x*10;
	//camera.position.y = 4;
	//camera.position.z = current_position.z*10-5; //115
	//camera.look = new THREE.Vector3(current_position.x*10,4,current_position.z*10+5); //160,4,125
	//camera.lookAt(camera.look);
	pointLight.position.set( current_position.x*10, 4, current_position.z*10 );
}

var levelNumber = 3;
var totalModels = 19;

// map arrays..
var floorsArr2D = [[15,18], [14,18], [16,17], [15,17], [14,17], [16,16], [17,15], [16,15], [14,15], [13,15], [17,14], [14,14], [11,14], [17,13], [16,13], [14,13], [11,13], [9,13], [8,13], [16,12], [15,12], [14,12], [11,12], [10,12], [9,12], [5,12], [14,11], [9,11], [5,11], [3,11], [2,11], [1,11], [15,10], [14,10], [13,10], [12,10], [10,10], [9,10], [8,10], [5,10], [4,10], [3,10], [2,10], [1,10], [15,9], [12,9], [8,9], [5,9], [3,9], [2,9], [1,9], [13,8], [12,8], [11,8], [10,8], [8,8], [7,8], [6,8], [5,8], [13,7], [10,7], [9,7], [8,7], [5,7], [14,6], [13,6], [10,6], [13,5], [11,5], [10,5], [13,4], [10,4], [10,3], [9,3]];
var holesArr = [];
var holesAboveArr = [[9,3], [11,5], [14,6], [15,9], [10,10], [8,13], [13,15], [11,14]];
var writtingsArr = [[5,12,1,"Punishment for killing a worm is work in the kitchen!",0]];
var secretWallsArr = []; //x,y,orientation
var doorsArr3D = [[7,8,1,0,0,0,1,7]]; //x,z,rot,open,mesh,animate flag,openable on click,open animation  0-slide/up/down 1-slide/down/up 2-slide/right/left 3-slide/left/right 4-rotatec/left/right 5-rotatec/right/left 6-rotateo/left/right 7-rotateo/right/left 8-rotateo/top/down 9-rotateo/down/up
var stairsArr = [[5,13,0,"maps/level3/models/slope.js",0,"level4"]];

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
var wall_model_curve_durve_right_left = 'maps/level3/models/wallcdrl.js';
var wall_model_curve_durve_left_right = 'maps/level3/models/wallcdlr.js';
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
	//DisplayInfoDiv("I was lucky to avoid these spikes!");
	show_speech_bubble("&nbsp;I was lucky to stay alive after falling on these spikes from above! <br><br> &nbsp;Few bruises and scratches.. that's all.", 300, 110, 0, "url(media/speech_bubble.png)", "Lucida Console, Baskerville", "#ffffff", "300", "14px");
}

function propOnClick2()
{
	if(Math.random()>0.5)DisplayInfoDiv("Many have died on these traps..");
	else show_speech_bubble("&nbsp;Day light from above and blood on these spikes means someone fell into this trap, but where is the body?", 300, 110, 0, "url(media/speech_bubble.png)", "Lucida Console, Baskerville", "#ffffff", "300", "14px");
}

function propOnClick3()
{
	if(monsterEncountered)
	{
		show_speech_bubble("&nbsp;Its seems like these tunnels are dug out recently by these worms, but.. holes and traps are directly under battlefield, its way too convenient to be accidental.. and why am I in my underwear? ", 300, 110, 0, "url(media/speech_bubble.png)", "Lucida Console, Baskerville", "#dddd70", "300", "14px");	
	}
	else
	{
		DisplayInfoDiv("I cant climb up there..");
	}
}

function propOnClick4()
{
	DisplayInfoDiv("Sharp sticks..");
}

//props x,z,model,onClick script
var propsArr = [[111,9,3,"models/spears.js",propOnClick1], [112,11,5,"models/spears.js",propOnClick4], [113,14,6,"models/spears.js",propOnClick4], [113,15,9,"models/spears_blood.js",propOnClick2], [114,10,10,"models/spears.js",propOnClick4], [114,8,13,"models/spears_blood.js",propOnClick2], [114,13,15,"models/spears.js",propOnClick3], [114,11,14,"models/spears.js",propOnClick4]];

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


// id, name, model, x, z, icon, useage hint, use script, consumable
var pickables_array = [
[2, "Root", "Type: <span style='color:yellow;'>consumable</span><br> (right click to eat)<br><br>Effect: <span style='color:green;'>healing</span>", "maps/level3/models/root.js", 10.5, 4.5, 6, "media/root.png", "media/gui/root.png", "<span style='color:green;'> HP +5. </span> This actually heals my wounds..", "script_rootHealingScript", 1], 
[3, "Stake", "Type: <span style='color:yellow;'>weapon</span><br><br>Speed: <span id='id-item-info-speed' style='color:green;'>0</span><br>Damage: <span id='id-item-info-dmg' style='color:green;'>4</span><br>Attack Bonus: <span id='id-item-info-attack-bonus' style='color:green;'>0</span>", "models/stake.js", 9, 3, 0, "media/stake.png", "media/gui/stake.png", "Pointy stick, better then nothing.", "0", 0, 4, 4, 0, 1], 
[4, "Root", "Type: <span style='color:yellow;'>consumable</span><br> (right click to eat)<br><br>Effect: <span style='color:green;'>healing</span>", "maps/level3/models/root.js", 10.5, 6, 6, "media/root.png", "media/gui/root.png", "<span style='color:green;'> HP +5. </span> Hard to chew but pays off..", "script_rootHealingScript", 1],
[5, "Ground Rock", "Type: <span style='color:yellow;'>dead weight</span>", "maps/level3/models/dirt_rock.js", 10, 6, 0, "media/ground_rock.png", "media/gui/ground_rock_icon.png", "<span style='color:green;'> Nothing to do with this </span>", "0", 1]];
////////////////////////////////////////////////

var monsterEncountered = false;

var wormPickables = [];
function WormOnClick1()
{
	DisplayInfoDiv("Its squishy and slimy.");
	monsterEncountered = true;
	//Play tounchy sound
	this.audio_monster_click.play();
}
function WormOnItemClick1()
{
	DisplayInfoDiv("He doesn't need that.");
	//Play tounchy sound
	this.audio_monster_click.play();
}

var punIntended = false;
function monsterPun()
{
	if(!punIntended)
	{
		show_speech_bubble("&nbsp;This was nice <span style='font-style: italic;'>worm</span> up :)", 300, 110, 0, "url(media/speech_bubble.png)", "Lucida Console, Baskerville", "#ffffff", "300", "14px");	
		punIntended = true;
	}
}

var IDLE_ANIM_DURATION = 3300;
var MONSTER_ATTACK_FRAME = 40;
var monster_array = [[2,"Giant Worm","maps/level3/models/worm.js", 15,18,2, 20, 15, 10, 5, wormPickables, WormOnClick1, WormOnItemClick1,1,24,25,49,50,74,1,"maps/level3/media/worm_wound.mp3","maps/level3/media/worm_death.mp3","maps/level3/media/worm_roar.mp3","maps/level3/media/worm_attack.mp3","maps/level3/media/worm_click.mp3"], [12,"Giant Worm","maps/level3/models/worm.js", 11,14,2, 20, 15, 10, 5, wormPickables, WormOnClick1, WormOnItemClick1,1,24,25,49,50,74,1,"maps/level3/media/worm_wound.mp3","maps/level3/media/worm_death.mp3","maps/level3/media/worm_roar.mp3","maps/level3/media/worm_attack.mp3","maps/level3/media/worm_click.mp3"]];


// id, name, model, icon, useHint, script function onUse
var niche_pickables_array1 = [[3,"Scroll","Desc", "models/scroll.js", "media/scrolly.png", "media/gui/scroll.png", "A map! Oh now I see.. wait where am I?", "script_showScroll_lvl3_map"]];
var niche_item_offset = new THREE.Vector3(-1, -0.5, 0); //deeper, lower, sider
//x,z,rot,content, script, open, wallcover, script func niche_onItemAdd
var nicheArr = [[5, 8, 1, niche_pickables_array1]];

 




var teleport_array = [];

var point_light_color = 0xffffaa;
var point_light_intensity = 0.9;
fog_color = 0x111100;
fog_intensity = 0.008525;

function load_level_lights()
{

	var spotLight = new THREE.SpotLight();
	spotLight.position.set( 90, 54, 30 );
	spotLight.target.position.set( 90, 0, 30 );
	//pointLight.castShadow = true;
	scene.add( spotLight );

	var spotLight2 = spotLight.clone();
	spotLight.position.set( 80, 54, 130 );
	spotLight.target.position.set( 80, 0, 130 );
	//pointLight.castShadow = true;
	scene.add( spotLight2 );

	var spotLight3 = spotLight.clone();
	spotLight.position.set( 150, 34, 90 );
	spotLight.target.position.set( 150, 0, 90 );
	//pointLight.castShadow = true;
	scene.add( spotLight3 );

}
