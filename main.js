import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.164/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.164/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.164/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xfff0f5);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 3, 7);

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const light = new THREE.DirectionalLight(0xffffff, 1.2);
light.position.set(5,10,7);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff,0.6));

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10,10),
    new THREE.MeshStandardMaterial({color:0xe0c4d6})
);
floor.rotation.x = -Math.PI/2;
scene.add(floor);

// Vase
const vaseGeometry = new THREE.CylinderGeometry(0.5,0.3,1.5,32);
const vaseMaterial = new THREE.MeshStandardMaterial({color:0xffc0cb});
const vase = new THREE.Mesh(vaseGeometry,vaseMaterial);
vase.position.y = 0.75;
scene.add(vase);

const loader = new GLTFLoader();

function addFlower(modelPath){
    loader.load(modelPath,(gltf)=>{
        const flower = gltf.scene;
        flower.scale.set(0.5,0.5,0.5);

        const radius = 0.3;
        const angle = Math.random()*Math.PI*2;
        const x = Math.cos(angle)*radius;
        const z = Math.sin(angle)*radius;
        const y = 1.5;

        flower.position.set(x,y,z);
        flower.rotation.y = Math.random()*Math.PI*2;

        scene.add(flower);
    });
}

function clearBouquet(){
    scene.children = scene.children.filter(obj => obj === vase || obj.type === 'DirectionalLight' || obj.type === 'AmbientLight' || obj === floor);
}

function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene,camera);
}

animate();

window.addFlower = addFlower;
window.clearBouquet = clearBouquet;
