
function level3OnLoad(levelObj)
{
	levelObj.audio_ambient = document.createElement('audio');
	var source_ambient = document.createElement('source');
	source_ambient.src = levelObj.ambient_music_file;
	levelObj.audio_ambient.appendChild(source_ambient);
	
	levelObj.audio_ambient.volume = 0.2;
	levelObj.audio_ambient.loop = true;
	levelObj.audio_ambient.play();
}

function level3OnFirstLoad(levelObj)
{
}

//level specific functions

function propOnClick1()
{
	show_speech_bubble("&nbsp;I was lucky to stay alive after falling on these spikes from above! <br><br> &nbsp;Few bruises and scratches.. that's all.", 300, 110, 0, "url(media/speech_bubble.png)", "Lucida Console, Baskerville", "#ffffff", "300", "14px");
	audio_click.currentTime = 0;
	audio_click.play();
}

function propOnClick2()
{
	if(Math.random()>0.5)DisplayInfoDiv("Many have died on these traps..");
	else show_speech_bubble("&nbsp;Day light from above and blood on these spikes means someone fell into this trap, but where is the body?", 300, 110, 0, "url(media/speech_bubble.png)", "Lucida Console, Baskerville", "#ffffff", "300", "14px");
	audio_click.currentTime = 0;
	audio_click.play();
}

function propOnClick3()
{
	if(monsterEncountered)
	{
		show_speech_bubble("&nbsp;Its seems like these tunnels are dug out recently by these worms, but.. holes and traps are directly under battlefield, its way too convenient to be accidental.. and why am I in my underwear? ", 300, 110, 0, "url(media/speech_bubble.png)", "Lucida Console, Baskerville", "#dddd70", "300", "14px");	
	}
	else
	{
		DisplayInfoDiv("I cant climb up there..");
	}
	audio_click.currentTime = 0;
	audio_click.play();
}

function propOnClick4()
{
	DisplayInfoDiv("Sharp sticks..");
	audio_click.currentTime = 0;
	audio_click.play();
}

function propOnClick5()
{
	show_speech_bubble("&nbsp;Rocks!...Rocks everywhere! ", 300, 110, 0, "url(media/speech_bubble.png)", "Lucida Console, Baskerville", "#dddd70", "300", "14px");
	audio_click.currentTime = 0;
	audio_click.play();	
}

function propOnClick6()
{
	console.log("swing a chaino");
	addToConsole("Nothing seems to happen..","gray");
	this.animAudio.currentTime = 0;
	this.animAudio.play();
	this.mesh.duration = this.animDuration;
	this.mesh.setFrameRange(this.animStart,this.animStop);
	this.animateFlag = true;
}

function propOnClick7()
{
	addToConsole("Hm... weird device..","gray");
}



var monsterEncountered = false;

function WormOnClick1()
{
	DisplayInfoDiv("Its squishy and slimy.");
	monsterEncountered = true;
	//Play tounchy sound
	this.audio_monster_click.currentTime = 0;
	this.audio_monster_click.play();
}

function WormOnItemClick1()
{
	DisplayInfoDiv("He doesn't need that.");
	//Play tounchy sound
	this.audio_monster_click.currentTime = 0;
	this.audio_monster_click.play();
}

function monsterPun()
{
	if(game_quirks.q1 == 0)
	{
		show_speech_bubble("&nbsp;This was nice <span style='font-style: italic;'>worm</span> up :)", 300, 110, 0, "url(media/speech_bubble.png)", "Lucida Console, Baskerville", "#ffffff", "300", "14px");	
		game_quirks.q1 = 1;
	}
}

var niche_item_offset = new THREE.Vector3(-1, -0.5, 0); //deeper, lower, sider
