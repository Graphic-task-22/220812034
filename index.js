import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

// ========== 模块导入 ==========
import sphere from './mesh/sphere';
import plane from './mesh/plane';
import sprite from './sprite/sprite';
import points from './points/points';
import line from './mesh/line';
import curve from './mesh/curve';
import curveObject from './line/QuadraticBezierCurve';
import geometry from './mesh/buffer';
import lathe from './mesh/lathe';
import tube from './mesh/tube';
import tunnel, { tubePoints } from './demo/tunnel';
import geometryshape from './mesh/shape';
import cube from './mesh/cube';
//import line from './line/splineCurve';
import mountain, { updatePosition } from './mesh/mountain';
import createHouse from './mesh/house'; 


// ========== 全局变量 ==========
let scene, camera, renderer, mesh, stats;

function init() {
  // ===== 场景 =====
  scene = new THREE.Scene();

  // ===== 摄像机 =====
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
  camera.position.set(450, 150, 100);
  camera.lookAt(0, 0, 0);

  // ===== 渲染器 =====
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 1); // 背景色黑色
  document.body.appendChild(renderer.domElement);

  // ===== 可选模型=====
  // scene.add(cube);
  // scene.add(sphere);
  // scene.add(plane);
  // scene.add(sprite);
  // scene.add(points);
  // scene.add(line);
  // scene.add(curve);
  // scene.add(curveObject);
  // scene.add(geometry);
  // scene.add(lathe);
  // scene.add(tube);
  // scene.add(geometryshape);
  // scene.add(tunnel);
  // scene.add(mountain);
const house = createHouse(); 
scene.add(house);


  mesh = mountain; // 供动画函数使用

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

  // ===== 轨道控制器 =====
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', () => {
    renderer.render(scene, camera);
  });
}

// ========== 性能监控 ==========
function initStats() {
  stats = new Stats();
  document.body.appendChild(stats.domElement);
}

// ========== 动画循环 ==========
function animate() {
  requestAnimationFrame(animate);
  if (mesh) {
    updatePosition();            // 更新山脉顶点
    mesh.rotation.z += 0.003;    // 原有旋转保留
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

// ========== GUI 示例（保留但注释） ==========

// const gui = new GUI();
// const obj = { x: 30 };

// const folder1 = gui.addFolder('物体');
// const folder2 = folder1.addFolder('立方体');
// folder2.add(cube.position, 'x', -60, 60).name('立方体x坐标');
// folder2.add(cube.position, 'y', -60, 60).name('立方体y坐标');
// folder2.add(cube.position, 'z', -60, 60).name('立方体z坐标');

// const folder3 = folder1.addFolder('材质');
// const folder4 = folder3.addFolder('颜色');
// folder4.addColor(cube.material, 'color').name('立方体颜色');
// folder4.addColor(sphere.material, 'color').name('球体颜色');

// const folder5 = folder3.addFolder('透明度');
// folder5.add(cube.material, 'transparent').name('立方体是否透明');
// folder5.add(cube.material, 'opacity', 0, 1).name('立方体透明度');

// gui.close();
