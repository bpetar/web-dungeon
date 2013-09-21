//monster.js
//monster class, attributes and methods

//class declaration

Monster = function ( ) {

	// API

	this.hp = 100; // milliseconds
	this.ac = 40;
	this.thaco = 30;
	this.idle_startKeyframe = 0;
	this.idle_endKeyframe = 90;
	this.attack_startKeyframe = 90;
	this.attack_endKeyframe = 140;
	this.walk_startKeyframe = 140;
	this.walk_endKeyframe = 180;
	this.position = new THREE.Vector3(40, 0, 10);
};

Monster.prototype = Object.create(  );

Monster.prototype.damage = function ( dmg ) {

	this.hp -= dmg;

};