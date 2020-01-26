
function createObjects()
{
	var loader = new THREE.ColladaLoader();
	loader.options.convertUpAxis = true;
	loader.load( RUTA_CORAZON_GRANDE_DAE, completeCorazon);

	sprite = THREE.ImageUtils.loadTexture( RUTA_CORAZON_PEQUE );

	material = new THREE.PointCloudMaterial( { 
		size: TAM_PARTICULA, 
		map: sprite, 
		blending: THREE.AdditiveBlending, 
		depthTest: false, 
		transparent : true,
		opacity: CORAZON_PEQUE_OPACITY_DETRAS
	});
	particles = new THREE.PointCloud( new THREE.Geometry(), material );

	particles.renderDepth = 200;
	
	for (i=0; i < MAX_PARTICLES; i++)
	{
		var vertex = new THREE.Vector3();
		vertex.z = -10000;
		particles.geometry.vertices.push( vertex );
	}

	scene.add( particles );

	//setTimeout(createParticles, WAIT_TO_START);
}

function completeCorazon(collada)
{
	var matCorazon = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture(RUTA_CORAZON_GRANDE), transparent: true} ); // new THREE.MeshLambertMaterial( { selfillumination:true, map: THREE.ImageUtils.loadTexture(RUTA_CORAZON_GRANDE), transparent:true, color: 0xb00000, wireframe: false } );
	dae = collada.scene;
	dae.updateMatrix();
	corazon = dae.children[0];
	corazon.rotation.y = -90 * Math.PI / 180;
	corazon.children[0].material = matCorazon;
	corazon.scale.set(CORAZON_SCALE,CORAZON_SCALE,CORAZON_SCALE);
	corazon.children[0].material.opacity = 0;
	corazon.renderDepth = 100;
	scene.add(corazon);
	onWindowResize();
}

function createParticles()
{	

	for (i=0; i < Math.min(MAX_PARTICLES/100); i++)
	{	
		if (partCreated < MAX_PARTICLES)
			createParticle();
	}

	if (partCreated < MAX_PARTICLES)
	{
		setTimeout(createParticles, 10);
	}
	else
	{
		allParticlesCreated();
	}
}

function allParticlesCreated()
{
	if (userLoad != "")
	{
		var split = userLoad.split("_");
		var pulso = split[split.length-1];
		var nombre = "";
		for (i=0; i<split.length-1;i++)
		{
			if (i > 0)
				nombre += "_";
			nombre += split[i];

		}

		vertexSelected = null;
		for (i=0; i < aPersonas.length; i++)
		{
			var nombreSin = particles.geometry.vertices[i].persona.txNombre.replace(/\s/g,'');
			if (nombreSin == nombre && particles.geometry.vertices[i].persona.numPulsaciones == pulso)
			{
				vertexSelected = particles.geometry.vertices[i];
			}
		}

		setTimeout(function(){hacerZoom();}, WAIT_TO_START*2);
	}
	else
	{
		activaLatidos = true;
	}
	
	playHeart();

	setTimeout(createListeners, WAIT_TO_START);
}

function createParticle()
{
	vertex = particles.geometry.vertices[partCreated];
	
	vertex.ox = vertexData[partCreated].x;
	vertex.oy = vertexData[partCreated].y;
	vertex.oz = vertexData[partCreated].z;

	vertex.x = Math.random() * 5000 - 2500;
	vertex.y = Math.random() * 5000 - 2500;
	vertex.z = Math.random() * 5000 - 2500;

	vertex.animaAngle = Math.random()*Math.PI*2;
	vertex.sinVel = (Math.random() * 0.5 + 0.5 ) * Math.random() < 0.5 ? -1 : 1;
	vertex.cosVel = (Math.random() * 0.5 + 0.5 ) * Math.random() < 0.5 ? -1 : 1;

	vertex.axy = Math.atan2(vertex.oy, vertex.ox);
	vertex.axz = Math.atan2(vertex.oz, vertex.ox);
	vertex.dax = Math.sqrt(vertex.ox*vertex.ox+vertex.oy*vertex.oy);
	vertex.beatForce = 5 + (Math.random() * 100 + 20) * vertex.dax / 400;
	vertex.beatArritmia = Math.random() - 0.5;
	vertex.radioBeat = 0;

	if (partCreated < aPersonas.length)
	{
		aPersonas[partCreated].vertex = vertex;
	}

	vertex.persona = aPersonas[partCreated%aPersonas.length];

	vertex.found = true;
	vertex.delante = true;

	partCreated ++;
}

function createDust ()
{
	dustGeom = new THREE.Geometry();
	dustParticles = [];
	dustMaterials = []

	sprite1 = THREE.ImageUtils.loadTexture( RUTA_DUST1 );
	sprite2 = THREE.ImageUtils.loadTexture( RUTA_DUST2 );
	sprite3 = THREE.ImageUtils.loadTexture( RUTA_DUST3 );
	sprite4 = THREE.ImageUtils.loadTexture( RUTA_DUST4 );
	sprite5 = THREE.ImageUtils.loadTexture( RUTA_DUST5 );

	for ( i = 0; i < 100; i ++ ) {

		var vertex = new THREE.Vector3();
		vertex.x = Math.random() * 1000 - 500;
		vertex.y = Math.random() * 1000 - 500;
		vertex.z = Math.random() * 1000 - 500;

		dustGeom.vertices.push( vertex );

	}

	parameters = [ [ [1.0, 0.2, 0.5], sprite2, 20],
				   [ [0.95, 0.1, 0.5], sprite3, 15],
				   [ [0.90, 0.05, 0.5], sprite1, 10],
				   [ [0.85, 0, 0.5], sprite5, 8],
				   [ [0.80, 0, 0.5], sprite4, 5],
				   ];

	for ( i = 0; i < parameters.length; i ++ ) {

		color  = parameters[i][0];
		spr = parameters[i][1];
		size   = parameters[i][2]/1.5;

		dustMaterials[i] = new THREE.PointCloudMaterial( { size: size, map: spr, blending: THREE.AdditiveBlending, depthTest: false, transparent : true } );
		dustMaterials[i].color.setHSL( color[0], color[1], color[2] );

		dustParticles[i] = new THREE.PointCloud( dustGeom, dustMaterials[i] );

		dustParticles[i].rotation.x = Math.random() * 6;
		dustParticles[i].rotation.y = Math.random() * 6;
		dustParticles[i].rotation.z = Math.random() * 6;
		dustParticles[i].x = -500;
		dustParticles[i].z = -300;
		dustParticles[i].renderDepth = 150;

		camera.add( dustParticles[i] );
	}
}
