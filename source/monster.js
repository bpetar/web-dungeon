//monster.js
//monster class, attributes and methods

// id, name, model, x, z, rot, hp, ac, attack
var monster_array = [[2,"rock_golem","models/golem.js", 4,4,2, 90, 35, 20]];

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
	this.walk_endKeyframe = 179;
	this.position = new THREE.Vector3(4, 0, 2);
	this.rotation = 0;
	this.visible = true;
	this.target = new THREE.Vector3(0, 0, 0);
	
	this.should_move = false;
	this.should_turn = false;
	this.should_attack = false;
	
	this.VIEW_DISTANCE = 4;
	
};

//Monster.prototype = Object.create(  );

Monster.prototype.damage = function ( dmg ) {

	this.hp -= dmg;

};

//find player
Monster.prototype.find_player = function ( player_pos ) {

	//first, if monster is moving, check if it reached destination
	if(this.should_move)
	{
		this.should_move = false;
		if(this.position.z > this.target.z)
		{
			this.position.z -= 1;
		}
		else if(this.position.z < this.target.z)
		{
			this.position.z += 1;
		}
	}
	
	if(this.should_turn)
	{
		//stop rotation 
		this.should_turn = false;
		this.rotation++;
		if(this.rotation == 4) this.rotation = 0;
		
	}
	
	//check first line of squares
	if(this.position.distanceTo(player_pos)< 1.1)
	{
		if(this.rotation == 0) //north
		{
			if(this.position.z+1 == player_pos.z)
			{
				//player is north of this monster, monster is looking at him, so attack without further ado
				this.should_attack = true;
				this.mesh.setFrameRange(this.attack_startKeyframe,this.attack_endKeyframe);
				console.log("should attack player z: " + player_pos.z);
			}
			else
			{
				//player is next to monster, but monster must turn toward player (its behind him of sideways)
				this.should_turn = true;
				this.mesh.setFrameRange(this.walk_startKeyframe,this.walk_endKeyframe);
				console.log("should just turn to attack player z: " + player_pos.z);
			}
		}
		if(this.rotation == 1) //right
		{
			if(this.position.x-1 == player_pos.x)
			{
				//player is right of this monster, monster is looking at him, so attack without further ado
				this.should_attack = true;
				this.mesh.setFrameRange(this.attack_startKeyframe,this.attack_endKeyframe);
				console.log("should attack player z: " + player_pos.z);
			}
			else
			{
				//player is next to monster, but monster must turn toward player (its behind him of sideways)
				this.should_turn = true;
				this.mesh.setFrameRange(this.walk_startKeyframe,this.walk_endKeyframe);
				console.log("should just turn to attack player z: " + player_pos.z);
			}
		}
		if(this.rotation == 2) //south
		{
			if(this.position.z-1 == player_pos.z)
			{
				//player is south of this monster, monster is looking at him, so attack without further ado
				this.should_attack = true;
				this.mesh.setFrameRange(this.attack_startKeyframe,this.attack_endKeyframe);
				console.log("should attack player z: " + player_pos.z);
			}
			else
			{
				//player is next to monster, but monster must turn toward player (its behind him of sideways)
				this.should_turn = true;
				this.mesh.setFrameRange(this.walk_startKeyframe,this.walk_endKeyframe);
				console.log("should just turn to attack player z: " + player_pos.z);
			}
		}
		if(this.rotation == 3) //left
		{
			if(this.position.x+1 == player_pos.z)
			{
				//player is left of this monster, monster is looking at him, so attack without further ado
				this.should_attack = true;
				this.mesh.setFrameRange(this.attack_startKeyframe,this.attack_endKeyframe);
				console.log("should attack player z: " + player_pos.z);
			}
			else
			{
				//player is next to monster, but monster must turn toward player (its behind him of sideways)
				this.should_turn = true;
				this.mesh.setFrameRange(this.walk_startKeyframe,this.walk_endKeyframe);
				console.log("should just turn to attack player z: " + player_pos.z);
			}
		}
	}
	else
	{
		//if monster and player are in line, monster should turn and walk toward player in straight line
		if(this.position.z == player_pos.z)
		{
		}
		else if(this.position.x == player_pos.x)
		{
			//player is south of monster
			if((this.position.z > player_pos.z) && (this.position.z < player_pos.z + this.VIEW_DISTANCE))
			{
				if(this.rotation == 0) //monster looking north
				{
					//looking at north, while player is south, so turn around 180 degrees
					this.should_turn = true;
					this.mesh.setFrameRange(this.walk_startKeyframe,this.walk_endKeyframe);
					console.log("turn around 180 degrees to player z: " + player_pos.z);
				}
				else if(this.rotation == 1) //monster looking right
				{
					//looking at right, while player is south, so turn around 90 degrees
					this.should_turn = true;
					this.mesh.setFrameRange(this.walk_startKeyframe,this.walk_endKeyframe);
					console.log("turn around 90 degrees right to player z: " + player_pos.z);
				}
				else if(this.rotation == 2) //monster looking south
				{
					//looking at south, while player is south - just walk towards him
					this.should_move = true;
					this.mesh.setFrameRange(this.walk_startKeyframe,this.walk_endKeyframe);
					this.target = player_pos;
					console.log("walk south towards player z: " + player_pos.z);
				}
				else if(this.rotation == 3) //monster looking left
				{
					//looking at left, while player is south, so turn around 90 degrees
					this.should_turn = true;
					this.mesh.setFrameRange(this.walk_startKeyframe,this.walk_endKeyframe);
					console.log("turn around 90 degrees left to player z: " + player_pos.z);
				}
			}
			//player is north of monster
			else if((this.position.z < player_pos.z) && (this.position.z > player_pos.z - this.VIEW_DISTANCE))
			{
				if(this.rotation == 0) //monster looking north
				{
					//looking at north, while player is north - just walk towards him
					this.should_move = true;
					this.mesh.setFrameRange(this.walk_startKeyframe,this.walk_endKeyframe);
					this.target = player_pos;
					console.log("walk north towards player z: " + player_pos.z);
				}
				else if(this.rotation == 1) //monster looking right
				{
					//looking at right, while player is north, so turn around 90 degrees
					this.should_turn = true;
					this.mesh.setFrameRange(this.walk_startKeyframe,this.walk_endKeyframe);
					console.log("turn around 90 degrees left to player z: " + player_pos.z);
				}
				else if(this.rotation == 2) //monster looking south
				{
					//looking at south, while player is north, so turn around 180 degrees
					this.should_turn = true;
					this.mesh.setFrameRange(this.walk_startKeyframe,this.walk_endKeyframe);
					console.log("turn around 180 degrees to player z: " + player_pos.z);
				}
				else if(this.rotation == 3) //monster looking left
				{
					//looking at left, while player is north, so turn around 90 degrees
					this.should_turn = true;
					this.mesh.setFrameRange(this.walk_startKeyframe,this.walk_endKeyframe);
					console.log("turn around 90 degrees rigth to player z: " + player_pos.z);
				}
			}
			else
			{
				console.log("too far away");
			}
		}
	//check second line of squares
	
	
	}
	//this.target = new THREE.Vector3(40, 0, 0);
	//this.should_move = true;
	//this.mesh.setFrameRange(this.walk_startKeyframe,this.walk_endKeyframe);
	//return false;

};

//move monster by small amount and chek if it reached destination
Monster.prototype.move = function ( delta ) {

	if(this.should_move)
	{
		//move monster toward target position
		if(this.position.z > this.target.z)
			this.mesh.position.z = this.position.z*SQUARE_SIZE - delta;
			
		if(this.position.z < this.target.z)
			this.mesh.position.z = this.position.z*SQUARE_SIZE + delta;
		/*if(this.target.z>this.mesh.position.z)
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
		}*/
		
	}
	
	if(this.should_turn)
	{
		//rotate monster toward target rotation
		
		this.mesh.rotation.y = this.rotation*Math.PI/2 - delta*Math.PI/20;
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
		munster.mesh.position.x = munster.position.x*SQUARE_SIZE;
		munster.mesh.position.z = munster.position.z*SQUARE_SIZE;
		munster.mesh.position.y = 0;
		var rot = new THREE.Vector3(0, munster.rotation*Math.PI/2, 0);
		munster.mesh.rotation = rot;
		munster.mesh.name = munster.name;
		munster.id = munster.mesh.id;
		munster.mesh.visible = munster.visible;
		munster.mesh.duration = 5000;
		munster.mesh.setFrameRange(munster.idle_startKeyframe,munster.idle_endKeyframe);
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
		munster.position.x = monster_array[i][3];
		munster.position.z = monster_array[i][4];
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
