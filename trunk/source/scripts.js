//pickable (and other?) scripts

function script_showScroll_lvl3_map()
{
	console.log("Showing scroll content!");
	audio_scroll.play();
	show_message(" <img src='maps/level3/media/map3.png' style='max-width:100%; max-height:30%;'><br><br> <div id='info_dialog_button' style='cursor: pointer; width:85px; height: 25px; padding-top:3px; position:absolute; right:20%; bottom:9%; background: #00c url(media/button_scroll.png); background-size: 100% 100%;' onclick='hide_message();'> Ok </button>", "fit3d", "fit3d", "url(media/scroll.png)", "Papyrus, Garamond, Baskerville", "#001100", "800", "20px");
}

function script_showScroll_lvl2_msg()
{
	console.log("Showing scroll content!");
	audio_scroll.play();
	show_message(" <br> " + "The world built on dreams reaches for the dreams built in this world. Are you in a dream?" + " <br><br> <button id='info_dialog_button' style='cursor: pointer; width:134px; height: 34px; background: #00c url(media/button_scroll.png); background-size: 100% 100%;' onclick='hide_message();'> Ok </button>", 600, 300, "url(media/scroll.png)", "Papyrus, Garamond, Baskerville", "#001100", "600", "25px");
}

function script_showScroll_lvl1_msg()
{
	console.log("Showing scroll content!");
	audio_scroll.play();
	show_message(" <br> " + "Search the walls.." + " <br><br><br> <button id='info_dialog_button' style='cursor: pointer; width:134px; height: 34px; background: #00c url(media/button_scroll.png); background-size: 100% 100%;' onclick='hide_message();'> Ok </button>", 600, 300, "url(media/scroll.png)", "Papyrus, Garamond, Baskerville", "#001100", "800", "20px");
}

function script_rootHealingScript()
{
	playerHPcurrent += 5;
	if (playerHPcurrent > playerHPmax)
	{
		playerHPcurrent = playerHPmax;
	}
	updatePlayerHealthBar();
}

function script_healingScript()
{
	playerHPcurrent += 15;
	if (playerHPcurrent > playerHPmax)
	{
		playerHPcurrent = playerHPmax;
	}
	updatePlayerHealthBar();	
}
