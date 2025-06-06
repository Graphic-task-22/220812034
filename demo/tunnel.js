import * as THREE from 'three';

// 定义闭环CatmullRomCurve3曲线
const tunnel = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-100, 20, 90),
  new THREE.Vector3(-40, 80, 100),
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(60, -60, 0),
  new THREE.Vector3(100, -40, 80),
  new THREE.Vector3(150, 60, 60),
  new THREE.Vector3(100, 100, 100),
  new THREE.Vector3(0, -80, 0),
], true);

// 创建管道几何体
const geometry = new THREE.TubeGeometry(tunnel, 100, 10, 20, false);

// 纹理加载（注意调整路径）
const loader = new THREE.TextureLoader();
const texture = loader.load('./src/assets/ice.jpg');
texture.wrapS = THREE.RepeatWrapping;
texture.colorSpace = THREE.SRGBColorSpace;
texture.repeat.x = 20;

// 材质
const material = new THREE.MeshLambertMaterial({
  side: THREE.DoubleSide,
  map: texture,
  aoMap: texture,
});

// 创建管道网格
const tube = new THREE.Mesh(geometry, material);

// 导出
export default tube;          // 默认导出管道网格模型
export const tunnelCurve = tunnel; // 导出曲线对象
export const tubePoints = tunnel.getPoints(1000);  // 曲线上细分点
