
function level1OnLoad(levelObj)
{
	//info_dialog_div.style.display = "inline";
	console.log("levelObj.audio_ambient: " + levelObj.audio_ambient);
	levelObj.audio_ambient = document.createElement('audio');
	var source_ambient = document.createElement('source');
	source_ambient.src = levelObj.ambient_music_file;
	levelObj.audio_ambient.appendChild(source_ambient);
	
	levelObj.audio_ambient.volume = 0.5;
	levelObj.audio_ambient.loop = false;
	levelObj.audio_ambient.play();
}

function level1OnFirstLoad()
{
	//info_dialog_div.style.display = "inline";
}


//monsters
var IDLE_ANIM_DURATION = 3300;
var MONSTER_ATTACK_FRAME = 40;

//on click script functions
function level1MonsterOnClick1()
{
	if(this.mood == MONSTER_MAD)
	{
		DisplayInfoDiv("It seems angry..");
		//Play tounchy mad sound
		this.audio_monster_click.play();
	}
	else
	{
		DisplayInfoDiv("It seems demotivated..");
		//Play tounchy sound
		this.audio_monster_click.play();
	}
}

function level1MonsterOnItemClick1(pickable)
{
	DisplayInfoDiv("It doesn't want to take it..");
	// soundy Play tounchy mad sound
	this.audio_monster_click.play();
	return false;
}

function level1OnKeyClick()
{
	console.log("gold key to open door");
	
	openDoor(currentlevelObj.array_of_doors[2]);

	//temp hack
	//load_teleport();
}

function level1OnPressButton1()
{
	console.log("button to open door");
	
	openDoor(currentlevelObj.array_of_doors[1]);
}

function level1OnPressPlate1()
{
	console.log("plate to open dooor");

	openDoor(currentlevelObj.array_of_doors[0]);
}

function level1OnUnpressPlate1()
{
	console.log("plate to close door");
	closeDoor(currentlevelObj.array_of_doors[0]);
}

