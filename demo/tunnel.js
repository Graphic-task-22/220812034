import * as THREE from 'three';
const tunnel = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-100, 20, 90),
    new THREE.Vector3(-40, 80, 100),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(60, -60, 0),
    new THREE.Vector3(100, -40, 80),
    new THREE.Vector3(150, 60, 60),
    new THREE.Vector3(100, 100, 100),
    new THREE.Vector3(0, -80, 0),
  ], true); // 👈 添加 true，形成闭环
  

//管道
const geometry = new THREE.TubeGeometry(tunnel,100,10,20,false);

const loader = new THREE.TextureLoader();
const texture = loader.load('./src/assets/ice.jpg');
texture.wrapS = THREE.RepeatWrapping;
texture.colorSpace = THREE.SRGBColorSpace;

texture.repeat.x = 20;
const material = new THREE.MeshLambertMaterial({
    //color:pink,
    side: THREE.DoubleSide,
    map:texture,
    aoMap:texture,
    //wireframe:true,
});

const tube = new THREE.Mesh(geometry,material);
export const tubePoints = tunnel.getPoints(1000);
export default tube;