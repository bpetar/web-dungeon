





//define basic properties for 3d object in game - wether its a monster, or pickable or container..
function create_game_object () {

	var gobject = new Object();
	
	//game object position is not updated with mesh position properly. this needs close attention.. do we need double position variable?
	gobject.position = new THREE.Vector3(0, 0, 0);
	gobject.rotation = new THREE.Vector3(0, 0, 0);
	gobject.scale = new THREE.Vector3(1, 1, 1);
	
	gobject.name = "unnamed";
	gobject.description = "unnamed";
	gobject.model = "unnamed";
	gobject.icon = "unnamed";
	gobject.slot = -1;
	gobject.id = 0;
	gobject.niched = -1;
	gobject.gameID = 0;
	gobject.orientation = 0;
	gobject.visible = true;
	gobject.pressed = false;
	gobject.mesh = 0;
	
	gobject.useHint = "Nothing seems to happen..";
	gobject.useScript = 0;
	gobject.consumable = false;

	//empty hand values
	gobject.weapon_speed = 3;
	gobject.weapon_dmg = 1;
	gobject.weapon_dmg_bonus = 0;
	gobject.weapon_attack_bonus = 0;
				
	gobject.name_id = 0;
	gobject.description_id = 0;
	gobject.loadObject = loadObject;
	
	return gobject;
}


//check if model is already being downloaded, and wait for it to download and clone it...
function loadGameObjectCheck(loader, gobject)
{
	//console.log("loadGameObjectCheck: " + gobject.name);
	var object = modelAlreadyLoaded(gobject.name);
	if(object != -1)
	{
		//already put to download
		//object loading is in progress
		//wait till object is loaded and link to it
		if(object == 0)
		{
			if(typeof modelWaiters[gobject.name] == 'undefined')
			{
				modelWaiters[gobject.name] = new Array();
			}
			modelWaiters[gobject.name].push(gobject);
			return;
		}
		
		console.log("loadGameObjectCheck, model loaded!: " + gobject.name);
		gobject.mesh = object.clone();
		gobject.mesh.position = gobject.position;
		gobject.mesh.rotation = gobject.rotation;
		gobject.id=gobject.mesh.id;
		gobject.mesh.visible = gobject.visible;
		scene.add( gobject.mesh );		
	}
	else
	{
		//download it first time..
		loaded3Dmodels.push([gobject.name,0]);
		loader.load( gobject.model, gobject.loadObject(gobject) );
		console.log("loadGameObjectCheck loading first time: " + gobject.name);
	}
	
}

//load 3d mesh callback function
function loadObject( gobject ) {
	return function (geometry, materials ) {

			console.log("loadObject : " + gobject.name);
			
			materials[ 0 ].shading = THREE.FlatShading;
			gobject.mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
			
			for(var i=0; i< loaded3Dmodels.length; i++)
			{
				if(loaded3Dmodels[i][0] == gobject.name)
				{
					//set loaded model
					loaded3Dmodels[i][1] = gobject.mesh;
				}
			}
			
			gobject.mesh.position = gobject.position;
			gobject.mesh.rotation = gobject.rotation;
			gobject.mesh.name = gobject.name;
			gobject.id = gobject.mesh.id;
			gobject.mesh.visible = gobject.visible;
			scene.add( gobject.mesh );
		
			if(typeof modelWaiters[gobject.name] != 'undefined')
			{
				//console.log("loadModel waiters are existing " + gobject.name);
				for (var i=0; i< modelWaiters[gobject.name].length; i++)
				{
					console.log("loadModel waiter cloned: " + gobject.name);
					var waitingGobject = modelWaiters[gobject.name][i];
					var clone = gobject.mesh.clone();
					clone.position = waitingGobject.position;
					clone.rotation = waitingGobject.rotation;
					waitingGobject.mesh = clone;
					waitingGobject.id = clone.id;
					scene.add( clone );
				}
			}
	}
}