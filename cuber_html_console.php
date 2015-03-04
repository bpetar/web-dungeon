<?php 

?>

    
		<div id="gui_center" style="position:relative; float:left; height:100%;">

			<div id="gui-speech" style="position:absolute; display:none; left:10px; top:70px;">
					
				<div id="speech_bubble" onClick="hide_bubble();"  style="float:left; font-size:14px; text-align:left; padding-left:55px; padding-top:20px; padding-right:15px; width:260px; height:100px; opacity:0.8; background-color: #001100; background:url(media/speech_bubble.png); background-size: 100% 100%; border:0px solid yellow;">
				Im alive!! Hello World!
				</div>
				
				<div id="speech_bubble_button" onClick="hide_bubble();"  style="cursor:pointer; position:absolute; font-size:14px; text-align:center; right:0px; bottom:0px; margin-right:32; margin-bottom:12; width:40px; height:20px; opacity:1.0; background:url(media/speech_button.png); background-size: 100% 100%; border:0px solid yellow;">
				ok
				</div>

			</div>
			
			<div id="id-item-info-container" style="position:absolute; display:none; background:url(media/gui/itemInfo.png); background-size: 100% 100%;  right:4px; top:6px; width:196px; height:196px;">
					
				<div id="id-item-info-icon" style="position:absolute; font-size:14px; text-align:center; left:64px; top:26px; height:64px; width:64px; background:url(media/gui/root.png); background-size: 100% 100%; border:0px solid yellow;">
				</div>
				<div id="id-item-info-name" style="position:absolute; font-size:14px; color:yellow; text-align:center; left:0px; top:9px; height:20px; width:194px; border:0px solid yellow;">
				Root
				</div>
				
				<div id="id-item-info-desc" style="position:absolute; font-size:12px; left:25px; text-align:left; top:106px; height:90px; width:154px; border:0px solid yellow;">
				Edible by all means. Go ahead, right click it.
				</div>

			</div>
			
			<div id="id-character-screen-container" style="position:absolute; display:none; background:url(media/gui/char_screen_hud.png); background-size: 100% 100%; top:6px; width:540px; height:540px;">

				<div id="id-character-screen-close-icon" onclick="toggleCharHud()" style="position:absolute; cursor:pointer; font-size:14px; text-align:center; left:527px; top:-4px; height:16px; width:16px; background:url(media/gui/close.png); background-size: 100% 100%; border:0px solid yellow;">
				</div>

				<div id="id-character-screen-helmet-icon" style="position:absolute; font-size:14px; text-align:center; left:240px; top:140px; height:64px; width:64px; background:url(media/gui/root.png); background-size: 100% 100%; border:0px solid yellow;">
				</div>
				
				<div id="id-character-screen-necklace-icon" style="position:absolute; font-size:14px; text-align:center; left:455px; top:140px; height:64px; width:64px; background:url(media/gui/root.png); background-size: 100% 100%; border:0px solid yellow;">
				</div>
				
				<div id="id-character-screen-armour-icon" style="position:absolute; font-size:14px; text-align:center; left:240px; top:220px; height:64px; width:64px; background:url(media/gui/root.png); background-size: 100% 100%; border:0px solid yellow;">
				</div>
				
				<div id="id-character-screen-bracers-icon" style="position:absolute; font-size:14px; text-align:center; left:455px; top:220px; height:64px; width:64px; background:url(media/gui/root.png); background-size: 100% 100%; border:0px solid yellow;">
				</div>
			
				<div id="id-character-screen-weapon-l-icon" style="position:absolute; font-size:14px; text-align:center; left:455px; top:300px; height:64px; width:64px; border:0px solid yellow; background-size: 100% 100%;">
				</div>
				
				<div id="id-character-screen-weapon-r-icon" style="position:absolute; font-size:14px; text-align:center; left:240px; top:300px; height:64px; width:64px; border:0px solid yellow; background-size: 100% 100%;">
				</div>
				
				<div id="id-character-screen-pants-icon" style="position:absolute; font-size:14px; text-align:center; left:240px; top:380px; height:64px; width:64px; background:url(media/rhand.png); background-size: 100% 100%; border:0px solid yellow;">
				</div>
				
				<div id="id-character-screen-boots-icon" style="position:absolute; font-size:14px; text-align:center; left:455px; top:380px; height:64px; width:64px; background:url(media/rhand.png); background-size: 100% 100%; border:0px solid yellow;">
				</div>
				
				<div id="id-character-screen-stats" style="position:absolute; font-size:14px; text-align:left; left:24px; top:200px; height:164px; width:164px; border:0px solid yellow;">
					<span > Level:</span> <span id="id-character-screen-stats-level">0</span><br>
					<span > Next Level:</span> <span id="id-character-screen-stats-level">1000</span><br>
					<span > Experience:</span> <span id="id-character-screen-stats-experience">0</span><br><br>
					<span > Strentgh:</span> <span id="id-character-screen-stats-strength">0</span><br>
					<span > Dexterity:</span> <span id="id-character-screen-stats-dexterity">0</span><br><br>
					<span > Attack:</span> <span id="id-character-screen-stats-attack">0</span><br>
					<span > Defence:</span> <span id="id-character-screen-stats-defence">0</span><br>
				</div>

			</div>
			
			
			<div id="id-options-container" style="display:none; position:absolute; z-index:4; background:url(media/gui/background_up.png) repeat; width:100%; height:100%; border:0px solid black;">
			
				<div id="id-options-container2" style="position:absolute; background:url(media/gui/background_up_green.png) repeat; bottom:1px; left:10px; width:210px; border:1px solid #003300;">
				
					<div id="id-options-new" onclick="optionsMouseNew()" onmouseover="optionsMouseOverNew()" style="margin: auto; margin-top:6px; background:url(media/gui/buttons.png); background-size: 100% 100%;  cursor:pointer; height:54px; width:200px; text-align:center; line-height:64px;"><b>New</b>
					</div>
					<div id="id-options-load" onclick="optionsMouseLoad()" onmouseover="optionsMouseOverLoad()" style="margin: auto; margin-top:6px; background:url(media/gui/buttons.png); background-size: 100% 100%;  cursor:pointer; height:54px; width:200px; text-align:center; line-height:64px;"><b>Load</b>
					</div>
					<div id="id-options-save" onclick="optionsMouseSave()" onmouseover="optionsMouseOverSave()" style="margin: auto; margin-top:6px; background:url(media/gui/buttons.png); background-size: 100% 100%;  cursor:pointer; height:54px; width:200px; text-align:center; line-height:64px;"><b>Save</b>
					</div>
					<div id="id-options-settings" onmouseover="optionsMouseOverSettings()" style="margin: auto; margin-top:6px; background:url(media/gui/buttons.png); background-size: 100% 100%;  cursor:pointer; height:54px; width:200px; text-align:center; line-height:64px;"><b>Settings</b>
					</div>
					<div id="id-options-help" onmouseover="optionsMouseOverHelp()" style="margin: auto; margin-top:6px; background:url(media/gui/buttons.png); background-size: 100% 100%;  cursor:pointer; height:54px; width:200px; text-align:center; line-height:64px;"><b>Help</b>
					</div>
					<div id="id-options-credits" onmouseover="optionsMouseOverCredits()" style="margin: auto; margin-top:6px; background:url(media/gui/buttons.png); background-size: 100% 100%;  cursor:pointer; height:54px; width:200px; text-align:center; line-height:64px;"><b>Credits</b>
					</div>
					<div id="id-options-donate" onmouseover="optionsMouseOverDonate()" style="margin: auto; margin-top:6px; background:url(media/gui/buttons.png); background-size: 100% 100%;  cursor:pointer; height:54px; width:200px; text-align:center; line-height:64px;"><b>Donate</b>
					</div>
					<div id="id-options-register" onmouseover="optionsMouseOverRegister()" style="margin: auto; margin-top:6px; background:url(media/gui/buttons.png); background-size: 100% 100%;  cursor:pointer; height:54px; width:200px; text-align:center; line-height:64px;"><b>Register</b>
					</div>
					<div id="id-options-return" onclick="toggleOptions()" onmouseover="optionsMouseOverReturn()" style="margin: auto; margin-top:30px; background:url(media/gui/buttons.png); background-size: 100% 100%;  cursor:pointer; height:64px; width:200px; text-align:center; line-height:64px;"><b>Return to Game</b>
					</div>
				</div>
				
				<div id="id-options-container3" style="position:absolute; background:url(media/gui/background_up_green.png) repeat; bottom:0px; left:230px; width:510px; height:574px; border:1px solid #003300;">
					<div id="id-options-content-new" style="display:none; margin: auto; margin-top:4px; height:54px; text-align:left; padding-left:10px; line-height:54px; border:1px solid #003300;"><span>Start game from beginning.</span>
					</div>
					<div id="id-options-content-load" style="display:none; margin: auto; margin-top:64px; height:54px;  text-align:left; padding-left:10px; line-height:54px; border:1px solid #003300;"><span>Load last saved game.</span>
					</div>
					<div id="id-options-content-save" style="display:none; margin: auto; margin-top:124px;height:54px;  text-align:left; padding-left:10px; line-height:54px; border:1px solid #003300;"><span>Save current position.</span>
					</div>
					<div id="id-options-content-settings" style="display:none; margin: auto; margin-top:184px; height:54px; text-align:left; padding-left:10px; line-height:54px; border:1px solid #003300;"><span>TODO: settings.</span>
					</div>
					<div id="id-options-content-help" style="display:none; margin: auto; margin-top:244px; height:54px; text-align:left; padding-left:10px; line-height:54px; border:1px solid #003300;"><span>For support, write to our email or facebook page.</span>
					</div>
					<div id="id-options-content-credits" style="display:none; margin: auto; margin-top:4px; height:454px;  text-align:left; padding-left:10px; border:1px solid #003300;"><span style='display: block; width:100%; text-align:center; border:0px solid white;'>Thanks to all the people who contributed the game so far:</span>
						<br><br>
						<span style='display: block; width:100%; text-align:center; border:0px solid white;'>Dragan Kurbalija</span>
						<br>
						<span style='display: block; width:100%; text-align:center; border:0px solid white;'>BirdaoGwra Basumatary</span>
					</div>
					<div id="id-options-content-donate" style="display:none; margin: auto; margin-top:364px; height:54px; text-align:left; padding-left:10px; line-height:54px; border:1px solid #003300;"><span>Nothing says I love you like 5 bucks.</span>
					</div>
					<div id="id-options-content-register" style="display:none; margin: auto; margin-top:424px; height:54px; text-align:left; padding-left:10px; line-height:54px; border:1px solid #003300;"><span>Register.</span>
					</div>
					<div id="id-options-content-return" style="position:absolute; margin: auto; bottom:0px; height:64px; text-align:left; padding-left:10px; line-height:64px; border:1px solid #003300;"><span>Game loop is paused while in options screen.</span>
					</div>
				</div>
			
			</div>
		
			<div id="id-3d-container" style="width:500px; height:500px; border:0px solid yellow;">
			
			</div>

			<div id="id-console-button" onclick="toggleConsole()" style="background:url(media/gui/console_up.png); cursor:pointer; background-size: 100% 100%; position:absolute; bottom:0px; right:0px; margin-bottom:54px; z-index:3; width:20px; height:20px; border:0px solid yellow;">
			</div>
			
			<div id="id-console-scroll" style="background:url(media/gui/scroll1.png); cursor:pointer; pointer-events: none; background-size: 100% 100%; position:absolute; bottom:0px; right:0px; width:20px; height:64px; z-index:2; border:0px solid yellow;">
			</div>
            
			<div id="id-console-text" style="background:url(media/gui/console2.png); background-size: 100% 100%; position:absolute; bottom:0px; height:64px; width:100%; text-align:left;">
				<div id="id-console-text-b-left" style=" background:url(media/gui/console-b-left.png); background-size: 100% 100%; margin-top: 0px; margin-bottom: 0px;height:64px; width:100; position:absolute; border:0px solid yellow;">
				</div>
				<div id="id-console-text-b-left" style=" background:url(media/gui/console-b-middle.png); background-size: 100% 100%; margin-left: 100px; margin-top: 0px; margin-bottom: 0px; height:64px; width:100%; position:absolute; border:0px solid red;">
				</div>
				<div id="id-console-text-b-left" style=" background:url(media/gui/console-b-right.png); background-size: 100% 100%; margin-top: 0px; margin-bottom: 0px;height:64px; width:100; position:absolute; right:0px; border:0px solid red;">
				</div>
				<div id="id-console-text-in" style=" margin-top: 10px; margin-bottom: 10px;height:44px; width:100%; position:absolute; color:yellow; overflow-y: scroll; text-align:left; border:0px solid yellow;">
					<span style="color:yellow; padding-left: 15px;">Game Initialized.</span>
				</div>
			</div>
			
			
		</div>
		
		
		
		
		<script>
		
		
		function hideAllOptionsContent()
		{
			document.getElementById('id-options-content-new').style.display='none';
			document.getElementById('id-options-content-load').style.display='none';
			document.getElementById('id-options-content-save').style.display='none';
			document.getElementById('id-options-content-help').style.display='none';
			document.getElementById('id-options-content-settings').style.display='none';
			document.getElementById('id-options-content-credits').style.display='none';
			document.getElementById('id-options-content-donate').style.display='none';
			document.getElementById('id-options-content-register').style.display='none';
			document.getElementById('id-options-content-return').style.display='none';
		}
		
		function optionsMouseOverNew()
		{
			hideAllOptionsContent();
			document.getElementById('id-options-content-new').style.display='block';
		}
		function optionsMouseOverLoad()
		{
			hideAllOptionsContent();
			document.getElementById('id-options-content-load').style.display='block';
		}
		function optionsMouseOverSave()
		{
			hideAllOptionsContent();
			document.getElementById('id-options-content-save').style.display='block';
		}
		function optionsMouseSave()
		{
			save_position();
			toggleOptions();
		}
		function optionsMouseLoad()
		{
			//ask are you sure?
			loadGame();
			toggleOptions();
		}
		function optionsMouseNew()
		{
			//are you sure? your progress will be lost.
			newGame();
			toggleOptions();
		}
		function optionsMouseOverSettings()
		{
			hideAllOptionsContent();
			document.getElementById('id-options-content-settings').style.display='block';
		}
		function optionsMouseOverHelp()
		{
			hideAllOptionsContent();
			document.getElementById('id-options-content-help').style.display='block';
		}
		function optionsMouseOverCredits()
		{
			hideAllOptionsContent();
			document.getElementById('id-options-content-credits').style.display='block';
		}
		function optionsMouseOverDonate()
		{
			hideAllOptionsContent();
			document.getElementById('id-options-content-donate').style.display='block';
		}
		function optionsMouseOverRegister()
		{
			hideAllOptionsContent();
			document.getElementById('id-options-content-register').style.display='block';
		}
		function optionsMouseOverReturn()
		{
			hideAllOptionsContent();
			document.getElementById('id-options-content-return').style.display='block';
		}
		
		function addToConsole(text,color)
		{
			var consoleDiv = document.getElementById( 'id-console-text-in' );
			consoleDiv.innerHTML += "<br><span style='  padding-left: 15px; color:"+ color +"'>"+ text +"</span>";
			consoleDiv.scrollTop = consoleDiv.scrollHeight;
		}
		
		var consoleOpened = false;
		
		function toggleConsole()
		{
			if(consoleOpened)
			{
				document.getElementById( 'id-console-button' ).style.marginBottom='54px';
				document.getElementById( 'id-console-button' ).style.transform="rotate(0deg)";
				document.getElementById( 'id-console-text' ).style.height='64px';
				document.getElementById( 'id-console-scroll' ).style.height='64px';
				document.getElementById( 'id-console-text-in' ).style.height='44px';
				document.getElementById( 'id-console-scroll' ).style.backgroundImage = "url(media/gui/scroll1.png)";
				document.getElementById( 'id-console-text' ).style.backgroundImage = "url(media/gui/console2.png)";
				consoleOpened = false;
			}
			else
			{
				document.getElementById( 'id-console-button' ).style.marginBottom='354px';
				document.getElementById( 'id-console-button' ).style.transform="rotate(180deg)";
				document.getElementById( 'id-console-text' ).style.height='364px';
				document.getElementById( 'id-console-text-in' ).style.height='344px';
				document.getElementById( 'id-console-scroll' ).style.height='364px';
				document.getElementById( 'id-console-scroll' ).style.backgroundImage = "url(media/gui/scroll1-big.png)";
				document.getElementById( 'id-console-text' ).style.backgroundImage = "url(media/gui/console-big.png)";
				consoleOpened = true;
			}
		}
		
		</script>
		
        