//monster.js
//monster class, attributes and methods

// id, name, model, x, z, rot, hp, ac, attack
var monster_array = [[2,"rock_golem","models/golem.js", 6,2,0, 90, 35, 20], [2,"rock_golem_no2","models/golem.js", 4,2,1, 80, 35, 20]];

//lively moved and modified (populated from save file and should be saved to save file)
var array_of_monsters = [];


//monster class declaration
Monster = function ( ) {

	// API
	this.gameID = 99;
	this.name = "unnamed";
	this.model = "models/golem.js";
	this.mesh = 0;
	this.geometry = 0;
	this.material = 0;
	this.hp = 100; // milliseconds
	this.ac = 40;
	this.attack = 30;
	this.idle_startKeyframe = 0;
	this.idle_endKeyframe = 90;
	this.attack_startKeyframe = 90;
	this.attack_endKeyframe = 140;
	this.walk_startKeyframe = 140;
	this.walk_endKeyframe = 180;
	this.position = new THREE.Vector3(40, 0, 10);
	this.rotation = new THREE.Vector3(0, Math.PI, 0);
};

//Monster.prototype = Object.create(  );

Monster.prototype.damage = function ( dmg ) {

	this.hp -= dmg;

};

Monster.prototype.loadObject = function ( ) {

	return function (geometry, materials ) {

		morphColorsToFaceColors( geometry );
		geometry.computeMorphNormals();
		materials[ 0 ].morphTargets = true;
		materials[ 0 ].morphNormals = true;
		materials[ 1 ].morphTargets = true;
		this.mesh = new THREE.MorphAnimMesh( geometry, new THREE.MeshFaceMaterial( materials ) );
		this.mesh.position = this.position;
		this.mesh.rotation = this.rotation;
		this.mesh.name = this.name;
		this.id = this.mesh.id;
		this.mesh.visible = this.visible;
		this.mesh.duration = 5000;
		this.mesh.setFrameRange(140,179);
		this.mesh.scale.set( 1.2, 1.2, 1.2 );
		
		scene.add( this.mesh );
		
	}

};

//load monsters on the map
function load_monsters () {

	var loader = new THREE.JSONLoader();
	
	for(var i=0; i<monster_array.length; i++) {
		var munster = new Monster();
		munster.gameID = monster_array[i][0];
		munster.name = monster_array[i][1];
		munster.model = monster_array[i][2];
		munster.position.x = monster_array[i][3]*SQUARE_SIZE+2;
		munster.position.z = monster_array[i][4]*SQUARE_SIZE+4;
		munster.position.y = 0;
		munster.rotation = monster_array[i][5];
		munster.hp = monster_array[i][6];
		munster.ac = monster_array[i][7];
		munster.attack = monster_array[i][8];

		loader.load( munster.model, munster.loadObject() );
		
		array_of_monsters.push(munster);

	}

}
