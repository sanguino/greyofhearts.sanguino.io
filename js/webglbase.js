var camera, scene, renderer, fondo;

var dustGeom, dustParticles, dustMaterials;
var mouseX = 0, mouseY = 0;
var touchX = 0, touchY = 0;
var touchStartX = 0, touchStartY = 0;
var touchEndX = 0, touchEndY = 0;

var raycaster;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var time;
var oldTime = Date.now();

var webIsActive = true;

function init3D() 
{
	raycaster = new THREE.Raycaster();

	$('body').append('<div id="container"></div>');
	//container = document.createElement( 'div' );
	//document.body.appendChild( container );

	TweenMax.to($('#container'), 0, {autoAlpha:0});
	TweenMax.to($('#container'), 3, {autoAlpha:1});

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.z = 1000;

	scene = new THREE.Scene();
	//scene.fog = new THREE.FogExp2( 0x050203, 0.0008 );

	scene.add(camera);
	createDust();

	renderer = new THREE.WebGLRenderer( {  } );
	//renderer.setClearColor( 0x000000, 0 );
	renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.clear();
	$( renderer.domElement ).appendTo($('#container'));

	if (DEBUG)
	{
		stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.top = '0px';
		$( stats.domElement ).appendTo($('#container'));
	}

	window.addEventListener( 'blur', onDocumentBlur);
	window.addEventListener( 'focus', onDocumentFocus);
	window.addEventListener( 'resize', onWindowResize, false );

	var map = THREE.ImageUtils.loadTexture( RUTA_FONDO );
	
	var material = new THREE.MeshBasicMaterial( { map: map } )

	fondo = new THREE.Mesh( new THREE.PlaneGeometry( 1280, 872, 4, 4 ), material );
	fondo.material.depthTest = false;
    fondo.material.depthWrite = false;
    fondo.position.z = -300;
	camera.add( fondo );

	onWindowResize();

	playIntro();
}

function createListeners ()
{
	var cont;
// 	cont = document;
	cont = document.getElementById("container");

	cont.addEventListener( 'mousemove', 	onDocumentMouseMove, false );
	cont.addEventListener( 'mousedown', 	onDocumentMouseDown, false );
	cont.addEventListener( 'touchstart', 	onDocumentTouchStart, false );
	cont.addEventListener( 'touchend',		onDocumentTouchEnd, false );
	cont.addEventListener( 'touchcancel',	onDocumentTouchEnd, false );
	cont.addEventListener( 'touchmove', 	onDocumentTouchMove, false );

}

function onWindowResize() {

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

	if (corazon)
		corazon.children[0].position.y = -(80 - window.innerHeight/25);

	var vector = new THREE.Vector3();
	vector.set( 1, 1, 0.5 );
	vector.unproject( camera );

	vector.x *= 170;
	vector.y *= 170;

	var escala;
	
	if ( vector.x/vector.y > 1280/872)
		escala = vector.x/1280;
	else
		escala = vector.y/872;

	fondo.scale.x = escala;
	fondo.scale.y = escala;
}

function onDocumentMouseMove( event ) {

	mouseX = 2*(event.clientX - windowHalfX)/window.innerWidth;
	mouseY = 2*(event.clientY - windowHalfY)/window.innerHeight;
}

function onDocumentMouseDown( event ) {

	posX = ( event.clientX / window.innerWidth ) * 2 - 1;
	posY = - ( event.clientY / window.innerHeight ) * 2 + 1;

	checkRay(posX, posY);
}

function onDocumentTouchStart( event ) {

	

	if ( event.touches.length === 1 ) {

		event.preventDefault();
		

		touchStartX = event.touches[ 0 ].pageX;
		touchStartY = event.touches[ 0 ].pageY;

		touchEndX = event.touches[ 0 ].pageX;
		touchEndY = event.touches[ 0 ].pageY;
	}

}
function onDocumentTouchEnd( event ) {


	if ( event.changedTouches.length === 1 ) {

		event.preventDefault();

		if (  Math.sqrt(Math.pow(touchStartX - touchEndX ,2) + Math.pow(touchStartY - touchEndY,2)) < 5)
		{

			posX = ( touchStartX / window.innerWidth ) * 2 - 1;
			posY = - ( touchStartY / window.innerHeight ) * 2 + 1;

			checkRay(posX, posY)
		}
	}

}

function onDocumentTouchMove( event ) {

	if ( event.touches.length === 1 ) {

		event.preventDefault();

		touchX = event.touches[ 0 ].pageX - touchEndX;
		touchY = event.touches[ 0 ].pageY - touchEndY;

		touchEndX = event.touches[ 0 ].pageX;
		touchEndY = event.touches[ 0 ].pageY;

		mouseX += -(touchX/window.innerWidth)*3;
		mouseY += -(touchY/window.innerHeight)*3;

		mouseX = Math.max(-1, Math.min(mouseX, 1));
		mouseY = Math.max(-1, Math.min(mouseY, 1));
	}

}

window.onfocus = onDocumentFocus;
function onDocumentFocus ()
{
	oldTime = Date.now();
	time = oldTime;

	webIsActive = true;
	replaySound();
}

window.onblur = onDocumentBlur;
function onDocumentBlur () 
{
	webIsActive = false;
	pauseSound();
}

function animate() {

	

	if (webIsActive) 
	{
        requestAnimationFrame( animate );
    } else {
         setTimeout(animate, 16); 
    }

	render();

	if (DEBUG)
		stats.update();

}

function render() {
	
	loop();

	animateDust();
	renderer.render( scene, camera );
}
