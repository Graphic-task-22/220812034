import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';

const geometry = new THREE.PlaneGeometry(3000, 3000, 100, 100);
const noise2D = createNoise2D();

// 初始化顶点颜色数组
const colors = new Float32Array(geometry.attributes.position.count * 3); // RGB per vertex
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

// 用于颜色插值
const colorLow = new THREE.Color('#8579ec');
const colorMid = new THREE.Color('#cdb7f7');
const colorHigh = new THREE.Color('#8579ec');

export function updatePosition() {
  const positions = geometry.attributes.position;
  const colors = geometry.attributes.color;

  let minZ = Infinity;
  let maxZ = -Infinity;

  // 先计算所有z值
  const zValues = [];

  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);

    const z = noise2D(x / 300, y / 300) * 50;
    const sinNum = Math.sin(Date.now() * 0.002 + x * 0.05) * 10;
    const finalZ = z + sinNum;

    zValues[i] = finalZ;

    if (finalZ < minZ) minZ = finalZ;
    if (finalZ > maxZ) maxZ = finalZ;
  }

  // 再根据z值更新顶点和颜色
  for (let i = 0; i < positions.count; i++) {
    const finalZ = zValues[i];
    positions.setZ(i, finalZ);

    const normalized = (finalZ - minZ) / (maxZ - minZ);
    let vertexColor = new THREE.Color();

    if (normalized < 0.5) {
      vertexColor.lerpColors(colorLow, colorMid, normalized * 2); // 0.0 -> 0.5
    } else {
      vertexColor.lerpColors(colorMid, colorHigh, (normalized - 0.5) * 2); // 0.5 -> 1.0
    }

    colors.setXYZ(i, vertexColor.r, vertexColor.g, vertexColor.b);
  }

  positions.needsUpdate = true;
  colors.needsUpdate = true;
}

// 使用支持顶点颜色的材质
const material = new THREE.MeshBasicMaterial({
  vertexColors: true,
  wireframe: false,
});

const mountain = new THREE.Mesh(geometry, material);
mountain.rotateX(-Math.PI / 2);

export default mountain;

