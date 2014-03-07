
function onLoad()
{
	//info_dialog_div.style.display = "inline";
	loading_div.style.display = "none";
}

var levelNumber = 3;
var totalModels = 224;

// map arrays..
var floorsArr2D = [[16,7], [16,8], [15,8], [14,8], [13,8], [12,8], [11,8], [10,8], [9,8], [8,8], [17,8], [18,8], [19,8], [20,8], [19,7], [19,6], [18,6], [19,5], [19,4], [18,4], [19,3], [19,2], [18,2], [19,1], [19,0], [18,0], [16,6], [16,5], [16,4], [16,3], [16,2], [16,1], [16,0], [15,0], [15,2], [15,4], [15,6], [13,7], [13,6], [12,6], [13,5], [13,4], [12,4], [13,3], [13,2], [12,2], [13,1], [13,0], [12,0], [10,7], [10,6], [9,6], [10,5], [10,4], [9,4], [10,3], [10,2], [9,2], [10,1], [10,0], [9,0], [19,9], [19,10], [18,10],[19,11], [19,12], [18,12], [19,13], [19,14], [18,14], [19,15], [19,16], [18,16], [16,9], [16,10], [15,10],[16,11], [16,12], [15,12], [16,13], [16,14], [15,14], [16,15], [16,16], [15,16], [13,9], [13,10], [12,10],[13,11], [13,12], [12,12], [13,13], [13,14], [12,14], [13,15], [13,16], [12,16], [10,9], [10,10], [9,10],[10,11], [10,12], [9,12], [10,13], [10,14], [9,14], [10,15], [10,16], [9,16]];
var holesArr = [];
var holesAboveArr = [[15,0], [15,2], [15,4], [15,6], [12,0], [12,2], [12,4], [12,6], [9,0], [9,2], [9,4], [9,6], [18,0], [18,2], [18,4], [18,6], [15,10], [15,12], [15,14], [15,16], [12,10], [12,12], [12,14], [12,16], [9,10], [9,12], [9,14], [9,16], [18,10], [18,12], [18,14], [18,16]];
var writtingsArr = [];
var secretWallsArr = []; //x,y,orientation
var doorsArr3D = [[16,3,0,0,0,0,1,7]]; //x,z,rot,open,mesh,animate flag,openable on click,open animation  0-slide/up/down 1-slide/down/up 2-slide/right/left 3-slide/left/right 4-rotatec/left/right 5-rotatec/right/left 6-rotateo/left/right 7-rotateo/right/left 8-rotateo/top/down 9-rotateo/down/up

//basic level textures
var floor_texture_file = 'maps/level3/media/floor.png';
var wall_texture_file = 'maps/level3/media/wall.png';
var ceiling_texture_file = 'maps/level3/models/dirt.png';

var curved_walls = true;
var curved_ceiling = false;
var wall_model = 'maps/level3/models/wallc.js';
var wall_model_curve_left = 'maps/level3/models/wallcl.js';
var wall_model_curve_right = 'maps/level3/models/wallcr.js';
var wall_model_durve_lr = 'maps/level3/models/walldlr.js';
var wall_model_durve_l = 'maps/level3/models/walldl.js';
var wall_model_durve_r = 'maps/level3/models/walldr.js';
var celing_model_fb = 'maps/level3/models/ceiling.js';
//var decorPillarModel = "maps/level3/models/decorPillar2.js";

//basic level models
var hole_above_model = 'maps/level3/models/hole_above.js';
//var niche_model = 'maps/level1/models/niche.js';
var doorway_model = 'maps/level1/models/doorway.js';
var door_model = 'maps/level1/models/door.js';

//level related values
fog_color = 0x111100;
fog_intensity = 0.009525;
var ambient_music_file = 'maps/level3/media/wormhole.mp3';


function propOnClick1()
{
	DisplayInfoDiv("I was lucky to avoid these spikes!");
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
var propsArr = [[123,18,6,"models/spears.js",propOnClick4], [124,18,4,"models/spears.js",propOnClick4], [125,18,2,"models/spears.js",propOnClick4], [126,18,0,"models/spears.js",propOnClick4], [127,18,10,"models/spears.js",propOnClick4], [128,18,12,"models/spears.js",propOnClick4], [129,18,14,"models/spears.js",propOnClick4], [130,18,16,"models/spears.js",propOnClick4], [131,15,10,"models/spears.js",propOnClick4], [132,15,12,"models/spears.js",propOnClick4], [133,15,14,"models/spears.js",propOnClick4], [134,15,16,"models/spears.js",propOnClick4], [135,12,10,"models/spears.js",propOnClick4], [136,12,12,"models/spears.js",propOnClick4], [137,12,14,"models/spears.js",propOnClick4], [138,12,16,"models/spears.js",propOnClick4], [139,9,10,"models/spears.js",propOnClick4], [140,9,12,"models/spears.js",propOnClick4], [141,9,14,"models/spears.js",propOnClick4], [142,9,16,"models/spears.js",propOnClick4], [111,15,0,"models/spears.js",propOnClick1], [112,15,2,"models/spears.js", propOnClick2], [113,15,4,"models/spears.js", propOnClick3], [114,15,6,"models/spears.js", propOnClick4], [115,12,6,"models/spears.js",propOnClick4], [116,12,4,"models/spears.js",propOnClick4], [117,12,2,"models/spears.js",propOnClick4], [118,12,0,"models/spears.js",propOnClick4], [119,9,6,"models/spears.js",propOnClick4], [120,9,4,"models/spears.js",propOnClick4], [121,9,2,"models/spears.js",propOnClick4], [122,9,0,"models/spears.js",propOnClick4]];

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
var pickables_array = [[2,"Root","models/rocky.js", 16.5,4.5,7, "media/rock.png", "Still not that hungry.."], [3,"Stake","models/stake.js", 15,0,0, "media/stake.png", "Pointy stick, better then nothing.", 0, 0, 4, 4, 0, 0], [4,"Root","models/rocky.js", 20.6,8,7, "media/rock.png", "Still not that hungry.."]];
////////////////////////////////////////////////

var wormPickables = [];
function WormOnClick1()
{
}
function WormOnItemClick1()
{
}
var IDLE_ANIM_DURATION = 3300;
var MONSTER_ATTACK_FRAME = 40;
var monster_array = [[2,"Giant Worm","maps/level3/models/worm.js", 16,16,2, 100, 35, 20, 30, wormPickables, WormOnClick1, WormOnItemClick1,1,25,25,50,50,75,1,"maps/level3/media/worm_wound.mp3","maps/level3/media/worm_death.mp3","maps/level3/media/worm_roar.mp3","maps/level3/media/worm_attack.mp3","maps/level3/media/worm_click.mp3"]];

var teleport_array = [];

