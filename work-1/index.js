import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

// ========== 模块导入 ==========
import sphere from './mesh/sphere';




// ========== 全局变量 ==========
let scene, camera, renderer, mesh, stats;

function init() {
  // ===== 场景 =====
  scene = new THREE.Scene();

  // ===== 摄像机 =====
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
 camera.position.set(150, 100, 100);   // 更靠近地球
camera.lookAt(0, 50, 50);             // 对准地球中心



  // ===== 渲染器 =====
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 1); // 背景色黑色
  document.body.appendChild(renderer.domElement);

  scene.add(sphere);

  // ===== 灯光 =====
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  // ===== 阴影效果 =====
  // renderer.shadowMap.enabled = true;
  // renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(200, 300, 200);
  scene.add(directionalLight);

  // ===== 辅助坐标系 =====
  // const axesHelper = new THREE.AxesHelper(200);
  // scene.add(axesHelper);

}

// ========== 性能监控 ==========
function initStats() {
  stats = new Stats();
  document.body.appendChild(stats.domElement);
}

// ========== 动画循环 ==========
function animate() {
  requestAnimationFrame(animate);

  // 旋转地球仪
  if (sphere) {
    sphere.rotation.y += 0.002;  // 绕Y轴慢慢转动，实现地球自转
  }

  stats.update();
  renderer.render(scene, camera);
}



// ========== 自适应窗口 ==========
window.addEventListener('resize', () => {
  if (!renderer || !camera) return;
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

// ========== 执行入口 ==========
init();
initStats();
animate();