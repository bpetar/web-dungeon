<?php 

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
				
				-webkit-touch-callout: none;
				-webkit-user-select: none;
				-khtml-user-select: none;
				-moz-user-select: none;
				-ms-user-select: none;
				user-select: none;
			}

			#info {
				position: absolute;
				top: 0px; width: 100%;
				padding: 5px;
			}

			a {
				color: #0080ff;
			}
			
			.shadow {

			-webkit-filter: drop-shadow(0px 0px 13px rgba(255, 255, 0 , 1));

			filter: url("../img/dialog/dialog-elements/shadow.svg#drop-shadow");

			-ms-filter: "progid:DXImageTransform.Microsoft.Dropshadow(OffX=0, OffY=0, 

			Color='#FFFFFF')";

			filter: "progid:DXImageTransform.Microsoft.Dropshadow(OffX=0, OffY=0, Color='#FFFFFF')";

			}
			
			.creditsScroll {
				overflow-y:scroll;
			}
			
			.creditsScroll::-webkit-scrollbar {
				width: 8px;
			}
			.creditsScroll::-webkit-scrollbar-track {
				-webkit-box-shadow: inset 4px 4px 6px rgba(0,130,0,0.3); 
				border-radius: 6px;
			}
			.creditsScroll::-webkit-scrollbar-thumb {
				border-radius: 6px;
				-webkit-box-shadow: inset 4px 4px 6px rgba(0,180,10,0.5); 
			}

		</style>
	</head>
	<body onload="onPageLoad()">
    
    <div id="gui" style="border:0px solid red; min-height:650px; min-width:1120px; height:100%; width:100px; display:block; margin-left: auto; margin-right: auto;">
	

		<?php include "cuber_html_left.php"; ?>
		
		<?php include "cuber_html_console.php"; ?>
        
		<div id="gui_right" style="position:relative; float:left; background: url(media/gui/background_up_green.png); border:0px solid black; width:200px; height:100%;">
        
            <div style="width:192px; height:8px; margin-left:6px; border:0px solid yellow;">.
			</div>
            
            <div id="player1-inventory" style="background: url(media/gui/slot.png); width:192px; height:192px; margin-left:4px;">
				<div id="gui_slot1_item_icon" style="width:64px; height:64px; float:left; border:0px solid yellow;">
				</div>
				<div id="gui_slot2_item_icon" style="width:64px; height:64px; float:left; border:0px solid yellow;">
				</div>
				<div id="gui_slot3_item_icon" style="width:64px; height:64px; float:left; border:0px solid yellow;">
				</div>
				<div id="gui_slot4_item_icon" style="width:64px; height:64px; float:left; border:0px solid yellow;">
				</div>
				<div id="gui_slot5_item_icon" style="width:64px; height:64px; float:left; border:0px solid yellow;">
				</div>
				<div id="gui_slot6_item_icon" style="width:64px; height:64px; float:left; border:0px solid yellow;">
				</div>
				<div id="gui_slot7_item_icon" style="width:64px; height:64px; float:left; border:0px solid yellow;">
				</div>
				<div id="gui_slot8_item_icon" style="width:64px; height:64px; float:left; border:0px solid yellow;">
				</div>
				<div id="gui_slot9_item_icon" style="width:64px; height:64px; float:left; border:0px solid yellow;">
				</div>
			</div>
            
            <div style="width:192px; margin-left:4px; height:8px;">
			</div>
            
            <div id="player2-inventory" style="background: url(media/gui/root.png); border:1px solid yellow; width:192px; height:192px; display:none;">
			</div>
            
            <div style="background: url(media/gui/background.png); border:1px solid red; width:192px; height:8px; display:none;">
			</div>
                
			<div id="map" style="background:url(media/gui/background.png); position:absolute; bottom:0px; height:64px; width:100%;">
                <div id="special_slot1" style="float:left; margin-right:1px; margin-left:2px; background: url(media/gui/slot1.png) no-repeat; width:64px; height:64px"></div>
                <div id="special_slot2" style="float:left; margin-right:1px; margin-left:1px; background: url(media/gui/slot1.png) no-repeat; width:64px; height:64px"></div>
				<div id="special_slot3" style="float:left; margin-right:2px; margin-left:1px; background: url(media/gui/slot1.png) no-repeat; width:64px; height:64px"></div>
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

		<div id="info_tip" style="text-align:left; font-size:16px; color: #BBFFBB; position:absolute; height:24px; width:512px;">
		Game started..
		</div>

		<div id="level_complete_dialog" style="position:absolute; width:750px; height:450px; top:0; bottom: 0; left: 0; right: 0; opacity:0.8; display: none;">
			<p>Level Complete!<p>
		</div>
		
		<div id="info_dialog" style="position:absolute; display:none; width:750px; height:450px; top:0; bottom: 0; left: 0; right: 0; opacity:0.8; background-color: #001100; margin: auto; background:url(media/pannel_small.png); background-size: 100% 100%;">
			<div id="info_message" style="font-size:20px; font-family: Copperplate, 'Copperplate Gothic Light', Garamond, Baskerville; font-weight:normal; color: #ddddd0; padding-top:70px; padding-bottom: 30px; padding-left:100px; padding-right: 100px;"> 
			<p>Welcome to the Web Dungeon game test!</p> 
			
			<p>Use <span style="color:#dd3333">QWEASD</span> keys to move around and left mouse button to click. Browser reload button gets you back on start.</p>

			<!-- <p>Please send me feedback about your Frame rate, OS, browser version, processor and GPU.</p> -->
			<p>If you have any trouble playing the game please contact me on <a style="color: rgb(50,148,50)" href="mailto:info@mystic-peanut.com">info@mystic-peanut.com</a> .</p>
			<br><br>
			<button id="info_dialog_button" style='cursor: pointer; width:134px; height: 34px; background: #00c url(media/button_light.png); background-size: 100% 100%;' onclick='hide_message();'> Ok </button>
			</div>
		</div>

		<div id="loading_progress" style="position:absolute; font-size:14px; width:100%; height:100%; background-color: #050500; top:0; bottom: 0; left: 0; right: 0; margin: auto; z-index:3;">

			<div style="position:absolute; width:300px; height:200px; top:0; bottom: 0; left: 0; right: 0; margin: auto;">
				<span id="loading_message_text" style="font-size:14px;">Good King Richard called to arms when spawn of darkness rallied around the dragons mountain. Orcs, goblins, even untameable trolls came out of forest to serve the New Lord. But humans stood tall and proud, and they had no fear in the eyes of battle.</span> <br><br><br>
				<span id="loading_message" style="font-size:28px;">Loading 0%</span> <br><br><br>
				<div id="progressbar" style="font-size:12px; color:#ff0000">o o o o o o o o o o</div>
			</div>
		</div>
		
		<div id="id-main-menu" style="position:absolute; width:100%; height:100%; top:0; margin: auto; background-color: #000000; z-index:4;">

			<div id="id-main-menu-sub" style="position:absolute; width:400px; height:600px; background: url(media/dragon_sep.png); background-size: 100% 100%; left:0; right:0; top:0; bottom:0; margin: auto;">
				<span id="main_menu_message" style="font-size:14px; color:#988455;">Great earthquake awoke the dragon. Or was it the other way around? It was not the mindless beast, the dragon, but ancient malice with wit and wisdom that no man could match.</span> <br>
				<br><br><br><br><br><br><br><br><br><br><br>
				<div id="id-main-menu-buttons-container" style="border: solid red 0px;">
					<div id="id-main-menu-new" onclick="mainMenuNewGame()" onmouseout="mainMenuMouseOut()" onmouseover="mainMenuMouseOverNew()" style="margin: auto; margin-top:6px; background:url(media/gui/buttonser.png); background-size: 100% 100%;  cursor:pointer; height:54px; width:200px; text-align:center; font-size:26px; line-height:64px;">New
					</div>
					<div id="id-main-menu-load" onclick="mainMenuLoadGame()" onmouseout="mainMenuMouseOut()" onmouseover="mainMenuMouseOverLoad()" style="color: gray; margin: auto; margin-top:6px; background:url(media/gui/buttonser.png); background-size: 100% 100%;  cursor:pointer; height:54px; width:200px; text-align:center; font-size:26px; line-height:64px;">Load
					</div>
					<div id="id-main-menu-settings" onclick="mainMenuSettings()" onmouseout="mainMenuMouseOut()" onmouseover="mainMenuMouseOverSettings()" style="margin: auto; margin-top:6px; background:url(media/gui/buttonser.png); background-size: 100% 100%;  cursor:pointer; height:54px; width:200px; text-align:center; font-size:26px; line-height:64px;">Settings
					</div>
					<div id="id-main-menu-register" onclick="mainMenuRegister()" onmouseout="mainMenuMouseOut()" onmouseover="mainMenuMouseOverRegister()" style="margin: auto; margin-top:6px; background:url(media/gui/buttonser.png); background-size: 100% 100%;  cursor:pointer; height:54px; width:200px; text-align:center; font-size:26px; line-height:64px;">Register
					</div>
					<div id="id-main-menu-credits" onclick="mainMenuCredits()" onmouseout="mainMenuMouseOut()" onmouseover="mainMenuMouseOverCredits()" style="margin: auto; margin-top:6px; background:url(media/gui/buttonser.png); background-size: 100% 100%;  cursor:pointer; height:54px; width:200px; text-align:center; font-size:26px; line-height:64px;">Credits
					</div>
				</div>
				<div id="id-main-menu-credits-container" style="position:relative; display:none; border: solid red 0px; height:284px; width:400px;">
					<div id="id-main-menu-credits-sub" style="position:absolute; border: solid red 0px; width:200px; height:220px; left:10; right:0; top:0; bottom:0; margin: auto;">
						Petar Bajic<br>
						Dragan Kurbalija<br>
						Birdao Basumataru<br>
						Zorana Markovic<br>
						<br>
						<a href="http://threejs.org/">Three.js</a><br>
						<a href="http://www.blendswap.com/">BlendSwap</a><br>
						<br>
						Big thanks to my family and all of you who bother playing it :)<br>
						<br>
					</div>
					<div id="id-main-menu-credits-back" onclick="mainMenuCreditsBack()" onmouseout="mainMenuMouseOut()" onmouseover="mainMenuMouseOverCreditsBack()" style="position:absolute; margin:auto; border: solid green 0px; display:block; top:250px; left:100px; cursor:pointer; height:54px; width:200px; text-align:center; font-size:26px; line-height:64px;">
						Back
					</div>
				</div>
				<div id="id-main-menu-todo-container" style="position:relative; display:none; border: solid red 0px; height:284px; width:400px;">
					<div id="id-main-menu-todo-sub" style="position:absolute; width:200px; height:220px; background: #000000; left:10; right:0; top:0; bottom:0; margin: auto;">
						<br>Nothing to see here. 
						<br>
						<br>Go play somewhere else.
					</div>
					<div id="id-main-menu-todo-back" onclick="mainMenuTodoBack()" onmouseout="mainMenuMouseOut()" onmouseover="mainMenuMouseOverTodoBack()" style="position:absolute; margin:auto; border: solid green 0px; display:block; top:250px; left:100px; cursor:pointer; height:54px; width:200px; text-align:center; font-size:26px; line-height:64px;">
						Back
					</div>
				</div>
				
			</div>
		</div>
		
		<script>
		
		function mainMenuMouseOut()
		{
			remove_element_class("id-main-menu-new","shadow");
			remove_element_class("id-main-menu-load","shadow");
			remove_element_class("id-main-menu-settings","shadow");
			remove_element_class("id-main-menu-register","shadow");
			remove_element_class("id-main-menu-credits","shadow");
			remove_element_class("id-main-menu-credits-back","shadow");
			remove_element_class("id-main-menu-todo-back","shadow");
		}
		
		function mainMenuMouseOverNew()
		{
			add_element_class("id-main-menu-new","shadow");
			audio_click.currentTime = 0;
			audio_click.play();
		}
		
		function mainMenuMouseOverLoad()
		{
			if(saved_game)
			{
				add_element_class("id-main-menu-load","shadow");
				audio_click.currentTime = 0;
				audio_click.play();
			}
		}
		
		function mainMenuMouseOverSettings()
		{
			add_element_class("id-main-menu-settings","shadow");
			audio_click.currentTime = 0;
			audio_click.play();
		}
		
		function mainMenuMouseOverRegister()
		{
			add_element_class("id-main-menu-register","shadow");
			audio_click.currentTime = 0;
			audio_click.play();
		}
		
		function mainMenuMouseOverCredits()
		{
			add_element_class("id-main-menu-credits","shadow");
			audio_click.currentTime = 0;
			audio_click.play();
		}
		
		function mainMenuMouseOverCreditsBack()
		{
			add_element_class("id-main-menu-credits-back","shadow");
			audio_click.currentTime = 0;
			audio_click.play();
		}
		function mainMenuMouseOverTodoBack()
		{
			add_element_class("id-main-menu-todo-back","shadow");
			audio_click.currentTime = 0;
			audio_click.play();
		}
		
		</script>