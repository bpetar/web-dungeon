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

var IDLE_ANIM_DURATION = 3300;
var MONSTER_ATTACK_FRAME = 40;

var niche_item_offset = new THREE.Vector3(-1, -0.5, 0); //deeper, lower, sider
