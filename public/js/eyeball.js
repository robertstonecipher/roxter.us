/** 
 * A remake of Leslie Zimmermann's 
 See the original here: https://codepen.io/vanillacrescent/pen/jWppeX
 */

{
  const set = Object.assign;
  const scene = new THREE.Scene();
  const { innerWidth, innerHeight } = window;
  const camera = new THREE.PerspectiveCamera(
    75,
    innerWidth / innerHeight,
    0.1,
    1000
  );
  camera.position.z = 10;
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(innerWidth, innerHeight);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  // Create lighting.
  const createLighting = scene => {
    const white = 0xffffff;
    const main = new THREE.HemisphereLight(white, white, 0.8);
    const shadow = new THREE.DirectionalLight(white, 0.3);
    const back = new THREE.DirectionalLight(white, 0.2);
    // Shadow light props.
    shadow.position.set(200, 200, 200);
    shadow.castShadow = true;
    shadow.shadowDarkness = 0.3;
    // Back light props.
    back.position.set(-100, 200, 50);
    back.shadowDarkness = 0.1;
    back.castShadow = true;
    // Add to scene.
    [main, shadow, back].forEach(light => scene.add(light));
  };

  // Eye Materials
  const materials = {
    white: new THREE.MeshStandardMaterial({
      color: 0xffffff,
      shading: THREE.SmoothShading
    }),
    green: new THREE.MeshStandardMaterial({
      color: 0x331a09,
      shading: THREE.SmoothShading,
      roughness: 0.3,
      metalness: 0.4
    }),
    black: new THREE.MeshStandardMaterial({
      color: 0x000000,
      roughness: 0.3,
      metalness: 0.4
    })
  };

  // Create the eye geometry and return the eyeball
  const createEye = (x, { white, green, black }) => {
    // Create geometry.
    const eyeballGeom = new THREE.SphereGeometry(2, 64, 64);
    //.SphereGeometry(3, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);
    const eyeball = new THREE.Mesh(eyeballGeom, white);
    const irisGeom = new THREE.SphereGeometry(1, 256, 16);
    const iris = new THREE.Mesh(irisGeom, green);
    const pupilGeom = new THREE.SphereGeometry(0.6, 48, 4);
    const pupil = new THREE.Mesh(pupilGeom, black);

    // Create group
    const eyeInner = new THREE.Group();

    // Eyeball props
    set(eyeball.position, { x, y: 0, z: 0 });
    set(iris.position, { x: 0, y: 0, z: 1.64 });
    iris.scale.y = 0.4;
    iris.rotation.x = Math.PI / 2;

    // Pupil props
    set(pupil.position, { x: 0, y: 0, z: 1.89 });
    pupil.scale.y = 0.3;
    pupil.rotation.x = Math.PI / 2;

    // Add eye parts
    eyeInner.add(iris);
    eyeInner.add(pupil);
    eyeball.add(eyeInner);

    // Group
    const threegroup = new THREE.Group();
    threegroup.add(eyeball);
    scene.add(threegroup);
    return eyeball;
  };

  const respond = (x, y, eyeball) => {
    const xMin = Math.abs(x) > 200;
    const yMin = Math.abs(y) > 200;
    const yRot = (xMin ? x / Math.abs(x) * 200 : x) / 200 * Math.PI * 0.2;
    const xRot = (yMin ? y / Math.abs(y) * 200 : y) / 200 * Math.PI * 0.2;
    // Set the positions
    eyeball.rotation.x += (xRot - eyeball.rotation.x) / 20;
    eyeball.rotation.y += (yRot - eyeball.rotation.y) / 20;
  };

  // Set up private variable and calls for the loop fn
  const loopPartial = (width, height) => {
    let xPos = width / 2;
    let yPos = height / 2;
    let color = 1;
    let frac = 1;
    const eye = createEye(0, materials);
    // add objects to the scene
    createLighting(scene);
    document.body.addEventListener(
      "mousemove",
      e => {
        e.preventDefault();
        xPos = e.clientX;
        yPos = e.clientY;
      },
      false
    );

    return () => {
      color += frac;
      if(color === 255){
        frag = -1;
      }
    
      if(color === 0){
        frag = 1;
      }
      const newXPos = xPos - window.innerWidth / 2;
      const newYPos = yPos - window.innerHeight / 2;
      respond(newXPos, newYPos, eye);
      document.body.style.background = `radial-gradient(hsl(${color},60%,70%), #000000)`;
      requestAnimationFrame(loop);
      renderer.render(scene, camera);
    };
  };

  // Crete the loop fn
  const loop = loopPartial(innerWidth, innerHeight);
  // Call loop
  loop();
}
