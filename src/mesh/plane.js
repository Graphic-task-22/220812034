import*as THREE from"three";

const geometry = new THREE.PlaneGeometry(200,100,100,100);

const texLoader = new THREE.TextureLoader();
const texture = texLoader.load("./src/assets/snowflake2.png");

texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;// uv两个方向纹理重复数量
console.log('THREE.RepeatWrapping',THREE.RepeatWrapping);
texture.repeat.set(5,5);//注意选择合适的阵列数量


const material = new THREE.MeshPhongMaterial({map:texture,});

const plane = new THREE.Mesh(geometry, material);
plane.rotation.x = -Math.PI / 2; // 让平面水平放置



export default plane;