// import * as THREE from 'three';
// const tunnel = new THREE.CatmullRomCurve3([
//     new THREE.Vector3(-100, 20, 90),
//     new THREE.Vector3(-40, 80, 100),
//     new THREE.Vector3(0, 0, 0),
//     new THREE.Vector3(60, -60, 0),
//     new THREE.Vector3(100, -40, 80),
//     new THREE.Vector3(150, 60, 60),
//     new THREE.Vector3(100, 100, 100),
//     new THREE.Vector3(0, -80, 0),
//   ], true); // 👈 添加 true，形成闭环
  

// //管道
// const geometry = new THREE.TubeGeometry(tunnel,100,10,20,false);

// const loader = new THREE.TextureLoader();
// const texture = loader.load('./src/assets/ice.jpg');
// texture.wrapS = THREE.RepeatWrapping;
// texture.colorSpace = THREE.SRGBColorSpace;

// texture.repeat.x = 20;
// const material = new THREE.MeshLambertMaterial({
//     //color:pink,
//     side: THREE.DoubleSide,
//     map:texture,
//     aoMap:texture,
//     //wireframe:true,
// });

// const tube = new THREE.Mesh(geometry,material);
// export const tunnelCurve = tunnel;  // 曲线对象
// export const tubePoints = tunnel.getPoints(1000);
// export default tube;  // 管道网格模型

import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';

// 你定义的闭环隧道曲线
const tunnel = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-100, 20, 90),
    new THREE.Vector3(-40, 80, 100),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(60, -60, 0),
    new THREE.Vector3(100, -40, 80),
    new THREE.Vector3(150, 60, 60),
    new THREE.Vector3(100, 100, 100),
    new THREE.Vector3(0, -80, 0),
], true); // 闭环

// 管道几何体（可选加进场景看效果）
const geometry = new THREE.TubeGeometry(tunnel, 100, 10, 20, false);

const loader = new THREE.TextureLoader();
const texture = loader.load('./src/assets/ice.jpg');
texture.wrapS = THREE.RepeatWrapping;
texture.colorSpace = THREE.SRGBColorSpace;
texture.repeat.x = 20;

const material = new THREE.MeshLambertMaterial({
    side: THREE.DoubleSide,
    map: texture,
    aoMap: texture,
});

const tube = new THREE.Mesh(geometry, material);

let scene, camera, renderer, stats;

// 曲线参数，摄像机沿曲线运动
let t = 0;
const speed = 0.001;

function init() {
    scene = new THREE.Scene();

    const width = window.innerWidth;
    const height = window.innerHeight;

    camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
    camera.position.set(450, 150, 100);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 1);
    document.body.appendChild(renderer.domElement);

    // 把管道加入场景，你可以注释掉不显示
    scene.add(tube);

    // 环境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    // 平行光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(200, 300, 200);
    scene.add(directionalLight);

    // 性能监控
    stats = new Stats();
    document.body.appendChild(stats.domElement);
}

function animate() {
    requestAnimationFrame(animate);

    // 让摄像机沿曲线移动
    t += speed;
    if (t > 1) t -= 1;

    // 获取摄像机位置
    const camPos = tunnel.getPoint(t);
    camera.position.copy(camPos);

    // 摄像机看向曲线上下一个点，保持视角跟随
    const lookAtT = (t + 0.01) % 1;
    const lookAtPos = tunnel.getPoint(lookAtT);
    camera.lookAt(lookAtPos);

    stats.update();
    renderer.render(scene, camera);
}

// 窗口自适应
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

init();
animate();
