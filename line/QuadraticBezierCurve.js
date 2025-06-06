import * as THREE from 'three';

const curve = new THREE.QuadraticBezierCurve(
    new THREE.Vector2(0, 0),
    new THREE.Vector2(50, 100),
    new THREE.Vector2(100, 0)
);

const points = curve.getPoints(50);

const geometry = new THREE.BufferGeometry().setFromPoints(points);

const material = new THREE.LineBasicMaterial({ color: 0xff0000});
const curveObject = new THREE.Line(geometry,material);

const geometry2 = new THREE.BufferGeometry().setFromPoints(points);

const material2 = new THREE.LineBasicMaterial({ color: 0xff0000});
const points2 = new THREE.Line(geometry2,material2);
curveObject.add(points2);
//const line = new THREE.Line(geometry2,)

// const line = new THREE.Line( geometry, material );

// const geometry2 = new THREE.BufferGeometry();
// geometry2.setFromPoints([p1,p2,p3]);
// const material2 = new THREE.PointsMaterial({
//     color: new THREE.Color('pink'),
//     size: 5
// });
// const points2 = new THREE.Points(geometry2, material2);
// const line2 = new THREE.Line(geometry2, new THREE.LineBasicMaterial());
// line.add(points2, line2);

export default curveObject;
