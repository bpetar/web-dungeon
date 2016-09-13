//monster.js
//monster class, attributes and methods

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
	
	this.alive = true;
	
	//this.reached_destination = false;
	this.OnClick = 0;
	this.OnItemClick = 0;
	
	//inventory
	this.inventory = 0;
	
	this.position = new THREE.Vector3(4, 0, 2);
	this.target = new THREE.Vector3(4, 0, 2);
	this.hitting = new THREE.Vector3(4, 0, 2); //dont ask
	this.rotation = 0;
	this.visible = true;
	
	this.mood = MONSTER_IDLE;
	
	this.should_move = false;
	this.should_turn = false;
	this.target_rotation = 0;
	this.should_attack = false;
	
	this.first_roar = false;
	
	this.VIEW_DISTANCE = 4;
	
	this.audio_monster_wound = document.createElement('audio');
	this.audio_monster_dies = document.createElement('audio');
	this.audio_monster_roar = document.createElement('audio');
	this.audio_monster_attack = document.createElement('audio');
	this.audio_monster_click = document.createElement('audio');
	
};

//Monster.prototype = Object.create(  );

Monster.prototype.deal_damage = function ( dmg_done ) {

	if(!this.alive)
		return;
		
	this.hp -= dmg_done;
	
	var roar = false;
	
	if(this.mood == MONSTER_IDLE)
	{
		//monster was hit while it was chillin, make him roar angrily!
		roar = true;
	}
	this.mood = MONSTER_MAD; //monster get angry
	console.log("player makes dmg: " + dmg_done + ", monster hp is now: " + this.hp);
	DisplayMonsterDmg(dmg_done);
	if(this.hp < 0)
	{
		//Monster is dead!
		if(typeof monsterPun != 'undefined') setTimeout(monsterPun, 600);
		
		//Soundy play sound of monstrous death
		this.audio_monster_dies.play();
		
		//Monster drops loot
		if(this.pickables != 0)
		{
			for(var i=0; i<this.pickables.length; i++)
			{
				var pickiPosition = this.mesh.position.clone();
				pickiPosition.y = 0;
				var picki = load_item_by_id(this.pickables[i].gameID, pickiPosition);
				picki.visible = true;
				currentlevelObj.array_of_pickables.push(picki);
				//TODO: check if monster is standing on the plate then dropped item should be automatically plated
				//Make sure when player gives item to monster that its removed from list of pickables
			}
		}
		
		//dont remove the monster, just hide?
		//scene.remove(this.mesh);
		this.mesh.visible = false;
		this.alive = false;
		//for(var m=0; m<array_of_monsters.length; m++)
		//{
		//	if(array_of_monsters[m] == this)
		//	{
		//		console.log("splicing monster number: " + m);
		//		array_of_monsters.splice(m,1);
		//	}
		//}
		
	}
	else
	{
		if(roar)
		{
			this.audio_monster_roar.play();
			this.first_roar = true;
		}
		else
		{
			this.audio_monster_wound.play();
		}
	}
};



//check if model is already being downloaded, and wait for it to download and clone it...
function loadMonsterCheck(loader, monster)
{
	//console.log("loadMonsterCheck: " + monster.name);
	var object = modelAlreadyLoaded(monster.model);
	if(object != -1)
	{
		//already put to download
		//object loading is in progress
		//wait till object is loaded and link to it
		if(object == 0)
		{
			if(typeof modelWaiters[monster.model] == 'undefined')
			{
				modelWaiters[monster.model] = new Array();
			}
			modelWaiters[monster.model].push(monster);
			return;
		}
		
		//console.log("loadMonsterCheck, model loaded!: " + monster.model);
		monster.mesh = object.clone();
		//monster.mesh.position = monster.position;
		monster.mesh.position.x = monster.position.x*SQUARE_SIZE;
		monster.mesh.position.z = monster.position.z*SQUARE_SIZE;
		monster.mesh.position.y = 0;
		monster.mesh.rotation = new THREE.Vector3(0, monster.rotation*Math.PI/2, 0);
		monster.id=monster.mesh.id;
		monster.mesh.visible = monster.visible;
		scene.add( monster.mesh );		
	}
	else
	{
		//download it first time..
		loaded3Dmodels.push([monster.model,0]);
		loader.load( monster.model, monster.loadObject(monster) );
		relativeLevelModelCount++;
	}
	
}


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
		
		for(var i=0; i< loaded3Dmodels.length; i++)
		{
			if(loaded3Dmodels[i][0] == munster.model)
			{
				//set loaded model
				loaded3Dmodels[i][1] = munster.mesh;
			}
		}
			
		munster.mesh.position.x = munster.position.x*SQUARE_SIZE;
		munster.mesh.position.z = munster.position.z*SQUARE_SIZE;
		munster.mesh.position.y = 0;
		munster.mesh.rotation = new THREE.Vector3(0, munster.rotation*Math.PI/2, 0);
		munster.mesh.name = munster.name;
		munster.id = munster.mesh.id;
		munster.mesh.visible = munster.visible;
		munster.mesh.duration = IDLE_ANIM_DURATION;
		munster.mesh.setFrameRange(munster.idle_startKeyframe,munster.idle_endKeyframe);
		munster.mesh.scale.set( 1.2, 1.2, 1.2 );
		//console.log("adding monstere " + munster.mesh.name);
		scene.add( munster.mesh );
		
		if(typeof modelWaiters[munster.model] != 'undefined')
		{
			//console.log("loadModel waiters are existing " + munster.name);
			for (var i=0; i< modelWaiters[munster.model].length; i++)
			{
				var monsterWaiter = modelWaiters[munster.model][i];
				//console.log("loadModel waiter cloned: " + munster.model + ", pos:" + monsterWaiter.position.z);
				var clone = munster.mesh.clone();
				clone.position.x = monsterWaiter.position.x*SQUARE_SIZE;
				clone.position.z = monsterWaiter.position.z*SQUARE_SIZE;
				clone.position.y = 0;
				clone.rotation = new THREE.Vector3(0, monsterWaiter.rotation*Math.PI/2, 0);
				
				clone.visible = munster.visible;
				clone.duration = IDLE_ANIM_DURATION;
				clone.setFrameRange(munster.idle_startKeyframe,munster.idle_endKeyframe);
				clone.scale.set( 1.2, 1.2, 1.2 );

				monsterWaiter.mesh = clone;
				
				scene.add( clone );
			}
		}
		
		updateModelLoading(munster.name);

	}

};


function loadMonsterDataFromLevelArray(monsterObj, levelObj, id) {
	
	var monsterArr = 0;
	
	for(var i=0; i<levelObj.monsterArr.length; i++) {
		if (levelObj.monsterArr[i][0] == id)
		{
			monsterArr = levelObj.monsterArr[i];
			break;
		}
	}
	if(monsterArr == 0)
	{
		console.log("Error: Loading couldn't find monster with id: " + id);
		return;
	}
	
	monsterObj.gameID = monsterArr[0];
	monsterObj.name = monsterArr[1];
	monsterObj.model = monsterArr[2];
	monsterObj.position.x = monsterArr[3];
	monsterObj.position.z = monsterArr[4];
	monsterObj.position.y = 0;
	monsterObj.target.x = monsterObj.position.x;
	monsterObj.target.z = monsterObj.position.z;
	monsterObj.target.y = monsterObj.position.y;
	monsterObj.rotation = monsterArr[5];
	monsterObj.hp = monsterArr[6];
	monsterObj.ac = monsterArr[7];
	monsterObj.attack = monsterArr[8];
	monsterObj.dmg = monsterArr[9];
	monsterObj.pickables = [];

	//get js function from string
	var onPressFn = window[monsterArr[11]];
	if(typeof onPressFn === 'function') 
	{
		monsterObj.OnClick = onPressFn;
	}
	else
	{
		monsterObj.OnClick = missing_click_function;
	}
	//get js function from string
	var onPressItemFn = window[monsterArr[12]];
	if(typeof onPressItemFn === 'function') 
	{
		monsterObj.OnItemClick = onPressItemFn;
	}
	else
	{
		monsterObj.OnItemClick = missing_click_function;
	}

	for (var mp = 0; mp < monsterArr[10].length; mp++)
	{
		var monsterPickableGameID = monsterArr[10][mp].gameID;
		console.log("monsterPickableGameID: " + monsterPickableGameID);
		monsterObj.pickables.push({"gameID":monsterPickableGameID});
	}
	
	//animation keyframes
	if(monsterArr.length > 18)
	{
		monsterObj.idle_startKeyframe = monsterArr[13];
		monsterObj.idle_endKeyframe = monsterArr[14];
		monsterObj.attack_startKeyframe = monsterArr[15];
		monsterObj.attack_endKeyframe = monsterArr[16];
		monsterObj.walk_startKeyframe = monsterArr[17];
		monsterObj.walk_endKeyframe = monsterArr[18];
	}

	if(monsterArr.length > 19)
	{
		monsterObj.mood = monsterArr[19];
	}
	
	//audio
	var source_monster_wound = document.createElement('source');
	source_monster_wound.src = monsterArr[20];
	monsterObj.audio_monster_wound.appendChild(source_monster_wound);
	var source_monster_dies = document.createElement('source');
	source_monster_dies.src = monsterArr[21];
	monsterObj.audio_monster_dies.appendChild(source_monster_dies);
	var source_monster_roar = document.createElement('source');
	source_monster_roar.src = monsterArr[22];
	monsterObj.audio_monster_roar.appendChild(source_monster_roar);
	var source_monster_attack = document.createElement('source');
	source_monster_attack.src = monsterArr[23];
	monsterObj.audio_monster_attack.appendChild(source_monster_attack);
	var source_monster_click = document.createElement('source');
	source_monster_click.src = monsterArr[24];
	monsterObj.audio_monster_click.appendChild(source_monster_click);

	
	//console.log("loading monstere " + i);
	
}

function load_saved_monsters (loader,levelObj,saved_monsters_arr) {

	for (i=0; i<saved_monsters_arr.length; i++)
	{
		//var level_monster = getMonsterFromLevelArrayByID(levelObj, saved_monsters_arr[i].gameID);
		var munster = new Monster();
		loadMonsterDataFromLevelArray(munster,levelObj,saved_monsters_arr[i].gameID);
		munster.position.x = saved_monsters_arr[i].position.x;
		munster.position.z = saved_monsters_arr[i].position.z;
		munster.position.y = 0;
		munster.target.x = munster.position.x;
		munster.target.z = munster.position.z;
		munster.target.y = munster.position.y;
		munster.rotation = saved_monsters_arr[i].rotation;
		munster.pickables = saved_monsters_arr[i].pickables;
		munster.hp = saved_monsters_arr[i].hp;
		munster.mood = saved_monsters_arr[i].mood;

		loadMonsterCheck(loader,munster);

		levelObj.array_of_monsters.push(munster);
	}
}

function reload_monsters (levelObj)
{
	for(var i=0; i<levelObj.array_of_monsters.length;i++)
	{
		scene.add(levelObj.array_of_monsters[i].mesh);
	}
}
				
//load monsters on the map
function load_monsters (loader, levelObj)
{
	for(var i=0; i<levelObj.monsterArr.length; i++) {
		var munster = new Monster();
		munster.gameID = levelObj.monsterArr[i][0];
		munster.name = levelObj.monsterArr[i][1];
		munster.model = levelObj.monsterArr[i][2];
		munster.position.x = levelObj.monsterArr[i][3];
		munster.position.z = levelObj.monsterArr[i][4];
		munster.position.y = 0;
		munster.target.x = munster.position.x;
		munster.target.z = munster.position.z;
		munster.target.y = munster.position.y;
		munster.rotation = levelObj.monsterArr[i][5];
		munster.hp = levelObj.monsterArr[i][6];
		munster.ac = levelObj.monsterArr[i][7];
		munster.attack = levelObj.monsterArr[i][8];
		munster.dmg = levelObj.monsterArr[i][9];
		munster.pickables = [];

		for (var mp = 0; mp < levelObj.monsterArr[i][10].length; mp++)
		{
			var monsterPickableGameID = levelObj.monsterArr[i][10][mp].gameID;
			console.log("monsterPickableGameID: " + monsterPickableGameID);
			munster.pickables.push({"gameID":monsterPickableGameID});
		}
		
		//get js function from string
		var onPressFn = window[levelObj.monsterArr[i][11]];
		if(typeof onPressFn === 'function') 
		{
			munster.OnClick = onPressFn;
		}
		else
		{
			munster.OnClick = missing_click_function;
		}
		//get js function from string
		var onPressItemFn = window[levelObj.monsterArr[i][12]];
		if(typeof onPressItemFn === 'function') 
		{
			munster.OnItemClick = onPressItemFn;
		}
		else
		{
			munster.OnItemClick = missing_click_function;
		}
		
		//animation keyframes
		if(levelObj.monsterArr[i].length > 18)
		{
			munster.idle_startKeyframe = levelObj.monsterArr[i][13];
			munster.idle_endKeyframe = levelObj.monsterArr[i][14];
			munster.attack_startKeyframe = levelObj.monsterArr[i][15];
			munster.attack_endKeyframe = levelObj.monsterArr[i][16];
			munster.walk_startKeyframe = levelObj.monsterArr[i][17];
			munster.walk_endKeyframe = levelObj.monsterArr[i][18];
		}

		if(levelObj.monsterArr[i].length > 19)
		{
			munster.mood = levelObj.monsterArr[i][19];
		}
		
		//audio
		var source_monster_wound = document.createElement('source');
		source_monster_wound.src = levelObj.monsterArr[i][20];
		munster.audio_monster_wound.appendChild(source_monster_wound);
		var source_monster_dies = document.createElement('source');
		source_monster_dies.src = levelObj.monsterArr[i][21];
		munster.audio_monster_dies.appendChild(source_monster_dies);
		var source_monster_roar = document.createElement('source');
		source_monster_roar.src = levelObj.monsterArr[i][22];
		munster.audio_monster_roar.appendChild(source_monster_roar);
		var source_monster_attack = document.createElement('source');
		source_monster_attack.src = levelObj.monsterArr[i][23];
		munster.audio_monster_attack.appendChild(source_monster_attack);
		var source_monster_click = document.createElement('source');
		source_monster_click.src = levelObj.monsterArr[i][24];
		munster.audio_monster_click.appendChild(source_monster_click);

		//console.log("loading monstere " + i);
		
		loadMonsterCheck(loader,munster);
		//loader.load( munster.model, munster.loadObject(munster) );
		
		levelObj.array_of_monsters.push(munster);

	}

}

//find player
Monster.prototype.find_player = function ( player_pos ) {

	if(!this.alive)
		return;
	
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
			if(this.first_roar == false)
			{
				this.first_roar = true;
				this.audio_monster_roar.play();
			}
			
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
						this.hitting.x = this.target.x;
						this.hitting.z = this.target.z;
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
						this.hitting.x = this.target.x;
						this.hitting.z = this.target.z;
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
						this.hitting.x = this.target.x;
						this.hitting.z = this.target.z;
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
						this.hitting.x = this.target.x;
						this.hitting.z = this.target.z;
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
			//console.log("diagonal, too far away");
			this.mesh.duration = IDLE_ANIM_DURATION;
			this.mesh.setFrameRange(this.idle_startKeyframe,this.idle_endKeyframe);
		}
	}
	//}
};


//find path to position
Monster.prototype.find_path = function ( destination_position ) {

	if(!this.alive)
		return;
	
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



//move monster by small amount and check if it reached destination
Monster.prototype.move = function ( delta ) {

	if(!this.alive)
		return;
	
	if(this.should_attack)
	{
		//if the moment is right, make some attack roll
		if(this.mesh.currentKeyframe == MONSTER_ATTACK_FRAME)
		{
			this.should_attack = false;
			console.log("attack!" + delta);
			
			// soundy Play hack attack sound
			this.audio_monster_attack.play();
				
			//check if player moved already from that position
			if((this.hitting.x == current_position.x)&&(this.hitting.z == current_position.z))
			{
				//roll monster attack
				var att_roll = 50*Math.random()+this.attack;
				if(att_roll>PlayerDefense)
				{
					var dmg_roll = Math.round(this.dmg * Math.random()) + 1;
					playerHPcurrent -= dmg_roll;
					player_wound_div.style.display = "inline-block";
					player_wound_div.innerHTML = dmg_roll;
					addToConsole("Monster hits player: " + dmg_roll + " damage!","red");
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
							show_message("<br><br>You have been defeated by demotivated little elemental.. <br><br>All you can do now is restart! <br><br><br>  <button onclick='location.reload();'> Restart </button>  &nbsp;&nbsp; <input type='button' value=' Load ' disabled>", 550, 350, "url(media/pannel_small.png)", "Copperplate, 'Copperplate Gothic Light', Garamond, Baskerville", "#ddddd0", "400", "20px");
						}
						else if(this.name == "Rock Golem")
						{
							show_message("<br><br>You have been smitten by overpowered stone pile! <br><br>All you can do now is restart! <br><br><br>  <button onclick='location.reload();'> Restart </button>  &nbsp;&nbsp; <input type='button' value=' Load ' disabled>", 550, 350, "url(media/pannel_small.png)", "Copperplate, 'Copperplate Gothic Light', Garamond, Baskerville", "#ddddd0", "400", "20px");
						}
						else
						{
							//show_message("<br><br>You have been killed! <br><br>All you can do now is restart! <br><br><br>  <div id='info_dialog_button_container' style='margin:auto; padding-top:9px;> <div id='info_dialog_button' style='cursor: pointer; float:left; margin:auto; padding-top:9px; font-size:14px; width:94px; height: 25px; background: #00c url(media/gui/buttons.png); background-size: 100% 100%;' onclick='location.reload();'> Restart </div>&nbsp;&nbsp; <div id='info_dialog_button2' style='cursor: pointer; float:left; font-size:14px; width:94px; height: 25px; background: #00c url(media/gui/buttons.png); background-size: 100% 100%;' onclick='location.reload();'> Load </div> </div>", 550, 350, "url(media/gui/dialog2.png)", "Copperplate, 'Copperplate Gothic Light', Garamond, Baskerville", "#ddddd0", "400", "20px");
							if(saved_game)
								show_message("<br><br>You have been killed! <br><br>You can Load saved game or Restart! <br><br><br> <div id='info_dialog_button_container' style='margin:auto; width:230px;'> <div id='info_dialog_button' style='cursor: pointer; padding-top:9px; float:left; font-size:14px; width:94px; height: 25px; background: #00c url(media/gui/buttons.png); background-size: 100% 100%;' onclick='newGame();'> Restart </div> <div id='info_dialog_button2' style='float:left; width:30px; height:25px; '></div> <div id='info_dialog_button3' style='cursor: pointer; float:left; padding-top:9px; right:0px; font-size:14px; width:94px; height: 25px; background: #00c url(media/gui/buttons.png); background-size: 100% 100%;' onclick='loadGame();'> Load </div> </div>", 550, 350, "url(media/gui/dialog2.png)", "Copperplate, 'Copperplate Gothic Light', Garamond, Baskerville", "#ddddd0", "400", "20px");
							else
								show_message("<br><br>You have been killed! <br><br>All you can do now is restart! <br><br><br> <div id='info_dialog_button_container' style='margin:auto; width:230px;'> <div id='info_dialog_button' style='cursor: pointer; padding-top:9px; float:left; font-size:14px; width:94px; height: 25px; background: #00c url(media/gui/buttons.png); background-size: 100% 100%;' onclick='newGame();'> Restart </div> <div id='info_dialog_button2' style='float:left; width:30px; height:25px; '></div> <div id='info_dialog_button3' style='float:left; padding-top:9px; right:0px; font-size:14px; width:94px; height: 25px; background: #00c url(media/gui/buttons.png); opacity:0.3; -moz-opacity: 0.3; background-size: 100% 100%;'> Load </div> </div>", 550, 350, "url(media/gui/dialog2.png)", "Copperplate, 'Copperplate Gothic Light', Garamond, Baskerville", "#ddddd0", "400", "20px");
						}
					}
					else
					{
						console.log("monster hits player: " + playerHPcurrent);
						//update player health bar
						updatePlayerHealthBar();
					}
				}
				else
				{
					//miss
				}
			}
			else
			{
				console.log("player escaped!");
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
