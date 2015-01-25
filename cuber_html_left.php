<?php 

?>

   		<div id="gui_left" style="position:relative; float:left; background: url(media/gui/background_up_green.png); border-spacing:0px; height:100%; width:200px;">
        
            <div id="profiles" style="display:block; width:100%;">
            
                <div style="width:100%; height:4px">.
                </div>
                
                
                <div id="player1" style="background: url(media/gui/profile.png) no-repeat; width:192px; height:200px; margin-left:4px;">
                
                    <div style="width:100%; height:8px; border:0px solid white;">
                    </div>
                    
                    <div style="width:100%; height:156px; border:0px solid yellow; margin-left:6px;">
                        <div id="player1-face" onclick="toggleCharHud()" style="float:left; width:84px; height:156px; border:0px solid blue; cursor:pointer; background:rgba(211,139,0,0.2);"> 
							<div id="player_wound" style="font-size:20px; font-weight:bold; color: #001100; padding-top:18px; padding-left:8px; position:absolute; left:5px; top:5px;  height:40px; width:80px; background: url(media/wound.png); background-size: 100% 100%;">
							13
							</div>
						</div>
                        <div id="player1-hands" style="float:left; width:92px; height:156px; border:0px solid green;" > 
                            <div id="player1-health" style="width:83px; height:16px; border:1px solid green; margin-left:4px; margin-top:6px; background:rgba(2,139,0,0.4);" > </div>
                            <div id="player1-hand-l" style="width:92px; height:64px; border:0px solid blue;" > 
                                <div id="player1-hand-l-main" style="float:left; width:72px; height:64px; border:0px solid yellow; background: url(media/lhand.png) no-repeat; background-size: 100% 100%;" > </div>
                                <div id="player1-hand-l-ext" style="float:left; width:20px; height:64px; border:0px solid red;" > </div>
                            </div>
                            <div id="player1-hand-r" style="width:92px; height:64px; border:0px solid red;" > 
                                <div id="player1-hand-r-main" style="float:left; width:72px; height:64px; border:0px solid yellow; background: url(media/rhand.png) no-repeat; background-size: 100% 100%;" > </div>
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

			<div id="options" onclick="toggleOptions()" style="background:url(media/gui/buttons.png); background-size: 100% 100%; position:absolute; bottom:0px; cursor:pointer; height:64px; width:100%; text-align:center; line-height:64px;"><b>OPTIONS</b>
			</div>
            
		</div>
		
		
		<script>
		
		var optionsOpened = false;
		var characterHudOpened = false;
		
		function toggleCharHud()
		{
			audio_click.currentTime = 0;
			audio_click.play();
			if(characterHudOpened)
			{
				document.getElementById('id-character-screen-container').style.display='none';
				characterHudOpened = false;
			}
			else
			{
				document.getElementById('id-character-screen-container').style.display='block';
				characterHudOpened = true;
			}
		}
		
		function toggleOptions()
		{
			if(optionsOpened)
			{
				document.getElementById( 'id-options-container' ).style.display='none';
				
				optionsOpened = false;
			}
			else
			{
				document.getElementById( 'id-options-container' ).style.display='block';
				optionsOpened = true;
			}
		}

		
		</script>
		
        