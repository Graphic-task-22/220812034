import * as THREE from 'three';

const arr = [
    new THREE.Vector2( 0, 0 ),
        new THREE.Vector2( 100, 100 ),
        new THREE.Vector2( 0, 0 ),
        new THREE.Vector2( 50, -50 ),
        new THREE.Vector2( 100, 0 )
];

const curve = new THREE.SplineCurve(arr);

const points = curve.getPoints(20);

const geometry = new THREE.BufferGeometry().setFromPoints(points);

const material = new THREE.LineBasicMaterial({ color: new THREE.Color('orange') });

const splineCurve = new THREE.Line( geometry, material );
const points2 = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({color:0x0000ff,size:2})
);

const geometry2 = new THREE.BufferGeometry().setFromPoints(points);
const material2 = new THREE.LineBasicMaterial({ color: new THREE.Color('orange') });
const points3 = new THREE.Points( geometry2, material2 );
splineCurve.add(points3)
export default splineCurve;
