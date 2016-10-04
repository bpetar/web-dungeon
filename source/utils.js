//various utility functions..

//if by some chance, click js function is not found, use this one..
function missing_click_function()
{
	console.log("Error: Missing on click function!");
}

function missing_niche_add_function()
{
	console.log("Error: Missing niche onItemAdd function!");
}

function missing_niche_remove_function()
{
	console.log("Error: Missing niche onItemRemove function!");
}

function missing_niche_toggle_function()
{
	console.log("Error: Missing niche onItemRemove function!");
}

function levelIsSaved(id)
{
    if(arrayOfGameStories[currentStory][0].levels.hasOwnProperty("id"+id))
        return true;

    return false;
}

//check if new position is some of the level stairs 
function steppedOnStairs(levelObj, position)
{
	//if stepped on stairs..
	if(typeof levelObj.stairsArr != 'undefined')
	{
		for(i=0; i < levelObj.stairsArr.length; i++)
		{
			if((levelObj.stairsArr[i][0] == position.x) && (levelObj.stairsArr[i][1] == position.z))
			{
				return true;
			}
		}
	}

	return false;
}


//function audio_change_volume
function audio_change_volume(audio_element, desired_volume)
{
	var increment_direction = 1;
	if(desired_volume<audio_element.volume)
		increment_direction = -1;
	
	var increment = 0.1*increment_direction;
	
	//watch out for boundaries
	if(audio_element.volume+increment < 0) audio_element.volume = 0;
	else if(audio_element.volume+increment > 1) audio_element.volume = 1;
	else audio_element.volume+=increment;
	
	if((increment_direction>0)&&(audio_element.volume < desired_volume))
	{
		setTimeout(audio_change_volume, 100, audio_element, desired_volume);
	}
	if((increment_direction<0)&&(audio_element.volume > desired_volume))
	{
		setTimeout(audio_change_volume, 100, audio_element, desired_volume);
	}
	
	if (desired_volume==0)
	{
		//we reached volume 0, this is the time to stop the playing
		audio_element.pause();
	}
}

//get items from json by id
function get_item_by_id(id)
{

	//if(all_items != 0)
	console.log("returning item: " + all_items[""+id+""]["name"]);
	return all_items[""+id+""];
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

//look up pickable in saved array
function isPickableSaved(pickable, saved_pickables)
{
	for(var i=0;i<saved_pickables.length;i++)
	{
		if(saved_pickables[i].gameID==pickable.gameID)
		{
			return true;
		}
	}
	return false;
}

//loads item in game with 3d model and everything
function load_item_by_id(gameID, position)
{
	var game_item = create_game_object();
	game_item.gameID = gameID;
	game_item.itemID = all_items_array[gameID];
	
	var item = get_item_by_id(game_item.itemID);
	game_item.name = item.name;
	game_item.description = item.desc;
	game_item.model = item.model;

	game_item.icon = item.icon;
	game_item.icon2 = item.icon2;
	game_item.useHint = item.useHint;

	game_item.useScript = item.useScript;

	game_item.consumable = (item.type == "consumable")?true:false;

	game_item.type = item.type;

	if(item.type == "weapon")
	{
		game_item.weapon_type = item.weapon_prop.type;
		game_item.weapon_speed = item.weapon_prop.speed;
		game_item.weapon_dmg = item.weapon_prop.damage;
		game_item.weapon_dmg_bonus = item.weapon_prop.damage_bonus;
		game_item.weapon_attack_bonus = item.weapon_prop.attack_bonus;
		//TODO:
		//"hand":"one", "damage_type":"piercing",
	}
	game_item.niched = -1; //flag indicating if pickable is in the niche
	game_item.plated = -1; //flag indicating if pickable is in the niche
	//game_item.mesh = 0;

	console.log("position: " + position);
	if(typeof position != 'undefined')
	{
		if(position == "gui")
			game_item.isGui = true;
		else
			game_item.position = position;
	}

	//game_item.position.x = 0;
	//game_item.position.z = 0;
	//game_item.position.y = 0;
	
	loadGameObjectCheck(globalJSONloader, game_item);

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
	if(name != "end of level load") modelNumber++;
	//console.log("loading model nb: " + modelNumber + ", name: " + name + ", relativeLevelModelCount: " + relativeLevelModelCount);
	//if(typeof relativeLevelModelCount != 'undefined')
	var perc = 100;
	if(relativeLevelModelCount != 0) //if new level has no new models to download, loading is finished right away..
	{
		var perc = (modelNumber*100)/relativeLevelModelCount;
		//if(totalModels == modelNumber) remove_loading_screen();
		//console.log("loading percent: " + perc);
	}

	update_loading_screen(perc);
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

