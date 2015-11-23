
//lights
var LEVEL_LIGHT_SPOT = 0;




//used in temp level loading
function reload_level_lights(levelObj)
{
	for(var i=0; i<levelObj.array_of_lights.length;i++)
	{
		scene.add(levelObj.array_of_lights[i]);
	}
}


//load lights on the map
function load_level_lights(levelObj)
{
	for(var i=0; i<levelObj.lightsArr.length; i++)
	{
		var lighty;
		if(levelObj.lightsArr[i][0] == LEVEL_LIGHT_SPOT)
		{
			lighty = new THREE.SpotLight();
		}

		lighty.name = "light" + i;
		lighty.position.set( levelObj.lightsArr[i][1], levelObj.lightsArr[i][2], levelObj.lightsArr[i][3] );
		lighty.target.position.set( levelObj.lightsArr[i][4], levelObj.lightsArr[i][5], levelObj.lightsArr[i][6] );

		scene.add(lighty);
		levelObj.array_of_lights.push(lighty);
	}

}
