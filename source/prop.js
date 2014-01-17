
//props

//this is array of props
var array_of_props = [];




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
			propsy.model = propsArr[i][3];
			propsy.onPressFunc = propsArr[i][4];
			propsy.position.set((propsArr[i][1])*SQUARE_SIZE,0,(propsArr[i][2])*SQUARE_SIZE);
			//propsy.rotation.set(0, Math.PI/2, 0);
			
			loader.load( propsy.model, propsy.loadObject(propsy) );
			
			array_of_props.push(propsy);
		}
	}
}
