/**
 * @author alteredq / http://alteredqualia.com/
 * @author mr.doob / http://mrdoob.com/
 */

var Detector = {

	canvas: !! window.CanvasRenderingContext2D,
	webgl: ( function () { try { var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) ); } catch( e ) { return false; } } )(),
	workers: !! window.Worker,
	fileapi: window.File && window.FileReader && window.FileList && window.Blob,


	getWebGLErrorMessage: function () 
	{
		$( "body" ).children().css( "display", "none" );
		$( "#preload" ).children().css( "display", "none" );
		
		var element = document.createElement( 'div' );
		element.id = 'webgl-error-message';
		element.style.fontFamily = 'Exo';
		element.style.fontSize = '13px';
		element.style.fontWeight = 'normal';
		element.style.textAlign = 'center';
		element.style.background = 'transparent';
		element.style.color = '#fff';
		// element.style.padding = '1.5em';
		// element.style.width = '400px';
		// element.style.margin = '5em auto 0';

		var videoVimeo = '<iframe src="//player.vimeo.com/video/114899371?title=0&amp;byline=0&amp;portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
		var videoVimeoMovil = '<iframe src="//player.vimeo.com/video/114899371?title=0&amp;byline=0&amp;portrait=0" width="300" height="169" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';

			
		if (Modernizr.mobile)
		{
			var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
			if (iOS)
			{
					element.innerHTML = [
						'<div id="webgl-error-message" class="movilWebGl">'+
							'<div class="doc"></div>'+
							'<h1>Esta p&aacute;gina web utiliza WebGL <br/>y s&oacute;lo funciona con iOS 8</h1>'+
							'Te recomendamos entrar desde tu ordenador <br/>o actualizar tu sistema<br/><br/>'+
							'<p>En cualquier caso, puedes ver el v&iacute;deo de la experiencia:</p>'+
							videoVimeoMovil+						
						'</div>'
					].join( '\n' );
			}
			else
			{
				element.innerHTML = [
					'<div id="webgl-error-message" class="movilWebGl">'+
						'<div class="doc"></div>'+
						'<h1>Esta p&aacute;gina web utiliza WebGL, <br/>y tu dispositivo no lo soporta.</h1>'+
						'Te recomendamos entrar desde tu ordenador <br/>o actualizar tu dispositivo y tu navegador<br/><br/>'+
						'<p>En cualquier caso, puedes ver el v&iacute;deo de la experiencia:</p>'+
						videoVimeoMovil+
					'</div>'
				].join( '\n' );
			}
		}
		else
		{
			$( "body" ).css( "overflow", "scroll" );

			if (navigator.userAgent.indexOf("Safari") > -1)
			{
				
				
				element.innerHTML = [
				'<div id="webgl-error-message">'+
					'<div class="doc"></div>'+
					'<h1>Esta p&aacute;gina web utiliza WebGL,<br/> y tu ordenador no lo soporta.</h1>'+
					'<table><tr><td style="text-align:left;"><p>Te recomendamos que pruebes desde Chrome</p>'+
					'<a href="http://www.google.com/chrome" target="_blank">Descargar Chrome</a></td>'+
					'<td>O</td>'+
					'<td style="text-align:left;"><p>Tambi&eacute;n puedes activar probar a WebGL en Safari:</p>'+
					'<p>1 - Entra en preferencias de Safari, pesta&ntilde;a Avanzado, y activa "Mostrar el men&uacute; Desarrollo"</p>'+
					'<p>2 - Entra en el men&uacute; desarrollo, y haz click en "Activar WebGL"</p></td></tr></table>'+
					'<p>En cualquier caso, puedes ver el v&iacute;deo de la experiencia:</p>'+
					videoVimeo+
				'</div>'
				].join( '\n' );
			}
			else
			{
				element.innerHTML = [
				'<div id="webgl-error-message">'+
					'<div class="doc"></div>'+
					'<h1>Esta p&aacute;gina web utiliza WebGL,<br/> y tu ordenador no lo soporta.</h1>'+
					'Te recomendamos que pruebes desde Chrome <br/>'+
					'<a href="http://www.google.com/chrome" target="_blank">Descargar Chrome</a><br/>'+
					'<p>En cualquier caso, puedes ver el v&iacute;deo de la experiencia:</p>'+
					videoVimeo+
				'</div>'
				].join( '\n' );
			}
		}

		 

	

		return element;

	},

	addGetWebGLMessage: function ( parameters ) {

		var parent, id, element;

		parameters = parameters || {};

		parent = parameters.parent !== undefined ? parameters.parent : document.body;
		id = parameters.id !== undefined ? parameters.id : 'oldie';

		element = Detector.getWebGLErrorMessage();
		element.id = id;

		parent.appendChild( element );

	}

};

// browserify support
if ( typeof module === 'object' ) {

	module.exports = Detector;

}
