<?
	//cubereditor.php is editor for dungeon maps
	$DIR='..';
?>

<?php 
 // Connects to Database 
 //mysql_connect("www.mystic-peanut.com", "mysticp_mysticp", "superme2") or die(mysql_error()); 
?>  

<html lang="en">
<head>
	<title>editor</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
	<style>
		body {
			color: #eee;
			font-family:Monospace;
			font-size:15px;
			text-align:center;
			height: 100%;
			background-color: #000;
			margin: 0px;
			padding: 0px;
			overflow: hidden;
		}

		#info {
			position: absolute;
			top: 0px; width: 100%;
			padding: 5px;
		}

		a {
			color: #0080ff;
		}

	</style>
</head>
	
<body>
	
	<div id='main'>
	
	<div id='top_info' style='height:9%; border:1px solid white;'>
<br>
	  Dungeon editor allows you to draw map, then add items, doors, pits, secret walls, niches, monsters, teleports, etc. You can change textures and upload your own. You need computer with moderate 3D graphics card and browser that supports WebGL, most of popular browsers do, except Internet Explorer. 
<br>
	</div>
	
	<div id='dungeon' style='height:45%; border:1px solid red;'>
	dung
		<div id='dungeon_left_indent' style='height:100%; width:50px; float: left; '>
		</div>
		<div id='dungeon_view' style='height:100%; float: left; border:1px solid yellow;'>
		</div>
		<div id='textures' style='float: left; border:1px solid blue;'>
		textures
		</div>
	</div>
	<div id='grid' style='height:45%; border:1px solid green;'>
	grid
		<div id='grid_left_indent' style='height:100%; width:50px; float: left;'>
		</div>
		<div id='grid_view' style='height:100%; float: left; border:1px solid yellow;'>
		view
		</div>
		<div id='grid_elements' style='float: left; border:1px solid blue;'>
		elements
		</div>
	</div>

	
	</div>
	
	<script src="./source/three.min.js"></script>
	<script>
	
	var camera, scene, renderer;

	var wall_object = 0;
	var floor_object = 0;
	var ceiling_object = 0;
	
	var grid_size = 20;
	var grid_container = document.getElementById( 'grid_view' );
	
	function load_models()
	{
		//load models once, clone them later
		wall_object = 0;
		floor_object = 0;
		ceiling_object = 0;
	}
	
	function draw_grid() 
	{
		//create divs and initialize them
		for(var i=0; i< grid_size; i++)
		{
			var grid_element = document.createElement("div");
			grid_element.appendChild(document.createTextNode('O'));
			grid_container.appendChild(grid_element);
		}
		
	}
	
	function init()
	{
		//scene
		scene = new THREE.Scene();

		//renderer
		var dungeon_container = document.getElementById( 'dungeon_view' );
		renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setSize( dungeon_container.offsetHeight,dungeon_container.offsetHeight);
		dungeon_container.appendChild( renderer.domElement );

		//camera
		camera = new THREE.PerspectiveCamera( 47, dungeon_container.offsetHeight / dungeon_container.offsetHeight, 1, 10000 );
		camera.position.x = 160;
		camera.position.y = 4;
		camera.position.z = -5; //115
		camera.look = new THREE.Vector3(160,4,5); //160,4,125
		camera.lookAt(camera.look);
		
		//init grid
		draw_grid();
	}
	
	function animate() {
		requestAnimationFrame( animate );
		render();
	}

	function render() {
		renderer.render( scene, camera );
	}

	//start the fun
	init();
	animate();
	
	</script>
	
</body>
</html>