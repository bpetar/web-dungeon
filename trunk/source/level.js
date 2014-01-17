
var array_of_decorPillars = [];

function decorPillarAlreadyAdded (decorPil)
{
	for(var i=0; i<array_of_decorPillars.length; i++)
	{
		if((array_of_decorPillars[i].x == decorPil.x) && (array_of_decorPillars[i].z == decorPil.z))
		{
			return true;
		}
	}
	return false;
}

function addPillar(loader, x, z)
{
	var decorPil = new THREE.Vector3(x, 0, z);
	if(!decorPillarAlreadyAdded(decorPil))
	{
		array_of_decorPillars.push(decorPil);
		console.log("pillar added, x:" + decorPil.x + ", z:" + decorPil.z);
		
		var decorPillarke = create_game_object();
		decorPillarke.name = "decorPillar";

		decorPillarke.position.y = 0;
		decorPillarke.position.x = x;
		decorPillarke.position.z = z;

		if((typeof decorPillarModel != 'undefined') && (decorPillarModel != ""))
		{
			loader.load( decorPillarModel, decorPillarke.loadObject(decorPillarke) );
		}
	}
	else
	{
		console.log("pillar alredy in the queue, x:" + decorPil.x + ", z:" + decorPil.z);
	}
}

function loadDoorways( geometry, materials )
{

	materials[ 0 ].shading = THREE.FlatShading;

	for(var i=0; i<doorsArr3D.length; i++)
	{
		mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
		mesh.position.x = doorsArr3D[i][0]*10;
		mesh.position.z = doorsArr3D[i][1]*10;
		mesh.position.y = 0;
		if((doorsArr3D[i][2] == 1) || (doorsArr3D[i][2] == 3))
		{
			mesh.rotation.set(0,0, 0);
		}
		else
		{
			mesh.rotation.set(0,Math.PI/2, 0);
		}
		mesh.castShadow = true;
		mesh.scale.x = mesh.scale.y = mesh.scale.z = 1;
		scene.add( mesh );
	}
}
			
function loadDoors( geometry, materials )
{

	materials[ 0 ].shading = THREE.FlatShading;

	for(var i=0; i<doorsArr3D.length; i++)
	{
		doorsArr3D[i][4] = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
		doorsArr3D[i][4].position.x = doorsArr3D[i][0]*10;
		doorsArr3D[i][4].position.z = doorsArr3D[i][1]*10;
		doorsArr3D[i][4].position.y = 0;
		if((doorsArr3D[i][2] == 1) || (doorsArr3D[i][2] == 3))
		{
			doorsArr3D[i][4].rotation.set(0,0,0);
		}
		else
		{
			doorsArr3D[i][4].rotation.set(0,Math.PI/2,0);
		}
		
		doorsArr3D[i][4].castShadow = true;
		doorsArr3D[i][4].scale.x = doorsArr3D[i][4].scale.y = doorsArr3D[i][4].scale.z = 1;
		scene.add( doorsArr3D[i][4] );
	}
}

var array_of_pillars = [];

//load floors and walls and holes and niches and all basic and static level elements
function load_level()
{
	var loader = new THREE.JSONLoader();

	if((typeof doorsArr3D != 'undefined') && (doorsArr3D.length > 0))
	{
		loader.load( doorway_model, loadDoorways );
		loader.load( door_model, loadDoors );
	}
	
	//pillars
	if(typeof pillar_array != 'undefined')
	{
		for(var i=0; i<pillar_array.length; i++) {

			var pillarke = create_game_object();
			pillarke.gameID = pillar_array[i][0];
			pillarke.name = "pillar" + i;
			pillarke.model = pillar_array[i][1];

			pillarke.position.y = 0;
			pillarke.position.x = pillar_array[i][2]*SQUARE_SIZE;
			pillarke.position.z = pillar_array[i][3]*SQUARE_SIZE;

			loader.load( pillarke.model, pillarke.loadObject(pillarke) );
			
			array_of_pillars.push(pillarke);
		}
	}
	
	//show_model(loader, "models/spears.js", 15,0);
	
	load_props();
	
	var map = THREE.ImageUtils.loadTexture( floor_texture_file );
	map.wrapS = map.wrapT = THREE.RepeatWrapping;
	map.anisotropy = 16;
	
	//teleport
	if(teleport_array.length > 0)
	{
		var teleport_map = THREE.ImageUtils.loadTexture( teleport_floor_texture_file );
		teleport_map.anisotropy = 16;
		var teleport_material = new THREE.MeshLambertMaterial( { ambient: 0xbbbbbb, map: teleport_map, side: THREE.DoubleSide } );
	}
	
	var material = new THREE.MeshLambertMaterial( { ambient: 0xbbbbbb, map: map, side: THREE.DoubleSide } );
	

	//floors
	for(var i=0; i < floorsArr2D.length; i++)
	{
		holeSpot = false;
		for (var h=0; h<holesArr.length; h++)
		{
			if((holesArr[h][0] == floorsArr2D[i][0]) && (holesArr[h][1] == floorsArr2D[i][1]))
			holeSpot = true;
		}
		//if this floor tile is hole, make a hole, else make floor
		
		if(holeSpot)
		{
			//add hole model
			var pos = new THREE.Vector3(0, 0, 0);
			var rot = new THREE.Vector3(0, 0, 0);
			pos.x = floorsArr2D[i][0]*SQUARE_SIZE;
			pos.z = floorsArr2D[i][1]*SQUARE_SIZE;
			loader.load( hole_model, loadModel(pos,rot) );
		}
		else
		{
			//add floor tile
			if((teleport_array.length > 0) && (positionIsTeleport(floorsArr2D[i][0], floorsArr2D[i][1])))
			{
				object = new THREE.Mesh( new THREE.PlaneGeometry( SQUARE_SIZE, SQUARE_SIZE, 1, 1 ), teleport_material );
			}
			else
			{
				object = new THREE.Mesh( new THREE.PlaneGeometry( SQUARE_SIZE, SQUARE_SIZE, 1, 1 ), material );
			}
			object.rotation.set(-Math.PI/2, 0, 0);
			object.receiveShadow = true;
			
			object.position.x = floorsArr2D[i][0]*SQUARE_SIZE; //x
			object.position.y = 0; //y
			object.position.z = floorsArr2D[i][1]*SQUARE_SIZE; //z
	
			scene.add( object );
		}
	}
	
	//ceiling
	
	map = THREE.ImageUtils.loadTexture( ceiling_texture_file );
	map.wrapS = map.wrapT = THREE.RepeatWrapping;
	map.anisotropy = 16;
	material = new THREE.MeshLambertMaterial( { ambient: 0xbbbbbb, map: map, side: THREE.DoubleSide } );
	for(i=0; i < floorsArr2D.length; i++)
	{
		var holeAboveSpot = false;
		if(typeof holesAboveArr != 'undefined')
		{
			for (var h=0; h<holesAboveArr.length; h++)
			{
				if((holesAboveArr[h][0] == floorsArr2D[i][0]) && (holesAboveArr[h][1] == floorsArr2D[i][1]))
				holeAboveSpot = true;
			}
		}
		//if this ceiling tile is hole above, make a hole above, else make ceiling
		
		if(holeAboveSpot)
		{
			//add hole model
			var pos = new THREE.Vector3(0, 0, 0);
			var rot = new THREE.Vector3(Math.PI, 0, 0);
			pos.x = floorsArr2D[i][0]*SQUARE_SIZE;
			pos.z = floorsArr2D[i][1]*SQUARE_SIZE;
			pos.y = 8;
			loader.load( hole_above_model, loadModel(pos,rot) );
		}
		else
		{
		
			object = new THREE.Mesh( new THREE.PlaneGeometry( SQUARE_SIZE, SQUARE_SIZE, 1, 1 ), material );
			//object.position.set( 0-i*SQUARE_SIZE, -1, 0 );
			object.rotation.set(-Math.PI/2, 0, 0);
			object.receiveShadow = true;
			
		
			object.position.x = floorsArr2D[i][0]*SQUARE_SIZE; //x
			object.position.y = 0.8*SQUARE_SIZE; //y
			object.position.z = floorsArr2D[i][1]*SQUARE_SIZE; //z

			scene.add( object );
		}
	}
	
	//walls
	
	//wall texture
	map = THREE.ImageUtils.loadTexture( wall_texture_file );
	map.wrapS = map.wrapT = THREE.RepeatWrapping;
	map.anisotropy = 16;
	material = new THREE.MeshLambertMaterial( { ambient: 0xbbbbbb, map: map, side: THREE.DoubleSide } );
	
	//writting on the wall texture
	if(writtingsArr.length>0)
	{
		var mapwrit = THREE.ImageUtils.loadTexture( wall_writting_texture_file );
		mapwrit.wrapS = mapwrit.wrapT = THREE.RepeatWrapping;
		mapwrit.anisotropy = 16;
		materialwrit = new THREE.MeshLambertMaterial( { ambient: 0xbbbbbb, map: mapwrit, side: THREE.DoubleSide } );
	}
	
	//secret walls
	for(var s=0; s<secretWallsArr.length; s++)
	{
		//place wall depending on orientation
		if(secretWallsArr[s][2] == 3)
		{
			//left secret wall
			object = new THREE.Mesh( new THREE.PlaneGeometry( SQUARE_SIZE, 0.8*SQUARE_SIZE, 1, 1 ), material );
			object.rotation.set(0, Math.PI/2, 0);
			object.receiveShadow = true;
			object.position.x = (secretWallsArr[s][0]+0.5)*SQUARE_SIZE; //x
			object.position.y = 0.4*SQUARE_SIZE; //y
			object.position.z = (secretWallsArr[s][1])*SQUARE_SIZE; //z
			if(secretWallsArr[s].length > 3)
			{
				secretWallsArr[s][3] = object;
			}
			scene.add( object );
		}
	}
	
	//buttons
	load_buttons();
	
	//keyholes
	load_keyholes();
	
	//regular walls
	for(i=0; i < floorsArr2D.length; i++)
	{
		var leftWall = true;
		var rightWall = true;
		var frontWall = true;
		var backWall = true;
		var xTile = floorsArr2D[i][0];
		var yTile = floorsArr2D[i][1];
		//make walls around floor tile, but check if it has neighboring tile..
		for(j=0; j < floorsArr2D.length; j++)
		{
			if(i!=j)
			{
				if((floorsArr2D[j][0] == xTile+1) && (floorsArr2D[j][1] == yTile))
				{
					//there is floor tile to the left - no LeftWall.
					leftWall = false;
				}
				if((floorsArr2D[j][0] == xTile-1) && (floorsArr2D[j][1] == yTile))
				{
					//there is floor tile to the right - no RightWall.
					rightWall = false;
				}
				if((floorsArr2D[j][0] == xTile) && (floorsArr2D[j][1] == yTile+1))
				{
					//there is floor tile to the front - no FrontWall.
					frontWall = false;
				}
				if((floorsArr2D[j][0] == xTile) && (floorsArr2D[j][1] == yTile-1))
				{
					//there is floor tile to the back - no BackWall.
					backWall = false;
				}
			}
		}
		
		if(leftWall)
		{
			//pillars
			var x1 = (floorsArr2D[i][0])*SQUARE_SIZE+5;
			var x2 = (floorsArr2D[i][0])*SQUARE_SIZE+5;
			var z1 = (floorsArr2D[i][1])*SQUARE_SIZE+5;
			var z2 = (floorsArr2D[i][1])*SQUARE_SIZE-5;
			addPillar(loader,x1,z1);
			addPillar(loader,x2,z2);

			var nicheIsOnTheWall = false;
			//loop nicheArr
			for (var n=0; n<nicheArr.length; n++)
			{
				if((nicheArr[n][0] == floorsArr2D[i][0])&&(nicheArr[n][1] == floorsArr2D[i][1])&&(nicheArr[n][2] == 3))
				{
					nicheIsOnTheWall = true;
				}
			}
			
			if(nicheIsOnTheWall)
			{
				//load niche model instead of regular wall
				var pos = new THREE.Vector3(0, 0, 0);
				var rot = new THREE.Vector3(0, 0, 0);
				pos.set((floorsArr2D[i][0]+0.5)*SQUARE_SIZE,0.4*SQUARE_SIZE,(floorsArr2D[i][1])*SQUARE_SIZE);
				rot.set(0, -Math.PI/2, 0);
				loader.load( niche_model, loadModel(pos, rot) );
			}
			else
			{
				//check if writting is on the wall
				var writtingIsOnTheWall = -1;
				//loop writtingsArr
				for (var n=0; n<writtingsArr.length; n++)
				{
					if((writtingsArr[n][0] == floorsArr2D[i][0])&&(writtingsArr[n][1] == floorsArr2D[i][1])&&(writtingsArr[n][2] == 3))
					{
						writtingIsOnTheWall = n;
					}
				}
				
				if(writtingIsOnTheWall > -1)
				{
					//load wall with writting
					object = new THREE.Mesh( new THREE.PlaneGeometry( SQUARE_SIZE, 0.8*SQUARE_SIZE, 1, 1 ), materialwrit );
					writtingsArr[writtingIsOnTheWall][4] = object;
				}
				else
				{
					//load regular wall
					object = new THREE.Mesh( new THREE.PlaneGeometry( SQUARE_SIZE, 0.8*SQUARE_SIZE, 1, 1 ), material );
				}
				//object.position.set( 0-i*SQUARE_SIZE, -1, 0 );
				object.rotation.set(0, Math.PI/2, 0);
				object.receiveShadow = true;
				object.position.x = (floorsArr2D[i][0]+0.5)*SQUARE_SIZE; //x
				object.position.y = 0.4*SQUARE_SIZE; //y
				object.position.z = (floorsArr2D[i][1])*SQUARE_SIZE; //z
				scene.add( object );
				
			}
		}
		if(rightWall)
		{
			//pillars
			var x1 = (floorsArr2D[i][0])*SQUARE_SIZE-5;
			var x2 = (floorsArr2D[i][0])*SQUARE_SIZE-5;
			var z1 = (floorsArr2D[i][1])*SQUARE_SIZE+5;
			var z2 = (floorsArr2D[i][1])*SQUARE_SIZE-5;
			addPillar(loader,x1,z1);
			addPillar(loader,x2,z2);

			var nicheIsOnTheWall = false;
			//loop nicheArr
			for (var n=0; n<nicheArr.length; n++)
			{
				if((nicheArr[n][0] == floorsArr2D[i][0])&&(nicheArr[n][1] == floorsArr2D[i][1])&&(nicheArr[n][2] == 1))
				{
					nicheIsOnTheWall = true;
				}
			}
			
			if(nicheIsOnTheWall)
			{
				//load niche model instead of regular wall
				var pos = new THREE.Vector3(0, 0, 0);
				var rot = new THREE.Vector3(0, 0, 0);
				pos.set((floorsArr2D[i][0]-0.5)*SQUARE_SIZE,0.4*SQUARE_SIZE,(floorsArr2D[i][1])*SQUARE_SIZE);
				rot.set(0, Math.PI/2, 0);
				loader.load( niche_model, loadModel(pos, rot) );
			}
			else
			{
				//check if writting is on the wall
				var writtingIsOnTheWall = -1;
				//loop writtingsArr
				for (var n=0; n<writtingsArr.length; n++)
				{
					if((writtingsArr[n][0] == floorsArr2D[i][0])&&(writtingsArr[n][1] == floorsArr2D[i][1])&&(writtingsArr[n][2] == 1))
					{
						writtingIsOnTheWall = n;
					}
				}
				
				if(writtingIsOnTheWall > -1)
				{
					//load wall with writting
					object = new THREE.Mesh( new THREE.PlaneGeometry( SQUARE_SIZE, 0.8*SQUARE_SIZE, 1, 1 ), materialwrit );
					writtingsArr[writtingIsOnTheWall][4] = object;
				}
				else
				{
					//load regular wall
					object = new THREE.Mesh( new THREE.PlaneGeometry( SQUARE_SIZE, 0.8*SQUARE_SIZE, 1, 1 ), material );
				}

				object.rotation.set(0, Math.PI/2, 0);
				object.receiveShadow = true;
				
			
				object.position.x = (floorsArr2D[i][0]-0.5)*SQUARE_SIZE; //x
				object.position.y = 0.4*SQUARE_SIZE; //y
				object.position.z = (floorsArr2D[i][1])*SQUARE_SIZE; //z
		
				scene.add( object );
			}
		}
		if(frontWall)
		{
			//pillars
			var x1 = (floorsArr2D[i][0])*SQUARE_SIZE+5;
			var x2 = (floorsArr2D[i][0])*SQUARE_SIZE-5;
			var z1 = (floorsArr2D[i][1])*SQUARE_SIZE+5;
			var z2 = (floorsArr2D[i][1])*SQUARE_SIZE+5;
			addPillar(loader,x1,z1);
			addPillar(loader,x2,z2);

			var nicheIsOnTheWall = false;
			//loop nicheArr
			for (var n=0; n<nicheArr.length; n++)
			{
				if((nicheArr[n][0] == floorsArr2D[i][0])&&(nicheArr[n][1] == floorsArr2D[i][1])&&(nicheArr[n][2] == 0))
				{
					nicheIsOnTheWall = true;
				}
			}
			
			if(nicheIsOnTheWall)
			{
				//load niche model instead of regular wall
				var pos = new THREE.Vector3(0, 0, 0);
				var rot = new THREE.Vector3(0, 0, 0);
				pos.set((floorsArr2D[i][0])*SQUARE_SIZE,0.4*SQUARE_SIZE,(floorsArr2D[i][1]+0.5)*SQUARE_SIZE);
				rot.set(0, Math.PI, 0);
				loader.load( niche_model, loadModel(pos, rot) );
			}
			else
			{
				//check if writting is on the wall
				var writtingIsOnTheWall = -1;
				//loop writtingsArr
				for (var n=0; n<writtingsArr.length; n++)
				{
					if((writtingsArr[n][0] == floorsArr2D[i][0])&&(writtingsArr[n][1] == floorsArr2D[i][1])&&(writtingsArr[n][2] == 0))
					{
						writtingIsOnTheWall = n;
					}
				}
				
				if(writtingIsOnTheWall > -1)
				{
					//load wall with writting
					object = new THREE.Mesh( new THREE.PlaneGeometry( SQUARE_SIZE, 0.8*SQUARE_SIZE, 1, 1 ), materialwrit );
					console.log("jojo " + n);
					writtingsArr[writtingIsOnTheWall][4] = object;
				}
				else
				{
					//load regular wall
					object = new THREE.Mesh( new THREE.PlaneGeometry( SQUARE_SIZE, 0.8*SQUARE_SIZE, 1, 1 ), material );
				}
				//object.position.set( 0-i*SQUARE_SIZE, -1, 0 );
				object.rotation.set(0, Math.PI, 0);
				object.receiveShadow = true;
				
			
				object.position.x = floorsArr2D[i][0]*SQUARE_SIZE; //x
				object.position.y = 0.4*SQUARE_SIZE; //y
				object.position.z = (floorsArr2D[i][1]+0.5)*SQUARE_SIZE; //z
		
				scene.add( object );
			}
		}
		if(backWall)
		{
			//pillars
			var x1 = (floorsArr2D[i][0])*SQUARE_SIZE+5;
			var x2 = (floorsArr2D[i][0])*SQUARE_SIZE-5;
			var z1 = (floorsArr2D[i][1])*SQUARE_SIZE-5;
			var z2 = (floorsArr2D[i][1])*SQUARE_SIZE-5;
			addPillar(loader,x1,z1);
			addPillar(loader,x2,z2);
			
			var nicheIsOnTheWall = false;
			//loop nicheArr
			for (var n=0; n<nicheArr.length; n++)
			{
				if((nicheArr[n][0] == floorsArr2D[i][0])&&(nicheArr[n][1] == floorsArr2D[i][1])&&(nicheArr[n][2] == 2))
				{
					nicheIsOnTheWall = true;
				}
			}
			
			if(nicheIsOnTheWall)
			{
				//load niche model instead of regular wall
				var pos = new THREE.Vector3(0, 0, 0);
				var rot = new THREE.Vector3(0, 0, 0);
				pos.set((floorsArr2D[i][0])*SQUARE_SIZE,0.4*SQUARE_SIZE,(floorsArr2D[i][1]-0.5)*SQUARE_SIZE);
				rot.set(0, 0, 0);
				loader.load( niche_model, loadModel(pos, rot) );
			}
			else
			{
				//check if writting is on the wall
				var writtingIsOnTheWall = -1;
				//loop writtingsArr
				for (var n=0; n<writtingsArr.length; n++)
				{
					if((writtingsArr[n][0] == floorsArr2D[i][0])&&(writtingsArr[n][1] == floorsArr2D[i][1])&&(writtingsArr[n][2] == 2))
					{
						writtingIsOnTheWall = n;
					}
				}
				
				if(writtingIsOnTheWall > -1)
				{
					//load wall with writting
					object = new THREE.Mesh( new THREE.PlaneGeometry( SQUARE_SIZE, 0.8*SQUARE_SIZE, 1, 1 ), materialwrit );
					writtingsArr[writtingIsOnTheWall][4] = object;
				}
				else
				{
					//load regular wall
					object = new THREE.Mesh( new THREE.PlaneGeometry( SQUARE_SIZE, 0.8*SQUARE_SIZE, 1, 1 ), material );
				}
				//object.position.set( 0-i*SQUARE_SIZE, -1, 0 );
				object.rotation.set(0, Math.PI, 0);
				object.receiveShadow = true;
				
			
				object.position.x = floorsArr2D[i][0]*SQUARE_SIZE; //x
				object.position.y = 0.4*SQUARE_SIZE; //y
				object.position.z = (floorsArr2D[i][1]-0.5)*SQUARE_SIZE; //z
		
				scene.add( object );
			}
		}
	}
}