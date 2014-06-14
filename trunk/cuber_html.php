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
	<body onload="onPageLoad()">
    
    <div id="gui" style="min-height:650px; min-width:950px; height:100%; width:100%;">
	
		<div id="gui_left" style="position:relative; float:left; background: url(media/gui/background_up_green.png); border-spacing:0px; height:100%; width:200px;">
        
            <div id="profiles" style="display:block; width:100%;">
            
                <div style="width:100%; height:4px">.
                </div>
                
                
                <div id="player1" style="background: url(media/gui/profile.png) no-repeat; width:192px; height:200px; margin-left:4px;">
                
                    <div style="width:100%; height:8px; border:0px solid white;">
                    </div>
                    
                    <div style="width:100%; height:156px; border:0px solid yellow; margin-left:6px;">
                        <div id="player1-face" style="float:left; width:84px; height:156px; border:0px solid blue; cursor:pointer; background:rgba(211,139,0,0.2);"> 
							<div id="player_wound" style="font-size:20px; font-weight:bold; color: #001100; padding-top:18px; padding-left:8px; position:absolute; left:5px; top:5px;  height:40px; width:80px; background: url(media/wound.png); background-size: 100% 100%;">
							13
							</div>
						</div>
                        <div id="player1-hands" style="float:left; width:92px; height:156px; border:0px solid green;" > 
                            <div id="player1-health" style="width:84px; height:20px; border:1px solid green; margin-left:4px; margin-top:4px; background:rgba(2,139,0,0.4);" > </div>
                            <div id="player1-hand-l" style="width:92px; height:64px; border:0px solid blue;" > 
                                <div id="player1-hand-l-main" style="float:left; width:72px; height:64px; border:0px solid yellow;" > </div>
                                <div id="player1-hand-l-ext" style="float:left; width:20px; height:64px; border:0px solid red;" > </div>
                            </div>
                            <div id="player1-hand-r" style="width:92px; height:64px; border:0px solid red;" > 
                                <div id="player1-hand-r-main" style="float:left; width:72px; height:64px; border:0px solid yellow;" > </div>
                                <div id="player1-hand-r-ext" style="float:left; width:20px; height:64px; border:0px solid red;" > </div>
                            </div>
                        </div>
                    </div>
                    
                    
                    <div id="name1" style="width:100%; height:29px; border:0px solid red; text-align:center; cursor:pointer; line-height:29px; color:white;">MARTIN</div>
                    
                </div>
                
                
                <div style="width:100%; height:8px; ">
                </div>
                
                <div id="player2" style="background: url(media/gui/profile.png) no-repeat; width:192px; height:200px; margin-left:4px; display:none;">
                
                    <div style="width:100%; height:8px; border:0px solid white;">
                    </div>
                    
                    <div style="width:100%; height:156px; border:0px solid yellow; margin-left:6px;">
                        <div id="player2-face" style="float:left; width:84px; height:156px; border:0px solid blue; cursor:pointer; background:rgba(211,139,0,0.2);"> </div>
                        <div id="player2-hands" style="float:left; width:92px; height:156px; border:0px solid green;" > 
                            <div id="player2-health" style="width:84px; height:20px; border:1px solid green; margin-left:4px; margin-top:4px; background:rgba(2,139,0,0.4);" > </div>
                            <div id="player2-hand-l" style="width:92px; height:64px; border:0px solid blue;" > 
                                <div id="player2-hand-l-main" style="float:left; width:72px; height:64px; border:0px solid yellow;" > </div>
                                <div id="player2-hand-l-ext" style="float:left; width:20px; height:64px; border:0px solid red;" > </div>
                            </div>
                            <div id="player2-hand-r" style="width:92px; height:64px; border:0px solid red;" > 
                                <div id="player2-hand-r-main" style="float:left; width:72px; height:64px; border:0px solid yellow;" > </div>
                                <div id="player2-hand-r-ext" style="float:left; width:20px; height:64px; border:0px solid red;" > </div>
                            </div>
                        </div>
                    </div>
                    
                    
                    <div id="name1" style="width:100%; height:29px; border:0px solid red; text-align:center; cursor:pointer; line-height:29px; color:white;">GRISHNAK</div>
                    
                </div>
                        
			</div>

			<div id="options" style="background:url(media/gui/buttons.png); background-size: 100% 100%; position:absolute; bottom:0px; cursor:pointer; height:64px; width:100%; text-align:center; line-height:64px;"><b>OPTIONS</b>
			</div>
            
		</div>

		<div id="gui_center" style="position:relative; float:left; width:500px; height:100%;">

			<div id="id-3d-container" style="width:500px; height:500px; border:1px solid yellow;">
			</div>

            <div id="id-console-button" onclick="{console.log('perap'); this.style.marginBottom='354px'; document.getElementById('console').style.height='364px';}" style="background:url(media/gui/console_up.png); cursor:pointer; background-size: 100% 100%; position:absolute; bottom:0px; right:20px; margin-bottom:54px; z-index:2; width:30px; height:30px; border:0px solid yellow;">
			</div>
            
			<div id="console" style="background:url(media/gui/background.png); position:absolute; bottom:0px; color:yellow; height:64px; width:100%; overflow-y: scroll;">
            Game Initialized.
            <br>
            Martin: I smell something funny in this corner..
            <br>
            Root picked up!
            <br>
            Root picked up!
            <br>
            Martin: I smell something funny in this corner..
            <br>
            Root picked up!
            <br>
            Game Initialized.
            <br>
            Martin: I smell something funny in this corner..
            <br>
            Root picked up!
            <br>
            Root picked up!
            <br>
            Martin: I smell something funny in this corner..
            <br>
			</div>
		</div>
        
		<div id="gui_right" style="position:relative; float:left; background: url(media/gui/background_up_green.png); border:1px solid black; width:200px; height:100%;">
        
            <div style="width:192px; height:8px; margin-left:6px; border:0px solid yellow;">.
			</div>
            
            <div id="player1-inventory" style="background: url(media/gui/slot.png); width:192px; height:192px; margin-left:4px;">
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
    
    
    
    
    
    
    
    
    
    
		
		<div id="gui" style="cursor: pointer; position:absolute; left:200px; top:70px;">
					
			<div id="speech_bubble" onClick="hide_bubble();"  style="float:left; display:none; font-size:16px; padding-top:25px; padding-bottom:25px; padding-left:205px; padding-right:25px; text-align:left; width:600px; height:150px; opacity:0.8; background-color: #001100; background:url(media/speech_bubble.png); background-size: 100% 100%;">
			Im alive!! Hello World!
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

		<div id="loading_progress" style="position:absolute; font-size:28px; width:100%; height:100%; background-color: #000011; top:0; bottom: 0; left: 0; right: 0; margin: auto;">

			<div style="position:absolute; width:300px; height:200px; top:0; bottom: 0; left: 0; right: 0; margin: auto;">
				<span id="loading_message">Loading 0%</span> <br><br><br>
				<div id="progressbar" style="font-size:12px; color:#ff0000">o o o o o o o o o o</div>
			</div>
		</div>