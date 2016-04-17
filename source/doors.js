
//doors

var DOOR_ANIMATE_SLIDE_DOWN_UP = 0; //0-slide/down/up 
var DOOR_ANIMATE_SLIDE_UP_DOWN = 1; //1-slide/up/down 
var DOOR_ANIMATE_SLIDE_RIGHT_LEFT = 2; //2-slide/right/left 
var DOOR_ANIMATE_SLIDE_LEFT_RIGHT = 3; //3-slide/left/right 
var DOOR_ANIMATE_ROTATE_CENTER_LEFT_RIGHT = 4; //4-rotatec/left/right 
var DOOR_ANIMATE_ROTATE_CENTER_RIGHT_LEFT = 5; //5-rotatec/right/left 
var DOOR_ANIMATE_ROTATE_OFFSET_LEFT_RIGHT = 6; //6-rotateo/left/right 
var DOOR_ANIMATE_ROTATE_OFFSET_RIGHT_LEFT = 7; //7-rotateo/right/left 
var DOOR_ANIMATE_ROTATE_OFFSET_UP_DOWN = 8; //8-rotateo/top/down 
var DOOR_ANIMATE_ROTATE_OFFSET_DOWN_UP = 9; //9-rotateo/down/up

var angle = -1;
var dongle = 4.2;
var z_initial = -1;
var x_initial = -1;

function setDoorOpened(door)
{
	{
		open_style = door.openAnimation;
		
		switch(open_style)
		{
			case DOOR_ANIMATE_SLIDE_DOWN_UP:
			{
				door.position.y = 7.5;
				if(door.mesh != 0) 
                    door.mesh.position.y = 7.5;
			}
			break;
			case DOOR_ANIMATE_SLIDE_RIGHT_LEFT:
			{
			}
			break;
			case DOOR_ANIMATE_ROTATE_OFFSET_RIGHT_LEFT:
			{
				//opening door to the left, depends on initial door rotation
				if(door.orientation == 0)
				{
					door.rotation.y = Math.PI/2;
					if(door.mesh != 0) 
                        door.mesh.rotation.y = Math.PI/2;
				}
				else if(door.orientation == 1)
				{
                    door.rotation.y = Math.PI;
                    door.position.x -=4.0;
                    door.position.z +=4.0;
					if(door.mesh != 0) 
                    {
                        door.mesh.rotation.y = Math.PI;
                        door.mesh.position.x -=4.0;
                        door.mesh.position.z +=4.0;
                    }
				}
				else if(door.orientation == 2)
				{
                    door.rotation.y = Math.PI*3/2;
					if(door.mesh != 0) 
                        door.mesh.rotation.y = Math.PI*3/2;
				}
				else if(door.orientation == 3)
				{
                    door.rotation.y = Math.PI;
					if(door.mesh != 0) 
                        door.mesh.rotation.y = Math.PI;
				}

			}
			break;
			case DOOR_ANIMATE_ROTATE_OFFSET_LEFT_RIGHT:
			{
			}
			break;
			default:
			{
			}
		}
	}
}


function setDoorClosed(door)
{
	{
		open_style = door.openAnimation;
		
		switch(open_style)
		{
			case DOOR_ANIMATE_SLIDE_DOWN_UP:
			{
				door.mesh.position.y = 0;
			}
			break;
			case DOOR_ANIMATE_SLIDE_RIGHT_LEFT:
			{
			}
			break;
			case DOOR_ANIMATE_ROTATE_OFFSET_RIGHT_LEFT:
			{
				//opening door to the left, depends on initial door rotation
				if(door.orientation == 0)
				{
					door.rotation.y = 0;
					if(door.mesh != 0) 
                        door.mesh.rotation.y = 0;
				}
				else if(door.orientation == 1)
				{
                    door.rotation.y = Math.PI/2;
                    door.position.x +=4.0;
                    door.position.z -=4.0;
					if(door.mesh != 0)
					{						
						door.mesh.rotation.y = Math.PI/2;
						door.mesh.position.x +=4.0;
						door.mesh.position.z -=4.0;
					}
				}
				else if(door.orientation == 2)
				{
					door.mesh.rotation.y = Math.PI;
				}
				else if(door.orientation == 3)
				{
					door.mesh.rotation.y = 3*Math.PI/2;
				}

			}
			break;
			case DOOR_ANIMATE_ROTATE_OFFSET_LEFT_RIGHT:
			{
			}
			break;
			default:
			{
			}
		}
	}
}

function animateDoor(door, elapsed)
{
	switch(door.openAnimation)
	{
		case DOOR_ANIMATE_SLIDE_DOWN_UP:
		{
			if(door.open == 0) //closing..
			{
				door.mesh.position.y -= elapsed/400;
				if(door.mesh.position.y < 0.01) 
				{
					door.animate = false;
					//audio_door.pause();
				}
			}
			else 
			{
				door.mesh.position.y += elapsed/400;
				if(door.mesh.position.y > 7.5) 
				{
					door.animate = false;
					//audio_door.pause();
				}
			}
		}
		break;
		case DOOR_ANIMATE_SLIDE_RIGHT_LEFT:
		{
		}
		break;
		case DOOR_ANIMATE_ROTATE_OFFSET_RIGHT_LEFT:
		{
			//console.log("door openAnimation: " + door.openAnimation);
			
			if(door.open == 0) //closing..
			{
				var oldz = Math.sin(door.mesh.rotation.y);
				var oldx = Math.cos(door.mesh.rotation.y);
				door.mesh.rotation.y -= elapsed/600;
				var newz = Math.sin(door.mesh.rotation.y);
				var newx = Math.cos(door.mesh.rotation.y);
				var deltaz = oldz - newz;
				var deltax = oldx - newx;
				door.mesh.position.x -= deltax*4;
				door.mesh.position.z += deltaz*4;
				
				if(door.orientation == 0)
				{
					if(door.mesh.rotation.y < 0.1) 
					{
						door.animate = false;
						//audio_door.pause();
					}
				}
				else if(door.orientation == 1)
				{
					if(door.mesh.rotation.y < Math.PI/2) 
					{
						door.animate = false;
						//audio_door.pause();
					}
				}
				else if(door.orientation == 2)
				{
					if(door.mesh.rotation.y < Math.PI) 
					{
						door.animate = false;
						//audio_door.pause();
					}
				}
				else if(door.orientation == 3)
				{
					if(door.mesh.rotation.y < Math.PI*3/2) 
					{
						door.animate = false;
						//audio_door.pause();
					}
				}
			}
			else //opening
			{
				var oldz = Math.sin(door.mesh.rotation.y);
				var oldx = Math.cos(door.mesh.rotation.y);
				door.mesh.rotation.y += elapsed/600;
				var newz = Math.sin(door.mesh.rotation.y);
				var newx = Math.cos(door.mesh.rotation.y);
				var deltaz = oldz - newz;
				var deltax = oldx - newx;
				door.mesh.position.x -= deltax*4;
				door.mesh.position.z += deltaz*4;

				//console.log("door orientation: " + door.orientation);
				
				//opening door to the left, depends on initial door rotation
				if(door.orientation == 0)
				{
					if(door.mesh.rotation.y > Math.PI/2) 
					{
						door.animate = false;
						//audio_door.pause();
					}
				}
				else if(door.orientation == 1)
				{
					//console.log("door rotation: " + door.mesh.rotation.y);
					
					if(door.mesh.rotation.y > Math.PI) 
					{
						door.animate = false;
						//audio_door.pause();
					}
				}
				else if(door.orientation == 2)
				{
					if(door.mesh.rotation.y > Math.PI*3/2) 
					{
						door.animate = false;
						//audio_door.pause();
					}
				}
				else if(door.orientation == 3)
				{
					if(door.mesh.rotation.y > Math.PI*2) 
					{
						door.animate = false;
						//audio_door.pause();
					}
				}

			}
		}
		break;
		case DOOR_ANIMATE_ROTATE_OFFSET_LEFT_RIGHT:
		{
		}
		break;
		default:
		{
		}
	}

}

function openDoor(door)
{
	door.animate = true;
	door.audio_door.currentTime = 0;
	door.audio_door.play();
	door.open = 1; // open/close flag
}

function closeDoor(door)
{
	door.animate = true;
	door.audio_door.currentTime = 0;
	door.audio_door.play();
	door.open = 0; // open/close flag
}

//savedDoorsArr is just array of indexes of opened doors..
//set opened door flag to 1, then setDoorOpened will be called
function load_saved_doors_same_level( levelObj,savedDoorsArr )
{
	//first set all doors closed
	for (var i=0; i<levelObj.array_of_doors.length; i++)
	{
		if(levelObj.array_of_doors[i].open == 1)
		{
			setDoorClosed(levelObj.array_of_doors[i]);
			levelObj.array_of_doors[i].open = 0;
		}
	}
	//then set saved doors opened, ha ha
	for (var j=0; j<savedDoorsArr.length; j++)
	{
		setDoorOpened(levelObj.array_of_doors[savedDoorsArr[j]]);
		levelObj.array_of_doors[savedDoorsArr[j]].open = 1;
	}
}

//used in temp level loading
function reload_doors(loader, levelObj)
{
	for(var i=0; i<levelObj.array_of_doorways.length;i++)
	{
		//is this mesh still alive? it looks like it is..
		scene.add( levelObj.array_of_doorways[i].mesh );
	}
	for(var i=0; i<levelObj.array_of_doors.length;i++)
	{
		//is this mesh still alive? it looks like it is..
		scene.add( levelObj.array_of_doors[i].mesh );		
	}
}
	
//load doors 3d models on the map
function load_doors (loader, levelObj) {
	
	for(var i=0; i<levelObj.doorsArr.length; i++) 
	{
		//x,z,rot,open,door_model,doorway_model,animate flag,openable on click,open animation  0-slide/up/down 1-slide/down/up 2-slide/right/left 3-slide/left/right 4-rotatec/left/right 5-rotatec/right/left 6-rotateo/left/right 7-rotateo/right/left 8-rotateo/top/down 9-rotateo/down/up    
		var doorsy = create_game_object();
		doorsy.gameID = levelObj.doorsArr[i][0]; //ERROR: we are setting xpos as id!!!
		doorsy.name = "door" + i;
		doorsy.map_position.set(levelObj.doorsArr[i][0],0,levelObj.doorsArr[i][1]);
		doorsy.position.set(levelObj.doorsArr[i][0]*SQUARE_SIZE,0,levelObj.doorsArr[i][1]*SQUARE_SIZE);
		doorsy.rotation.set(0, levelObj.doorsArr[i][2]*Math.PI/2, 0);
		doorsy.orientation = levelObj.doorsArr[i][2];
		doorsy.open = levelObj.doorsArr[i][3];
		doorsy.model = levelObj.doorsArr[i][4];
		doorsy.doorway_model = levelObj.doorsArr[i][5];
		doorsy.animate = false;
		doorsy.openable = levelObj.doorsArr[i][6];
		doorsy.openAnimation = levelObj.doorsArr[i][7];
		
		doorsy.audio_door = document.createElement('audio');
		var source_door = document.createElement('source');
		source_door.src = levelObj.doorsArr[i][8];
		doorsy.audio_door.appendChild(source_door);
		
        //at this moment, door mesh is not loaded yet so we can just adjust position of door object...
        if(doorsy.open == 1)
            setDoorOpened(doorsy);

		var doorwaysy = create_game_object();
		doorwaysy.gameID = levelObj.doorsArr[i][0];
		doorwaysy.name = "doorway" + i;
		doorwaysy.map_position.set(levelObj.doorsArr[i][0],0,levelObj.doorsArr[i][1]);
		doorwaysy.position.set(levelObj.doorsArr[i][0]*SQUARE_SIZE,0,levelObj.doorsArr[i][1]*SQUARE_SIZE);
		doorwaysy.rotation.set(0, levelObj.doorsArr[i][2]*Math.PI/2, 0);
		doorwaysy.orientation = levelObj.doorsArr[i][2];
		doorwaysy.model = levelObj.doorsArr[i][5];
		
		loadGameObjectCheck(loader, doorsy);
		loadGameObjectCheck(loader, doorwaysy);

		levelObj.array_of_doors.push(doorsy);
		levelObj.array_of_doorways.push(doorwaysy);

	}

}
