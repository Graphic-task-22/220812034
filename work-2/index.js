import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';

import tunnel, { tunnelCurve } from './demo/tunnel.js';

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

  // 把管道模型加入场景
  scene.add(tunnel);

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

  // 摄像机沿曲线移动
  t += speed;
  if (t > 1) t -= 1;

  // 计算摄像机位置
  const camPos = tunnelCurve.getPoint(t);
  camera.position.copy(camPos);

  // 计算摄像机看向点，略微前进一点
  const lookAtT = (t + 0.01) % 1;
  const lookAtPos = tunnelCurve.getPoint(lookAtT);
  camera.lookAt(lookAtPos);

  stats.update();
  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

init();
animate();
