
function onLoad()
{
	//info_dialog_div.style.display = "inline";
	loading_div.style.display = "none";
}

var levelNumber = 3;

// map arrays..
var floorsArr2D = [[16,7], [16,6], [16,5], [16,4], [16,3], [16,2], [16,1], [16,0], [16,-1], [15,0], [15,2], [15,4], [15,6]];
var holesArr = [];
var holesAboveArr = [[15,0], [15,2], [15,4], [15,6]];
var writtingsArr = [];
var secretWallsArr = []; //x,y,orientation
var doorsArr3D = [];

//basic level textures
var floor_texture_file = 'maps/level3/media/floor.png';
var wall_texture_file = 'maps/level3/media/wall.png';
var ceiling_texture_file = 'maps/level3/media/ceiling.png';

var wall_model = 'maps/level3/models/wallc.js';
//var decorPillarModel = "maps/level3/models/decorPillar2.js";

//basic level models
var hole_above_model = 'maps/level3/models/hole_above.js';
//var niche_model = 'maps/level1/models/niche.js';
//var doorway_model = 'maps/level1/models/doorway.js';
//var door_model = 'maps/level1/models/door.js';

//level related values
fog_color = 0x999955;
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
var propsArr = [[111,15,0,"models/spears.js",propOnClick1], [112,15,2,"models/spears.js", propOnClick2], [113,15,4,"models/spears.js", propOnClick3], [114,15,6,"models/spears.js", propOnClick4]];

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
var pickables_array = [[2,"Rock","models/rocky.js", 16,0, "media/rock.png", "This is too hard to chew.."]];
////////////////////////////////////////////////

var monster_array = [];

var teleport_array = [];

