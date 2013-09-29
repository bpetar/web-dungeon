//monster.js
//monster class, attributes and methods

// id, name, model, x, z, rot, hp, ac, attack
var monster_array = [[2,"rock_golem","models/golem.js", 4,2,2, 90, 35, 20]];

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
	this.position = new THREE.Vector3(40, 0, 20);
	this.rotation = new THREE.Vector3(0, Math.PI, 0);
	this.visible = true;
	this.target = new THREE.Vector3(0, 0, 0);
	
	this.should_move = false;
	this.should_turn = false;
	
};

//Monster.prototype = Object.create(  );

Monster.prototype.damage = function ( dmg ) {

	this.hp -= dmg;

};

//find player
Monster.prototype.find_player = function ( ) {

	this.target = new THREE.Vector3(40, 0, 0);
	this.should_move = true;
	return false;

};

//move monster by small amount and chek if it reached destination
Monster.prototype.move = function ( delta ) {

	if(this.should_move)
	{
		//move monster toward target position
		if(this.target.z>this.mesh.position.z)
		{
			this.mesh.position.z += delta;
			if(this.target.z>this.mesh.position.z)
			{
				this.should_move = false;
			}
		}
		else if(this.target.z<this.mesh.position.z)
		{
			this.mesh.position.z -= delta;
			if(this.target.z>this.mesh.position.z)
			{
				this.should_move = false;
			}
		}
		
	}
	
	if(this.should_turn)
	{
		//rotate monster toward target rotation
	}

};

Monster.prototype.loadObject = function ( munster ) {

	return function (geometry, materials ) {

		morphColorsToFaceColors( geometry );
		geometry.computeMorphNormals();
		materials[ 0 ].morphTargets = true;
		materials[ 0 ].morphNormals = true;
		materials[ 1 ].morphTargets = true;
		munster.mesh = new THREE.MorphAnimMesh( geometry, new THREE.MeshFaceMaterial( materials ) );
		munster.mesh.position = munster.position;
		var rot = new THREE.Vector3(0, munster.rotation*Math.PI/2, 0);
		munster.mesh.rotation = rot;
		munster.mesh.name = munster.name;
		munster.id = munster.mesh.id;
		munster.mesh.visible = munster.visible;
		munster.mesh.duration = 5000;
		munster.mesh.setFrameRange(140,179);
		munster.mesh.scale.set( 1.2, 1.2, 1.2 );
		console.log("adding monstere " + munster.mesh.name);
		scene.add( munster.mesh );
		
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
		munster.position.x = monster_array[i][3]*SQUARE_SIZE;
		munster.position.z = monster_array[i][4]*SQUARE_SIZE;
		munster.position.y = 0;
		munster.rotation = monster_array[i][5];
		munster.hp = monster_array[i][6];
		munster.ac = monster_array[i][7];
		munster.attack = monster_array[i][8];
		console.log("loading monstere " + i);
		loader.load( munster.model, munster.loadObject(munster) );
		
		
		array_of_monsters.push(munster);

	}

}
