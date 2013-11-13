

// particles stuff


//this goes to map file
///////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////

//this stays in particles.js
var ggeometry = 0;

//load teleport particles
function load_teleport()
{
	//teleport parameters could be on the map file
	//position on map
	var pos = new THREE.Vector3(175, 0, 105);
	//color
	

	//load particles
	
	/*var material = new THREE.ParticleBasicMaterial( { map: new THREE.Texture( generateSprite() ), blending: THREE.AdditiveBlending } );

	for ( var i = 0; i < 1000; i++ ) {

		particle = new THREE.Particle( material );
		
		particle.position.x = Math.random() * 10 + pos.x;
		particle.position.y = Math.random() * 10;
		particle.position.z = Math.random() * 200;
		particle.scale.x = particle.scale.y = Math.random() * 3 + 1;
	
		scene.add( particle );
	}*/
	
	ggeometry = new THREE.Geometry();
	var ssprite = THREE.ImageUtils.loadTexture( "media/star2.png" );
	for ( i = 0; i < 500; i ++ ) {
		var vertex = new THREE.Vector3();
		vertex.x = 10 * Math.random() + pos.x;
		vertex.y = 10 * Math.random();
		vertex.z = 10 * Math.random() + pos.z;
		vertex.velocity = new THREE.Vector3(0, Math.random()*0.05, 0); //y going up
		ggeometry.vertices.push( vertex );
	}
	var mmaterial = new THREE.ParticleBasicMaterial( { size: 16, sizeAttenuation: false, map: ssprite, transparent: true } );
	teleport = new THREE.ParticleSystem( ggeometry, mmaterial );
	teleport.sortParticles = true;
	scene.add( teleport );
}

function update_teleport(elapsed)
{
	if(teleport != 0)
	{
		//teleport.rotation.y += 0.01;
		
		
		var pCount = 500;
		while(pCount--) {

			// get the particle
			var particle = ggeometry.vertices[pCount];

			// check if we need to reset
			if(particle.y > 10) {
			  particle.y = 0;
			  particle.velocity.y = 0;
			}

			// update the velocity with
			// a splat of randomniz
			var vely = Math.random() * elapsed;
			//console.log("elapsedd " + vely);
			particle.velocity.y +=  vely;

			// and the position
			particle.y += particle.velocity.y;
		  }
  
		teleport.geometry.__dirtyVertices = true;
	}
}





