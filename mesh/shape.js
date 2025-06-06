import * as THREE from 'three';

const points = [
    new THREE.Vector2(0, 50),
    new THREE.Vector2(14, 15),
    new THREE.Vector2(47, 15),
    new THREE.Vector2(23, -7),
    new THREE.Vector2(29, -40),
    new THREE.Vector2(0, -20),
    new THREE.Vector2(-29, -40),
    new THREE.Vector2(-23, -7),
    new THREE.Vector2(-47, 15),
    new THREE.Vector2(-14, 15),
    new THREE.Vector2(0, 50)  // 回起点
];


const shape = new THREE.Shape(points);
const geometryshape = new THREE.ShapeGeometry(shape);
const path = new THREE.Path();
const r = 10; // 外径
const r2 = r * 0.5; // 内径

for (let i = 0; i < 10; i++) {
    const angle = (Math.PI / 5) * i;
    const radius = i % 2 === 0 ? r : r2;
    const x = Math.cos(angle - Math.PI / 2) * radius;
    const y = Math.sin(angle - Math.PI / 2) * radius;

    if (i === 0) {
        path.moveTo(x, y);
    } else {
        path.lineTo(x, y);
    }
}
path.closePath();
shape.holes.push(path);


const geometry2 = new THREE.ExtrudeGeometry(shape, {
    depth: 100
});




const material = new THREE.MeshLambertMaterial({
    color: new THREE.Color('yellow'),
    //wireframe:true,
    side:THREE.DoubleSide,
});

const mesh = new THREE.Mesh(geometry2, material);

export default mesh;