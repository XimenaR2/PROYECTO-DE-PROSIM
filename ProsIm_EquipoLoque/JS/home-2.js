import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MindARThree } from "mindar-image-three";

const btnActivar   = document.getElementById("btnActivar");
const btnReiniciar = document.getElementById("btnReiniciar");
const infoText     = document.getElementById("infoText");
const container    = document.getElementById("camera-container");
const placeholder  = document.getElementById("camera-placeholder");

let mindarInstance = null;
let started        = false;
let scanned        = false;

console.log("[AR] ✅ Script loaded, MindARThree:", !!MindARThree);

// ── Abrir Cámara ──────────────────────────────────────────────────────────────
btnActivar.addEventListener("click", async () => {
  btnActivar.style.display   = "none";
  btnReiniciar.style.display = "inline-block";
  placeholder.style.display  = "none";
  infoText.textContent       = "Iniciando cámara…";

  try {
    mindarInstance = new MindARThree({
      container:      container,
      imageTargetSrc: "./targets.mind",
      uiScanning:     false,
      uiLoading:      false,
    });

    const { renderer, scene, camera } = mindarInstance;

    // Lighting
    scene.add(new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(0, 5, 5);
    scene.add(dirLight);

    // Anchor for target index 0 (your flag)
    const anchor = mindarInstance.addAnchor(0);

    // Load the 3D model
    const loader = new GLTFLoader();
    loader.load(
      "../MODELS/jugador.glb",
      (gltf) => {
        console.log("[AR] ✅ Model loaded!");
        const model = gltf.scene;
        model.scale.set(0.1, 0.1, 0.1);
        model.position.set(0, 0, 0);
        anchor.group.add(model);
      },
      undefined,
      (err) => console.error("[AR] ❌ Model error:", err)
    );

    // Target found: show info
    anchor.onTargetFound = () => {
      console.log("[AR] 🎯 TARGET FOUND");
      if (!scanned) {
        scanned = true;
        infoText.innerHTML = `
          <strong>🇲🇽 Bandera de México</strong><br><br>
          País: México<br>
          Continente: América del Norte<br>
          Capital: Ciudad de México<br>
          Colores: Verde, Blanco y Rojo<br>
          Símbolo: Águila devorando una serpiente
        `;
      }
    };

    anchor.onTargetLost = () => {
      console.log("[AR] TARGET LOST");
    };

    // Start AR
    await mindarInstance.start();
    started = true;
    infoText.textContent = "Apunta la cámara a la bandera 🏁";

    // Render loop
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });

  } catch (err) {
    console.error("[AR] Error:", err);
    infoText.textContent      = "❌ Error: " + err.message;
    placeholder.style.display = "flex";
    btnActivar.style.display   = "inline-block";
    btnReiniciar.style.display = "none";
  }
});

// ── Cerrar Cámara ─────────────────────────────────────────────────────────────
btnReiniciar.addEventListener("click", async () => {
  if (mindarInstance && started) {
    mindarInstance.renderer.setAnimationLoop(null);
    await mindarInstance.stop();
    mindarInstance = null;
    started        = false;
  }

  placeholder.style.display  = "flex";
  btnReiniciar.style.display = "none";
  btnActivar.style.display   = "inline-block";
  scanned                    = false;
  infoText.textContent       = "";
});
