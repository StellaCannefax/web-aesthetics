cubes = [];  // pos is a THREE.Vector3
function makeCube(size, pos) {
	
	var randColor = '#'+Math.floor(Math.random()*16777215).toString(16);
	var geometry =  new THREE.CubeGeometry(size,size,size);
	var material = new THREE.MeshLambertMaterial( { color: randColor , transparent:true, opacity: 0.69} );
	var cube = new THREE.Mesh( geometry, material );
	if (pos != undefined) { cube.position = pos ; } 
	
	scene.add(cube);
	cubes.push(cube);
	return cube
}
