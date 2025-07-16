import * as THREE from "three";
import{OrbitControls} from "jsm/controls/OrbitControls.js";

const container = document.querySelector('.orbital');
const w = 300;
const h = 300;
const renderer = new THREE.WebGLRenderer({ antialias: true});
renderer.setSize(w, h);
container.appendChild(renderer.domElement);


const fov = 75;
const aspect =w/h;
const near =0.1;
const far =10;
const camera = new THREE. PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor=0.03;
const geo = new THREE.IcosahedronGeometry(
    1.0, 
    3
);
const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    flatShading: true
});
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

const wiremat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
});
const wireMesh = new THREE.Mesh(geo, wiremat);
wireMesh.scale.setScalar(1.001);
mesh.add(wireMesh);

const hemiLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500);
scene.add(hemiLight);

function animate(t = 0) {
    requestAnimationFrame(animate);
    mesh.rotation.y = t * 0.0001;
    renderer.render(scene, camera);
}

animate();
