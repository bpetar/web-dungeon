

// particles stuff


//this goes to map file
///////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////

//this stays in particles.js
var particle_geometry = 0;
var particle_geometry2 = 0;
var particle_geometry3 = 0;
var teleport = 0;
var teleport2 = 0;
var teleport3 = 0;
var teleport_pos = new THREE.Vector3(180, 0, 110); //position on map

//load teleport particles
function load_teleport()
{
	//first sprite system
	particle_geometry = new THREE.Geometry();
	var ssprite = THREE.ImageUtils.loadTexture( "media/sparkle1.png" );
	for ( i = 0; i < 500; i ++ ) {
		var vertex = new THREE.Vector3();
		vertex.x = 6 * Math.random() + teleport_pos.x - 3;
		vertex.y = 8 * Math.random();
		vertex.z = 6 * Math.random() + teleport_pos.z - 3;
		vertex.velocity = new THREE.Vector3(0, Math.random()*0.05, 0); //y going up
		particle_geometry.vertices.push( vertex );
	}
	var mmaterial = new THREE.ParticleBasicMaterial( { size: 0.4, sizeAttenuation: true, map: ssprite, transparent: true } );
	teleport = new THREE.ParticleSystem( particle_geometry, mmaterial );
	teleport.sortParticles = true;
	scene.add( teleport );
	
	//second sprite system
	particle_geometry2 = new THREE.Geometry();
	var sprite2 = THREE.ImageUtils.loadTexture( "media/sparkle2.png" );
	for ( i = 0; i < 500; i ++ ) {
		var vertex = new THREE.Vector3();
		vertex.x = 6 * Math.random() + teleport_pos.x - 3;
		vertex.y = 8 * Math.random();
		vertex.z = 6 * Math.random() + teleport_pos.z - 3;
		vertex.velocity = new THREE.Vector3(0, Math.random()*0.03, 0); //y going up
		particle_geometry2.vertices.push( vertex );
	}
	var material2 = new THREE.ParticleBasicMaterial( { size: 0.3, sizeAttenuation: true, map: sprite2, transparent: true } );
	teleport2 = new THREE.ParticleSystem( particle_geometry2, material2 );
	teleport2.sortParticles = true;
	scene.add( teleport2 );

	
	//thrid sprite system
	particle_geometry3 = new THREE.Geometry();
	var sprite3 = THREE.ImageUtils.loadTexture( "media/sparkle3.png" );
	for ( i = 0; i < 500; i ++ ) {
		var vertex = new THREE.Vector3();
		vertex.x = 6 * Math.random() + teleport_pos.x - 3;
		vertex.y = 8 * Math.random();
		vertex.z = 6 * Math.random() + teleport_pos.z - 3;
		vertex.velocity = new THREE.Vector3(0, Math.random()*0.03, 0); //y going up
		particle_geometry3.vertices.push( vertex );
	}
	var material3 = new THREE.ParticleBasicMaterial( { size: 0.3, sizeAttenuation: true, map: sprite3, transparent: true } );
	teleport3 = new THREE.ParticleSystem( particle_geometry3, material3 );
	teleport3.sortParticles = true;
	scene.add( teleport3 );

	}

function update_teleport(elapsed)
{
	if((teleport != 0) && (teleport2 != 0) && (teleport3 != 0) && (elapsed<0.1))
	{
		
		var pCount = 500;
		while(pCount--) {

			// get the particle
			var particle = particle_geometry.vertices[pCount];
			var particle2 = particle_geometry2.vertices[pCount];
			var particle3 = particle_geometry3.vertices[pCount];

			// check if we need to reset
			if(particle.y > 8) {
			  particle.y = 0;
			  particle.velocity.y = 0;
			}
			// update the velocity with random acceleration
			var vely = Math.random() * elapsed;
			particle.velocity.y +=  vely;
			// and the position
			particle.y += particle.velocity.y;
			
			//rotating particle
			//var teleport_pos_middle = new THREE.Vector3(5,0,5).add(teleport_pos);
			var vector = new THREE.Vector3( particle.x, 0, particle.z ).sub(teleport_pos);
			var axis = new THREE.Vector3( 0, 1, 0 );
			var angle = Math.PI * elapsed;
			var matrix = new THREE.Matrix4().makeRotationAxis( axis, angle );
			vector.applyMatrix4( matrix );
			particle.x = vector.x + teleport_pos.x;
			particle.z = vector.z + teleport_pos.z;
			
			// check if we need to reset
			if(particle2.y > 8) {
			  particle2.y = 0;
			  particle2.velocity.y = 0;
			}
			// update the velocity with
			// a splat of randomniz
			particle2.velocity.y += Math.random() * elapsed/6;
			// and the position
			particle2.y += particle2.velocity.y;

			
			// check if we need to reset
			if(particle3.y > 8) {
			  particle3.y = 0;
			  particle3.velocity.y = 0;
			}
			// update the velocity with
			// a splat of randomniz
			particle3.velocity.y += Math.random() * elapsed/16;
			// and the position
			particle3.y += particle3.velocity.y;

		}
  
		teleport.geometry.__dirtyVertices = true;
		teleport2.geometry.__dirtyVertices = true;
		teleport3.geometry.__dirtyVertices = true;
	}
}



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



