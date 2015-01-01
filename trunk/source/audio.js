
//audio

function init_audio()
{
	audio = document.createElement('audio');
	var source = document.createElement('source');
	source.src = 'media/thud.mp3';
	audio.appendChild(source);
	
	plate_click_audio = document.createElement('audio');
	var sourcep = document.createElement('source');
	sourcep.src = 'media/plate.mp3';
	plate_click_audio.appendChild(sourcep);
	
	plate_unclick_audio = document.createElement('audio');
	var sourcep = document.createElement('source');
	sourcep.src = 'media/plate_reverse.mp3';
	plate_unclick_audio.appendChild(sourcep);
	
	button_click_audio = document.createElement('audio');
	var sourceb = document.createElement('source');
	sourceb.src = 'media/button.mp3';
	button_click_audio.appendChild(sourceb);
	
	audio_lock_unlock = document.createElement('audio');
	var sourcel = document.createElement('source');
	sourcel.src = 'media/lock.mp3';
	audio_lock_unlock.appendChild(sourcel);
	
	audio_chest_open = document.createElement('audio');
	var sourcec = document.createElement('source');
	sourcec.src = 'media/chest.mp3';
	audio_chest_open.appendChild(sourcec);
	
	audio_player_death = document.createElement('audio');
	var source_apd = document.createElement('source');
	source_apd.src = 'media/death.mp3';
	audio_player_death.appendChild(source_apd);
	
	audio_miss = document.createElement('audio');
	var source_miss = document.createElement('source');
	source_miss.src = 'media/miss.mp3';
	audio_miss.appendChild(source_miss);

	audio_ngh = document.createElement('audio');
	var source_ngh = document.createElement('source');
	source_ngh.src = 'media/ngh.mp3';
	audio_ngh.appendChild(source_ngh);

	audio_cling = document.createElement('audio');
	var source_cling = document.createElement('source');
	source_cling.src = 'media/cling.mp3';
	audio_cling.appendChild(source_cling);

	audio_click = document.createElement('audio');
	var source_click = document.createElement('source');
	source_click.src = 'media/click.mp3';
	audio_click.appendChild(source_click);

	audio_click2 = document.createElement('audio');
	var source_click2 = document.createElement('source');
	source_click2.src = 'media/click2.mp3';
	audio_click2.appendChild(source_click2);

	audio_drop = document.createElement('audio');
	var source_drop = document.createElement('source');
	source_drop.src = 'media/drop.mp3';
	audio_drop.appendChild(source_drop);

	audio_drop_rock = document.createElement('audio');
	var source_drop_rock = document.createElement('source');
	source_drop_rock.src = 'media/drop_rock.mp3';
	audio_drop_rock.appendChild(source_drop_rock);

	
	audio_door = document.createElement('audio');
	var source_door = document.createElement('source');
	source_door.src = 'media/door.mp3';
	if(typeof door_audio != 'undefined') source_door.src = door_audio;
	audio_door.appendChild(source_door);
	
	audio_scroll = document.createElement('audio');
	var source_scroll = document.createElement('source');
	source_scroll.src = 'media/scroll.mp3';
	audio_scroll.appendChild(source_scroll);
	
	audio_win1 = document.createElement('audio');
	var source_win1 = document.createElement('source');
	source_win1.src = 'media/win1.mp3';
	audio_win1.appendChild(source_win1);
	
	audio_win2 = document.createElement('audio');
	var source_win2 = document.createElement('source');
	source_win2.src = 'media/win2.mp3';
	audio_win2.appendChild(source_win2);

	audio_enchant = document.createElement('audio');
	var source_enchant = document.createElement('source');
	source_enchant.src = 'media/enchant.mp3';
	audio_enchant.appendChild(source_enchant);

	audio_fanfare = document.createElement('audio');
	var source_fanfare = document.createElement('source');
	source_fanfare.src = 'media/victory_fanfare.mp3';
	audio_fanfare.appendChild(source_fanfare);
	
	audio_ambient = document.createElement('audio');
	var source_ambient = document.createElement('source');
	source_ambient.src = ambient_music_file;
	audio_ambient.appendChild(source_ambient);
	
	audio_ambient.volume = 0.4;
	audio_ambient.play();
}
