//various utility functions..


//get items from json by id
function get_item_by_id(id)
{

	//if(all_items != 0)
	console.log("returning item: " + all_items[""+id+""]["name"]);
	return all_items[""+id+""];
}

//loads item in game with 3d model and everything
function load_item_by_id(id)
{
	var loader = new THREE.JSONLoader();
	var game_item = create_game_object();
	var item = get_item_by_id(id);
	game_item.gameID = id;
	game_item.name = item.name;
	game_item.description = item.desc;
	game_item.model = item.model;
	game_item.icon = item.icon;
	game_item.icon2 = item.icon2;
	game_item.useHint = item.useHint;
	game_item.useScript = item.useScript;
	game_item.consumable = (item.type == "consumable")?true:false;
	if(item.type == "weapon")
	{
		game_item.weapon_speed = item.weapon_prop.speed;
		game_item.weapon_dmg = item.weapon_prop.damage;
		game_item.weapon_dmg_bonus = item.weapon_prop.damage_bonus;
		game_item.weapon_attack_bonus = item.weapon_prop.attack_bonus;
		//TODO:
		//"type":"melee", "hand":"one", "damage_type":"piercing",
	}
	game_item.niched = -1; //flag indicating if pickable is in the niche
	game_item.plated = -1; //flag indicating if pickable is in the niche
	//game_item.mesh = 0;
	//game_item.position.x = 0;
	//game_item.position.z = 0;
	//game_item.position.y = 0;
	
	loadGameObjectCheck(loader, game_item);

	//hmm i dont like this, but for now there is no other way to pick items from ground after loading game
	array_of_pickables.push(game_item);
	
	return game_item;
}

function get_items_cb()
{
	if (xmlhttp.readyState==4 && xmlhttp.status==200)
	{
		// Javascript function JSON.parse to parse JSON data
        all_items = JSON.parse(xmlhttp.responseText);
		console.log("get_items_cb: items acquired.." + all_items["2"]["name"]);
	}
	else
	{
		console.log("get_items_cb: " + xmlhttp.readyState);
	}
	
}

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

function ajaxGet(url,cfunc,async)
{
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
		xmlhttp.onreadystatechange=cfunc;
		xmlhttp.open("GET",url,async);
		xmlhttp.send();
	}
}

function ajaxPost(url,cfunc,data)
{
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
		xmlhttp.onreadystatechange=cfunc;
		xmlhttp.open("POST",url,true);
		xmlhttp.setRequestHeader("Content-type","application/json");
		xmlhttp.send(data);
	}
}

function add_element_class(element,classy)
{
	var e = document.getElementById(element);
	if(!(e.classList.contains(classy)))
	{
		e.classList.add(classy);
	}
}

function remove_element_class(element,classy)
{
	var e = document.getElementById(element);
	if(e.classList.contains(classy))
	{
		e.classList.remove(classy);
	}
}

function get_element_position_in_viewport(element)
{
	var e = document.getElementById(element);
	var offset = {x:0,y:0};
	while (e)
	{
		offset.x += e.offsetLeft;
		offset.y += e.offsetTop;
		e = e.offsetParent;
	}

	if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft))
	{
		offset.x -= document.documentElement.scrollLeft;
		offset.y -= document.documentElement.scrollTop;
	}
	else if (document.body && (document.body.scrollTop || document.body.scrollLeft))
	{
		offset.x -= document.body.scrollLeft;
		offset.y -= document.body.scrollTop;
	}
	else if (window.pageXOffset || window.pageYOffset)
	{
		offset.x -= window.pageXOffset;
		offset.y -= window.pageYOffset;
	}

	return offset;
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

function setDoorOpened(door)
{
	if(door.length > 7)
	{
		open_style = door[7];
		
		switch(open_style)
		{
			case DOOR_ANIMATE_SLIDE_DOWN_UP:
			{
				door[4].position.y = 7.5;
			}
			break;
			case DOOR_ANIMATE_SLIDE_RIGHT_LEFT:
			{
			}
			break;
			case DOOR_ANIMATE_ROTATE_OFFSET_RIGHT_LEFT:
			{
				//opening door to the left, depends on initial door rotation
				orientation = door[2];
				if(orientation == 0)
				{
					door[4].rotation.y = Math.PI/2;
				}
				else if(orientation == 1)
				{
					door[4].rotation.y = Math.PI*2;
				}
				else if(orientation == 2)
				{
					door[4].rotation.y = Math.PI*3/2;
				}
				else if(orientation == 3)
				{
					door[4].rotation.y = Math.PI;
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
