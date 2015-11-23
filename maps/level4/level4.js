
function getLevel()
{
	var level = new Level();
	
	level.levelNumber = 4;
	level.totalModels = 12;
	level.curved_walls = true;
	level.curved_ceiling = false;
	
	level.floorsArr2D = [[15,18], [14,18], [16,17], [15,17], [14,17], [16,16], [17,15], [16,15], [14,15], [13,15], [17,14], [14,14], [11,14], [17,13], [16,13], [14,13], [11,13], [9,13], [8,13], [16,12], [15,12], [14,12], [11,12], [10,12], [9,12], [5,12], [14,11], [9,11], [5,11], [3,11], [2,11], [1,11], [15,10], [14,10], [13,10], [12,10], [10,10], [9,10], [8,10], [5,10], [4,10], [3,10], [2,10], [1,10], [15,9], [12,9], [8,9], [5,9], [3,9], [2,9], [1,9], [13,8], [12,8], [11,8], [10,8], [8,8], [7,8], [6,8], [5,8], [13,7], [10,7], [9,7], [8,7], [5,7], [14,6], [13,6], [10,6], [13,5], [11,5], [10,5], [13,4], [13,3], [14,3], [10,4], [10,3], [9,3]];
	level.holesArr = [];
	level.holesAboveArr = [];
	level.writtingsArr = [];
	level.secretWallsArr = [];
	level.doorsArr3D = [];
	level.stairsArr = [];
	
	//basic level textures
	level.floor_texture_file = 'maps/level3/models/dirtpath.png';
	level.wall_texture_file = 'maps/level3/media/wall.png';
	level.ceiling_texture_file = 'maps/level3/models/dirt.png';
		
	//basic level models
	level.wall_model = 'maps/level3/models/wallc.js';
	level.wall_model_curve_left = 'maps/level3/models/wallcl.js';
	level.wall_model_curve_right = 'maps/level3/models/wallcr.js';
	level.wall_model_durve_lr = 'maps/level3/models/walldlr.js';
	level.wall_model_durve_l = 'maps/level3/models/walldl.js';
	level.wall_model_durve_r = 'maps/level3/models/walldr.js';
	level.wall_model_curve_durve_right_left = 'maps/level3/models/wallcdrl.js';
	level.wall_model_curve_durve_left_right = 'maps/level3/models/wallcdlr.js';
	level.celing_model_fb = 'maps/level3/models/ceiling.js';
	level.wall_model_curve_writ = 'maps/level3/models/wallcwrit.js';
	level.suporter_model = "models/suporter.js";
	level.decorPillarModel = "none";
	level.hole_above_model = 'maps/level3/models/hole_above.js';
	level.niche_model = 'maps/level3/models/nichecc.js';
	level.doorway_model = 'maps/level3/models/doorway.js';
	level.door_model = 'maps/level3/models/door.js';

	//level audio
	level.ambient_music_file = 'maps/level3/media/wormhole.mp3';
	level.door_audio = 'media/creak.mp3';

	//props: x,z,model,onClick script
	level.propsArr = [];
	//animated props: x,z,model,onClick script
	level.animatedPropsArr = [];
	//containers: id, name, model, x, z, orientation, mesh
	level.containers_array = [];
	//plates: id, model, x, z, pressed, script functions..
	level.plates_array = [];
	//pillars
	level.pillar_array = [];
	//niches
	level.nicheArr = [];
	//tapestries
	level.tapestries_array = [];
	//buttons
	level.buttons_array = [];
	//keyholes
	level.keyholes_array = [];
	//pickables: id, name, model, x, z, icon, useage hint, use script, consumable
	level.pickables_array = [];

	level.monster_array = [];
	
	level.teleport_array = [];
	
	//TODO level should have array of its light, these are loaded and released on enter/exit
	//elements of this array should be together point and spot lights, and other types..
	level.lights = [];
	
	level.point_light_color = 0xffffaa;
	level.point_light_intensity = 0.9;
	level.fog_color = 0x111100;
	level.fog_intensity = 0.008525;
}


Level = function ( ) {

	// API
	this.gameID = 99;

	this.levelNumber = 4;
	this.totalModels = 22; //on clean level

	
};



