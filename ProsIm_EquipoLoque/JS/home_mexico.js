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

// ----- Animation related variables -----
let modelMixer = null;           // Animation mixer for the model
let currentAction = null;        // Currently playing action
let animations = {};             // Store loaded animation clips
let modelLoaded = false;         // Flag to know when model is ready

console.log("[AR] Script loaded, MindARThree:", !!MindARThree);

// Helper: find buttons by their text content (since they have no IDs)
function findButtonByText(text) {
  const buttons = document.querySelectorAll('.actions button');
  for (let btn of buttons) {
    if (btn.textContent.trim() === text) return btn;
  }
  return null;
}

// Function to play an animation by name
function playAnimation(name) {
  if (!modelLoaded || !modelMixer) {
    console.warn("[AR] Model not ready yet, cannot play", name);
    return;
  }
  const clip = animations[name];
  if (!clip) {
    console.warn("[AR] Animation clip not found:", name);
    return;
  }
  if (currentAction) {
    currentAction.stop();   // stop previous animation
  }
  currentAction = modelMixer.clipAction(clip);
  currentAction.reset().play();
  console.log(`[AR] Playing animation: ${name}`);
}

// ----- Load animation clips from external files -----
const loader = new GLTFLoader();

function loadAnimations() {
  // Load Dance.glb
  loader.load(
    "../MODELS/Dance.glb",
    (gltf) => {
      if (gltf.animations && gltf.animations.length) {
        animations.dance = gltf.animations[0];
        console.log("[AR] Dance animation loaded");
      } else {
        console.warn("[AR] Dance.glb has no animations");
      }
    },
    undefined,
    (err) => console.error("[AR] Error loading Dance.glb:", err)
  );

  // Load Waving.glb
  loader.load(
    "../MODELS/Waving.glb",
    (gltf) => {
      if (gltf.animations && gltf.animations.length) {
        animations.wave = gltf.animations[0];
        console.log("[AR] Wave animation loaded");
      } else {
        console.warn("[AR] Waving.glb has no animations");
      }
    },
    undefined,
    (err) => console.error("[AR] Error loading Waving.glb:", err)
  );
}

// Start loading animations immediately (they will be available later)
loadAnimations();

// ── Open Camera ──────────────────────────────────────────────────────────────
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
    loader.load(
      "../MODELS/jugador_rig.glb",
      (gltf) => {
        console.log("[AR] Model loaded!");
        const model = gltf.scene;
        model.scale.set(10, 10, 10);
        model.position.set(0, 0, 0);
        anchor.group.add(model);

        // --- Set up animation mixer for the model ---
        modelMixer = new THREE.AnimationMixer(model);
        modelLoaded = true;

        // ----- Apply MEXICO.png texture to the model -----
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(
          "../MODELS/MEXICO.png",
          (texture) => {
            model.traverse((child) => {
              if (child.isMesh) {
                if (Array.isArray(child.material)) {
                  child.material.forEach(mat => {
                    mat.map = texture;
                    mat.needsUpdate = true;
                  });
                } else {
                  child.material.map = texture;
                  child.material.needsUpdate = true;
                }
              }
            });
            console.log("[AR] Texture MEXICO.png applied to model");
          },
          undefined,
          (err) => console.error("[AR] Error loading texture MEXICO.png:", err)
        );
        // -------------------------------------------------
      },
      undefined,
      (err) => console.error("[AR] Model error:", err)
    );

    // Target found: show info
    anchor.onTargetFound = () => {
      console.log("[AR] TARGET FOUND");
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
    infoText.textContent = "Apunta la cámara a la bandera ";

    // --- Render loop ---
    const clock = new THREE.Clock();
    renderer.setAnimationLoop(() => {
      // Update animation mixer (if model exists)
      if (modelMixer) {
        const delta = clock.getDelta();
        modelMixer.update(delta);
      }
      renderer.render(scene, camera);
    });

  } catch (err) {
    console.error("[AR] Error:", err);
    infoText.textContent      = "Error: " + err.message;
    placeholder.style.display = "flex";
    btnActivar.style.display   = "inline-block";
    btnReiniciar.style.display = "none";
  }
});

// ── Close Camera ─────────────────────────────────────────────────────────────
btnReiniciar.addEventListener("click", async () => {
  if (mindarInstance && started) {
    mindarInstance.renderer.setAnimationLoop(null);
    await mindarInstance.stop();
    mindarInstance = null;
    started        = false;
  }

  // Reset animation state
  if (modelMixer) {
    modelMixer = null;
  }
  currentAction = null;
  modelLoaded = false;

  placeholder.style.display  = "flex";
  btnReiniciar.style.display = "none";
  btnActivar.style.display   = "inline-block";
  scanned                    = false;
  infoText.textContent       = "";
});

// ── Attach button listeners after DOM is ready ──────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const saludoBtn = findButtonByText("Saludo");
  const baileBtn  = findButtonByText("Baile");

  if (saludoBtn) {
    saludoBtn.addEventListener("click", () => playAnimation("wave"));
  } else {
    console.warn("[AR] 'Saludo' button not found");
  }

  if (baileBtn) {
    baileBtn.addEventListener("click", () => playAnimation("dance"));
  } else {
    console.warn("[AR] 'Baile' button not found");
  }
});