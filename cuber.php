<?php 

	$DIR='..';
	// Connects to Database 
	//mysql_connect("www.mystic-peanut.com", "mysticp_mysticp", "superme2") or die(mysql_error()); 
	//mysql_select_db("mysticp_comments") or die(mysql_error()); 
    //include "cuber_play_counter.php";

	session_start();

	if(isset($_SESSION['views']))
	$_SESSION['views']=$_SESSION['views']+1;
	else
	$_SESSION['views']=1;
	//echo "Views=". $_SESSION['views'];
	
	echo "<script src='./source/three.min.js'></script>";
	
	if (isset($_COOKIE["cubish_user"]))
	{
		echo "<script>var first_time_user = false; var cubish_user_id = " . $_COOKIE["cubish_user"] . "; </script> ";
		//get last saved game of this user
		//$json_save_data = '{"data_type":"save","desc":"data to be saved","user_id":123,"martin_level":1,"martin_experience":1,"martin_HPmax":30,"martin_HPcurrent":10,"martin_strength":10,"martin_dexterity":10,"martin_attack":10,"martin_defence":10,"position":{"x":13,"z":5},"rotation":2,"current_level":3,"inventory":[{"slot":1,"gameID":2}],"left_hand_item":3,"doors":[],"pickables":[{"gameID":4,"x":104,"y":6,"z":56,"niched":-1,"plated":-1},{"gameID":5,"x":131,"y":0,"z":44,"niched":-1,"plated":-1},{"gameID":6,"x":43,"y":3.5,"z":79,"niched":0,"plated":-1}],"monsters":[{"gameID":121,"position":{"x":15,"z":18},"rotation":2,"mood":1,"hp":20},{"gameID":122,"position":{"x":11,"z":14},"rotation":2,"mood":1,"hp":20}]}';
		
		//get last saved game from cookie
		if (isset($_COOKIE["saved_game"]))
		{
			$json_save_data = $_COOKIE["saved_game"];
			echo "<script>var saved_game = true; var arrayOfGameStories = []; var last_saved_data = " . $json_save_data . "; </script> ";
			//$last_saved_data = json_decode($json_save_data, true) ? : [];
		}
		else
		{
			echo "<script>var saved_game = false; var arrayOfGameStories = []; var last_saved_data = {'levels':{}};</script> ";
		}
	}
	else
	{
		
		$expire=time()+60*60*24*30*3;
		$useridvalue = rand(1000000000,10000000000);
		setcookie("cubish_user", $useridvalue, $expire);
		echo "<script>var saved_game = false; var arrayOfGameStories = []; var last_saved_data = {'levels':{}}; var first_time_user = true; var cubish_user_id = " . $useridvalue . "; </script> ";
		//echo "<script src='./maps/level3/level3.js'></script>";
	}
  
	$_SESSION['inventozy'] = array();
	
	if((isset($_POST["inventory"])) && (strlen($_POST["inventory"])>1))
	{
		//get items from inventory
		$iitems = explode("|||", $_POST["inventory"]);
		foreach($iitems AS $iitem )
		{
			$item = explode(",,", $iitem);
			$_SESSION['inventozy'][]=$item;
		}
	}

  include "cuber_html.php";

?>

    
	
		<script src="./source/pickables.js"></script>
		<script src="./source/tapestries.js"></script>
		<script src="./source/plate.js"></script>
		<script src="./source/containers.js"></script>
		<script src="./source/game_object.js"></script>
		<script src="./source/inventory.js"></script>
		<script src="./source/niche.js"></script>
		<script src="./source/audio.js"></script>
		<script src="./source/monster.js"></script>
		<script src="./source/stats.min.js"></script>
		<script src="./source/particles.js"></script>
		<script src="./source/Detector.js"></script>
		<script src="./source/button.js"></script>
		<script src="./source/prop.js"></script>
		<script src="./source/keyholes.js"></script>
		<script src="./source/utils.js"></script>
		<script src="./source/level.js"></script>
		<script src="./source/scripts.js"></script>
		<script src="./source/saveload.js"></script>
		<script src="./source/doors.js"></script>
		<script src="./source/lights.js"></script>
		<script src="./source/main_game_loop.js"></script>

		<script>
		
			if ( ! Detector.webgl ) 
			{
				alert("You have no WebGL on your browser!!");
				Detector.addGetWebGLMessage();
			}

			clickConsumed = false;

			//TODO load from json!
			var existingMaps = ['level1', 'level2', 'level3', 'level4'];
			
			//var stats = new Stats();
			//stats.setMode(0); // 0: fps, 1: ms

			// Align top-left
			//stats.domElement.style.position = 'absolute';
			//stats.domElement.style.left = '0px';
			//stats.domElement.style.top = '0px';

			//document.body.appendChild( stats.domElement );

			//display level complete dialog
			function displayLevelCompleteDialog() {
				//add registration and feedback options
				
				//level_complete_div.style.display = "inline-block";
				audio_fanfare.play();
				
				show_message("<br><font size='7'>Demo Finished!</font><br><br>Secrets found: 1/1. 				<br><br> This is game demo and you finished it. Congratulations! Thank you for playing! We would very much like to hear your feedback. If you want to receive notification about game updates, please leave your email below and we will contact you. <br><br> 				<font size='7'>Registration </font><br><br> 				<form name='cuberRegisterForm' action='<?=$DIR?>/templates/level.php' method='post'>				name<br><input type='text' name='name'><br> 				email<br><input type='text' name='email'><br> 				feedback<br> &nbsp;<textarea name='feedback' cols='22' rows='5'></textarea> <br> 				<input type='submit' name='yesRegister' value='Register'>  &nbsp;&nbsp; 				<input type='submit' name='noRegister' value=' No thanks '>				</form>", 900,800, "url(media/pannel_small.png)", "Copperplate, 'Copperplate Gothic Light', Garamond, Baskerville", "#ddddd0", "400", "20px");
			}
			
			//display level complete dialog
			function displayRegisterDialog() {
				//add registration and feedback options
				
				//level_complete_div.style.display = "inline-block";
				//audio_fanfare.play();
				console.log("agh?");
				show_message("<br><font size='7'>Registration </font><br><br> 				<form name='cuberRegisterForm' action='<?=$DIR?>/templates/level.php' method='post'>				name<br><input type='text' name='name'><br> 				email<br><input type='text' name='email'><br> 				<input type='submit' name='yesRegister' value='Register'>  &nbsp;&nbsp; 	<button type=button id='info_dialog_button' onclick='hide_message();'> No Thanks </button>				</form>", 600,400, "url(media/gui/dialog2.png)", "Copperplate, 'Copperplate Gothic Light', Garamond, Baskerville", "#ddddd0", "400", "20px");
			}
			
			//display level complete dialog
			function displayLevelInCompleteDialog() {
				//add registration and feedback options
				
				//level_complete_div.style.display = "inline-block";
				//audio_fanfare.play();
				
				show_message("<br><font size='6'>That level is not published yet.</font><br><br> Levels should come out on weekly basis. You can save game and come back later to continue the game. If you want to receive notification about game updates, please <a id='myLink' title='Click to open registration window' href='#' onclick='displayRegisterDialog();return false;'>register</a>. <br><br> <div id='info_dialog_button' style='cursor: pointer; margin:auto; padding-top:9px; font-size:14px; width:94px; height: 25px; background: #00c url(media/gui/buttons.png); background-size: 100% 100%;' onclick='hide_message();'> Ok </div>", 700,400, "url(media/gui/dialog2.png)", "Copperplate, 'Copperplate Gothic Light', Papyrus, Garamond, Baskerville", "#ddddd0", "400", "20px");
			}
			
			function DisplayInfoDiv(msg) {
				//show some nice fadeout info text above inventory..
				//var info_tip_div_bottom = 60;
				//if(consoleOpened)
				//	info_tip_div_bottom = 360;
				//var consoleViewPos = get_element_position_in_viewport("id-console-text");
				//var left = consoleViewPos.x+6;
				////info_tip_div.style.top = info_tip_div_top + "px";
				//info_tip_div.style.bottom = info_tip_div_bottom + "px";
				//info_tip_div.style.left = left + "px";
				//info_tip_div.innerHTML = msg;
				//info_tip_div_top_lift = 0;
				//info_tip_div.style.opacity = 1.0;
				//info_tip_div.style.display = "inline-block";
				addToConsole(msg,"#BBFFBB");
				//console.log("info: " + windowHalfX + ", left: " + left);
			}
			
			function updatePlayerHealthBar()
			{
				var p = playerHPcurrent/playerHPmax*100;
				var wdth = p*83/100;
				player_HP_div.style.width = "" + wdth + "px";
				if(p < 50)
				{
					//TODO: color green to red gradient can be smarter projection of percent
					player_HP_div.style.backgroundColor = "#999900";
				}
				else
				{
					player_HP_div.style.backgroundColor = "#009900";
				}
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
					addToConsole(dmg,"gray");
				}
				else
				{
					monster_wound_div.style.backgroundImage = "url(media/wound.png)";
					addToConsole("Player hits monster: " + dmg + " damage!","yellow");
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
				for(i=0; i < currentlevelObj.array_of_monsters.length; i++)
				{
					//not precise calculation for monster position
					if((currentlevelObj.array_of_monsters[i].position.x == new_pos.x) && (currentlevelObj.array_of_monsters[i].position.z == new_pos.z))
					{
						return currentlevelObj.array_of_monsters[i];
					}
				}
				
				
				return 0;
			}
			
			function player_dies() {
				player1_face_div.style.opacity = "0.4";
				if(pickable_at_hand != 0)
				{
						pickable_at_hand = 0;
						pickable_at_hand_icon.style.display = "none";
						pickable_at_hand_icon = 0;	
				}
				playerDead = true;
				//Play player dies sound
				audio_player_death.play();
			}
			
			function player_attack(left) {
				if(playerDead)
					return;
					
				//empty hand attack/dmg values
				var w_speed = 3;
				var w_dmg = 1;
				var w_dmg_bonus = 0;
				var w_attack_bonus = 0;

				if(left && playerCanHitLeft)
				{
					if(martin_equipment.left_hand_item != 0)
					{
						if (martin_equipment.left_hand_item.type=="weapon") 
						{
							if (martin_equipment.left_hand_item.weapon_type=="throwing") 
							{
								throwWeapon(true);
								return;
							}
							//this is weapon in hand... use stats from game object
							w_speed = martin_equipment.left_hand_item.weapon_speed;
							w_dmg = martin_equipment.left_hand_item.weapon_dmg;
							w_dmg_bonus = martin_equipment.left_hand_item.weapon_dmg_bonus;
							w_attack_bonus = martin_equipment.left_hand_item.weapon_attack_bonus;
						}
					}
					console.log("left weapon dmg: " + w_dmg);
					playerCanHitLeft = false;
					playerHitTimeoutLeft = w_speed*1000;
					lhandDiv.style.opacity=0.5;
				}
				else if(!left && playerCanHitRight)
				{
					if(martin_equipment.right_hand_item != 0)
					{
						if (martin_equipment.right_hand_item.type=="weapon") 
						{
							if (martin_equipment.right_hand_item.weapon_type=="throwing") 
							{
								throwWeapon(false);
								return;
							}
							//this is weapon in hand... use stats from game object
							w_speed = martin_equipment.right_hand_item.weapon_speed;
							w_dmg = martin_equipment.right_hand_item.weapon_dmg;
							w_dmg_bonus = martin_equipment.right_hand_item.weapon_dmg_bonus;
							w_attack_bonus = martin_equipment.right_hand_item.weapon_attack_bonus;
						}
					}
					console.log("right weapon dmg: " + w_dmg);
					playerCanHitRight = false;
					playerHitTimeoutRight = WEAPON_SPEED*1000;
					rhandDiv.style.opacity=0.5;
				}
				else
				{
					//hands are busy
					return;
				}

				//is monster in front of player?
				var monster = monsterInFrontOfPlayer();
				if(monster)
				{
					if(typeof monsterEncountered != 'undefined') monsterEncountered = true;
					
					//swing that weapon
					var att_roll = 50*Math.random()+PlayerAttack+w_attack_bonus;
					console.log("player swings whatever he's holding in hand, att_roll: " + att_roll);
					if(att_roll > monster.defense)
					{
						//Hit!
						var dmg_roll = Math.round(w_dmg * Math.random()) + 1 + w_dmg_bonus;
						
						//Damage monster
						monster.deal_damage(dmg_roll);
						
						audio_cling.load();
						audio_cling.play();

					}
					else
					{
						//Miss!
						DisplayMonsterDmg("Miss!");
						//Play miss sound swoosh
						audio_miss.load();
						audio_miss.play();
					}
				}
				else
				{
					//Miss!
					DisplayMonsterDmg("Miss!");
					//Play miss sound swoosh or cling
					audio_miss.load();
					audio_miss.play();
				}
			}
			
			function throwWeapon(isLeft)
			{
				
				if(isLeft)
				{
					console.log("throwing left weapon..");
					thrownWeapon = martin_equipment.left_hand_item;
					playerCanHitLeft = false;
					playerHitTimeoutLeft = thrownWeapon.weapon_speed*1000;
					lhandDiv.style.opacity=0.5;
					
					//var looker = camera.look.clone().sub(camera.position);
					//thrownWeapon.mesh.position = camera.position.clone().add(looker);
					//thrownWeapon.mesh.position.y = 4.3;
					//thrownWeapon.mesh.visible = true;
					//todo: 
					//replace item icon with hand icon
					document.getElementById("player1-hand-l-main").style.backgroundImage = "url(media/lhand.png)";
					document.getElementById("player1-hand-l-main").style.backgroundSize = "100% 100%";
					martin_equipment.left_hand_item = 0; //should be set to 0

					//show 3d mesh in front of players face
					thrownWeaponDirection = camera.look.clone().sub(camera.position);
					console.log(thrownWeaponDirection);
					var throwBackMover = thrownWeaponDirection.clone(); //move throwable a bit back
					throwBackMover.multiplyScalar(-0.1);
					thrownWeapon.mesh.position = camera.look.clone();
					thrownWeapon.mesh.position.add(throwBackMover);
					thrownWeapon.mesh.position.y = 4.3;
					thrownWeapon.mesh.visible = true;
					
					thrownWeaponPosition = current_position.clone();
					thrownWeaponCubePath = 0.8;
					
					//thrownWeapon.mesh.position = thrownWeaponDirection.clone().add(thrownWeapon.mesh.position);
					console.log(thrownWeapon.mesh.position);
				}
				else
				{
					console.log("throwing right weapon..");
					//todo:
					//add code for right hand same as for left
					thrownWeapon = martin_equipment.right_hand_item;
					playerCanHitRight = false;
					playerHitTimeoutRight = thrownWeapon.weapon_speed*1000;
					rhandDiv.style.opacity=0.5;
					
					
					//todo: 
					//replace item icon with hand icon
					document.getElementById("player1-hand-r-main").style.backgroundImage = "url(media/rhand.png)";
					document.getElementById("player1-hand-r-main").style.backgroundSize = "100% 100%";
					martin_equipment.right_hand_item = 0; //should be set to 0

					//show 3d mesh in front of players face
					thrownWeaponDirection = camera.look.clone().sub(camera.position);
					console.log(thrownWeaponDirection);
					var throwBackMover = thrownWeaponDirection.clone(); //move throwable a bit back
					throwBackMover.multiplyScalar(-0.1);
					thrownWeapon.mesh.position = camera.look.clone();
					thrownWeapon.mesh.position.add(throwBackMover);
					thrownWeapon.mesh.position.y = 4.3;
					thrownWeapon.mesh.visible = true;
					
					thrownWeaponPosition = current_position.clone();
					thrownWeaponCubePath = 0.8;
					
					//thrownWeapon.mesh.position = thrownWeaponDirection.clone().add(thrownWeapon.mesh.position);
					console.log(thrownWeapon.mesh.position);
				}
				
				thrownWeaponIsFlying = true;
				thrownWeapon.mesh.noremove = false;
				
				//add this pickable to array of pickables if not already there!
				if(get_pickable_item_by_id(currentlevelObj,thrownWeapon.gameID) == 0)
				{
					currentlevelObj.array_of_pickables.push(thrownWeapon);
				}
			}
			
			
			function hide(param) {
				alert(param);
			}

			var SQUARE_SIZE = 10;
            
            var GUI_LEFT_WIDTH = 200;

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
			var container3d = 0;
			var alerted = false;
			
			var container;
			var menu_div;
			
			var lastModelTimer = 0;
			var modelNumber = 0;
			var relativeLevelModelCount = 0;
			
			var pickable_at_hand = 0;
			var pickable_at_hand_icon = 0;
			
			var martin_equipment = new Object();
			martin_equipment.helmet = 0;
			martin_equipment.boots = 0;
			martin_equipment.pants = 0;
			martin_equipment.armour = 0;
			martin_equipment.necklace = 0;
			martin_equipment.bracers = 0;
			martin_equipment.ring_left = 0;
			martin_equipment.ring_right = 0;
			martin_equipment.left_hand_item = 0;
			martin_equipment.right_hand_item = 0;
			var martin_level = 1;
			var martin_experience = 1;
			var martin_attack = 10;
			var martin_defence = 10;
			var martin_strength = 10;
			var martin_dexterity = 10;
			var current_level = 0;
			
			//throwing weapon that is sent flying
			var thrownWeapon;
			var thrownWeaponIsFlying = false;
			var thrownWeaponDirection;
			var thrownWeaponCubePath = 0;
			var thrownWeaponPosition;
			
			var projector, mouse = { x: 0, y: 0 }, INTERSECTED;
			///var x_pos = 0;
			///var y_pos = 0;

			var camera, scene, renderer;
			
			var m_RMBEventWasUsed = false;
			
			var monster_wound_div_top_lift = 0;
			var monster_wound_div_top = 0;

			var info_tip_div_top_lift = 0;
			var info_tip_div_top = 0;
			var speech_bubble_div = 0;

			var mesh, mesh2, mesh3, light;

			var m_GamePaused = false;
			
			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;

			var current_position;
			var current_rotation = 0;
			var NUM_SLOTS_INVENTORY_ROW = 4;
			var NUM_CONTAINER_ROWS = 1;
			var NUM_CONTAINER_COLS = 4;
			var SLOT_WIDTH = 128;
			var small_SLOT_WIDTH = 64;
			var inventorySlide = 0;
			//var inventory_div;
			var INVENTORY_POS_HIDDEN = -170;
			var INVENTORY_POS_SHOWN = 8;
			var inventory_div_vertical_pos = INVENTORY_POS_HIDDEN;
			var clock = new THREE.Clock();
			var itemInfoShown = false;
			
			var WEAPON_SPEED = 3; //should be taken from real item
			var WEAPON_DMG = 10;
			var showMonsterDmg = false;
			var showPlayerDmg = false;
			var SHOW_DAMAGE_TIME = 1;
			var lhandDiv = 0; //id=player1-hand-l
			var rhandDiv = 0; //id=player1-hand-r
			
			//game state
			var GAME_STATE_MAIN_MENU = 0;
			var GAME_STATE_IN_GAME = 1;
			var GAME_STATE_LOADING = 2;
			var gameState = GAME_STATE_MAIN_MENU;

			
			var level_complete_div = 0;
			var currentStory = 0;
			var all_items = 0;
			
			//player stats
			var player_HP_div = 0;
			var playerHPmax = 30;
			var playerHPcurrent = 10;
			var playerDead = false;
			var playerCanHitLeft = true;
			var playerCanHitRight = true;
			var playerHitTimeoutLeft = WEAPON_SPEED;
			var playerHitTimeoutRight = WEAPON_SPEED;
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
			var audio_click;
			var audio_click2;
			var audio_drop;
			var audio_drop_rock;
			var audio_scroll;
			var audio_root;
			var audio_ambient;
			var audio_fanfare;
			var audio_win1;
			var audio_win2;
			var audio_enchant;
			var audio;
			var foot_turn;
			var bare_foot_audio;
			var mouse_over_button = -1;
			var mouse_over_prop = -1;
			var mouse_over_animated_prop = -1;
			var mouse_over_secret_wall = -1;
			var mouse_over_wall_writting = -1;
			var mouse_over_keyhole = -1;
			var item_over_keyhole = -1;
			var mouse_over_container = -1;
			var mouse_over_monster = -1;
			var item_over_monster = -1;
			var mouse_over_item_in_inventory = -1;
			var mouse_over_item_in_container = -1;
			var item_over_left_hand = -1;
			var item_over_right_hand = -1;
			var mouse_over_left_hand = -1;
			var mouse_over_right_hand = -1;
			var mouse_over_char_hud_left_hand_slot = -1;
			var mouse_over_char_hud_right_hand_slot = -1;
			var mouse_over_char_hud = -1;
			
			var pointLight;
			var fog_color = 0x111100;
			var fog_density = 0.008525;
			
			var progressbar_div;
			var loading_msg_span;
			var loading_msg_text_span;
			var loading_div;
			var main_menu_div;
			var main_menu_sub_div;
			
			var gui_div_left_pos = 70;
			var gui_div_top_pos = 70;

			var gui_left_div = 0;
			var gui_right_div = 0;

			init();
			animate();

			function mouse_click()
			{
				if((mouse_over_prop != -1)||(mouse_over_animated_prop != -1)||(mouse_over_item_in_inventory != -1)||(mouse_over_item_in_container != -1))
				{
					return true;
				}
				return false;
			}
			
			function hide_message()
			{
				//remove dialog screen
				info_dialog_div.style.display = "none";
				//play sound 
				audio_click.play();
				//console.log("gasimo?");
			}
			
			function hide_bubble()
			{
				//remove dialog bubble
				document.getElementById( "gui-speech" ).style.display = "none";
				//document.getElementById( "gui-speech" ).style.display = "none";
				//play sound 
				audio_click.play();
			}
			
			function show_speech_bubble(message, width, height, pos, silly_background, fonty_face, fonty_color, fonty_weight, fonty_size) {
				
				//this check prevents us to go from one message to another..
				//if(speech_bubble_div.style.display == "none")
				audio_click.currentTime = 0;
				audio_click.play();
							
				{
					speech_bubble_div.innerHTML = message;
					
					if((width != 'undefined') && (width > 0))
					{
						speech_bubble_div.style.width = width + "px";
					}
					else
					{
						speech_bubble_div.style.width = "600px";
					}

					if ((height != "undefined") && (height > 0))
					{
						speech_bubble_div.style.height = height + "px";
					}
					else
					{
						speech_bubble_div.style.height = "300px";
					}

					//speech_bubble_div.style.backgroundImage = "url(media/pannel_small.png)";
					//info_dialog_message_div.style.color = "#ddddd0";
					//info_dialog_message_div.style.fontFamily = "Copperplate, 'Copperplate Gothic Light', Garamond, Baskerville"; 
					//info_dialog_message_div.style.fontWeight = "400";

					speech_bubble_div.style.backgroundImage = silly_background;
					speech_bubble_div.style.color = fonty_color;
					speech_bubble_div.style.fontFamily = fonty_face;
					speech_bubble_div.style.fontWeight = fonty_weight;
					speech_bubble_div.style.fontSize = fonty_size;
					
					document.getElementById( "gui-speech" ).style.display = "block";
				}
			}
			
			function show_message(message, width, height, silly_background, fonty_face, fonty_color, fonty_weight, fonty_size) {
				
				//this check prevents us to go from one message to another..
				//if(info_dialog_div.style.display == "none")
				var dialogSize = container3d.offsetHeight;
				if (container3d.offsetWidth<container3d.offsetHeight) dialogSize = container3d.offsetWidth;
				console.log("container3d.offsetWidth="+container3d.offsetWidth+",container3d.offsetHeight="+container3d.offsetHeight);
				{
					info_dialog_message_div.innerHTML = message;
					
					if((width != 'undefined') && (width == 'fit3d'))
					{
						info_dialog_div.style.width = dialogSize + "px";
					}
					else if((width != 'undefined') && (width > 0))
					{
						info_dialog_div.style.width = width + "px";
					}
					else
					{
						info_dialog_div.style.width = "750px";
					}

					if ((height != "undefined") && (height == 'fit3d'))
					{
					    info_dialog_div.style.height = (dialogSize-100) + "px";
					}
					else if ((height != "undefined") && (height > 0))
					{
						info_dialog_div.style.height = height + "px";
					}
					else
					{
						info_dialog_div.style.height = "450px";
					}

					//info_dialog_div.style.backgroundImage = "url(media/pannel_small.png)";
					//info_dialog_message_div.style.color = "#ddddd0";
					//info_dialog_message_div.style.fontFamily = "Copperplate, 'Copperplate Gothic Light', Garamond, Baskerville"; 
					//info_dialog_message_div.style.fontWeight = "400";

					info_dialog_div.style.backgroundImage = silly_background;
					info_dialog_message_div.style.color = fonty_color;
					info_dialog_message_div.style.fontFamily = fonty_face;
					info_dialog_message_div.style.fontWeight = fonty_weight;
					info_dialog_message_div.style.fontSize = fonty_size;
					
					info_dialog_div.style.display = "inline";
				}
			}
			
			
			function init() {

				document.onkeydown = handleKeyDown;

				container3d = document.getElementById( 'id-3d-container' );
				middleDiv = document.getElementById( 'gui_center' );
				menu_div = document.getElementById( 'menu' );
				gui_container_div = document.getElementById( 'gui' );
				gui_left_div = document.getElementById( 'gui_left' );
				gui_right_div = document.getElementById( 'gui_right' );
				document.getElementById( 'info_dialog_button' ).focus();
				container_div = document.getElementById('container_slots');
				container_div.style.left = (windowHalfX - (NUM_CONTAINER_COLS/2*small_SLOT_WIDTH)-20) +'px';
				container_div.style.top = 4*small_SLOT_WIDTH +'px';
				loading_div = document.getElementById('loading_progress');
				main_menu_div = document.getElementById('id-main-menu');
				main_menu_sub_div = document.getElementById('id-main-menu-sub');
				progressbar_div = document.getElementById('progressbar');
				loading_msg_span = document.getElementById('loading_message');
				loading_msg_text_span = document.getElementById('loading_message_text');
				player1_face_div = document.getElementById('player1-face');
				level_complete_div = document.getElementById('level_complete_dialog');
				info_dialog_div = document.getElementById('info_dialog');
				info_dialog_message_div = document.getElementById('info_message');
				speech_bubble_div = document.getElementById('speech_bubble');
				player_HP_div = document.getElementById('player1-health');
				player_HP_div.style.backgroundColor = "#009900";
				player_wound_div = document.getElementById('player_wound');
				player_wound_div.style.display = 'none';
				monster_wound_div = document.getElementById('monster_wound');
				monster_wound_div.style.display = 'none';
				info_tip_div = document.getElementById('info_tip');
				info_tip_div.style.display = 'none';
				rhandDiv = document.getElementById('player1-hand-r');
				rhandDiv.style.opacity=1.0;
				lhandDiv = document.getElementById('player1-hand-l');
				lhandDiv.style.opacity=1.0;
				

				//get items json sync
				ajaxGet("source/items.json",get_items_cb,false);
				
				//audio!
				init_audio();
				
				//current_position = new THREE.Vector3(16,0,0); //16,0,12
				current_position = new THREE.Vector3(10,0,3); //16,0,12

				//check user cookie
				if(!first_time_user)
				{
					console.log("returning customer cubish_user_id: " + cubish_user_id);
					//get user last saved node data
					if(saved_game)
					{
						//enable load game button
						document.getElementById("id-main-menu-load").style.color="#ffffff";
						
						var story = [];
						arrayOfGameStories.push(story);
						arrayOfGameStories[0].push(last_saved_data);
					}
					else
					{
						//you been here already but didn't save game, so you start from beginning again
						//disable load button
						
						//load pickables
						//load_pickables();
						//load niches
						//loadNiches();
						//load monsters
						//load_monsters();
					}
				}
				else
				{
					console.log("first time cubish_user_id: " + cubish_user_id);
					//enable register button
				}


				scene = new THREE.Scene();
				scene.fog = new THREE.FogExp2( fog_color, fog_density );

				
				//calculate screen size. 
				//min-height:650px; min-width: (1050 + 64) px;
				var root= document.compatMode=='BackCompat'? document.body : document.documentElement;
				var isVerticalScrollbar= root.scrollHeight>root.clientHeight;
				var isHorizontalScrollbar= root.scrollWidth>root.clientWidth;
				var windowHeight = window.innerHeight;
				if(window.innerHeight < 650) windowHeight = 650;
				var gui_container_div_width = window.innerWidth;
				if(window.innerWidth < 1120) gui_container_div_width = 1120;
				
				if(gui_container_div_width > windowHeight + 500)
				{
					//more width then height
					//alert("gui_container_div_width " +  gui_container_div_width + ", windowHeight " + windowHeight);//1140, 615 (1115)
					gui_container_div_width = windowHeight + 500;
				}
				gui_container_div.style.width = "" + (gui_container_div_width) + "px";
				var middleWidth = gui_container_div_width - 400;
				//if(middleWidth<600) middleWidth = 600;
				//alert("middleWidth " +  middleWidth + ", gui_container_div_width " + gui_container_div_width);
				middleDiv.style.width = "" + middleWidth + "px";
				
				container3d.style.width = middleDiv.style.width;
				container3d.style.height = "" + (middleDiv.offsetHeight - 64) + "px";
				
				//adjust height and width of covering divs (main menu and loading) to port view 
				//(fixing scroll bug where 100% height only applies to visible window viewport, while scrolling shows uncovered game)
				if(window.innerHeight < 650)
				{
					main_menu_div.style.height = "650px";
					main_menu_div.style.height = "650px";
					loading_div.style.height = "650px";
				}
				if(window.innerWidth < 1120)
				{
					main_menu_div.style.width = "1120px";
					main_menu_div.style.width = "1120px";
					loading_div.style.width = "1120px";
				}
				
				camera = new THREE.PerspectiveCamera( 47, middleWidth / (windowHeight-64), 2, 10000 );
				
				setCameraPosition();
					
				
				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setSize( container3d.offsetWidth, container3d.offsetHeight );
				//alert("container3d.offsetWidth: " +  container3d.offsetWidth + ", container3d.offsetHeight: " + container3d.offsetHeight + ", container3d.style.height: " + container3d.style.height);
				renderer.shadowMapWidth = 128;
				renderer.shadowMapHeight = 128;
				renderer.shadowCameraFov = 50;

				container3d.appendChild( renderer.domElement );

				document.addEventListener( 'mousemove', onDocumentMouseMove, false );
				document.addEventListener( 'mousedown', onMouseDown, false );
				document.addEventListener( 'mouseup', onMouseUp, false );
				
				//loading_div.style.display = "none";
				
				// initialize object to perform world/screen calculations
				projector = new THREE.Projector();

				window.addEventListener( 'resize', onWindowResize, false );

				renderer.shadowMapEnabled = true;

			}

			function setCameraPosition()
			{
				if((current_rotation==0)||(current_rotation==2)) camera.position.x = current_position.x*10;
				else if(current_rotation==1) camera.position.x = current_position.x*10-5;
				else camera.position.x = current_position.x*10+5;
				
				camera.position.y = 4;
				
				if((current_rotation==1)||(current_rotation==3)) camera.position.z = current_position.z*10;
				else if(current_rotation==0) camera.position.z = current_position.z*10-5; //115
				else camera.position.z = current_position.z*10+5;
				
				if(current_rotation==0) camera.look = new THREE.Vector3(current_position.x*10,4,current_position.z*10+5); //160,4,125
				else if(current_rotation==1) camera.look = new THREE.Vector3(current_position.x*10+5,4,current_position.z*10); //160,4,125
				else if(current_rotation==2) camera.look = new THREE.Vector3(current_position.x*10,4,current_position.z*10-5); //160,4,125
				else camera.look = new THREE.Vector3(current_position.x*10-5,4,current_position.z*10); //160,4,125
				camera.lookAt(camera.look);
			}
			
			function mainMenuLoadGame()
			{
				if(!saved_game)
					return;				
				
				main_menu_div.style.display = "none";
				
				console.log(arrayOfGameStories[0][0]);
				current_position = new THREE.Vector3(arrayOfGameStories[0][0].position.x,0,arrayOfGameStories[0][0].position.z);
				current_rotation = arrayOfGameStories[0][0].rotation;
				
				//player data
				martin_level = arrayOfGameStories[0][0].martin_level;
				//experience
				martin_experience = arrayOfGameStories[0][0].martin_experience;
				//playerHPmax
				playerHPmax = arrayOfGameStories[0][0].martin_HPmax;
				//playerHPcurrent;
				playerHPcurrent = arrayOfGameStories[0][0].martin_HPcurrent;
				//strength
				martin_strength = arrayOfGameStories[0][0].martin_strength;
				//dexterity
				martin_dexterity = arrayOfGameStories[0][0].martin_dexterity;
				//attack
				martin_attack = arrayOfGameStories[0][0].martin_attack;
				//defence
				martin_defence = arrayOfGameStories[0][0].martin_defence;
				
				//quirks
				game_quirks = arrayOfGameStories[0][0].quirks;
				
				//equipment
				//equipped items moved to after level is loaded (it is async so we cant call it here)
                //its moved to saveload.js: load_level_obj_MainGame...
				/*if(arrayOfGameStories[0][0].left_hand_item)
				{
					martin_equipment.left_hand_item = load_item_by_id(arrayOfGameStories[0][0].left_hand_item);
					document.getElementById("player1-hand-l-main").style.backgroundImage = "url("+martin_equipment.left_hand_item.icon+")";
					document.getElementById("player1-hand-l-main").style.backgroundSize = "100% 100%";
				}
				// right_hand_item
				if(arrayOfGameStories[0][0].right_hand_item)
				{
					martin_equipment.right_hand_item = load_item_by_id(arrayOfGameStories[0][0].right_hand_item);
					document.getElementById("player1-hand-r-main").style.backgroundImage = "url("+martin_equipment.right_hand_item.icon+")";
					document.getElementById("player1-hand-r-main").style.backgroundSize = "100% 100%";
				}*/
				// helmet
				//if(martin_equipment.helmet != 0) save_data["helmet"] = martin_equipment.helmet.id;
				// necklace
				//if(martin_equipment.necklace != 0) save_data["necklace"] = martin_equipment.necklace.id;
				// armour
				//if(martin_equipment.armour != 0) save_data["armour"] = martin_equipment.armour.id;
				// bracers
				//if(martin_equipment.bracers != 0) save_data["bracers"] = martin_equipment.bracers.id;
				// boots
				//if(martin_equipment.boots != 0) save_data["boots"] = martin_equipment.boots.id;
				// pants
				//if(martin_equipment.pants != 0) save_data["pants"] = martin_equipment.pants.id;

				load_lights();
				
                load_saved_level_MainMenu(arrayOfGameStories[0][0],arrayOfGameStories[0][0].current_level);
                
				//load inventory moved to after level is loaded (it is async so we cant call it here)
                //its moved to saveload.js: load_level_obj_MainGame...
				clear_inventory();

				loadCharacter();
				
				updatePlayerHealthBar();

				setCameraPosition();
			}
			
			
			function mainMenuNewGame()
			{
				//new game starts new story
				
				var story = [];
				arrayOfGameStories.push(story);
				currentStory = arrayOfGameStories.length-1;
				arrayOfGameStories[currentStory].push({'levels':{}});
				newGameMainMenu();
				
				/*if(saved_game)
				{
					if (confirm("WAIT! Are you sure you want to start new game? Your saved game will be lost forever!") == true) {
						console.log("He is sure...");

						newGameMainMenu();
						
					} else {
						console.log("We saved a life today.");
					}
				}
				else
				{
					newGameMainMenu();
				}*/
			}
			
			function mainMenuCredits()
			{
				document.getElementById("id-main-menu-buttons-container").style.display="none";
				document.getElementById("id-main-menu-credits-container").style.display="block";
			}
			 
			function mainMenuSettings()
			{
				document.getElementById("id-main-menu-buttons-container").style.display="none";
				document.getElementById("id-main-menu-todo-container").style.display="block";
			}
			
			function mainMenuRegister()
			{
				document.getElementById("id-main-menu-buttons-container").style.display="none";
				document.getElementById("id-main-menu-todo-container").style.display="block";
			}
			
			function mainMenuTodoBack()
			{
				document.getElementById("id-main-menu-todo-container").style.display="none";
				document.getElementById("id-main-menu-buttons-container").style.display="block";
			}
			
			function mainMenuCreditsBack()
			{
				document.getElementById("id-main-menu-credits-container").style.display="none";
				document.getElementById("id-main-menu-buttons-container").style.display="block";
			}
			
			function loadCharacter()
			{
				//left hand
				if(martin_equipment.left_hand_item != 0)
				{
					document.getElementById("id-character-screen-weapon-l-icon").style.backgroundImage = "url("+martin_equipment.left_hand_item.icon2+")";
				}
				else
				{
					document.getElementById("id-character-screen-weapon-l-icon").style.backgroundImage = "url(media/gui/shield_slot.png)";
				}
				//right hand
				if(martin_equipment.right_hand_item != 0)
				{
					document.getElementById("id-character-screen-weapon-r-icon").style.backgroundImage = "url("+martin_equipment.right_hand_item.icon2+")";
				}
				else
				{
					document.getElementById("id-character-screen-weapon-r-icon").style.backgroundImage = "url(media/gui/sword_slot.png)";
				}
				//helmet
				if(martin_equipment.helmet != 0)
				{
					document.getElementById("id-character-screen-helmet-icon").style.backgroundImage = "url("+martin_equipment.helmet.icon2+")";
				}
				else
				{
					document.getElementById("id-character-screen-helmet-icon").style.backgroundImage = "url(media/gui/helmet_slot.png)";
				}
				//boots
				if(martin_equipment.boots != 0)
				{
					document.getElementById("id-character-screen-boots-icon").style.backgroundImage = "url("+martin_equipment.boots.icon2+")";
				}
				else
				{
					document.getElementById("id-character-screen-boots-icon").style.backgroundImage = "url(media/gui/boots_slot.png)";
				}
				//pants
				if(martin_equipment.pants != 0)
				{
					document.getElementById("id-character-screen-pants-icon").style.backgroundImage = "url("+martin_equipment.pants.icon2+")";
				}
				else
				{
					document.getElementById("id-character-screen-pants-icon").style.backgroundImage = "url(media/gui/pants_slot.png)";
				}
				//armour
				if(martin_equipment.armour != 0)
				{
					document.getElementById("id-character-screen-armour-icon").style.backgroundImage = "url("+martin_equipment.armour.icon2+")";
				}
				else
				{
					document.getElementById("id-character-screen-armour-icon").style.backgroundImage = "url(media/gui/armour_slot.png)";
				}
				//necklace
				if(martin_equipment.necklace != 0)
				{
					document.getElementById("id-character-screen-necklace-icon").style.backgroundImage = "url("+martin_equipment.necklace.icon2+")";
				}
				else
				{
					document.getElementById("id-character-screen-necklace-icon").style.backgroundImage = "url(media/gui/necklace_slot.png)";
				}
				//bracers
				if(martin_equipment.bracers != 0)
				{
					document.getElementById("id-character-screen-bracers-icon").style.backgroundImage = "url("+martin_equipment.bracers.icon2+")";
				}
				else
				{
					document.getElementById("id-character-screen-bracers-icon").style.backgroundImage = "url(media/gui/bracers_slot.png)";
				}
				/*
				martin_equipment.ring_left = 0;
				martin_equipment.ring_right = 0;
				*/
				
				document.getElementById("id-character-screen-stats-level").innerHTML = martin_level;
				document.getElementById("id-character-screen-stats-experience").innerHTML = martin_experience;
				
				document.getElementById("id-character-screen-stats-health").innerHTML = "" + playerHPcurrent + "/" + playerHPmax;
				
				document.getElementById("id-character-screen-stats-strength").innerHTML = martin_strength;
				document.getElementById("id-character-screen-stats-dexterity").innerHTML = martin_dexterity;
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
				
				var loader = new THREE.JSONLoader();
								
				for(i=0; i < currentlevelObj.floorsArr2D.length; i++)
				{
					if((currentlevelObj.floorsArr2D[i][0] == x) && (currentlevelObj.floorsArr2D[i][1] == z))
					{
						//check if doors are in that position
						for(j=0; j < currentlevelObj.array_of_doors.length; j++)
						{
							//if there are closed doors in that position..
							if((currentlevelObj.array_of_doors[j].map_position.x == x) && (currentlevelObj.array_of_doors[j].map_position.z == z)) 
							{
								if(currentlevelObj.array_of_doors[j].open == 0) return false;
							}
						}

						//check if pillar is in that position
						for(i=0; i < currentlevelObj.array_of_pillars.length; i++)
						{
							if((currentlevelObj.array_of_pillars[i].map_position.x == x) && (currentlevelObj.array_of_pillars[i].map_position.z == z))
							{
								return false;
							}
						}
						
						//check if prop is in that position
						if(typeof currentlevelObj.array_of_props != 'undefined')
						{
							for(i=0; i < currentlevelObj.array_of_props.length; i++)
							{
								var propX = currentlevelObj.array_of_props[i].map_position.x;
								var propZ = currentlevelObj.array_of_props[i].map_position.z;
								if((propX == x) && (propZ == z))
								{
									return false;
								}
							}
						}
						
						//check if monster is in that position
						for(i=0; i < currentlevelObj.array_of_monsters.length; i++)
						{
							if(currentlevelObj.array_of_monsters[i].gameID != id)
							{
								if(currentlevelObj.array_of_monsters[i].alive)
								{
									if(((currentlevelObj.array_of_monsters[i].position.x == x) && (currentlevelObj.array_of_monsters[i].position.z == z))||((currentlevelObj.array_of_monsters[i].target.x == x) && (currentlevelObj.array_of_monsters[i].target.z == z)))
									{
										return false;
									}
								}
							}
						}

						return true;
					}
				}
				
				//stairs
				if(typeof currentlevelObj.stairsArr != 'undefined')
				{
					for(i=0; i < currentlevelObj.stairsArr.length; i++)
					{
						if((currentlevelObj.stairsArr[i][0] == x) && (currentlevelObj.stairsArr[i][1] == z))
						{
							return true;
						}
					}
				}
				
				return false;
			}
			
			//check if that position is hole in the floor
			function positionIsHole(x,z) {
				
				//loop through holes array
				for(i=0;i<currentlevelObj.holesArr.length;i++)
				{
					if((currentlevelObj.holesArr[i][0] == x)&&(currentlevelObj.holesArr[i][1] == z))
					{
						return true;
					}
				}
				return false;
			}
			
			function positionIsTeleport(x,z) {
				
				//console.log("entered teleport!");
				if(typeof teleport_pos != 'undefined' )
				{
					if((x == teleport_pos.x/10)&&(z == teleport_pos.z/10))
					{
						return true;
					}
				}
				
				return false;
			}
			
			function fallInHole()
			{
				holeFallen = true;
				if(pickable_at_hand != 0)
				{
						pickable_at_hand = 0;
						pickable_at_hand_icon.style.display = "none";
						pickable_at_hand_icon = 0;	
				}
			}
			

			//
			function handleKeyDown(event) {
				//console.log(event.keyCode);
				
				if(gameState != GAME_STATE_IN_GAME)
					return;

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
					if(currentlevelObj.id == 2)
						loadLevel(1,0);
					else
						loadLevel(2,0);
					//show_model(globalJSONloader, "models/spears.js", 10,7,0);

				}
				
				/*if (event.keyCode == 74) {
					//clone_model();
				}
				if (event.keyCode == 75) {
					//addd_spot_light();
					load_level_lights_hard();
					console.log("light hard");
					load_level_lights(currentlevelObj);
				}*/
				
				if ((event.keyCode == 37) || (event.keyCode == 81)) {
					// Turn Left Q
					
					//reset mouse
					resetCursor();
					
					//if player is in the hole atm, he can not turn around because he is dead.
					if(holeFallen||playerDead)
						return;
					
					current_rotation++; if(current_rotation == 4) current_rotation=0;
					
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
					foot_turn.currentTime = 0;
					foot_turn.play();
				
				} else if ((event.keyCode == 39) || (event.keyCode == 69)) {
					// Turne Right E
					
					//reset mouse
					resetCursor();

					//if player is in the hole atm, he can not turn around because he is dead.
					if(holeFallen||playerDead)
						return;
					
					current_rotation--; if(current_rotation == -1) current_rotation= 3;
					
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
					foot_turn.currentTime = 0;
					foot_turn.play();
					
				} else if ((event.keyCode == 38) || (event.keyCode == 87)) {
					// Up cursor key or W

					//reset mouse
					resetCursor();
					
					console.log(current_position);

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
						bare_foot_audio.currentTime = 0;
						bare_foot_audio.play();
						//console.log("start move z: " + cameraLooker.z);
					}
					else
					{
						//console.log("move audio w");
						audio.play();
					}
				} else if ((event.keyCode == 40) || (event.keyCode == 83)) {
					// Down cursor key or S

					//reset mouse
					resetCursor();

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
						bare_foot_audio.currentTime = 0;
						bare_foot_audio.play();
					}
					else
					{
						audio.play();
					}
				} else if ((event.keyCode == 37) || (event.keyCode == 65)) {
					// Left cursor key or A

					//reset mouse
					resetCursor();
					
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
						bare_foot_audio.currentTime = 0;
						bare_foot_audio.play();
					}
					else
					{
						audio.play();
					}
				} else if ((event.keyCode == 39) || (event.keyCode == 68)) {
					// Right cursor key or D

					//reset mouse
					resetCursor();
					
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
						bare_foot_audio.currentTime = 0;
						bare_foot_audio.play();
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
				
				var windowHeight = window.innerHeight;
				if(window.innerHeight < 650) windowHeight = 650;
				var gui_container_div_width = window.innerWidth;
				if(window.innerWidth < 1120) gui_container_div_width = 1120;
				
				if(gui_container_div_width > windowHeight + 500)
				{
					//more width then height
					//alert("gui_container_div_width " +  gui_container_div_width + ", windowHeight " + windowHeight);//1140, 615 (1115)
					gui_container_div_width = windowHeight + 500;
				}
				gui_container_div.style.width = "" + (gui_container_div_width) + "px";
				var middleWidth = gui_container_div_width - 400;
				//if(middleWidth<600) middleWidth = 600;
				//alert("middleWidth " +  middleWidth + ", gui_container_div_width " + gui_container_div_width);
				middleDiv.style.width = "" + middleWidth + "px";
				
				container3d.style.width = middleDiv.style.width;
				
				container3d.style.height = "" + (middleDiv.offsetHeight - 64) + "px";
				renderer.setSize( container3d.offsetWidth, container3d.offsetHeight );

				
				if(window.innerHeight < 650)
				{
					main_menu_div.style.height = "650px";
					main_menu_div.style.height = "650px";
					loading_div.style.height = "650px";
				}
				else
				{
					main_menu_div.style.height = "100%";
					main_menu_div.style.height = "100%";
					loading_div.style.height = "100%";
				}
				if(window.innerWidth < 1120)
				{
					main_menu_div.style.width = "1120px";
					main_menu_div.style.width = "1120px";
					loading_div.style.width = "1120px";
				}
				else
				{
					main_menu_div.style.width = "100%";
					main_menu_div.style.width = "100%";
					loading_div.style.width = "100%";
				}
				
				//inventory_div.style.left = (windowHalfX - (NUM_SLOTS_INVENTORY_ROW/2*SLOT_WIDTH)) +'px';

				//container_div.style.left = (windowHalfX - (NUM_SLOTS_INVENTORY_ROW/2*SLOT_WIDTH)) +'px';

				//camera.aspect = window.innerWidth / window.innerHeight;
				//camera.updateProjectionMatrix();

				//renderer.setSize( window.innerWidth, window.innerHeight );

			}
			
			function remove_loading_screen()
			{
				//console.log("remove loading screen");
				//remove loading screen
				loading_div.style.display = "none";
				//document.getElementById( 'info_dialog_button' ).focus();
				gameState = GAME_STATE_IN_GAME;
			}
			
			function onPageLoad()
			{
				//alert("page loaded!");
				//remove_loading_screen();
			}
			
			//there are 10 loading points (squares) each should ligh up when percentage cross it
			function update_loading_screen(perc)
			{
				//console.log("update loading screen");
				//remove loading screen
				if(perc==100)
					setTimeout(function(){remove_loading_screen()}, 400);
				
				var roundPercentage = Math.round(perc);
				var loadingPoint = Math.round(perc/10); 
				loading_msg_span.innerHTML = "Loading " + roundPercentage + "%";
				if(loadingPoint==1) progressbar_div.innerHTML = "<span style='color:#22dd33'>O</span> o o o o o o o o o";
				if(loadingPoint==2) progressbar_div.innerHTML = "<span style='color:#22dd33'>O O</span> o o o o o o o o";
				if(loadingPoint==3) progressbar_div.innerHTML = "<span style='color:#22dd33'>O O O</span> o o o o o o o";
				if(loadingPoint==4) progressbar_div.innerHTML = "<span style='color:#22dd33'>O O O O</span> o o o o o o";
				if(loadingPoint==5) progressbar_div.innerHTML = "<span style='color:#22dd33'>O O O O O</span> o o o o o";
				if(loadingPoint==6) progressbar_div.innerHTML = "<span style='color:#22dd33'>O O O O O O</span> o o o o";
				if(loadingPoint==7) progressbar_div.innerHTML = "<span style='color:#22dd33'>O O O O O O O</span> o o o";
				if(loadingPoint==8) progressbar_div.innerHTML = "<span style='color:#22dd33'>O O O O O O O O</span> o o";
				if(loadingPoint==9) progressbar_div.innerHTML = "<span style='color:#22dd33'>O O O O O O O O O</span> o";
				if(loadingPoint==10) progressbar_div.innerHTML = "<span style='color:#22dd33'>O O O O O O O O O O</span>";
				//loading_div.style.display = "none";
				//document.getElementById( 'info_dialog_button' ).focus();
			}
			
			function setCursor(pointer)
			{
				container3d.style.cursor = pointer;
				gui_left_div.style.cursor = pointer;
				gui_right_div.style.cursor = pointer;
				container_div.style.cursor = pointer;
				if(characterHudOpened) document.getElementById('id-character-screen-container').style.cursor = pointer;
			}
			
			function drawItemInfo(xpos, ypos, item)
			{
				itemInfoShown = true;
				document.getElementById("id-item-info-container").style.display = "inline-block";
				document.getElementById("id-item-info-icon").style.backgroundImage = "url("+item.icon2+")";
				document.getElementById("id-item-info-name").innerHTML = item.name;
				document.getElementById("id-item-info-desc").innerHTML = item.description;
				if(item.weapon_dmg != 'undefined')
				{
					//also show weapon in hand info for comparison :)
					var dmg_bonus = "";
					if(item.weapon_dmg_bonus>0) dmg_bonus = "+"+item.weapon_dmg_bonus;
					//document.getElementById("id-item-info-speed").innerHTML = item.weapon_speed;
					//document.getElementById("id-item-info-dmg").innerHTML = "d"+item.weapon_dmg+dmg_bonus;
					//document.getElementById("id-item-info-attack-bonus").innerHTML = item.weapon_attack_bonus;
				}
			}
			
			function resetCursor()
			{
				mouse_over_button = -1;
				mouse_over_prop = -1;
				mouse_over_animated_prop = -1;
				mouse_over_secret_wall = -1;
				mouse_over_wall_writting = -1;
				mouse_over_keyhole = -1;
				mouse_over_container = -1;
				mouse_over_monster = -1;
				mouse_over_item_in_inventory = -1;
				mouse_over_item_in_container = -1;
				item_over_keyhole = -1;
				item_over_monster = -1
				mouse_over_left_hand = -1;
				mouse_over_right_hand = -1;
				item_over_left_hand = -1;
				item_over_right_hand = -1;
				mouse_over_char_hud_left_hand_slot = -1;
				mouse_over_char_hud_right_hand_slot = -1;
				mouse_over_char_hud = -1;
				setCursor('auto');
			}
			
			function onDocumentMouseMove( event )
			{

				if(gameState != GAME_STATE_IN_GAME)
					return;
			
				x_pos = event.clientX;
				y_pos = event.clientY;
				
 				item_over_left_hand = -1;
				item_over_right_hand = -1;
				mouse_over_button = -1;
				mouse_over_prop = -1;
				mouse_over_animated_prop = -1;
				mouse_over_secret_wall = -1;
				mouse_over_wall_writting = -1;
				mouse_over_keyhole = -1;
				mouse_over_container = -1;
				mouse_over_monster = -1;
				mouse_over_item_in_inventory = -1;
				mouse_over_item_in_container = -1;
				item_over_keyhole = -1;
				item_over_monster = -1
				mouse_over_left_hand = -1;
				mouse_over_right_hand = -1;
				mouse_over_char_hud_left_hand_slot = -1;
				mouse_over_char_hud_right_hand_slot = -1;
				mouse_over_char_hud = -1;

				//console.log(container3d.offsetWidth)
                //console.log(window.innerWidth)
                //console.log(event.clientX)
				var top  = window.pageYOffset || document.documentElement.scrollTop;
				//console.log(top); //, y = container3d.offsetTop;
				var	left = window.pageXOffset || document.documentElement.scrollLeft;
				//console.log(left); 
				
				mouse.x = ( (event.clientX - middleDiv.offsetLeft + 2 + left) / container3d.offsetWidth ) * 2 - 1;
				mouse.y = - ( (event.clientY + top)/ container3d.offsetHeight ) * 2 + 1;
				
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
					//character hud
					if(characterHudOpened)
					{
						var charhud = get_element_position_in_viewport("id-character-screen-container");
						
						if((x_pos > charhud.x)&&(x_pos < charhud.x+540)&&(y_pos < charhud.y+540)&&(y_pos > charhud.y))
						{
							var lefthandslot = get_element_position_in_viewport("id-character-screen-weapon-l-icon");
							if((x_pos > lefthandslot.x)&&(x_pos < lefthandslot.x+64)&&(y_pos < lefthandslot.y+64)&&(y_pos > lefthandslot.y))
							{
								mouse_over_char_hud_left_hand_slot = 1;
								setCursor('pointer');
								return;
							}
							var righthandslot = get_element_position_in_viewport("id-character-screen-weapon-r-icon");
							if((x_pos > righthandslot.x)&&(x_pos < righthandslot.x+64)&&(y_pos < righthandslot.y+64)&&(y_pos > righthandslot.y))
							{
								mouse_over_char_hud_right_hand_slot = 1;
								setCursor('pointer');
								return;
							}
							
							//player moves inside char dialog, but not on any slot so do nothing
							mouse_over_char_hud = 1;
							setCursor('auto');
							return;
						}
					}
					
					//mouse over inventory stuff
					//if(inventory_div_vertical_pos == INVENTORY_POS_SHOWN)
					{
						var item = inventory_item_clicked(x_pos,y_pos);
						if(item != 0)
						{
							console.log("asdasdasdas");
							mouse_over_item_in_inventory = item;
							setCursor('pointer');
							drawItemInfo(x_pos,y_pos,item);
							return;
						}
					}
					mouse_over_item_in_inventory = -1;
					if(itemInfoShown == true)
					{
						document.getElementById("id-item-info-container").style.display = "none";
						itemInfoShown = false;
					}
					
					//mouse over container item
					if(container_div.style.display == "inline-block")
					{
						//this is handled in containerItemClick function as item slot onclick function
					}
					mouse_over_item_in_container = -1;
					
					//mouse over players hand
					var lhandPos = get_element_position_in_viewport("player1-hand-l-main");
					if((x_pos > lhandPos.x)&&(x_pos < lhandPos.x+72)&&(y_pos < lhandPos.y+72)&&(y_pos > lhandPos.y))
					{
						//console.log("leeeeeeeeeft");
						setCursor('pointer');
						mouse_over_left_hand = 1;
						mouse_over_right_hand = -1;
						return;
					}
					var rhandPos = get_element_position_in_viewport("player1-hand-r-main");
					if((x_pos > rhandPos.x)&&(x_pos < rhandPos.x+72)&&(y_pos < rhandPos.y+72)&&(y_pos > rhandPos.y))
					{
						//console.log("riiiiiiight");
						setCursor('pointer');
						mouse_over_left_hand = -1;
						mouse_over_right_hand = 1;
						return;
					}
					
					//mouse over pickables
					for (var i=0; i< currentlevelObj.array_of_pickables.length; i++)
					{
						if(currentlevelObj.array_of_pickables[i].mesh !=0)
						{
                            //console.log("for 1:" + currentlevelObj.array_of_pickables[i].name);
                            //console.log("camera: " + camera.position + ", currentlevelObj.array_of_pickables[i].mesh.position:" + currentlevelObj.array_of_pickables[i].mesh.position);
							//first skip buggers that are already picked. they are invisible still laying on the ground and intersection picks them up..
							if(currentlevelObj.array_of_pickables[i].mesh.visible == false)
								continue;
							
							//check if player is close to pickable
							if(camera.position.distanceTo(currentlevelObj.array_of_pickables[i].mesh.position)>18)
							{
                                //console.log(currentlevelObj.array_of_pickables[i].name + " is too far away..");
								continue;
							}
							
                            //console.log(currentlevelObj.array_of_pickables[i].name + " is colse!");
							//check if pickable is clicked on
							var intersects = ray.intersectObject( currentlevelObj.array_of_pickables[i].mesh );
							
							// if there is one (or more) intersections
							if ( intersects.length > 0 )
							{
								// if the closest object intersected is not the currently stored intersection object
								if ( intersects[0].object.id == currentlevelObj.array_of_pickables[i].id )
								{
									//change mouse pointer to cursor
									setCursor('pointer');
									return;
								}
							}
						}
					}
					
					//mouse over wall writtings
					for (var n=0; n<currentlevelObj.writtingsArr.length; n++)
					{
						if((currentlevelObj.writtingsArr[n][0] == current_position.x)&&(currentlevelObj.writtingsArr[n][1] == current_position.z))
						{
							var lookie = new THREE.Vector3(0,0,0).add(looker);
							lookie.normalize();
							
							if(((lookie.x==0) && (lookie.z ==1) && (currentlevelObj.writtingsArr[n][2] == 0)) //north
							|| ((lookie.x==0) && (lookie.z ==-1) && (currentlevelObj.writtingsArr[n][2] == 2)) //south
							|| ((lookie.x==1) && (lookie.z ==0) && (currentlevelObj.writtingsArr[n][2] == 3)) //left
							|| ((lookie.x==-1) && (lookie.z ==0) && (currentlevelObj.writtingsArr[n][2] == 1))) //right
							{
								console.log("writ " + n + " mesh:" + currentlevelObj.writtingsArr[n][4]);
								if(currentlevelObj.writtingsArr[n][4] != 0)
								{
									var intersects = ray.intersectObject( currentlevelObj.writtingsArr[n][4] );
							
									console.log("writtingsArr");
									// if there is one (or more) intersections
									if ( intersects.length > 0 )
									{
										console.log("writtingsArr aaa");
										mouse_over_wall_writting = n;
										//change mouse pointer to cursor
										setCursor('pointer');
										return;
									}
								}
							}
						}
					}
					
					//mouse over doors
					for(var d=0; d < currentlevelObj.array_of_doors.length; d++)
					{
						if(currentlevelObj.array_of_doors[d].mesh != 0)
						{
							//if there are doors in that position
							if((currentlevelObj.array_of_doors[d].map_position.x == look_pos.x) && (currentlevelObj.array_of_doors[d].map_position.z == look_pos.z))
							{
								//intersect..
								var intersects = ray.intersectObject( currentlevelObj.array_of_doors[d].mesh );
								
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
					for(var s=0; s<currentlevelObj.secretWallsArr.length; s++)
					{
						if(currentlevelObj.secretWallsArr[s].length > 3)
						{
							if((currentlevelObj.secretWallsArr[s][0] == current_position.x)&&(currentlevelObj.secretWallsArr[s][1] == current_position.z))
							{
								//intersect..
								var intersects = ray.intersectObject( currentlevelObj.secretWallsArr[s][3] );
								
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
					for (var b=0; b<currentlevelObj.array_of_buttons.length; b++)
					{
						if((currentlevelObj.array_of_buttons[b].map_position.x == current_position.x)&&(currentlevelObj.array_of_buttons[b].map_position.z == current_position.z))
						{
							//console.log("paaaaaaa");
							if(currentlevelObj.array_of_buttons[b].mesh != 0)
							{
								var intersects = ray.intersectObject( currentlevelObj.array_of_buttons[b].mesh );
								
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
					
					
					//mouse over props
					if(typeof currentlevelObj.array_of_props != 'undefined')
					{
						for (var p=0; p<currentlevelObj.array_of_props.length; p++)
						{
							var propX = currentlevelObj.array_of_props[p].map_position.x;
							var propZ = currentlevelObj.array_of_props[p].map_position.z;
							if((propX == look_pos.x)&&(propZ == look_pos.z))
							{
								//console.log("prrrooopaaaaaaa");
								if(currentlevelObj.array_of_props[p].mesh != 0)
								{
									var intersects = ray.intersectObject( currentlevelObj.array_of_props[p].mesh );
									
									// if there is one (or more) intersections
									if ( intersects.length > 0 )
									{
										//console.log("prrrt");
										//change mouse pointer to cursor
										setCursor('pointer');
										mouse_over_prop = p;
										return;
									}
								}
							}
						}
					}
					
					//mouse over animated props
					if(typeof currentlevelObj.array_of_animated_props != 'undefined')
					{
						for (var p=0; p<currentlevelObj.array_of_animated_props.length; p++)
						{
							var propX = currentlevelObj.array_of_animated_props[p].map_position.x;
							var propZ = currentlevelObj.array_of_animated_props[p].map_position.z;
							if(((propX == look_pos.x)&&(propZ == look_pos.z))||((propX == current_position.x)&&(propZ == current_position.z)))
							{
								console.log("anim prrrooopaaaaaaa");
								if(currentlevelObj.array_of_animated_props[p].mesh != 0)
								{
									var intersects = ray.intersectObject( currentlevelObj.array_of_animated_props[p].mesh );
									
									// if there is one (or more) intersections
									if ( intersects.length > 0 )
									{
										//console.log("prrrt");
										//change mouse pointer to cursor
										setCursor('pointer');
										mouse_over_animated_prop = p;
										return;
									}
								}
							}
						}
					}
					
					//mouse over keyholes
					for (var k=0; k<currentlevelObj.array_of_keyholes.length; k++)
					{
						if((currentlevelObj.array_of_keyholes[k].map_position.x == current_position.x)&&(currentlevelObj.array_of_keyholes[k].map_position.z == current_position.z))
						{
							//console.log("paaaaaaa");
							if(currentlevelObj.array_of_keyholes[k].mesh != 0)
							{
								var intersects = ray.intersectObject( currentlevelObj.array_of_keyholes[k].mesh );
								
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
					var c = looking_at_container(currentlevelObj);
					if(c > -1)
					{
						//console.log("coooooontainernrr");
						if(currentlevelObj.array_of_containers[c].mesh != 0)
						{
							var intersects = ray.intersectObject( currentlevelObj.array_of_containers[c].mesh );
							
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
					for ( var m = 0; m < currentlevelObj.array_of_monsters.length; m ++ )
					{
						var monster = currentlevelObj.array_of_monsters[ m ];
						if((monster.mesh != 0)&&(monster.alive))
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
					//character hud
					if(characterHudOpened)
					{
						var charhud = get_element_position_in_viewport("id-character-screen-container");
						
						if((x_pos > charhud.x)&&(x_pos < charhud.x+540)&&(y_pos < charhud.y+540)&&(y_pos > charhud.y))
						{
							var lefthandslot = get_element_position_in_viewport("id-character-screen-weapon-l-icon");
							if((x_pos > lefthandslot.x)&&(x_pos < lefthandslot.x+64)&&(y_pos < lefthandslot.y+64)&&(y_pos > lefthandslot.y))
							{
								mouse_over_char_hud_left_hand_slot = 1;
								return;
							}
							var righthandslot = get_element_position_in_viewport("id-character-screen-weapon-r-icon");
							if((x_pos > righthandslot.x)&&(x_pos < righthandslot.x+64)&&(y_pos < righthandslot.y+64)&&(y_pos > righthandslot.y))
							{
								mouse_over_char_hud_right_hand_slot = 1;
								return;
							}
							
							//player moves inside char dialog, but not on any slot so do nothing
							mouse_over_char_hud = 1;
							return;
						}
					}
					
					//pickable over players hand
					var lhandPos = get_element_position_in_viewport("player1-hand-l-main");
					if((x_pos > lhandPos.x)&&(x_pos < lhandPos.x+72)&&(y_pos < lhandPos.y+72)&&(y_pos > lhandPos.y))
					{
						console.log("gllllll");
						item_over_left_hand = 1;
						return;
					}
					var rhandPos = get_element_position_in_viewport("player1-hand-r-main");
					if((x_pos > rhandPos.x)&&(x_pos < rhandPos.x+72)&&(y_pos < rhandPos.y+72)&&(y_pos > rhandPos.y))
					{
						console.log("grrrrrr");
						item_over_right_hand = 1;
						return;
					}
					
					//pickable over container? no. whe'll do this only when we need some glowing on item hover or such
					
					//pickable over inventory? no. whe'll do this only when we need some glowing on item hover or such
					
					//pickable over keyhole
					for (var k=0; k<currentlevelObj.array_of_keyholes.length; k++)
					{
						if((currentlevelObj.array_of_keyholes[k].map_position.x == current_position.x)&&(currentlevelObj.array_of_keyholes[k].map_position.z == current_position.z))
						{
							//console.log("paaaaaaa");
							if(currentlevelObj.array_of_keyholes[k].mesh != 0)
							{
								var intersects = ray.intersectObject( currentlevelObj.array_of_keyholes[k].mesh );
								
								// if there is one (or more) intersections
								if ( intersects.length > 0 )
								{
									console.log("prrrt " + item_over_keyhole);
									//change mouse pointer to cursor
									setCursor('pointer');
									item_over_keyhole = k;
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

									var intersects = ray.intersectObject( currentlevelObj.array_of_keyholes[k].mesh );
								
									// if there is one (or more) intersections
									if ( intersects.length > 0 )
									{
										console.log("grrrt " + item_over_keyhole);
										//change mouse pointer to cursor
										setCursor('pointer');
										item_over_keyhole = k;
										return;
									}
								
								}
							}
						}
					}
					
					//pickable over monster
					for ( var m = 0; m < currentlevelObj.array_of_monsters.length; m ++ )
					{
						var monster = currentlevelObj.array_of_monsters[ m ];
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
				
				setCursor('auto');
			}

			function handleMouseClick(event, x,y) {
				
				if(optionsOpened) return;
				
				//console.log("uh oh");

				//this is only for doors i think
				var isRightMB;
				var e = event || window.event;
				if ("which" in e)  // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
					isRightMB = e.which == 3; 
				else if ("button" in e)  // IE, Opera 
					isRightMB = e.button == 2; 
					
				if(isRightMB)
					return;
				
				
				var view3DPos = get_element_position_in_viewport("id-3d-container");
				
				if((x > view3DPos.x)&&(x < view3DPos.x+middleDiv.offsetWidth)&&(y < view3DPos.y+middleDiv.offsetHeight)&&(y > view3DPos.y))
				{
					
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

					for(i=0; i < currentlevelObj.array_of_doors.length; i++)
					{
						//if there are doors in that position
						if((currentlevelObj.array_of_doors[i].map_position.x == look_pos.x) && (currentlevelObj.array_of_doors[i].map_position.z == look_pos.z))
						{
							// and door are unlocked..
							if(currentlevelObj.array_of_doors[i].openable == 1)
							{
								toggleDoor(currentlevelObj.array_of_doors[i]);
							}
							else
							{
								if(currentlevelObj.array_of_doors[i].open == 0)
								{
									DisplayInfoDiv("These doors are opened elsewhere..");
								}
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

			var attackClickTimer;
			
			function onMouseUp(event) {
				console.log("onMouseUp");
				clearInterval(attackClickTimer);
			}
			
			function removeWeaponFromHand(left) {
			
				//take item from players hand
				if (left)
				{
					if(martin_equipment.left_hand_item != 0)
					{
						document.getElementById("player1-hand-l-main").style.backgroundImage = "url(media/lhand.png)";
						document.getElementById("player1-hand-l-main").style.backgroundSize = "100% 100%";
						// pickable at hand becomes hand item
						martin_equipment.left_hand_item.mesh.noremove = false;
						pickable_at_hand_icon = document.getElementById("pickable_at_hand_id");
						pickable_at_hand_icon.src = martin_equipment.left_hand_item.icon;
						pickable_at_hand = martin_equipment.left_hand_item;
						martin_equipment.left_hand_item = 0;
						audio_click.currentTime = 0;
						audio_click.play();
						//update options screen
						loadCharacter();
					}
				}
				else
				{
					if(martin_equipment.right_hand_item != 0)
					{
						document.getElementById("player1-hand-r-main").style.backgroundImage = "url(media/rhand.png)";
						document.getElementById("player1-hand-r-main").style.backgroundSize = "100% 100%";
						// pickable at hand becomes hand item
						martin_equipment.right_hand_item.mesh.noremove = false;
						pickable_at_hand_icon = document.getElementById("pickable_at_hand_id");
						pickable_at_hand_icon.src = martin_equipment.right_hand_item.icon;
						pickable_at_hand = martin_equipment.right_hand_item;
						martin_equipment.right_hand_item = 0;
						audio_click.currentTime = 0;
						audio_click.play();
						//update options screen
						loadCharacter();
					}
				}
			}
			
			function onMouseDown(event) {

				//console.log("onMouseDown");
				if(gameState != GAME_STATE_IN_GAME)
					return;

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
				var top  = window.pageYOffset || document.documentElement.scrollTop;
				var	left = window.pageXOffset || document.documentElement.scrollLeft;
				//console.log(left); 
				
				mouse.x = ( (event.clientX - middleDiv.offsetLeft + 2 - left) / container3d.offsetWidth ) * 2 - 1;
				mouse.y = - ( (event.clientY + top)/ container3d.offsetHeight ) * 2 + 1;
				
				//mouse.x = ( (event.clientX - GUI_LEFT_WIDTH) / container3d.offsetWidth ) * 2 - 1;
				//mouse.y = - ( event.clientY / container3d.offsetHeight ) * 2 + 1;
				
				if(mouse_click())
				{
					//play click sound
					//audio_click2.play();
				}
				
				//if player is holding some item in hand (under mouse pointer)
				if(pickable_at_hand)
				{
					//check the areas of gui where item is dropped
					// if right area is clicked it could be inventory
					// if left area is clicked then it could be player profile
					// finally we check for 3d game area
					
					//check if item is placed in inventory
					var slot_index = inventory_clicked_in_slot(x_pos,y_pos);
					if(slot_index > 0)
					{
						if(game_quirks.q2 == 0)
						{
							remove_element_class("player1-inventory","shadow");
							game_quirks.q2 = 1;
						}

									
						//get item from inventory (if any)
						var slot_item = inventory_item_clicked(x_pos,y_pos);
						if(slot_item != 0)
						{
							if(isRightMB)
							{
								console.log("combining " + pickable_at_hand.name + " with " + slot_item.name);
								m_RMBEventWasUsed = true;
								//combine items
								//pickable_at_hand.combineScript()
								
								DisplayInfoDiv("Can't combine these two item..");
								return;
							}
							
							//replace is in order..
							audio_click.currentTime = 0;
							audio_click.play();

							//remove picked from inventory
							inventory_item_remove(slot_item);
							//add new one to inventory
							add_to_inventory(pickable_at_hand, slot_index);
							
							//place inventory item at hand
							pickable_at_hand = slot_item;
							pickable_at_hand_icon = document.getElementById("pickable_at_hand_id");
							pickable_at_hand_icon.src = slot_item.icon;
						}
						else
						{
						    if(isRightMB)
							{
								//we can put item in inventory with right click why not
								m_RMBEventWasUsed = true;
							}
							//put item to inventory
							var item_name = pickable_at_hand.name;
							
							
							audio_click.currentTime = 0;
							audio_click.play();
							add_to_inventory(pickable_at_hand, slot_index);
							pickable_at_hand_icon.style.display = "none";
							pickable_at_hand_icon = 0;
							pickable_at_hand = 0;
							
						}
						
						return;
					}
					
					//check if pickable is being placed in container
					if(container_div.style.display == "inline-block")
					{
						console.log("checking container..");
						slot_index = container_clicked_in_slot(x_pos,y_pos);
						if(slot_index > 0)
						{
							console.log("yo yo " + pickable_at_hand.name);
							containerItemPut(slot_index);
							audio_click.currentTime = 0;
							audio_click.play();
							return;
						}
					}

					//char hud
					if(mouse_over_char_hud_left_hand_slot!=-1)
					{
					}
					
					if((item_over_left_hand != -1)||(mouse_over_char_hud_left_hand_slot!=-1))
					{
						if((game_quirks.q3 == 0)&&(pickable_at_hand.weapon_dmg != 'undefined'))
						{
							remove_element_class("player1-hand-r","shadow");
							remove_element_class("player1-hand-l","shadow");
							remove_element_class("id-character-screen-weapon-r-icon","shadow");
							remove_element_class("id-character-screen-weapon-l-icon","shadow");
							game_quirks.q3 = 1;
						}
						
						//
						{
							var tmp_hand_item = 0;
							//add item to players hand
							if(isRightMB)
							{
								//we can put item in hand with right click why not
								m_RMBEventWasUsed = true;
							}
							if(martin_equipment.left_hand_item != 0)
							{
								tmp_hand_item = martin_equipment.left_hand_item;
								document.getElementById("player1-hand-l-main").style.backgroundImage = "url("+pickable_at_hand.icon+")";
								document.getElementById("player1-hand-l-main").style.backgroundSize = "100% 100%";
								martin_equipment.left_hand_item = pickable_at_hand;
								martin_equipment.left_hand_item.mesh.noremove = true;
								audio_click.currentTime = 0;
								audio_click.play();
								//pickable at hand is replaced with hand item
								pickable_at_hand_icon.src = tmp_hand_item.icon;
								pickable_at_hand = tmp_hand_item;
								pickable_at_hand.mesh.noremove = false;
							}
							else
							{
								document.getElementById("player1-hand-l-main").style.backgroundImage = "url("+pickable_at_hand.icon+")";
								document.getElementById("player1-hand-l-main").style.backgroundSize = "100% 100%";
								martin_equipment.left_hand_item = pickable_at_hand;
								martin_equipment.left_hand_item.mesh.noremove = true;
								//pickable at hand is gone
								audio_click.currentTime = 0;
								audio_click.play();
								pickable_at_hand_icon.style.display = "none";
								pickable_at_hand_icon = 0;
								pickable_at_hand = 0;
							}
						}
						
						//update options screen
						loadCharacter();
						
						return;
					}

					if((item_over_right_hand != -1)||(mouse_over_char_hud_right_hand_slot!=-1))
					{
						if((game_quirks.q3 == 0)&&(pickable_at_hand.weapon_dmg != 'undefined'))
						{
							remove_element_class("player1-hand-r","shadow");
							remove_element_class("player1-hand-l","shadow");
							remove_element_class("id-character-screen-weapon-r-icon","shadow");
							remove_element_class("id-character-screen-weapon-l-icon","shadow");
							game_quirks.q3 = 1;
						}
						
						//if(item_can_be_placed_in_hand)
						{
							var tmp_hand_item = 0;
							//add item to players hand
							if(isRightMB)
							{
								//we can put item in hand with right click why not
								m_RMBEventWasUsed = true;
							}
							if(martin_equipment.right_hand_item != 0)
							{
								tmp_hand_item = martin_equipment.right_hand_item;
								document.getElementById("player1-hand-r-main").style.backgroundImage = "url("+pickable_at_hand.icon+")";
								document.getElementById("player1-hand-r-main").style.backgroundSize = "100% 100%";
								martin_equipment.right_hand_item = pickable_at_hand;
								martin_equipment.right_hand_item.mesh.noremove = true;
								audio_click.currentTime = 0;
								audio_click.play();
								//pickable at hand is replaced with hand item
								pickable_at_hand_icon.src = tmp_hand_item.icon;
								pickable_at_hand = tmp_hand_item;
								pickable_at_hand.mesh.noremove = false;
							}
							else
							{
								document.getElementById("player1-hand-r-main").style.backgroundImage = "url("+pickable_at_hand.icon+")";
								document.getElementById("player1-hand-r-main").style.backgroundSize = "100% 100%";
								martin_equipment.right_hand_item = pickable_at_hand;
								martin_equipment.right_hand_item.mesh.noremove = true;
								audio_click.currentTime = 0;
								audio_click.play();
								//pickable at hand is gone
								pickable_at_hand_icon.style.display = "none";
								pickable_at_hand_icon = 0;
								pickable_at_hand = 0;
							}
						}
						
						//update options screen
						loadCharacter();
						
						return;
					}
					
					if(mouse_over_char_hud != -1)
					{
						//do nothing
						return;
					}
					
					//check if player is trying to put it in the niche
					var nicheID = niche_clicked_in(currentlevelObj,x_pos,y_pos);
					if(nicheID > -1)
					{
						//add pickable at hand to niche
						DisplayInfoDiv(pickable_at_hand.name + " placed in niche..");
						add_to_niche(currentlevelObj,nicheID,pickable_at_hand);
						pickable_at_hand = 0;
						pickable_at_hand_icon.style.display = "none";
						pickable_at_hand_icon = 0;	
						audio_drop.play();
						return;
					}
					
					//check if player is clicking item on the monster
					//var monsterID = monster_clicked_on(look_pos);
					if(item_over_monster > -1)
					{
						var monster = currentlevelObj.array_of_monsters[ item_over_monster ];
						
						console.log("player clicked item on " + monster.name);
						var taken = monster.OnItemClick(pickable_at_hand);

						//if monster took the pickable - make it dissapear
						if(taken)
						{
							pickable_at_hand_icon.style.display = "none";
							pickable_at_hand_icon = 0;
							remove_pickable_from_array(currentlevelObj.array_of_pickables,pickable_at_hand);
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
						if(currentlevelObj.array_of_keyholes[item_over_keyhole].gameID == pickable_at_hand.gameID)
						{
							//unlock the keyhole!
							//play sound
							audio_lock_unlock.play();
							//call script function
							currentlevelObj.array_of_keyholes[item_over_keyhole].onPressFunc();
							currentlevelObj.array_of_keyholes[item_over_keyhole].locked = false;
							//drop the key icon
							pickable_at_hand_icon.style.display = "none";
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
					var plateID = standing_on_plate(currentlevelObj);
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
							pickable_at_hand.plated = plateID;
							currentlevelObj.array_of_plates[plateID].mesh.position.y -=0.2;
							//plate_click_audio.play();
							//var onPress = plates_array[plateID][5];
							//if(onPress !=0 )
							//{
							//	onPress();
							//}
						}
						else
						{
							plateID = clicking_on_plate(currentlevelObj);
							//if not standing on plate, check if clicking on plate
							if(plateID>-1)
							{
								looker.multiplyScalar(1.52);
								pickable_at_hand.plated = plateID;
								currentlevelObj.array_of_plates[plateID].mesh.position.y -=0.2;
								plate_click_audio.play();
								currentlevelObj.array_of_plates[plateID].pressed = 1;
								currentlevelObj.array_of_plates[plateID].onPressFunc();
							}
							else
							{
								looker.multiplyScalar(0.92);
							}
						}
					}

					//play drop sound
					if(pickable_at_hand.name=="Rock")
					{
						console.log("sdasdasd" + pickable_at_hand.name);
						audio_drop_rock.play();
					}
					else
					{
						console.log("fffffffffffffasdasdasd" + pickable_at_hand.name);
						audio_drop.play();
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
                    //add this pickable to array of pickables if not already there!
                    if(get_pickable_item_by_id(currentlevelObj,pickable_at_hand.gameID) == 0)
                    {
                        currentlevelObj.array_of_pickables.push(pickable_at_hand);
                    }
					pickable_at_hand = 0;

					pickable_at_hand_icon.style.display = "none";
					pickable_at_hand_icon = 0;
					
					inventorySlide = -1;
					
					return;
					
				}
				else //regular mouse click on screen, pickable is not at hand
				{
					//click on monster
					if(mouse_over_monster > -1)
					{
						var monster = currentlevelObj.array_of_monsters[ mouse_over_monster ];
						monster.OnClick();
					}
					
					if((mouse_over_left_hand != -1)||(mouse_over_char_hud_left_hand_slot != -1))
					{
						console.log("lefteeeee");
						
						if((isRightMB)||(mouse_over_char_hud_left_hand_slot != -1))
						{
							m_RMBEventWasUsed = true;
							//take item from players hand
							if(martin_equipment.left_hand_item != 0)
							{
								document.getElementById("player1-hand-l-main").style.backgroundImage = "url(media/lhand.png)";
								document.getElementById("player1-hand-l-main").style.backgroundSize = "100% 100%";
								// pickable at hand becomes hand item
								pickable_at_hand_icon = document.getElementById("pickable_at_hand_id");
								pickable_at_hand_icon.src = martin_equipment.left_hand_item.icon;
								martin_equipment.left_hand_item.mesh.noremove = false;
								pickable_at_hand = martin_equipment.left_hand_item;
								martin_equipment.left_hand_item = 0;
								audio_click.currentTime = 0;
								audio_click.play();
								//console.log("pickable at hand should be something");
								//update options screen
								loadCharacter();
							}
						}
						else
						{
							//attack!
							player_attack(true);
							attackClickTimer = setInterval(function(){removeWeaponFromHand(true)}, 1000);
						}
						
						mouse_over_left_hand = -1;
						return;
					}

					if((mouse_over_right_hand != -1)||(mouse_over_char_hud_right_hand_slot != -1))
					{
						console.log("righteeeee");
						if((isRightMB)||(mouse_over_char_hud_right_hand_slot != -1))
						{
							m_RMBEventWasUsed = true;
							//take item from players hand
							if(martin_equipment.right_hand_item != 0)
							{
								document.getElementById("player1-hand-r-main").style.backgroundImage = "url(media/rhand.png)";
								document.getElementById("player1-hand-r-main").style.backgroundSize = "100% 100%";
								// pickable at hand becomes hand item
								pickable_at_hand_icon = document.getElementById("pickable_at_hand_id");
								pickable_at_hand_icon.src = martin_equipment.right_hand_item.icon;
								martin_equipment.right_hand_item.mesh.noremove = false;
								pickable_at_hand = martin_equipment.right_hand_item;
								martin_equipment.right_hand_item = 0;
								audio_click.currentTime = 0;
								audio_click.play();
								//update options screen
								loadCharacter();
							}
						}
						else
						{
							//attack!
							player_attack(false);
							attackClickTimer = setInterval(function(){removeWeaponFromHand(false)}, 1000);
						}
						mouse_over_right_hand = -1;
						return;
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
								window[mouse_over_item_in_inventory.useScript]();
							}
							//consume if expendable
							if(mouse_over_item_in_inventory.consumable)
							{
								inventory_item_remove(mouse_over_item_in_inventory);
								//hide item info dialog
								document.getElementById("id-item-info-container").style.display = "none";
								itemInfoShown = false;
							}
							m_RMBEventWasUsed = true;
						}
						else
						{
							//remove picked from inventory
							inventory_item_remove(mouse_over_item_in_inventory);
							//hide item info dialog
							document.getElementById("id-item-info-container").style.display = "none";
							itemInfoShown = false;
							//play click
							audio_click.currentTime = 0;
							audio_click.play();
							// if (audio_click.paused) {
								// audio_click.play();
							// }else{
								// audio_click.currentTime = 0
							// }
							//place inventory item at hand
							pickable_at_hand = mouse_over_item_in_inventory;
							
							pickable_at_hand_icon = document.getElementById("pickable_at_hand_id");
							pickable_at_hand_icon.src = mouse_over_item_in_inventory.icon;
						}
						mouse_over_item_in_inventory = -1;
						//dont do anything else if item is clicked
						return;
					}
					
					//check if item from container is clicked
					if(mouse_over_item_in_container > -1)
					{
						//this is handled in containerItemClick function that is called as item onclick function
					}
					
					//button
					if(mouse_over_button > -1)
					{
						if(currentlevelObj.array_of_buttons[mouse_over_button].pressed == false)
						{
							//play sound
							button_click_audio.play();
							//move button in the wall
							currentlevelObj.array_of_buttons[mouse_over_button].mesh.position.x -= 0.05; //TODO move depending on orientation
							//do button action
							currentlevelObj.array_of_buttons[mouse_over_button].onPressFunc();
							//set it to be budged.. no more clicking.
							currentlevelObj.array_of_buttons[mouse_over_button].pressed = true;
							//info
							DisplayInfoDiv("Buttons triggers some mechanism!");
						}
					}
					
					//prop 
					if(mouse_over_prop > -1)
					{
						//do prop click action
						currentlevelObj.array_of_props[mouse_over_prop].onPressFunc();
					}
					if(mouse_over_animated_prop > -1)
					{
						//do prop click action
						currentlevelObj.array_of_animated_props[mouse_over_animated_prop].onPressFunc();
					}
					
					
					//secret wall
					if(mouse_over_secret_wall > -1)
					{
						DisplayInfoDiv(currentlevelObj.secretWallsArr[mouse_over_secret_wall][4]);
					}
					
					//keyhole
					if(mouse_over_keyhole > -1)
					{
						//show info
						if(currentlevelObj.array_of_keyholes[mouse_over_keyhole].locked)
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
						container_fill_gui(mouse_over_container, currentlevelObj);
						inventorySlide = 1;
						DisplayInfoDiv("Chest opened..");
						return;
					}
					
					//check if player clicked on writting on the wall
					if((mouse_over_wall_writting > -1)&&(info_dialog_div.style.display == "none"))
					{
						audio_click.play();
						//console.log("clicking at writting!");
						show_message(" <br> " + currentlevelObj.writtingsArr[mouse_over_wall_writting][3] + " <br><br><br><br> <div id='info_dialog_button' style='cursor: pointer; margin:auto; padding-top:9px; font-size:14px; width:94px; height: 25px; background: #00c url(media/gui/buttons.png); background-size: 100% 100%;' onclick='hide_message();'> Ok </div>", 600, 300, "url(media/gui/dialog2.png)", "Copperplate, 'Copperplate Gothic Light', Garamond, Baskerville", "#ddddd0", "400", "20px");
						//DisplayInfoDiv("Ancient writting deciphered..");
						mouse_over_wall_writting = -1;
						return;
					}
					/*for (var n=0; n<writtingsArr.length; n++)
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
								audio_click.play();
								console.log("looking at writting!");
								show_message(" <br> " + writtingsArr[n][3] + " <br><br><br><br> <button id='info_dialog_button' style='cursor: pointer; width:134px; height: 34px; background: #00c url(media/button_light.png); background-size: 100% 100%;' onclick='hide_message();'> Ok </button>", 600, 300, "url(media/pannel_small.png)", "Copperplate, 'Copperplate Gothic Light', Garamond, Baskerville", "#ddddd0", "400", "20px");
								//DisplayInfoDiv("Ancient writting deciphered..");
							}
						}
					}*/

					// create a Ray with origin at the mouse position
					//   and direction into the scene (camera direction)
					var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
					projector.unprojectVector( vector, camera );
					var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

					for (var i=0; i< currentlevelObj.array_of_pickables.length; i++)
					{
                        //console.log("for 2:" + currentlevelObj.array_of_pickables[i].name)
						//first skip buggers that are already picked. they are invisible still laying on the ground and intersection picks them up..
						if(currentlevelObj.array_of_pickables[i].mesh.visible == false)
							continue;
						
						//check if player is close to pickable
						if(camera.position.distanceTo(currentlevelObj.array_of_pickables[i].mesh.position)>18)
						{
                            //console.log ("asd = " + camera.position.distanceTo(currentlevelObj.array_of_pickables[i].mesh.position));
							//console.log("too far = " + Math.abs(camera.position.z-currentlevelObj.array_of_pickables[i].position.z));
							continue;
						}
						
                        //console.log ("close!" + currentlevelObj.array_of_pickables[i].name);
                        
						//check if pickable is clicked on
						var intersects = ray.intersectObject( currentlevelObj.array_of_pickables[i].mesh );
						
						// if there is one (or more) intersections
						if ( intersects.length > 0 )
						{
							
							// if the closest object intersected is not the currently stored intersection object
							if ( intersects[0].object.id == currentlevelObj.array_of_pickables[i].id )
							{
								pickable_at_hand = currentlevelObj.array_of_pickables[i];
                                remove_pickable_from_array(currentlevelObj.array_of_pickables,pickable_at_hand);
                                pickable_at_hand.mesh.visible = false;
								pickable_at_hand_icon = document.getElementById("pickable_at_hand_id");
								var from_where = "from the ground..";
								if(pickable_at_hand.niched > -1) from_where = "from niche in the wall";
								DisplayInfoDiv(pickable_at_hand.name + " picked up " + from_where);
								//alert("picked z = " + Math.abs(camera.position.z-currentlevelObj.array_of_pickables[i].mesh.position.z));
								pickable_at_hand_icon.src = pickable_at_hand.icon;
								//if pickable belongs to niche, remove from niche array
								if(pickable_at_hand.niched > -1) remove_from_niche(currentlevelObj,pickable_at_hand);
								if(pickable_at_hand.plated > -1)
								{
									//TODO: check if more items remain on the plate
									currentlevelObj.array_of_plates[pickable_at_hand.plated].mesh.position.y +=0.2;
									//console.log("lifting item off the plate!");
									currentlevelObj.array_of_plates[pickable_at_hand.plated].pressed = 0;
									plate_unclick_audio.play();
									currentlevelObj.array_of_plates[pickable_at_hand.plated].onUnpressFunc();
									pickable_at_hand.plated = -1;
								}
								
								
								{
									//glow inventory and hands
									if((game_quirks.q3 == 0)&&(pickable_at_hand.weapon_dmg != 'undefined'))
									{
										add_element_class("player1-hand-r","shadow");
										add_element_class("player1-hand-l","shadow");
										add_element_class("id-character-screen-weapon-r-icon","shadow");
										add_element_class("id-character-screen-weapon-l-icon","shadow");
									}
									else if(game_quirks.q2 == 0)
									{
										add_element_class("player1-inventory","shadow");
									}
								}
								
								audio_click2.play();
								inventorySlide = 1;
								break;
							}
						}
						else
						{
							//alert("not intersecting!" + currentlevelObj.array_of_pickables[i].mesh.id);
						}
					}
					
				}

				handleMouseClick(event, x_pos, y_pos);
				
			}
	

			var lastTime = 0;


	
			function animate() {
			
				requestAnimationFrame( animate );
				game_loop();
				
			}
			

		</script>
		
	</body>
</html>
