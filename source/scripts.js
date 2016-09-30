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

function copy_game_quirks(gq1, gq2)
{
	gq1.q1 = gq2.q1;
	gq1.q2 = gq2.q2;
	gq1.q3 = gq2.q3;
	gq1.q4 = gq2.q4;
	gq1.q5 = gq2.q5;
	gq1.q6 = gq2.q6;
	gq1.q7 = gq2.q7;
	gq1.q8 = gq2.q8;
	gq1.q9 = gq2.q9;
	gq1.q10 = gq2.q10;
}

function script_showScroll_lvl3_map()
{
	console.log("Showing scroll content 3!");
	audio_scroll.play();
	show_message(" <img src='maps/level3/media/map3.png' style='max-width:100%; max-height:30%;'><br><br> <div id='info_dialog_button' style='cursor: pointer; width:85px; height: 25px; padding-top:3px; position:absolute; right:20%; bottom:9%; background: #00c url(media/button_scroll.png); background-size: 100% 100%;' onclick='hide_message();'> Ok </button>", "fit3d", "fit3d", "url(media/scroll.png)", "Papyrus, Garamond, Baskerville", "#001100", "800", "20px");
}

function script_showScroll_lvl5_map()
{
	console.log("Showing scroll content 5!");
	audio_scroll.play();
	show_message(" <img src='maps/level5/media/map5.png' style='max-width:100%; max-height:30%;'><br><br> <div id='info_dialog_button' style='cursor: pointer; width:85px; height: 25px; padding-top:3px; position:absolute; right:20%; bottom:9%; background: #00c url(media/button_scroll.png); background-size: 100% 100%;' onclick='hide_message();'> Ok </button>", "fit3d", "fit3d", "url(media/scroll.png)", "Papyrus, Garamond, Baskerville", "#001100", "800", "20px");
}

function script_showScroll_lvl6_map()
{
	console.log("Showing scroll content 6!");
	audio_scroll.play();
	show_message(" <img src='maps/level6/media/map6.png' style='max-width:100%; max-height:30%;'><br><br> <div id='info_dialog_button' style='cursor: pointer; width:85px; height: 25px; padding-top:3px; position:absolute; right:20%; bottom:9%; background: #00c url(media/button_scroll.png); background-size: 100% 100%;' onclick='hide_message();'> Ok </button>", "fit3d", "fit3d", "url(media/scroll.png)", "Papyrus, Garamond, Baskerville", "#001100", "800", "20px");
}

function script_showScroll_lvl7_map()
{
	console.log("Showing scroll content 7!");
	audio_scroll.play();
	show_message(" <img src='maps/level7/media/map7.png' style='max-width:100%; max-height:30%;'><br><br> <div id='info_dialog_button' style='cursor: pointer; width:85px; height: 25px; padding-top:3px; position:absolute; right:20%; bottom:9%; background: #00c url(media/button_scroll.png); background-size: 100% 100%;' onclick='hide_message();'> Ok </button>", "fit3d", "fit3d", "url(media/scroll.png)", "Papyrus, Garamond, Baskerville", "#001100", "800", "20px");
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



function script_CombineItems(item1, item2)
{
	//ground rock and rope
	if(((item1.itemID == 12)&&(item2.itemID == 5))||((item1.itemID == 5)&&(item2.itemID == 12)))
	{
		//consume ingredients
		inventory_item_remove(item2);
			//safe to remove from scene
			item2.mesh.noremove = false;
			item1.mesh.noremove = false;

		//make a rock on the rope thingy
		var picki = load_item_by_id(18, "gui"); //18 is item id of rock and rope item
		//picki.visible = false;
		//currentlevelObj.array_of_pickables.push(picki);
		pickable_at_hand = picki;
		pickable_at_hand_icon = document.getElementById("pickable_at_hand_id");
		pickable_at_hand_icon.src = picki.icon;

		audio_win1.play();
		DisplayInfoDiv("Successful combine of these two items!");
		return;
	}

	//stick and rope
	if(((item1.itemID == 12)&&(item2.itemID == 3))||((item1.itemID == 3)&&(item2.itemID == 12)))
	{
		//consume ingredients
		inventory_item_remove(item2);
			//safe to remove from scene
			item2.mesh.noremove = false;
			item1.mesh.noremove = false;

		//make a rock on the rope thingy
		var picki = load_item_by_id(19, "gui"); //19 is item id of stick and rope
		//picki.visible = false;
		//currentlevelObj.array_of_pickables.push(picki);
		pickable_at_hand = picki;
		pickable_at_hand_icon = document.getElementById("pickable_at_hand_id");
		pickable_at_hand_icon.src = picki.icon;

		audio_win1.play();
		DisplayInfoDiv("Successful combine of these two items!");
		return;
	}

	//stick and rope and then ground rock
	if(((item1.itemID == 19)&&(item2.itemID == 5))||((item1.itemID == 5)&&(item2.itemID == 19)))
	{
		//consume ingredients
		inventory_item_remove(item2);
			//safe to remove from scene
			item2.mesh.noremove = false;
			item1.mesh.noremove = false;

		//make a rock on the rope thingy
		var picki = load_item_by_id(20, "gui"); //20 is item id of stick and rope and rock
		//picki.visible = false;
		//currentlevelObj.array_of_pickables.push(picki);
		pickable_at_hand = picki;
		pickable_at_hand_icon = document.getElementById("pickable_at_hand_id");
		pickable_at_hand_icon.src = picki.icon;

		audio_win1.play();
		DisplayInfoDiv("Successful combine of these two items!");
		return;
	}

	//rock and rope and then stake
	if(((item1.itemID == 18)&&(item2.itemID == 3))||((item1.itemID == 3)&&(item2.itemID == 18)))
	{
		//consume ingredients
		inventory_item_remove(item2);
			//safe to remove from scene
			item2.mesh.noremove = false;
			item1.mesh.noremove = false;

		//make a rock on the rope thingy
		var picki = load_item_by_id(20, "gui"); //20 is item id of stick and rope and rock
		//picki.visible = false;
		//currentlevelObj.array_of_pickables.push(picki);
		pickable_at_hand = picki;
		pickable_at_hand_icon = document.getElementById("pickable_at_hand_id");
		pickable_at_hand_icon.src = picki.icon;

		audio_win1.play();
		DisplayInfoDiv("Successful combine of these two items!");
		return;
	}

	DisplayInfoDiv("Can't combine these two items..");

}
