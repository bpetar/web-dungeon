//various utility functions..

function show_model(loader, model_file, x, z, rot)
{

		var test = create_game_object();
		test.name = "test model";
		test.model = model_file;

		test.position.y = 0;
		test.position.x = x*SQUARE_SIZE;
		test.position.z = z*SQUARE_SIZE;

		test.rotation.y = rot;
		
		loader.load( test.model, test.loadObject(test) );
}

// Rotate an object around an arbitrary axis in world space       
function rotateAroundWorldAxis(object, axis, radians) {
    rotWorldMatrix = new THREE.Matrix4();
    rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);

    // old code for Three.JS pre r54:
    //  rotWorldMatrix.multiply(object.matrix);
    // new code for Three.JS r55+:
    rotWorldMatrix.multiply(object.matrix);                // pre-multiply

    object.matrix = rotWorldMatrix;

    // old code for Three.js pre r49:
    // object.rotation.getRotationFromMatrix(object.matrix, object.scale);
    // old code for Three.js pre r59:
    // object.rotation.setEulerFromRotationMatrix(object.matrix);
    // code for r59+:
    object.rotation.setEulerFromRotationMatrix(object.matrix);
}

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

function animateDoor(door, elapsed)
{
	if(door.length > 7)
	{
		open_style = door[7];
		
		switch(open_style)
		{
			case DOOR_ANIMATE_SLIDE_DOWN_UP:
			{
				if(door[3] == 0) //closing..
				{
					door[4].position.y -= elapsed/400;
					if(door[4].position.y < 0.01) 
					{
						door[5] = 0;
						audio_door.pause();
					}
				}
				else 
				{
					door[4].position.y += elapsed/400;
					if(door[4].position.y > 7.5) 
					{
						door[5] = 0;
						audio_door.pause();
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
				if(door[3] == 0) //closing..
				{
					orientation = door[2];
					if(orientation == 0)
					{
						door[4].position.x -= elapsed/300;
						door[4].position.z -= elapsed/400;
						door[4].rotation.y -= elapsed/600;
						if(door[4].rotation.y < Math.PI/2) 
						{
							door[5] = 0;
							audio_door.pause();
						}
					}
				}
				else 
				{
					//opening door to the left, depends on initial door rotation
					orientation = door[2];
					if(orientation == 0)
					{
						if (angle == -1) angle = door[4].rotation.y;
						console.log("angle:" + angle + ", 90:" + Math.PI/2);
						var oldz = Math.cos(door[4].rotation.y);
						var oldx = Math.sin(door[4].rotation.y);
						door[4].rotation.y += elapsed/600;
						var newz = Math.cos(door[4].rotation.y);
						var newx = Math.sin(door[4].rotation.y);
						var deltaz = oldz - newz;
						var deltax = oldx - newx;
						door[4].position.x += deltax*4;
						door[4].position.z += deltaz*4;
						
						if(door[4].rotation.y > Math.PI) 
						{
							door[5] = 0;
							audio_door.pause();
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
	else //old levels have only up down animation..  TODO:remove this block and fix old levels
	{
		//console.log("old door code");
		if(door[3] == 0) //closing..
		{
			door[4].position.y -= elapsed/400;
			if(door[4].position.y < 0.01) 
			{
				door[5] = 0;
				audio_door.pause();
			}
		}
		else 
		{
			door[4].position.y += elapsed/400;
			if(door[4].position.y > 7.5) 
			{
				door[5] = 0;
				audio_door.pause();
			}
		}
	}
}
