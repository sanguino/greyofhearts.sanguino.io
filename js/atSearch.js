// ##     ## ######## ########  ######## ######## ##     ## 
// ##     ## ##       ##     ##    ##    ##        ##   ##  
// ##     ## ##       ##     ##    ##    ##         ## ##   
// ##     ## ######   ########     ##    ######      ###    
//  ##   ##  ##       ##   ##      ##    ##         ## ##   
//   ## ##   ##       ##    ##     ##    ##        ##   ##  
//    ###    ######## ##     ##    ##    ######## ##     ## 

function loopVertex_Search (vertex) 
{
	vertex.radioBeat += (0 - vertex.radioBeat) / 10 *divEase;

	//console.log(vertex.radioBeat)
	if (vertex.found)
	{
		vertex.tx = vertex.ox/3 + Math.cos(vertex.axy);
		vertex.ty = vertex.oy/3 + Math.sin(vertex.axy);
	}
	else
	{
		vertex.tx = vertex.ox/3 + Math.cos(vertex.axy)* 300;
		vertex.ty = vertex.oy/3 + Math.sin(vertex.axy)* 300;
	}

	//movimiento aleatorio
	vertex.animaAngle += time/2000;

	vertex.x += (Math.sin(vertex.sinVel * vertex.animaAngle)*5 + vertex.tx - vertex.x)/multiply*divEase;
	vertex.y += (Math.cos(vertex.cosVel * vertex.animaAngle)*5 + vertex.ty - vertex.y)/multiply*divEase;
	
	vertex.tz = vertex.oz/10 + Math.sin(vertex.axz) * vertex.beatForce * vertex.radioBeat;
	vertex.z += (vertex.tz - vertex.z)/20*divEase;
}

//  ######     ###    ##     ## ######## ########     ###    
// ##    ##   ## ##   ###   ### ##       ##     ##   ## ##   
// ##        ##   ##  #### #### ##       ##     ##  ##   ##  
// ##       ##     ## ## ### ## ######   ########  ##     ## 
// ##       ######### ##     ## ##       ##   ##   ######### 
// ##    ## ##     ## ##     ## ##       ##    ##  ##     ## 
//  ######  ##     ## ##     ## ######## ##     ## ##     ## 
 
function animateCamera_Search(divEase)
{
	camera.position.x += ( 0 - camera.position.x ) * 0.03 * divEase;
	camera.position.y += ( 0 - camera.position.y ) * 0.03 * divEase;
	
	camera.position.z += (CAMERA_ZOOM_SEARCH - camera.position.z)/20 * divEase;	

	cameraLookAtPoint.x += (0 - cameraLookAtPoint.x)/10 * divEase;
	cameraLookAtPoint.y += (0 - cameraLookAtPoint.y)/10 * divEase;
	cameraLookAtPoint.z += (0 - cameraLookAtPoint.z)/10 * divEase;
	
	particles.material.opacity += (CORAZON_PEQUE_OPACITY_DETRAS - particles.material.opacity)/30 *divEase;

	multiply += (60 - multiply)/20*divEase;
}

// ##     ## ########    ###    ########  ######## 
// ##     ## ##         ## ##   ##     ##    ##    
// ##     ## ##        ##   ##  ##     ##    ##    
// ######### ######   ##     ## ########     ##    
// ##     ## ##       ######### ##   ##      ##    
// ##     ## ##       ##     ## ##    ##     ##    
// ##     ## ######## ##     ## ##     ##    ##    

function animateCorazon_Search(divEase)
{
	animateCorazon_Home(divEase);
}
