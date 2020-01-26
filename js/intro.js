function playIntro()
{	
	if (Modernizr.mobile)
	{
		introMovil();
	}
	else
	{
		if (Modernizr.localstorage && localStorage.getItem("introVista") == "visitado")
		{
			finIntro();
			return;
		}

		var wait = 0;
		var time = 0;

		TweenMax.to($('#intro'),	 	0.0, {autoAlpha: 1, display:"block", delay:0.0 });
		TweenMax.to($('#intro h1'),	 	0.0, {autoAlpha: 0, delay:0.0 });

		TweenMax.to($('.t1, .t2, .t3'), 0.5, {autoAlpha: 1, delay:0.8 + wait });
		TweenMax.to($('.t1, .t2, .t3'), 0.5, {autoAlpha: 0, delay:3.8 + wait });
	 
		TweenMax.to($('.t4'),			0.5, {autoAlpha: 1, delay:1.5 + wait });
		TweenMax.to($('.t4'),			0.5, {autoAlpha: 0, delay:3.8 + wait });
	 
		TweenMax.to($('.t5, .t6, .t7'), 0.5, {autoAlpha: 1, delay:4.5 + wait });
		TweenMax.to($('.t5, .t6, .t7'), 0.5, {autoAlpha: 0, delay:7.9 + wait });
	 
		TweenMax.to($('.t8'),			0.5, {autoAlpha: 1, delay:5.0 + wait });
		TweenMax.to($('.t8'),			0.5, {autoAlpha: 0, delay:7.9 + wait });
	 
		TweenMax.to($('.t9'),			0.5, {autoAlpha: 1, delay:8.8 + wait });
		TweenMax.to($('.t9'),			0.5, {autoAlpha: 0, delay:11.1 + wait });
	 
		TweenMax.to($('.t10'),			0.5, {autoAlpha: 1, delay:9.3 + wait });
		TweenMax.to($('.t10'),			0.5, {autoAlpha: 0, delay:11.1 + wait , onComplete:finIntro});
	}
}

function introMovil()
{
	TweenMax.to($('#introMovil'),	 	0.0, {autoAlpha: 0});
	TweenMax.to($('#introMovil'),	 	1.0, {autoAlpha: 1, display:"block", delay:0.0 });
}

function finIntro ()
{
	if (Modernizr.mobile)
	{
		TweenMax.to($('#introMovil'),	1.0, {autoAlpha: 0, display:"none", delay:1.0 });
		$('#introMovil').css("pointer-events", "none")
        initAudio();
        setTimeout(finIntroDos, 2000);
	}
	else
	{
		finIntroDos();
	}
}

function finIntroDos()
{
	TweenMax.to($('#intro'), 0.0, {autoAlpha: 1, display:"none", delay:0.0 });
	createObjects();
	initInterfaz();
	createParticles();

	if (Modernizr.localstorage)
		localStorage.setItem("introVista", "visitado");
}
