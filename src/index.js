import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import cube from './mesh/cube';
import sphere from './mesh/sphere';
import plane from './mesh/plane';
import sprite from './sprite/sprite';
import points from './points/points';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

let renderer, camera, scene,ambientLight; // 全局变量 场景、相机、渲染器
function init() {
   // Create a scene
  scene = new THREE.Scene();
  // console.log('cube', cube);
  // // Add the cube to the scene
   //scene.add(cube);
  // // // Add the sphere to the scene
  scene.add(sphere);
  //scene.add(plane);
  //scene.add(sprite);
  //scene.add(points);



const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 100, 100); // 设置光源位置
directionalLight.castShadow = true; // 启用阴影
scene.add(directionalLight);

  // 环境光
  ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
  scene.add(ambientLight);

  // Create a camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(100, 100, 100);
  // 设置相机看向的位置
  camera.lookAt(0, 0, 0);
  // Create a renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xffffff, 1); // 设置背景色为白色
  renderer.render(scene, camera);
  // Add the canvas element created by the renderer to document body
  // domElement(canvas)
  document.body.appendChild(renderer.domElement);
}

// onresize 事件会在窗口被调整大小时发生
window.onresize = function () {
  if (!renderer) return;
  // 重置渲染器输出画布canvas尺寸
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
  //没有动画的时候需要重新render
  // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
  camera.aspect = window.innerWidth / window.innerHeight;
  // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
  // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
  // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
  camera.updateProjectionMatrix();
};

function initHelper(params) {
  // 辅助坐标轴
  const axesHelper = new THREE.AxesHelper(50);
  scene.add(axesHelper);

  // 设置相机控件轨道控制器OrbitControls
  const controls = new OrbitControls(camera, renderer.domElement);
  // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
  controls.addEventListener('change', function () {
    renderer.render(scene, camera); //执行渲染操作
  }); //监听鼠标、键盘事件

  // 添加一个辅助网格地面 网格地面辅助观察GridHelper
  const gridHelper = new THREE.GridHelper(300, 300, 0x004444, 0x004444);
  scene.add(gridHelper);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  // 立方体旋转
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
}
// 停止动画
function stopA() {
  cube.rotation.x = 0;
  cube.rotation.y = 0;
  renderer.render(scene, camera); // 停止动画后手动渲染一帧
}





function initStats(params) {
  const stats = new Stats();
  //stats.domElement:web页面上输出计算结果,一个div元素，
  document.body.appendChild(stats.domElement);
  // 渲染函数
  function render() {
    //requestAnimationFrame循环调用的函数中调用方法update(),来刷新时间
    stats.update();
    renderer.render(scene, camera); //执行渲染操作
    requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
  }
  render();
}

init();
initHelper();
initStats();
animate();
stopA();


const gui = new GUI();
// 改变对象的属性
const obj = {
  x: 30
}

// 物体
const folder1 = gui.addFolder('物体');
//立方体
const folder2 = folder1.addFolder('立方体');
folder2.add(cube.position,'x',-60,60).name('立方体x坐标');
folder2.add(cube.position,'y',-60,60).name('立方体y坐标');
folder2.add(cube.position,'z',-60,60).name('立方体z坐标');

//材质
const folder3 = folder1.addFolder('材质');
//颜色
const folder4 = folder3.addFolder('颜色');
folder4.addColor(cube.material, 'color').name('立方体颜色');
folder4.addColor(sphere.material, 'color').name('球体颜色');
//透明度
const folder5 = folder3.addFolder('透明度');
folder5.add(cube.material, 'transparent').name('立方体是否透明');
folder5.add(sphere.material, 'transparent').name('球体是否透明').onChange((value) => {
    sphere.material.opacity = value ? 0.5 : 1.0;
  });
folder5.add(cube.material, 'opacity', 0, 1).name('立方体透明度');
folder5.add(sphere.material, 'opacity', 0, 1).name('球体透明度');
//高光（镜面反射）
const folder6 = folder3.addFolder('高光');
folder6.add(cube.material, 'shininess', 0, 100).name('立方体高光');
folder6.add(sphere.material, 'shininess', 0, 100).name('球体高光');

//光源
const folder7 = gui.addFolder('光源');
const folder8 = folder7.addFolder('环境光');
folder8.addColor(ambientLight, 'color').name('颜色');
folder8.add(ambientLight, 'intensity', 0, 2).name('强度').step(0.1).onChange((value) => {
  console.log(value);
});
//点光源
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(50, 50, 50);
scene.add(pointLight);
const folder9 = folder7.addFolder('点光源');
folder9.addColor(pointLight, 'color').name('颜色');
folder9.add(pointLight, 'intensity', 0, 2).name('强度');

// 点光源位置
const folderPosition = folder9.addFolder('位置');
folderPosition.add(pointLight.position, 'x', -100, 100).name('x 坐标');
folderPosition.add(pointLight.position, 'y', -100, 100).name('y 坐标');
folderPosition.add(pointLight.position, 'z', -100, 100).name('z 坐标');

// 执行方法
const settings = {
  clear() {
      folder1.children[1].reset(); // 重置
   },
   setDefault() {

   }
};
folder1.add(settings, 'clear');
folder1.add(settings, 'setDefault'); // 重置到默认值


// // 下拉菜单、单选框
// gui.add(cube.position, 'x', [0, 1, 2, 4,8]);
// gui.add(cube.position, 'x', {
//   min: -10,
//   max: 10,
// });

// 关闭打开菜单
gui.close()
gui.open()
