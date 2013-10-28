

// niches and their content..


//this goes to map file
///////////////////////////////////////////////////////////////////////////////////////////////

// id, name, model, icon
var niche_pickables_array1 = [[4,"holy symbol","models/tost.js", "media/holy.png"]];
var niche_pickables_array2 = [];
var niche_pickables_array3 = [];
var niche_pickables_array4 = [];

//var niche_pickables_array2 = [[1,"healing","models/healing.js", "media/potion.png"], [2,"healing","models/healing.js", "media/potion.png"], [3,"healing","models/healing.js", "media/potion.png"]];// id, name, model, icon

//x,z,rot,content, script, open, script func niche_onItemAdd
var nicheArr = [[3,5,1,niche_pickables_array1], [20,11,0,niche_pickables_array2, 1, niche_onItemAdd], [20,11,3,niche_pickables_array3, 1, niche_onItemAdd], [20,11,2,niche_pickables_array4, 1, niche_onItemAdd]]; 

NICHES_CLOSED = 0;

function niche_onItemAdd (nicheID, itemID)
{
	//change state to closed
	nicheArr[nicheID][4] = 0;
	
	//draw wall over niche
	
	NICHES_CLOSED++;
	
	if (NICHES_CLOSED == 3)
	{
		//open portal...
		console.log("open portal...");
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////

//this stays in niche.js

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
	var index = niche_pickables.length;
	niche_pickables[index] = new Array();
	
	niche_pickables[index][0] = gObject.gameID;
	niche_pickables[index][1] = gObject.name;
	niche_pickables[index][2] = gObject.model;
	niche_pickables[index][3] = gObject.icon;
	
	//if there is script function for adding item, call it
	if(nicheArr[nicheID].length>5)
	{
		var onItemAdd = nicheArr[nicheID][5];
		onItemAdd(nicheID, gObject.gameID);
	}


	var mover = -1+index/2;
	//draw model in niche here
	//check niche position and place pickable in it accordingly
			if(nicheArr[nicheID][2] == 0)
			{
				//front niche
				gObject.mesh.position.x = nicheArr[nicheID][0]*SQUARE_SIZE+mover;
				gObject.mesh.position.z = nicheArr[nicheID][1]*SQUARE_SIZE+6;
			}
			else if(nicheArr[nicheID][2] == 3)
			{
				//left niche
				gObject.mesh.position.x = nicheArr[nicheID][0]*SQUARE_SIZE+6;
				gObject.mesh.position.z = nicheArr[nicheID][1]*SQUARE_SIZE+mover;
			}
			else if(nicheArr[nicheID][2] == 1)
			{
				//right niche
				gObject.mesh.position.x = nicheArr[nicheID][0]*SQUARE_SIZE-6;
				gObject.mesh.position.z = nicheArr[nicheID][1]*SQUARE_SIZE+mover;
			}
			else if(nicheArr[nicheID][2] == 2)
			{
				//back niche
				gObject.mesh.position.x = nicheArr[nicheID][0]*SQUARE_SIZE+mover;
				gObject.mesh.position.z = nicheArr[nicheID][1]*SQUARE_SIZE-6;
			}
			
	gObject.mesh.position.y = 4.0;
	gObject.mesh.visible = true;

	
}

//add item to niche
function remove_from_niche (gObject) {

	//get niche pickables
	var niche_pickables = nicheArr[gObject.niched][3];
	for(var i=0; i<niche_pickables.length; i++) {
		if(niche_pickables[i][0] == gObject.gameID)
		{
			niche_pickables.splice(i,1);
			return;
		}
	}
}

//check if player clicked in niche
function niche_clicked_in(x_pos,y_pos) {
	//check if player is facing niche first
	for(var n=0; n<nicheArr.length; n++)
	{
		if((current_position.x == nicheArr[n][0])&&(current_position.z == nicheArr[n][1]))
		{
			//standing in niche position, now lets check facing..
			var looker = new THREE.Vector3(0, 0, 0).add(camera.look);
			looker.sub(camera.position);
			if (looker.x > 0) {
				//facing left
				if(nicheArr[n][2] == 3)
					return n;
			} else if (looker.x < 0) {
				//facing right
				if(nicheArr[n][2] == 1)
					return n;
			} else if (looker.z < 0) {
				//facing back
				if(nicheArr[n][2] == 2)
					return n;
			} else if (looker.z > 0) {
				//facing front
				if(nicheArr[n][2] == 0)
					return n;
			}
			
		}
	}
	
	//calculate position of mouse click within the niche
	
	return -1;
}





