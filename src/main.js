/*

	Basic Three.js scene with OrbitControls from three-full.

*/

import {
	WebGLRenderer,
	PerspectiveCamera,
	Vector3,
	OrbitControls,
	Scene,
	MeshBasicMaterial,
	BoxGeometry,
	Mesh,
	PlaneGeometry,
} from 'three-full';
import Stats from 'Stats.js';

//init threejs world
let renderer = new WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
let camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 5000);
camera.position.set(0, 200, 600);
let scene = new Scene();

//controls
let controls = new OrbitControls(camera, renderer.domElement);

//origin box
let material = new MeshBasicMaterial({ color: 0xffffff, wireframe: true });
let boxGeom = new BoxGeometry(100, 100, 100);
let boxMesh = new Mesh(boxGeom, material);
scene.add(boxMesh);

//floor
let planeGeom = new PlaneGeometry(500, 500, 5, 5);
let planeMesh = new Mesh(planeGeom, material);
scene.add(planeMesh);
planeMesh.rotation.x = Math.PI / 2;

//stats
let stats = new Stats();
document.body.appendChild(stats.domElement);

//resize
window.addEventListener('resize', onWindowResize, false);
onWindowResize();

update();

function onWindowResize() {
	let w = window.innerWidth;
	let h = window.innerHeight;
	camera.aspect = w / h;
	camera.updateProjectionMatrix();
	renderer.setSize(w, h);
	renderer.setPixelRatio(window.devicePixelRatio);
}

function update() {
	requestAnimationFrame(update);
	boxMesh.rotation.x += 0.005;
	boxMesh.rotation.y += 0.01;
	renderer.render(scene, camera);
	stats.update();
	controls.update();
}
