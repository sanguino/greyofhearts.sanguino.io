var preload;
var loader;
var manifest;
var aPersonas;

var totalPulsaciones=0;
var mediaPulsaciones=0;

var preloadSmooth = 0;
var preloadReal = 0;

$(document).ready(initPreload);

function initPreload() 
{
    if ( ! Detector.webgl ) 
    {
        Detector.addGetWebGLMessage();
    }
    else
    {
        prepareInterfaz();

        manifest = [];

            manifest.push(RUTA_FONDO);
            manifest.push(RUTA_DUST1);

            if (Modernizr.audio.ogg)
            {
                manifest.push(RUTA_HEART_OGG);
            }
            else if (Modernizr.audio.mp3)
            {
                manifest.push(RUTA_HEART_MP3);
            }
            else
            {
                manifest.push(RUTA_HEART_M4A);
            }

            manifest.push(RUTA_DUST2);
            manifest.push(RUTA_DUST3);
            manifest.push(RUTA_DUST4);
            manifest.push(RUTA_DUST5);

            if (Modernizr.audio.ogg)
            {
                manifest.push(RUTA_MUSICA_OGG);
            }
            else if (Modernizr.audio.mp3)
            {
                manifest.push(RUTA_MUSICA_MP3);
            }
            else
            {
                manifest.push(RUTA_MUSICA_M4A);
            }

            
            manifest.push(RUTA_CORAZON_PEQUE);
            manifest.push(RUTA_LOGO);
            manifest.push(RUTA_LUPA);
            manifest.push(RUTA_CORAZON_GRANDE);
            manifest.push(RUTA_PERFIL);
            manifest.push(RUTA_VERTICES_JSON);
            manifest.push(RUTA_DATOS_JSON);
            manifest.push(RUTA_CORAZON_GRANDE_DAE);


        // Create a preloader. There is no manifest added to it up-front, we will add items on-demand.
        preload = new createjs.LoadQueue(true, "");

        preload.on("fileload", handleFileLoad);
        preload.on("progress", handleOverallProgress);
        //preload.on("fileprogress", handleFileProgress);
        preload.on("error", handleFileError);
        preload.on("complete", handleComplete, this);
        preload.setMaxConnections(5);

        while (manifest.length > 0) {
            loadAnother();
        }

        animaPreload();
    }
}

function loadAnother() 
{
    var item = manifest.shift();
    preload.loadFile(item);
}

function handleFileLoad(event) 
{
    if (event.item.id == RUTA_DATOS_JSON)
    {
        aPersonas = $.parseJSON(event.rawResult).personalGREY.personal;
        
        if (aPersonas.length > MAX_PARTICLES)
            MAX_PARTICLES = aPersonas.length;
        
        for (var i = 0; i < aPersonas.length; i++) 
        {
            aPersonas[i].numPulsaciones = parseInt(aPersonas[i].numPulsaciones);
            aPersonas[i].numPulsaciones = Math.max(MIN_PULSACIONES, aPersonas[i].numPulsaciones);
            aPersonas[i].numPulsaciones = Math.min(MAX_PULSACIONES, aPersonas[i].numPulsaciones);

            totalPulsaciones += aPersonas[i].numPulsaciones;
            aPersonas[i].txBuscar =   aPersonas[i].txNombre + ' '
                                    + aPersonas[i].txDepartamento + ' ' 
                                    + aPersonas[i].txEmpresa;

            aPersonas[i].txBuscar = replaceChars(aPersonas[i].txBuscar.toLowerCase()); 
        };
        $('#textoLema, #introMovil p').html(TEXTO_LEMA_INIT+formatNumber(totalPulsaciones)+TEXTO_LEMA_FIN);
        mediaPulsaciones = Math.round(totalPulsaciones/aPersonas.length);

    }

    if (event.item.id == RUTA_VERTICES_JSON)
    {
      vertexData = $.parseJSON(event.rawResult);
    }
}

function formatNumber(numero, separador_miles)
{

    numero=numero.toString();

    var miles=new RegExp("(-?[0-9]+)([0-9]{3})");
    while(miles.test(numero)) {
        numero=numero.replace(miles, "$1" + "." + "$2");
    }

    return numero;
}

function handleFileProgress(event) 
{
    trace(event.item.id + ' -> ' + event.progress); // Set the width the progress.
}

// Overall progress handler
function handleOverallProgress(event) 
{
    //trace('total -> ' + preload.progress);
    preloadReal = preload.progress*100;
}

// An error happened on a file
function handleFileError(event) 
{
    trace("error preload ->" + event.item.id);
}

function handleComplete(event) 
{
   //initAll();
}

function animaPreload() 
{
    if (preloadReal > preloadSmooth)
        preloadSmooth ++;
    $('#info').html(preloadSmooth + ' %');

    if (preloadSmooth < 100)
        setTimeout(animaPreload, 1000/60);
    else
        TweenMax.to($('#info, #preload'), 1, {autoAlpha:0, onComplete:initAll});
}

function initAll()
{
    if (!Modernizr.mobile)
        initAudio();
    
    init3D();
    animate();
}

function trace (string)
{
    if (DEBUG)
        console.log(string);
}

function encode_utf8(s) {
  return unescape(encodeURIComponent(s));
}

function decode_utf8(s) {
  return decodeURIComponent(escape(s));
}


function replaceChars(str) 
{
    str = str.replace(/á/g, 'a');
    str = str.replace(/é/g, 'e');
    str = str.replace(/í/g, 'i');
    str = str.replace(/ó/g, 'o');
    str = str.replace(/ú/g, 'u');

    str = str.replace(/à/g, 'a');
    str = str.replace(/è/g, 'e');
    str = str.replace(/ì/g, 'i');
    str = str.replace(/ò/g, 'o');
    str = str.replace(/ù/g, 'u');

    return str;
}

