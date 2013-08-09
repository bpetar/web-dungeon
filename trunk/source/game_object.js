





//define basic properties for 3d object in game - wether its a monster, or pickable or container..
function create_game_object () {

	var gobject = new Object();
	
	gobject.position = new THREE.Vector3(0, 0, 0);
	gobject.rotation = new THREE.Vector3(0, 0, 0);
	gobject.scale = new THREE.Vector3(1, 1, 1);
	
	gobject.name = "unnamed";
	gobject.description = "unnamed";
	gobject.model = "unnamed";
	gobject.icon = "unnamed";
	gobject.id = 0;
	gobject.gameID = 0;
	
	gobject.mesh = 0;

	gobject.name_id = 0;
	gobject.description_id = 0;
	gobject.loadObject = loadObject;
	
	return gobject;
}

//load 3d mesh callback function
function loadObject( gobject ) {
	return function (geometry, materials ) {

		//alert("pera object loader" + gobject.id);
		materials[ 0 ].shading = THREE.FlatShading;
		gobject.mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
		gobject.mesh.position = gobject.position;
		gobject.mesh.name = gobject.name;
		//alert("object id before adding to scene: " + gobject.mesh.name);
		gobject.id = gobject.mesh.id;
		
		scene.add( gobject.mesh );
		
		//alert("object id after adding to scene: " + gobject.mesh.visible);
	}
}