//monster.js
//monster class, attributes and methods

// id, name, model, x, z, rot, hp, ac, attack
var monster_array = [[2,"rock_golem","models/golem.js", 20,11,3, 90, 35, 20]];

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
	this.defense = 40;
	this.attack = 30;
	this.damage = 13;
	this.xp = 300; //how much xp player gets for killing it
	
	//animation keyframes
	this.idle_startKeyframe = 0;
	this.idle_endKeyframe = 90;
	this.attack_startKeyframe = 90;
	this.attack_endKeyframe = 138;
	this.walk_startKeyframe = 140;
	this.walk_endKeyframe = 179;
	this.current_anim = 0; //idle
	
	this.move_speed = 0;
	this.attack_speed = 0;
	
	//inventory
	this.inventory = 0;
	
	this.position = new THREE.Vector3(4, 0, 2);
	this.target = new THREE.Vector3(4, 0, 2);
	this.rotation = 0;
	this.visible = true;
	
	this.should_move = false;
	this.should_turn = false;
	this.target_rotation = 0;
	this.should_attack = false;
	
	this.VIEW_DISTANCE = 4;
	
};

//Monster.prototype = Object.create(  );

Monster.prototype.damage = function ( dmg ) {

	this.hp -= dmg;

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
		munster.mesh.duration = 6200;
		munster.mesh.setFrameRange(munster.idle_startKeyframe,munster.idle_endKeyframe);
		munster.mesh.scale.set( 1.2, 1.2, 1.2 );
		console.log("adding monstere " + munster.mesh.name);
		scene.add( munster.mesh );
		
		//remove loading screen
		loading_div.style.display = "none";
	}

};

				
//load monsters on the map
function load_monsters () {

	var loader = new THREE.JSONLoader();


	var callbackProgress = function( progress, result ) {

		console.log("loading monstere kod pere");
		
		var bar = 250,
			total = progress.totalModels + progress.totalTextures,
			loaded = progress.loadedModels + progress.loadedTextures;

		if ( total )
			bar = Math.floor( bar * loaded / total );

		console.log("bar: " + bar);//$( "bar" ).style.width = bar + "px";

		//count = 0;
		//for ( var m in result.materials ) count++;

		//handle_update( result, Math.floor( count/total ) );

	}

	loader.callbackProgress = callbackProgress;
	for(var i=0; i<monster_array.length; i++) {
		var munster = new Monster();
		munster.gameID = monster_array[i][0];
		munster.name = monster_array[i][1];
		munster.model = monster_array[i][2];
		munster.position.x = monster_array[i][3];
		munster.position.z = monster_array[i][4];
		munster.position.y = 0;
		munster.target.x = munster.position.x;
		munster.target.z = munster.position.z;
		munster.target.z = munster.position.z;
		munster.rotation = monster_array[i][5];
		munster.hp = monster_array[i][6];
		munster.ac = monster_array[i][7];
		munster.attack = monster_array[i][8];
		console.log("loading monstere " + i);
		loader.load( munster.model, munster.loadObject(munster) );
		
		loader.callbackProgress = callbackProgress;
		
		array_of_monsters.push(munster);

	}

}


//find player
Monster.prototype.find_player = function ( player_pos ) {

	//console.log("find_player player_pos.x: " + player_pos.x);
	//console.log("find_player player_pos.z: " + player_pos.z);
	
	//first, if monster is moving, check if it reached destination
	if(this.should_move)
	{
		this.should_move = false;
		console.log("end of move, this.position.x: " + this.position.x);
		if(this.position.z > this.target.z)
		{
			this.position.z--;
			console.log("end of move, position.z--: " + this.position.z);
		}
		else if(this.position.z < this.target.z)
		{
			this.position.z++;
			console.log("end of move, position.z++: " + this.position.z);
		}
		else if(this.position.x > this.target.x)
		{
			this.position.x--;
			console.log("end of move, position.x--: " + this.position.x);
		}
		else if(this.position.x < this.target.x)
		{
			this.position.x++;
			console.log("end of move, position.x++: " + this.position.x);
		}
	}
	
	if(this.should_turn)
	{
		//stop rotation 
		this.should_turn = false;
		
		if(this.target_rotation > this.rotation)
		{
			if(this.target_rotation - this.rotation == 3)
			{
				//this.mesh.rotation.y = -delta*Math.PI/20;
				this.rotation = 3;
			}
			else
			{
				//this.mesh.rotation.y = this.rotation*Math.PI/2 + delta*Math.PI/20;
				this.rotation++;
			}
		}
		else
		{
			if(this.rotation - this.target_rotation == 3)
			{
				//this.mesh.rotation.y = this.rotation*Math.PI/2 + delta*Math.PI/20;
				this.rotation = 0;
			}
			else
			{
				//this.mesh.rotation.y = this.rotation*Math.PI/2 - delta*Math.PI/20;
				this.rotation--;
			}
		}
		
		console.log("end of turn: " + this.rotation);
		
	}
	
	//calc x and z distance
	var x_dist = Math.abs(this.position.x - player_pos.x);
	var z_dist = Math.abs(this.position.z - player_pos.z);
	
	//if player is not too far away, monster will try to reduce x or z distance between him self or player
	if(this.position.distanceTo(player_pos) < 6)
	{
		//console.log("diagonal, but close");
		//reduce x if possible
		if((player_pos.x > this.position.x) && canMoveTo(this.gameID,this.position.x+1,this.position.z))
		{
			//player is left from monster
			if(this.rotation == 1)
			{
				this.target.x = this.position.x+1;
				this.target.z = this.position.z;
				if((this.target.x == player_pos.x)&&(this.target.z == player_pos.z))
				{
					//player is in front of monster - attack
					this.should_attack = true;
					this.mesh.duration = 2000;
					this.mesh.setFrameRange(this.attack_startKeyframe,this.attack_endKeyframe);
					//set target to own position because player checks monster target field to see if it is occupied
					//while monster is attacking, his occupied space is only his position
					this.target.x = this.position.x;
					this.target.z = this.position.z;
					//console.log("diagonal, x increase attack");
				}
				else
				{
					this.should_move = true;
					this.mesh.duration = 1600;
					this.mesh.setFrameRange(this.walk_startKeyframe,this.walk_endKeyframe);
					//console.log("diagonal, x increase move");
				}
			}
			else
			{
				//rotate monster to look left before moving
				console.log("diagonal, x increase rotate");
				this.should_turn = true;
				this.target_rotation = 1;
				this.mesh.duration = 2200;
				this.mesh.setFrameRange(this.walk_startKeyframe,this.walk_endKeyframe);
				//set target to own position because player checks monster target field to see if it is occupied
				//while monster is rotating, his occupied space is only his position
				this.target.x = this.position.x;
				this.target.z = this.position.z;
			}
		}
		else if((player_pos.x < this.position.x) && canMoveTo(this.gameID,this.position.x-1,this.position.z))
		{
			//player is right from monster
			if(this.rotation == 3)
			{
				this.target.x = this.position.x-1;
				this.target.z = this.position.z;
				if((this.target.x == player_pos.x)&&(this.target.z == player_pos.z))
				{
					//player is in front of monster - attack
					this.should_attack = true;
					this.mesh.duration = 2000;
					this.mesh.setFrameRange(this.attack_startKeyframe,this.attack_endKeyframe);
					//console.log("diagonal, x reduce attack");
					//set target to own position because player checks monster target field to see if it is occupied
					//while monster is attacking, his occupied space is only his position
					this.target.x = this.position.x;
					this.target.z = this.position.z;
				}
				else
				{
					this.should_move = true;
					this.mesh.duration = 1600;
					this.mesh.setFrameRange(this.walk_startKeyframe,this.walk_endKeyframe);
					console.log("diagonal, x reduce move");
				}
			}
			else
			{
				//rotate monster to look right before moving
				console.log("diagonal, x reduce rotate");
				this.should_turn = true;
				this.target_rotation = 3;
				//set target to own position because player checks monster target field to see if it is occupied
				//while monster is rotating, his occupied space is only his position
				this.target.x = this.position.x;
				this.target.z = this.position.z;
				this.mesh.duration = 2200;
				this.mesh.setFrameRange(this.walk_startKeyframe,this.walk_endKeyframe);
			}
		}
		//reduce z if possible
		else if((player_pos.z < this.position.z) && canMoveTo(this.gameID,this.position.x,this.position.z-1))
		{
			//player is south from monster
			if(this.rotation == 2)
			{
				this.target.x = this.position.x;
				this.target.z = this.position.z-1;
				if((this.target.x == player_pos.x)&&(this.target.z == player_pos.z))
				{
					//player is in front of monster - attack
					this.should_attack = true;
					this.mesh.duration = 2000;
					this.mesh.setFrameRange(this.attack_startKeyframe,this.attack_endKeyframe);
					//set target to own position because player checks monster target field to see if it is occupied
					//while monster is attacking, his occupied space is only his position
					this.target.x = this.position.x;
					this.target.z = this.position.z;
					//console.log("diagonal, z reduce attack");
				}
				else
				{
					this.should_move = true;
					this.mesh.duration = 1600;
					this.mesh.setFrameRange(this.walk_startKeyframe,this.walk_endKeyframe);
					console.log("diagonal, z reduce move");
				}
			}
			else
			{
				//rotate monster to look south before moving
				console.log("diagonal, z reduce rotate");
				this.should_turn = true;
				this.target_rotation = 2;
				//set target to own position because player checks monster target field to see if it is occupied
				//while monster is rotating, his occupied space is only his position
				this.target.x = this.position.x;
				this.target.z = this.position.z;
				this.mesh.duration = 2200;
				this.mesh.setFrameRange(this.walk_startKeyframe,this.walk_endKeyframe);
			}
		}
		else if((player_pos.z > this.position.z) && canMoveTo(this.gameID,this.position.x,this.position.z+1))
		{
			//player is north from monster
			if(this.rotation == 0)
			{
				this.target.x = this.position.x;
				this.target.z = this.position.z+1;
				if((this.target.x == player_pos.x)&&(this.target.z == player_pos.z))
				{
					//player is in front of monster - attack
					this.should_attack = true;
					this.mesh.duration = 2000;
					this.mesh.setFrameRange(this.attack_startKeyframe,this.attack_endKeyframe);
					//set target to own position because player checks monster target field to see if it is occupied
					//while monster is attacking, his occupied space is only his position
					this.target.x = this.position.x;
					this.target.z = this.position.z;
					//console.log("diagonal, z increase attack");
				}
				else
				{
					this.should_move = true;
					this.mesh.duration = 1600;
					this.mesh.setFrameRange(this.walk_startKeyframe,this.walk_endKeyframe);
					console.log("diagonal, z increase move");
				}
			}
			else
			{
				//rotate monster to look north before moving
				console.log("diagonal, z increase rotate");
				this.should_turn = true;
				this.target_rotation = 0;
				//set target to own position because player checks monster target field to see if it is occupied
				//while monster is rotating, his occupied space is only his position
				this.target.x = this.position.x;
				this.target.z = this.position.z;
				this.mesh.duration = 2200;
				this.mesh.setFrameRange(this.walk_startKeyframe,this.walk_endKeyframe);
			}
		}
		else
		{
			console.log("diagonal, stuck");
			this.mesh.duration = 6200;
			this.mesh.setFrameRange(this.idle_startKeyframe,this.idle_endKeyframe);
		}
	}
	else
	{
		//player is too far away to draw attention of monster... so idle around
		console.log("diagonal, too far away");
		this.mesh.duration = 6200;
		this.mesh.setFrameRange(this.idle_startKeyframe,this.idle_endKeyframe);
	}
		//}
	//}
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
			
		if(this.position.x > this.target.x)
			this.mesh.position.x = this.position.x*SQUARE_SIZE - delta;
		
		if(this.position.x < this.target.x)
			this.mesh.position.x = this.position.x*SQUARE_SIZE + delta;
		
	}
	
	if(this.should_turn)
	{
		//rotate monster toward target rotation
		//this.target_rotation = 0;
		if(this.target_rotation > this.rotation)
		{
			if(this.target_rotation - this.rotation == 3)
			{
				this.mesh.rotation.y = -delta*Math.PI/20;
			}
			else
			{
				this.mesh.rotation.y = this.rotation*Math.PI/2 + delta*Math.PI/20;
			}
		}
		else
		{
			if(this.rotation - this.target_rotation == 3)
			{
				this.mesh.rotation.y = this.rotation*Math.PI/2 + delta*Math.PI/20;
			}
			else
			{
				this.mesh.rotation.y = this.rotation*Math.PI/2 - delta*Math.PI/20;
			}
		}
		//this.mesh.rotation.y = this.rotation*Math.PI/2 + delta*Math.PI/20;
	}

};
