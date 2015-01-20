
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
	if((typeof decorPillarModel != 'undefined') && (decorPillarModel != ""))
	{
		var decorPil = new THREE.Vector3(x, 0, z);
		if(!decorPillarAlreadyAdded(decorPil))
		{
			array_of_decorPillars.push(decorPil);
			
			var decorPillarke = create_game_object();
			decorPillarke.name = "decorPillar";
			decorPillarke.model = decorPillarModel;

			decorPillarke.position.y = 0;
			decorPillarke.position.x = x;
			decorPillarke.position.z = z;

			loadGameObjectCheck(loader, decorPillarke);
			//loader.load( decorPillarModel, decorPillarke.loadObject(decorPillarke) );
		}
	}
}

function loadDoorways( geometry, materials )
{

	materials[ 0 ].shading = THREE.FlatShading;

	//first door are created, others are cloned..
	var doorwayMesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
	doorwayMesh.position.x = doorsArr3D[0][0]*10;
	doorwayMesh.position.z = doorsArr3D[0][1]*10;
	doorwayMesh.position.y = 0;
	if(doorsArr3D[0][2] == 0)
	{
		doorwayMesh.rotation.set(0,0,0);
	}
	else if(doorsArr3D[0][2] == 1) 
	{
		doorwayMesh.rotation.set(0,Math.PI*3/2,0);
	}
	else if(doorsArr3D[0][2] == 2) 
	{
		doorwayMesh.rotation.set(0,Math.PI,0);
	}
	else if(doorsArr3D[0][2] == 3) 
	{
		doorwayMesh.rotation.set(0,Math.PI/2,0);
	}
	//mesh.castShadow = true;
	doorwayMesh.scale.x = doorwayMesh.scale.y = doorwayMesh.scale.z = 1;
	scene.add( doorwayMesh );
		
	for(var i=1; i<doorsArr3D.length; i++)
	{
		mesh = doorwayMesh.clone();
		mesh.position.x = doorsArr3D[i][0]*10;
		mesh.position.z = doorsArr3D[i][1]*10;
		mesh.position.y = 0;
		if(doorsArr3D[i][2] == 0)
		{
			mesh.rotation.set(0,0,0);
		}
		else if(doorsArr3D[i][2] == 1) 
		{
			mesh.rotation.set(0,Math.PI*3/2,0);
		}
		else if(doorsArr3D[i][2] == 2) 
		{
			mesh.rotation.set(0,Math.PI,0);
		}
		else if(doorsArr3D[i][2] == 3) 
		{
			mesh.rotation.set(0,Math.PI/2,0);
		}
		//mesh.castShadow = true;
		mesh.scale.x = mesh.scale.y = mesh.scale.z = 1;
		scene.add( mesh );
	}
}

//savedDoorsArr is just array of indexes of opened doors..
//set opened door flag to 1, then setDoorOpened will be called
function load_saved_doors( savedDoorsArr )
{
	for (i=0; i<savedDoorsArr.length; i++)
	{
		doorsArr3D[savedDoorsArr[i]][3] = 1;
	}
}


function loadDoors( geometry, materials )
{

	materials[ 0 ].shading = THREE.FlatShading;

	//first door are created, others are cloned..
	var doorMesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
	doorsArr3D[0][4] = doorMesh;
	doorsArr3D[0][4].position.x = doorsArr3D[0][0]*10;
	doorsArr3D[0][4].position.z = doorsArr3D[0][1]*10;
	doorsArr3D[0][4].position.y = 0;
	if(doorsArr3D[0][2] == 0)
	{
		doorsArr3D[0][4].rotation.set(0,0,0);
	}
	else if(doorsArr3D[0][2] == 1)
	{
		doorsArr3D[0][4].rotation.set(0,Math.PI*3/2,0);
	}
	else if(doorsArr3D[0][2] == 2)
	{
		doorsArr3D[0][4].rotation.set(0,Math.PI,0);
	}
	else if(doorsArr3D[0][2] == 3)
	{
		doorsArr3D[0][4].rotation.set(0,Math.PI/2,0);
	}
	
	//doorsArr3D[0][4].castShadow = true;
	doorsArr3D[0][4].scale.x = doorsArr3D[0][4].scale.y = doorsArr3D[0][4].scale.z = 1;
	if(doorsArr3D[0][3]==1) setDoorOpened(doorsArr3D[0]);
	scene.add( doorsArr3D[0][4] );
		
	for(var i=1; i<doorsArr3D.length; i++)
	{
		doorsArr3D[i][4] = doorMesh.clone();
		doorsArr3D[i][4].position.x = doorsArr3D[i][0]*10;
		doorsArr3D[i][4].position.z = doorsArr3D[i][1]*10;
		doorsArr3D[i][4].position.y = 0;
		if(doorsArr3D[i][2] == 0)
		{
			doorsArr3D[i][4].rotation.set(0,0,0);
		}
		else if(doorsArr3D[i][2] == 1) 
		{
			doorsArr3D[i][4].rotation.set(0,Math.PI*3/2,0);
		}
		else if(doorsArr3D[i][2] == 2) 
		{
			doorsArr3D[i][4].rotation.set(0,Math.PI,0);
		}
		else if(doorsArr3D[i][2] == 3) 
		{
			doorsArr3D[i][4].rotation.set(0,Math.PI/2,0);
		}
		
		//doorsArr3D[i][4].castShadow = true;
		doorsArr3D[i][4].scale.x = doorsArr3D[i][4].scale.y = doorsArr3D[i][4].scale.z = 1;
		if(doorsArr3D[i][3]==1) setDoorOpened(doorsArr3D[i]);
		scene.add( doorsArr3D[i][4] );
	}
}

var array_of_pillars = [];

var loaded3Dmodels = [];
var modelWaiters = {};

//check if model is already loaded
function modelAlreadyLoaded(model)
{
	for(var i=0; i< loaded3Dmodels.length; i++)
	{
		if(loaded3Dmodels[i][0] == model)
		{
			return loaded3Dmodels[i][1];
		}
	}
	
	return -1;
}

function loadModel(pos, rot, model) {
	return function (geometry, materials ) {
	
		materials[ 0 ].shading = THREE.SmoothShading;
		var mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
		
		for(var i=0; i< loaded3Dmodels.length; i++)
		{
			if(loaded3Dmodels[i][0] == model)
			{
				//set loaded model
				loaded3Dmodels[i][1] = mesh;
			}
		}
		
		mesh.position = pos;
		mesh.rotation = rot;
		scene.add( mesh );
		
		//clone all waiters
		//console.log("loadModel checking for waiters: " + model);
		if(typeof modelWaiters[model] != 'undefined')
		{
			//console.log("loadModel waiters are existing " + model);
			for (var i=0; i< modelWaiters[model].length; i++)
			{
				//console.log("loadModel waiter cloned: " + model);
				var clone = mesh.clone();
				clone.position = modelWaiters[model][i][0];
				clone.rotation = modelWaiters[model][i][1];
				scene.add( clone );
			}
		}
		
		//progress
		updateModelLoading(model)
		
	}
}

function loadModelCheck(loader, pos, rot, model)
{
	//console.log("loadModelCheck: " + model);
	var object = modelAlreadyLoaded(model);
	if(object != -1)
	{
		//object loading is in progress
		//wait till object is loaded and link to it
		if(object == 0)
		{
			//console.log("loadModelCheck queue for waiting: " + model);
			if(typeof modelWaiters[model] == 'undefined')
			{
				modelWaiters[model] = new Array();
			}
			modelWaiters[model].push([pos,rot]);

			return;
		}
		
		//console.log("loadModelCheck, model loaded!: " + model);
		var clony = object.clone();
		clony.position = pos;
		clony.rotation = rot;
		scene.add( clony );
	}
	else
	{
		//download it first time..
		loaded3Dmodels.push([model,0]);
		loader.load( model, loadModel(pos, rot, model) );
		//console.log("loadModelCheck loading first time: " + model);
	}

}

function loadLevelModels()
{
	//for(var i=0; i< models3D.length; i++)
	//{
	//	loader.load( models3D[i], loadModel(0, 0, models3D[i]) );
	//}
}

function loadLevelTextures()
{
}

function load_stairs(loader)
{
	if(typeof stairsArr != 'undefined')
	{
		for(var s=0; s<stairsArr.length; s++)
		{
			var stair = create_game_object();
				stair.name = "stair";
				stair.model = stairsArr[s][3];

				stair.position.y = 0;
				stair.position.x = stairsArr[s][0]*SQUARE_SIZE;
				stair.position.z = stairsArr[s][1]*SQUARE_SIZE;
				if(stairsArr[s][2]==1) stair.rotation.set(0,-Math.PI/2,0);
				if(stairsArr[s][2]==2) stair.rotation.set(0,Math.PI,0);
				if(stairsArr[s][2]==3) stair.rotation.set(0,Math.PI/2,0);
				stairsArr[s][4] = stair;

				loadGameObjectCheck(loader, stair);
		}
	}
}


function load_walls(loader)
{
	
	//model walls
	if((typeof curved_walls == 'undefined') && (typeof wall_model != 'undefined'))
	{
		//todo
	}
	
	//curved walls
	else if ((typeof curved_walls != 'undefined')&&(curved_walls == true))
	{
		for(i=0; i < floorsArr2D.length; i++)
		{
			var leftWall = true;
			var rightWall = true;
			var frontWall = true;
			var backWall = true;
			var frontRightWall = true;
			var frontLeftWall = true;
			var backRightWall = true;
			var backLeftWall = true;
			var leftFrontWall = true;
			var leftBackWall = true;
			var rightFrontWall = true;
			var rightBackWall = true;
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
						
						//leftFrontWall
						for(k=0; k < floorsArr2D.length; k++)
						{
							if((floorsArr2D[j][0]==floorsArr2D[k][0])&&(floorsArr2D[j][1]+1==floorsArr2D[k][1]))
							{
								leftFrontWall = false;
							}
							if((floorsArr2D[j][0]==floorsArr2D[k][0])&&(floorsArr2D[j][1]-1==floorsArr2D[k][1]))
							{
								leftBackWall = false;
							}
						}
					}
					if((floorsArr2D[j][0] == xTile-1) && (floorsArr2D[j][1] == yTile))
					{
						//there is floor tile to the right - no RightWall.
						rightWall = false;
						
						for(k=0; k < floorsArr2D.length; k++)
						{
							if((floorsArr2D[j][0]==floorsArr2D[k][0])&&(floorsArr2D[j][1]+1==floorsArr2D[k][1]))
							{
								rightFrontWall = false;
							}
							if((floorsArr2D[j][0]==floorsArr2D[k][0])&&(floorsArr2D[j][1]-1==floorsArr2D[k][1]))
							{
								rightBackWall = false;
							}
						}
					}
					if((floorsArr2D[j][0] == xTile) && (floorsArr2D[j][1] == yTile+1))
					{
						//there is floor tile to the front - no FrontWall.
						frontWall = false;
						
						for(k=0; k < floorsArr2D.length; k++)
						{
							if((floorsArr2D[j][0]-1==floorsArr2D[k][0])&&(floorsArr2D[j][1]==floorsArr2D[k][1]))
							{
								frontRightWall = false;
							}
							if((floorsArr2D[j][0]+1==floorsArr2D[k][0])&&(floorsArr2D[j][1]==floorsArr2D[k][1]))
							{
								frontLeftWall = false;
							}
						}
					}
					if((floorsArr2D[j][0] == xTile) && (floorsArr2D[j][1] == yTile-1))
					{
						//there is floor tile to the back - no BackWall.
						backWall = false;

						for(k=0; k < floorsArr2D.length; k++)
						{
							if((floorsArr2D[j][0]-1==floorsArr2D[k][0])&&(floorsArr2D[j][1]==floorsArr2D[k][1]))
							{
								backRightWall = false;
							}
							if((floorsArr2D[j][0]+1==floorsArr2D[k][0])&&(floorsArr2D[j][1]==floorsArr2D[k][1]))
							{
								backLeftWall = false;
							}
						}
					}
				}
			}
			
			//check stairs
			if(typeof stairsArr != 'undefined')
			{
				for(var s=0; s<stairsArr.length; s++)
				{
					//front stairs
					if((stairsArr[s][0] == xTile) && (stairsArr[s][1] == yTile+1))
					{
						frontWall = false;
					}
					
					//back stairs
					if((stairsArr[s][0] == xTile) && (stairsArr[s][1] == yTile-1))
					{
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
					
					loadModelCheck(loader, pos, rot, niche_model);
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
						//load curved wall with writting
						var wallWrit = create_game_object();
						wallWrit.name = "writting";
						wallWrit.model = wall_model_curve_writ;
						wallWrit.position = new THREE.Vector3((floorsArr2D[i][0]+0.5)*SQUARE_SIZE,0.4*SQUARE_SIZE,(floorsArr2D[i][1])*SQUARE_SIZE);
						wallWrit.rotation = new THREE.Vector3(0, Math.PI, 0);
						wallWrit.writtingIsOnTheWall = writtingIsOnTheWall;
						loadGameObjectCheck(loader, wallWrit) ;
						writtingsArr[writtingIsOnTheWall][4] = wallWrit.mesh; //this will NOT change dynamically from 0 to pointer! we do it manually after model load...
					}
					else
					{
						//load wall model instead of regular flat wall
						var pos = new THREE.Vector3(0, 0, 0);
						var rot = new THREE.Vector3(0, 0, 0);
						pos.set((floorsArr2D[i][0]+0.5)*SQUARE_SIZE,0.4*SQUARE_SIZE,(floorsArr2D[i][1])*SQUARE_SIZE);
						rot.set(0, Math.PI, 0);
						
						if((typeof wall_model_curve_durve_left_right != 'undefined')&&(!frontLeftWall)&&(backWall)&&(!rightWall))
						{
							//left wall curve left
							loadModelCheck(loader, pos, rot, wall_model_curve_durve_left_right) ;
						}
						else if((typeof wall_model_curve_durve_right_left != 'undefined')&&(!backLeftWall)&&(frontWall)&&(!rightWall))
						{
							//left wall curve left
							loadModelCheck(loader, pos, rot, wall_model_curve_durve_right_left) ;
						}
						else if((typeof wall_model_curve_left != 'undefined')&&(!frontWall)&&(backWall)&&(!rightWall))
						{
							//left wall curve left
							loadModelCheck(loader, pos, rot, wall_model_curve_left) ;
						}
						else if((typeof wall_model_curve_right != 'undefined')&&(frontWall)&&(!backWall)&&(!rightWall))
						{
							//left wall curve right
							loadModelCheck(loader, pos, rot, wall_model_curve_right) ;
						}
						else if((typeof wall_model_durve_lr != 'undefined')&&(!frontLeftWall)&&(!backLeftWall))
						{
							//model should be curved short to both sides
							loadModelCheck(loader, pos, rot, wall_model_durve_lr);
						}
						else if((typeof wall_model_durve_l != 'undefined')&&(!frontWall)&&(!backLeftWall))
						{
							//left wall durve left
							loadModelCheck(loader, pos, rot, wall_model_durve_l) ;
						}
						else if((typeof wall_model_durve_r != 'undefined')&&(!backWall)&&(!frontLeftWall))
						{
							//left wall durve right
							loadModelCheck(loader, pos, rot, wall_model_durve_r) ;
						}
						else
						{
							loadModelCheck(loader, pos, rot, wall_model);
						}
					}
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
					loadModelCheck(loader, pos, rot, niche_model);
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
						//load curved wall with writting
						var wallWrit = create_game_object();
						wallWrit.name = "writting";
						wallWrit.model = wall_model_curve_writ;
						wallWrit.position = new THREE.Vector3((floorsArr2D[i][0]-0.5)*SQUARE_SIZE,0.4*SQUARE_SIZE,(floorsArr2D[i][1])*SQUARE_SIZE);
						wallWrit.rotation = new THREE.Vector3(0, 0, 0);
						wallWrit.writtingIsOnTheWall = writtingIsOnTheWall;
						loadGameObjectCheck(loader, wallWrit) ;
						writtingsArr[writtingIsOnTheWall][4] = wallWrit.mesh; //this will NOT change dynamically from 0 to pointer! we do it manually after model load...
					}
					else
					{
						//load wall model 
						var pos = new THREE.Vector3(0, 0, 0);
						var rot = new THREE.Vector3(0, 0, 0);
						pos.set((floorsArr2D[i][0]-0.5)*SQUARE_SIZE,0.4*SQUARE_SIZE,(floorsArr2D[i][1])*SQUARE_SIZE);
						rot.set(0, 0, 0);
						if((typeof wall_model_durve_lr != 'undefined')&&(!frontRightWall)&&(!backRightWall))
						{
							//model should be curved short to both sides
							loadModelCheck(loader, pos, rot, wall_model_durve_lr);
						}
						else if((typeof wall_model_durve_l != 'undefined')&&(!backWall)&&(!frontRightWall))
						{
							//model should be curved short (durve) to left side
							loadModelCheck(loader, pos, rot, wall_model_durve_l);
						}
						else if((typeof wall_model_durve_l != 'undefined')&&(backWall)&&(!frontRightWall)&&(leftWall))
						{
							//model should be curved short (durve) to left side
							loadModelCheck(loader, pos, rot, wall_model_durve_l);
						}
						else if((typeof wall_model_durve_r != 'undefined')&&(!frontWall)&&(!backRightWall))
						{
							//model should be curved short (durve) to right side
							loadModelCheck(loader, pos, rot, wall_model_durve_r);
						}
						else if((typeof wall_model_curve_durve_left_right != 'undefined')&&(frontWall)&&(!backRightWall))
						{
							//model should be curved left and durved to right side
							loadModelCheck(loader, pos, rot, wall_model_curve_durve_left_right);
						}
						else if((typeof wall_model_curve_durve_right_left != 'undefined')&&(!frontRightWall)&&(backWall)&&(!leftWall))
						{
							//model should be curved left and durved to right side
							loadModelCheck(loader, pos, rot, wall_model_curve_durve_right_left);
						}
						else if((typeof wall_model_curve_left != 'undefined')&&(frontWall)&&(!backWall)&&(!leftWall))
						{
							loadModelCheck(loader, pos, rot, wall_model_curve_left);
						}
						else if((typeof wall_model_curve_right != 'undefined')&&(!leftWall)&&(!frontWall)&&(backWall))
						{
							loadModelCheck(loader, pos, rot, wall_model_curve_right);
						}
						else 
						{
							loadModelCheck(loader, pos, rot, wall_model);
						}
					}
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
					loadModelCheck(loader, pos, rot, niche_model);
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
						//load curved wall with writting
						var wallWrit = create_game_object();
						wallWrit.name = "writting";
						wallWrit.model = wall_model_curve_writ;
						wallWrit.position = new THREE.Vector3((floorsArr2D[i][0])*SQUARE_SIZE,0.4*SQUARE_SIZE,(floorsArr2D[i][1]+0.5)*SQUARE_SIZE);
						wallWrit.rotation = new THREE.Vector3(0, Math.PI/2, 0);
						wallWrit.writtingIsOnTheWall = writtingIsOnTheWall;
						loadGameObjectCheck(loader, wallWrit) ;
						writtingsArr[writtingIsOnTheWall][4] = wallWrit.mesh; //this will NOT change dynamically from 0 to pointer! we do it manually after model load...
					}
					else
					{
						//load wall model curved depending on corners
						var pos = new THREE.Vector3(0, 0, 0);
						var rot = new THREE.Vector3(0, 0, 0);
						pos.set((floorsArr2D[i][0])*SQUARE_SIZE,0.4*SQUARE_SIZE,(floorsArr2D[i][1]+0.5)*SQUARE_SIZE);
						rot.set(0, Math.PI/2, 0);
						
						if((typeof wall_model_durve_lr != 'undefined')&&(!leftFrontWall)&&(!rightFrontWall))
						{
							//model should be curved short to both sides
							loadModelCheck(loader, pos, rot, wall_model_durve_lr);
						}
						else if((typeof wall_model_durve_l != 'undefined')&&(!leftFrontWall)&&(!rightWall))
						{
							//front_wall_durve_down
							loadModelCheck(loader, pos, rot, wall_model_durve_l);
						}
						else if((typeof wall_model_durve_l != 'undefined')&&(!leftFrontWall)&&(rightWall)&&(backWall))
						{
							//front_wall_durve_down
							loadModelCheck(loader, pos, rot, wall_model_durve_l);
						}
						else if((typeof wall_model_durve_r != 'undefined')&&(!leftWall)&&(!rightFrontWall))
						{
							//front_wall_durve_down
							loadModelCheck(loader, pos, rot, wall_model_durve_r);
						}
						else if((typeof wall_model_curve_durve_left_right != 'undefined')&&(leftWall)&&(!rightFrontWall)&&(!backWall))
						{
							//model should be curved left and durved to right side
							loadModelCheck(loader, pos, rot, wall_model_curve_durve_left_right);
						}
						else if((typeof wall_model_curve_durve_right_left != 'undefined')&&(rightWall)&&(!leftFrontWall)&&(!backWall))
						{
							//model should be curved left and durved to right side
							loadModelCheck(loader, pos, rot, wall_model_curve_durve_right_left);
						}
						else if((typeof wall_model_curve_left != 'undefined')&&(leftWall)&&(!rightWall)&&(!backWall))
						{
							//front_wall_curve_down
							loadModelCheck(loader, pos, rot, wall_model_curve_left);
						}
						else if((typeof wall_model_curve_right != 'undefined')&&(!leftWall)&&(rightWall)&&(!backWall))
						{
							//front wall curve right
							loadModelCheck(loader, pos, rot, wall_model_curve_right);
						}
						else
						{
							loadModelCheck(loader, pos, rot, wall_model);
						}
					}
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
					loadModelCheck(loader, pos, rot, niche_model);
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
						//load curved wall with writting
						var wallWrit = create_game_object();
						wallWrit.name = "writting";
						wallWrit.model = wall_model_curve_writ;
						wallWrit.position = new THREE.Vector3((floorsArr2D[i][0])*SQUARE_SIZE,0.4*SQUARE_SIZE,(floorsArr2D[i][1]-0.5)*SQUARE_SIZE);
						wallWrit.rotation = new THREE.Vector3(0, -Math.PI/2, 0);
						wallWrit.writtingIsOnTheWall = writtingIsOnTheWall;
						loadGameObjectCheck(loader, wallWrit) ;
						writtingsArr[writtingIsOnTheWall][4] = wallWrit.mesh; //this will NOT change dynamically from 0 to pointer! we do it manually after model load...
					}
					else
					{
						//load wall model instead of regular flat wall
						var pos = new THREE.Vector3(0, 0, 0);
						var rot = new THREE.Vector3(0, 0, 0);
						pos.set((floorsArr2D[i][0])*SQUARE_SIZE,0.4*SQUARE_SIZE,(floorsArr2D[i][1]-0.5)*SQUARE_SIZE);
						rot.set(0, -Math.PI/2, 0);

						if((typeof wall_model_curve_durve_right_left != 'undefined')&&(leftWall)&&(!rightBackWall)&&(!frontWall))
						{
							//model should be curved left and durved to right side
							loadModelCheck(loader, pos, rot, wall_model_curve_durve_right_left);
						}
						else if((typeof wall_model_curve_durve_left_right != 'undefined')&&(rightWall)&&(!leftBackWall)&&(!frontWall))
						{
							//model should be curved left and durved to right side
							loadModelCheck(loader, pos, rot, wall_model_curve_durve_left_right);
						}
						else if((typeof wall_model_curve_right != 'undefined')&&(!frontWall)&&(leftWall)&&(!rightWall))
						{
							//back wall curve right..
							loadModelCheck(loader, pos, rot, wall_model_curve_right);
						}
						else if((typeof wall_model_durve_r != 'undefined')&&(!leftBackWall))
						{
							//left_wall_curve_down
							loadModelCheck(loader, pos, rot, wall_model_durve_r);
						}
						else if((typeof wall_model_durve_l != 'undefined')&&(!rightBackWall))
						{
							//left_wall_curve_down
							loadModelCheck(loader, pos, rot, wall_model_durve_l);
						}
						else if((typeof wall_model_curve_left != 'undefined')&&(!frontWall)&&(!leftWall)&&(rightWall))
						{
							//left_wall_curve_down
							loadModelCheck(loader, pos, rot, wall_model_curve_left);
						}
						else
						{
							loadModelCheck(loader, pos, rot, wall_model);
						}
					}
				}
			}
		}
	}
	
	//regular walls
	else
	{
		var materialWrit;
		var secretWallObj;
		var wallWritObject;
		//wall texture
		var wall_map = THREE.ImageUtils.loadTexture( wall_texture_file );
		wall_map.wrapS = wall_map.wrapT = THREE.RepeatWrapping;
		wall_map.anisotropy = 16;
		var materialWall = new THREE.MeshLambertMaterial( { ambient: 0xbbbbbb, map: wall_map, side: THREE.DoubleSide } );
		var wallObj = new THREE.Mesh( new THREE.PlaneGeometry( SQUARE_SIZE, 0.8*SQUARE_SIZE, 1, 1 ), materialWall );
		//writting on the wall texture
		if(writtingsArr.length>0)
		{
			var mapwrit = THREE.ImageUtils.loadTexture( wall_writting_texture_file );
			mapwrit.wrapS = mapwrit.wrapT = THREE.RepeatWrapping;
			mapwrit.anisotropy = 16;
			materialWrit = new THREE.MeshLambertMaterial( { ambient: 0xbbbbbb, map: mapwrit, side: THREE.DoubleSide } );
			wallWritObject = new THREE.Mesh( new THREE.PlaneGeometry( SQUARE_SIZE, 0.8*SQUARE_SIZE, 1, 1 ), materialWrit );
		}

		for(var s=0; s<secretWallsArr.length; s++)
		{
			
			//place wall depending on orientation
			//TODO implement other orientations
			if(secretWallsArr[s][2] == 3)
			{
				var object;
				//left secret wall
				if(s==0)
				{
					secretWallObj = new THREE.Mesh( new THREE.PlaneGeometry( SQUARE_SIZE, 0.8*SQUARE_SIZE, 1, 1 ), materialWall );
					object = secretWallObj;
				}
				else
				{
					object = secretWallObj.clone();
				}
				object.rotation.set(0, Math.PI/2, 0);
				//object.receiveShadow = true;
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
		
		//console.log("writ regular walls");
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
					loadModelCheck(loader, pos, rot, niche_model);
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
						if(writtingIsOnTheWall==0)
						{
							writtingsArr[writtingIsOnTheWall][4] = wallWritObject;
							object = wallWritObject;
						}
						else 
						{
							object = wallWritObject.clone();
							writtingsArr[writtingIsOnTheWall][4] = object;
						}
					}
					else
					{
						//load regular wall
						object = wallObj.clone();
					}
					object.rotation.set(0, Math.PI/2, 0);
					//object.receiveShadow = true;
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
					loadModelCheck(loader, pos, rot, niche_model);
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
						if(writtingIsOnTheWall==0)
						{
							writtingsArr[writtingIsOnTheWall][4] = wallWritObject;
							object = wallWritObject;
						}
						else 
						{
							object = wallWritObject.clone();
							writtingsArr[writtingIsOnTheWall][4] = object;
						}
					}
					else
					{
						//load regular wall
						//object = new THREE.Mesh( new THREE.PlaneGeometry( SQUARE_SIZE, 0.8*SQUARE_SIZE, 1, 1 ), material );
						object = wallObj.clone();
					}
					object.rotation.set(0, Math.PI/2, 0);
					//object.receiveShadow = true;
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
					loadModelCheck(loader, pos, rot, niche_model);
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
						if(writtingIsOnTheWall==0)
						{
							writtingsArr[writtingIsOnTheWall][4] = wallWritObject;
							object = wallWritObject;
						}
						else 
						{
							object = wallWritObject.clone();
							writtingsArr[writtingIsOnTheWall][4] = object;
						}
					}
					else
					{
						//load regular wall
						object = wallObj.clone();
					}
					object.rotation.set(0, Math.PI, 0);
					//object.receiveShadow = true;
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
					loadModelCheck(loader, pos, rot, niche_model);
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
						
						if(writtingIsOnTheWall==0)
						{
							writtingsArr[writtingIsOnTheWall][4] = wallWritObject;
							object = wallWritObject;
						}
						else 
						{
							object = wallWritObject.clone();
							writtingsArr[writtingIsOnTheWall][4] = object;
						}
					}
					else
					{
						//load regular wall
						object = wallObj.clone();
					}
					object.rotation.set(0, Math.PI, 0);
					//object.receiveShadow = true;
					object.position.x = floorsArr2D[i][0]*SQUARE_SIZE; //x
					object.position.y = 0.4*SQUARE_SIZE; //y
					object.position.z = (floorsArr2D[i][1]-0.5)*SQUARE_SIZE; //z
					scene.add( object );
				}
			}
		}
	}
}

function load_lights()
{
	/*var ambientLight = new THREE.AmbientLight( 0x101000 ); // soft white light
	scene.add( ambientLight );*/

	var pointColor=0xffffff;
	var pointIntensity = 1;
	if(typeof point_light_color != 'undefined') pointColor = point_light_color;
	if(typeof point_light_intensity != 'undefined') pointIntensity = point_light_intensity;
	pointLight = new THREE.PointLight(pointColor, pointIntensity, 40);
	pointLight.position.set( 160, 4, 0 );
	//pointLight.castShadow = true;
	scene.add( pointLight );
	
	//load lights specific for each level
	if(typeof load_level_lights != 'undefined')
	{
		load_level_lights();
	}
}



//load floors and walls and holes and niches and all basic and static level elements
function load_level()
{
	//console.log("level start time:::::::::::::::::::::::::::::::::::::::::::::::::::: " + Date.now());
	
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

			loadGameObjectCheck(loader,pillarke);
			
			array_of_pillars.push(pillarke);
		}
	}
	
	//show_model(loader, "maps/level3/models/door.js", 10,5);
	
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
	
	var floor_material = new THREE.MeshLambertMaterial( { ambient: 0xbbbbbb, map: map, side: THREE.DoubleSide } );
	var floorObj = new THREE.Mesh( new THREE.PlaneGeometry( SQUARE_SIZE, SQUARE_SIZE, 1, 1 ), floor_material );

	var ceiling_map = THREE.ImageUtils.loadTexture( ceiling_texture_file );
	ceiling_map.wrapS = ceiling_map.wrapT = THREE.RepeatWrapping;
	ceiling_map.anisotropy = 16;
	var ceiling_material = new THREE.MeshLambertMaterial( { ambient: 0xbbbbbb, map:ceiling_map, side: THREE.DoubleSide } );
	var ceilingObj = new THREE.Mesh( new THREE.PlaneGeometry( SQUARE_SIZE, SQUARE_SIZE, 1, 1 ), ceiling_material );
	
	//floors
	for(var i=0; i < floorsArr2D.length; i++)
	{
		var fx = floorsArr2D[i][0];
		var fz = floorsArr2D[i][1];
		var north_neighbor= false; //up
		var south_neighbor= false; //down
		var east_neighbor= false; //right
		var west_neighbor= false; //left
		var north_east_neighbor = false;
		var south_east_neighbor = false;
		
		for(var ff=0; ff < floorsArr2D.length; ff++)
		{
			if((floorsArr2D[ff][0] == fx)&&(floorsArr2D[ff][1] == fz+1))
			{
				//this floortile has north neighbor
				//console.log("tile has north x:" + fx + " z:" + fz);
				north_neighbor=true;
			}
			if((floorsArr2D[ff][0] == fx)&&(floorsArr2D[ff][1] == fz-1))
			{
				//this floortile has south neighbor
				south_neighbor=true;
			}
			if((floorsArr2D[ff][0] == fx+1)&&(floorsArr2D[ff][1] == fz))
			{
				//this floortile has west neighbor
				west_neighbor=true;
			}
			if((floorsArr2D[ff][0] == fx-1)&&(floorsArr2D[ff][1] == fz))
			{
				//this floortile has east neighbor
				east_neighbor=true;
			}
			if((floorsArr2D[ff][0] == fx-1)&&(floorsArr2D[ff][1] == fz+1))
			{
				//this floortile has north-west neighbor
				north_east_neighbor=true;
			}
			if((floorsArr2D[ff][0] == fx-1)&&(floorsArr2D[ff][1] == fz-1))
			{
				//this floortile has north-west neighbor
				south_east_neighbor=true;
			}
		}
		
		if(typeof suporter_model != 'undefined')
		{
			if((north_neighbor)&&(!south_neighbor)&&(!west_neighbor)&&(!east_neighbor))
			{
				//console.log("tile has low corner x:" + fx + " z:" + fz);
				//put supporter in the low corner
				var suporter_pos = new THREE.Vector3(fx*SQUARE_SIZE, 0, (fz-0.5)*SQUARE_SIZE);
				var suporter_rot = new THREE.Vector3(0, 0, 0);
				loadModelCheck(loader, suporter_pos, suporter_rot, suporter_model);
				//show_model(loader, suporter_model, fx,fz-0.5,0);
			}
			if((south_neighbor)&&(!north_neighbor)&&(!west_neighbor)&&(!east_neighbor))
			{
				//console.log("tile has high corner x:" + fx + " z:" + fz);
				//put supporter in the up corner
				var suporter_pos = new THREE.Vector3(fx*SQUARE_SIZE, 0, (fz+0.5)*SQUARE_SIZE);
				var suporter_rot = new THREE.Vector3(0, Math.PI, 0);
				loadModelCheck(loader, suporter_pos, suporter_rot, suporter_model);
				//show_model(loader, suporter_model, fx,fz+0.5,Math.PI);
			}
			if((west_neighbor)&&(!north_neighbor)&&(!south_neighbor)&&(!east_neighbor))
			{
				//console.log("tile has right corner x:" + fx + " z:" + fz);
				//put supporter in the right corner
				var suporter_pos = new THREE.Vector3((fx-0.5)*SQUARE_SIZE, 0, fz*SQUARE_SIZE);
				var suporter_rot = new THREE.Vector3(0, Math.PI/2, 0);
				loadModelCheck(loader, suporter_pos, suporter_rot, suporter_model);
				//show_model(loader, suporter_model, fx-0.5,fz,Math.PI/2);
			}
			if((east_neighbor)&&(!north_neighbor)&&(!west_neighbor)&&(!south_neighbor))
			{
				//console.log("tile has left corner x:" + fx + " z:" + fz);
				//put supporter in the left corner
				var suporter_pos = new THREE.Vector3((fx+0.5)*SQUARE_SIZE, 0, fz*SQUARE_SIZE);
				var suporter_rot = new THREE.Vector3(0, -Math.PI/2, 0);
				loadModelCheck(loader, suporter_pos, suporter_rot, suporter_model);
				//show_model(loader, suporter_model, fx+0.5,fz,-Math.PI/2);
			}
			
			if((east_neighbor)&&(north_neighbor)&&(!west_neighbor)&&(south_neighbor))
			{
				//one supporter on the right to ablige start of corridor
				var suporter_pos = new THREE.Vector3((fx-0.5)*SQUARE_SIZE, 0, fz*SQUARE_SIZE);
				var suporter_rot = new THREE.Vector3(0, Math.PI/2, 0);
				loadModelCheck(loader, suporter_pos, suporter_rot, suporter_model);
				//show_model(loader, suporter_model, fx-0.5,fz,Math.PI/2);
			}
			if((south_neighbor)&&(!north_neighbor)&&(west_neighbor)&&(east_neighbor)&&(!south_east_neighbor))
			{
				//one supporter on the low to ablige start of corridor
				var suporter_pos = new THREE.Vector3(fx*SQUARE_SIZE, 0, (fz-0.5)*SQUARE_SIZE);
				var suporter_rot = new THREE.Vector3(0, 0, 0);
				loadModelCheck(loader, suporter_pos, suporter_rot, suporter_model);
				//show_model(loader, suporter_model, fx,fz-0.5,0);
			}
			if((west_neighbor)&&(north_neighbor)&&(!east_neighbor)&&(south_neighbor))
			{
				//one supporter on the low to ablige start of corridor
				var suporter_pos = new THREE.Vector3((fx+0.5)*SQUARE_SIZE, 0, fz*SQUARE_SIZE);
				var suporter_rot = new THREE.Vector3(0, 3*Math.PI/2, 0);
				loadModelCheck(loader, suporter_pos, suporter_rot, suporter_model);
				//show_model(loader, suporter_model, fx+0.5,fz,3*Math.PI/2);
			}
			if((north_neighbor)&&(!south_neighbor)&&(west_neighbor)&&(east_neighbor)&&(!north_east_neighbor))
			{
				//one supporter on the low to ablige start of corridor
				var suporter_pos = new THREE.Vector3(fx*SQUARE_SIZE, 0, (fz+0.5)*SQUARE_SIZE);
				var suporter_rot = new THREE.Vector3(0, Math.PI, 0);
				loadModelCheck(loader, suporter_pos, suporter_rot, suporter_model);
				//show_model(loader, suporter_model, fx,fz+0.5,Math.PI);
			}
			//TODO!!!
		}

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
			loadModelCheck(loader, pos, rot, hole_model);
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
				object = floorObj.clone();
			}
			object.rotation.set(-Math.PI/2, 0, 0);
			//object.receiveShadow = true;
			
			object.position.x = floorsArr2D[i][0]*SQUARE_SIZE; //x
			object.position.y = 0; //y
			object.position.z = floorsArr2D[i][1]*SQUARE_SIZE; //z
	
			scene.add( object );
		}
		
		
		
		
		
		//ceiling
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
		
		var pos = new THREE.Vector3(0, 0, 0);
		var rot = new THREE.Vector3(Math.PI, 0, 0);
		pos.x = floorsArr2D[i][0]*SQUARE_SIZE;
		pos.z = floorsArr2D[i][1]*SQUARE_SIZE;
		pos.y = 8;
		if(holeAboveSpot)
		{
			//add hole model
			loadModelCheck(loader, pos,rot, hole_above_model);
		}
		else
		{
		
			if ((typeof curved_ceiling != 'undefined')&&(curved_ceiling == true))
			{
				if((north_neighbor)&&(south_neighbor)&&(!west_neighbor)&&(!east_neighbor))
				{
					rot.set(0, -Math.PI/2, 0);
					loadModelCheck(loader, pos, rot, celing_model_fb);
				}
				else if((!north_neighbor)&&(!south_neighbor)&&(west_neighbor)&&(east_neighbor))
				{
					rot.set(0, 0, 0);
					loadModelCheck(loader, pos, rot, celing_model_fb);
				}
				else if((north_neighbor)&&(south_neighbor)&&(!west_neighbor)&&(east_neighbor))
				{
					rot.set(0, -Math.PI/2, 0);
					loadModelCheck(loader, pos, rot, celing_model_fb);
				}
				else if((north_neighbor)&&(south_neighbor)&&(!west_neighbor)&&(east_neighbor))
				{
					rot.set(0, -Math.PI/2, 0);
					loadModelCheck(loader, pos, rot, celing_model_fb);
				}
			}
			else
			{
				//object = new THREE.Mesh( new THREE.PlaneGeometry( SQUARE_SIZE, SQUARE_SIZE, 1, 1 ), ceiling_material );
				object = ceilingObj.clone();
				//object.position.set( 0-i*SQUARE_SIZE, -1, 0 );
				object.rotation.set(-Math.PI/2, 0, 0);
				//object.receiveShadow = true;
				
			
				object.position.x = floorsArr2D[i][0]*SQUARE_SIZE; //x
				object.position.y = 0.8*SQUARE_SIZE; //y
				object.position.z = floorsArr2D[i][1]*SQUARE_SIZE; //z

				scene.add( object );
			}
		}

	}
	
	
	//buttons
	load_buttons();
	
	//keyholes
	load_keyholes();

	//walls
	load_walls(loader);
	
	//stairs
	load_stairs(loader);
	
	//console.log("level end time:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: " + Date.now());
}
