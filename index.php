	<div id="gui" style="min-height:650px; min-width:950px; height:100%; width:100%; display:table;">
	
		<div id="gui_left" style="position:relative; background: url(media/gui/background_up_green.png); display:table-cell; border-spacing:0px; height:100%; width:200px;">
        
            <div id="profiles" style="display:block; width:100%;">
            
                <div style="width:100%; height:4px">.
                </div>
                
                
                <div id="player1" style="background: url(media/gui/profile.png) no-repeat; width:192px; height:200px; margin-left:4px;">
                
                    <div style="width:100%; height:8px; border:0px solid white;">
                    </div>
                    
                    <div style="width:100%; height:156px; border:0px solid yellow; margin-left:6px;">
                        <div id="player1-face" style="float:left; width:84px; height:156px; border:0px solid blue; cursor:pointer; background:rgba(211,139,0,0.2);"> </div>
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

		<div id="gui_center" style="position:relative; display:table-cell; height:100%;">

			<div id="container" style="background:url(media/gui/3dview.png); position:absolute; top:0; bottom:0; margin-bottom:64px; width:100%; border:1px solid black;">
			</div>

            <div id="container" onclick="{console.log('perap'); this.style.marginBottom='354px'; document.getElementById('console').style.height='364px';}" style="background:url(media/gui/console_up.png); cursor:pointer; background-size: 100% 100%; position:absolute; bottom:0px; right:20px; margin-bottom:54px; z-index:2; width:30px; height:30px; border:0px solid yellow;">
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
        
		<div id="gui_right" style="position:relative; display:table-cell; background: url(media/gui/background_up_green.png); border:1px solid black; width:208px; height:100%;">
        
            <div style="width:192px; height:8px; margin-left:6px; border:0px solid yellow;">.
			</div>
            
            <div id="player1-inventory" style="background: url(media/gui/slot.png); width:192px; height:192px; margin-left:6px;">
			</div>
            
            <div style="width:192px; margin-left:6px; height:8px;">
			</div>
            
            <div id="player2-inventory" style="background: url(media/gui/root.png); border:1px solid yellow; width:192px; height:192px; display:none;">
			</div>
            
            <div style="background: url(media/gui/background.png); border:1px solid red; width:192px; height:8px; display:none;">
			</div>
                
			<div id="map" style="background:url(media/gui/background.png); position:absolute; bottom:0px; height:64px; width:100%;">
                <div id="special_slot1" style="float:left; margin-right:2px; margin-left:4px; background: url(media/gui/slot1.png) no-repeat; width:64px; height:64px"></div>
                <div id="special_slot2" style="float:left; margin-right:2px; margin-left:2px; background: url(media/gui/slot1.png) no-repeat; width:64px; height:64px"></div>
                <div id="special_slot3" style="float:left; margin-right:4px; margin-left:2px; background: url(media/gui/slot1.png) no-repeat; width:64px; height:64px"></div>
			</div>
		</div>
	</div>
		
