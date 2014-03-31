//various utility functions..

function post_to_url(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
         }
    }

    document.body.appendChild(form);
    form.submit();
}

function show_model(loader, model_file, x, z, rot)
{

		var test = create_game_object();
		test.name = "test model";
		test.model = model_file;

		test.position.y = 0;
		test.position.x = x*SQUARE_SIZE;
		test.position.z = z*SQUARE_SIZE;

		test.rotation.y = rot;
		
		//loader.load( test.model, test.loadObject(test) );
		loadGameObjectCheck(loader, test);
}

function updateModelLoading(name)
{
	modelNumber++;
	console.log("loading model nb: " + modelNumber + ", name: " + name);
	if(typeof totalModels != 'undefined')
	{
		var perc = (modelNumber*100)/totalModels;
		//if(totalModels == modelNumber) remove_loading_screen();
		console.log("loading percent: " + perc);
		update_loading_screen(perc);
	}
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
					var oldz = Math.sin(door[4].rotation.y);
					var oldx = Math.cos(door[4].rotation.y);
					door[4].rotation.y -= elapsed/600;
					var newz = Math.sin(door[4].rotation.y);
					var newx = Math.cos(door[4].rotation.y);
					var deltaz = oldz - newz;
					var deltax = oldx - newx;
					door[4].position.x += deltax*4;
					door[4].position.z -= deltaz*4;
					
					orientation = door[2];
					if(orientation == 0)
					{
						if(door[4].rotation.y < 0.1) 
						{
							door[5] = 0;
							audio_door.pause();
						}
					}
					else if(orientation == 1)
					{
						if(door[4].rotation.y < Math.PI*3/2) 
						{
							door[5] = 0;
							audio_door.pause();
						}
					}
					else if(orientation == 2)
					{
						if(door[4].rotation.y < Math.PI) 
						{
							door[5] = 0;
							audio_door.pause();
						}
					}
					else if(orientation == 3)
					{
						if(door[4].rotation.y < Math.PI/2) 
						{
							door[5] = 0;
							audio_door.pause();
						}
					}
				}
				else 
				{
					var oldz = Math.sin(door[4].rotation.y);
					var oldx = Math.cos(door[4].rotation.y);
					door[4].rotation.y += elapsed/600;
					var newz = Math.sin(door[4].rotation.y);
					var newx = Math.cos(door[4].rotation.y);
					var deltaz = oldz - newz;
					var deltax = oldx - newx;
					door[4].position.x += deltax*4;
					door[4].position.z -= deltaz*4;

					//opening door to the left, depends on initial door rotation
					orientation = door[2];
					if(orientation == 0)
					{
						if(door[4].rotation.y > Math.PI/2) 
						{
							door[5] = 0;
							audio_door.pause();
						}
					}
					else if(orientation == 1)
					{
						if(door[4].rotation.y > Math.PI*2) 
						{
							door[5] = 0;
							audio_door.pause();
						}
					}
					else if(orientation == 2)
					{
						if(door[4].rotation.y > Math.PI*3/2) 
						{
							door[5] = 0;
							audio_door.pause();
						}
					}
					else if(orientation == 3)
					{
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
