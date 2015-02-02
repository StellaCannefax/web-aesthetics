// variables used in init()
var scene, camera, renderer, stats, stats2, clock, controls;


// Used in initParticles()
var emitter; 
var particleGroup = {};
var projector = new THREE.Projector();
var fft_co = 20

function groupToMouse(group) {
    
    var vector = new THREE.Vector3(
        ( mousePos.x / window.innerWidth ) * 2 - 1,
        - ( mousePos.y / window.innerHeight ) * 2 + 1,
        0.5 );

    vector.unproject( camera );
    var dir = vector.sub( camera.position ).normalize();
    var distance = - camera.position.z / dir.z;
    var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );

    group.emitters.forEach(function(element, index, array) {
        element.position = pos;
    });
}

function mouseClicked() {
    var vector = new THREE.Vector3(
        ( mouseClick.x / window.innerWidth ) * 2 - 1,
        - ( mouseClick.y / window.innerHeight ) * 2 + 1,
        0.5 );

    projector.unprojectVector( vector, camera );
    var dir = vector.sub( camera.position ).normalize();
    var distance = 50;
    var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
        
    console.log(pos);
    makeCube(1, pos);
}

// Setup the scene
function initTrackball() {
    controls = new THREE.TrackballControls( camera );

    controls.rotateSpeed = 0.05;
    controls.zoomSpeed = 0.2;
    controls.panSpeed = 0.2;
    controls.noZoom = false;
    controls.noPan = false;

    controls.staticMoving = false;
    controls.dynamicDampingFactor = 0.8;

    controls.keys = [ 65, 83, 68 ];
}

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 10000);
    camera.position.z = 42;
    camera.lookAt( scene.position );

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize( window.innerWidth/3, window.innerHeight/3 );
    $('canvas').toggleClass('stretch');    
    renderer.setClearColor( 0x000000, 0 ); 
   
    //initTrackball();

    stats = new Stats();
    clock = new THREE.Clock();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0';

    document.body.appendChild( renderer.domElement );
    document.body.appendChild( stats.domElement );
}

// Create particle group and emitter
function initParticles() {
    particleGroup = new SPE.Group({
        texture: THREE.ImageUtils.loadTexture('./img/star.png'),
        maxAge: 4
    });

    particleCursor = new SPE.Group({
        texture: THREE.ImageUtils.loadTexture('./img/smokeparticle.png'),
        maxAge: 1.2
    });
    emitter = new SPE.Emitter({
        type: 'sphere',
        position: new THREE.Vector3(0, 0, 0),
        radius: 42,
        speed: .42,
        colorStart: new THREE.Color('blue'),
        colorStartSpread: new THREE.Vector3(10, 10, 10),
        colorEnd: new THREE.Color('purple'),
        sizeStart: 6,
        sizeStartSpread: 4,
        sizeEnd: .5,
        opacityStart: .25,
        opacityMiddle: .666,
        opacityEnd: .42,
        particleCount: 800,
        angleAlignVelocity: 1
    });

    smallEmitter = new SPE.Emitter({
        type: 'sphere',
        position: new THREE.Vector3(0, 0, 0),
        radius: 33,
        speed: 3.666,
        colorStart: new THREE.Color('purple'),
        colorStartSpread: new THREE.Vector3(5, 5, 25),
        colorEnd: new THREE.Color('green'),
        sizeStart: 2,
        sizeEnd: 1,
        opacityStart: .75,
        opacityMiddle: .666,
        opacityEnd: .333,
        particleCount: 1000,
        particlesPerSecond: 50,
    });
    
    smallerEmitter = new SPE.Emitter({
        type: 'sphere',
        position: new THREE.Vector3(-20, 30, 25),
        radius: 75,
        speed: 20,
        colorStart: new THREE.Color('purple'),
        colorStartSpread: new THREE.Vector3(10, 15, 40),
        colorEnd: new THREE.Color('azure'),
        sizeStart: 4,
        sizeEnd: .5,
        opacityStart: .85,
        opacityMiddle: .7,
        opacityEnd: .666,
        particleCount: 2500,
        particlesPerSecond: 300,
    });
    
    smallerEmitter2 = new SPE.Emitter({
        type: 'sphere',
        position: new THREE.Vector3(30, -20, -15),
        radius: 100,
        speed: 42,
        colorStart: new THREE.Color('purple'),
        colorStartSpread: new THREE.Vector3(-10, -15, -40),
        colorEnd: new THREE.Color('azure'),
        sizeStart: 5,
        sizeEnd: 2,
        opacityStart: .6,
        opacityMiddle: .7,
        opacityEnd: .8,
        particleCount: 1500,
        particlesPerSecond: 300,
    });
    
    smallerEmitter3 = new SPE.Emitter({
        type: 'sphere',
        position: new THREE.Vector3(5, 0, -5),
        radius: 112,
        speed: 88,
        colorStart: new THREE.Color('green'),
        colorStartSpread: new THREE.Vector3(10, -15, 20),
        colorEnd: new THREE.Color('purple'),
        sizeStart: 7,
        sizeEnd: 3,
        opacityStart: .8,
        opacityMiddle: .88,
        opacityEnd: .7,
        particleCount: 1250,
        particlesPerSecond: 200,
    });

    centerEmitter = new SPE.Emitter({
        type: 'sphere',
        position: new THREE.Vector3(0, 0, 0),
        radius: 10,
        speed: 4,
        colorStart: new THREE.Color('aqua'),
        colorStartSpread: new THREE.Vector3(10, -25, 50),
        colorEnd: new THREE.Color('orange'),
        sizeStart: 2,
        sizeEnd: 4,
        opacityStart: .6,
        opacityMiddle: .5,
        opacityEnd: .4,
        particleCount: 750,
        particlesPerSecond: 40,
    });
    for (var n=1 ; n < 6 ; n++) {
        var dir = 1;
        if (n%2 != 0){ 
            dir = -1;
        }
        starEmitter = new SPE.Emitter({
            type: 'sphere',
            position: new THREE.Vector3(n*5*dir, n*5*dir, n*5*dir),
            positionSpread: new THREE.Vector3(n, n, n),
            radius: 2*n,
            speed: 1.25*n,

            colorStart: new THREE.Color('blue'),
            colorStartSpread: new THREE.Vector3(5+n*2, 5, 5),
            colorEnd: new THREE.Color('aquamarine'),
            colorEndSpread: new THREE.Vector3(10, 10, 10),
            sizeStart: .75,
            sizeEnd: 1.25,
            opacityStart: .8,
            opacityMiddle: .75,
            opacityEnd: .6,
            particleCount: 200,
            particlesPerSecond: 12,
        });
        console.log(starEmitter);
        particleCursor.addEmitter( starEmitter );
    }
    
    particleGroup.addEmitter( emitter );
    particleGroup.addEmitter( smallEmitter );
    particleGroup.addEmitter( smallerEmitter );
    particleGroup.addEmitter( smallerEmitter2 );
    particleGroup.addEmitter( smallerEmitter3 );
    particleGroup.addEmitter( centerEmitter );
    scene.add( particleGroup.mesh );
    scene.add( particleCursor.mesh );
    console.log( particleCursor );
    console.log( particleGroup );

	//document.querySelector('.numParticles').textContent =
    //    'Total particles: ' + emitter.numParticles; 
}



function animate() {
    requestAnimationFrame( animate );
    //controls.update();
    // Using a fixed time-step here to avoid pauses
    render( 0.016 );
    stats.update();
}

function updateCamera() {
    var now = Date.now() * 0.00025 + fft_co/100000 ;
    camera.position.x = Math.sin( now ) * 50;
    camera.position.z = Math.cos( now ) * 100;
    camera.lookAt( scene.position );
}

//var controls = new THREE.TrackballControls( camera ); 
//controls.target.set( 0, 0, 0 ) 

function render( dt ) {
    particleGroup.tick( dt );
    particleCursor.tick( dt );
    updateCamera();
    renderer.render( scene, camera );
}


window.addEventListener( 'resize', function() {
    var w = window.innerWidth,
        h = window.innerHeight;

    camera.aspect = w / h;
    camera.updateProjectionMatrix();

    renderer.setSize( w, h );
}, false );

init();
initParticles();

setTimeout(animate, 10);
setInterval(function(){ 
    groupToMouse(particleCursor); 
}, 67);








