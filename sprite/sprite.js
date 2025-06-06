import * as THREE from 'three';

const texture1 = new THREE.TextureLoader().load("./src/assets/sprites/snowflake5.png");
const snowGroup = new THREE.Group();  //创建一个存放所有粒子的组
const particleCount = 1000; // 可以调整粒子数量

texture1.alphaTest = 0.5;  // 确保透明区域生效texture.alphaTest = 0.5;  // 确保透明区域生效
for (let i = 0; i < particleCount; i++) {
// 创建精灵材质对象SpriteMaterial
const spriteMaterial = new THREE.SpriteMaterial({
    //color:0x00ffff,//设置颜色
    map: texture1, //设置精灵纹理贴图
    //rotation:Math.PI/4,//旋转精灵对象45度，弧度值
    blending:THREE.AdditiveBlending,
    transparent: true,  //允许透明
    depthTest: false, // 让粒子不会被遮挡
    depthWrite: false,  // 让粒子不会影响其他物体的深度
    //premultipliedAlpha: true, // 预乘 Alpha
  });

  // 创建精灵模型对象，不需要几何体geometry参数
  const sprite = new THREE.Sprite(spriteMaterial);
  //sprite.scale.set(50, 25, 1);
  // sprite.position.set(0,4,0);
// 设置随机位置 (X, Y, Z)
sprite.position.set(
  (Math.random() - 0.5) * 2000, // -1000 ~ 1000
  Math.random() * 2000, // 0 ~ 2000
  (Math.random() - 0.5) * 2000 // -1000 ~ 1000
);
 // 设置随机大小
 const scale = Math.random() * 10 + 5; // 5 ~ 15
 sprite.scale.set(scale, scale, 1);

 // 把粒子添加到组中
 snowGroup.add(sprite);
}
export default snowGroup; 