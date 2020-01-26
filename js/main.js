var particles;
var i;
var sprite;
var spriteSearch;

var partCreated = 0;
var vertexData;
var timeBeat = 0;
var timeBeatCorazon = 0;
var activaLatidos = false;
var cameraTarget = null;
var cameraLookAtPoint = new THREE.Vector3( 0, 0, 0 );
var corazon;
var divEase;

var multiply = 20;

var tempPerBeatCorazon = CORAZON_SCALE;
var tempPerBeatCorazon2 = CORAZON_SCALE;

var estado = AT_HOME;

var timePerBeat = 2000;
var anglePerMilisec;

var vertexSelected;

function checkRay(posX, posY)
{	
	vertexSelected = null;

	var distMin = CLICK_DIST_MIN;

	var longitud = MAX_PARTICLES;
	
	if (estado==AT_SEARCH)
		longitud = aPersonas.length;

	for (i=0; i < longitud; i++)
	{	
		var pos = particles.geometry.vertices[i].clone().project( camera );	

		var dist = 500* Math.sqrt(Math.pow(pos.x - posX,2) + Math.pow(pos.y - posY,2));
		
		if ( dist < distMin)
		{
			if (!inSearch || particles.geometry.vertices[i].found)
			{
				distMin = dist;
				vertexSelected = particles.geometry.vertices[i];
			}
		}
	}

	hacerZoom();
}

function hacerZoom()
{
	if ( vertexSelected != null && estado != AT_ZOOM) 
	{
		meterInfo(vertexSelected.persona.txNombre, vertexSelected.persona.txDepartamento, vertexSelected.persona.txEmpresa, vertexSelected.persona.txImagen, vertexSelected.persona.numPulsaciones);

		cameraTarget = vertexSelected;
		activaLatidos = false;
		corazon.position.x = vertexSelected.x;
		corazon.position.y = vertexSelected.y;
		
		corazon.position.z = CORAZON_Z_DETRAS;
	}
	else
	{ 
		if (cameraTarget != null)
			quitarInfo();

		cameraTarget = null;
	}
}


function loop()
{
	if (!corazon)
		return;

	setEstado();

	setTiempo();

	animateCamera(divEase);
	
	animateParticulas();

	animateCorazon(divEase);

	particles.geometry.verticesNeedUpdate = true;
}

function animateParticulas()
{
	for (i=0; i < particles.geometry.vertices.length; i++)
	{
		var vertex = particles.geometry.vertices[i];

		if (estado == AT_HOME)
			loopVertex_Home(vertex);
		else if (estado == AT_ZOOM)
			loopVertex_Zoom(vertex);
		else
			loopVertex_Search(vertex);
	}
}

function animateCamera(divEase)
{
	if (estado == AT_HOME)
	{
		activaLatidos = true;
		animateCamera_Home(divEase);
	}
	else if (estado == AT_ZOOM)
	{
		animateCamera_Zoom(divEase);
	}
	else
	{
		animateCamera_Search(divEase);
	}

	camera.lookAt(cameraLookAtPoint);
}

function animateCorazon(divEase)
{
	if (estado == AT_SEARCH && vertexSelected != null)
	{
		animateCorazon_Search(divEase);
	}
	else if (estado == AT_ZOOM)
	{
		animateCorazon_Zoom(divEase);
	}
	else
	{
		animateCorazon_Home(divEase);
	}
}

function setTiempo ()
{
	time = Date.now() - oldTime;
	oldTime = Date.now();

	time = Math.min(500, time)

	divEase = time*60/1000;
	
	if (vertexSelected && estado == AT_ZOOM)
	{
		timePerBeat += (60/vertexSelected.persona.numPulsaciones * 1000 - timePerBeat) / 20 * divEase;
	}
	else
	{
		timePerBeat +=  (60 / mediaPulsaciones * 1000 - timePerBeat) / 20 * divEase;
	}

	anglePerMilisec = 360 / timePerBeat * Math.PI / 180;
	timeBeat += time*anglePerMilisec;

	//trace(timePerBeat)

}

function setEstado ()
{
	if (cameraTarget == null && !inSearch)
	{
		estado = AT_HOME;
	}
	else if (cameraTarget != null)
	{
		estado = AT_ZOOM;
	}
	else
	{
		estado = AT_SEARCH;
	}
}

function animateDust()
{
	var dustTime = Date.now() * 0.00005;

	for ( i = 0; i < dustParticles.length; i ++ ) 
	{
		dustParticles[ i ].rotation.y = dustTime * ( i < 4 ? i + 1 : - ( i + 1 ) );

		dustParticles[ i ].position.x += ( 1/5*mouseX - dustParticles[ i ].position.x ) * 0.01;
		dustParticles[ i ].position.y += ( - 1/5*mouseY - dustParticles[ i ].position.y ) * 0.05;
	}
}
