// ##     ## ######## ########  ######## ######## ##     ## 
// ##     ## ##       ##     ##    ##    ##        ##   ##  
// ##     ## ##       ##     ##    ##    ##         ## ##   
// ##     ## ######   ########     ##    ######      ###    
//  ##   ##  ##       ##   ##      ##    ##         ## ##   
//   ## ##   ##       ##    ##     ##    ##        ##   ##  
//    ###    ######## ##     ##    ##    ######## ##     ## 

function loopVertex_Home (vertex) 
{
	vertex.radioBeat = 0;

	if (activaLatidos)
	{
		vertex.radioBeat = 2* Math.max( 0 ,Math.sin(timeBeat+vertex.beatArritmia)*0.8)+Math.max( 0 ,Math.sin(timeBeat+vertex.beatArritmia+2.5));
		
	}
	else
	{
		vertex.radioBeat += (0 - vertex.radioBeat) / 10 *divEase;
	}

	vertex.tx = vertex.ox + Math.cos(vertex.axy) * vertex.beatForce * vertex.radioBeat;
	vertex.ty = vertex.oy + Math.sin(vertex.axy) * vertex.beatForce * vertex.radioBeat;
	
	//movimiento aleatorio
	vertex.animaAngle += time/2000;

	vertex.x += (Math.sin(vertex.sinVel * vertex.animaAngle)*20 + vertex.tx - vertex.x)/20*divEase;
	vertex.y += (Math.cos(vertex.cosVel * vertex.animaAngle)*20 + vertex.ty - vertex.y)/20*divEase;
	
	vertex.tz = vertex.oz + Math.sin(vertex.axz) * vertex.beatForce * vertex.radioBeat;
	vertex.z += (vertex.tz - vertex.z)/20*divEase;
}

//  ######     ###    ##     ## ######## ########     ###    
// ##    ##   ## ##   ###   ### ##       ##     ##   ## ##   
// ##        ##   ##  #### #### ##       ##     ##  ##   ##  
// ##       ##     ## ## ### ## ######   ########  ##     ## 
// ##       ######### ##     ## ##       ##   ##   ######### 
// ##    ## ##     ## ##     ## ##       ##    ##  ##     ## 
//  ######  ##     ## ##     ## ######## ##     ## ##     ## 

function animateCamera_Home(divEase)
{
	if (!searchOpen)
	{	
		camera.position.x += ( CAMERA_MOVE_OUT*mouseX - camera.position.x ) * 0.03 * divEase;
		camera.position.y += ( - CAMERA_MOVE_OUT*mouseY - camera.position.y ) * 0.03 * divEase;
	}
	else
	{
		camera.position.x += ( 0 - camera.position.x ) * 0.03 * divEase;
		camera.position.y += ( 0 - camera.position.y ) * 0.03 * divEase;
	}
	camera.position.z += (CAMERA_ZOOM_OUT - camera.position.z)/20 * divEase;

	cameraLookAtPoint.x += (0 - cameraLookAtPoint.x)/10 * divEase;
	cameraLookAtPoint.y += (0 - cameraLookAtPoint.y)/10 * divEase;
	cameraLookAtPoint.z += (0 - cameraLookAtPoint.z)/10 * divEase;
	
	particles.material.opacity += (CORAZON_PEQUE_OPACITY_DETRAS - particles.material.opacity)/30 *divEase;

	multiply += (20 - multiply)/20*divEase;
}

// ##     ## ########    ###    ########  ######## 
// ##     ## ##         ## ##   ##     ##    ##    
// ##     ## ##        ##   ##  ##     ##    ##    
// ######### ######   ##     ## ########     ##    
// ##     ## ##       ######### ##   ##      ##    
// ##     ## ##       ##     ## ##    ##     ##    
// ##     ## ######## ##     ## ##     ##    ##    

function animateCorazon_Home(divEase)
{
	tempPerBeatCorazon += (CORAZON_SCALE/10 - tempPerBeatCorazon)/10 * divEase;

	if (corazon)
	{
		corazon.scale.set(	tempPerBeatCorazon,
					  		tempPerBeatCorazon,
					  		tempPerBeatCorazon);
		
		corazon.children[0].material.opacity += (0 - corazon.children[0].material.opacity)/10 *divEase;
	}

}
