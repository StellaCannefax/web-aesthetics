var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer({ alpha: true });

renderer.setClearColor( 0x000000, 0 );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var cubes = [];
var animSpeed = 1;
camera.position.z = 8;

function randInt(min,max){
	return Math.floor(Math.random() * (max-min)+1);
}

function gc(){			
	var maxLength = 1000;			// get these objects out of use
	if (cubes.length> maxLength) {
		cubes.splice(0, cubes.length-maxLength)
	}
}

function randomPos(shape, range) {

	shape.applyMatrix( new THREE.Matrix4().makeTranslation(
		randInt(-range,range),randInt(-range,range),randInt(-range,range)
		)
	);
}

function moveToMouse(shape){

	shape.applyMatrix( new THREE.Matrix4().makeTranslation(
		mousePos.x/200, -mousePos.y/200, 0
		)
	);	
}

function makeIco(size) {
	
	var randColor = '#'+Math.floor(Math.random()*16777215).toString(16);
	var geometry =  new THREE.IcosahedronGeometry(size);
	var material = new THREE.MeshBasicMaterial( { color: randColor, transparent:true , opacity:0.67 } );
	var ico = new THREE.Mesh( geometry, material );
	
	scene.add(ico);
	cubes.push(ico);
	return ico
}

function makeText(text, fontSize) {
	
	var randColor = '#'+Math.floor(Math.random()*16777215).toString(16);
	var geometry =  new THREE.TextGeometry(text,{size:fontSize});
	var material = new THREE.MeshBasicMaterial( { color: randColor, transparent:true , opacity:0.64 } );
	var ico = new THREE.Mesh( geometry, material );
	
	scene.add(ico);
	cubes.push(ico);
	return ico
}

function render() {
	requestAnimationFrame(render);

    /*
    for (n = 0 ; n = cubes.length; n++) {
        var cube = cubes[n]
		cube.rotation.x += 0.1;
		cube.rotation.y += 0.1;
		cube.position.x -= 0.25;
    }
    */

	cubes.forEach(function(cube) {
		cube.rotation.x -= 0.15 * animSpeed;
		cube.rotation.y += 0.15 * animSpeed;
		cube.position.x -= 0.175 * animSpeed;
		cube.position.y -= 0.05 * animSpeed;
	});
	renderer.render(scene, camera);
}

setInterval(gc, 4000); // free objects not used every 4 seconds

// big cubes
bigCubes = setInterval(function(){
	var cube = makeText("Love Hz", 10);
	randomPos(cube, 4);
}, 250);

// medium cubes
mediumIcos = setInterval(function(){
	var cube = makeText("420 blaze it", 12); 
	randomPos(cube, 1.5);
}, 100);


//tiny cubes
tinyIcos = setInterval(function() { 
	var cube = makeIco(0.75);	
	moveToMouse(cube);
	randomPos(cube, 2.5);
}, 25);

//tiny cubes
setInterval(function() { 
	var cube = makeIco(0.5);	
	moveToMouse(cube);
}, 25);

//extra tiny
setInterval(function() { 
	var cube = makeIco(0.25);	
	moveToMouse(cube);
	randomPos(cube, 3);
}, 10);

setInterval(function() { 
	var cube = makeIco(0.175);	
	randomPos(cube, 4)
}, 10);

render();
