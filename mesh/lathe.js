import * as THREE from 'three';

const pointsArr = [
    new THREE.Vector2(20, 20),
    new THREE.Vector2(-60, 50),
    new THREE.Vector2(-20, 80),
    new THREE.Vector2(0, 150)
];

const lathe = new THREE.LatheGeometry(pointsArr);

const materail = new THREE.MeshLambertMaterial({
    color: new THREE.Color('pink'),
    side: THREE.DoubleSide
});

const mesh = new THREE.Mesh(lathe, materail);

const geometry2 = new THREE.BufferGeometry();
geometry2.setFromPoints(pointsArr);
const material2 = new THREE.PointsMaterial({
    color: new THREE.Color('blue'),
    size: 10,
    wireframe:true,
});
const points2 = new THREE.Points(geometry2, material2);
const line2 = new THREE.Line(geometry2, new THREE.LineBasicMaterial());
mesh.add(points2, line2);

export default mesh;
