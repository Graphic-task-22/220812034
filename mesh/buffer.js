import * as THREE from 'three';

const geometry = new THREE.BufferGeometry();

const indexes = new Uint16Array([
    0, 1, 2,
     2, 1, 3 // 顶点索引顺序
]);

const vertices = new Float32Array([
    0, 0, 0,   //0
    100, 0, 0,  //1
    0, 100, 0,  //2

    // 5, 100, 0,  //2
    // 105, 0, 0,  //1
    100, 100, 0  //3
]);

const attribute = new THREE.BufferAttribute(vertices, 3);
geometry.attributes.position = attribute;

//geometry.index = new THREE.BufferAttribute

const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color('orange'),
    wireframe:true,
});

const mesh = new THREE.Mesh(geometry, material);
console.log('buffer',mesh);
export default mesh;