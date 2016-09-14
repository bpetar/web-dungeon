function level5OnLoad(levelObj)
{
	levelObj.audio_ambient = document.createElement('audio');
	var source_ambient = document.createElement('source');
	source_ambient.src = levelObj.ambient_music_file;
	levelObj.audio_ambient.appendChild(source_ambient);
	
	levelObj.audio_ambient.volume = 0.2;
	levelObj.audio_ambient.loop = true;
	levelObj.audio_ambient.play();
	console.log("lvl5");
}

function level5OnFirstLoad(levelObj)
{
	//show_speech_bubble("&nbsp;Up is good. It makes me closer to the surface.", 300, 110, 0, "url(media/speech_bubble.png)", "Lucida Console, Baskerville", "#ffffff", "300", "14px");
	console.log("first time lvl5");
}

function level5WormOnClick1()
{
	console.log("level5WormOnClick1");
}

function level5WormOnItemClick1()
{
	console.log("level5WormOnItemClick1");
}

//TODO: remove this from level js and give it to niche no?
var niche_item_offset = new THREE.Vector3(-1, -0.5, 0); //deeper, lower, sider

//props

function level5PropOnClick1()
{
	console.log("level5PropOnClick1");
	DisplayInfoDiv("These traps were set right beneath the battlefield.");
}

function level5PropOnClick2()
{
	console.log("level5PropOnClick2");
	DisplayInfoDiv("Who set this up? The worms? Surely not the worms!");
}