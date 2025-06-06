import * as THREE from 'three';

const p1 = new THREE.Vector3(-20, 0, 0);
const p2 = new THREE.Vector3(-90, 100, 0);
const p3 = new THREE.Vector3(100, 0, 150);
const p4 = new THREE.Vector3(-150, 0, 50);



const curve = new THREE.CubicBezierCurve3(p1, p2, p3, p4);

const tube = new THREE.TubeGeometry(curve, 60, 20, 50);

const materail = new THREE.MeshLambertMaterial({
    color: new THREE.Color('pink'),
    side: THREE.DoubleSide,
    wireframe: true
});

const mesh = new THREE.Mesh(tube, materail);

const geometry2 = new THREE.BufferGeometry();
geometry2.setFromPoints([p1,p2,p3,p4]);
const material2 = new THREE.PointsMaterial({
    color: new THREE.Color('blue'),
    size: 10
});
const points2 = new THREE.Points(geometry2, material2);
const line2 = new THREE.Line(geometry2, new THREE.LineBasicMaterial());
mesh.add(points2, line2);

export default mesh;
