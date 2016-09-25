
//main game loop
//all animation events are handled here

function game_loop() {

	if(gameState == GAME_STATE_IN_GAME)
	{
		if(m_GamePaused)
			return;

		//TODO: get 'new' out of animation loop, why would we create this object every time?
		var timeNow = new Date().getTime();
		
		//..so it begins
		if (lastTime != 0) {

			var elapsed = timeNow - lastTime;

			//update teleport particles that float up and disappear
			update_teleport(elapsed/10000);
			
			//monster wound is 2D UI element that shows damage and floats up slowly
			//lifting wound div up and opacitating it to transparent
			if(monster_wound_div.style.display == "inline-block")
			{
				monster_wound_div_top_lift += elapsed;
				if(monster_wound_div_top_lift < 3000)
				{
					var new_top = monster_wound_div_top - monster_wound_div_top_lift/20;
					monster_wound_div.style.top = new_top + "px";
					monster_wound_div.style.opacity -= monster_wound_div_top_lift/30000;
				}
				else
				{
					//wound should dissappear
					monster_wound_div.style.display = 'none';
				}
			}
			
			//lifting info div up and opacitating it to transparent
			//OLD CODE - we dont use this any more
			/*if(info_tip_div.style.display == "inline-block")
			{
				info_tip_div_top_lift += elapsed;
				if(info_tip_div_top_lift < 6000)
				{
					var new_top = info_tip_div_top - info_tip_div_top_lift/20;
					//info_tip_div.style.top = new_top + "px";
					info_tip_div.style.opacity -= info_tip_div_top_lift/60000;
				}
				else
				{
					//info should dissappear
					info_tip_div.style.display = 'none';
				}
			}*/
			
			if(playerCanHitLeft == false)
			{
				playerHitTimeoutLeft -= elapsed;
				
				if(playerHitTimeoutLeft < 0)
				{
					console.log("left hit available again");
					playerHitTimeoutLeft = 0;
					playerCanHitLeft = true;
					lhandDiv.style.opacity=1.0;
				}
			}
			
			if(playerCanHitRight == false)
			{
				playerHitTimeoutRight -= elapsed;
				
				if(playerHitTimeoutRight < 0)
				{
					console.log("right hit available again");
					playerHitTimeoutRight = 0;
					playerCanHitRight = true;
					rhandDiv.style.opacity=1.0;
				}
			}

			//animate camera move
			if(cameraMove)
			{
				//calculate delta position from start to end based on elapsed time
				var deltaMove = elapsed*SQUARE_SIZE/STEP_MOVE_DURATION;
				var deltaLooker = new THREE.Vector3(0,0,0).add(cameraLooker);
				deltaLooker.multiplyScalar(deltaMove/10); //i don't know why i have to divide here by 10?
				
				//set camera position to delta
				cameraDelta+=deltaMove;
				camera.position.add(deltaLooker);
				camera.look.add(deltaLooker);
				camera.lookAt(camera.look);
				pointLight.position.add(deltaLooker);
				if (cameraDelta >= SQUARE_SIZE-0.3)
				{
					//console.log("stop move cameraOriginalPosition.x: " + cameraOriginalPosition.x);
					//console.log("stop move cameraLooker.x: " + cameraLooker.x);
					var old_x = current_position.x;
					var old_z = current_position.z;
					
					cameraMove = false;
					camera.position.multiplyScalar(0);
					camera.position.add(cameraOriginalPosition.add(cameraLooker));
					camera.look.multiplyScalar(0);
					camera.look.add(cameraOriginalLook.add(cameraLooker));
					camera.lookAt(camera.look);
					current_position.add(cameraLookie);
					cameraLooker.multiplyScalar(0);
					cameraLookie.multiplyScalar(0);
					cameraOriginalPosition.multiplyScalar(0);
					cameraOriginalLook.multiplyScalar(0);
					cameraDelta = 0;
					
					pointLight.position.set(current_position.x*SQUARE_SIZE, 4, current_position.z*SQUARE_SIZE);
					
					//check if player stepped onto hole in the ground
					if(positionIsHole(current_position.x, current_position.z))
					{
						//animate fall into hole
						fallInHole();
					}
					
					
					if(currentlevelObj.win_area.length > 0)
					{
						if((currentlevelObj.win_area[0][0]==current_position.x)&&(currentlevelObj.win_area[0][1]==current_position.z)&&(currentlevelObj.win_area[0][3]==0))
						{
							//play win sound
							audio_win1.play();
							//show win message
							DisplayInfoDiv(currentlevelObj.win_area[0][2]);
							//set area flag to discovered
							currentlevelObj.win_area[0][3]=1;
						}
					}
					
					//check if player was standing on press plate before this move..
					var wasStandingOnPlate = standingOnPlatePos(old_x,old_z,currentlevelObj);
					if(wasStandingOnPlate > -1)
					{
						//call pressure plate onUnpress function..
						var itemOnThePlate = someItemIsOnThePlate(wasStandingOnPlate,currentlevelObj);
						if(itemOnThePlate)
						{
							console.log("plate is not unpressed because weight is on it!");
						}
						else
						{
							//call pressure plate onUnPress function..
							console.log("plate unpressed!");
							currentlevelObj.array_of_plates[wasStandingOnPlate].pressed = 0;
							currentlevelObj.array_of_plates[wasStandingOnPlate].mesh.position.y +=0.2;
							plate_unclick_audio.play();
							currentlevelObj.array_of_plates[wasStandingOnPlate].onUnpressFunc();
						}
					}
					
					//check if player has stepped on the pressure plate
					var plateID = standing_on_plate(currentlevelObj);
					if(plateID>-1)
					{
						if (currentlevelObj.array_of_plates[plateID].pressed == 0)
						{
							//call pressure plate onPress function..
							console.log("plate pressed!");
							currentlevelObj.array_of_plates[plateID].pressed = 1;
							currentlevelObj.array_of_plates[plateID].mesh.position.y -=0.2;
							plate_click_audio.play();
							currentlevelObj.array_of_plates[plateID].onPressFunc();
						}
					}
					
					//check if player stepped onto teleport!
					/*if(teleport != 0)
					{
						if(positionIsTeleport(current_position.x, current_position.z))
						{
							//pause game
							//m_GamePaused = true;
							//show final register/feedback level complete screen!
							//displayLevelCompleteDialog();
							teleportGo();
						}
					}*/
					
					//if stepped on stairs..
					if(typeof currentlevelObj.stairsArr != 'undefined')
					{
						for(i=0; i < currentlevelObj.stairsArr.length; i++)
						{
							if((currentlevelObj.stairsArr[i][0] == current_position.x) && (currentlevelObj.stairsArr[i][1] == current_position.z))
							{
								//TODO slide animation
								
								//go to next level..
								console.log("go to next level: " + currentlevelObj.stairsArr[i][5]);
								loadLevel(currentlevelObj.stairsArr[i][5],currentlevelObj.stairsArr[i][6]);
								
								/*var mapExists = false;
								for(var l=0; l<existingMaps.length; l++)
								{
									if (existingMaps[l] == stairsArr[i][5])
									{
										mapExists = true;
										break;
									}
								}
								if(mapExists)
								{
									window.location.href = 'cuber.php?lvl=' + stairsArr[i][5];
								}
								else
								{
									//display no more levels info..
									displayLevelInCompleteDialog();
								}*/
							}
						}
					}
				}
				
			}
			
			//animate camera rotate
			if(cameraRotate)
			{
				var deltaMove = elapsed*SQUARE_SIZE/STEP_MOVE_DURATION;
				var deltaRotateMover = new THREE.Vector3(0,0,0).add(cameraRotateMover);
				var deltaRotateTurner = new THREE.Vector3(0,0,0).add(cameraRotateTurner);
				deltaRotateMover.multiplyScalar(deltaMove/cameraRotateMover.distanceTo(new THREE.Vector3(0,0,0))); //i don't know why i have to divide here by length?
				deltaRotateTurner.multiplyScalar(deltaMove/cameraRotateTurner.distanceTo(new THREE.Vector3(0,0,0))); //i don't know why i have to divide here by length?
				cameraDelta+=deltaMove;
				
				camera.position.add(deltaRotateMover);
				camera.look.add(deltaRotateTurner);
				camera.lookAt(camera.look);
				//pointLight.position.set(camera.look.x, 4, camera.look.z);
				//cameraRotateMover
				//cameraLooker
				//cameraOriginalLook
				if (cameraDelta >= cameraRotateMover.distanceTo(new THREE.Vector3(0,0,0)))
				{
					var cameraRotLookie = new THREE.Vector3(0,0,0).add(cameraLooker);
					cameraRotLookie.normalize();
					//console.log("stop rotate cameraRotateTurner.x: " + cameraRotateTurner.x);
					//console.log("stop rotate cameraRotateTurner.z: " + cameraRotateTurner.z);
					cameraRotate = false;
					camera.position.multiplyScalar(0);
					camera.position.add(cameraOriginalPosition.add(cameraRotateMover));
					camera.look.multiplyScalar(0);
					camera.look.add(cameraOriginalLook.add(cameraRotateTurner));
					camera.lookAt(camera.look);
					//current_position.add(cameraRotLookie);
					cameraLooker.multiplyScalar(0);
					cameraRotateMover.multiplyScalar(0);
					cameraRotateTurner.multiplyScalar(0);
					cameraRotLookie.multiplyScalar(0);
					cameraOriginalPosition.multiplyScalar(0);
					cameraOriginalLook.multiplyScalar(0);
					cameraDelta = 0;
				}
			}
			
			//animate doors opening/closing
			for(i=0; i < currentlevelObj.array_of_doors.length; i++)
			{
				if(currentlevelObj.array_of_doors[i].animate == true) //being animated..
				{
					animateDoor(currentlevelObj.array_of_doors[i],elapsed);
				}
			}
			
			//animate hole fall
			if(holeFallen)
			{
				if(camera.position.y > -6)
				{
					var looker = camera.look.clone().sub(camera.position);
					camera.position.x += elapsed*looker.x/1200;
					camera.position.z += elapsed*looker.z/1200;
					camera.position.y -= elapsed/40;
					camera.look.y += elapsed/60;
					camera.lookAt(camera.look);
				}
				else if(!alerted)
				{
					alerted = true;
					//alert("game over");
					show_message("<br><br>You have fallen to your demise. <br><br>Only thing you can do now is reload the page and start again. <br><br><br><br><br> <button onclick='location.reload();'> Restart </button>  &nbsp;&nbsp; <input type='button' value=' Load ' disabled>", 600, 400, "url(media/pannel_small.png)", "Copperplate, 'Copperplate Gothic Light', Garamond, Baskerville", "#ddddd0", "400", "20px");
					player_dies();
				}
			}
			
			//animate throwing weapon
			if(thrownWeaponIsFlying)
			{
				//move item forward
				//thrownWeapon.mesh.position += thrownWeaponDirection/100;
				var deltaThrowMove = elapsed/200;
				var oldThrownWeaponCubePath = thrownWeaponCubePath;
				thrownWeaponCubePath += deltaThrowMove;
				if(thrownWeaponCubePath > 0.99)
				{
					deltaThrowMove = 0.99 - oldThrownWeaponCubePath;
					thrownWeaponCubePath = 0;
					var thrownWeaponNewPosition = thrownWeaponDirection.clone().normalize();
					thrownWeaponNewPosition.add(thrownWeaponPosition);
					//moving to next cube if its possible
					if(canMoveTo(0, thrownWeaponNewPosition.x, thrownWeaponNewPosition.z))
					{
						if(steppedOnStairs(currentlevelObj, thrownWeaponNewPosition))
						{
							//dont throw up the stairs
							console.log("no more flying because stairs");
							thrownWeaponIsFlying = false;
						}
						else
						{
							//keep moving
							console.log("flying one more step");
							var deltaThrowMoveVector = thrownWeaponDirection.clone();
							deltaThrowMoveVector.multiplyScalar(deltaThrowMove);
							thrownWeapon.mesh.position = deltaThrowMoveVector.add(thrownWeapon.mesh.position);
							thrownWeaponPosition = thrownWeaponNewPosition.clone();
						}
					}
					else
					{
						console.log("no more flying");
						thrownWeaponIsFlying = false;
					}

					if(!thrownWeaponIsFlying)
					{
						//check if item dropped on the plate
						var itemFallingOnPlate = standingOnPlatePos(thrownWeaponPosition.x, thrownWeaponPosition.z, currentlevelObj);
						if(itemFallingOnPlate > -1)
						{
							if (currentlevelObj.array_of_plates[itemFallingOnPlate].pressed == 0)
							{
								//call pressure plate onPress function..
								console.log("plate pressed!");
								currentlevelObj.array_of_plates[itemFallingOnPlate].pressed = 1;
								currentlevelObj.array_of_plates[itemFallingOnPlate].mesh.position.y -=0.2;
								plate_click_audio.play();
								currentlevelObj.array_of_plates[itemFallingOnPlate].onPressFunc();
							}
							//make item plated, and adjust its position
							thrownWeapon.plated = itemFallingOnPlate;
							var deltaThrowMoveVector = thrownWeaponDirection.clone();
							thrownWeapon.mesh.position.sub(deltaThrowMoveVector.multiplyScalar(0.3));
						}


						//check if monster is hit
						//check if item falls in the hole

						//drop item on the ground
						thrownWeapon.mesh.position.y = 0;
					}
				}
				else
				{
					var deltaThrowMoveVector = thrownWeaponDirection.clone();
					deltaThrowMoveVector.multiplyScalar(deltaThrowMove);
					thrownWeapon.mesh.position = deltaThrowMoveVector.add(thrownWeapon.mesh.position);
				}
			}
			
		}
		
		lastTime = timeNow;


		/*
		//move pickable 3d object on the screen under mouse
		if(pickable_at_hand)
		{
			var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
			projector.unprojectVector( vector, camera );
			var dir = vector.sub( camera.position ).normalize();
			dir.multiplyScalar( 10 );
			var pos = camera.position.clone().add( dir );
			pickable_at_hand.mesh.position = pos;
			//alert("pickable_at_hand oooo" + pickable_at_hand);	
		}*/
		
		var top  = window.pageYOffset || document.documentElement.scrollTop;
		var	left = window.pageXOffset || document.documentElement.scrollLeft;
		
		if(pickable_at_hand_icon)
		{
			pickable_at_hand_icon.style.display = "block";
			pickable_at_hand_icon.style.left = (x_pos - 64 + left) + 'px';
			pickable_at_hand_icon.style.top = (y_pos - 64 + top) + 'px';
		}

		//render
		
		var delta = clock.getDelta();
		round_time += delta;
		if(round_time > ROUND_DURATION)
		{
			//console.log("round tick");
			player_wound_div.style.display = 'none';
			round_time = 0;
			
			for ( var i = 0; i < currentlevelObj.array_of_monsters.length; i ++ ) {

				var monster = currentlevelObj.array_of_monsters[ i ];
				if(monster.mesh != 0)
				{
					if(monster.mood == MONSTER_MAD)
					{
						monster.find_player(current_position);
					}
					else if(monster.mood == MONSTER_WALK)
					{
						var destination = new THREE.Vector3(16,0,13);
						monster.find_path(destination);
					}
				}
				//console.log(" " + i)
			}
		
		}

		//I already tried to move this loop up there, but its wasnt that simple.
		for ( var i = 0; i < currentlevelObj.array_of_monsters.length; i ++ ) {

			var monster = currentlevelObj.array_of_monsters[ i ];
			if(monster.mesh != 0)
			{
				monster.mesh.updateAnimation( 1000 * delta );
				monster.move(round_time*SQUARE_SIZE/ROUND_DURATION);
			}
			//console.log(" " + i)
		}
		
		for ( var i = 0; i < currentlevelObj.array_of_animated_props.length; i ++ ) {

			var animProp = currentlevelObj.array_of_animated_props[ i ];
			if(animProp.mesh != 0)
			{
				if(animProp.animateFlag)
				{
					if(animProp.mesh.currentKeyframe == 50)
					{
						//This is unfortunate, but cant think of another solution.
						//Once the currentKeyframe is at the end, we want to stop animation,
						//but if we do that right away when we detect currentKeyframe is at the end frame,
						//next time we start animation, currentKeyframe will still be at the end frame for few millis
						//so what happens is that condition above is still true at the start of next animation so
						//animation stops right away. It starts again only after few attempts.
						//now, here we detect that currentKeyframe is at the end, but keep animating until 
						//currentKeyframe is back at 0 (or whatever start frame is) - then we stop. 
						//So when next animation is started, it starts from 0 and it works right away.
						if(!animProp.loopAnim)
							animProp.prepareAnimStop = true;
					}
					if((animProp.prepareAnimStop)&&(animProp.mesh.currentKeyframe == 0))
					{
						animProp.prepareAnimStop = false;
						animProp.animateFlag = false;
					}

					animProp.mesh.updateAnimation( 1000 * delta );
				}
			}
			//console.log(" " + i)
		}

		renderer.render( scene, camera );


		
		
		
		
	}
}

var prepare_anim_stop = false;