import * as THREE from 'three';

// 创建BoxGeometry（立方体）对象
// const texLoader = new THREE.TextureLoader();
const geometry = new THREE.BoxGeometry(50, 50, 50);
// const texture = texLoader.load("./src/assets/earth_day_4096.jpg");
const textureCube = new THREE.CubeTextureLoader()
    .setPath('./src/assets/env/')
    .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);
    
// 给一个材质，让它有颜色
const material = new THREE.MeshPhongMaterial({
  // color: 0xaaaaaa,      // 材质颜色
  // metalness: 1,        // 金属度 (0 - 非金属, 1 - 完全金属)
  // roughness: 0.2,  
  //map:texture,
  envMap:textureCube,
});

// const material = new THREE.MeshPhongMaterial({map:texture,});

// Mesh（网格）。 网格包含一个几何体以及作用在此几何体上的材质，我们可以直接将网格对象放入到我们的场景中，并让它在场景中自由移动。
const cube = new THREE.Mesh(geometry, material);

export default cube;
