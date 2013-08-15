





//define basic properties for 3d object in game - wether its a monster, or pickable or container..
function create_game_object () {

	var gobject = new Object();
	
	//game object position is not updated with mesh position properly. this needs close attention.. do we need double position variable?
	gobject.position = new THREE.Vector3(0, 0, 0);
	gobject.rotation = new THREE.Vector3(0, 0, 0);
	gobject.scale = new THREE.Vector3(1, 1, 1);
	
	gobject.name = "unnamed";
	gobject.description = "unnamed";
	gobject.model = "unnamed";
	gobject.icon = "unnamed";
	gobject.slot = -1;
	gobject.id = 0;
	gobject.gameID = 0;
	gobject.orientation = 0;
	gobject.visible = true;
	
	gobject.mesh = 0;

	gobject.name_id = 0;
	gobject.description_id = 0;
	gobject.loadObject = loadObject;
	
	return gobject;
}

//load 3d mesh callback function
function loadObject( gobject ) {
	return function (geometry, materials ) {

		//alert("pera object loader: " + gobject.name);
		materials[ 0 ].shading = THREE.FlatShading;
		gobject.mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
		gobject.mesh.position = gobject.position;
		gobject.mesh.rotation = gobject.rotation;
		gobject.mesh.name = gobject.name;
		//alert("object id before adding to scene: " + gobject.mesh.name);
		gobject.id = gobject.mesh.id;
		gobject.mesh.visible = gobject.visible;
		scene.add( gobject.mesh );
		
		//alert("object id after adding to scene: " + gobject.mesh.visible);
	}
}