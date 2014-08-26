<?php 

?>

    
		<div id="gui_center" style="position:relative; float:left; width:500px; height:100%;">

			<div id="id-3d-container" style="width:500px; height:500px; border:1px solid yellow;">
			</div>

			<div id="id-console-button" onclick="toggleConsole()" style="background:url(media/gui/console_up.png); cursor:pointer; background-size: 100% 100%; position:absolute; bottom:0px; right:20px; margin-bottom:54px; z-index:2; width:30px; height:30px; border:0px solid yellow;">
			</div>
            
			<div id="id-console-text" style="background:url(media/gui/background.png); position:absolute; bottom:0px; color:yellow; height:64px; width:100%; overflow-y: scroll; text-align:left;">
            <span style="color:yellow;">Game Initialized.</span><br>
			</div>
		</div>
		
		
		
		
		<script>
		
		function addToConsole(text,color)
		{
			document.getElementById( 'id-console-text' ).innerHTML = "<span style='color:"+ color +"'>"+ text +"</span><br>" + document.getElementById( 'id-console-text' ).innerHTML;
		}
		
		var consoleOpened = false;
		
		function toggleConsole()
		{
			if(consoleOpened)
			{
				document.getElementById( 'id-console-button' ).style.marginBottom='54px';
				document.getElementById( 'id-console-button' ).style.transform="rotate(0deg)";
				document.getElementById( 'id-console-text' ).style.height='64px';
				consoleOpened = false;
			}
			else
			{
				document.getElementById( 'id-console-button' ).style.marginBottom='354px';
				document.getElementById( 'id-console-button' ).style.transform="rotate(180deg)";
				document.getElementById( 'id-console-text' ).style.height='364px';
				consoleOpened = true;
			}
		}
		
		</script>
		
        