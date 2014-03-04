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
	
	<div id='top_info' style='padding:5px; text-align:left; height:10%; width:50%;'>
	<br>
	  Dungeon editor allows you to draw map, then add items, doors, pits, secret walls, niches, monsters, teleports, etc. You can change textures and upload your own. 
	<br>
	</div>
	
	<div id='dungeon' style='height:70%; display: inline-block; '>
		<div id='greed' style='background:url("media/scroll.png"); height:100%; background-size: 100% 100%; float: left;'>
			<div id='dungeon_left_indent' style='height:100%; width:80px; float: left;'>
			</div>
			<div id='dungeon_grid_container' style='height:100%; float: left;'>
				<div id='dungeon_top_indent' style='height:10%; width:100%;'>
				</div>
				<div id='grid_view' style='height:80%;'>
				</div>
				<div id='dungeon_bottom_indent' style='height:9%; width:100%;'>
				</div>
			</div>
			<div id='grid_middle_indent' style='height:100%; width:80px; float: left;'>
			</div>
		</div>
		<div id='grid_right_indent' style='height:100%; width:50px; float: left;'>
		</div>
		<div id='dungeon_view_border' style='background:url("media/border.png"); height:95%; background-size: 100% 100%; padding:10px; float: left;'>
		<div id='dungeon_view' style='height:100%;'>
		</div>
		</div>
		<div id='grid_right_indent' style='height:100%; width:10px; float: left;'>
		</div>
		
	</div>
	
	<br>
	<div id='grid' style='height:20%; '>
		<div id='grid_left_indent' style='height:100%; width:50px; float: left;'>
		</div>
		<div id='grid_elements' style='float: left; border:1px solid blue;'>
		
		elements
		
		
		
		
		</div>
		<div id='grid_middle_indent' style='height:100%; width:50px; float: left;'>
		</div>
		
		<div id='texture_elements' style='float: left; '>
			<div id="tex1" style='float: left;  width:70px; height:80px; '> <br>Wall Textures
			</div>
			<div id="pad" style='float: left;width:5px; height:80px;'></div>

			<div id="wtex1" style='float: left;  border:1px solid green; width:80px; height:80px; background:url("maps/level1/media/stone_wall_01_01.png"); background-size: 100% 100%;'>
			</div>
			<div id="pad" style='float: left;width:5px; height:80px;'></div>
			
			<div id="wtex2" style='float: left; width:80px; height:80px; background:url("maps/level2/media/wall.jpg"); background-size: 100% 100%;'>
			</div>
			<div id="pad" style='float: left;width:5px; height:80px;'></div>

			<div id="wtex3" style='float: left; width:80px; height:80px; background:url("maps/level3/media/wall.png"); background-size: 100% 100%;'>
			</div>
			<div id="pad" style='float: left;width:5px; height:80px;'></div>
			
			
			<div id="tex1" style='float: left;  width:70px; height:80px; '> 
			
			<br>Floor Textures
			</div>
			<div id="pad" style='float: left;width:5px; height:80px;'></div>

			<div id="ftex1" style='float: left;  border:1px solid green; width:80px; height:80px; background:url("maps/level1/media/floor_11_1.png"); background-size: 100% 100%;'>
			</div>
			<div id="pad" style='float: left;width:5px; height:80px;'></div>
			
			<div id="ftex2" style='float: left;  border: 1px solid transparent; width:80px; height:80px; background:url("maps/level2/media/floor.jpg"); background-size: 100% 100%;'>
			</div>
			<div id="pad" style='float: left;width:5px; height:80px;'></div>

			<div id="ftex3" style='float: left; border: 1px solid transparent; width:80px; height:80px; background:url("maps/level3/media/floor.png"); background-size: 100% 100%;'>
			</div>
			<div id="pad" style='float: left;width:5px; height:80px;'></div>

			<form id="form1" style='float: left;'>
				<input type='file' id="imgInp" onchange="readURL(); " style='float: left; border: 1px solid transparent; width:80px; height:80px; background-size: 100% 100%;'/>
			</form>

		</div>
		
		<div id='grid_right_indent' style='height:100%; width:50px; float: left;'>
		</div>
	</div>

	
</div>
	(C) Mystic Peanut Entertainment..
	
	<script src="./source/three.min.js"></script>
	<script>
	
	var camera, scene, renderer;

	var TILE_EMPTY = 0;
	var TILE_FLOOR = 1;
	var TILE_DOOR = 2;
	
	var wall_object = 0;
	var floor_object = 0;
	var ceiling_object = 0;
	var floor_model = "";
	var floor_texture_file = 'maps/level1/media/floor_11_1.png';
	var wall_texture_file = 'maps/level1/media/stone_wall_01_01.png';
	var ceiling_texture_file = 'maps/level1/media/ceiling.png';
	
	var BROWSER_CHROME = 0;
	var BROWSER_FIREFOX = 1;
	var browser = BROWSER_CHROME;
	
	var SQUARE_SIZE = 10;
	var grid_size = 20;
	var grid_container = document.getElementById( 'grid_view' );
	var div_ftex1 = document.getElementById( 'ftex1' );
	var div_ftex2 = document.getElementById( 'ftex2' );
	var div_ftex3 = document.getElementById( 'ftex3' );
	var div_old_floor = div_ftex1;
	var div_wtex1 = document.getElementById( 'wtex1' );
	var div_wtex2 = document.getElementById( 'wtex2' );
	var div_wtex3 = document.getElementById( 'wtex3' );
	var div_old_wall = div_wtex1;
	var element_at_hand = TILE_FLOOR;
	var current_position = new THREE.Vector3(10,3,2); //x,z,up
	
	var dungeon_container;
	
	var scenObjArr = [];
	var mapArr = new Array(grid_size);
	var floorsArr2D = [];
	var oldFloorsArr2D = [];
	var mousePressed = false;
	
	function loadModel(model_object) {
		return function (geometry, materials ) {
			materials[ 0 ].shading = THREE.SmoothShading;
			model_object = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
		}
	}
			
	function load_models()
	{
		var loader = new THREE.JSONLoader();
		//load models once, clone them later
	
		//loader.load( floor_model, loadModel(floor_object) );
		var map = THREE.ImageUtils.loadTexture( floor_texture_file );
		map.wrapS = map.wrapT = THREE.RepeatWrapping;
		map.anisotropy = 16;
		var floor_material = new THREE.MeshLambertMaterial( { ambient: 0xbbbbbb, map: map, side: THREE.DoubleSide } );
		floor_object = new THREE.Mesh( new THREE.PlaneGeometry( SQUARE_SIZE, SQUARE_SIZE, 1, 1 ), floor_material );
		
		//loader.load( wall_model, loadModel(wall_object) );
		var map_wall = THREE.ImageUtils.loadTexture( wall_texture_file );
		map_wall.wrapS = map_wall.wrapT = THREE.RepeatWrapping;
		map_wall.anisotropy = 16;
		var material_wall = new THREE.MeshLambertMaterial( { ambient: 0xbbbbbb, map: map_wall, side: THREE.DoubleSide } );
		wall_object = new THREE.Mesh( new THREE.PlaneGeometry( SQUARE_SIZE, SQUARE_SIZE, 1, 1 ), material_wall );
		
		//loader.load( ceiling_model, loadModel(ceiling_object) );
		var map_ceiling = THREE.ImageUtils.loadTexture( ceiling_texture_file );
		map_ceiling.wrapS = map_ceiling.wrapT = THREE.RepeatWrapping;
		map_ceiling.anisotropy = 16;
		var material_ceiling = new THREE.MeshLambertMaterial( { ambient: 0xbbbbbb, map: map_ceiling, side: THREE.DoubleSide } );
		ceiling_object = new THREE.Mesh( new THREE.PlaneGeometry( SQUARE_SIZE, SQUARE_SIZE, 1, 1 ), material_ceiling );
		//loader.load( hole_model, loadModel(hole_object) );
	}
	
	//to be called on every change
	function createFloorArrFromMap()
	{
		oldFloorsArr2D = floorsArr2D.slice(0);
		floorsArr2D.length = 0;
		
		for (var i=0; i< grid_size; i++)
		{
			for (var j=0; j< grid_size; j++)
			{
				if(mapArr[i][j].type != 0)
				{
					floorsArr2D.push([grid_size-j,grid_size-i]);
				}
			}
		}
		console.log(floorsArr2D);
		
		createDungeonFromFloorArr();
	}

	//create dungeon fromFloorArr
	function createDungeonFromFloorArr()
	{
		/*for (var k=0; k<oldFloorsArr2D.length; k++)
		{
			var deleted = true;
			
			for (var m=0; m<floorsArr2D.length; m++)
			{
				if((floorsArr2D[i][0] == oldFloorsArr2D[k][0])&&(floorsArr2D[i][1] == oldFloorsArr2D[k][1]))
				{
					deleted = false;
				}
			}
			
			if(deleted)
			{
				//remove tile from scene
			}
			
		}*/

		//remove all
		for (var o=0; o<scenObjArr.length; o++)
		{
			scene.remove(scenObjArr[o]);
			//scenObjArr[o].deallocate();
		}
		
		for (var i=0; i<floorsArr2D.length; i++)
		{
			var floor_tile_already_exist = false;
			
			for (var j=0; j<oldFloorsArr2D.length; j++)
			{
				if((floorsArr2D[i][0] == oldFloorsArr2D[j][0])&&(floorsArr2D[i][1] == oldFloorsArr2D[j][1]))
				{
					floor_tile_already_exist = true;
				}
			}
			
			//if(!floor_tile_already_exist)
			{
				console.log("ugi" + floorsArr2D[i][1]);
				//add floor tile to scene
				var object = floor_object.clone();
				object.rotation.set(-Math.PI/2, 0, 0);
				object.position.x = floorsArr2D[i][0]*SQUARE_SIZE; //x
				object.position.y = 0; //y
				object.position.z = floorsArr2D[i][1]*SQUARE_SIZE; //z
				scene.add( object );
				
				scenObjArr.push(object);
				
				
				var leftWall = true;
				var rightWall = true;
				var frontWall = true;
				var backWall = true;
				var xTile = floorsArr2D[i][0];
				var yTile = floorsArr2D[i][1];

				for(j=0; j < floorsArr2D.length; j++)
				{
					if(i!=j)
					{
						if((floorsArr2D[j][0] == xTile+1) && (floorsArr2D[j][1] == yTile))
						{
							//there is floor tile to the left - no LeftWall.
							leftWall = false;
						}
						if((floorsArr2D[j][0] == xTile-1) && (floorsArr2D[j][1] == yTile))
						{
							//there is floor tile to the right - no RightWall.
							rightWall = false;
						}
						if((floorsArr2D[j][0] == xTile) && (floorsArr2D[j][1] == yTile+1))
						{
							//there is floor tile to the front - no FrontWall.
							frontWall = false;
						}
						if((floorsArr2D[j][0] == xTile) && (floorsArr2D[j][1] == yTile-1))
						{
							//there is floor tile to the back - no BackWall.
							backWall = false;
						}
					}
				}
				
				if(leftWall)
				{
					var object = wall_object.clone();
					object.rotation.set(0, Math.PI/2, 0);
					object.position.x = (floorsArr2D[i][0]+0.5)*SQUARE_SIZE; //x
					object.position.y = 0.4*SQUARE_SIZE; //y
					object.position.z = (floorsArr2D[i][1])*SQUARE_SIZE; //z
					scene.add( object );
					scenObjArr.push(object);
				}
				if(rightWall)
				{
					var object = wall_object.clone();
					object.rotation.set(0, Math.PI/2, 0);
					object.position.x = (floorsArr2D[i][0]-0.5)*SQUARE_SIZE; //x
					object.position.y = 0.4*SQUARE_SIZE; //y
					object.position.z = (floorsArr2D[i][1])*SQUARE_SIZE; //z
					scene.add( object );
					scenObjArr.push(object);
				}
				if(frontWall)
				{
					var object = wall_object.clone();
					object.rotation.set(0, Math.PI, 0);
					object.receiveShadow = true;
					object.position.x = floorsArr2D[i][0]*SQUARE_SIZE; //x
					object.position.y = 0.4*SQUARE_SIZE; //y
					object.position.z = (floorsArr2D[i][1]+0.5)*SQUARE_SIZE; //z
					scene.add( object );
					scenObjArr.push(object);
				}
				if(backWall)
				{
					var object = wall_object.clone();
					object.rotation.set(0, Math.PI, 0);
					object.receiveShadow = true;
					object.position.x = floorsArr2D[i][0]*SQUARE_SIZE; //x
					object.position.y = 0.4*SQUARE_SIZE; //y
					object.position.z = (floorsArr2D[i][1]-0.5)*SQUARE_SIZE; //z
					scene.add( object );
					scenObjArr.push(object);
				}
			}
		}
	}

		
	function changeDivBorderColorOver(divy,i,j)
	{
		if(mapArr[i][j].type == 0)
		{
			if(mousePressed)
			{
				mapArr[i][j].type = element_at_hand;
				divy.style.border = "1px solid black";
				createFloorArrFromMap();
			}
			else
			{
				divy.style.border = "1px solid gray";
			}
		}
	}
	function changeDivBorderColorOutTimed(divy, i, j)
	{
		if(mapArr[i][j].type == 0)
		{
			divy.style.border = "1px solid transparent";
		}
	}
	function changeDivBorderColorOut(divy,i,j)
	{
		if(mapArr[i][j].type == 0)
		{
			setTimeout(changeDivBorderColorOutTimed ,3000, divy, i, j);
		}
	}
	function setDivField(divy,i,j)
	{
		//called when div is clicked
		console.log("inhere.asdasd." + i + " " + j );
		if(element_at_hand == mapArr[i][j].type)
		{
			mapArr[i][j].type = TILE_EMPTY; //floor, door, etc
			divy.style.border = "1px solid transparent";
			createFloorArrFromMap();
		}
		else
		{
			mapArr[i][j].type = element_at_hand; //floor, door, etc
			divy.style.border = "1px solid black";
			createFloorArrFromMap();
		}
	}
	
	function draw_grid() 
	{
		//create divs and initialize them
		for(var i=0; i< grid_size; i++)
		{
			for(var j=0; j< grid_size; j++)
			{
				var grid_element = document.createElement("div");
				//console.log("inhere.asdasd.");
				grid_element.onmouseover = function(arg1,arg2,arg3){return function(){changeDivBorderColorOver(arg1,arg2,arg3);}}(grid_element,i,j);
				grid_element.onmouseout = function(arg1,arg2,arg3){return function(){changeDivBorderColorOut(arg1,arg2,arg3);}}(grid_element,i,j);
				grid_element.onmousedown = function(arg1,arg2,arg3) { return function() { setDivField(arg1,arg2,arg3); }}(grid_element,i,j);
				grid_element.style.border = "1px solid transparent";
				grid_element.style.width = "" + (grid_container.offsetHeight/grid_size-2) + "px";
				grid_element.style.height = "" + (grid_container.offsetHeight/grid_size-2) + "px";
				grid_element.style.setProperty('float', 'left');
				
				//grid_element.appendChild(document.createTextNode('O'));
				grid_container.appendChild(grid_element);
				
				mapArr[i][j] = new Object();
				mapArr[i][j].div = grid_element;
				mapArr[i][j].type = TILE_EMPTY; //init with empty square

				if((j==10)&&(i==17))
				{
					grid_element.style.border = "1px solid black";
					grid_element.innerHTML = "+";
					mapArr[i][j].type = TILE_FLOOR; //init with empty square
				}
				if((j==10)&&(i==16))
				{
					grid_element.style.border = "1px solid black";
					mapArr[i][j].type = TILE_FLOOR; //init with empty square
				}
			}
			
			//???wtf
			var grid_element_new_line = document.createElement("div");
			grid_element_new_line.style.border = "1px solid transparent";
			grid_element_new_line.style.width = "" + (grid_container.offsetHeight/grid_size-2) + "px";
			grid_element_new_line.style.height = "" + (grid_container.offsetHeight/grid_size-2) + "px";
			grid_container.appendChild(grid_element_new_line);

		}
	}
	
	function onMouseDown ()
	{
		mousePressed = true;
	}
	
	function onMouseUp ()
	{
		mousePressed = false;
	}

	function onWindowResize() {
		renderer.setSize( dungeon_container.offsetHeight,dungeon_container.offsetHeight );
	}
	
	function setFloorTex(fdiv)
	{
		if(div_old_floor != fdiv)
		{
			div_old_floor.style.border = "1px solid transparent";
			fdiv.style.border = "1px solid green";
			div_old_floor = fdiv;
			var start = 4; 
			var end = -1;
			//browser firefox has quotes around backgroundImage file path, chrome has not, so we have to check here:
			if(browser == BROWSER_FIREFOX){start = 5; end = -2;}
			var map = THREE.ImageUtils.loadTexture( fdiv.style.backgroundImage.slice(start, end) );
			map.wrapS = map.wrapT = THREE.RepeatWrapping;
			map.anisotropy = 16;
			var floor_material = new THREE.MeshLambertMaterial( { ambient: 0xbbbbbb, map: map, side: THREE.DoubleSide } );
			floor_object = new THREE.Mesh( new THREE.PlaneGeometry( SQUARE_SIZE, SQUARE_SIZE, 1, 1 ), floor_material );
			
			createDungeonFromFloorArr();
		}
	}
	
	function setWallTex(wdiv)
	{
		if(div_old_wall != wdiv)
		{
			div_old_wall.style.border = "1px solid transparent";
			wdiv.style.border = "1px solid green";
			div_old_wall = wdiv;
			var start = 4; 
			var end = -1;
			//browser firefox has quotes around backgroundImage file path, chrome has not, so we have to check here:
			if(browser == BROWSER_FIREFOX){start = 5; end = -2;}
			var map = THREE.ImageUtils.loadTexture( wdiv.style.backgroundImage.slice(start, end) );
			map.wrapS = map.wrapT = THREE.RepeatWrapping;
			map.anisotropy = 16;
			var wall_material = new THREE.MeshLambertMaterial( { ambient: 0xbbbbbb, map: map, side: THREE.DoubleSide } );
			wall_object = new THREE.Mesh( new THREE.PlaneGeometry( SQUARE_SIZE, SQUARE_SIZE, 1, 1 ), wall_material );
			
			createDungeonFromFloorArr();
		}
	}
	
	function init()
	{
		//browser detection
		if (navigator.userAgent.indexOf('Firefox') != -1 )
			browser = BROWSER_FIREFOX;
		else if (navigator.userAgent.indexOf('Chrome') != -1 )
			browser = BROWSER_CHROME;
		
		//scene
		scene = new THREE.Scene();

		//renderer
		dungeon_container = document.getElementById( 'dungeon_view' );
		renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setSize( dungeon_container.offsetHeight,dungeon_container.offsetHeight);
		dungeon_container.appendChild( renderer.domElement );

		//camera
		camera = new THREE.PerspectiveCamera( 47, dungeon_container.offsetHeight / dungeon_container.offsetHeight, 1, 10000 );
		camera.position.x = 100;
		camera.position.y = 4;
		camera.position.z = 25; //115
		camera.look = new THREE.Vector3(100,4,35); //160,4,125
		camera.lookAt(camera.look);
		
		var ambientLight = new THREE.AmbientLight( 0xf0f0f0 ); // soft white light
		scene.add( ambientLight );
		var light2 = new THREE.DirectionalLight( 0xffffff );
		light2.position.set( 50, 50, 50 ).normalize();
		light2.castShadow = true;
		scene.add( light2 );
		var light3 = new THREE.DirectionalLight( 0xffffff );
		light3.position.set( -50, -30, -50 ).normalize();
		light3.castShadow = true;
		scene.add( light3 );

		//init map array
		for (var m=0; m<grid_size; m++)
		{
			mapArr[m] = new Array(grid_size);
		}
		
		document.addEventListener( 'mousedown', onMouseDown, false );
		document.addEventListener( 'mouseup', onMouseUp, false );
		window.addEventListener( 'resize', onWindowResize, false );

		//init grid
		draw_grid();
		
		//load models
		load_models();
		
		//to be called on every change
		createFloorArrFromMap();
		
		div_ftex1.onmousedown = function(arg1) { return function() { setFloorTex(arg1); }}(div_ftex1);
		div_ftex2.onmousedown = function(arg1) { return function() { setFloorTex(arg1); }}(div_ftex2);
		div_ftex3.onmousedown = function(arg1) { return function() { setFloorTex(arg1); }}(div_ftex3);
		
		div_wtex1.onmousedown = function(arg1) { return function() { setWallTex(arg1); }}(div_wtex1);
		div_wtex2.onmousedown = function(arg1) { return function() { setWallTex(arg1); }}(div_wtex2);
		div_wtex3.onmousedown = function(arg1) { return function() { setWallTex(arg1); }}(div_wtex3);

		imgInput = document.getElementById('imgInp');
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
	
	var imgInput;
	
	function readURL() {
		var input = imgInput.files[0];
		console.log("peraaaa");
		
		var image = document.createElement( 'img' );
		var texture = new THREE.Texture( image );
		image.onload = function()  {
			texture.needsUpdate = true;
		};
	
		if (input) {
			var reader = new FileReader();
			reader.onload = function (e) {
				//imgInput.style.backgroundImage = "url(" + reader.result + ")";
				image.src = e.target.result;
				//var map = THREE.ImageUtils.loadTexture( e.target.result );
				texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
				texture.anisotropy = 16;
				var floor_material = new THREE.MeshLambertMaterial( { ambient: 0xbbbbbb, map: texture, side: THREE.DoubleSide } );
				floor_object = new THREE.Mesh( new THREE.PlaneGeometry( SQUARE_SIZE, SQUARE_SIZE, 1, 1 ), floor_material );
				
				createDungeonFromFloorArr();

			}
			reader.readAsDataURL(input);
		}
    }
    
    
	</script>
	
</body>
</html>