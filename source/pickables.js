
//this goes in the map file:

function healingScript()
{
	playerHPcurrent += 15;
	if (playerHPcurrent > playerHPmax)
	{
		playerHPcurrent = playerHPmax;
	}
}

// id, name, model, x, z, icon, useage hint, use script, consumable
var pickables_array = [[2,"rock","models/rocky.js", 12,2, "media/rock.png", "This is too hard to chew.."], [3,"healing","models/healing.js", 9,0, "media/potion.png", "Healing potion replenishes 15 hp!", healingScript, 1]];



//this stays in the file:

//this is array of pickables on the ground, but also of those lying in the niches (added in niche.js)
var array_of_pickables = [];

//load pickable 3d models on the map
function load_pickables () {

	var loader = new THREE.JSONLoader();
	
	for(var i=0; i<pickables_array.length; i++) {
		var picki = create_game_object();
		picki.gameID = pickables_array[i][0];
		picki.name = pickables_array[i][1];
		picki.model = pickables_array[i][2];
		picki.position.x = pickables_array[i][3]*SQUARE_SIZE+2;
		picki.position.z = pickables_array[i][4]*SQUARE_SIZE+4;
		picki.position.y = 0;
		picki.icon = pickables_array[i][5];
		picki.useHint = pickables_array[i][6];
		if(pickables_array[i].length>7)
		{
			console.log("pickable script function being loaded: " + picki.name);
			picki.useScript = pickables_array[i][7];
		}
		if(pickables_array[i].length>8)
		{
			picki.consumable = (pickables_array[i][8] == 1)?true:false;
		}
		picki.niched = -1; //flag indicating if pickable is in the niche

		loader.load( picki.model, picki.loadObject(picki) );
		
		array_of_pickables.push(picki);
	}

}
