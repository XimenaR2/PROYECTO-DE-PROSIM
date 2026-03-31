import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MindARThree } from "mindar-image-three";

// ── Equipos en el MISMO orden en que fueron subidos al compilador MindAR ──────
// Orden por fecha de archivo: más antiguo primero (ESCUDO_MEXICO = índice 0)
const EQUIPOS = [
  {
    nombre:  "México",
    bandera: "🇲🇽",
    textura: "../TEXTURES/MEXICO.PNG",
    info: `<strong>🇲🇽 México</strong><br><br>
      Apodo: El Tri<br>
      Confederación: CONCACAF<br>
      Mundiales disputados: 17`,
  },
  {
    nombre:  "USA",
    bandera: "🇺🇸",
    textura: "../TEXTURES/USA.PNG",
    info: `<strong>🇺🇸 Estados Unidos</strong><br><br>
      Apodo: Stars and Stripes<br>
      Confederación: CONCACAF<br>
      Mundiales disputados: 11`,
  },
  {
    nombre:  "Canadá",
    bandera: "🇨🇦",
    textura: "../TEXTURES/CANADA.PNG",
    info: `<strong>🇨🇦 Canadá</strong><br><br>
      Apodo: Los Maple Leafs<br>
      Confederación: CONCACAF<br>
      Mundiales disputados: 3`,
  },
  {
    nombre:  "Alemania",
    bandera: "🇩🇪",
    textura: "../TEXTURES/ALEMANIA.PNG",
    info: `<strong>🇩🇪 Alemania</strong><br><br>
      Apodo: Die Mannschaft<br>
      Confederación: UEFA<br>
      Títulos: 4 Copas del Mundo`,
  },
  {
    nombre:  "Argentina",
    bandera: "🇦🇷",
    textura: "../TEXTURES/ARGENTINA.PNG",
    info: `<strong>🇦🇷 Argentina</strong><br><br>
      Apodo: La Albiceleste<br>
      Confederación: CONMEBOL<br>
      Títulos: 3 Copas del Mundo`,
  },
  {
    nombre:  "Austria",
    bandera: "🇦🇹",
    textura: "../TEXTURES/AUSTRIA.PNG",
    info: `<strong>🇦🇹 Austria</strong><br><br>
      Apodo: Das Team<br>
      Confederación: UEFA<br>
      Mundiales disputados: 7`,
  },
  {
    nombre:  "Bélgica",
    bandera: "🇧🇪",
    textura: "../TEXTURES/BELGICA.PNG",
    info: `<strong>🇧🇪 Bélgica</strong><br><br>
      Apodo: Diablos Rojos<br>
      Confederación: UEFA<br>
      Mejor resultado: 3er lugar 2018`,
  },
  {
    nombre:  "Brasil",
    bandera: "🇧🇷",
    textura: "../TEXTURES/BRASIL.PNG",
    info: `<strong>🇧🇷 Brasil</strong><br><br>
      Apodo: La Canarinha<br>
      Confederación: CONMEBOL<br>
      Títulos: 5 Copas del Mundo`,
  },
  {
    nombre:  "Colombia",
    bandera: "🇨🇴",
    textura: "../TEXTURES/COLOMBIA.PNG",
    info: `<strong>🇨🇴 Colombia</strong><br><br>
      Apodo: Los Cafeteros<br>
      Confederación: CONMEBOL<br>
      Mejor resultado: Cuartos de final 2014`,
  },
  {
    nombre:  "Croacia",
    bandera: "🇭🇷",
    textura: "../TEXTURES/CROACIA.PNG",
    info: `<strong>🇭🇷 Croacia</strong><br><br>
      Apodo: Los Vatreni<br>
      Confederación: UEFA<br>
      Mejor resultado: Subcampeón 2018`,
  },
  {
    nombre:  "Dinamarca",
    bandera: "🇩🇰",
    textura: "../TEXTURES/DINAMARCA.PNG",
    info: `<strong>🇩🇰 Dinamarca</strong><br><br>
      Apodo: Los Rojos<br>
      Confederación: UEFA<br>
      Mundiales disputados: 6`,
  },
  {
    nombre:  "Ecuador",
    bandera: "🇪🇨",
    textura: "../TEXTURES/ECUADOR.PNG",
    info: `<strong>🇪🇨 Ecuador</strong><br><br>
      Apodo: La Tri<br>
      Confederación: CONMEBOL<br>
      Mundiales disputados: 4`,
  },
  {
    nombre:  "España",
    bandera: "🇪🇸",
    textura: "../TEXTURES/ESPAÑA.PNG",
    info: `<strong>🇪🇸 España</strong><br><br>
      Apodo: La Roja<br>
      Confederación: UEFA<br>
      Títulos: 1 Copa del Mundo (2010)`,
  },
  {
    nombre:  "Francia",
    bandera: "🇫🇷",
    textura: "../TEXTURES/FRANCIA.PNG",
    info: `<strong>🇫🇷 Francia</strong><br><br>
      Apodo: Les Bleus<br>
      Confederación: UEFA<br>
      Títulos: 2 Copas del Mundo`,
  },
  {
    nombre:  "Inglaterra",
    bandera: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    textura: "../TEXTURES/INGLATERRA.PNG",
    info: `<strong>🏴󠁧󠁢󠁥󠁮󠁧󠁿 Inglaterra</strong><br><br>
      Apodo: Los Tres Leones<br>
      Confederación: UEFA<br>
      Títulos: 1 Copa del Mundo (1966)`,
  },
  {
    nombre:  "Italia",
    bandera: "🇮🇹",
    textura: "../TEXTURES/ITALIA.PNG",
    info: `<strong>🇮🇹 Italia</strong><br><br>
      Apodo: Gli Azzurri<br>
      Confederación: UEFA<br>
      Títulos: 4 Copas del Mundo`,
  },
  {
    nombre:  "Países Bajos",
    bandera: "🇳🇱",
    textura: "../TEXTURES/PAISES_BAJOS.PNG",
    info: `<strong>🇳🇱 Países Bajos</strong><br><br>
      Apodo: La Naranja Mecánica<br>
      Confederación: UEFA<br>
      Mejor resultado: Subcampeón x3`,
  },
  {
    nombre:  "Paraguay",
    bandera: "🇵🇾",
    textura: "../TEXTURES/PARAGUAY.PNG",
    info: `<strong>🇵🇾 Paraguay</strong><br><br>
      Apodo: La Albirroja<br>
      Confederación: CONMEBOL<br>
      Mejor resultado: Cuartos de final 2010`,
  },
  {
    nombre:  "Suiza",
    bandera: "🇨🇭",
    textura: "../TEXTURES/SUIZA.PNG",
    info: `<strong>🇨🇭 Suiza</strong><br><br>
      Apodo: La Nati<br>
      Confederación: UEFA<br>
      Mundiales disputados: 12`,
  },
  {
    nombre:  "Uruguay",
    bandera: "🇺🇾",
    textura: "../TEXTURES/URUGUAY.PNG",
    info: `<strong>🇺🇾 Uruguay</strong><br><br>
      Apodo: La Celeste<br>
      Confederación: CONMEBOL<br>
      Títulos: 2 Copas del Mundo`,
  },
  {
    nombre:  "Japón",
    bandera: "🇯🇵",
    textura: "../TEXTURES/JAPON.PNG",
    info: `<strong>🇯🇵 Japón</strong><br><br>
      Apodo: Samurai Blue<br>
      Confederación: AFC<br>
      Mundiales disputados: 7`,
  },
  {
    nombre:  "Corea del Sur",
    bandera: "🇰🇷",
    textura: "../TEXTURES/KOREA_DEL_SUR.PNG",
    info: `<strong>🇰🇷 Corea del Sur</strong><br><br>
      Apodo: Guerreros Taeguk<br>
      Confederación: AFC<br>
      Mejor resultado: 4to lugar 2002`,
  },
  {
    nombre:  "Irán",
    bandera: "🇮🇷",
    textura: "../TEXTURES/IRAN.PNG",
    info: `<strong>🇮🇷 Irán</strong><br><br>
      Apodo: Los Leones Persas<br>
      Confederación: AFC<br>
      Mundiales disputados: 6`,
  },
  {
    nombre:  "Australia",
    bandera: "🇦🇺",
    textura: "../TEXTURES/AUSTRALIA.PNG",
    info: `<strong>🇦🇺 Australia</strong><br><br>
      Apodo: Socceroos<br>
      Confederación: AFC<br>
      Mejor resultado: Cuartos de final 2006`,
  },
  {
    nombre:  "Iraq",
    bandera: "🇮🇶",
    textura: "../TEXTURES/IRAQ.PNG",
    info: `<strong>🇮🇶 Iraq</strong><br><br>
      Apodo: Los Leones de Mesopotamia<br>
      Confederación: AFC<br>
      Mundiales disputados: 1`,
  },
  {
    nombre:  "Arabia Saudita",
    bandera: "🇸🇦",
    textura: "../TEXTURES/ARABIA.PNG",
    info: `<strong>🇸🇦 Arabia Saudita</strong><br><br>
      Apodo: Las Águilas Verdes<br>
      Confederación: AFC<br>
      Mundiales disputados: 6`,
  },
  {
    nombre:  "Catar",
    bandera: "🇶🇦",
    textura: "../TEXTURES/CATAR.PNG",
    info: `<strong>🇶🇦 Catar</strong><br><br>
      Apodo: Los Maroon<br>
      Confederación: AFC<br>
      Sede del Mundial 2022`,
  },
  {
    nombre:  "Uzbekistán",
    bandera: "🇺🇿",
    textura: "../TEXTURES/UZBEKISTAN.PNG",
    info: `<strong>🇺🇿 Uzbekistán</strong><br><br>
      Apodo: Los Lobos Blancos<br>
      Confederación: AFC<br>
      Primera participación mundialista`,
  },
  {
    nombre:  "Egipto",
    bandera: "🇪🇬",
    textura: "../TEXTURES/EGIPTO.PNG",
    info: `<strong>🇪🇬 Egipto</strong><br><br>
      Apodo: Los Faraones<br>
      Confederación: CAF<br>
      Mundiales disputados: 3`,
  },
  {
    nombre:  "Argelia",
    bandera: "🇩🇿",
    textura: "../TEXTURES/ARGELIA.PNG",
    info: `<strong>🇩🇿 Argelia</strong><br><br>
      Apodo: Los Zorros del Desierto<br>
      Confederación: CAF<br>
      Mundiales disputados: 4`,
  },
  {
    nombre:  "Marruecos",
    bandera: "🇲🇦",
    textura: "../TEXTURES/MARRUECOS.PNG",
    info: `<strong>🇲🇦 Marruecos</strong><br><br>
      Apodo: Los Leones del Atlas<br>
      Confederación: CAF<br>
      Mejor resultado: 4to lugar 2022`,
  },
  {
    nombre:  "Senegal",
    bandera: "🇸🇳",
    textura: "../TEXTURES/SENEGAL.PNG",
    info: `<strong>🇸🇳 Senegal</strong><br><br>
      Apodo: Los Leones de la Teranga<br>
      Confederación: CAF<br>
      Mejor resultado: Cuartos de final 2002`,
  },
  {
    nombre:  "Costa de Marfil",
    bandera: "🇨🇮",
    textura: "../TEXTURES/COSTA_DE_MARFIL.PNG",
    info: `<strong>🇨🇮 Costa de Marfil</strong><br><br>
      Apodo: Los Elefantes<br>
      Confederación: CAF<br>
      Mundiales disputados: 3`,
  },
  {
    nombre:  "Nigeria",
    bandera: "🇳🇬",
    textura: "../TEXTURES/NIGERIA.PNG",
    info: `<strong>🇳🇬 Nigeria</strong><br><br>
      Apodo: Las Súper Águilas<br>
      Confederación: CAF<br>
      Mundiales disputados: 7`,
  },
  {
    nombre:  "Túnez",
    bandera: "🇹🇳",
    textura: "../TEXTURES/TUNEZ.PNG",
    info: `<strong>🇹🇳 Túnez</strong><br><br>
      Apodo: Las Águilas de Cartago<br>
      Confederación: CAF<br>
      Mundiales disputados: 6`,
  },
  {
    nombre:  "Camerún",
    bandera: "🇨🇲",
    textura: "../TEXTURES/CAMERUN.PNG",
    info: `<strong>🇨🇲 Camerún</strong><br><br>
      Apodo: Los Leones Indomables<br>
      Confederación: CAF<br>
      Mejor resultado: Cuartos de final 1990`,
  },
  {
    nombre:  "Mali",
    bandera: "🇲🇱",
    textura: "../TEXTURES/MALI.PNG",
    info: `<strong>🇲🇱 Mali</strong><br><br>
      Apodo: Los Águilas<br>
      Confederación: CAF<br>
      Primera participación mundialista`,
  },
  {
    nombre:  "Panamá",
    bandera: "🇵🇦",
    textura: "../TEXTURES/PANAA.PNG",   // ⚠️ nombre exacto de tu archivo
    info: `<strong>🇵🇦 Panamá</strong><br><br>
      Apodo: Los Canaleros<br>
      Confederación: CONCACAF<br>
      Mundiales disputados: 2`,
  },
  {
    nombre:  "Costa Rica",
    bandera: "🇨🇷",
    textura: "../TEXTURES/COSTA_RICA.PNG",
    info: `<strong>🇨🇷 Costa Rica</strong><br><br>
      Apodo: La Sele<br>
      Confederación: CONCACAF<br>
      Mejor resultado: Cuartos de final 2014`,
  },
  {
    nombre:  "Jamaica",
    bandera: "🇯🇲",
    textura: "../TEXTURES/JAMAICA.PNG",
    info: `<strong>🇯🇲 Jamaica</strong><br><br>
      Apodo: Los Reggae Boyz<br>
      Confederación: CONCACAF<br>
      Mundiales disputados: 2`,
  },
  {
    nombre:  "Nueva Zelanda",
    bandera: "🇳🇿",
    textura: "../TEXTURES/NUEVA_ZELANDA.PNG",
    info: `<strong>🇳🇿 Nueva Zelanda</strong><br><br>
      Apodo: Los All Whites<br>
      Confederación: OFC<br>
      Mundiales disputados: 2`,
  },
];


// ── Referencias al DOM ────────────────────────────────────────────────────────
const btnActivar   = document.getElementById("btnActivar");
const btnReiniciar = document.getElementById("btnReiniciar");
const btnSaludo    = document.querySelector(".actions button:nth-child(1)");
const btnBaile     = document.querySelector(".actions button:nth-child(2)");
const infoText     = document.getElementById("infoText");
const container    = document.getElementById("camera-container");
const placeholder  = document.getElementById("camera-placeholder");

let mindarInstance = null;
let started        = false;
const clock        = new THREE.Clock();
const anchorStates = [];

console.log(`[AR] Script cargado | ${EQUIPOS.length} equipos configurados`);

// ── Texturas ──────────────────────────────────────────────────────────────────
const textureCache = {};

function aplicarTextura(model, rutaTextura) {
  if (textureCache[rutaTextura]) { _asignarTextura(model, textureCache[rutaTextura]); return; }
  new THREE.TextureLoader().load(
    rutaTextura,
    (tex) => {
      tex.flipY = false;
      tex.encoding = THREE.sRGBEncoding;
      textureCache[rutaTextura] = tex;
      _asignarTextura(model, tex);
      console.log("[AR] Textura:", rutaTextura);
    },
    undefined,
    (err) => console.warn("[AR] Sin textura:", rutaTextura, err)
  );
}

function _asignarTextura(model, tex) {
  model.traverse(c => {
    if (c.isMesh || c.isSkinnedMesh) {
      c.material = c.material.clone();
      c.material.map = tex;
      c.material.needsUpdate = true;
    }
  });
}

// ── Animacion ─────────────────────────────────────────────────────────────────
// Transfiere un AnimationClip de un GLB al esqueleto del modelo Jugador
// Funciona porque ambos tienen exactamente los mismos huesos (mixamorig:*)
function transferirClip(clip, modelTarget) {
  if (!clip) return null;
  // Clona el clip para no modificar el original
  const nuevoClip = clip.clone();
  // Filtra solo quaternion — elimina position/scale que causan root motion
  nuevoClip.tracks = nuevoClip.tracks.filter(t => t.name.endsWith('.quaternion'));
  return nuevoClip;
}

function playClip(state, clip) {
  if (!clip || !state) return;
  if (state.currentAction) state.currentAction.fadeOut(0.2);
  const action = state.mixer.clipAction(clip);
  action.reset().fadeIn(0.2).play();
  state.currentAction = action;
  console.log("[AR] Reproduciendo:", clip.name);
}

// ── Botones ───────────────────────────────────────────────────────────────────
btnSaludo.addEventListener("click", () => {
  const s = anchorStates.find(s => s.visible);
  if (!s) { infoText.textContent = "Apunta la camara a un escudo primero"; return; }
  playClip(s, s.clipWaving);
});

btnBaile.addEventListener("click", () => {
  const s = anchorStates.find(s => s.visible);
  if (!s) { infoText.textContent = "Apunta la camara a un escudo primero"; return; }
  playClip(s, s.clipDance);
});

// ── Abrir Camara ──────────────────────────────────────────────────────────────
btnActivar.addEventListener("click", async () => {
  btnActivar.style.display   = "none";
  btnReiniciar.style.display = "inline-block";
  placeholder.style.display  = "none";
  infoText.textContent       = "Cargando...";

  try {
    mindarInstance = new MindARThree({
      container:      container,
      imageTargetSrc: "./targets.mind",
      filterMinCF:    0.001,
      filterBeta:     0.01,
      missTolerance:  10,
      uiScanning:     false,
      uiLoading:      false,
    });

    const { renderer, scene, camera } = mindarInstance;

    const w = container.clientWidth;
    const h = container.clientHeight;
    renderer.setSize(w, h);
    renderer.setPixelRatio(window.devicePixelRatio);
    console.log(`[DBG] Container: ${w}x${h}`);

    scene.add(new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1));
    const dir = new THREE.DirectionalLight(0xffffff, 1.5);
    dir.position.set(0, 5, 5);
    scene.add(dir);

    const loader = new GLTFLoader();

    // Carga los 3 GLB en paralelo
    const [gltfJugador, gltfWaving, gltfDance] = await Promise.all([
      new Promise((res, rej) => loader.load("../MODELS/Jugador.glb", res, undefined, rej)),
      new Promise((res, rej) => loader.load("../MODELS/Waving.glb",  res, undefined, rej)),
      new Promise((res, rej) => loader.load("../MODELS/Dance.glb",   res, undefined, rej)),
    ]);
    console.log("[AR] 3 modelos cargados OK");

    // Extrae y prepara los clips (solo rotaciones, sin root motion)
    const clipWavingMaster = transferirClip(gltfWaving.animations[0], null);
    const clipDanceMaster  = transferirClip(gltfDance.animations[0],  null);
    console.log("[AR] Clips listos:", clipWavingMaster?.tracks.length, "tracks waving |", clipDanceMaster?.tracks.length, "tracks dance");

    // Crea un anchor por equipo
    // Cada anchor carga su propia instancia del GLB para evitar problemas con clone()
    const anchorPromises = EQUIPOS.map((equipo, index) => {
      return new Promise((res) => {
        loader.load("../MODELS/Waving.glb", (gltfFresh) => {
          const anchor = mindarInstance.addAnchor(index);
          const model  = gltfFresh.scene;

          anchor.group.add(model);
          // El cubo era scale=1, position=(0,0,0) y se veía centrado en el escudo
          // El modelo mide 4.3u → scale=0.23 lo pone a ~1u (mismo que el cubo)
          // position.y = mitad de la altura para que quede centrado igual que el cubo
          model.scale.setScalar(0.15);
          model.position.set(0, -1, 0);

          const mixer = new THREE.AnimationMixer(model);

          // Clip Waving viene en este GLB fresco
          const clipWav = gltfFresh.animations[0]
            ? (() => { const c = gltfFresh.animations[0].clone(); c.tracks = c.tracks.filter(t => t.name.endsWith('.quaternion')); return c; })()
            : null;
          // Clip Dance viene del master
          const clipDnc = clipDanceMaster;

          let currentAction = null;
          if (clipWav) {
            currentAction = mixer.clipAction(clipWav);
            currentAction.play();
            currentAction.paused = true;
          }

          const state = { visible: false, model, mixer, clipWaving: clipWav, clipDance: clipDnc, currentAction, anchor };
          anchorStates.push(state);

          anchor.onTargetFound = () => {
            console.log(`[AR] Detectado: ${equipo.nombre} (${index})`);
            state.visible = true;
            aplicarTextura(model, equipo.textura);
            infoText.innerHTML = `${equipo.bandera} ${equipo.info}`;
            if (state.currentAction) state.currentAction.paused = false;
          };

          anchor.onTargetLost = () => {
            console.log(`[AR] Perdido: ${equipo.nombre}`);
            state.visible = false;
            if (state.currentAction) state.currentAction.paused = true;
          };

          res();
        }, undefined, (err) => { console.error(`GLB error anchor ${index}:`, err); res(); });
      });
    });

    console.log("[AR] Cargando modelos por anchor...");
    await Promise.all(anchorPromises);
    console.log("[AR] Todos los anchors listos");



    await mindarInstance.start();
    started = true;
    infoText.textContent = "Apunta la camara a un escudo 🏆";

    renderer.setAnimationLoop(() => {
      const delta = clock.getDelta();
      anchorStates.forEach(s => s.mixer.update(delta));
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

// ── Cerrar Camara ─────────────────────────────────────────────────────────────
btnReiniciar.addEventListener("click", async () => {
  if (mindarInstance && started) {
    mindarInstance.renderer.setAnimationLoop(null);
    await mindarInstance.stop();
    mindarInstance = null;
    started = false;
  }
  anchorStates.length        = 0;
  placeholder.style.display  = "flex";
  btnReiniciar.style.display = "none";
  btnActivar.style.display   = "inline-block";
  infoText.textContent       = "";
});
