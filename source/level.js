
var array_of_decorPillars = [];

function decorPillarAlreadyAdded(decorPil) {
	var i = 0;
	for (i = 0; i < array_of_decorPillars.length; i++) {
		if((array_of_decorPillars[i].x == decorPil.x) && (array_of_decorPillars[i].z == decorPil.z))
		{
			return true;
		}
	}
	return false;
}

function addPillar(loader, level_obj, x, z)
{
	if(level_obj.decorPillarModel != "")
	{
		var decorPil = new THREE.Vector3(x, 0, z);
		if(!decorPillarAlreadyAdded(decorPil))
		{
			array_of_decorPillars.push(decorPil);
			
			var decorPillarke = create_game_object();
			decorPillarke.name = "decorPillar";
			decorPillarke.model = level_obj.decorPillarModel;

			decorPillarke.position.y = 0;
			decorPillarke.position.x = x;
			decorPillarke.position.z = z;

			loadGameObjectCheck(loader, decorPillarke);
			//loader.load( decorPillarModel, decorPillarke.loadObject(decorPillarke) );
		}
	}
}

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

var someglobalmeshnamecounter = 0;

function loadModel(pos, rot, model) {
	return function (geometry, materials ) {
		var i=0;
		materials[ 0 ].shading = THREE.SmoothShading;
		var mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
		
		for(i=0; i< loaded3Dmodels.length; i++)
		{
			if(loaded3Dmodels[i][0] == model)
			{
				//set loaded model
				loaded3Dmodels[i][1] = mesh;
			}
		}
		someglobalmeshnamecounter++;
		mesh.name = "wallorfloor" + someglobalmeshnamecounter;
		mesh.position = pos;
		mesh.rotation = rot;
		scene.add( mesh );
		
		//clone all waiters
		//console.log("loadModel checking for waiters: " + model);
		if(typeof modelWaiters[model] != 'undefined')
		{
			//console.log("loadModel waiters are existing " + model);
			for (i=0; i< modelWaiters[model].length; i++)
			{
				//console.log("loadModel waiter cloned: " + model);
				var clone = mesh.clone();
				someglobalmeshnamecounter++;
				clone.name = "wallorfloor" + someglobalmeshnamecounter;
				clone.position = modelWaiters[model][i][0];
				clone.rotation = modelWaiters[model][i][1];
				scene.add( clone );
			}
		}
		
		//progress
		updateModelLoading(model);
		
	};
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
		someglobalmeshnamecounter++;
		clony.name = "wallorfloor" + someglobalmeshnamecounter;
		clony.position = pos;
		clony.rotation = rot;
		scene.add( clony );
	}
	else
	{
		//download it first time..
		loaded3Dmodels.push([model,0]);
		loader.load( model, loadModel(pos, rot, model) );
		relativeLevelModelCount++;
	}

}

function loadLevelModels()
{
}

function loadLevelTextures()
{
}


var globalJSONloader = new THREE.JSONLoader();


function load_walls_level(loader, level_obj)
{
	
	console.log("load_walls_level enter");
	
	//model walls
	if((typeof level_obj.curved_walls == 'undefined') && (typeof level_obj.wall_model != 'undefined'))
	{
		//todo
	}
	
	//curved walls
	else if ((typeof level_obj.curved_walls != 'undefined')&&(level_obj.curved_walls == true))
	{
		for(i=0; i < level_obj.floorsArr2D.length; i++)
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
			var xTile = level_obj.floorsArr2D[i][0];
			var yTile = level_obj.floorsArr2D[i][1];
			//make walls around floor tile, but check if it has neighboring tile..
			for(j=0; j < level_obj.floorsArr2D.length; j++)
			{
				if(i!=j)
				{
					if((level_obj.floorsArr2D[j][0] == xTile+1) && (level_obj.floorsArr2D[j][1] == yTile))
					{
						//there is floor tile to the left - no LeftWall.
						leftWall = false;
						
						//leftFrontWall
						for(k=0; k < level_obj.floorsArr2D.length; k++)
						{
							if((level_obj.floorsArr2D[j][0]==level_obj.floorsArr2D[k][0])&&(level_obj.floorsArr2D[j][1]+1==level_obj.floorsArr2D[k][1]))
							{
								leftFrontWall = false;
							}
							if((level_obj.floorsArr2D[j][0]==level_obj.floorsArr2D[k][0])&&(level_obj.floorsArr2D[j][1]-1==level_obj.floorsArr2D[k][1]))
							{
								leftBackWall = false;
							}
						}
					}
					if((level_obj.floorsArr2D[j][0] == xTile-1) && (level_obj.floorsArr2D[j][1] == yTile))
					{
						//there is floor tile to the right - no RightWall.
						rightWall = false;
						
						for(k=0; k < level_obj.floorsArr2D.length; k++)
						{
							if((level_obj.floorsArr2D[j][0]==level_obj.floorsArr2D[k][0])&&(level_obj.floorsArr2D[j][1]+1==level_obj.floorsArr2D[k][1]))
							{
								rightFrontWall = false;
							}
							if((level_obj.floorsArr2D[j][0]==level_obj.floorsArr2D[k][0])&&(level_obj.floorsArr2D[j][1]-1==level_obj.floorsArr2D[k][1]))
							{
								rightBackWall = false;
							}
						}
					}
					if((level_obj.floorsArr2D[j][0] == xTile) && (level_obj.floorsArr2D[j][1] == yTile+1))
					{
						//there is floor tile to the front - no FrontWall.
						frontWall = false;
						
						for(k=0; k < level_obj.floorsArr2D.length; k++)
						{
							if((level_obj.floorsArr2D[j][0]-1==level_obj.floorsArr2D[k][0])&&(level_obj.floorsArr2D[j][1]==level_obj.floorsArr2D[k][1]))
							{
								frontRightWall = false;
							}
							if((level_obj.floorsArr2D[j][0]+1==level_obj.floorsArr2D[k][0])&&(level_obj.floorsArr2D[j][1]==level_obj.floorsArr2D[k][1]))
							{
								frontLeftWall = false;
							}
						}
					}
					if((level_obj.floorsArr2D[j][0] == xTile) && (level_obj.floorsArr2D[j][1] == yTile-1))
					{
						//there is floor tile to the back - no BackWall.
						backWall = false;

						for(k=0; k < level_obj.floorsArr2D.length; k++)
						{
							if((level_obj.floorsArr2D[j][0]-1==level_obj.floorsArr2D[k][0])&&(level_obj.floorsArr2D[j][1]==level_obj.floorsArr2D[k][1]))
							{
								backRightWall = false;
							}
							if((level_obj.floorsArr2D[j][0]+1==level_obj.floorsArr2D[k][0])&&(level_obj.floorsArr2D[j][1]==level_obj.floorsArr2D[k][1]))
							{
								backLeftWall = false;
							}
						}
					}
				}
			}
			
			//check stairs
			if(typeof level_obj.stairsArr != 'undefined')
			{
				for(var s=0; s<level_obj.stairsArr.length; s++)
				{
					//front stairs
					if((level_obj.stairsArr[s][0] == xTile) && (level_obj.stairsArr[s][1] == yTile+1))
					{
						frontWall = false;
					}
					
					//back stairs
					if((level_obj.stairsArr[s][0] == xTile) && (level_obj.stairsArr[s][1] == yTile-1))
					{
						backWall = false;
					}
					
				}
			}
			
			if(leftWall)
			{
				//pillars
				var x1 = (level_obj.floorsArr2D[i][0])*SQUARE_SIZE+5;
				var x2 = (level_obj.floorsArr2D[i][0])*SQUARE_SIZE+5;
				var z1 = (level_obj.floorsArr2D[i][1])*SQUARE_SIZE+5;
				var z2 = (level_obj.floorsArr2D[i][1])*SQUARE_SIZE-5;
				addPillar(loader,level_obj,x1,z1);
				addPillar(loader,level_obj,x2,z2);

				var nicheIsOnTheWall = false;
				//loop level_obj.nicheArr
				for (var n=0; n<level_obj.nicheArr.length; n++)
				{
					if((level_obj.nicheArr[n][0] == level_obj.floorsArr2D[i][0])&&(level_obj.nicheArr[n][1] == level_obj.floorsArr2D[i][1])&&(level_obj.nicheArr[n][2] == 3))
					{
						nicheIsOnTheWall = true;
					}
				}
				
				if(nicheIsOnTheWall)
				{
					//load niche model instead of regular wall
					var pos = new THREE.Vector3(0, 0, 0);
					var rot = new THREE.Vector3(0, 0, 0);
					pos.set((level_obj.floorsArr2D[i][0]+0.5)*SQUARE_SIZE,0.4*SQUARE_SIZE,(level_obj.floorsArr2D[i][1])*SQUARE_SIZE);
					rot.set(0, -Math.PI/2, 0);
					
					loadModelCheck(loader, pos, rot, level_obj.niche_model);
				}
				else
				{
					//check if writting is on the wall
					var writtingIsOnTheWall = -1;
					//loop level_obj.writtingsArr
					for (var n=0; n<level_obj.writtingsArr.length; n++)
					{
						if((level_obj.writtingsArr[n][0] == level_obj.floorsArr2D[i][0])&&(level_obj.writtingsArr[n][1] == level_obj.floorsArr2D[i][1])&&(level_obj.writtingsArr[n][2] == 3))
						{
							writtingIsOnTheWall = n;
						}
					}
					
					if(writtingIsOnTheWall > -1)
					{
						//load curved wall with writting
						var wallWrit = create_game_object();
						wallWrit.name = "writting";
						wallWrit.model = level_obj.wall_model_curve_writ;
						wallWrit.position = new THREE.Vector3((level_obj.floorsArr2D[i][0]+0.5)*SQUARE_SIZE,0.4*SQUARE_SIZE,(level_obj.floorsArr2D[i][1])*SQUARE_SIZE);
						wallWrit.rotation = new THREE.Vector3(0, Math.PI, 0);
						wallWrit.writtingIsOnTheWall = writtingIsOnTheWall;
						loadGameObjectCheck(loader, wallWrit) ;
						level_obj.writtingsArr[writtingIsOnTheWall][4] = wallWrit.mesh; //this will NOT change dynamically from 0 to pointer! we do it manually after model load...
					}
					else
					{
						//load wall model instead of regular flat wall
						var pos = new THREE.Vector3(0, 0, 0);
						var rot = new THREE.Vector3(0, 0, 0);
						pos.set((level_obj.floorsArr2D[i][0]+0.5)*SQUARE_SIZE,0.4*SQUARE_SIZE,(level_obj.floorsArr2D[i][1])*SQUARE_SIZE);
						rot.set(0, Math.PI, 0);
						
						if((typeof level_obj.wall_model_curve_durve_left_right != 'undefined')&&(!frontLeftWall)&&(backWall)&&(!rightWall))
						{
							//left wall curve left
							loadModelCheck(loader, pos, rot, level_obj.wall_model_curve_durve_left_right) ;
						}
						else if((typeof level_obj.wall_model_curve_durve_right_left != 'undefined')&&(!backLeftWall)&&(frontWall)&&(!rightWall))
						{
							//left wall curve left
							loadModelCheck(loader, pos, rot, level_obj.wall_model_curve_durve_right_left) ;
						}
						else if((typeof level_obj.wall_model_curve_left != 'undefined')&&(!frontWall)&&(backWall)&&(!rightWall))
						{
							//left wall curve left
							loadModelCheck(loader, pos, rot, level_obj.wall_model_curve_left) ;
						}
						else if((typeof level_obj.wall_model_curve_right != 'undefined')&&(frontWall)&&(!backWall)&&(!rightWall))
						{
							//left wall curve right
							loadModelCheck(loader, pos, rot, level_obj.wall_model_curve_right) ;
						}
						else if((typeof level_obj.wall_model_durve_lr != 'undefined')&&(!frontLeftWall)&&(!backLeftWall))
						{
							//model should be curved short to both sides
							loadModelCheck(loader, pos, rot, level_obj.wall_model_durve_lr);
						}
						else if((typeof level_obj.wall_model_durve_l != 'undefined')&&(!frontWall)&&(!backLeftWall))
						{
							//left wall durve left
							loadModelCheck(loader, pos, rot, level_obj.wall_model_durve_l) ;
						}
						else if((typeof level_obj.wall_model_durve_r != 'undefined')&&(!backWall)&&(!frontLeftWall))
						{
							//left wall durve right
							loadModelCheck(loader, pos, rot, level_obj.wall_model_durve_r) ;
						}
						else
						{
							loadModelCheck(loader, pos, rot, level_obj.wall_model);
						}
					}
				}
			}
			
			if(rightWall)
			{
				//pillars
				var x1 = (level_obj.floorsArr2D[i][0])*SQUARE_SIZE-5;
				var x2 = (level_obj.floorsArr2D[i][0])*SQUARE_SIZE-5;
				var z1 = (level_obj.floorsArr2D[i][1])*SQUARE_SIZE+5;
				var z2 = (level_obj.floorsArr2D[i][1])*SQUARE_SIZE-5;
				addPillar(loader,level_obj,x1,z1);
				addPillar(loader,level_obj,x2,z2);

				var nicheIsOnTheWall = false;
				//loop level_obj.nicheArr
				for (var n=0; n<level_obj.nicheArr.length; n++)
				{
					if((level_obj.nicheArr[n][0] == level_obj.floorsArr2D[i][0])&&(level_obj.nicheArr[n][1] == level_obj.floorsArr2D[i][1])&&(level_obj.nicheArr[n][2] == 1))
					{
						nicheIsOnTheWall = true;
					}
				}
				
				if(nicheIsOnTheWall)
				{
					//load niche model instead of regular wall
					var pos = new THREE.Vector3(0, 0, 0);
					var rot = new THREE.Vector3(0, 0, 0);
					pos.set((level_obj.floorsArr2D[i][0]-0.5)*SQUARE_SIZE,0.4*SQUARE_SIZE,(level_obj.floorsArr2D[i][1])*SQUARE_SIZE);
					rot.set(0, Math.PI/2, 0);
					loadModelCheck(loader, pos, rot, level_obj.niche_model);
				}
				else
				{
					//check if writting is on the wall
					var writtingIsOnTheWall = -1;
					//loop level_obj.writtingsArr
					for (var n=0; n<level_obj.writtingsArr.length; n++)
					{
						if((level_obj.writtingsArr[n][0] == level_obj.floorsArr2D[i][0])&&(level_obj.writtingsArr[n][1] == level_obj.floorsArr2D[i][1])&&(level_obj.writtingsArr[n][2] == 1))
						{
							writtingIsOnTheWall = n;
						}
					}
					
					if(writtingIsOnTheWall > -1)
					{
						//load curved wall with writting
						var wallWrit = create_game_object();
						wallWrit.name = "writting";
						wallWrit.model = level_obj.wall_model_curve_writ;
						wallWrit.position = new THREE.Vector3((level_obj.floorsArr2D[i][0]-0.5)*SQUARE_SIZE,0.4*SQUARE_SIZE,(level_obj.floorsArr2D[i][1])*SQUARE_SIZE);
						wallWrit.rotation = new THREE.Vector3(0, 0, 0);
						wallWrit.writtingIsOnTheWall = writtingIsOnTheWall;
						loadGameObjectCheck(loader, wallWrit) ;
						level_obj.writtingsArr[writtingIsOnTheWall][4] = wallWrit.mesh; //this will NOT change dynamically from 0 to pointer! we do it manually after model load...
					}
					else
					{
						//load wall model 
						var pos = new THREE.Vector3(0, 0, 0);
						var rot = new THREE.Vector3(0, 0, 0);
						pos.set((level_obj.floorsArr2D[i][0]-0.5)*SQUARE_SIZE,0.4*SQUARE_SIZE,(level_obj.floorsArr2D[i][1])*SQUARE_SIZE);
						rot.set(0, 0, 0);
						if((typeof level_obj.wall_model_durve_lr != 'undefined')&&(!frontRightWall)&&(!backRightWall))
						{
							//model should be curved short to both sides
							loadModelCheck(loader, pos, rot, level_obj.wall_model_durve_lr);
						}
						else if((typeof level_obj.wall_model_durve_l != 'undefined')&&(!backWall)&&(!frontRightWall))
						{
							//model should be curved short (durve) to left side
							loadModelCheck(loader, pos, rot, level_obj.wall_model_durve_l);
						}
						else if((typeof level_obj.wall_model_durve_l != 'undefined')&&(backWall)&&(!frontRightWall)&&(leftWall))
						{
							//model should be curved short (durve) to left side
							loadModelCheck(loader, pos, rot, level_obj.wall_model_durve_l);
						}
						else if((typeof level_obj.wall_model_durve_r != 'undefined')&&(!frontWall)&&(!backRightWall))
						{
							//model should be curved short (durve) to right side
							loadModelCheck(loader, pos, rot, level_obj.wall_model_durve_r);
						}
						else if((typeof level_obj.wall_model_curve_durve_left_right != 'undefined')&&(frontWall)&&(!backRightWall))
						{
							//model should be curved left and durved to right side
							loadModelCheck(loader, pos, rot, level_obj.wall_model_curve_durve_left_right);
						}
						else if((typeof level_obj.wall_model_curve_durve_right_left != 'undefined')&&(!frontRightWall)&&(backWall)&&(!leftWall))
						{
							//model should be curved left and durved to right side
							loadModelCheck(loader, pos, rot, level_obj.wall_model_curve_durve_right_left);
						}
						else if((typeof level_obj.wall_model_curve_left != 'undefined')&&(frontWall)&&(!backWall)&&(!leftWall))
						{
							loadModelCheck(loader, pos, rot, level_obj.wall_model_curve_left);
						}
						else if((typeof level_obj.wall_model_curve_right != 'undefined')&&(!leftWall)&&(!frontWall)&&(backWall))
						{
							loadModelCheck(loader, pos, rot, level_obj.wall_model_curve_right);
						}
						else 
						{
							loadModelCheck(loader, pos, rot, level_obj.wall_model);
						}
					}
				}
			}
			
			if(frontWall)
			{
				//pillars
				var x1 = (level_obj.floorsArr2D[i][0])*SQUARE_SIZE+5;
				var x2 = (level_obj.floorsArr2D[i][0])*SQUARE_SIZE-5;
				var z1 = (level_obj.floorsArr2D[i][1])*SQUARE_SIZE+5;
				var z2 = (level_obj.floorsArr2D[i][1])*SQUARE_SIZE+5;
				addPillar(loader,level_obj,x1,z1);
				addPillar(loader,level_obj,x2,z2);

				var nicheIsOnTheWall = false;
				//loop level_obj.nicheArr
				for (var n=0; n<level_obj.nicheArr.length; n++)
				{
					if((level_obj.nicheArr[n][0] == level_obj.floorsArr2D[i][0])&&(level_obj.nicheArr[n][1] == level_obj.floorsArr2D[i][1])&&(level_obj.nicheArr[n][2] == 0))
					{
						nicheIsOnTheWall = true;
					}
				}
				
				if(nicheIsOnTheWall)
				{
					//load niche model instead of regular wall
					var pos = new THREE.Vector3(0, 0, 0);
					var rot = new THREE.Vector3(0, 0, 0);
					pos.set((level_obj.floorsArr2D[i][0])*SQUARE_SIZE,0.4*SQUARE_SIZE,(level_obj.floorsArr2D[i][1]+0.5)*SQUARE_SIZE);
					rot.set(0, Math.PI, 0);
					loadModelCheck(loader, pos, rot, level_obj.niche_model);
				}
				else
				{
					//check if writting is on the wall
					var writtingIsOnTheWall = -1;
					//loop level_obj.writtingsArr
					for (var n=0; n<level_obj.writtingsArr.length; n++)
					{
						if((level_obj.writtingsArr[n][0] == level_obj.floorsArr2D[i][0])&&(level_obj.writtingsArr[n][1] == level_obj.floorsArr2D[i][1])&&(level_obj.writtingsArr[n][2] == 0))
						{
							writtingIsOnTheWall = n;
						}
					}
					
					if(writtingIsOnTheWall > -1)
					{
						//load curved wall with writting
						var wallWrit = create_game_object();
						wallWrit.name = "writting";
						wallWrit.model = level_obj.wall_model_curve_writ;
						wallWrit.position = new THREE.Vector3((level_obj.floorsArr2D[i][0])*SQUARE_SIZE,0.4*SQUARE_SIZE,(level_obj.floorsArr2D[i][1]+0.5)*SQUARE_SIZE);
						wallWrit.rotation = new THREE.Vector3(0, Math.PI/2, 0);
						wallWrit.writtingIsOnTheWall = writtingIsOnTheWall;
						loadGameObjectCheck(loader, wallWrit) ;
						level_obj.writtingsArr[writtingIsOnTheWall][4] = wallWrit.mesh; //this will NOT change dynamically from 0 to pointer! we do it manually after model load...
					}
					else
					{
						//load wall model curved depending on corners
						var pos = new THREE.Vector3(0, 0, 0);
						var rot = new THREE.Vector3(0, 0, 0);
						pos.set((level_obj.floorsArr2D[i][0])*SQUARE_SIZE,0.4*SQUARE_SIZE,(level_obj.floorsArr2D[i][1]+0.5)*SQUARE_SIZE);
						rot.set(0, Math.PI/2, 0);
						
						if((typeof level_obj.wall_model_durve_lr != 'undefined')&&(!leftFrontWall)&&(!rightFrontWall))
						{
							//model should be curved short to both sides
							loadModelCheck(loader, pos, rot, level_obj.wall_model_durve_lr);
						}
						else if((typeof level_obj.wall_model_durve_l != 'undefined')&&(!leftFrontWall)&&(!rightWall))
						{
							//front_wall_durve_down
							loadModelCheck(loader, pos, rot, level_obj.wall_model_durve_l);
						}
						else if((typeof level_obj.wall_model_durve_l != 'undefined')&&(!leftFrontWall)&&(rightWall)&&(backWall))
						{
							//front_wall_durve_down
							loadModelCheck(loader, pos, rot, level_obj.wall_model_durve_l);
						}
						else if((typeof level_obj.wall_model_durve_r != 'undefined')&&(!leftWall)&&(!rightFrontWall))
						{
							//front_wall_durve_down
							loadModelCheck(loader, pos, rot, level_obj.wall_model_durve_r);
						}
						else if((typeof level_obj.wall_model_curve_durve_left_right != 'undefined')&&(leftWall)&&(!rightFrontWall)&&(!backWall))
						{
							//model should be curved left and durved to right side
							loadModelCheck(loader, pos, rot, level_obj.wall_model_curve_durve_left_right);
						}
						else if((typeof level_obj.wall_model_curve_durve_right_left != 'undefined')&&(rightWall)&&(!leftFrontWall)&&(!backWall))
						{
							//model should be curved left and durved to right side
							loadModelCheck(loader, pos, rot, level_obj.wall_model_curve_durve_right_left);
						}
						else if((typeof level_obj.wall_model_curve_left != 'undefined')&&(leftWall)&&(!rightWall)&&(!backWall))
						{
							//front_wall_curve_down
							loadModelCheck(loader, pos, rot, level_obj.wall_model_curve_left);
						}
						else if((typeof level_obj.wall_model_curve_right != 'undefined')&&(!leftWall)&&(rightWall)&&(!backWall))
						{
							//front wall curve right
							loadModelCheck(loader, pos, rot, level_obj.wall_model_curve_right);
						}
						else
						{
							loadModelCheck(loader, pos, rot, level_obj.wall_model);
						}
					}
				}
			}
			
			if(backWall)
			{
				//pillars
				var x1 = (level_obj.floorsArr2D[i][0])*SQUARE_SIZE+5;
				var x2 = (level_obj.floorsArr2D[i][0])*SQUARE_SIZE-5;
				var z1 = (level_obj.floorsArr2D[i][1])*SQUARE_SIZE-5;
				var z2 = (level_obj.floorsArr2D[i][1])*SQUARE_SIZE-5;
				addPillar(loader,level_obj,x1,z1);
				addPillar(loader,level_obj,x2,z2);
				
				var nicheIsOnTheWall = false;
				//loop level_obj.nicheArr
				for (var n=0; n<level_obj.nicheArr.length; n++)
				{
					if((level_obj.nicheArr[n][0] == level_obj.floorsArr2D[i][0])&&(level_obj.nicheArr[n][1] == level_obj.floorsArr2D[i][1])&&(level_obj.nicheArr[n][2] == 2))
					{
						nicheIsOnTheWall = true;
					}
				}
				
				if(nicheIsOnTheWall)
				{
					//load niche model instead of regular wall
					var pos = new THREE.Vector3(0, 0, 0);
					var rot = new THREE.Vector3(0, 0, 0);
					pos.set((level_obj.floorsArr2D[i][0])*SQUARE_SIZE,0.4*SQUARE_SIZE,(level_obj.floorsArr2D[i][1]-0.5)*SQUARE_SIZE);
					rot.set(0, 0, 0);
					loadModelCheck(loader, pos, rot, level_obj.niche_model);
				}
				else
				{
					//check if writting is on the wall
					var writtingIsOnTheWall = -1;
					//loop level_obj.writtingsArr
					for (var n=0; n<level_obj.writtingsArr.length; n++)
					{
						if((level_obj.writtingsArr[n][0] == level_obj.floorsArr2D[i][0])&&(level_obj.writtingsArr[n][1] == level_obj.floorsArr2D[i][1])&&(level_obj.writtingsArr[n][2] == 2))
						{
							writtingIsOnTheWall = n;
						}
					}
					
					if(writtingIsOnTheWall > -1)
					{
						//load curved wall with writting
						var wallWrit = create_game_object();
						wallWrit.name = "writting";
						wallWrit.model = level_obj.wall_model_curve_writ;
						wallWrit.position = new THREE.Vector3((level_obj.floorsArr2D[i][0])*SQUARE_SIZE,0.4*SQUARE_SIZE,(level_obj.floorsArr2D[i][1]-0.5)*SQUARE_SIZE);
						wallWrit.rotation = new THREE.Vector3(0, -Math.PI/2, 0);
						wallWrit.writtingIsOnTheWall = writtingIsOnTheWall;
						loadGameObjectCheck(loader, wallWrit) ;
						level_obj.writtingsArr[writtingIsOnTheWall][4] = wallWrit.mesh; //this will NOT change dynamically from 0 to pointer! we do it manually after model load...
					}
					else
					{
						//load wall model instead of regular flat wall
						var pos = new THREE.Vector3(0, 0, 0);
						var rot = new THREE.Vector3(0, 0, 0);
						pos.set((level_obj.floorsArr2D[i][0])*SQUARE_SIZE,0.4*SQUARE_SIZE,(level_obj.floorsArr2D[i][1]-0.5)*SQUARE_SIZE);
						rot.set(0, -Math.PI/2, 0);

						if((typeof level_obj.wall_model_curve_durve_right_left != 'undefined')&&(leftWall)&&(!rightBackWall)&&(!frontWall))
						{
							//model should be curved left and durved to right side
							loadModelCheck(loader, pos, rot, level_obj.wall_model_curve_durve_right_left);
						}
						else if((typeof level_obj.wall_model_curve_durve_left_right != 'undefined')&&(rightWall)&&(!leftBackWall)&&(!frontWall))
						{
							//model should be curved left and durved to right side
							loadModelCheck(loader, pos, rot, level_obj.wall_model_curve_durve_left_right);
						}
						else if((typeof level_obj.wall_model_curve_right != 'undefined')&&(!frontWall)&&(leftWall)&&(!rightWall))
						{
							//back wall curve right..
							loadModelCheck(loader, pos, rot, level_obj.wall_model_curve_right);
						}
						else if((typeof level_obj.wall_model_durve_r != 'undefined')&&(!leftBackWall))
						{
							//left_wall_curve_down
							loadModelCheck(loader, pos, rot, level_obj.wall_model_durve_r);
						}
						else if((typeof level_obj.wall_model_durve_l != 'undefined')&&(!rightBackWall))
						{
							//left_wall_curve_down
							loadModelCheck(loader, pos, rot, level_obj.wall_model_durve_l);
						}
						else if((typeof level_obj.wall_model_curve_left != 'undefined')&&(!frontWall)&&(!leftWall)&&(rightWall))
						{
							//left_wall_curve_down
							loadModelCheck(loader, pos, rot, level_obj.wall_model_curve_left);
						}
						else
						{
							loadModelCheck(loader, pos, rot, level_obj.wall_model);
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
		var wall_map = THREE.ImageUtils.loadTexture( level_obj.wall_texture_file );
		wall_map.wrapS = wall_map.wrapT = THREE.RepeatWrapping;
		wall_map.anisotropy = 16;
		var materialWall = new THREE.MeshLambertMaterial( { ambient: 0xbbbbbb, map: wall_map, side: THREE.DoubleSide } );
		var wallObj = new THREE.Mesh( new THREE.PlaneGeometry( SQUARE_SIZE, 0.8*SQUARE_SIZE, 1, 1 ), materialWall );
		//writting on the wall texture
		if(level_obj.writtingsArr.length>0)
		{
			var mapwrit = THREE.ImageUtils.loadTexture( level_obj.wall_writting_texture_file );
			mapwrit.wrapS = mapwrit.wrapT = THREE.RepeatWrapping;
			mapwrit.anisotropy = 16;
			materialWrit = new THREE.MeshLambertMaterial( { ambient: 0xbbbbbb, map: mapwrit, side: THREE.DoubleSide } );
			wallWritObject = new THREE.Mesh( new THREE.PlaneGeometry( SQUARE_SIZE, 0.8*SQUARE_SIZE, 1, 1 ), materialWrit );
		}

		for(var s=0; s<level_obj.secretWallsArr.length; s++)
		{
			
			//place wall depending on orientation
			//TODO implement other orientations
			if(level_obj.secretWallsArr[s][2] == 3)
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
				object.position.x = (level_obj.secretWallsArr[s][0]+0.5)*SQUARE_SIZE; //x
				object.position.y = 0.4*SQUARE_SIZE; //y
				object.position.z = (level_obj.secretWallsArr[s][1])*SQUARE_SIZE; //z
				if(level_obj.secretWallsArr[s].length > 3)
				{
					level_obj.secretWallsArr[s][3] = object;
				}
				scene.add( object );
			}
		}
		
		//console.log("writ regular walls");
		for(i=0; i < level_obj.floorsArr2D.length; i++)
		{

			var leftWall = true;
			var rightWall = true;
			var frontWall = true;
			var backWall = true;
			var xTile = level_obj.floorsArr2D[i][0];
			var yTile = level_obj.floorsArr2D[i][1];
			//make walls around floor tile, but check if it has neighboring tile..
			for(j=0; j < level_obj.floorsArr2D.length; j++)
			{
				if(i!=j)
				{
					if((level_obj.floorsArr2D[j][0] == xTile+1) && (level_obj.floorsArr2D[j][1] == yTile))
					{
						//there is floor tile to the left - no LeftWall.
						leftWall = false;
					}
					if((level_obj.floorsArr2D[j][0] == xTile-1) && (level_obj.floorsArr2D[j][1] == yTile))
					{
						//there is floor tile to the right - no RightWall.
						rightWall = false;
					}
					if((level_obj.floorsArr2D[j][0] == xTile) && (level_obj.floorsArr2D[j][1] == yTile+1))
					{
						//there is floor tile to the front - no FrontWall.
						frontWall = false;
					}
					if((level_obj.floorsArr2D[j][0] == xTile) && (level_obj.floorsArr2D[j][1] == yTile-1))
					{
						//there is floor tile to the back - no BackWall.
						backWall = false;
					}
					
				}
			}
			
			//check stairs
			if(typeof level_obj.stairsArr != 'undefined')
			{
				for(var s=0; s<level_obj.stairsArr.length; s++)
				{
					//front stairs
					if((level_obj.stairsArr[s][0] == xTile) && (level_obj.stairsArr[s][1] == yTile+1))
					{
						frontWall = false;
					}
					
					//back stairs
					if((level_obj.stairsArr[s][0] == xTile) && (level_obj.stairsArr[s][1] == yTile-1))
					{
						backWall = false;
					}
					
				}
			}
			
			if(leftWall)
			{
				//pillars
				var x1 = (level_obj.floorsArr2D[i][0])*SQUARE_SIZE+5;
				var x2 = (level_obj.floorsArr2D[i][0])*SQUARE_SIZE+5;
				var z1 = (level_obj.floorsArr2D[i][1])*SQUARE_SIZE+5;
				var z2 = (level_obj.floorsArr2D[i][1])*SQUARE_SIZE-5;
				addPillar(loader,level_obj,x1,z1);
				addPillar(loader,level_obj,x2,z2);

				var nicheIsOnTheWall = false;
				//loop level_obj.nicheArr
				for (var n=0; n<level_obj.nicheArr.length; n++)
				{
					if((level_obj.nicheArr[n][0] == level_obj.floorsArr2D[i][0])&&(level_obj.nicheArr[n][1] == level_obj.floorsArr2D[i][1])&&(level_obj.nicheArr[n][2] == 3))
					{
						nicheIsOnTheWall = true;
					}
				}
				
				if(nicheIsOnTheWall)
				{
					//load niche model instead of regular wall
					var pos = new THREE.Vector3(0, 0, 0);
					var rot = new THREE.Vector3(0, 0, 0);
					pos.set((level_obj.floorsArr2D[i][0]+0.5)*SQUARE_SIZE,0.4*SQUARE_SIZE,(level_obj.floorsArr2D[i][1])*SQUARE_SIZE);
					rot.set(0, -Math.PI/2, 0);
					loadModelCheck(loader, pos, rot, level_obj.niche_model);
				}
				else
				{
					//check if writting is on the wall
					var writtingIsOnTheWall = -1;
					//loop level_obj.writtingsArr
					for (var n=0; n<level_obj.writtingsArr.length; n++)
					{
						if((level_obj.writtingsArr[n][0] == level_obj.floorsArr2D[i][0])&&(level_obj.writtingsArr[n][1] == level_obj.floorsArr2D[i][1])&&(level_obj.writtingsArr[n][2] == 3))
						{
							writtingIsOnTheWall = n;
						}
					}
					
					if(writtingIsOnTheWall > -1)
					{
						//load wall with writting
						if(writtingIsOnTheWall==0)
						{
							level_obj.writtingsArr[writtingIsOnTheWall][4] = wallWritObject;
							object = wallWritObject;
						}
						else 
						{
							object = wallWritObject.clone();
							level_obj.writtingsArr[writtingIsOnTheWall][4] = object;
						}
					}
					else
					{
						//load regular wall
						object = wallObj.clone();
					}
					object.rotation.set(0, Math.PI/2, 0);
					//object.receiveShadow = true;
					object.position.x = (level_obj.floorsArr2D[i][0]+0.5)*SQUARE_SIZE; //x
					object.position.y = 0.4*SQUARE_SIZE; //y
					object.position.z = (level_obj.floorsArr2D[i][1])*SQUARE_SIZE; //z
					scene.add( object );
				}
			}
			
			if(rightWall)
			{
				//pillars
				var x1 = (level_obj.floorsArr2D[i][0])*SQUARE_SIZE-5;
				var x2 = (level_obj.floorsArr2D[i][0])*SQUARE_SIZE-5;
				var z1 = (level_obj.floorsArr2D[i][1])*SQUARE_SIZE+5;
				var z2 = (level_obj.floorsArr2D[i][1])*SQUARE_SIZE-5;
				addPillar(loader,level_obj,x1,z1);
				addPillar(loader,level_obj,x2,z2);

				var nicheIsOnTheWall = false;
				//loop level_obj.nicheArr
				for (var n=0; n<level_obj.nicheArr.length; n++)
				{
					if((level_obj.nicheArr[n][0] == level_obj.floorsArr2D[i][0])&&(level_obj.nicheArr[n][1] == level_obj.floorsArr2D[i][1])&&(level_obj.nicheArr[n][2] == 1))
					{
						nicheIsOnTheWall = true;
					}
				}
				
				if(nicheIsOnTheWall)
				{
					//load niche model instead of regular wall
					var pos = new THREE.Vector3(0, 0, 0);
					var rot = new THREE.Vector3(0, 0, 0);
					pos.set((level_obj.floorsArr2D[i][0]-0.5)*SQUARE_SIZE,0.4*SQUARE_SIZE,(level_obj.floorsArr2D[i][1])*SQUARE_SIZE);
					rot.set(0, Math.PI/2, 0);
					loadModelCheck(loader, pos, rot, level_obj.niche_model);
				}
				else
				{
					//check if writting is on the wall
					var writtingIsOnTheWall = -1;
					//loop level_obj.writtingsArr
					for (var n=0; n<level_obj.writtingsArr.length; n++)
					{
						if((level_obj.writtingsArr[n][0] == level_obj.floorsArr2D[i][0])&&(level_obj.writtingsArr[n][1] == level_obj.floorsArr2D[i][1])&&(level_obj.writtingsArr[n][2] == 1))
						{
							writtingIsOnTheWall = n;
						}
					}
					
					if(writtingIsOnTheWall > -1)
					{
						//load wall with writting
						if(writtingIsOnTheWall==0)
						{
							level_obj.writtingsArr[writtingIsOnTheWall][4] = wallWritObject;
							object = wallWritObject;
						}
						else 
						{
							object = wallWritObject.clone();
							level_obj.writtingsArr[writtingIsOnTheWall][4] = object;
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
					object.position.x = (level_obj.floorsArr2D[i][0]-0.5)*SQUARE_SIZE; //x
					object.position.y = 0.4*SQUARE_SIZE; //y
					object.position.z = (level_obj.floorsArr2D[i][1])*SQUARE_SIZE; //z
					scene.add( object );
				}
			}
			if(frontWall)
			{
				//pillars
				var x1 = (level_obj.floorsArr2D[i][0])*SQUARE_SIZE+5;
				var x2 = (level_obj.floorsArr2D[i][0])*SQUARE_SIZE-5;
				var z1 = (level_obj.floorsArr2D[i][1])*SQUARE_SIZE+5;
				var z2 = (level_obj.floorsArr2D[i][1])*SQUARE_SIZE+5;
				addPillar(loader,level_obj,x1,z1);
				addPillar(loader,level_obj,x2,z2);

				var nicheIsOnTheWall = false;
				//loop level_obj.nicheArr
				for (var n=0; n<level_obj.nicheArr.length; n++)
				{
					if((level_obj.nicheArr[n][0] == level_obj.floorsArr2D[i][0])&&(level_obj.nicheArr[n][1] == level_obj.floorsArr2D[i][1])&&(level_obj.nicheArr[n][2] == 0))
					{
						nicheIsOnTheWall = true;
					}
				}
				
				if(nicheIsOnTheWall)
				{
					//load niche model instead of regular wall
					var pos = new THREE.Vector3(0, 0, 0);
					var rot = new THREE.Vector3(0, 0, 0);
					pos.set((level_obj.floorsArr2D[i][0])*SQUARE_SIZE,0.4*SQUARE_SIZE,(level_obj.floorsArr2D[i][1]+0.5)*SQUARE_SIZE);
					rot.set(0, Math.PI, 0);
					loadModelCheck(loader, pos, rot, level_obj.niche_model);
				}
				else
				{
					//check if writting is on the wall
					var writtingIsOnTheWall = -1;
					//loop level_obj.writtingsArr
					for (var n=0; n<level_obj.writtingsArr.length; n++)
					{
						if((level_obj.writtingsArr[n][0] == level_obj.floorsArr2D[i][0])&&(level_obj.writtingsArr[n][1] == level_obj.floorsArr2D[i][1])&&(level_obj.writtingsArr[n][2] == 0))
						{
							writtingIsOnTheWall = n;
						}
					}
					
					if(writtingIsOnTheWall > -1)
					{
						//load wall with writting
						if(writtingIsOnTheWall==0)
						{
							level_obj.writtingsArr[writtingIsOnTheWall][4] = wallWritObject;
							object = wallWritObject;
						}
						else 
						{
							object = wallWritObject.clone();
							level_obj.writtingsArr[writtingIsOnTheWall][4] = object;
						}
					}
					else
					{
						//load regular wall
						object = wallObj.clone();
					}
					object.rotation.set(0, Math.PI, 0);
					//object.receiveShadow = true;
					object.position.x = level_obj.floorsArr2D[i][0]*SQUARE_SIZE; //x
					object.position.y = 0.4*SQUARE_SIZE; //y
					object.position.z = (level_obj.floorsArr2D[i][1]+0.5)*SQUARE_SIZE; //z
					scene.add( object );
				}
			}
			if(backWall)
			{
				//pillars
				var x1 = (level_obj.floorsArr2D[i][0])*SQUARE_SIZE+5;
				var x2 = (level_obj.floorsArr2D[i][0])*SQUARE_SIZE-5;
				var z1 = (level_obj.floorsArr2D[i][1])*SQUARE_SIZE-5;
				var z2 = (level_obj.floorsArr2D[i][1])*SQUARE_SIZE-5;
				addPillar(loader,level_obj,x1,z1);
				addPillar(loader,level_obj,x2,z2);
				
				var nicheIsOnTheWall = false;
				//loop level_obj.nicheArr
				for (var n=0; n<level_obj.nicheArr.length; n++)
				{
					if((level_obj.nicheArr[n][0] == level_obj.floorsArr2D[i][0])&&(level_obj.nicheArr[n][1] == level_obj.floorsArr2D[i][1])&&(level_obj.nicheArr[n][2] == 2))
					{
						nicheIsOnTheWall = true;
					}
				}
				
				if(nicheIsOnTheWall)
				{
					//load niche model instead of regular wall
					var pos = new THREE.Vector3(0, 0, 0);
					var rot = new THREE.Vector3(0, 0, 0);
					pos.set((level_obj.floorsArr2D[i][0])*SQUARE_SIZE,0.4*SQUARE_SIZE,(level_obj.floorsArr2D[i][1]-0.5)*SQUARE_SIZE);
					rot.set(0, 0, 0);
					loadModelCheck(loader, pos, rot, level_obj.niche_model);
				}
				else
				{
					//check if writting is on the wall
					var writtingIsOnTheWall = -1;
					//loop level_obj.writtingsArr
					for (var n=0; n<level_obj.writtingsArr.length; n++)
					{
						if((level_obj.writtingsArr[n][0] == level_obj.floorsArr2D[i][0])&&(level_obj.writtingsArr[n][1] == level_obj.floorsArr2D[i][1])&&(level_obj.writtingsArr[n][2] == 2))
						{
							writtingIsOnTheWall = n;
						}
					}
					
					if(writtingIsOnTheWall > -1)
					{
						//load wall with writting
						
						if(writtingIsOnTheWall==0)
						{
							level_obj.writtingsArr[writtingIsOnTheWall][4] = wallWritObject;
							object = wallWritObject;
						}
						else 
						{
							object = wallWritObject.clone();
							level_obj.writtingsArr[writtingIsOnTheWall][4] = object;
						}
					}
					else
					{
						//load regular wall
						object = wallObj.clone();
					}
					object.rotation.set(0, Math.PI, 0);
					//object.receiveShadow = true;
					object.position.x = level_obj.floorsArr2D[i][0]*SQUARE_SIZE; //x
					object.position.y = 0.4*SQUARE_SIZE; //y
					object.position.z = (level_obj.floorsArr2D[i][1]-0.5)*SQUARE_SIZE; //z
					scene.add( object );
				}
			}
		}
	}
}


function load_floors_level(loader, level_obj)
{
	var floor_map = THREE.ImageUtils.loadTexture( level_obj.floor_texture_file );
	floor_map.wrapS = floor_map.wrapT = THREE.RepeatWrapping;
	floor_map.anisotropy = 16;
	
	console.log("load_floors_level enter");

	//teleport
	var teleport_material;
	if(level_obj.teleportArr.length > 0)
	{
		var teleport_map = THREE.ImageUtils.loadTexture( level_obj.teleport_floor_texture_file );
		teleport_map.anisotropy = 16;
		teleport_material = new THREE.MeshLambertMaterial( { ambient: 0xbbbbbb, map: teleport_map, side: THREE.DoubleSide } );
	}
	
	var floor_material = new THREE.MeshLambertMaterial( { ambient: 0xbbbbbb, map: floor_map, side: THREE.DoubleSide } );
	var floorObj = new THREE.Mesh( new THREE.PlaneGeometry( SQUARE_SIZE, SQUARE_SIZE, 1, 1 ), floor_material );

	var ceiling_map = THREE.ImageUtils.loadTexture( level_obj.ceiling_texture_file );
	ceiling_map.wrapS = ceiling_map.wrapT = THREE.RepeatWrapping;
	ceiling_map.anisotropy = 16;
	var ceiling_material = new THREE.MeshLambertMaterial( { ambient: 0xbbbbbb, map:ceiling_map, side: THREE.DoubleSide } );
	var ceilingObj = new THREE.Mesh( new THREE.PlaneGeometry( SQUARE_SIZE, SQUARE_SIZE, 1, 1 ), ceiling_material );
	
	//floors
	for(var i=0; i < level_obj.floorsArr2D.length; i++)
	{
		var fx = level_obj.floorsArr2D[i][0];
		var fz = level_obj.floorsArr2D[i][1];
		var north_neighbor = false; //up
		var south_neighbor = false; //down
		var east_neighbor = false; //right
		var west_neighbor = false; //left
		var north_east_neighbor = false;
		var south_east_neighbor = false;
		
		for(var ff=0; ff < level_obj.floorsArr2D.length; ff++)
		{
			if((level_obj.floorsArr2D[ff][0] == fx)&&(level_obj.floorsArr2D[ff][1] == fz+1))
			{
				//this floortile has north neighbor
				//console.log("tile has north x:" + fx + " z:" + fz);
				north_neighbor=true;
			}
			if((level_obj.floorsArr2D[ff][0] == fx)&&(level_obj.floorsArr2D[ff][1] == fz-1))
			{
				//this floortile has south neighbor
				south_neighbor=true;
			}
			if((level_obj.floorsArr2D[ff][0] == fx+1)&&(level_obj.floorsArr2D[ff][1] == fz))
			{
				//this floortile has west neighbor
				west_neighbor=true;
			}
			if((level_obj.floorsArr2D[ff][0] == fx-1)&&(level_obj.floorsArr2D[ff][1] == fz))
			{
				//this floortile has east neighbor
				east_neighbor=true;
			}
			if((level_obj.floorsArr2D[ff][0] == fx-1)&&(level_obj.floorsArr2D[ff][1] == fz+1))
			{
				//this floortile has north-west neighbor
				north_east_neighbor=true;
			}
			if((level_obj.floorsArr2D[ff][0] == fx-1)&&(level_obj.floorsArr2D[ff][1] == fz-1))
			{
				//this floortile has north-west neighbor
				south_east_neighbor=true;
			}
		}
		
		if(level_obj.suporter_model != "")
		{
			if((north_neighbor)&&(!south_neighbor)&&(!west_neighbor)&&(!east_neighbor))
			{
				//console.log("tile has low corner x:" + fx + " z:" + fz);
				//put supporter in the low corner
				var suporter_pos = new THREE.Vector3(fx*SQUARE_SIZE, 0, (fz-0.5)*SQUARE_SIZE);
				var suporter_rot = new THREE.Vector3(0, 0, 0);
				loadModelCheck(loader, suporter_pos, suporter_rot, level_obj.suporter_model);
				//show_model(loader, level_obj.suporter_model, fx,fz-0.5,0);
			}
			if((south_neighbor)&&(!north_neighbor)&&(!west_neighbor)&&(!east_neighbor))
			{
				//console.log("tile has high corner x:" + fx + " z:" + fz);
				//put supporter in the up corner
				var suporter_pos = new THREE.Vector3(fx*SQUARE_SIZE, 0, (fz+0.5)*SQUARE_SIZE);
				var suporter_rot = new THREE.Vector3(0, Math.PI, 0);
				loadModelCheck(loader, suporter_pos, suporter_rot, level_obj.suporter_model);
				//show_model(loader, level_obj.suporter_model, fx,fz+0.5,Math.PI);
			}
			if((west_neighbor)&&(!north_neighbor)&&(!south_neighbor)&&(!east_neighbor))
			{
				//console.log("tile has right corner x:" + fx + " z:" + fz);
				//put supporter in the right corner
				var suporter_pos = new THREE.Vector3((fx-0.5)*SQUARE_SIZE, 0, fz*SQUARE_SIZE);
				var suporter_rot = new THREE.Vector3(0, Math.PI/2, 0);
				loadModelCheck(loader, suporter_pos, suporter_rot, level_obj.suporter_model);
				//show_model(loader, level_obj.suporter_model, fx-0.5,fz,Math.PI/2);
			}
			if((east_neighbor)&&(!north_neighbor)&&(!west_neighbor)&&(!south_neighbor))
			{
				//console.log("tile has left corner x:" + fx + " z:" + fz);
				//put supporter in the left corner
				var suporter_pos = new THREE.Vector3((fx+0.5)*SQUARE_SIZE, 0, fz*SQUARE_SIZE);
				var suporter_rot = new THREE.Vector3(0, -Math.PI/2, 0);
				loadModelCheck(loader, suporter_pos, suporter_rot, level_obj.suporter_model);
				//show_model(loader, level_obj.suporter_model, fx+0.5,fz,-Math.PI/2);
			}
			
			if((east_neighbor)&&(north_neighbor)&&(!west_neighbor)&&(south_neighbor))
			{
				//one supporter on the right to ablige start of corridor
				var suporter_pos = new THREE.Vector3((fx-0.5)*SQUARE_SIZE, 0, fz*SQUARE_SIZE);
				var suporter_rot = new THREE.Vector3(0, Math.PI/2, 0);
				loadModelCheck(loader, suporter_pos, suporter_rot, level_obj.suporter_model);
				//show_model(loader, level_obj.suporter_model, fx-0.5,fz,Math.PI/2);
			}
			if((south_neighbor)&&(!north_neighbor)&&(west_neighbor)&&(east_neighbor)&&(!south_east_neighbor))
			{
				//one supporter on the low to ablige start of corridor
				var suporter_pos = new THREE.Vector3(fx*SQUARE_SIZE, 0, (fz-0.5)*SQUARE_SIZE);
				var suporter_rot = new THREE.Vector3(0, 0, 0);
				loadModelCheck(loader, suporter_pos, suporter_rot, level_obj.suporter_model);
				//show_model(loader, level_obj.suporter_model, fx,fz-0.5,0);
			}
			if((west_neighbor)&&(north_neighbor)&&(!east_neighbor)&&(south_neighbor))
			{
				//one supporter on the low to ablige start of corridor
				var suporter_pos = new THREE.Vector3((fx+0.5)*SQUARE_SIZE, 0, fz*SQUARE_SIZE);
				var suporter_rot = new THREE.Vector3(0, 3*Math.PI/2, 0);
				loadModelCheck(loader, suporter_pos, suporter_rot, level_obj.suporter_model);
				//show_model(loader, level_obj.suporter_model, fx+0.5,fz,3*Math.PI/2);
			}
			if((north_neighbor)&&(!south_neighbor)&&(west_neighbor)&&(east_neighbor)&&(!north_east_neighbor))
			{
				//one supporter on the low to ablige start of corridor
				var suporter_pos = new THREE.Vector3(fx*SQUARE_SIZE, 0, (fz+0.5)*SQUARE_SIZE);
				var suporter_rot = new THREE.Vector3(0, Math.PI, 0);
				loadModelCheck(loader, suporter_pos, suporter_rot, level_obj.suporter_model);
				//show_model(loader, level_obj.suporter_model, fx,fz+0.5,Math.PI);
			}
			//TODO!!!
		}

		holeSpot = false;
		for (var h=0; h<level_obj.holesArr.length; h++)
		{
			if((level_obj.holesArr[h][0] == level_obj.floorsArr2D[i][0]) && (level_obj.holesArr[h][1] == level_obj.floorsArr2D[i][1]))
			holeSpot = true;
		}
		//if this floor tile is hole, make a hole, else make floor
		
		if(holeSpot)
		{
			//add hole model
			var pos = new THREE.Vector3(0, 0, 0);
			var rot = new THREE.Vector3(0, 0, 0);
			pos.x = level_obj.floorsArr2D[i][0]*SQUARE_SIZE;
			pos.z = level_obj.floorsArr2D[i][1]*SQUARE_SIZE;
			loadModelCheck(loader, pos, rot, level_obj.hole_model);
		}
		else
		{
			//add floor tile
			if((level_obj.teleportArr.length > 0) && (positionIsTeleport(level_obj.floorsArr2D[i][0], level_obj.floorsArr2D[i][1])))
			{
				object = new THREE.Mesh( new THREE.PlaneGeometry( SQUARE_SIZE, SQUARE_SIZE, 1, 1 ), teleport_material );
			}
			else
			{
				object = floorObj.clone();
			}
			object.rotation.set(-Math.PI/2, 0, 0);
			//object.receiveShadow = true;
			
			object.position.x = level_obj.floorsArr2D[i][0]*SQUARE_SIZE; //x
			object.position.y = 0; //y
			object.position.z = level_obj.floorsArr2D[i][1]*SQUARE_SIZE; //z
	
			scene.add( object );
		}
		
		
		
		//ceiling
		var holeAboveSpot = false;
		for (var h=0; h<level_obj.holesAboveArr.length; h++)
		{
			if((level_obj.holesAboveArr[h][0] == level_obj.floorsArr2D[i][0]) && (level_obj.holesAboveArr[h][1] == level_obj.floorsArr2D[i][1]))
			holeAboveSpot = true;
		}
		
		//if this ceiling tile is hole above, make a hole above, else make ceiling
		var pos = new THREE.Vector3(0, 0, 0);
		var rot = new THREE.Vector3(Math.PI, 0, 0);
		pos.x = level_obj.floorsArr2D[i][0]*SQUARE_SIZE;
		pos.z = level_obj.floorsArr2D[i][1]*SQUARE_SIZE;
		pos.y = 8;
		if(holeAboveSpot)
		{
			//add hole model
			loadModelCheck(loader, pos,rot, level_obj.hole_above_model);
		}
		else
		{
		
			if (level_obj.curved_ceiling == true)
			{
				if((north_neighbor)&&(south_neighbor)&&(!west_neighbor)&&(!east_neighbor))
				{
					rot.set(0, -Math.PI/2, 0);
					loadModelCheck(loader, pos, rot, level_obj.celing_model_fb);
				}
				else if((!north_neighbor)&&(!south_neighbor)&&(west_neighbor)&&(east_neighbor))
				{
					rot.set(0, 0, 0);
					loadModelCheck(loader, pos, rot, level_obj.celing_model_fb);
				}
				else if((north_neighbor)&&(south_neighbor)&&(!west_neighbor)&&(east_neighbor))
				{
					rot.set(0, -Math.PI/2, 0);
					loadModelCheck(loader, pos, rot, level_obj.celing_model_fb);
				}
				else if((north_neighbor)&&(south_neighbor)&&(!west_neighbor)&&(east_neighbor))
				{
					rot.set(0, -Math.PI/2, 0);
					loadModelCheck(loader, pos, rot, level_obj.celing_model_fb);
				}
			}
			else
			{
				//object = new THREE.Mesh( new THREE.PlaneGeometry( SQUARE_SIZE, SQUARE_SIZE, 1, 1 ), ceiling_material );
				object = ceilingObj.clone();
				//object.position.set( 0-i*SQUARE_SIZE, -1, 0 );
				object.rotation.set(-Math.PI/2, 0, 0);
				//object.receiveShadow = true;
				
			
				object.position.x = level_obj.floorsArr2D[i][0]*SQUARE_SIZE; //x
				object.position.y = 0.8*SQUARE_SIZE; //y
				object.position.z = level_obj.floorsArr2D[i][1]*SQUARE_SIZE; //z

				scene.add( object );
			}
		}

	}
}


//used in temp level loading
function reload_stairs(levelObj)
{
	for(var i=0; i<levelObj.array_of_stairs.length;i++)
	{
		scene.add(levelObj.array_of_stairs[i].mesh);
	}
}

//stairs comment goes here
function load_stairs(loader, levelObj)
{
	if(typeof levelObj.stairsArr != 'undefined')
	{
		for(var s=0; s<levelObj.stairsArr.length; s++)
		{
			var stair = create_game_object();
			stair.name = "stair";
			stair.model = levelObj.stairsArr[s][3];

			stair.position.y = 0;
			stair.position.x = levelObj.stairsArr[s][0]*SQUARE_SIZE;
			stair.position.z = levelObj.stairsArr[s][1]*SQUARE_SIZE;
			if(levelObj.stairsArr[s][2]==1) stair.rotation.set(0,-Math.PI/2,0);
			if(levelObj.stairsArr[s][2]==2) stair.rotation.set(0,Math.PI,0);
			if(levelObj.stairsArr[s][2]==3) stair.rotation.set(0,Math.PI/2,0);
			levelObj.stairsArr[s][4] = stair; //game object is assigned back at array

			loadGameObjectCheck(loader, stair);
			
			levelObj.array_of_stairs.push(stair);
		}
	}
}

//load what is in dynamic arrays
function load_level_obj_temp(level_obj)
{
	//load floors and holes and ceilings
	load_floors_level(globalJSONloader, level_obj);
	
	//walls
	load_walls_level(globalJSONloader, level_obj);

	//doors
	reload_doors(globalJSONloader, level_obj);
	
	//pillars are in props.js file
	reload_pillars(level_obj);
	
	//buttons
	reload_buttons(level_obj);

	//props
	reload_props(level_obj);
	
	//animated props
	reload_animated_props(level_obj);

	//monsters
	reload_monsters(level_obj);
	
	//pickables
	reload_pickables(level_obj);
	
	//niches - for some reason we dont need to reload niches. they are there with pickables.
	//reload_niches(level_obj);
	
	//keyholes
	reload_keyholes(level_obj);

	//stairs
	reload_stairs(level_obj);
	
	//load lights specific for each level
	reload_level_lights(level_obj);

	//I couldnt store color in json and assign it to fog in one line for the life of it
	scene.fog.color.r = level_obj.fog_color[0];
	scene.fog.color.g = level_obj.fog_color[1];
	scene.fog.color.b = level_obj.fog_color[2];
	scene.fog.density = level_obj.fog_density;
	
	//load tapestries
	reload_tapestries(level_obj);
	
	//load pressure plates (plynths)
	reload_plates(level_obj);

	//load chests
	reload_containers(level_obj);
	
	var onLoadFn = window[level_obj.levelOnLoad];
	if(typeof onLoadFn === 'function') 
	{
		onLoadFn(level_obj);
	}

	//if level is entered and players is standing on pressure plate, active it
	var plateID = standing_on_plate(level_obj);
	if(plateID>-1)
	{
		if (level_obj.array_of_plates[plateID].pressed == 0)
		{
			//call pressure plate onPress function..
			console.log("plate pressed!");
			level_obj.array_of_plates[plateID].pressed = 1;
			level_obj.array_of_plates[plateID].position.y -=0.2;
			if(level_obj.array_of_plates[plateID].mesh != 0)
				level_obj.array_of_plates[plateID].mesh.position.y -=0.2;
			plate_click_audio.play();
			level_obj.array_of_plates[plateID].onPressFunc();
		}
	}

}

//load floors and walls and holes and niches and all basic and static level elements
function load_level_obj(level_obj)
{

	//load floors and holes and ceilings
	load_floors_level(globalJSONloader, level_obj);
	
	//walls
	load_walls_level(globalJSONloader, level_obj);

	//doors
	load_doors(globalJSONloader, level_obj);
	
	//pillars are in props.js file
	load_pillars(globalJSONloader, level_obj);
	
	//buttons
	load_buttons(globalJSONloader, level_obj);
	
	//load chests
	load_containers(globalJSONloader, level_obj);

	//props
	load_props(globalJSONloader, level_obj);
	
	//animated props
	load_animated_props(globalJSONloader, level_obj);

	//monsters
	load_monsters(globalJSONloader, level_obj);
	
	//pickables
	load_pickables(globalJSONloader, level_obj);

	//niches
	load_niches(globalJSONloader, level_obj);
	
	//keyholes
	load_keyholes(globalJSONloader, level_obj);
	
	//stairs
	load_stairs(globalJSONloader, level_obj);
	
	//load lights specific for each level
	load_level_lights(level_obj);
	
	scene.fog.color.r = level_obj.fog_color[0];
	scene.fog.color.g = level_obj.fog_color[1];
	scene.fog.color.b = level_obj.fog_color[2];
	scene.fog.density = level_obj.fog_density;
	
	//load tapestries
	load_tapestries(globalJSONloader, level_obj);
	
	//load pressure plates (plynths)
	load_plates(globalJSONloader, level_obj);
	
	//level specific action on load
	//levelOnLoad(); level3OnLoad(level_obj);
	var onLoadFn = window[level_obj.levelOnLoad];
	if(typeof onLoadFn === 'function') 
	{
		onLoadFn(level_obj);
	}

	//if level is entered and players is standing on pressure plate, active it
	var plateID = standing_on_plate(level_obj);
	if(plateID>-1)
	{
		if (level_obj.array_of_plates[plateID].pressed == 0)
		{
			//call pressure plate onPress function..
			console.log("plate pressed!");
			level_obj.array_of_plates[plateID].pressed = 1;
			level_obj.array_of_plates[plateID].position.y -=0.2;
			if(level_obj.array_of_plates[plateID].mesh != 0)
				level_obj.array_of_plates[plateID].mesh.position.y -=0.2;
			plate_click_audio.play();
			level_obj.array_of_plates[plateID].onPressFunc();
		}
	}

	//console.log("level end time:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: " + Date.now());
}



var nextlevelObj = {};
var currentlevelObj = {};
var arrayOfVisitedLevels = [];

function get_levels_cb(levelId,entrance)
{
	console.log("get_levels_cb levelId: " + levelId);
	if (xmlhttp.readyState==4 && xmlhttp.status==200)
	{
		// Javascript function JSON.parse to parse JSON data
        var levelJson = JSON.parse(xmlhttp.responseText);
		nextlevelObj = levelJson["level"];
		nextlevelObj.array_of_doors = [];
		nextlevelObj.array_of_doorways = [];
		nextlevelObj.array_of_buttons = [];
		nextlevelObj.array_of_keyholes = [];
		nextlevelObj.array_of_containers = [];
		nextlevelObj.array_of_pillars = [];
		nextlevelObj.array_of_props = [];
		nextlevelObj.array_of_animated_props = [];
		nextlevelObj.array_of_monsters = [];
		nextlevelObj.array_of_pickables = [];
		nextlevelObj.array_of_plates = [];
		nextlevelObj.array_of_stairs = [];
		nextlevelObj.array_of_lights = [];
		nextlevelObj.array_of_tapestries = [];
		nextlevelObj.array_of_niches = [];
		console.log("get_levels_cb: level acquired.. totalModels:" + levelJson["level"]["totalModels"]);
        
        //if this level is saved, we should load saved version.
        if(levelIsSaved(levelId))
        {
            loadLevelJsonSavedGame(nextlevelObj,levelId,entrance,arrayOfGameStories[currentStory][0]);
            console.log("look where i go");
        }
        else
        {
        	loadLevelJson(nextlevelObj,levelId,entrance);
        }
	}
	else
	{
		console.log("get_levels_cb: " + xmlhttp.readyState);
		nextlevelObj = {};
		//TODO: display error
	}
}

function loadJSONfile(id,entrance)
{
	//get items json async, after JSON is retrieved call the function to proceed with level loading
	ajaxGet("maps/level"+id+"/level"+id+".json",function(){get_levels_cb(id,entrance)},true);
}

//This one is used when moving from level to level
function loadLevel(id,entrance)
{
	gameState = GAME_STATE_LOADING;
	modelNumber = 0;
	relativeLevelModelCount = 0;

	//stop ambient music of current level
	if(typeof currentlevelObj.audio_ambient != 'undefined')
	{
		currentlevelObj.audio_ambient.loop = false;
		currentlevelObj.audio_ambient.pause();
		currentlevelObj.audio_ambient.currentTime = 0;
		console.log("sprangeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
	}
	
	//store current level object
	//this should only push pointer to array, so if we change level object later, it will also change in the array.
	//also, if new game is calling this function, it is reverting arrayOfVisitedLevels to [] right after this call.
	if(typeof currentlevelObj.id != 'undefined')
	{
		//if current level already in arrayOfVisitedLevels, skip pushing
		var levelFound = false;
		for (var i=0; i<arrayOfVisitedLevels.length; i++)
		{
			if(arrayOfVisitedLevels[i].id == currentlevelObj.id)
			{
				levelFound = true;
				break;
			}
		}

		if(!levelFound)
			arrayOfVisitedLevels.push(currentlevelObj);
	}

	//if level already visited, get that object
	for (var i=0; i<arrayOfVisitedLevels.length; i++)
	{
		if(arrayOfVisitedLevels[i].id == id)
		{
			//lets go back a level :)
			loadTempLevel(arrayOfVisitedLevels[i],entrance);
			return;
		}
	}
	
	//load level js file dinamically, proceed with loadJSONfile when script is ready (onload)
	var fileref = document.createElement("script");
	fileref.type = "text/javascript";
	fileref.src = "maps/level"+id+"/level"+id+".js";
	document.body.appendChild(fileref);
	
	fileref.onload = function() {
		loadJSONfile(id,entrance);
    };
}

//this one is used when moving to already visited level (still in RAM)
function loadTempLevel(nextlevelObj,entrance)
{
	loading_msg_span.innerHTML = "Loading...";
	loading_msg_text_span.innerHTML = "Moving to a new level.";
	loading_div.style.display = "block";

	//clear scene, clear current level
	for( var i = scene.children.length - 1; i >= 0; i--) 
	{
		var tmpobj = scene.children[i];
		if(!tmpobj.noremove)
		{
			//console.log("removing " + tmpobj.name);
			scene.remove(tmpobj);
		}
		else
		{
			//console.log("skipping " + tmpobj.name);
		}
	}

	currentlevelObj = nextlevelObj;
	current_level = nextlevelObj.id;
	current_position = new THREE.Vector3(nextlevelObj.levelEntrances[entrance][0],0,nextlevelObj.levelEntrances[entrance][1]);
	current_rotation = nextlevelObj.levelEntrances[entrance][2];

	//load what is in dynamic arrays
	load_level_obj_temp(currentlevelObj);

	//camera
	if((current_rotation==0)||(current_rotation==2)) camera.position.x = current_position.x*10;
	else if(current_rotation==1) camera.position.x = current_position.x*10-5;
	else camera.position.x = current_position.x*10+5;
	camera.position.y = 4;
	if((current_rotation==1)||(current_rotation==3)) camera.position.z = current_position.z*10;
	else if(current_rotation==0) camera.position.z = current_position.z*10-5; //115
	else camera.position.z = current_position.z*10+5;
	if(current_rotation==0) camera.look = new THREE.Vector3(current_position.x*10,4,current_position.z*10+5); //160,4,125
	else if(current_rotation==1) camera.look = new THREE.Vector3(current_position.x*10+5,4,current_position.z*10); //160,4,125
	else if(current_rotation==2) camera.look = new THREE.Vector3(current_position.x*10,4,current_position.z*10-5); //160,4,125
	else camera.look = new THREE.Vector3(current_position.x*10-5,4,current_position.z*10); //160,4,125
	camera.lookAt(camera.look);
	
	//one light that follows player around
	pointLight.position.set( current_position.x*10, 4, current_position.z*10 );

	//TODO dont write this on first level
	//addToConsole("Moved to another level.","#BBFFBB");
	
	updateModelLoading("end of level load");
		
	console.log("kraj dva");

}

function loadLevelJson(nextlevelObj,levelId,entrance)
{
	
	if(nextlevelObj == {})
	{
		//display no more levels info..
		displayLevelInCompleteDialog();
		return;
	}
	
	//when player opens website and starts new game or load, current_level should be 0, so ne need for cleanup
	if(current_level != 0)
	{
		loading_msg_span.innerHTML = "Loading...";
		loading_msg_text_span.innerHTML = "Moving to a new level.";
		loading_div.style.display = "block";
		
		//clear scene, clear current level
		for( var i = scene.children.length - 1; i >= 0; i--) 
		{
			var tmpobj = scene.children[i];
			if(!tmpobj.noremove)
			{
				//console.log("removing " + tmpobj.name);
				scene.remove(tmpobj);
			}
			else
			{
				//console.log("skipping " + tmpobj.name);
			}
		}

		//they say this is fastest solution for clearing an array :)
		//clear arrays ?
		//DO WE DO THISSSS???
		//No. When player leaves a level, we store levelObj with all dynamic arrays populated.
		//When player returns to that level, we have everything as he left it.
		//If memory becomes issue, then we might rewrite this.
		/*while(currentlevelObj.array_of_monsters.length > 0) {
			currentlevelObj.array_of_monsters.pop();
		}
		while(currentlevelObj.array_of_props.length > 0) {
			currentlevelObj.array_of_props.pop();
		}
		while(currentlevelObj.array_of_animated_props.length > 0) {
			currentlevelObj.array_of_animated_props.pop();
		}
		while(currentlevelObj.array_of_pickables.length > 0) {
			currentlevelObj.array_of_pickables.pop();
		}*/
	}
	
	//load next level
	currentlevelObj = nextlevelObj;
	current_level = levelId;
	current_position = new THREE.Vector3(nextlevelObj.levelEntrances[entrance][0],0,nextlevelObj.levelEntrances[entrance][1]);
	current_rotation = nextlevelObj.levelEntrances[entrance][2];

	//load level walls and floors etc..
	load_level_obj(currentlevelObj);

	//camera
	if((current_rotation==0)||(current_rotation==2)) camera.position.x = current_position.x*10;
	else if(current_rotation==1) camera.position.x = current_position.x*10-5;
	else camera.position.x = current_position.x*10+5;
	
	camera.position.y = 4;
	
	if((current_rotation==1)||(current_rotation==3)) camera.position.z = current_position.z*10;
	else if(current_rotation==0) camera.position.z = current_position.z*10-5; //115
	else camera.position.z = current_position.z*10+5;
	
	if(current_rotation==0) camera.look = new THREE.Vector3(current_position.x*10,4,current_position.z*10+5); //160,4,125
	else if(current_rotation==1) camera.look = new THREE.Vector3(current_position.x*10+5,4,current_position.z*10); //160,4,125
	else if(current_rotation==2) camera.look = new THREE.Vector3(current_position.x*10,4,current_position.z*10-5); //160,4,125
	else camera.look = new THREE.Vector3(current_position.x*10-5,4,current_position.z*10); //160,4,125
	camera.lookAt(camera.look);
	
	//one light that follows player around
	pointLight.position.set( current_position.x*10, 4, current_position.z*10 );

	//TODO dont write this on first level
	//addToConsole("Moved to another level.","#BBFFBB");
	
	//setTimeout(function(){remove_loading_screen()}, 500);
	updateModelLoading("end of level load");
		
	console.log("kraj");

}