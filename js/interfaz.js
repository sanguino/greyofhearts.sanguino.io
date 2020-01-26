var posInfoNombre;
var posInfoPulsa;
var posBuscador;
var posLema;

var inSearch = false;
var numFound;

var searchOpen = false;

var meterInfoTimeout;

var intervaloBuscar;

var oldBusqueda = "";

function prepareInterfaz()
{
	posInfoNombre = $('#infoNombre').css('margin-top');
	posInfoPulsa = $('#infoPulsa').css('margin-top');
	posBuscador = $('#buscar').css('margin-top');
	posLema = $('#textoLema').css('margin-top');

	TweenMax.to($('#infoNombre'), 0, {marginTop: -500});
	TweenMax.to($('#buscar'), 0, {marginTop: -500});
	TweenMax.to($('#infoPulsa'), 0, {marginTop: window.innerHeight +500});
	TweenMax.to($('#infoPulsa #animaPulsa'), 0, {backgroundPosition:"0 0"});

	TweenMax.to($('#buscador'), 0, {width:'0px'});
	TweenMax.to($('#buscar #cerrar'), 0, {width:'0px'});


	$('#buscador').on('input', cambiaBuscar);
	$('#buscar #cerrar span').on('mousedown', cerrarBuscador);

	TweenMax.to($('#textoLema'), 0, {autoAlpha:0});


	if (Modernizr.mobile)
	{
		TweenMax.to($('#buscador'), 0, {width:'200px', paddingLeft:'35px', ease:Cubic.easeOut});
		TweenMax.to($('#buscar #cerrar'), 0, {display:"none"});
		$('#buscador').css('cursor', 'text');
		searchOpen = true;
		
		$('#buscar').show();
	}
	else
	{
		$('#buscador').on('focus', abrirBuscador);
	//	$('#buscador').on('touchstart', abrirBuscador);
		$('#buscador').on('blur', blurBuscador);
		$('#buscar').show();
	}
}


// ########  ##     ##  ######   ######     ###    ########  
// ##     ## ##     ## ##    ## ##    ##   ## ##   ##     ## 
// ##     ## ##     ## ##       ##        ##   ##  ##     ## 
// ########  ##     ##  ######  ##       ##     ## ########  
// ##     ## ##     ##       ## ##       ######### ##   ##   
// ##     ## ##     ## ##    ## ##    ## ##     ## ##    ##  
// ########   #######   ######   ######  ##     ## ##     ## 


function abrirBuscador()
{
	if (inSearch || Modernizr.mobile)
		return;

	//TweenMax.killAll(true);
	TweenMax.to($('#buscador'), 1, {width:'200px', paddingLeft:'35px', ease:Cubic.easeOut});
	$('#buscador').css('cursor', 'text');
	TweenMax.to($('#buscar #cerrar'), 1, {display:"block", width:'242px', ease:Cubic.easeOut});
	searchOpen = true;
}

function blurBuscador()
{
	if (!inSearch)
		cerrarBuscador();
}

function cerrarBuscador(event)
{
	//TweenMax.killAll(true);
	if ($('#buscador').val() != "")
	{
		$('#buscador').val('');
		cambiaBuscar();
	}

	if (!Modernizr.mobile)
	{
		TweenMax.to($('#buscador'), 1, {width:'0px', paddingLeft:'25px',ease:Cubic.easeOut});
		$('#buscador').css('cursor', 'pointer');
		TweenMax.to($('#buscar #cerrar'), 1, {display:"none", width:'0px', ease:Cubic.easeOut});
		searchOpen = false;
	}
}


function cambiaBuscar()
{
	var busqueda = $('#buscador').val().toLowerCase();
	busqueda = replaceChars(busqueda);

	if (estado == AT_ZOOM || oldBusqueda == busqueda)
		return;
	
	numFound = 0;

	for (var i = 0; i < particles.geometry.vertices.length; i++) 
	{
		var part = particles.geometry.vertices[i];

		if (busqueda.length <= SEARCH_MIN_CHARS)
		{
			part.found = true;
			numFound ++;
		}
		else if (part.persona.txBuscar.indexOf(busqueda) > -1 && i < aPersonas.length)
		{
			part.found = true;
			numFound ++;
		}
		else
		{
			part.found = false;
		}
	};

	if (busqueda.length > SEARCH_MIN_CHARS)
	{
		activaLatidos = false;
		escondePulso();
	}
	else
	{
		activaLatidos = true;
		muestraPulso(mediaPulsaciones, 0);
	}

	inSearch = !activaLatidos;
	oldBusqueda = busqueda;
}



// ########  ######## ########    ###    ##       ##       ######## 
// ##     ## ##          ##      ## ##   ##       ##       ##       
// ##     ## ##          ##     ##   ##  ##       ##       ##       
// ##     ## ######      ##    ##     ## ##       ##       ######   
// ##     ## ##          ##    ######### ##       ##       ##       
// ##     ## ##          ##    ##     ## ##       ##       ##       
// ########  ########    ##    ##     ## ######## ######## ######## 



function initInterfaz()
{
	setTimeout(function()
	{
		esconderTodo();
		muestraBuscar();
		muestraPulso(mediaPulsaciones, 0.4);

		if (!Modernizr.mobile)
		{
			
			TweenMax.to($('#textoLema'), 1, {autoAlpha:1});
		}
		else
		{
			intervaloBuscar = setInterval(cambiaBuscar, 1000);
		}

	}, 2000);
}

function meterInfo(nombre, departamento, empresa, foto, pulso)
{
	esconderTodo();
	meterInfoTimeout = setTimeout(function(){entrarInfo(nombre, departamento, empresa, foto, pulso)}, 600);
}

function entrarInfo(nombre, departamento, empresa, foto, pulso)
{	
	TweenMax.killAll(true);
	$('#infoNombre #textoPersona').html(nombre);
	$('#infoNombre #textoEmpresa').html(empresa);
	$('#infoNombre #textoDepartamento').html(departamento);
	$('#infoNombre #fotoPersona').css("background-image", "url('"+foto+"')");
	
	muestraNombre();
	muestraPulso(pulso, 0);
	cambiaURL(nombre, pulso);
}

function quitarInfo()
{
	esconderTodo();
	muestraBuscar();
	if (!inSearch)
		muestraPulso(mediaPulsaciones, 0.4);
	resetURL();
}


function esconderTodo()
{
	clearTimeout(meterInfoTimeout);
	TweenMax.killAll(true);
	//escondemos
	escondeNombre();
	escondeBuscar();
	escondePulso();
}

//NOMBRE

function escondeNombre()
{
	TweenMax.to($('#infoNombre'), 1, {marginTop: -500, display:'none'});
}
function muestraNombre()
{
	TweenMax.to($('#infoNombre'), 1, {marginTop: posInfoNombre, ease:Cubic.easeOut, display:'block'});
}

//BUSCAR

function escondeBuscar()
{
	TweenMax.to($('#buscar'), 1, {marginTop: -500});
	TweenMax.to($('#textoLema'), 1, {marginTop: -500});
}

function muestraBuscar()
{
	TweenMax.to($('#buscar'), 1, {marginTop: posBuscador, ease:Cubic.easeOut, delay:0.4});
	TweenMax.to($('#textoLema'), 1, {marginTop: posLema, ease:Cubic.easeOut, delay:0.4});
}


//PULSO

function escondePulso()
{
	TweenMax.to($('#infoPulsa'), 1, {marginTop: window.innerHeight +500, display:'none'});
	//paramos anima pulso
	TweenMax.killTweensOf($('#infoPulsa #animaPulsa'));
	TweenMax.to($('#infoPulsa #animaPulsa'), 0, {backgroundPosition:"0 0"});
}

function muestraPulso(pulso, delay)
{
	TweenMax.to($('#infoPulsa'), 1, {marginTop: posInfoPulsa, ease:Cubic.easeOut, display:'block', delay:delay});
	TweenMax.to($('#infoPulsa #animaPulsa'), 60/parseInt(pulso), {backgroundPosition:"-60px 0", repeat:-1, ease:Linear.easeNone});
	$('#infoPulsa #numPulsa').html(pulso);

}

//RUTA

function cambiaURL(nombre, pulso)
{
	var ruta = nombre.replace(/\s/g,'') +'_'+pulso;
	window.history.pushState(ruta, $(document).find("title").text(), "/"+ruta);
}

function resetURL()
{
	window.history.pushState("", $(document).find("title").text(), "/");
}
