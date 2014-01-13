//monster.js
//monster class, attributes and methods

//lively moved and modified (populated from save file and should be saved to save file)
var array_of_monsters = [];

var MONSTER_IDLE = 0;
var MONSTER_MAD = 1;
var MONSTER_WALK = 2;


//monster class declaration
Monster = function ( ) {

	// API
	this.gameID = 99;
	this.name = "unnamed";
	this.model = "models/golem.js";
	this.mesh = 0;
	this.geometry = 0;
	this.material = 0;
	this.hp = 1;
	this.defense = 40;
	this.attack = 30;
	this.dmg = 53;
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
	
	this.pickables = 0;
	
	//this.reached_destination = false;
	this.OnClick = 0;
	this.OnItemClick = 0;
	
	//inventory
	this.inventory = 0;
	
	this.position = new THREE.Vector3(4, 0, 2);
	this.target = new THREE.Vector3(4, 0, 2);
	this.rotation = 0;
	this.visible = true;
	
	this.mood = MONSTER_IDLE;
	
	this.should_move = false;
	this.should_turn = false;
	this.target_rotation = 0;
	this.should_attack = false;
	
	this.VIEW_DISTANCE = 4;
	
	this.audio_monster_wound = document.createElement('audio');
	this.audio_monster_dies = document.createElement('audio');
	this.audio_monster_roar = document.createElement('audio');
	this.audio_monster_attack = document.createElement('audio');
	this.audio_monster_click = document.createElement('audio');
	
};

//Monster.prototype = Object.create(  );

Monster.prototype.deal_damage = function ( dmg_done ) {

	this.hp -= dmg_done;
	this.mood = MONSTER_MAD; //monster get angry
	console.log("player makes dmg: " + dmg_done + ", monster hp is now: " + this.hp);
	DisplayMonsterDmg(dmg_done);
	if(this.hp < 0)
	{
		//Monster is dead!
		
		//soundy play sound of monstrous death
		this.audio_monster_dies.play();
		
		//Monster drops loot
		if(this.pickables != 0)
		{
			for(var i=0; i<this.pickables.length; i++)
			{
				var picki = 0;
				if(this.pickables[i][4] == 0)
				{
					console.log("creating new item..");
					picki = create_game_object();
					picki.gameID = this.pickables[i][0];
					picki.name = this.pickables[i][1];
					picki.model = this.pickables[i][2];
					picki.icon = this.pickables[i][3];
					picki.position = this.mesh.position.clone();
					picki.position.y = 0;
					picki.niched = -1;
					picki.visible = true;
					//lets make 3d model here
					var loader = new THREE.JSONLoader();
					loader.load( picki.model, picki.loadObject(picki) );
				}
				else
				{
					console.log("not creating item, but using object already created..");
					picki = this.pickables[i][4];
					picki.mesh.position = this.mesh.position.clone();
					picki.mesh.position.y = 0;
					picki.mesh.visible = true;
				}
				
				array_of_pickables.push(picki);
			}
		}
		scene.remove(this.mesh);
		
		for(var m=0; m<array_of_monsters.length; m++)
		{
			if(array_of_monsters[m] == this)
			{
				console.log("splicing monster number: " + m);
				array_of_monsters.splice(m,1); //TODO fix hard coded for one monster!
			}
		}
		
	}
	else
	{
		this.audio_monster_wound.play();
	}
};


Monster.prototype.loadObject = function ( munster ) {

	return function (geometry, materials ) {

		morphColorsToFaceColors( geometry );
		geometry.computeMorphNormals();
		materials[ 0 ].morphTargets = true;
		materials[ 0 ].morphNormals = true;
		if(materials.length > 1)
		{
			materials[ 1 ].morphTargets = true;
		}
		munster.mesh = new THREE.MorphAnimMesh( geometry, new THREE.MeshFaceMaterial( materials ) );
		munster.mesh.position.x = munster.position.x*SQUARE_SIZE;
		munster.mesh.position.z = munster.position.z*SQUARE_SIZE;
		munster.mesh.position.y = 0;
		var rot = new THREE.Vector3(0, munster.rotation*Math.PI/2, 0);
		munster.mesh.rotation = rot;
		munster.mesh.name = munster.name;
		munster.id = munster.mesh.id;
		munster.mesh.visible = munster.visible;
		munster.mesh.duration = IDLE_ANIM_DURATION;
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
		munster.dmg = monster_array[i][9];
		munster.pickables = monster_array[i][10];
		munster.OnClick = monster_array[i][11];
		munster.OnItemClick = monster_array[i][12];
		
		//animation keyframes
		if(monster_array[i].length > 18)
		{
			munster.idle_startKeyframe = monster_array[i][13];
			munster.idle_endKeyframe = monster_array[i][14];
			munster.attack_startKeyframe = monster_array[i][15];
			munster.attack_endKeyframe = monster_array[i][16];
			munster.walk_startKeyframe = monster_array[i][17];
			munster.walk_endKeyframe = monster_array[i][18];
		}

		if(monster_array[i].length > 19)
		{
			munster.mood = monster_array[i][19];
		}
		
		var source_monster_wound = document.createElement('source');
		source_monster_wound.src = monster_array[i][20];
		munster.audio_monster_wound.appendChild(source_monster_wound);
		var source_monster_dies = document.createElement('source');
		source_monster_dies.src = monster_array[i][21];
		munster.audio_monster_dies.appendChild(source_monster_dies);
		var source_monster_roar = document.createElement('source');
		source_monster_roar.src = monster_array[i][22];
		munster.audio_monster_roar.appendChild(source_monster_roar);
		var source_monster_attack = document.createElement('source');
		source_monster_attack.src = monster_array[i][23];
		munster.audio_monster_attack.appendChild(source_monster_attack);
		var source_monster_click = document.createElement('source');
		source_monster_click.src = monster_array[i][24];
		munster.audio_monster_click.appendChild(source_monster_click);

		
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
	if(playerDead)
	{
		console.log("player is dead, lets idle");
		this.mesh.duration = IDLE_ANIM_DURATION;
		this.mesh.setFrameRange(this.idle_startKeyframe,this.idle_endKeyframe);
		return;
	}
	
	//Attack only if mad :)
	if(this.mood == MONSTER_MAD)
	{
	
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
				this.mesh.duration = IDLE_ANIM_DURATION;
				this.mesh.setFrameRange(this.idle_startKeyframe,this.idle_endKeyframe);
			}
		}
		else
		{
			//player is too far away to draw attention of monster... so idle around
			console.log("diagonal, too far away");
			this.mesh.duration = IDLE_ANIM_DURATION;
			this.mesh.setFrameRange(this.idle_startKeyframe,this.idle_endKeyframe);
		}
	}
	//}
};


//find path to position
Monster.prototype.find_path = function ( destination_position ) {

	
	//Walk only if in the right mood :)
	if(this.mood == MONSTER_WALK)
	{

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
					this.rotation = 3;
				}
				else
				{
					this.rotation++;
				}
			}
			else
			{
				if(this.rotation - this.target_rotation == 3)
				{
					this.rotation = 0;
				}
				else
				{
					this.rotation--;
				}
			}
		}
		
		
		//reduce x if possible
		if((destination_position.x > this.position.x) && canMoveTo(this.gameID,this.position.x+1,this.position.z))
		{
			//destination is left from monster
			if(this.rotation == 1)
			{
				this.target.x = this.position.x+1;
				this.target.z = this.position.z;
				this.should_move = true;
				this.mesh.duration = 1600;
				this.mesh.setFrameRange(this.walk_startKeyframe,this.walk_endKeyframe);
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
		else if((destination_position.x < this.position.x) && canMoveTo(this.gameID,this.position.x-1,this.position.z))
		{
			//player is right from monster
			if(this.rotation == 3)
			{
				this.target.x = this.position.x-1;
				this.target.z = this.position.z;
				this.should_move = true;
				this.mesh.duration = 1600;
				this.mesh.setFrameRange(this.walk_startKeyframe,this.walk_endKeyframe);
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
		else if((destination_position.z < this.position.z) && canMoveTo(this.gameID,this.position.x,this.position.z-1))
		{
			//player is south from monster
			if(this.rotation == 2)
			{
				this.target.x = this.position.x;
				this.target.z = this.position.z-1;
				this.should_move = true;
				this.mesh.duration = 1600;
				this.mesh.setFrameRange(this.walk_startKeyframe,this.walk_endKeyframe);
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
		else if((destination_position.z > this.position.z) && canMoveTo(this.gameID,this.position.x,this.position.z+1))
		{
			//player is north from monster
			if(this.rotation == 0)
			{
				this.target.x = this.position.x;
				this.target.z = this.position.z+1;
				this.should_move = true;
				this.mesh.duration = 1600;
				this.mesh.setFrameRange(this.walk_startKeyframe,this.walk_endKeyframe);
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
			if((this.position.x == destination_position.x)&&(this.position.z == destination_position.z))
			{
				//monster reached destination - stop
				console.log("reached walk destination!");
				
				if(this.rotation == 2)
				{
					this.mood = MONSTER_IDLE;
					this.mesh.duration = IDLE_ANIM_DURATION;
					this.mesh.setFrameRange(this.idle_startKeyframe,this.idle_endKeyframe);
				}
				else
				{
					//not yet idle
					this.should_turn = true;
					this.target_rotation = 2;
				}
				//set target to own position because player checks monster target field to see if it is occupied
				//while monster is attacking, his occupied space is only his position
				this.target.x = this.position.x;
				this.target.z = this.position.z;
			}
			else
			{
				console.log("stuck, but don't go to idle but keep walking (so that player realizes he should move :)");
				//this.mesh.duration = IDLE_ANIM_DURATION;
				//this.mesh.setFrameRange(this.idle_startKeyframe,this.idle_endKeyframe);
			}
		}
	}
};



//move monster by small amount and chek if it reached destination
Monster.prototype.move = function ( delta ) {

	if(this.should_attack)
	{
		//if the moment is right, make some attack roll
		if(delta > 9)
		{
			this.should_attack = false;
			//console.log("attack!" + delta);
			
			//check if player moved already from that position
			
			// soundy Play hack attack sound
			
			//roll monster attack
			var att_roll = 50*Math.random()+this.attack;
			if(att_roll>PlayerDefense)
			{
				var dmg_roll = Math.round(this.dmg * Math.random()) + 1;
				playerHPcurrent -= dmg_roll;
				player_wound_div.style.display = "inline-block";
				player_wound_div.innerHTML = dmg_roll;
				// soundy Play player wounded ngh sound
				audio_ngh.play();
				
				//player death
				if(playerHPcurrent <= 0)
				{
					playerHPcurrent = 0;
					player_HP_div.style.width = "1%";
					player_HP_div.style.backgroundColor = "#990000";
					//player dies. pause the game and write apropriate message.
					player_dies();
					if(this.name == "Crystal Elemental")
					{
						show_message("<br><br>You have been defeated by demotivated little elemental.. <br><br>All you can do now is restart! <br><br><br>  <button onclick='location.reload();'> Restart </button>  &nbsp;&nbsp; <input type='button' value=' Load ' disabled>", 550, 350);
					}
					else if(this.name == "Rock Golem")
					{
						show_message("<br><br>You have been smitten by overpowered stone pile! <br><br>All you can do now is restart! <br><br><br>  <button onclick='location.reload();'> Restart </button>  &nbsp;&nbsp; <input type='button' value=' Load ' disabled>", 550, 350);
					}
					else
					{
						show_message("<br><br>You have been killed! <br><br>All you can do now is restart! <br><br><br>  <button onclick='location.reload();'> Restart </button>  &nbsp;&nbsp; <input type='button' value=' Load ' disabled>", 550, 350);
					}
				}
				else
				{
					console.log("monster hits player: " + playerHPcurrent);
					//update player health bar
					var p = playerHPcurrent/playerHPmax*100;
					player_HP_div.style.width = "" + p + "%";
					if(p < 50)
					{
						//TODO: color green to red gradient can be smarter projection of percent
						player_HP_div.style.backgroundColor = "#999900";
					}
				}
			}
			else
			{
				//miss
			}
		}
	}
	
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
