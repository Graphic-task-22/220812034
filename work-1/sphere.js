import * as THREE from 'three';

var sphereGeometry = new THREE.SphereGeometry(30, 30, 30);
const texLoader = new THREE.TextureLoader();
const texture = texLoader.load("./src/assets/earth_day_4096.jpg");
const material = new THREE.MeshPhongMaterial({map:texture,});
var sphere = new THREE.Mesh(sphereGeometry, material);

sphere.position.set(0, 50, 50);
export default sphere; 


