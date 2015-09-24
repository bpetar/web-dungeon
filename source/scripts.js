//pickable (and other?) scripts

//game quirks
var game_quirks = {};
game_quirks.q1 = 0; // monster pun: worm up
game_quirks.q2 = 0; // inventory glow
game_quirks.q3 = 0; // weapon hands glow
game_quirks.q4 = 0;
game_quirks.q5 = 0;
game_quirks.q6 = 0;
game_quirks.q7 = 0;
game_quirks.q8 = 0;
game_quirks.q9 = 0;
game_quirks.q10 = 0;

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
	audio_root.play();
	audio_win2.play();
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
