<?php 

	$DIR='..';
	// Connects to Database 
	//mysql_connect("www.mystic-peanut.com", "mysticp_mysticp", "superme2") or die(mysql_error()); 
	//mysql_select_db("mysticp_comments") or die(mysql_error()); 
    include "cuber_play_counter.php";
	
?>

<html lang="en">
	<head>
		<title>cuber</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
		<style>
			body {
				color: #eee;
				font-family:Monospace;
				font-size:13px;
				text-align:center;

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

		<div id="container" style="position:absolute;">
		</div>
		
		<div id="menu" style="position:absolute;">
		Menu
		</div>
		
		<div id="gui" style="position:absolute; left:70px; top:70px;">
			<div id="player1" style="border:2px solid;">
				<div id="player1top" style="border:1px solid red; float: left;">
					<div id="player1topimg" style="float: left;">
					<img src="media/profile1.jpg" onClick='inventory_show("Inventory will popup here!")'> 
					</div>
					<div id="player_wound" style="font-size:20px; font-weight:bold; color: #001100; padding-top:30px; padding-left:10px; position:absolute; left:10px; top:10px;  height:65px; width:170px; background: url(media/wound.png)">
					13
					</div>
					<div id="hpandweapon" style="border:1px solid green; margin-left: 110px;">
						<div id="player1HP" style="background-color: #009900; border:1px solid blue; height:20px;">
						<!-- <img src="media/health.png">  -->
						</div>
						<!-- <br> -->
						<div id="player1tophand" style="border:1px solid blue; opacity:1.0;">
						<img src="media/mace.png" onClick='player_attack()'> 
						</div>
					</div>
				</div>
				<br>
				Drn Inatdzija
			</div>
			<br>
			<br>
			<div id="player2" style="border:2px solid; opacity:0.4;">
				<div id="player2top" style="border:1px solid red; float: left;">
					<div id="player2topimg" style="float: left;">
					<img src="media/profile2.jpg" style="opacity:0.4;" onClick='inventory_show("Inventory will popup here!")'> 
					</div>
					<div id="player2tophand" style="border:1px solid blue; margin-left: 110px;">
					<img src="media/health.png" style="opacity:0.4;"> 
					<br>
					<img src="media/staff.png" style="opacity:0.4;"> 
					</div>
				</div>
				<br>
				Mech Cloaker
			</div>
		</div>

		<div id="gui_bar" style="position:absolute; background: url(media/bar.png) repeat-x; height:50px; width:100%; bottom:-37px;">
		&nbsp;
		</div>
		<div id="gui_left" style="position:absolute; left:-36px; bottom:-40px;">
			<img src="media/left.png" > 
		</div>
		<div id="gui_right" style="position:absolute; right:-36px; bottom:-40px;">
			<img src="media/right.png" > 
		</div>

		<div id="gui_slots" style="position:absolute; left:256px; bottom:-170px;">
			<div id="gui_slot1" style="float:left;">
				<div id="gui_slot1_item" style="float:left;">
					<img id="gui_slot1_item_icon" src="media/none.png"> 
				</div>
				<div id="gui_slot1_border" style="position:absolute;">
					<img src="media/slot.png"> 
				</div>
			</div>
			<div id="gui_slot2" style="float:left;">
				<div id="gui_slot2_item" style="float:left;">
					<img id="gui_slot2_item_icon" src="media/none.png"> 
				</div>
				<div id="gui_slot2_border" style="position:absolute;">
					<img src="media/slot.png"> 
				</div> 
			</div>
			<div id="gui_slot3" style="float:left;">
				<div id="gui_slot3_item" style="float:left;">
					<img id="gui_slot3_item_icon" src="media/none.png"> 
				</div>
				<div id="gui_slot3_border" style="position:absolute;">
					<img src="media/slot.png"> 
				</div> 
			</div>
			<div id="gui_slot41" style="float:left;">
				<div id="gui_slot4_item" style="float:left;">
					<img id="gui_slot4_item_icon" src="media/none.png"> 
				</div>
				<div id="gui_slot4_border" style="position:absolute;">
					<img src="media/slot.png"> 
				</div> 
			</div>
		</div>
		
		
		<div id="container_slots" style="position:absolute; left:256px; top:100px; display: none;">
			<div id="container_slots1" style="float:left;">
				<div id="container_slots1_item" style="float:left;">
					<img id="container_slots1_item_icon" src="media/none.png"> 
				</div>
				<div id="container_slots1_border" style="position:absolute;">
					<img src="media/slot.png"> 
				</div>
			</div>
			<div id="container_slots2" style="float:left;">
				<div id="container_slots2_item" style="float:left;">
					<img id="container_slots2_item_icon" src="media/none.png"> 
				</div>
				<div id="container_slots2_border" style="position:absolute;">
					<img src="media/slot.png"> 
				</div> 
			</div>
			<div id="container_slots3" style="float:left;">
				<div id="container_slots3_item" style="float:left;">
					<img id="container_slots3_item_icon" src="media/none.png"> 
				</div>
				<div id="container_slots3_border" style="position:absolute;">
					<img src="media/slot.png"> 
				</div> 
			</div>
			<div id="container_slots41" style="float:left;">
				<div id="container_slots4_item" style="float:left;">
					<img id="container_slots4_item_icon" src="media/none.png"> 
				</div>
				<div id="container_slots4_border" style="position:absolute;">
					<img src="media/slot.png"> 
				</div> 
			</div>
		</div>

		<div id="monster_wound" style="font-size:20px; font-weight:bold; color: #001100; padding-top:30px; padding-left:10px; position:absolute; left:600px; top:300px;  height:65px; width:170px; background: url(media/wound.png)">
		13
		</div>

		<div id="info_tip" style="text-align:left; font-size:20px; color: #BBFFBB; position:absolute; height:32px; width:512px;">
		Game started..
		</div>

		<div id="level_complete_dialog" style="position:absolute; width:750px; height:450px; top:0; bottom: 0; left: 0; right: 0; opacity:0.8; display: none;">
			<p>Level Complete!<p>
		</div>
		
		<div id="info_dialog" style="position:absolute; display:none; width:750px; height:450px; top:0; bottom: 0; left: 0; right: 0; opacity:0.8; background-color: #001100; margin: auto; background:url(media/scroll.png); background-size: 100% 100%;">
			<div id="info_message" style="font-size:20px; font-weight:bold; color: #001100; padding-top:70px; padding-bottom: 30px; padding-left:100px; padding-right: 100px;"> 
			<p>Welcome to the Web Dungeon game test!</p> 
			
			<p>Use QWEASD keys to move around and left mouse button to click. Browser reload button gets you back on start.</p>

			<!-- <p>Please send me feedback about your Frame rate, OS, browser version, processor and GPU.</p> -->
			<p>If you have any trouble playing the game please contact me on <a style="color: rgb(20,75,30)" href="mailto:info@mystic-peanut.com">info@mystic-peanut.com</a> .</p>
			<br>
			<button onclick='hide_message();'> Ok </button>
			</div>
		</div>

		<div id="loading_progress" style="position:absolute; font-size:28px; width:100%; height:100%; background-color: #000011; top:0; bottom: 0; left: 0; right: 0; margin: auto;">

			<div style="position:absolute; width:300px; height:200px; top:0; bottom: 0; left: 0; right: 0; margin: auto;">
				<span id="message">Loading ...</span> <br><br><br>
				<div id="progressbar" style="font-size:12px;">(sorry there is no progress bar implemented, im not there yet, you are downloading about 20MB of models, its shouldn't take long on fast internet connection, you probably won't be able to read all of this and the screen will just be gone and you'll be like what was else written there could it be that it was something important? well no. but its nice to have something to read while you wait isnt it?)</div>
			</div>
		</div>
		
<?php
		
if (isset($_GET['lvl']) && ($_GET['lvl']!=""))
{
	$lvl = $_GET['lvl'];
	//check valid email format
	if (strcmp($lvl,'level2') == 0)
	{
?>
		<script src="./maps/level2/level2.js"></script>
<?php 
    }
	else
	{
?>
		<script src="./maps/level1/level1.js"></script>
<?php 
	}
}
else
{
?>
		<script src="./maps/level1/level1.js"></script>
<?php 
}
?>
	
		<script src="./source/pickables.js"></script>
		<script src="./source/tapestries.js"></script>
		<script src="./source/plate.js"></script>
		<script src="./source/containers.js"></script>
		<script src="./source/game_object.js"></script>
		<script src="./source/inventory.js"></script>
		<script src="./source/three.min.js"></script>
		<script src="./source/niche.js"></script>
		<script src="./source/monster.js"></script>
		<script src="./source/stats.min.js"></script>
		<script src="./source/particles.js"></script>
		<script src="./source/Detector.js"></script>
		<script src="./source/button.js"></script>
		<script src="./source/keyholes.js"></script>
		<script src="./source/utils.js"></script>
		<script src="./source/level.js"></script>

		<script>
		
			if ( ! Detector.webgl ) 
			{
				alert("You have no WebGL on your browser!!");
				Detector.addGetWebGLMessage();
			}
			
			clickConsumed = false;

			var stats = new Stats();
			stats.setMode(0); // 0: fps, 1: ms

			// Align top-left
			//stats.domElement.style.position = 'absolute';
			//stats.domElement.style.left = '0px';
			//stats.domElement.style.top = '0px';

			document.body.appendChild( stats.domElement );

			//display level complete dialog
			function displayLevelCompleteDialog() {
				//add registration and feedback options
				
				//level_complete_div.style.display = "inline-block";
								
				show_message("				<br><br><font size='7'>Demo Finished!</font><br><br>Secrets found: 1/1. 				<br><br> This is game demo and you finished it. Congratulations! Thank you for playing! We would very much like to hear your feedback. If you want to receive notification about game updates, please leave your email below and we will contact you. <br><br> 				<font size='7'>Registration </font><br><br> 				<form name='cuberRegisterForm' action='<?=$DIR?>/templates/level.php' method='post'>				name<br><input type='text' name='name'><br> 				email<br><input type='text' name='email'><br> 				feedback<br> &nbsp;<textarea name='feedback' cols='22' rows='5'></textarea> <br> 				<input type='submit' name='yesRegister' value='Register'>  &nbsp;&nbsp; 				<input type='submit' name='noRegister' value=' No thanks '>				</form>", 900,800);
			}
			
			function DisplayInfoDiv(msg) {
				//show some nice fadeout info test above inventory..
				var info_tip_div_bottom = INVENTORY_POS_SHOWN + SLOT_WIDTH
				var left = (windowHalfX - (SLOT_WIDTH*NUM_SLOTS_INVENTORY_ROW/2));
				//info_tip_div.style.top = info_tip_div_top + "px";
				info_tip_div.style.bottom = info_tip_div_bottom + "px";
				info_tip_div.style.left = left + "px";
				info_tip_div.innerHTML = msg;
				info_tip_div_top_lift = 0;
				info_tip_div.style.opacity = 1.0;
				info_tip_div.style.display = "inline-block";
				console.log("info: " + windowHalfX + ", left: " + left);
			}
			
			function DisplayMonsterDmg(dmg) {
				//show some dmg blood flashy thing over monster
				monster_wound_div_top = windowHalfY - 100 + Math.random()*200;
				var left = windowHalfX - 150 + Math.random()*200;
				monster_wound_div.style.top = monster_wound_div_top + "px";
				monster_wound_div.style.left = left + "px";
				monster_wound_div.innerHTML = dmg;
				monster_wound_div_top_lift = 0;
				monster_wound_div.style.opacity = 1.0;
				if(dmg == "Miss!")
				{
					monster_wound_div.style.backgroundImage = "url(media/miss.png)";
				}
				else
				{
					monster_wound_div.style.backgroundImage = "url(media/wound.png)";
				}
				monster_wound_div.style.display = "inline-block";
				//console.log("monster takes top: " + top + ", monster_wound_div.style.top: " + monster_wound_div.style.top);
			}
			
			function monsterInFrontOfPlayer() {
				//check if there is monster in front of player
				var looker = new THREE.Vector3(0, 0, 0).add(camera.look);
				looker.sub(camera.position);
				var lookie = new THREE.Vector3(0,0,0).add(looker);
				lookie.normalize();
				var new_pos =new THREE.Vector3(0,0,0).add(lookie);
				new_pos.add(current_position);
				console.log("player looks at x: " + new_pos.x + ", and z: " + new_pos.z);
				//check if monster is in that position
				for(i=0; i < array_of_monsters.length; i++)
				{
					//not precise calculation for monster position
					if((array_of_monsters[i].position.x == new_pos.x) && (array_of_monsters[i].position.z == new_pos.z))
					{
						return array_of_monsters[i];
					}
				}
				
				
				return 0;
			}
			
			function player_dies() {
				player1_div.style.opacity = "0.4";
				if(pickable_at_hand != 0)
				{
						pickable_at_hand = 0;
						pickable_at_hand_icon.style.left = "-170px";
						pickable_at_hand_icon = 0;	
				}
				playerDead = true;
				//Play player dies sound
				audio_player_death.play();
			}
			
			function player_attack() {
				if(playerDead)
					return;
					
				if(playerCanHit)
				{
					//cant attack for a while now
					playerCanHit = false;
					playerHitTimeout = WEAPON_SPEED*1000;
					weaponDiv.style.opacity=0.5;
					
					//is monster in front of player?
					var monster = monsterInFrontOfPlayer();
					if(monster)
					{
						//swing that weapon
						var att_roll = 50*Math.random()+PlayerAttack;
						console.log("player swings whatever he's holding in hand, att_roll: " + att_roll);
						if(att_roll > monster.defense)
						{
							//Hit!
							var dmg_roll = Math.round(WEAPON_DMG * Math.random()) + 1;
							
							//Damage monster
							monster.deal_damage(dmg_roll);

						}
						else
						{
							//Miss!
							DisplayMonsterDmg("Miss!");
							//Play miss sound swoosh
							audio_miss.play();
						}
					}
					else
					{
						//Miss!
						DisplayMonsterDmg("Miss!");
						//Play miss sound swoosh or cling
						audio_miss.play();
					}
				}
			}
			
			function inventory_show(param) {
				//show inventory if hidden, hide elsewhere
				if(inventory_div_vertical_pos == INVENTORY_POS_HIDDEN)
				{
					inventorySlide = 1;
				}
				else
				{
					inventorySlide = -1;
				}
			}
			
			function hide(param) {
				alert(param);
			}

			var SQUARE_SIZE = 10;

			var holeFallen = false;
			var cameraMove = false;
			var cameraRotate = false;
			var cameraRotateMover = new THREE.Vector3(0,0,0);
			var cameraRotateTurner = new THREE.Vector3(0,0,0);
			var cameraLooker = new THREE.Vector3(0,0,0);
			var cameraLookie = new THREE.Vector3(0,0,0);
			var cameraOriginalPosition = new THREE.Vector3(0,0,0);
			var cameraOriginalLook = new THREE.Vector3(0,0,0);
			var cameraDelta = 0;
			var cameraDeltaRotate = 0;
			
			var alerted = false;
			
			var container;
			var menu_div;
			
			var pickable_at_hand;
			var pickable_at_hand_icon;
			
			var projector, mouse = { x: 0, y: 0 }, INTERSECTED;
			///var x_pos = 0;
			///var y_pos = 0;

			var camera, scene, renderer;
			
			var m_RMBEventWasUsed = false;
			
			var monster_wound_div_top_lift = 0;
			var monster_wound_div_top = 0;

			var info_tip_div_top_lift = 0;
			var info_tip_div_top = 0;

			var mesh, mesh2, mesh3, light;

			var m_GamePaused = false;
			
			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;

			var current_position;
			var NUM_SLOTS_INVENTORY_ROW = 4;
			var NUM_CONTAINER_ROWS = 1;
			var SLOT_WIDTH = 128;
			var inventorySlide = 0;
			var inventory_div;
			var INVENTORY_POS_HIDDEN = -170;
			var INVENTORY_POS_SHOWN = 8;
			var inventory_div_vertical_pos = INVENTORY_POS_HIDDEN;
			var clock = new THREE.Clock();
			
			var WEAPON_SPEED = 3; //should be taken from real item
			var WEAPON_DMG = 10;
			var showMonsterDmg = false;
			var showPlayerDmg = false;
			var SHOW_DAMAGE_TIME = 1;
			var weaponDiv = 0; //id=player1tophand
			
			var level_complete_div = 0;
			
			//player stats
			var player_HP_div = 0;
			var playerHPmax = 30;
			var playerHPcurrent = 30;
			var playerDead = false;
			var playerCanHit = true;
			var playerHitTimeout = WEAPON_SPEED;
			var PlayerAttack = 30;
			var PlayerDefense = 50;
			
			var round_time = 0.01;
			var ROUND_DURATION = 2; //2 seconds
			var STEP_MOVE_DURATION = 150;
			
			var gStandingOnPlate = -1;
			var gWeightOnThePlate = false;
			var plate_click_audio;
			var plate_unclick_audio;
			var button_click_audio;
			var audio_lock_unlock;
			var audio_chest_open;
			var audio_player_death;
			var audio_miss;
			var audio_ngh;
			var audio_cling;
			var audio_door;
			var audio_ambient;
			var audio;
			var mouse_over_button = -1;
			var mouse_over_secret_wall = -1;
			var mouse_over_keyhole = -1;
			var item_over_keyhole = -1;
			var mouse_over_container = -1;
			var mouse_over_monster = -1;
			var item_over_monster = -1;
			var mouse_over_item_in_inventory = -1;
			var mouse_over_item_in_container = -1;
			
			var gui_left_div = 0;
			var gui_right_div = 0;

			init();
			animate();

			function hide_message()
			{
				//remove dialog screen
				info_dialog_div.style.display = "none";
			}
			
			function show_message(message, width, height) {
				if(info_dialog_div.style.display == "none")
				{
					info_dialog_message_div.innerHTML = message;
					
					if((width != 'undefined') && (width > 0))
					{
						info_dialog_div.style.width = width + "px";
					}
					else
					{
						info_dialog_div.style.width = "750px";
					}

					if ((height != 'undefined') && (height > 0))
					{
						info_dialog_div.style.height = height + "px";
					}
					else
					{
						info_dialog_div.style.height = "450px";
					}

					info_dialog_div.style.display = "inline";
				}
			}
			
			
			function init() {

				container = document.getElementById( 'container' );
				
				menu_div = document.getElementById( 'menu' );
				
				gui_left_div = document.getElementById( 'gui_left' );
				gui_right_div = document.getElementById( 'gui_right' );
				
				document.onkeydown = handleKeyDown;

				//audio!
				audio = document.createElement('audio');
				var source = document.createElement('source');
				source.src = 'media/thud.mp3';
				audio.appendChild(source);
				
				plate_click_audio = document.createElement('audio');
				var sourcep = document.createElement('source');
				sourcep.src = 'media/plate.mp3';
				plate_click_audio.appendChild(sourcep);
				
				plate_unclick_audio = document.createElement('audio');
				var sourcep = document.createElement('source');
				sourcep.src = 'media/plate_reverse.mp3';
				plate_unclick_audio.appendChild(sourcep);
				
				button_click_audio = document.createElement('audio');
				var sourceb = document.createElement('source');
				sourceb.src = 'media/button.mp3';
				button_click_audio.appendChild(sourceb);
				
				audio_lock_unlock = document.createElement('audio');
				var sourcel = document.createElement('source');
				sourcel.src = 'media/lock.mp3';
				audio_lock_unlock.appendChild(sourcel);
				
				audio_chest_open = document.createElement('audio');
				var sourcec = document.createElement('source');
				sourcec.src = 'media/chest.mp3';
				audio_chest_open.appendChild(sourcec);
				
				audio_player_death = document.createElement('audio');
				var source_apd = document.createElement('source');
				source_apd.src = 'media/death.mp3';
				audio_player_death.appendChild(source_apd);
				
				audio_miss = document.createElement('audio');
				var source_miss = document.createElement('source');
				source_miss.src = 'media/miss.mp3';
				audio_miss.appendChild(source_miss);

				audio_ngh = document.createElement('audio');
				var source_ngh = document.createElement('source');
				source_ngh.src = 'media/ngh.mp3';
				audio_ngh.appendChild(source_ngh);

				audio_cling = document.createElement('audio');
				var source_cling = document.createElement('source');
				source_cling.src = 'media/cling.mp3';
				audio_cling.appendChild(source_cling);

				audio_door = document.createElement('audio');
				var source_door = document.createElement('source');
				source_door.src = 'media/door.mp3';
				audio_door.appendChild(source_door);

				audio_ambient = document.createElement('audio');
				var source_ambient = document.createElement('source');
				source_ambient.src = 'media/ambient_music.mp3';
				audio_ambient.appendChild(source_ambient);
				
				audio_ambient.play();

				camera = new THREE.PerspectiveCamera( 47, window.innerWidth / window.innerHeight, 1, 10000 );
				camera.position.x = 160;
				camera.position.y = 4;
				camera.position.z = -5; //105
				camera.look = new THREE.Vector3(160,4,5); //160,4,115
				camera.lookAt(camera.look);
				
				current_position = new THREE.Vector3(16,0,0); //16,0,11

				scene = new THREE.Scene();
				scene.fog = new THREE.FogExp2( fog_color, fog_intensity );
				
				inventory_div = document.getElementById('gui_slots');
				inventory_div.style.left = (windowHalfX - (NUM_SLOTS_INVENTORY_ROW/2*SLOT_WIDTH)) +'px';
				
				container_div = document.getElementById('container_slots');
				container_div.style.left = (windowHalfX - (NUM_SLOTS_INVENTORY_ROW/2*SLOT_WIDTH)) +'px';
				container_div.style.top = SLOT_WIDTH +'px';
				
				loading_div = document.getElementById('loading_progress');
				//loading_div.style.display = "none";
				
				player1_div = document.getElementById('player1');
				
				level_complete_div = document.getElementById('level_complete_dialog');
				
				info_dialog_div = document.getElementById('info_dialog');
				info_dialog_message_div = document.getElementById('info_message');

				player_HP_div = document.getElementById('player1HP');
				player_HP_div.style.width = "100%";
				player_HP_div.style.backgroundColor = "#009900";
				
				player_wound_div = document.getElementById('player_wound');
				player_wound_div.style.display = 'none';
				
				monster_wound_div = document.getElementById('monster_wound');
				monster_wound_div.style.display = 'none';
				
				info_tip_div = document.getElementById('info_tip');
				info_tip_div.style.display = 'none';

				weaponDiv = document.getElementById('player1tophand');
				weaponDiv.style.opacity=1.0;
				
				light = new THREE.SpotLight();
				light.position.set( -155, 5, 10 );
				light.castShadow = true;
				//scene.add( light );
				
				light2 = new THREE.DirectionalLight( 0xffffff );
				light2.position.set( 50, 50, 50 ).normalize();
				light2.castShadow = true;
				scene.add( light2 );
				
				light2 = new THREE.DirectionalLight( 0xffffff );
				light2.position.set( -50, -30, -50 ).normalize();
				light2.castShadow = true;
				scene.add( light2 );

				light2 = new THREE.DirectionalLight( 0xffffff );
				light2.position.set( 50, -10, -30 ).normalize();
				light2.castShadow = true;
				//scene.add( light2 );

				//level specific action on load
				onLoad();
				
				//load level walls and floors etc..
				load_level();

				//load pickables
				load_pickables();
				
				//load niches
				loadNiches();
				
				//load tapestries
				load_tapestries();
				
				//load pressure plates (plynths)
				load_plates ();
				
				//load chests
				load_containers();
				
				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.shadowMapWidth = 128;;
				renderer.shadowMapHeight = 128;
				renderer.shadowCameraFov = 50;

				container.appendChild( renderer.domElement );

				document.addEventListener( 'mousemove', onDocumentMouseMove, false );
				document.addEventListener( 'mousedown', onMouseClick, false );
				
				//loading_div.style.display = "none";
				
				// initialize object to perform world/screen calculations
				projector = new THREE.Projector();

				window.addEventListener( 'resize', onWindowResize, false );

				load_monsters();
  
				renderer.shadowMapEnabled = true;

			}

			function morphColorsToFaceColors( geometry ) {

				if ( geometry.morphColors && geometry.morphColors.length ) {

					var colorMap = geometry.morphColors[ 0 ];

					for ( var i = 0; i < colorMap.colors.length; i ++ ) {

						geometry.faces[ i ].color = colorMap.colors[ i ];
						geometry.faces[ i ].color.offsetHSL( 0, 0.3, 0 );

					}

				}

			}
			
			//decide weather step is possible (hitting walls)
			function canMoveTo(id, x, z)
			{
				//return true;
				var i = 0;
				var j = 0;
				
				//console.log("canMoveTo id:" + id + " x:" + x + " z:" + z);
				//if player fell in hole, make sure he cant move around :)
				if(holeFallen||playerDead)
					return false;
				
				
				
				for(i=0; i < floorsArr2D.length; i++)
				{
					if((floorsArr2D[i][0] == x) && (floorsArr2D[i][1] == z))
					{
						//check if doors are in that position
						for(j=0; j < doorsArr3D.length; j++)
						{
							//if there are closed doors in that position..
							if((doorsArr3D[j][0] == x) && (doorsArr3D[j][1] == z)) 
							{
								if(doorsArr3D[j][3] == 0) return false;
							}
						}

						//check if pillar is in that position
						for(i=0; i < pillar_array.length; i++)
						{
							if((pillar_array[i][2] == x) && (pillar_array[i][3] == z))
							{
								return false;
							}
						}
						
						//check if monster is in that position
						for(i=0; i < array_of_monsters.length; i++)
						{
							if(array_of_monsters[i].gameID != id)
							{
								if(((array_of_monsters[i].position.x == x) && (array_of_monsters[i].position.z == z))||((array_of_monsters[i].target.x == x) && (array_of_monsters[i].target.z == z)))
								{
									return false;
								}
							}
						}

						return true;
					}
				}
				return false;
			}
			
			//check if that position is hole in the floor
			function positionIsHole(x,z) {
				
				//loop through holes array
				for(i=0;i<holesArr.length;i++)
				{
					if((holesArr[i][0] == x)&&(holesArr[i][1] == z))
					{
						return true;
					}
				}
				return false;
			}
			
			function positionIsTeleport(x,z) {
				
				//console.log("entered teleport!");
				if((x == teleport_pos.x/10)&&(z == teleport_pos.z/10))
				{
					return true;
				}
				
				return false;
			}
			
			function fallInHole()
			{
				holeFallen = true;
				if(pickable_at_hand != 0)
				{
						pickable_at_hand = 0;
						pickable_at_hand_icon.style.left = "-170px";
						pickable_at_hand_icon = 0;	
				}
			}
			

			//
			function handleKeyDown(event) {
				//console.log(event.keyCode);
				//if (event.keyCode == 88) {animateDoor = true;}
				
				if(cameraMove || cameraRotate || m_GamePaused)
					return;
					
				//Movement:
				var looker = new THREE.Vector3(0, 0, 0).add(camera.look);
				looker.sub(camera.position);
				
				container_div.style.display = "none";
				
				//Key I = Inventory
				//alert(event.keyCode);
				if (event.keyCode == 73) {
					//show inventory if hidden, hide elsewhere
					if(inventory_div_vertical_pos == INVENTORY_POS_HIDDEN)
					{
						inventorySlide = 1;
					}
					else
					{
						inventorySlide = -1;
					}
				}
				
				if ((event.keyCode == 37) || (event.keyCode == 81)) {
					// Turn Left Q
					
					//if player is in the hole atm, he can not turn around because he is dead.
					if(holeFallen||playerDead)
						return;
					
					//back tile position modification requires to move front and to the right by half step, then rotate
					var mover = new THREE.Vector3( 0, 0, 0 );
					var turner = new THREE.Vector3( 0, 0, 0 );
					mover.x = looker.x/2;
					mover.y = looker.y;
					mover.z = looker.z/2;
					cameraRotateMover.add(mover);
					turner.add(looker); 
					mover.normalize();
					var axis = new THREE.Vector3( 0, 1, 0 );
					var angle = -Math.PI / 2;
					var matrix = new THREE.Matrix4().makeRotationAxis( axis, angle );
					mover.applyMatrix4( matrix );
					if((mover.z<0.0001)&&(mover.z>-0.0001)) mover.z=0;
					if((mover.x<0.0001)&&(mover.x>-0.0001)) mover.x=0;
					mover.x *= 5;
					mover.z *= 5;
					cameraRotateMover.add(mover);
					
					//turn west
					looker.normalize();
					var axis = new THREE.Vector3( 0, 1, 0 );
					var angle = Math.PI / 2;
					var matrix = new THREE.Matrix4().makeRotationAxis( axis, angle );
					looker.applyMatrix4( matrix );
					if((looker.z<0.0001)&&(looker.z>-0.0001)) looker.z=0;
					if((looker.x<0.0001)&&(looker.x>-0.0001)) looker.x=0;
					
					//alert(looker.y);
					//alert();
					looker.x *= 10;
					looker.z *= 10;
					cameraRotateTurner.add(cameraRotateMover); 
					cameraRotateTurner.multiplyScalar(-1);

					
					var pos = new THREE.Vector3(0, 0, 0);
					pos.x = camera.position.x;
					pos.y = camera.position.y;
					pos.z = camera.position.z;
					//alert(pos.z); 40
					//alert(looker.z); 10
					//camera.look = pos.add(looker);
					//alert(pos.z);
					//camera.lookAt(camera.look);
					
					//cameraRotateMover;
					//cameraRotateTurner;
					cameraLooker.add(looker);
					cameraOriginalPosition.add(camera.position);
					cameraOriginalLook.add(camera.look);
					cameraRotate = true;
				
				} else if ((event.keyCode == 39) || (event.keyCode == 69)) {
					// Turne Right E
					
					//if player is in the hole atm, he can not turn around because he is dead.
					if(holeFallen||playerDead)
						return;
					
					//back tile position modification requires to move front and to the left by half step, then rotate right
					var mover = new THREE.Vector3( 0, 0, 0 );
					mover.x = looker.x/2;
					mover.y = looker.y;
					mover.z = looker.z/2;
					cameraRotateMover.add(mover);
					mover.normalize();
					var axis = new THREE.Vector3( 0, 1, 0 );
					var angle = +Math.PI / 2;
					var matrix = new THREE.Matrix4().makeRotationAxis( axis, angle );
					mover.applyMatrix4( matrix );
					if((mover.z<0.0001)&&(mover.z>-0.0001)) mover.z=0;
					if((mover.x<0.0001)&&(mover.x>-0.0001)) mover.x=0;
					mover.x *= 5;
					mover.z *= 5;
					cameraRotateMover.add(mover);
					
					//turn west
					looker.normalize();
					var axis = new THREE.Vector3( 0, 1, 0 );
					var angle = -Math.PI / 2;
					var matrix = new THREE.Matrix4().makeRotationAxis( axis, angle );
					looker.applyMatrix4( matrix );
					if((looker.z<0.0001)&&(looker.z>-0.0001)) looker.z=0;
					if((looker.x<0.0001)&&(looker.x>-0.0001)) looker.x=0;
					looker.x *= 10;
					looker.z *= 10;
					cameraRotateTurner.add(cameraRotateMover); 
					cameraRotateTurner.multiplyScalar(-1);
					
					var pos = new THREE.Vector3(0, 0, 0);
					pos.x = camera.position.x;
					pos.y = camera.position.y;
					pos.z = camera.position.z;
					//alert(pos.z); 40
					//alert(looker.z); 10
					//camera.look = pos.add(looker);
					//alert(pos.z);
					//camera.lookAt(camera.look);
					
					cameraLooker.add(looker);
					cameraOriginalPosition.add(camera.position);
					cameraOriginalLook.add(camera.look);
					cameraRotate = true;
					
				} else if ((event.keyCode == 38) || (event.keyCode == 87)) {
					// Up cursor key or W
					var lookie = new THREE.Vector3(0,0,0).add(looker);
					lookie.normalize();
					var new_pos =new THREE.Vector3(0,0,0).add(lookie);
					new_pos.add(current_position);
					if(canMoveTo(0, new_pos.x, new_pos.z))
					{
						//camera.position.add(looker);
						//camera.look.add(looker);
						//camera.lookAt(camera.look);
						//current_position.add(lookie);
						cameraLooker.add(looker);
						cameraLookie.add(lookie);
						cameraOriginalPosition.add(camera.position);
						cameraOriginalLook.add(camera.look);
						cameraMove = true;
						
						console.log("start move z: " + cameraLooker.z);
					}
					else
					{
						console.log("move audio w");
						//audio.pause();
						audio.play();
					}
				} else if ((event.keyCode == 40) || (event.keyCode == 83)) {
					// Down cursor key or S
					var lookie = new THREE.Vector3(0,0,0).add(looker);
					lookie.normalize();
					var new_pos =new THREE.Vector3(0,0,0).sub(lookie);
					new_pos.add(current_position);
					if(canMoveTo(0, new_pos.x, new_pos.z))
					{
						//camera.position.sub(looker);
						//camera.look.sub(looker);
						//camera.lookAt(camera.look);
						//current_position.sub(lookie);
						
						cameraLooker.add(looker);
						cameraLooker.multiplyScalar(-1);
						cameraLookie.add(lookie);
						cameraLookie.multiplyScalar(-1);
						cameraOriginalPosition.add(camera.position);
						cameraOriginalLook.add(camera.look);
						cameraMove = true;

					}
					else
					{
						audio.play();
					}
				} else if ((event.keyCode == 37) || (event.keyCode == 65)) {
					// Left cursor key or A
					
					var left_looker = new THREE.Vector3(0, 0, 0).add(looker);
					var axis = new THREE.Vector3( 0, 1, 0 );
					var angle = +Math.PI / 2;
					var matrix = new THREE.Matrix4().makeRotationAxis( axis, angle );
					left_looker.applyMatrix4( matrix );
					if((left_looker.z<0.0001)&&(left_looker.z>-0.0001)) left_looker.z=0;
					if((left_looker.x<0.0001)&&(left_looker.x>-0.0001)) left_looker.x=0;
					
					var lookie = new THREE.Vector3(0,0,0).add(left_looker);
					lookie.normalize();
					var new_pos =new THREE.Vector3(0,0,0).add(lookie);
					new_pos.add(current_position);
					if(canMoveTo(0, new_pos.x, new_pos.z))
					{
						//camera.position.add(left_looker);
						//camera.look.add(left_looker);
						//camera.lookAt(camera.look);
						//current_position.add(lookie);

						cameraLooker.add(left_looker);
						cameraLookie.add(lookie);
						cameraOriginalPosition.add(camera.position);
						cameraOriginalLook.add(camera.look);
						cameraMove = true;
						
					}
					else
					{
						audio.play();
					}
				} else if ((event.keyCode == 39) || (event.keyCode == 68)) {
					// Right cursor key or D
					
					var right_looker = new THREE.Vector3(0, 0, 0).add(looker);
					var axis = new THREE.Vector3( 0, 1, 0 );
					var angle = -Math.PI / 2;
					var matrix = new THREE.Matrix4().makeRotationAxis( axis, angle );
					right_looker.applyMatrix4( matrix );
					if((right_looker.z<0.0001)&&(right_looker.z>-0.0001)) right_looker.z=0;
					if((right_looker.x<0.0001)&&(right_looker.x>-0.0001)) right_looker.x=0;
					
					var lookie = new THREE.Vector3(0,0,0).add(right_looker);
					lookie.normalize();
					var new_pos =new THREE.Vector3(0,0,0).add(lookie);
					new_pos.add(current_position);
					if(canMoveTo(0, new_pos.x, new_pos.z))
					{
						//camera.position.add(right_looker);
						//camera.look.add(right_looker);
						//camera.lookAt(camera.look);
						//current_position.add(lookie);

						cameraLooker.add(right_looker);
						cameraLookie.add(lookie);
						cameraOriginalPosition.add(camera.position);
						cameraOriginalLook.add(camera.look);
						cameraMove = true;
						
					}
					else
					{
						audio.play();
					}
				}
			}
	

			function onWindowResize() {

				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;
				
				inventory_div.style.left = (windowHalfX - (NUM_SLOTS_INVENTORY_ROW/2*SLOT_WIDTH)) +'px';

				container_div.style.left = (windowHalfX - (NUM_SLOTS_INVENTORY_ROW/2*SLOT_WIDTH)) +'px';

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function loadModel(pos, rot) {
				return function (geometry, materials ) {
					materials[ 0 ].shading = THREE.FlatShading;
					var mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
					mesh.position = pos;
					mesh.rotation = rot;
					scene.add( mesh );
				}
			}
			
			function setCursor(pointer)
			{
				container.style.cursor = pointer;
				gui_left_div.style.cursor = pointer;
				gui_right_div.style.cursor = pointer;
				inventory_div.style.cursor = pointer;
				container_div.style.cursor = pointer;
			}
			
			function drawItemInfo(xpos, ypos, item)
			{
			}
			
			function onDocumentMouseMove( event )
			{

				x_pos = event.clientX;
				y_pos = event.clientY;
				
				mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
				mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
				
				// create a Ray with origin at the mouse position
				//   and direction into the scene (camera direction)
				var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
				projector.unprojectVector( vector, camera );
				var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

				
				var looker = new THREE.Vector3(0, 0, 0).add(camera.look);
				looker.sub(camera.position);
				var norm_looker = new THREE.Vector3(0,0,0).add(looker);
				norm_looker.normalize();
				var look_pos =new THREE.Vector3(0,0,0).add(current_position);
				look_pos.add(norm_looker);
				
				
				if(!pickable_at_hand)
				{
					//mouse over inventory stuff
					if(inventory_div_vertical_pos == INVENTORY_POS_SHOWN)
					{
						var item = inventory_item_clicked(x_pos,y_pos);
						if(item != 0)
						{
							//console.log("asdasdasdas");
							mouse_over_item_in_inventory = item;
							setCursor('pointer');
							drawItemInfo(x_pos,y_pos,item);
							return;
						}
					}
					mouse_over_item_in_inventory = -1;
					
					//mouse over container item
					if(container_div.style.display == "inline-block")
					{
						var slot = container_mouse_over_slot(x_pos,y_pos);
						if(slot > -1)
						{
							console.log("conktiitit");
							mouse_over_item_in_container = slot;
							setCursor('pointer');
							//drawItemInfo(x_pos,y_pos,item);
							return;
						}
					}
					mouse_over_item_in_container = -1;
					
					//mouse over pickables
					for (var i=0; i< array_of_pickables.length; i++)
					{
						if(array_of_pickables[i].mesh !=0)
						{
							//first skip buggers that are already picked. they are invisible still laying on the ground and intersection picks them up..
							if(array_of_pickables[i].mesh.visible == false)
								continue;
							
							//check if player is close to pickable
							if(camera.position.distanceTo(array_of_pickables[i].mesh.position)>18)
							{
								continue;
							}
							
							//check if pickable is clicked on
							var intersects = ray.intersectObject( array_of_pickables[i].mesh );
							
							// if there is one (or more) intersections
							if ( intersects.length > 0 )
							{
								// if the closest object intersected is not the currently stored intersection object
								if ( intersects[0].object.id == array_of_pickables[i].id )
								{
									//change mouse pointer to cursor
									setCursor('pointer');
									return;
								}
							}
						}
					}
					
					//mouse over wall writtings
					for (var n=0; n<writtingsArr.length; n++)
					{
						if((writtingsArr[n][0] == current_position.x)&&(writtingsArr[n][1] == current_position.z))
						{
							var lookie = new THREE.Vector3(0,0,0).add(looker);
							lookie.normalize();
							//console.log("close to writting, lookie.x:" + lookie.x + ", lookie.z:" + lookie.z);
							if(((lookie.x==0) && (lookie.z ==1) && (writtingsArr[n][2] == 0)) //north
							|| ((lookie.x==0) && (lookie.z ==-1) && (writtingsArr[n][2] == 2)) //south
							|| ((lookie.x==1) && (lookie.z ==0) && (writtingsArr[n][2] == 3)) //left
							|| ((lookie.x==-1) && (lookie.z ==0) && (writtingsArr[n][2] == 1))) //right
							{
								if(writtingsArr[n][4] != 0)
								{
									var intersects = ray.intersectObject( writtingsArr[n][4] );
							
									// if there is one (or more) intersections
									if ( intersects.length > 0 )
									{
										//change mouse pointer to cursor
										setCursor('pointer');
										return;
									}
								}
							}
						}
					}
					
					//mouse over doors
					for(var d=0; d < doorsArr3D.length; d++)
					{
						if(doorsArr3D[d][4] != 0)
						{
							//if there are doors in that position
							if((doorsArr3D[d][0] == look_pos.x) && (doorsArr3D[d][1] == look_pos.z))
							{
								//intersect..
								var intersects = ray.intersectObject( doorsArr3D[d][4] );
								
								// if there is one (or more) intersections
								if ( intersects.length > 0 )
								{
									setCursor('pointer');
									return;
								}
							}
						}
					}
					
					//mouse over secret walls
					for(var s=0; s<secretWallsArr.length; s++)
					{
						if(secretWallsArr[s].length > 3)
						{
							if((secretWallsArr[s][0] == current_position.x)&&(secretWallsArr[s][1] == current_position.z))
							{
								//intersect..
								var intersects = ray.intersectObject( secretWallsArr[s][3] );
								
								// if there is one (or more) intersections
								if ( intersects.length > 0 )
								{
									setCursor('pointer');
									mouse_over_secret_wall = s;
									return;
								}
							}
						}
					}
					
					//mouse over buttons
					for (var b=0; b<buttons_array.length; b++)
					{
						if((buttons_array[b][2] == current_position.x)&&(buttons_array[b][3] == current_position.z))
						{
							//console.log("paaaaaaa");
							if(array_of_buttons[b].mesh != 0)
							{
								var intersects = ray.intersectObject( array_of_buttons[b].mesh );
								
								// if there is one (or more) intersections
								if ( intersects.length > 0 )
								{
									//console.log("prrrt");
									//change mouse pointer to cursor
									setCursor('pointer');
									mouse_over_button = b;
									return;
								}
							}
						}
					}
					
					//mouse over keyholes
					for (var k=0; k<keyholes_array.length; k++)
					{
						if((keyholes_array[k][2] == current_position.x)&&(keyholes_array[k][3] == current_position.z))
						{
							//console.log("paaaaaaa");
							if(array_of_keyholes[k].mesh != 0)
							{
								var intersects = ray.intersectObject( array_of_keyholes[k].mesh );
								
								// if there is one (or more) intersections
								if ( intersects.length > 0 )
								{
									//console.log("prrrt");
									//change mouse pointer to cursor
									setCursor('pointer');
									mouse_over_keyhole = k;
									return;
								}
							}
						}
					}
					
					//mouse over containers
					var c = looking_at_container();
					if(c > -1)
					{
						//console.log("coooooontainernrr");
						if(array_of_containers[c].mesh != 0)
						{
							var intersects = ray.intersectObject( array_of_containers[c].mesh );
							
							// if there is one (or more) intersections
							if ( intersects.length > 0 )
							{
								//console.log("prrrt coooooontainernrr");
								//change mouse pointer to cursor
								setCursor('pointer');
								mouse_over_container = c;
								return;
							}
						}
					}
					
					//mouse over monster
					for ( var m = 0; m < array_of_monsters.length; m ++ )
					{
						var monster = array_of_monsters[ m ];
						if(monster.mesh != 0)
						{
							//is monster standing in front of player?
							if((monster.position.x == look_pos.x)&&(monster.position.z == look_pos.z))
							{
								var intersects = ray.intersectObject( monster.mesh );
								
								// if there is one (or more) intersections
								if ( intersects.length > 0 )
								{
									//console.log("prrrt coooooontainernrr");
									//change mouse pointer to cursor
									setCursor('pointer');
									mouse_over_monster = m;
									return;
								}
							}
						}
					}
					
				}
				else //pickable is at hand
				{
				
					//pickable over keyhole
					for (var b=0; b<keyholes_array.length; b++)
					{
						if((keyholes_array[b][2] == current_position.x)&&(keyholes_array[b][3] == current_position.z))
						{
							//console.log("paaaaaaa");
							if(array_of_keyholes[b].mesh != 0)
							{
								var intersects = ray.intersectObject( array_of_keyholes[b].mesh );
								
								// if there is one (or more) intersections
								if ( intersects.length > 0 )
								{
									console.log("prrrt " + item_over_keyhole);
									//change mouse pointer to cursor
									setCursor('pointer');
									item_over_keyhole = b;
									return;
								}
								else
								{
									//check if top left corner of pickable icon is intersecting because of key tip to keyhole issue:
									//(players tend to center tip of the key to keyhole which causes center of icon to miss keyhole)
									var musex = ( (event.clientX-44) / window.innerWidth ) * 2 - 1;
									var musey = - ( (event.clientY-44) / window.innerHeight ) * 2 + 1;
									
									var vector = new THREE.Vector3( musex, musey, 1 );
									projector.unprojectVector( vector, camera );
									var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

									var intersects = ray.intersectObject( array_of_keyholes[b].mesh );
								
									// if there is one (or more) intersections
									if ( intersects.length > 0 )
									{
										console.log("grrrt " + item_over_keyhole);
										//change mouse pointer to cursor
										setCursor('pointer');
										item_over_keyhole = b;
										return;
									}
								
								}
							}
						}
					}
					
					//pickable over monster
					for ( var m = 0; m < array_of_monsters.length; m ++ )
					{
						var monster = array_of_monsters[ m ];
						if(monster.mesh != 0)
						{
							//is monster standing in front of player?
							if((monster.position.x == look_pos.x)&&(monster.position.z == look_pos.z))
							{
								var intersects = ray.intersectObject( monster.mesh );
								
								// if there is one (or more) intersections
								if ( intersects.length > 0 )
								{
									//change mouse pointer to cursor
									setCursor('pointer');

									item_over_monster = m;
									return;
								}
							}
						}
					}
				}
				
				mouse_over_button = -1;
				mouse_over_secret_wall = -1;
				mouse_over_keyhole = -1;
				mouse_over_container = -1;
				mouse_over_monster = -1;
				mouse_over_item_in_inventory = -1;
				mouse_over_item_in_container = -1;
				item_over_keyhole = -1;
				item_over_monster = -1
				setCursor('auto');
			}

			function handleMouseClick(x,y) {
		
				//is player standing in front of door?
				//currentPos.x, currentPos.z
				var xDoor = 0;
				var zDoor = 0;
				
				//alert("ima1!");
				
				var looker = new THREE.Vector3(0, 0, 0).add(camera.look);
				looker.sub(camera.position);
				looker.normalize();
				var look_pos =new THREE.Vector3(0,0,0).add(current_position);
				look_pos.add(looker);
				
					
				/*if(yaw == 0) {xDoor = currentPos.x; zDoor = currentPos.z-1;}
				if((yaw == 90)||(yaw == -270)) {xDoor = currentPos.x-1; zDoor = currentPos.z}
				if((yaw == 180)||(yaw == -180)) {xDoor = currentPos.x; zDoor = currentPos.z+1;}
				if((yaw == 270)||(yaw == -90)) {xDoor = currentPos.x+1; zDoor = currentPos.z}*/

				for(i=0; i < doorsArr3D.length; i++)
				{
					//if there are doors in that position
					if((doorsArr3D[i][0] == look_pos.x) && (doorsArr3D[i][1] == look_pos.z))
					{
						// and door are unlocked..
						if(doorsArr3D[i][6] == 1)
						{
							/*if((x>450)&&(x<500)&&(y>200)&&(y<250))*/ //location of button
							doorsArr3D[i][5] = 1; //animate flag
							//alert("ima!");
							audio_door.load();
							audio_door.play();
							if(doorsArr3D[i][3] == 0) doorsArr3D[i][3] = 1; // open/close flag
							else doorsArr3D[i][3] = 0;
						}
						else
						{
							if(doorsArr3D[i][3] == 0)
							{
								DisplayInfoDiv("These doors are opened elsewhere..");
							}
						}
					}
				}
			}
			
			window.oncontextmenu = function ()
			{
				console.log("pera oncontextmenu");
				if(m_RMBEventWasUsed)
				{
					m_RMBEventWasUsed = false;
					return false;     // cancel default menu
				}
			}

			function onMouseClick(event) {

				//console.log("onMouseClick");

				var isRightMB;
				var e = event || window.event;
				if ("which" in e)  // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
					isRightMB = e.which == 3; 
				else if ("button" in e)  // IE, Opera 
					isRightMB = e.button == 2; 
				
				x_pos = event.clientX;
				y_pos = event.clientY;
				
				var look_offset = new THREE.Vector3(0, 0, 0).add(camera.look);
				look_offset.sub(camera.position);
				look_offset.normalize();
				var look_pos =new THREE.Vector3(0,0,0).add(current_position);
				look_pos.add(look_offset);
				
				// update the mouse variable
				mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
				mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
				
				//if player is holding some item in hand (under mouse pointer)
				if(pickable_at_hand)
				{
					//check if item is placed in inventory
					var slot_index = inventory_clicked_in_slot(x_pos,y_pos);
					if(slot_index > 0)
					{
						//alert("yo yo " + pickable_at_hand);
						add_to_inventory(pickable_at_hand, slot_index);
						pickable_at_hand_icon.style.left = "-170px";
						pickable_at_hand_icon = 0;
						pickable_at_hand = 0;
						
						return;
					}
					
					//check if pickable is being placed in container
					if(container_div.style.display == "inline-block")
					{
						slot_index = container_clicked_in_slot(x_pos,y_pos);
						if(slot_index > 0)
						{
							//alert("yo yo " + pickable_at_hand);
							add_to_container(pickable_at_hand, slot_index);
							pickable_at_hand_icon.style.left = "-170px";
							pickable_at_hand_icon = 0;
							pickable_at_hand = 0;
							
							return;
						}
					}
					
					//check if player is trying to put it in the niche
					var nicheID = niche_clicked_in(x_pos,y_pos);
					if(nicheID > -1)
					{
						//add pickable at hand to niche
						add_to_niche(nicheID,pickable_at_hand);
						pickable_at_hand = 0;
						pickable_at_hand_icon.style.left = "-170px";
						pickable_at_hand_icon = 0;	
						
						return;
					}
					
					//check if player is clicking item on the monster
					//var monsterID = monster_clicked_on(look_pos);
					if(item_over_monster > -1)
					{
						var monster = array_of_monsters[ item_over_monster ];
						
						console.log("player clicked item on " + monster.name);
						var taken = monster.OnItemClick(pickable_at_hand);

						//if monster took the pickable - make it dissapear
						if(taken)
						{
							pickable_at_hand_icon.style.left = "-170px";
							pickable_at_hand_icon = 0;
							pickable_at_hand.mesh.visible = false;
							pickable_at_hand = 0;
						}
						return;
					}
					
					//keyhole
					if(item_over_keyhole > -1)
					{
						console.log("iiiki " + item_over_keyhole);
						//if item id is same as keyhole id => it is a match!
						if(keyholes_array[item_over_keyhole][0] == pickable_at_hand.gameID)
						{
							//unlock the keyhole!
							//play sound
							audio_lock_unlock.play();
							//call script function
							array_of_keyholes[item_over_keyhole].onPressFunc();
							array_of_keyholes[item_over_keyhole].locked = false;
							//drop the key icon
							pickable_at_hand_icon.style.left = "-170px";
							pickable_at_hand_icon = 0;
							//key is spent so just dissapears
							pickable_at_hand = 0;
							
							DisplayInfoDiv("Unlocked!");
						}
						else
						{						
							//show info
							DisplayInfoDiv("Doesn't fit..");
						}
						return;
					}

					//if click is too high, do nothing (throwing to be implemented later)
					
					
					//drop it on the ground
					
					//check if pickable is dropped on the pressure plate plynth
					var plateID = standing_on_plate();
					var looker = camera.look.clone().sub(camera.position);
					
					DisplayInfoDiv(pickable_at_hand.name + " dropped on the ground..");
					
					//TODO: REMOVE DIRTY HACK, BECAUSE RING IS SMALL I MOVED IT CLOSER TO THE EDGE
					if(pickable_at_hand.name=="Ring")
					{
						console.log("trti ring");
						looker.multiplyScalar(0.97);
					}
					else
					{
						if(plateID>-1)
						{
							looker.multiplyScalar(0.62);
							gWeightOnThePlate = true;
							pickable_at_hand.plated = plateID;
							array_of_plates[plateID].mesh.position.y -=0.2;
							//plate_click_audio.play();
							//var onPress = plates_array[plateID][5];
							//if(onPress !=0 )
							//{
							//	onPress();
							//}
						}
						else
						{
							plateID = clicking_on_plate();
							//if not standing on plate, check if clicking on plate
							if(plateID>-1)
							{
								looker.multiplyScalar(1.52);
								gWeightOnThePlate = true;
								pickable_at_hand.plated = plateID;
								array_of_plates[plateID].mesh.position.y -=0.2;
								plate_click_audio.play();
								var onPress = plates_array[plateID][5];
								if(onPress !=0 )
								{
									onPress();
								}
							}
							else
							{
								looker.multiplyScalar(0.92);
							}
						}
					}
					
					//var pos = camera.position.clone().add(looker);
					pickable_at_hand.mesh.position = camera.position.clone().add(looker);
					if(plateID>-1)
					{
						pickable_at_hand.mesh.position.y = 0.3;
					}
					else
					{
						pickable_at_hand.mesh.position.y = 0;
					}
					pickable_at_hand.mesh.visible = true;
					pickable_at_hand = 0;

					
					pickable_at_hand_icon.style.left = "-170px";
					pickable_at_hand_icon = 0;
					
					inventorySlide = -1;
					
					return;
					
				}
				else //regular mouse click on screen, pickable is not at hand
				{
				
					//click on monster
					if(mouse_over_monster > -1)
					{
						var monster = array_of_monsters[ mouse_over_monster ];
						monster.OnClick();
					}
					
					//check if item from inventory is clicked
					if(mouse_over_item_in_inventory != -1)
					{
						if(isRightMB)
						{
							//use item
							//print item use hint
							DisplayInfoDiv(mouse_over_item_in_inventory.useHint);
							//run item usage script function
							if(mouse_over_item_in_inventory.useScript != 0)
							{
								mouse_over_item_in_inventory.useScript();
							}
							//consume if expendable
							if(mouse_over_item_in_inventory.consumable)
							{
								inventory_item_remove(mouse_over_item_in_inventory);
							}
							m_RMBEventWasUsed = true;
						}
						else
						{
							//remove picked from inventory
							inventory_item_remove(mouse_over_item_in_inventory);
							
							//place inventory item at hand
							pickable_at_hand = mouse_over_item_in_inventory;
							pickable_at_hand.mesh.visible = false; //TODO remove this line?
							pickable_at_hand_icon = document.getElementById("pickable_at_hand_id");
							pickable_at_hand_icon.src = mouse_over_item_in_inventory.icon;
						}
						mouse_over_item_in_inventory = -1;
						//dont do anything else if item is clicked
						return;
					}
					
					//check if item from container is clicked
					if(container_div.style.display == "inline-block")
					{
						var item = container_item_clicked(x_pos,y_pos);
						if(item)
						{
							//place container item at hand
							pickable_at_hand = item;
							pickable_at_hand.mesh.visible = false;
							pickable_at_hand_icon = document.getElementById("pickable_at_hand_id");
							pickable_at_hand_icon.src = item.icon;

							//dont do anything else if item is picked
							return;
						}
					}
					
					//button
					if(mouse_over_button > -1)
					{
						if(array_of_buttons[mouse_over_button].pressed == false)
						{
							//play sound
							button_click_audio.play();
							//move button in the wall
							array_of_buttons[mouse_over_button].mesh.position.x -= 0.05; //TODO move depending on orientation
							//do button action
							array_of_buttons[mouse_over_button].onPressFunc();
							//set it to be budged.. no more clicking.
							array_of_buttons[mouse_over_button].pressed = true;
							//info
							DisplayInfoDiv("Buttons triggers some mechanism!");
						}
					}
					
					//secret wall
					if(mouse_over_secret_wall > -1)
					{
						DisplayInfoDiv(secretWallsArr[mouse_over_secret_wall][4]);
					}
					
					//button
					if(mouse_over_keyhole > -1)
					{
						//play sound ?
						//button_click_audio.play();
						
						//show info
						if(array_of_keyholes[mouse_over_keyhole].locked)
						{
							DisplayInfoDiv("For every keyhole there is a key..");
						}
						else
						{
							DisplayInfoDiv("This lock is unlocked..");
						}
					}
					
					//check if player clicked on chest (3d model)
					if(mouse_over_container > -1)
					{
						//open container inventory, and player inventory
						//play sound
						audio_chest_open.play();
						container_fill_gui(mouse_over_container);
						inventorySlide = 1;
						DisplayInfoDiv("Chest opened..");
						return;
					}
					
					//check if player clicked on writting on the wall
					for (var n=0; n<writtingsArr.length; n++)
					{
						if((writtingsArr[n][0] == current_position.x)&&(writtingsArr[n][1] == current_position.z))
						{
							var looker = new THREE.Vector3(0, 0, 0).add(camera.look);
							looker.sub(camera.position);
							var lookie = new THREE.Vector3(0,0,0).add(looker);
							lookie.normalize();
							//console.log("close to writting, lookie.x:" + lookie.x + ", lookie.z:" + lookie.z);
							if(((lookie.x==0) && (lookie.z ==1) && (writtingsArr[n][2] == 0)) //north
							|| ((lookie.x==0) && (lookie.z ==-1) && (writtingsArr[n][2] == 2)) //south
							|| ((lookie.x==1) && (lookie.z ==0) && (writtingsArr[n][2] == 3)) //left
							|| ((lookie.x==-1) && (lookie.z ==0) && (writtingsArr[n][2] == 1))) //right
							{
								console.log("looking at writting!");
								show_message(" <br> " + writtingsArr[n][3] + " <br><br> <button onclick='hide_message();'> Ok </button>", 600, 300);
								//DisplayInfoDiv("Ancient writting deciphered..");
							}
						}
					}

					// create a Ray with origin at the mouse position
					//   and direction into the scene (camera direction)
					var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
					projector.unprojectVector( vector, camera );
					var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

					for (var i=0; i< array_of_pickables.length; i++)
					{
						//first skip buggers that are already picked. they are invisible still laying on the ground and intersection picks them up..
						if(array_of_pickables[i].mesh.visible == false)
							continue;
						
						//check if player is close to pickable
						if(camera.position.distanceTo(array_of_pickables[i].mesh.position)>18)
						{
							console.log("too far = " + Math.abs(camera.position.z-array_of_pickables[i].position.z));
							continue;
						}
						
						//check if pickable is clicked on
						var intersects = ray.intersectObject( array_of_pickables[i].mesh );
						
						// if there is one (or more) intersections
						if ( intersects.length > 0 )
						{
							
							// if the closest object intersected is not the currently stored intersection object
							if ( intersects[0].object.id == array_of_pickables[i].id )
							{
								pickable_at_hand = array_of_pickables[i];
								pickable_at_hand.mesh.visible = false;
								pickable_at_hand_icon = document.getElementById("pickable_at_hand_id");
								var from_where = "from the ground..";
								if(pickable_at_hand.niched > -1) from_where = "from niche in the wall";
								DisplayInfoDiv(pickable_at_hand.name + " picked up " + from_where);
								//alert("picked z = " + Math.abs(camera.position.z-array_of_pickables[i].mesh.position.z));
								pickable_at_hand_icon.src = pickable_at_hand.icon;
								//if pickable belongs to niche, remove from niche array
								if(pickable_at_hand.niched > -1) remove_from_niche(pickable_at_hand);
								if(pickable_at_hand.plated > -1)
								{
									//TODO: check if more items remain on the plate
									gWeightOnThePlate = false;
									array_of_plates[pickable_at_hand.plated].mesh.position.y +=0.2;
									console.log("lifting item off the plate!");
									plate_unclick_audio.play();
									var onUnpress = plates_array[pickable_at_hand.plated][6];
									if(onUnpress !=0 )
									{
										onUnpress();
									}
									pickable_at_hand.plated = -1;
								}
								inventorySlide = 1;
								break;
							}
						}
						else
						{
							//alert("not intersecting!" + array_of_pickables[i].mesh.id);
						}
					}
					
				}

				handleMouseClick(x_pos, y_pos);
				
			}
	

			    var lastTime = 0;


	
			function animate() {
			
				if(m_GamePaused)
					return;

				requestAnimationFrame( animate );

				var timeNow = new Date().getTime();
				
				//..so it begins
				if (lastTime != 0) {

					var elapsed = timeNow - lastTime;

					update_teleport(elapsed/10000);
					
					//lifting wound div up and opacitating it to transparent
					if(monster_wound_div.style.display == "inline-block")
					{
						monster_wound_div_top_lift += elapsed;
						if(monster_wound_div_top_lift < 3000)
						{
							var new_top = monster_wound_div_top - monster_wound_div_top_lift/20;
							monster_wound_div.style.top = new_top + "px";
							monster_wound_div.style.opacity -= monster_wound_div_top_lift/30000;
						}
						else
						{
							//wound should dissappear
							monster_wound_div.style.display = 'none';
						}
					}
					
					//lifting info div up and opacitating it to transparent
					if(info_tip_div.style.display == "inline-block")
					{
						info_tip_div_top_lift += elapsed;
						if(info_tip_div_top_lift < 6000)
						{
							var new_top = info_tip_div_top - info_tip_div_top_lift/20;
							//info_tip_div.style.top = new_top + "px";
							info_tip_div.style.opacity -= info_tip_div_top_lift/60000;
						}
						else
						{
							//wound should dissappear
							info_tip_div.style.display = 'none';
						}
					}
					
					if(playerCanHit == false)
					{
						playerHitTimeout -= elapsed;
						
						if(playerHitTimeout < 0)
						{
							console.log("hit available again, elapsed: " + elapsed);
							playerHitTimeout = 0;
							playerCanHit = true;
							weaponDiv.style.opacity=1.0;
						}
					}
					
					//animate camera move
					if(cameraMove)
					{
						//calculate delta position from start to end based on elapsed time
						var deltaMove = elapsed*SQUARE_SIZE/STEP_MOVE_DURATION;
						var deltaLooker = new THREE.Vector3(0,0,0).add(cameraLooker);
						deltaLooker.multiplyScalar(deltaMove/10); //i don't know why i have to divide here by 10?
						
						//set camera position to delta
						cameraDelta+=deltaMove;
						camera.position.add(deltaLooker);
						camera.look.add(deltaLooker);
						camera.lookAt(camera.look);
						
						if (cameraDelta >= SQUARE_SIZE-0.3)
						{
							console.log("stop move cameraOriginalPosition.x: " + cameraOriginalPosition.x);
							console.log("stop move cameraLooker.x: " + cameraLooker.x);
							cameraMove = false;
							camera.position.multiplyScalar(0);
							camera.position.add(cameraOriginalPosition.add(cameraLooker));
							camera.look.multiplyScalar(0);
							camera.look.add(cameraOriginalLook.add(cameraLooker));
							camera.lookAt(camera.look);
							current_position.add(cameraLookie);
							cameraLooker.multiplyScalar(0);
							cameraLookie.multiplyScalar(0);
							cameraOriginalPosition.multiplyScalar(0);
							cameraOriginalLook.multiplyScalar(0);
							cameraDelta = 0;
							//check if player stepped onto hole in the ground
							if(positionIsHole(current_position.x, current_position.z))
							{
								//animate fall into hole
								fallInHole();
							}
							
							//check if player was standing on press plate before this move..
							if(gStandingOnPlate > -1)
							{
								//call pressure plate onUnpress function..
								if(gWeightOnThePlate)
								{
									console.log("plate is not unpressed because weight is on it!");
								}
								else
								{
									console.log("plate unpressed!");
									///
									plate_unclick_audio.play();
									var onUnpress = plates_array[gStandingOnPlate][6];
									if(onUnpress !=0 )
									{
										onUnpress();
									}
								}
								gStandingOnPlate = -1;
							}
							
							//check if player has stepped on the pressure plate
							var plateID = standing_on_plate();
							if(plateID>-1)
							{
								if (!gWeightOnThePlate)
								{
									//call pressure plate onPress function..
									console.log("plate pressed!");
									plate_click_audio.play();
									var onPress = plates_array[plateID][5];
									if(onPress !=0 )
									{
										onPress();
									}
								}
								gStandingOnPlate = plateID;
							}
							
							//check if player stepped onto teleport!
							if(teleport != 0)
							{
								if(positionIsTeleport(current_position.x, current_position.z))
								{
									//pause game
									//m_GamePaused = true;
									//show final register/feedback level complete screen!
									//displayLevelCompleteDialog();
									teleportGo();
								}
							}
						}
						
					}
					
					//animate camera rotate
					if(cameraRotate)
					{
						var deltaMove = elapsed*SQUARE_SIZE/STEP_MOVE_DURATION;
						var deltaRotateMover = new THREE.Vector3(0,0,0).add(cameraRotateMover);
						var deltaRotateTurner = new THREE.Vector3(0,0,0).add(cameraRotateTurner);
						deltaRotateMover.multiplyScalar(deltaMove/cameraRotateMover.distanceTo(new THREE.Vector3(0,0,0))); //i don't know why i have to divide here by length?
						deltaRotateTurner.multiplyScalar(deltaMove/cameraRotateTurner.distanceTo(new THREE.Vector3(0,0,0))); //i don't know why i have to divide here by length?
						cameraDelta+=deltaMove;
						
						camera.position.add(deltaRotateMover);
						camera.look.add(deltaRotateTurner);
						camera.lookAt(camera.look);
						//cameraRotateMover
						//cameraLooker
						//cameraOriginalLook
						if (cameraDelta >= cameraRotateMover.distanceTo(new THREE.Vector3(0,0,0)))
						{
							var cameraRotLookie = new THREE.Vector3(0,0,0).add(cameraLooker);
							cameraRotLookie.normalize();
							console.log("stop rotate cameraRotateTurner.x: " + cameraRotateTurner.x);
							console.log("stop rotate cameraRotateTurner.z: " + cameraRotateTurner.z);
							cameraRotate = false;
							camera.position.multiplyScalar(0);
							camera.position.add(cameraOriginalPosition.add(cameraRotateMover));
							camera.look.multiplyScalar(0);
							camera.look.add(cameraOriginalLook.add(cameraRotateTurner));
							camera.lookAt(camera.look);
							//current_position.add(cameraRotLookie);
							cameraLooker.multiplyScalar(0);
							cameraRotateMover.multiplyScalar(0);
							cameraRotateTurner.multiplyScalar(0);
							cameraRotLookie.multiplyScalar(0);
							cameraOriginalPosition.multiplyScalar(0);
							cameraOriginalLook.multiplyScalar(0);
							cameraDelta = 0;
						}
					}
					
					//animate doors opening/closing
					for(i=0; i < doorsArr3D.length; i++)
					{
						if(doorsArr3D[i][5] == 1) //openable
						{
							if(doorsArr3D[i][3] == 0) //closed
							{
								doorsArr3D[i][4].position.y -= elapsed/400;
								if(doorsArr3D[i][4].position.y < 0.01) 
								{
									doorsArr3D[i][5] = 0;
									audio_door.pause();
								}
							}
							else 
							{
								doorsArr3D[i][4].position.y += elapsed/400;
								if(doorsArr3D[i][4].position.y > 7.5) 
								{
									doorsArr3D[i][5] = 0;
									audio_door.pause();
								}
							}
						}
					}
					
					
					//slide inventory up
					if(inventorySlide == 1)
					{
						inventory_div_vertical_pos += elapsed/3;
						inventory_div.style.bottom = inventory_div_vertical_pos + 'px';
						//alert(inventory_div.style.bottom);
						if(inventory_div_vertical_pos > INVENTORY_POS_SHOWN)
						{
							inventory_div.style.bottom = INVENTORY_POS_SHOWN + 'px';
							inventory_div_vertical_pos = INVENTORY_POS_SHOWN;
							inventorySlide = 0;
						}
						//inventory_div.style.top = '100px';
					}
					if(inventorySlide == -1)
					{
						inventory_div_vertical_pos -= elapsed/3;
						inventory_div.style.bottom = inventory_div_vertical_pos +'px';
						//alert(inventory_div.style.bottom);
						if(inventory_div_vertical_pos < INVENTORY_POS_HIDDEN)
						{
							inventory_div.style.bottom = INVENTORY_POS_HIDDEN + 'px';
							inventory_div_vertical_pos = INVENTORY_POS_HIDDEN;
							inventorySlide = 0;
						}
						//inventory_div.style.top = '100px';
					}
					
					
					//animate hole fall
					if(holeFallen)
					{
						if(camera.position.y > -6)
						{
							var looker = camera.look.clone().sub(camera.position);
							camera.position.x += elapsed*looker.x/1200;
							camera.position.z += elapsed*looker.z/1200;
							camera.position.y -= elapsed/40;
							camera.look.y += elapsed/60;
							camera.lookAt(camera.look);
						}
						else if(!alerted)
						{
							alerted = true;
							//alert("game over");
							show_message("<br><br>You have fallen to your demise. <br><br>Only thing you can do now is reload the page and start again. <br><br> <button onclick='location.reload();'> Restart </button>  &nbsp;&nbsp; <input type='button' value=' Load ' disabled>");
							player_dies();
						}
					}
					
				}
				lastTime = timeNow;
		
		
				/*
				//move pickable 3d object on the screen under mouse
				if(pickable_at_hand)
				{
					var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
					projector.unprojectVector( vector, camera );
					var dir = vector.sub( camera.position ).normalize();
					dir.multiplyScalar( 10 );
					var pos = camera.position.clone().add( dir );
					pickable_at_hand.mesh.position = pos;
					//alert("pickable_at_hand oooo" + pickable_at_hand);	
				}*/
				
				if(pickable_at_hand_icon)
				{
					pickable_at_hand_icon.style.left = (x_pos - 64) + 'px';
					pickable_at_hand_icon.style.top = (y_pos - 64) + 'px';
				}
		
		
				render();
				stats.update();
				
				
				
	
	
	

			}

			function render() {

			
				var delta = clock.getDelta();
				round_time += delta;
				if(round_time > ROUND_DURATION)
				{
					console.log("round tick");
					player_wound_div.style.display = 'none';
					round_time = 0;
					
					for ( var i = 0; i < array_of_monsters.length; i ++ ) {

						var monster = array_of_monsters[ i ];
						if(monster.mesh != 0)
						{
							if(monster.mood == MONSTER_MAD)
							{
								monster.find_player(current_position);
							}
							else if(monster.mood == MONSTER_WALK)
							{
								var destination = new THREE.Vector3(16,0,13);
								monster.find_path(destination);
							}
						}
						//console.log(" " + i)
					}
				
				}

				for ( var i = 0; i < array_of_monsters.length; i ++ ) {

					var monster = array_of_monsters[ i ];
					if(monster.mesh != 0)
					{
						monster.mesh.updateAnimation( 1000 * delta );
						monster.move(round_time*SQUARE_SIZE/ROUND_DURATION);
					}
					//console.log(" " + i)
				}

				renderer.render( scene, camera );

			}
			

		</script>

		<img id="pickable_at_hand_id" src="media/none.png" style="position:absolute; left:-170px;" />
		
	</body>
</html>
