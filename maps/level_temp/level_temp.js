
function onLoad()
{
	//info_dialog_div.style.display = "inline";
	loading_div.style.display = "none";
}

var levelNumber = 3;

// map arrays..
var floorsArr2D = [[16,5], [16,4], [16,3], [16,2], [16,1], [16,0], [15,0]];
var holesArr = [];
var writtingsArr = []; 
var secretWallsArr = []; //x,y,orientation
var doorsArr3D = [];

//basic level textures
var floor_texture_file = 'maps/level3/media/floor.png';
var wall_texture_file = 'maps/level3/media/wall.png';
var ceiling_texture_file = 'maps/level3/media/ceiling.png';

//basic level models
//var hole_model = 'maps/level1/models/hole.js';
//var niche_model = 'maps/level1/models/niche.js';
//var doorway_model = 'maps/level1/models/doorway.js';
//var door_model = 'maps/level1/models/door.js';

//level related values
fog_color = 0x555599;
fog_intensity = 0.009525;

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

