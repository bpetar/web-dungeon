
//props

//this is array of props
var array_of_props = [];
var array_of_animated_props = [];




//load props 3d models on the map
function load_props() {

	if(typeof propsArr != 'undefined')
	{
		var loader = new THREE.JSONLoader();
		
		for(var i=0; i<propsArr.length; i++) {

			// id, model, x, z, pressed, script function..

			var propsy = create_game_object();
			propsy.gameID = propsArr[i][0];
			propsy.name = "prop" + i;
			propsy.model = propsArr[i][4];
			propsy.onPressFunc = propsArr[i][5];
			propsy.position.set((propsArr[i][1])*SQUARE_SIZE,0,(propsArr[i][2])*SQUARE_SIZE);
			propsy.rotation.set(0, propsArr[i][3]*Math.PI/2, 0);
			
			if(propsArr[i].length>8)
			{
				//fine tuning position
				propsy.position.x += propsArr[i][6];
				propsy.position.y += propsArr[i][7];
				propsy.position.z += propsArr[i][8];
			}
			
			//loader.load( propsy.model, propsy.loadObject(propsy) );
			loadGameObjectCheck(loader, propsy);
			
			array_of_props.push(propsy);
		}
	}
}

function load_animated_props()
{
	
	if(typeof animatedPropsArr != 'undefined')
	{
		var loader = new THREE.JSONLoader();
		
		for(var i=0; i<animatedPropsArr.length; i++) {

			// id, model, x, z, pressed, script function..

			var propsy = create_game_object();
			propsy.gameID = animatedPropsArr[i][0];
			propsy.name = "prop" + i;
			propsy.model = animatedPropsArr[i][4];
			propsy.onPressFunc = animatedPropsArr[i][5];
			propsy.position.set((animatedPropsArr[i][1])*SQUARE_SIZE,0,(animatedPropsArr[i][2])*SQUARE_SIZE);
			propsy.rotation.set(0, animatedPropsArr[i][3]*Math.PI/2, 0);
			
			if(animatedPropsArr[i].length>8)
			{
				//fine tuning position
				propsy.position.x += animatedPropsArr[i][6];
				propsy.position.y += animatedPropsArr[i][7];
				propsy.position.z += animatedPropsArr[i][8];
			}
			
			//loader.load( propsy.model, propsy.loadObject(propsy) );
			loadAnimatedGameObjectCheck(loader, propsy);
			
			array_of_animated_props.push(propsy);
		}
	}
}
