

// niches and their content..
var niche_pickables_array1 = [[1,"healing","models/healing.js", "media/potion.png"], [2,"holy symbol","models/tost.js", "media/holy.png"]];// id, name, model, icon
var niche_pickables_array2 = [[1,"healing","models/healing.js", "media/potion.png"], [2,"healing","models/healing.js", "media/potion.png"], [3,"healing","models/healing.js", "media/potion.png"]];// id, name, model, icon
var nicheArr = [[2,5,0,niche_pickables_array1], [4,1,1,niche_pickables_array2]]; //x,z,rot,content

//load all niche pickables content
function loadNiches() {
	//nicheArr
	for(var n=0; n<nicheArr.length; n++)
	{
		var loader = new THREE.JSONLoader();
		var niche_pickables = nicheArr[n][3];
		for(var i=0; i<niche_pickables.length; i++) {
			var picki = create_game_object();
			picki.gameID = niche_pickables[i][0];
			picki.name = niche_pickables[i][1];
			picki.model = niche_pickables[i][2];
			mover = -1+i/2;
			
			//check niche position and place pickable in it accordingly
			if(nicheArr[n][2] == 0)
			{
				//front niche
				picki.position.x = nicheArr[n][0]*SQUARE_SIZE+mover;
				picki.position.z = nicheArr[n][1]*SQUARE_SIZE+6;
				picki.position.y = 4.0;
			}
			else if(nicheArr[n][2] == 3)
			{
				//left niche
				picki.position.x = nicheArr[n][0]*SQUARE_SIZE+6;
				picki.position.z = nicheArr[n][1]*SQUARE_SIZE+mover;
				picki.position.y = 4.0;
			}
			else if(nicheArr[n][2] == 1)
			{
				//right niche
				picki.position.x = nicheArr[n][0]*SQUARE_SIZE-6;
				picki.position.z = nicheArr[n][1]*SQUARE_SIZE+mover;
				picki.position.y = 4.0;
			}
			else if(nicheArr[n][2] == 2)
			{
				//back niche
				picki.position.x = nicheArr[n][0]*SQUARE_SIZE+mover;
				picki.position.z = nicheArr[n][1]*SQUARE_SIZE-6;
				picki.position.y = 4.0;
			}
			
			picki.icon = niche_pickables[i][3];
			picki.niched = n; //flag indicating if pickable is in the niche
			
			loader.load( picki.model, picki.loadObject(picki) );
			
			//add to array of all pickables on the map
			array_of_pickables.push(picki);
		}
	}
}

//add item to niche
function add_to_niche (nicheID, gObject) {

	//get niche from niche_array using nicheID
	var niche_pickables = nicheArr[nicheID][3];
	
	// ...
	
	//niche.content_array.push(gObject);
	
}

//add item to niche
function remove_from_niche (gObject) {

	//get niche pickables
	var niche_pickables = nicheArr[gObject.niched][3];
	for(var i=0; i<niche_pickables.length; i++) {
		if(niche_pickables[i][0] == gObject.gameID)
		{
			//alert("removed from niche!");
			niche_pickables.splice(i,1);
			return;
		}
	}
}

function niche_clicked_in(x_pos,y_pos) {
	//check if player is facing niche first
	
	//calculate position of mouse click within the niche
	
	return true;
}





