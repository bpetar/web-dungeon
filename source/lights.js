
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

//load player light
function load_lights()
{
	/*var ambientLight = new THREE.AmbientLight( 0x101000 ); // soft white light
	scene.add( ambientLight );*/
	
	//console.log("load_lights ohoho");

	load_level_lights_hard(); //hard hack, related to problem with spotligts added to scene at later stage
	var pointColor=0xffffff;
	var pointIntensity = 1;
	if(typeof point_light_color != 'undefined') pointColor = point_light_color;
	if(typeof point_light_intensity != 'undefined') pointIntensity = point_light_intensity;
	pointLight = new THREE.PointLight(pointColor, pointIntensity, 40);
	pointLight.position.set( 160, 4, 0 );
	pointLight.name = "pointlight";
	pointLight.noremove = true;
	//pointLight.castShadow = true;
	scene.add( pointLight );
}

function load_level_lights_hard()
{
	var ighty = new THREE.SpotLight();
	ighty.position.set( 90, -54, 30);
	ighty.target.position.set( 90, -100, 30);
	scene.add(ighty);
	
	ighty = new THREE.SpotLight();
	ighty.position.set( 90, -54, 30);
	ighty.target.position.set( 90, -100, 30);
	scene.add(ighty);
	
	ighty = new THREE.SpotLight();
	ighty.position.set( 90, -54, 30);
	ighty.target.position.set( 90, -100, 30);
	scene.add(ighty);

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
