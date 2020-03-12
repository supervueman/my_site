import * as THREE from "three";
import OBJLoader from "three-obj-loader";

OBJLoader(THREE);

let container;
let camera, scene, renderer;
init();
animate();

function init() {
  container = document.createElement("div");
  container.className = "scull-canvas";
  document.body.appendChild(container);
  // Camera
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 18);
  // Scene
  scene = new THREE.Scene();
  // Light
  const light1 = new THREE.PointLight(0xee0033, 3, 4000, 3.0);
  light1.position.set(-3, 3, 5);
  scene.add(light1);
  const light2 = new THREE.PointLight(0x4d4dff, 1.5, 4000, 2.0);
  light2.position.set(3, 0, 8);
  scene.add(light2);
  // 3ds files dont store normal maps
  const loader = new THREE.OBJLoader();
  const material = new THREE.MeshPhongMaterial({
    color: 0x000000
  });
  loader.load("/images/skull.obj", object => {
    object.traverse(child => {
      if (child instanceof THREE.Mesh) {
        child.material = material;
      }
    });
    object.position.set(0, -4, 0);
    object.rotation.x = 0.4;
    scene.add(object);
  });
  // Render
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);
}

// function fishTankRenderer(controlX, controlY) {
//   camera.position.x += (-controlX - camera.position.x) * 0.2;
//   camera.position.y += (-controlY - camera.position.y) * 0.2;
//   camera.lookAt(scene.position);
//   renderer.render(scene, camera);
// }

// fishTankRenderer(0, 0);

function animate() {
  camera.lookAt(scene.position);
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
