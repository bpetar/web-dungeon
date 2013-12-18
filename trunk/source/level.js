

function loadDoorways( geometry, materials ) {

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
			
function loadDoors( geometry, materials ) {

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

//load floors and walls and holes and niches and all basic and static level elements
function load_level()
{
	var loader = new THREE.JSONLoader();

	loader.load( doorway_model, loadDoorways );
	loader.load( door_model, loadDoors );

	var mpos = new THREE.Vector3(160, 0, 10);
	var mrot = new THREE.Vector3(0, 0, 0);
	loader.load( "models/plynth.js", loadModel(mpos,mrot) );
	
	var mpos = new THREE.Vector3(155, 0, 15);
	var mrot = new THREE.Vector3(0, 0, 0);
	loader.load( "models/pillar.js", loadModel(mpos,mrot) );
	var mpos = new THREE.Vector3(155, 0, 5);
	var mrot = new THREE.Vector3(0, 0, 0);
	loader.load( "models/pillar.js", loadModel(mpos,mrot) );
	var mpos = new THREE.Vector3(165, 0, 15);
	var mrot = new THREE.Vector3(0, 0, 0);
	loader.load( "models/pillar.js", loadModel(mpos,mrot) );
	var mpos = new THREE.Vector3(165, 0, 5);
	var mrot = new THREE.Vector3(0, 0, 0);
	loader.load( "models/pillar.js", loadModel(mpos,mrot) );
	var mpos = new THREE.Vector3(165, 0, 25);
	var mrot = new THREE.Vector3(0, 0, 0);
	loader.load( "models/pillar.js", loadModel(mpos,mrot) );
	var mpos = new THREE.Vector3(155, 0, 25);
	var mrot = new THREE.Vector3(0, 0, 0);
	loader.load( "models/pillar.js", loadModel(mpos,mrot) );
	
	var map = THREE.ImageUtils.loadTexture( floor_texture_file );
	var teleport_map = THREE.ImageUtils.loadTexture( teleport_floor_texture_file );
	map.wrapS = map.wrapT = THREE.RepeatWrapping;
	map.anisotropy = 16;
	
	//teleport_map.wrapS = map.wrapT = THREE.RepeatWrapping;
	teleport_map.anisotropy = 16;

	var material = new THREE.MeshLambertMaterial( { ambient: 0xbbbbbb, map: map, side: THREE.DoubleSide } );
	
	var teleport_material = new THREE.MeshLambertMaterial( { ambient: 0xbbbbbb, map: teleport_map, side: THREE.DoubleSide } );

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
			if(positionIsTeleport(floorsArr2D[i][0], floorsArr2D[i][1]))
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
		object = new THREE.Mesh( new THREE.PlaneGeometry( SQUARE_SIZE, SQUARE_SIZE, 1, 1 ), material );
		//object.position.set( 0-i*SQUARE_SIZE, -1, 0 );
		object.rotation.set(-Math.PI/2, 0, 0);
		object.receiveShadow = true;
		
	
		object.position.x = floorsArr2D[i][0]*SQUARE_SIZE; //x
		object.position.y = 0.8*SQUARE_SIZE; //y
		object.position.z = floorsArr2D[i][1]*SQUARE_SIZE; //z

		scene.add( object );
	}
	
	//walls
	
	//wall texture
	map = THREE.ImageUtils.loadTexture( wall_texture_file );
	map.wrapS = map.wrapT = THREE.RepeatWrapping;
	map.anisotropy = 16;
	material = new THREE.MeshLambertMaterial( { ambient: 0xbbbbbb, map: map, side: THREE.DoubleSide } );
	
	//writting on the wall texture
	var mapwrit = THREE.ImageUtils.loadTexture( wall_writting_texture_file );
	mapwrit.wrapS = mapwrit.wrapT = THREE.RepeatWrapping;
	mapwrit.anisotropy = 16;
	materialwrit = new THREE.MeshLambertMaterial( { ambient: 0xbbbbbb, map: mapwrit, side: THREE.DoubleSide } );
	
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
			scene.add( object );
		}
	}
	
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
				var writtingIsOnTheWall = false;
				//loop writtingsArr
				for (var n=0; n<writtingsArr.length; n++)
				{
					if((writtingsArr[n][0] == floorsArr2D[i][0])&&(writtingsArr[n][1] == floorsArr2D[i][1])&&(writtingsArr[n][2] == 3))
					{
						writtingIsOnTheWall = true;
					}
				}
				
				if(writtingIsOnTheWall)
				{
					//load wall with writting
					object = new THREE.Mesh( new THREE.PlaneGeometry( SQUARE_SIZE, 0.8*SQUARE_SIZE, 1, 1 ), materialwrit );
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
				var writtingIsOnTheWall = false;
				//loop writtingsArr
				for (var n=0; n<writtingsArr.length; n++)
				{
					if((writtingsArr[n][0] == floorsArr2D[i][0])&&(writtingsArr[n][1] == floorsArr2D[i][1])&&(writtingsArr[n][2] == 1))
					{
						writtingIsOnTheWall = true;
					}
				}
				
				if(writtingIsOnTheWall)
				{
					//load wall with writting
					object = new THREE.Mesh( new THREE.PlaneGeometry( SQUARE_SIZE, 0.8*SQUARE_SIZE, 1, 1 ), materialwrit );
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
				var writtingIsOnTheWall = false;
				//loop writtingsArr
				for (var n=0; n<writtingsArr.length; n++)
				{
					if((writtingsArr[n][0] == floorsArr2D[i][0])&&(writtingsArr[n][1] == floorsArr2D[i][1])&&(writtingsArr[n][2] == 0))
					{
						writtingIsOnTheWall = true;
					}
				}
				
				if(writtingIsOnTheWall)
				{
					//load wall with writting
					object = new THREE.Mesh( new THREE.PlaneGeometry( SQUARE_SIZE, 0.8*SQUARE_SIZE, 1, 1 ), materialwrit );
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
				var writtingIsOnTheWall = false;
				//loop writtingsArr
				for (var n=0; n<writtingsArr.length; n++)
				{
					if((writtingsArr[n][0] == floorsArr2D[i][0])&&(writtingsArr[n][1] == floorsArr2D[i][1])&&(writtingsArr[n][2] == 2))
					{
						writtingIsOnTheWall = true;
					}
				}
				
				if(writtingIsOnTheWall)
				{
					//load wall with writting
					object = new THREE.Mesh( new THREE.PlaneGeometry( SQUARE_SIZE, 0.8*SQUARE_SIZE, 1, 1 ), materialwrit );
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
