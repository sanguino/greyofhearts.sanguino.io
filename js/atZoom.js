// ##     ## ######## ########  ######## ######## ##     ## 
// ##     ## ##       ##     ##    ##    ##        ##   ##  
// ##     ## ##       ##     ##    ##    ##         ## ##   
// ##     ## ######   ########     ##    ######      ###    
//  ##   ##  ##       ##   ##      ##    ##         ## ##   
//   ## ##   ##       ##    ##     ##    ##        ##   ##  
//    ###    ######## ##     ##    ##    ######## ##     ## 

function loopVertex_Zoom (vertex) 
{
	vertex.radioBeat = 0;

	vertex.radioBeat += (0 - vertex.radioBeat) / 10 *divEase;
	

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
 
function animateCamera_Zoom(divEase)
{
	camera.position.x += ( 0 - camera.position.x ) * 0.03 * divEase;
	camera.position.y += ( 0 - camera.position.y ) * 0.03 * divEase;

	camera.position.z += (CAMERA_ZOOM_IN - camera.position.z - corazon.position.z)/20 * divEase;		

	cameraLookAtPoint.x += (corazon.position.x - cameraLookAtPoint.x)/10 * divEase;
	cameraLookAtPoint.y += (corazon.position.y - cameraLookAtPoint.y)/10 * divEase;
	cameraLookAtPoint.z += (corazon.position.z - cameraLookAtPoint.z)/10 * divEase;

	particles.material.opacity += (CORAZON_PEQUE_OPACITY_DELANTE - particles.material.opacity)/10 *divEase;

	multiply += (20 - multiply)/20*divEase;
}

// ##     ## ########    ###    ########  ######## 
// ##     ## ##         ## ##   ##     ##    ##    
// ##     ## ##        ##   ##  ##     ##    ##    
// ######### ######   ##     ## ########     ##    
// ##     ## ##       ######### ##   ##      ##    
// ##     ## ##       ##     ## ##    ##     ##    
// ##     ## ######## ##     ## ##     ##    ##    

function animateCorazon_Zoom(divEase)
{
	//corazon.position.x = cameraTarget.x;
	//corazon.position.y = cameraTarget.y;
	//corazon.position.z = cameraTarget.z;

	corazon.children[0].material.opacity += (0.9 - corazon.children[0].material.opacity)/10 *divEase;


	var radioBeat = Math.max( 0 ,Math.sin(timeBeat)*0.8)+Math.max( 0 ,Math.sin(timeBeat+2.5));
	
	tempPerBeatCorazon += (CORAZON_SCALE*8 + radioBeat/2 - tempPerBeatCorazon)/20 * divEase;

	if (corazon)
		corazon.scale.set(	tempPerBeatCorazon,
					  		tempPerBeatCorazon,
					  		tempPerBeatCorazon);
}
