
//props are object on the map that may block the passage, trigger some action when clicked, or just look nice
//example: table, statue, fountain, ...

//load props 3d models on the map
function load_props(loader,levelObj) 
{
	if(typeof levelObj.propsArr != 'undefined')
	{
		for(var i=0; i<levelObj.propsArr.length; i++) 
		{
			// id, model, x, z, pressed, script function..
			var propsy = create_game_object();
			propsy.gameID = levelObj.propsArr[i][0];
			propsy.name = "prop" + i;
			propsy.model = levelObj.propsArr[i][4];
			propsy.map_position.set((levelObj.propsArr[i][1]),0,(levelObj.propsArr[i][2]));
			propsy.position.set((levelObj.propsArr[i][1])*SQUARE_SIZE,0,(levelObj.propsArr[i][2])*SQUARE_SIZE);
			propsy.rotation.set(0, levelObj.propsArr[i][3]*Math.PI/2, 0);
			
			//get js function from string
			var onPressFn = window[levelObj.propsArr[i][5]];
			if(typeof onPressFn === 'function') 
			{
				propsy.onPressFunc = onPressFn;
			}
			else
			{
				propsy.onPressFunc = missing_click_function;
			}
			
			if(levelObj.propsArr[i].length>8)
			{
				//fine tuning position
				propsy.position.x += levelObj.propsArr[i][6];
				propsy.position.y += levelObj.propsArr[i][7];
				propsy.position.z += levelObj.propsArr[i][8];
			}
			
			//loader.load( propsy.model, propsy.loadObject(propsy) );
			loadGameObjectCheck(loader, propsy);
			
			levelObj.array_of_props.push(propsy);
		}
	}
}

function load_animated_props(loader,levelObj)
{
	if(typeof levelObj.animatedPropsArr != 'undefined')
	{
		for(var i=0; i<levelObj.animatedPropsArr.length; i++) 
		{
			// id, x, z, rot, model, onclick script function, fine coordinates (x,y,z), animateFlag, loopAnim, startFrame, stopFrame, duration, audio
			var propsy = create_game_object();
			propsy.gameID = levelObj.animatedPropsArr[i][0];
			propsy.name = "prop" + i;
			propsy.model = levelObj.animatedPropsArr[i][4];
			propsy.map_position.set((levelObj.animatedPropsArr[i][1]),0,(levelObj.animatedPropsArr[i][2]));
			propsy.position.set((levelObj.animatedPropsArr[i][1])*SQUARE_SIZE,0,(levelObj.animatedPropsArr[i][2])*SQUARE_SIZE);
			propsy.rotation.set(0, levelObj.animatedPropsArr[i][3]*Math.PI/2, 0);
			propsy.animateFlag = levelObj.animatedPropsArr[i][9];
			propsy.loopAnim = levelObj.animatedPropsArr[i][10];
			propsy.prepareAnimStop = false;
			propsy.animStart = levelObj.animatedPropsArr[i][11];
			propsy.animStop = levelObj.animatedPropsArr[i][12];
			propsy.animDuration = levelObj.animatedPropsArr[i][13];
			propsy.audioFile = levelObj.animatedPropsArr[i][14];
			
			propsy.animAudio = document.createElement('audio');
			var anim_audio_source = document.createElement('source');
			anim_audio_source.src = propsy.audioFile;
			propsy.animAudio.appendChild(anim_audio_source);
			
			if(propsy.loopAnim)
			{
				//play looped audio automatically?
				//audio should be in 3D location 
				//audio should be synchronized with animation
				//TODO this need more work and thinking, so lets leave it for later
				//propsy.animAudio.volume = 0.4;
				//propsy.animAudio.loop = true;
				//propsy.animAudio.play();
			}
			
			//get js function from string
			var onPressFn = window[levelObj.animatedPropsArr[i][5]];
			if(typeof onPressFn === 'function') 
			{
				propsy.onPressFunc = onPressFn;
			}
			else
			{
				propsy.onPressFunc = missing_props_click;
			}
			
			//fine tuning position
			propsy.position.x += levelObj.animatedPropsArr[i][6];
			propsy.position.y += levelObj.animatedPropsArr[i][7];
			propsy.position.z += levelObj.animatedPropsArr[i][8];

			
			//loader.load( propsy.model, propsy.loadObject(propsy) );
			loadAnimatedGameObjectCheck(loader, propsy);
			
			levelObj.array_of_animated_props.push(propsy);
		}
	}
}

//used in temp level loading
function reload_props(levelObj)
{
	for(var i=0; i<levelObj.array_of_props.length;i++)
	{
		scene.add(levelObj.array_of_props[i].mesh);
	}
}
	
//used in temp level loading
function reload_animated_props(levelObj)
{
	for(var i=0; i<levelObj.array_of_animated_props.length;i++)
	{
		scene.add(levelObj.array_of_animated_props[i].mesh);
	}
}

	
//used in temp level loading
function reload_pillars(levelObj)
{
	for(var i=0; i<levelObj.array_of_pillars.length;i++)
	{
		scene.add(levelObj.array_of_pillars[i].mesh);
	}
}

function load_pillars(loader,levelObj)
{
	for(var i=0; i<levelObj.pillarsArr.length; i++) 
	{
		var pillarke = create_game_object();
		pillarke.gameID = levelObj.pillarsArr[i][0];
		pillarke.name = "pillar" + i;
		pillarke.model = levelObj.pillarsArr[i][1];
		pillarke.map_position.set(levelObj.pillarsArr[i][2],0,levelObj.pillarsArr[i][3]);
		pillarke.position.set(levelObj.pillarsArr[i][2]*SQUARE_SIZE,0,levelObj.pillarsArr[i][3]*SQUARE_SIZE);

		loadGameObjectCheck(loader,pillarke);
		
		levelObj.array_of_pillars.push(pillarke);
	}
}