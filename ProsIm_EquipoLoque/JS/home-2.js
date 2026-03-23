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
    textura: "../TEXTURES/PANAMA.PNG",   // ⚠️ nombre exacto de tu archivo
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
const infoText     = document.getElementById("infoText");
const container    = document.getElementById("camera-container");
const placeholder  = document.getElementById("camera-placeholder");

let mindarInstance = null;
let started        = false;

console.log(`[AR] ✅ Script cargado | ${EQUIPOS.length} equipos configurados`);

// ── Aplica una textura PNG a todos los meshes del modelo ──────────────────────
function aplicarTextura(model, rutaTextura) {
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(
    rutaTextura,
    (texture) => {
      texture.flipY    = false;               // obligatorio para modelos GLTF
      texture.encoding = THREE.sRGBEncoding;
      model.traverse((child) => {
        if (child.isMesh) {
          child.material             = child.material.clone();
          child.material.map         = texture;
          child.material.needsUpdate = true;
        }
      });
      console.log(`[AR] ✅ Textura aplicada: ${rutaTextura}`);
    },
    undefined,
    (err) => console.warn(`[AR] ⚠️ Textura no cargada: ${rutaTextura}`, err)
  );
}

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

    // Iluminación
    scene.add(new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(0, 5, 5);
    scene.add(dirLight);

    // Carga el modelo GLB una sola vez
    const loader = new GLTFLoader();
    const gltf   = await new Promise((resolve, reject) =>
      loader.load("../MODELS/jugador.glb", resolve, undefined, reject)
    );
    console.log("[AR] ✅ Modelo cargado");

    // Crea un anchor por cada equipo
    EQUIPOS.forEach((equipo, index) => {
      const anchor     = mindarInstance.addAnchor(index);
      const modelClone = gltf.scene.clone(true);

      modelClone.scale.set(0.1, 0.1, 0.1);
      modelClone.position.set(0, 0, 0);

      aplicarTextura(modelClone, equipo.textura);
      anchor.group.add(modelClone);

      anchor.onTargetFound = () => {
        console.log(`[AR] 🎯 Detectado → ${equipo.nombre} (índice ${index})`);
        infoText.innerHTML = `${equipo.bandera} ${equipo.info}`;
      };

      anchor.onTargetLost = () => {
        console.log(`[AR] 📴 Perdido → ${equipo.nombre}`);
      };
    });

    // Inicia AR
    await mindarInstance.start();
    started = true;
    infoText.textContent = "Apunta la cámara a un escudo 🏆";

    // Render loop
    renderer.setAnimationLoop(() => renderer.render(scene, camera));

  } catch (err) {
    console.error("[AR] ❌ Error:", err);
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
  infoText.textContent       = "";
});
