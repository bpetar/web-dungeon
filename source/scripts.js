//pickable (and other?) scripts

function script_showScroll_lvl3_map()
{
	console.log("Showing scroll content!");
	audio_scroll.play();
	show_message(" <br> " + "Section C3" + " <br><br><img src='maps/level3/media/map3.png'><br><br> <button id='info_dialog_button' style='cursor: pointer; width:134px; height: 34px; background: #00c url(media/button_scroll.png); background-size: 100% 100%;' onclick='hide_message();'> Ok </button>", 700, 700, "url(media/scroll.png)", "Papyrus, Garamond, Baskerville", "#001100", "800", "20px");
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
	playerHPcurrent += 15;
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
