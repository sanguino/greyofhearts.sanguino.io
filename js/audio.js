var latidos = [];
var timeoutLatidos;
var latidoIndex;
var musica

function initAudio()
{
	musica = new Audio();
	musica.src = Modernizr.audio.ogg ? RUTA_MUSICA_OGG :
	            Modernizr.audio.mp3 ? RUTA_MUSICA_MP3 :
	                                  RUTA_MUSICA_M4A ;

	musica.loop = true;
	musica.volume = .2;
	musica.play();

	for (latidoIndex = 0; latidoIndex < 3; latidoIndex++)
	{
		latidos[latidoIndex] = new Audio();
		latidos[latidoIndex].src = Modernizr.audio.ogg ? RUTA_HEART_OGG :
		             Modernizr.audio.mp3 ? RUTA_HEART_MP3 :
		                                   RUTA_HEART_M4A ;
		latidos[latidoIndex].volume = 0.01;
		latidos[latidoIndex].play();
	}
	latidoIndex = 0;
}

function playHeart ()
{	
    if (activaLatidos || estado == AT_ZOOM)
    {	
    	latidos[latidoIndex].volume = 0.8;
		latidos[latidoIndex].play();
		latidoIndex ++;
		if (latidoIndex >=3)
			latidoIndex = 0;
    }

    if (webIsActive)
    {
    	clearTimeout(timeoutLatidos);
		timeoutLatidos = setTimeout(playHeart, timePerBeat);
    }

}

function pauseSound()
{
	if (musica)
	{
		musica.pause();
	}
}

function replaySound()
{
	if (musica)
	{
		musica.play();
		playHeart ();
	}
}
