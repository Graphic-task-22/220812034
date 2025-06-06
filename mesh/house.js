import * as THREE from 'three';

function house() {
  const width = 70;
  const height = 40;
  const depth = 50;
  const wallThickness = 5;
  const roofHeight = 20; // 屋顶高度

  const group = new THREE.Group();

  // 墙体材质：米黄
  const wallMaterial = new THREE.MeshLambertMaterial({
    color: 0xfffff0, 
    side: THREE.DoubleSide,
  });

  // 地板材质：浅灰色
  const floorMaterial = new THREE.MeshLambertMaterial({
    color: 0xd3d3d3, // 浅灰色（LightGray）
    side: THREE.DoubleSide,
  });

  // 屋顶材质：深棕色
  const roofMaterial = new THREE.MeshLambertMaterial({
    color: 0x8b4513, // SaddleBrown 深棕色
    side: THREE.DoubleSide,
  });

  // ===== 前墙（带门窗） =====
  const frontShape = new THREE.Shape();
  frontShape.moveTo(-width / 2, -height / 2);
  frontShape.lineTo(width / 2, -height / 2);
  frontShape.lineTo(width / 2, height / 2);
  frontShape.lineTo(-width / 2, height / 2);
  frontShape.lineTo(-width / 2, -height / 2);

  // 门
  const doorWidth = 14;
  const doorHeight = 20;
  const door = new THREE.Path();
  door.moveTo(-doorWidth / 2, -height / 2);
  door.lineTo(doorWidth / 2, -height / 2);
  door.lineTo(doorWidth / 2, -height / 2 + doorHeight);
  door.lineTo(-doorWidth / 2, -height / 2 + doorHeight);
  door.lineTo(-doorWidth / 2, -height / 2);
  frontShape.holes.push(door);

  // 左窗
  const winW = 10, winH = 10;
  const leftWin = new THREE.Path();
  leftWin.moveTo(-width / 2 + 8, 0);
  leftWin.lineTo(-width / 2 + 8 + winW, 0);
  leftWin.lineTo(-width / 2 + 8 + winW, winH);
  leftWin.lineTo(-width / 2 + 8, winH);
  leftWin.lineTo(-width / 2 + 8, 0);
  frontShape.holes.push(leftWin);

  // 右窗
  const rightWin = new THREE.Path();
  rightWin.moveTo(width / 2 - 8 - winW, 0);
  rightWin.lineTo(width / 2 - 8, 0);
  rightWin.lineTo(width / 2 - 8, winH);
  rightWin.lineTo(width / 2 - 8 - winW, winH);
  rightWin.lineTo(width / 2 - 8 - winW, 0);
  frontShape.holes.push(rightWin);

  // 拉伸前墙
  const frontGeo = new THREE.ExtrudeGeometry(frontShape, {
    depth: wallThickness,
    bevelEnabled: false,
  });
  const frontWall = new THREE.Mesh(frontGeo, wallMaterial);
  frontWall.position.z = depth / 2 - wallThickness / 2;
  group.add(frontWall);

  // ===== 门槛（门底部加厚） =====
const doorSillHeight = 2;  // 门槛高度（加厚程度）
const doorSillDepth = wallThickness;
const doorSillGeo = new THREE.BoxGeometry(doorWidth, doorSillHeight, doorSillDepth);
const doorSill = new THREE.Mesh(doorSillGeo, wallMaterial);
doorSill.position.set(
  0,
  -height / 2 + doorSillHeight / 2,
  frontWall.position.z // 对齐前墙的位置
);

group.add(doorSill);


  // 后墙
  const backGeo = new THREE.BoxGeometry(width, height, wallThickness);
  const backWall = new THREE.Mesh(backGeo, wallMaterial);
  backWall.position.z = -depth / 2 + wallThickness / 2;
  group.add(backWall);

  // 左墙
  const sideGeo = new THREE.BoxGeometry(wallThickness, height, depth);
  const leftWall = new THREE.Mesh(sideGeo, wallMaterial);
  leftWall.position.x = -width / 2 + wallThickness / 2;
  group.add(leftWall);

  // 右墙
  const rightWall = new THREE.Mesh(sideGeo, wallMaterial);
  rightWall.position.x = width / 2 - wallThickness / 2;
  group.add(rightWall);

  // ===== 地板：最薄并放最下方 =====
  const floorThickness = 1;
  const floorGeo = new THREE.BoxGeometry(width, floorThickness, depth);
  const floor = new THREE.Mesh(floorGeo, floorMaterial);
  floor.position.y = -height / 2 - floorThickness / 2; // 紧贴墙底部
  group.add(floor);

  // ===== 平地（草地、混凝土等）=====
const groundWidth = 300;
const groundDepth = 200;
const groundThickness = 1;
const groundMaterial = new THREE.MeshLambertMaterial({
  color: 0x228B22, // 草绿色（ForestGreen），可改为其他颜色
  side: THREE.DoubleSide,
});
const groundGeo = new THREE.BoxGeometry(groundWidth, groundThickness, groundDepth);
const ground = new THREE.Mesh(groundGeo, groundMaterial);

// 平地在最下方，略低于地板
ground.position.y = -height / 2 - floorThickness - groundThickness / 2;
group.add(ground);


  // ===== 四棱锥屋顶 =====
  const roofRadius = Math.sqrt((width / 2) ** 2 + (depth / 2) ** 2) * 1.3; // 屋顶阔一点
  const roofGeo = new THREE.ConeGeometry(
    roofRadius,
    roofHeight,
    4
  );
  const roof = new THREE.Mesh(roofGeo, roofMaterial);
  roof.rotation.y = Math.PI / 4;
  roof.position.y = height / 2 + roofHeight / 2;
  group.add(roof);

  // 整体抬高，使底部贴地
  group.position.y = height / 2;

  // ===== 添加烟囱 =====
const chimneyWidth = 4;
const chimneyDepth = 4;
const chimneyHeight = 12;

const chimneyMaterial = new THREE.MeshLambertMaterial({ color: 0x555555 }); // 深灰色

const chimneyGeo = new THREE.BoxGeometry(chimneyWidth, chimneyHeight, chimneyDepth);
const chimney = new THREE.Mesh(chimneyGeo, chimneyMaterial);

// 设置烟囱的位置：屋顶右后角，略微偏上
chimney.position.set(
  width / 4,                          // X：房顶右侧
  height / 4 + chimneyHeight / 2 + 15, // Y：从房顶往上
  -depth / 8                         // Z：房顶后侧
);

group.add(chimney);


    // ===== 添加几棵树 =====
    // ===== 添加几棵树（避开房子） =====
  const treeMaterialTrunk = new THREE.MeshLambertMaterial({ color: 0x8b4513 });
  const treeMaterialLeaves = new THREE.MeshLambertMaterial({ color: 0x228b22 });

  const treeCount = 20;
  const avoidX = 50; // 避开房子区域宽度范围的一半
  const avoidZ = 40; // 避开房子区域深度范围的一半

  for (let i = 0; i < treeCount; i++) {
    let posX, posZ;

    // 确保树不出现在房子周围的避让区内
    do {
      posX = (Math.random() - 0.5) * 300;
      posZ = (Math.random() - 0.5) * 200;
    } while (Math.abs(posX) < avoidX && Math.abs(posZ) < avoidZ);

    const tree = new THREE.Group();

    const scaleFactor = 3 + Math.random() * 0.8;
    const trunkHeight = 6 * scaleFactor;
    const trunkGeo = new THREE.CylinderGeometry(0.8, 0.8, trunkHeight);
    const trunk = new THREE.Mesh(trunkGeo, treeMaterialTrunk);
    trunk.position.y = trunkHeight / 2;
    tree.add(trunk);

    const crownRadius = 3 * scaleFactor;
    const crownGeo = new THREE.SphereGeometry(crownRadius, 8, 8);
    const crown = new THREE.Mesh(crownGeo, treeMaterialLeaves);
    crown.position.y = trunkHeight + crownRadius * 0.6;
    tree.add(crown);

    tree.position.set(posX, -height / 2 - floorThickness + 0.1, posZ);
    group.add(tree);
  }

  // ===== 添加一些花朵（避开房子）=====
  const flowerColors = [0xff69b4, 0xffd700, 0xff4500, 0x9370db, 0x00ced1]; // 粉红、金黄、橘红、紫罗兰、蓝绿色
  const flowerCount = 1500;
  const flowerAvoidX = 50;
  const flowerAvoidZ = 40;

  for (let i = 0; i < flowerCount; i++) {
    let posX, posZ;

    // 避开房子
    do {
      posX = (Math.random() - 0.5) * groundWidth;
      posZ = (Math.random() - 0.5) * groundDepth;
    } while (Math.abs(posX) < flowerAvoidX && Math.abs(posZ) < flowerAvoidZ);

    const flower = new THREE.Group();

    // 花茎（绿色小柱）
    const stemHeight = 2;
    const stemRadius = 0.1;
    const stemGeo = new THREE.CylinderGeometry(stemRadius, stemRadius, stemHeight, 6);
    const stemMat = new THREE.MeshLambertMaterial({ color: 0x006400 }); // 深绿
    const stem = new THREE.Mesh(stemGeo, stemMat);
    stem.position.y = stemHeight / 2;
    flower.add(stem);

    // 花冠（小球）
    const petalRadius = 0.4 + Math.random() * 0.2;
    const petalGeo = new THREE.SphereGeometry(petalRadius, 6, 6);
    const petalMat = new THREE.MeshLambertMaterial({
      color: flowerColors[Math.floor(Math.random() * flowerColors.length)],
    });
    const petal = new THREE.Mesh(petalGeo, petalMat);
    petal.position.y = stemHeight + petalRadius * 0.5;
    flower.add(petal);

    flower.position.set(posX, -height / 2 - floorThickness + 0.1, posZ);
    group.add(flower);
  }


  return group;
}

export default house;
