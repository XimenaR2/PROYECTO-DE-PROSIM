const btnImportar = document.getElementById("btnImportar");
const fileInput   = document.getElementById("fileInput");
const previewPanel = document.getElementById("previewPanel");

let currentVideo    = null;
let currentFile     = null;
let currentRotation = 0;
let cropActive      = false;
let cropOverlay     = null;
let textOverlays    = [];
let currentFilter   = "none";
let isDraggingText  = false;
let dragTarget      = null;
let dragOffsetX = 0, dragOffsetY = 0;
let adjustValues    = { brightness: 100, contrast: 100, saturation: 100, blur: 0 };

// ── LIBRARY ───────────────────────────────────────────────────────────────────
let library = [];

// Videos siempre disponibles por default — isDefault los protege del "Vaciar"
const DEFAULT_VIDEOS = [
  {
    name:      "World Cup 2022",
    url:       "https://res.cloudinary.com/dijb7bcjl/video/upload/World_Cup_2022_qvkmkw.mp4",
    thumb:     null,
    date:      "Default",
    isDefault: true,
  },
  {
    name:      "FIFA World Cup 2018 Russia",
    url:       "https://res.cloudinary.com/dijb7bcjl/video/upload/v1776683250/2018_FIFA_World_Cup_Russia_baaui3.mp4",
    thumb:     null,
    date:      "Default",
    isDefault: true,
  },
  {
    name:      "Argentina vs México",
    embedUrl:  "https://player.cloudinary.com/embed/?cloud_name=dijb7bcjl&public_id=Argentina_vs_Mexico_sr34um",
    url:       "https://res.cloudinary.com/dijb7bcjl/video/upload/Argentina_vs_Mexico_sr34um.mp4",
    thumb:     null,
    date:      "Default",
    isDefault: true,
  },
  {
    name:      "Marruecos vs Croacia",
    embedUrl:  "https://player.cloudinary.com/embed/?cloud_name=dijb7bcjl&public_id=Marruecos_vs_Croacia_sx7ysd",
    url:       "https://res.cloudinary.com/dijb7bcjl/video/upload/Marruecos_vs_Croacia_sx7ysd.mp4",
    thumb:     null,
    date:      "Default",
    isDefault: true,
  },
  {
    name:      "Panamá vs Túnez",
    embedUrl:  "https://player.cloudinary.com/embed/?cloud_name=dijb7bcjl&public_id=Panama_vs_Tunez_nmtqoy",
    url:       "https://res.cloudinary.com/dijb7bcjl/video/upload/Panama_vs_Tunez_nmtqoy.mp4",
    thumb:     null,
    date:      "Default",
    isDefault: true,
  },
  {
    name:      "Brasil vs Colombia",
    embedUrl:  "https://player.cloudinary.com/embed/?cloud_name=dijb7bcjl&public_id=Brasil_vs_Colombia_ccehhn",
    url:       "https://res.cloudinary.com/dijb7bcjl/video/upload/Brasil_vs_Colombia_ccehhn.mp4",
    thumb:     null,
    date:      "Default",
    isDefault: true,
  },
  {
    name:      "Alemania vs Algeria",
    embedUrl:  "https://player.cloudinary.com/embed/?cloud_name=dijb7bcjl&public_id=Alemania_vs__Algeria_jrjwe9",
    url:       "https://res.cloudinary.com/dijb7bcjl/video/upload/Alemania_vs__Algeria_jrjwe9.mp4",
    thumb:     null,
    date:      "Default",
    isDefault: true,
  },
  {
    name:      "Australia vs Perú",
    embedUrl:  "https://player.cloudinary.com/embed/?cloud_name=dijb7bcjl&public_id=Australia_vs_Peru_sxh0v2",
    url:       "https://res.cloudinary.com/dijb7bcjl/video/upload/Australia_vs_Peru_sxh0v2.mp4",
    thumb:     null,
    date:      "Default",
    isDefault: true,
  },
  {
    name:      "Francia vs Bélgica",
    embedUrl:  "https://player.cloudinary.com/embed/?cloud_name=dijb7bcjl&public_id=Francia_vs_Belgica_pzwx76",
    url:       "https://res.cloudinary.com/dijb7bcjl/video/upload/Francia_vs_Belgica_pzwx76.mp4",
    thumb:     null,
    date:      "Default",
    isDefault: true,
  },
  {
    name:      "Corea del Sur vs Portugal",
    embedUrl:  "https://player.cloudinary.com/embed/?cloud_name=dijb7bcjl&public_id=Corea_delSur_vs_Portugal_scfy9y",
    url:       "https://res.cloudinary.com/dijb7bcjl/video/upload/Corea_delSur_vs_Portugal_scfy9y.mp4",
    thumb:     null,
    date:      "Default",
    isDefault: true,
  },
  {
    name:      "Uzbekistán 1-2 Uruguay",
    embedUrl:  "https://player.cloudinary.com/embed/?cloud_name=dijb7bcjl&public_id=Uzbekist%C3%A1n_1-2_Uruguay_yihvw4",
    url:       "https://res.cloudinary.com/dijb7bcjl/video/upload/Uzbekist%C3%A1n_1-2_Uruguay_yihvw4.mp4",
    thumb:     null,
    date:      "Default",
    isDefault: true,
  },
  {
    name:      "Japón vs España",
    embedUrl:  "https://player.cloudinary.com/embed/?cloud_name=dijb7bcjl&public_id=Japon_vs_Espa%C3%B1a_damlwq",
    url:       "https://res.cloudinary.com/dijb7bcjl/video/upload/Japon_vs_Espa%C3%B1a_damlwq.mp4",
    thumb:     null,
    date:      "Default",
    isDefault: true,
  },
  {
    name:      "Catar vs Irak",
    embedUrl:  "https://player.cloudinary.com/embed/?cloud_name=dijb7bcjl&public_id=catar_vs_Irak_w1xtfz",
    url:       "https://res.cloudinary.com/dijb7bcjl/video/upload/catar_vs_Irak_w1xtfz.mp4",
    thumb:     null,
    date:      "Default",
    isDefault: true,
  },
  {
    name:      "Ecuador vs Senegal",
    embedUrl:  "https://player.cloudinary.com/embed/?cloud_name=dijb7bcjl&public_id=Ecuador_vs_Senegal_cfloq7",
    url:       "https://res.cloudinary.com/dijb7bcjl/video/upload/Ecuador_vs_Senegal_cfloq7.mp4",
    thumb:     null,
    date:      "Default",
    isDefault: true,
  },
  {
    name:      "Croacia vs Dinamarca",
    embedUrl:  "https://player.cloudinary.com/embed/?cloud_name=dijb7bcjl&public_id=Croacia_vs_Dinamarca_dhikvq",
    url:       "https://res.cloudinary.com/dijb7bcjl/video/upload/Croacia_vs_Dinamarca_dhikvq.mp4",
    thumb:     null,
    date:      "Default",
    isDefault: true,
  },
  {
    name:      "Italia vs Costa Rica",
    embedUrl:  "https://player.cloudinary.com/embed/?cloud_name=dijb7bcjl&public_id=Italia_vs_Costa_Rica_dsife8",
    url:       "https://res.cloudinary.com/dijb7bcjl/video/upload/Italia_vs_Costa_Rica_dsife8.mp4",
    thumb:     null,
    date:      "Default",
    isDefault: true,
  },
  {
    name:      "Colombia vs Costa de Marfil",
    embedUrl:  "https://player.cloudinary.com/embed/?cloud_name=dijb7bcjl&public_id=Colombia_vs_CostadelMarfil_qc0hpb",
    url:       "https://res.cloudinary.com/dijb7bcjl/video/upload/Colombia_vs_CostadelMarfil_qc0hpb.mp4",
    thumb:     null,
    date:      "Default",
    isDefault: true,
  },
  {
    name:      "Canadá vs Croacia",
    embedUrl:  "https://player.cloudinary.com/embed/?cloud_name=dijb7bcjl&public_id=Canada_vs_Croacia_lnyvw3",
    url:       "https://res.cloudinary.com/dijb7bcjl/video/upload/Canada_vs_Croacia_lnyvw3.mp4",
    thumb:     null,
    date:      "Default",
    isDefault: true,
  },
  {
    name:      "Suiza vs Camerún",
    embedUrl:  "https://player.cloudinary.com/embed/?cloud_name=dijb7bcjl&public_id=Suiza_vs_Camerun_qqvjbl",
    url:       "https://res.cloudinary.com/dijb7bcjl/video/upload/Suiza_vs_Camerun_qqvjbl.mp4",
    thumb:     null,
    date:      "Default",
    isDefault: true,
  },
  {
    name:      "Portugal vs Países Bajos",
    embedUrl:  "https://player.cloudinary.com/embed/?cloud_name=dijb7bcjl&public_id=Portugal_vs_Paises_bajos_a099cc",
    url:       "https://res.cloudinary.com/dijb7bcjl/video/upload/Portugal_vs_Paises_bajos_a099cc.mp4",
    thumb:     null,
    date:      "Default",
    isDefault: true,
  },
  {
    name:      "Nigeria vs Argentina",
    embedUrl:  "https://player.cloudinary.com/embed/?cloud_name=dijb7bcjl&public_id=Nigeria_vs_Argentina_ffgu4u",
    url:       "https://res.cloudinary.com/dijb7bcjl/video/upload/Nigeria_vs_Argentina_ffgu4u.mp4",
    thumb:     null,
    date:      "Default",
    isDefault: true,
  },
  {
    name:      "Uruguay vs Paraguay",
    embedUrl:  "https://player.cloudinary.com/embed/?cloud_name=dijb7bcjl&public_id=Uruguay_vs_Paraguay_hrbgck",
    url:       "https://res.cloudinary.com/dijb7bcjl/video/upload/Uruguay_vs_Paraguay_hrbgck.mp4",
    thumb:     null,
    date:      "Default",
    isDefault: true,
  },
  {
    name:      "Arabia Saudita vs Mali",
    embedUrl:  "https://player.cloudinary.com/embed/?cloud_name=dijb7bcjl&public_id=Arabia_Saudita_vs_Mali_zm4ln4",
    url:       "https://res.cloudinary.com/dijb7bcjl/video/upload/Arabia_Saudita_vs_Mali_zm4ln4.mp4",
    thumb:     null,
    date:      "Default",
    isDefault: true,
  },
  {
    name:      "Irán vs USA",
    embedUrl:  "https://player.cloudinary.com/embed/?cloud_name=dijb7bcjl&public_id=Iran_vs_USA_j4hwnh",
    url:       "https://res.cloudinary.com/dijb7bcjl/video/upload/Iran_vs_USA_j4hwnh.mp4",
    thumb:     null,
    date:      "Default",
    isDefault: true,
  },
];

function loadLibrary() {
  try {
    const saved      = localStorage.getItem("videoLibrary");
    const userVideos = saved ? JSON.parse(saved).filter(v => !v.isDefault) : [];
    library = [...DEFAULT_VIDEOS, ...userVideos];
  } catch (_) {
    library = [...DEFAULT_VIDEOS];
  }
  // Generar thumbnails de los default si aún no los tienen
  library.filter(v => v.isDefault && !v.thumb).forEach(v => {
    generateRemoteThumb(v.url, thumb => { v.thumb = thumb; });
  });
}

function saveLibrary() {
  try {
    // Solo persistir videos del usuario — los default se reconstruyen solos
    localStorage.setItem("videoLibrary", JSON.stringify(library.filter(v => !v.isDefault)));
  } catch (_) {}
}

// Captura el frame del segundo 2 de un video remoto como thumbnail
function generateRemoteThumb(url, callback) {
  const tmpV        = document.createElement("video");
  tmpV.crossOrigin  = "anonymous";
  tmpV.src          = url;
  tmpV.muted        = true;
  tmpV.preload      = "metadata";
  tmpV.currentTime  = 2;
  tmpV.addEventListener("seeked", () => {
    try {
      const c = document.createElement("canvas");
      c.width = 160; c.height = 90;
      c.getContext("2d").drawImage(tmpV, 0, 0, 160, 90);
      callback(c.toDataURL("image/jpeg", 0.65));
    } catch (_) { callback(null); } // CORS puede bloquear el canvas
  }, { once: true });
  setTimeout(() => callback(null), 5000); // fallback si seeked no dispara
}

loadLibrary();

// ── IMPORT ───────────────────────────────────────────────────────────────────
btnImportar.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  currentFile = file;
  loadVideoToEditor(URL.createObjectURL(file), file.name);
  addToLibrary(file);
});

function loadVideoToEditor(url, name) {
  resetEditor();
  previewPanel.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.id = "videoWrapper";
  wrapper.style.cssText = "position:relative;width:100%;min-height:380px;display:flex;align-items:center;justify-content:center;overflow:hidden;border-radius:14px;background:#111;";

  currentVideo = document.createElement("video");
  currentVideo.controls = true;
  currentVideo.style.cssText = "width:100%;height:100%;border-radius:14px;transition:filter 0.3s,transform 0.5s;display:block;";
  currentVideo.src = url;
  currentVideo.load();

  currentVideo.addEventListener("error", () => {
    showToast("u26a0ufe0f No se pudo cargar el video. Intenta importarlo de nuevo.");
  });

  wrapper.appendChild(currentVideo);
  previewPanel.appendChild(wrapper);

  wrapper.addEventListener("mousemove", onTextDrag);
  wrapper.addEventListener("mouseup", stopTextDrag);
  wrapper.addEventListener("mouseleave", stopTextDrag);
}

function resetEditor() {
  currentRotation = 0;
  currentFilter   = "none";
  textOverlays    = [];
  cropActive      = false;
  cropOverlay     = null;
  adjustValues    = { brightness: 100, contrast: 100, saturation: 100, blur: 0 };
}

// ── LIBRARY: ADD ──────────────────────────────────────────────────────────────
function addToLibrary(file) {
  const objectUrl = URL.createObjectURL(file);

  // Registrar en biblioteca con URL de objeto (válida en esta sesión)
  if (!library.find(v => v.name === file.name)) {
    library.unshift({ name: file.name, url: objectUrl, thumb: null, date: new Date().toLocaleString() });
  } else {
    // Actualizar URL si ya existía (URL vieja ya no sirve entre sesiones)
    const entry = library.find(v => v.name === file.name);
    if (entry) entry.url = objectUrl;
  }

  // Generar thumbnail
  const tmpV = document.createElement("video");
  tmpV.src = objectUrl;
  tmpV.muted = true;
  tmpV.currentTime = 1;

  tmpV.addEventListener("seeked", () => {
    const c = document.createElement("canvas");
    c.width = 160; c.height = 90;
    c.getContext("2d").drawImage(tmpV, 0, 0, 160, 90);
    const thumb = c.toDataURL("image/jpeg", 0.6);
    const entry = library.find(v => v.name === file.name);
    if (entry) entry.thumb = thumb;
    try { saveLibrary(); } catch(_) {}
  }, { once: true });
}

// ── LIBRARY MODAL ─────────────────────────────────────────────────────────────
document.getElementById("btnLibreria").addEventListener("click", openLibraryModal);

function openLibraryModal() {
  const overlay = document.createElement("div");
  overlay.id = "libraryOverlay";
  overlay.style.cssText = `
    position:fixed;inset:0;background:rgba(0,0,0,0.65);backdrop-filter:blur(4px);
    z-index:1000;display:flex;align-items:center;justify-content:center;
    animation:fadeIn .2s ease;
  `;

  const modal = document.createElement("div");
  modal.style.cssText = `
    background:white;border-radius:20px;width:min(92vw,820px);
    max-height:85vh;display:flex;flex-direction:column;overflow:hidden;
    box-shadow:0 30px 60px rgba(0,0,0,0.4);animation:slideUp .25s ease;
  `;

  // Header
  const header = document.createElement("div");
  header.style.cssText = "padding:20px 24px;border-bottom:1px solid #eee;display:flex;align-items:center;justify-content:space-between;";

  const headerLeft = document.createElement("div");
  const headerTitle = document.createElement("h2");
  headerTitle.style.cssText = "margin:0;font-size:20px;color:#222;";
  headerTitle.textContent = "📁 Biblioteca de Videos";
  const headerCount = document.createElement("p");
  headerCount.style.cssText = "margin:4px 0 0;font-size:13px;color:#888;";
  headerCount.textContent = `${library.length} video(s) guardados`;
  headerLeft.appendChild(headerTitle);
  headerLeft.appendChild(headerCount);

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "✕";
  closeBtn.style.cssText = "background:none;border:none;font-size:20px;cursor:pointer;color:#888;padding:4px 8px;border-radius:8px;";
  closeBtn.addEventListener("click", () => overlay.remove());

  header.appendChild(headerLeft);
  header.appendChild(closeBtn);

  // Toolbar row
  const addRow = document.createElement("div");
  addRow.style.cssText = "padding:12px 24px;background:#f9fefe;border-bottom:1px solid #eee;display:flex;gap:10px;align-items:center;";

  const addBtn = document.createElement("button");
  addBtn.innerHTML = `<i class="fas fa-plus"></i> Agregar video`;
  addBtn.style.cssText = "background:#33c6b8;color:white;border:none;padding:9px 18px;border-radius:8px;cursor:pointer;font-weight:bold;font-size:13px;display:flex;align-items:center;gap:6px;";
  addBtn.addEventListener("click", () => { fileInput.click(); overlay.remove(); });

  const clearBtn = document.createElement("button");
  clearBtn.innerHTML = `<i class="fas fa-trash"></i> Vaciar biblioteca`;
  clearBtn.style.cssText = "background:white;color:#e55;border:2px solid #fdd;padding:9px 18px;border-radius:8px;cursor:pointer;font-weight:bold;font-size:13px;display:flex;align-items:center;gap:6px;";
  clearBtn.addEventListener("click", () => {
    if (!confirm("¿Vaciar la biblioteca? Los videos de ejemplo se mantendrán.")) return;
    library = [...DEFAULT_VIDEOS]; // los default siempre se conservan
    saveLibrary();
    renderCards();
    headerCount.textContent = `${library.length} video(s) guardados`;
  });

  addRow.appendChild(addBtn);
  addRow.appendChild(clearBtn);

  // Grid
  const gridWrap = document.createElement("div");
  gridWrap.style.cssText = "overflow-y:auto;flex:1;padding:20px 24px;";

  const grid = document.createElement("div");
  grid.style.cssText = "display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:16px;";

  function renderCards() {
    grid.innerHTML = "";
    if (library.length === 0) {
      grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:#bbb;">
        <i class="fas fa-film" style="font-size:48px;margin-bottom:12px;display:block;"></i>
        <p style="margin:0;font-size:15px;">No hay videos en la biblioteca</p>
        <p style="margin:6px 0 0;font-size:13px;">Importa un video para agregarlo</p>
      </div>`;
      return;
    }

    library.forEach((v, i) => {
      const card = document.createElement("div");
      card.style.cssText = "background:#f5f5f5;border-radius:12px;overflow:hidden;cursor:pointer;transition:transform .2s,box-shadow .2s;border:2px solid transparent;";
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-3px)";
        card.style.boxShadow = "0 8px 24px rgba(51,198,184,0.25)";
        card.style.borderColor = "#33c6b8";
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
        card.style.boxShadow = "";
        card.style.borderColor = "transparent";
      });

      const thumb = document.createElement("div");
      thumb.style.cssText = "position:relative;height:100px;background:#111;";

      if (v.thumb) {
        const img = document.createElement("img");
        img.src = v.thumb;
        img.style.cssText = "width:100%;height:100%;object-fit:cover;";
        thumb.appendChild(img);
      }

      const playIcon = document.createElement("div");
      playIcon.innerHTML = `<i class="fas fa-play-circle"></i>`;
      playIcon.style.cssText = "position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:white;font-size:28px;background:rgba(0,0,0,0.3);opacity:0;transition:opacity .2s;";
      thumb.addEventListener("mouseenter", () => playIcon.style.opacity = "1");
      thumb.addEventListener("mouseleave", () => playIcon.style.opacity = "0");
      thumb.appendChild(playIcon);

      const info = document.createElement("div");
      info.style.cssText = "padding:10px 12px;";

      const nameEl = document.createElement("div");
      nameEl.textContent = v.name.length > 22 ? v.name.slice(0,22) + "…" : v.name;
      nameEl.title = v.name;
      nameEl.style.cssText = "font-size:13px;font-weight:bold;color:#333;margin-bottom:2px;";

      const dateEl = document.createElement("div");
      dateEl.textContent = v.date;
      dateEl.style.cssText = "font-size:11px;color:#aaa;margin-bottom:8px;";

      const btnRow = document.createElement("div");
      btnRow.style.cssText = "display:flex;gap:6px;";

      const openBtn = document.createElement("button");
      openBtn.innerHTML = `<i class="fas fa-edit"></i> Editar`;
      openBtn.style.cssText = "flex:1;background:#33c6b8;color:white;border:none;padding:6px;border-radius:6px;cursor:pointer;font-size:12px;font-weight:bold;";
      openBtn.addEventListener("click", () => {
        loadVideoToEditor(v.url, v.name);
        overlay.remove();
        showToast(`▶ Cargado: ${v.name}`);
        // Para videos de URL remota (default), hacer fetch y asignar currentFile
        // así el exportador puede trabajar con ellos igual que con archivos locales
        if (v.isDefault || !v.url.startsWith("blob:")) {
          currentFile = null; // resetear mientras carga
          fetch(v.url)
            .then(r => r.blob())
            .then(blob => {
              const ext  = v.url.split(".").pop().split("?")[0] || "mp4";
              currentFile = new File([blob], `${v.name}.${ext}`, { type: blob.type || "video/mp4" });
            })
            .catch(() => {
              // Si el fetch falla (CORS, red) se ignora —
              // exportar-video.js usará currentVideo.src como fallback
            });
        }
      });

      const delBtn = document.createElement("button");
      delBtn.innerHTML = `<i class="fas fa-trash"></i>`;
      delBtn.style.cssText = "background:white;border:1px solid #fdd;color:#e55;padding:6px 8px;border-radius:6px;cursor:pointer;font-size:12px;";
      delBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        library.splice(i, 1);
        saveLibrary();
        headerCount.textContent = `${library.length} video(s) guardados`;
        renderCards();
      });

      btnRow.appendChild(openBtn);
      btnRow.appendChild(delBtn);
      info.appendChild(nameEl);
      info.appendChild(dateEl);
      info.appendChild(btnRow);
      card.appendChild(thumb);
      card.appendChild(info);
      grid.appendChild(card);
    });
  }

  renderCards();
  gridWrap.appendChild(grid);
  modal.appendChild(header);
  modal.appendChild(addRow);
  modal.appendChild(gridWrap);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) overlay.remove(); });
}

// ── TOOLS ────────────────────────────────────────────────────────────────────
document.querySelectorAll(".tools-panel button[data-tool]").forEach(btn => {
  btn.addEventListener("click", () => {
    const tool = btn.dataset.tool;
    document.querySelectorAll(".tools-panel button[data-tool]").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    closeAllPanels();
    if (tool === "crop")    openCropPanel();
    if (tool === "rotate")  openRotatePanel();
    if (tool === "text")    openTextPanel();
    if (tool === "filters") openFiltersPanel();
    if (tool === "adjust")  openAdjustPanel();
  });
});

function closeAllPanels() {
  document.querySelectorAll(".tool-subpanel").forEach(p => p.remove());
  removeCropOverlay();
}

// ── CROP ─────────────────────────────────────────────────────────────────────
function openCropPanel() {
  const panel = createSubPanel("Recorte");
  const info = document.createElement("p");
  info.style.cssText = "font-size:13px;color:#666;margin:0 0 12px;";
  info.textContent = "Selecciona una relación de aspecto:";
  const ratios = [
    { label: "Libre", value: "free" },
    { label: "16:9",  value: "16:9" },
    { label: "4:3",   value: "4:3"  },
    { label: "1:1",   value: "1:1"  },
    { label: "9:16",  value: "9:16" },
  ];
  const grid = document.createElement("div");
  grid.style.cssText = "display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;";
  ratios.forEach(r => {
    const b = document.createElement("button");
    b.textContent = r.label;
    b.className = "subpanel-btn";
    b.addEventListener("click", () => {
      document.querySelectorAll(".subpanel-btn").forEach(x => x.classList.remove("active"));
      b.classList.add("active");
      applyCropRatio(r.value);
    });
    grid.appendChild(b);
  });
  const applyBtn = document.createElement("button");
  applyBtn.textContent = "✂ Aplicar Recorte";
  applyBtn.className = "subpanel-apply";
  applyBtn.addEventListener("click", applyCrop);
  panel.appendChild(info);
  panel.appendChild(grid);
  panel.appendChild(applyBtn);
  document.querySelector(".editor-card").appendChild(panel);
}

function applyCropRatio(ratio) {
  if (!currentVideo) return;
  removeCropOverlay();
  const wrapper = document.getElementById("videoWrapper");
  if (!wrapper) return;
  cropOverlay = document.createElement("div");
  cropOverlay.style.cssText = `position:absolute;border:3px dashed #33c6b8;background:rgba(51,198,184,0.08);pointer-events:none;border-radius:4px;box-shadow:0 0 0 9999px rgba(0,0,0,0.45);transition:all .3s;`;
  const vw = currentVideo.offsetWidth;
  const vh = currentVideo.offsetHeight;
  let w = vw * 0.8, h = vh * 0.8;
  if (ratio !== "free") {
    const [rw, rh] = ratio.split(":").map(Number);
    h = Math.min(h, w * rh / rw);
    w = h * rw / rh;
    if (w > vw * 0.9) { w = vw * 0.9; h = w * rh / rw; }
  }
  const left = (wrapper.offsetWidth - w) / 2;
  const top  = (wrapper.offsetHeight - h) / 2;
  cropOverlay.style.cssText += `width:${w}px;height:${h}px;left:${left}px;top:${top}px;`;
  wrapper.appendChild(cropOverlay);
  cropActive = true;
}

function removeCropOverlay() {
  if (cropOverlay) { cropOverlay.remove(); cropOverlay = null; }
  cropActive = false;
}

function applyCrop() {
  if (!currentVideo || !cropOverlay) { showToast("Selecciona un ratio primero"); return; }
  showToast("✅ Recorte aplicado");
  currentVideo.style.objectFit = "cover";
}

// ── ROTATE ───────────────────────────────────────────────────────────────────
function openRotatePanel() {
  const panel = createSubPanel("Rotación");
  const info = document.createElement("p");
  info.style.cssText = "font-size:13px;color:#666;margin:0 0 12px;";
  info.textContent = "Rota el video:";
  const row = document.createElement("div");
  row.style.cssText = "display:flex;gap:8px;flex-wrap:wrap;";
  const rotations = [
    { label: "↺ -90°", deg: -90 },
    { label: "↻ +90°", deg: 90  },
    { label: "↕ 180°", deg: 180 },
    { label: "↺ Reset", deg: 0  },
  ];
  const angleLabel = document.createElement("div");
  angleLabel.style.cssText = "width:100%;text-align:center;font-size:13px;color:#33c6b8;font-weight:bold;margin-top:8px;";
  angleLabel.textContent = `Ángulo actual: ${currentRotation}°`;
  rotations.forEach(r => {
    const b = document.createElement("button");
    b.textContent = r.label;
    b.className = "subpanel-btn";
    b.style.flex = "1";
    b.addEventListener("click", () => {
      if (r.deg === 0) currentRotation = 0;
      else currentRotation = (currentRotation + r.deg + 360) % 360;
      applyRotation();
      angleLabel.textContent = `Ángulo actual: ${currentRotation}°`;
    });
    row.appendChild(b);
  });
  panel.appendChild(info);
  panel.appendChild(row);
  panel.appendChild(angleLabel);
  document.querySelector(".editor-card").appendChild(panel);
}

function applyRotation() {
  if (!currentVideo) return;
  const scale = currentRotation % 180 !== 0 ? 0.6 : 1;
  currentVideo.style.transform = `rotate(${currentRotation}deg) scale(${scale})`;
}

// ── TEXT ─────────────────────────────────────────────────────────────────────
function openTextPanel() {
  const panel = createSubPanel("Texto");
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Escribe tu texto…";
  input.style.cssText = "width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;font-size:14px;margin-bottom:10px;box-sizing:border-box;";
  const colorRow = document.createElement("div");
  colorRow.style.cssText = "display:flex;align-items:center;gap:8px;margin-bottom:10px;font-size:13px;";
  colorRow.innerHTML = "<span>Color:</span>";
  const colorPicker = document.createElement("input");
  colorPicker.type = "color";
  colorPicker.value = "#ffffff";
  colorPicker.style.cssText = "width:36px;height:28px;border:none;cursor:pointer;border-radius:4px;";
  colorRow.appendChild(colorPicker);
  const sizeRow = document.createElement("div");
  sizeRow.style.cssText = "display:flex;align-items:center;gap:8px;margin-bottom:10px;font-size:13px;";
  const sizeLabel = document.createElement("span");
  sizeLabel.textContent = "Tamaño: 24px";
  const sizeSlider = document.createElement("input");
  sizeSlider.type = "range";
  sizeSlider.min = 12; sizeSlider.max = 72; sizeSlider.value = 24;
  sizeSlider.style.flex = "1";
  sizeSlider.addEventListener("input", () => sizeLabel.textContent = `Tamaño: ${sizeSlider.value}px`);
  sizeRow.appendChild(sizeLabel);
  sizeRow.appendChild(sizeSlider);
  const addBtn = document.createElement("button");
  addBtn.textContent = "+ Agregar Texto";
  addBtn.className = "subpanel-apply";
  addBtn.addEventListener("click", () => {
    if (!currentVideo) { showToast("Importa un video primero"); return; }
    if (!input.value.trim()) { showToast("Escribe algo primero"); return; }
    addTextOverlay(input.value.trim(), colorPicker.value, parseInt(sizeSlider.value));
    input.value = "";
  });
  const hint = document.createElement("p");
  hint.style.cssText = "font-size:11px;color:#999;margin:8px 0 0;text-align:center;";
  hint.textContent = "Arrastra el texto • doble clic para eliminar";
  panel.appendChild(input);
  panel.appendChild(colorRow);
  panel.appendChild(sizeRow);
  panel.appendChild(addBtn);
  panel.appendChild(hint);
  document.querySelector(".editor-card").appendChild(panel);
}

function addTextOverlay(text, color, size) {
  const wrapper = document.getElementById("videoWrapper");
  if (!wrapper) return;
  const el = document.createElement("div");
  el.className = "text-overlay";
  el.textContent = text;
  el.dataset.textColor = color;
  el.dataset.fontSize  = size;
  el.style.cssText = `position:absolute;color:${color};font-size:${size}px;font-weight:bold;text-shadow:1px 1px 3px rgba(0,0,0,0.8);cursor:grab;user-select:none;left:50%;top:50%;transform:translate(-50%,-50%);padding:4px 8px;border-radius:4px;background:rgba(0,0,0,0.15);backdrop-filter:blur(2px);border:1px dashed rgba(255,255,255,0.3);`;
  el.addEventListener("dblclick", () => {
    el.remove();
    textOverlays = textOverlays.filter(t => t !== el);
    showToast("Texto eliminado");
  });
  el.addEventListener("mousedown", (e) => {
    isDraggingText = true;
    dragTarget = el;
    const rect  = el.getBoundingClientRect();
    const wRect = wrapper.getBoundingClientRect();
    dragOffsetX = e.clientX - rect.left;
    dragOffsetY = e.clientY - rect.top;
    el.style.cursor = "grabbing";
    el.style.transform = "none";
    el.style.left = (rect.left - wRect.left) + "px";
    el.style.top  = (rect.top  - wRect.top)  + "px";
    e.preventDefault();
  });
  wrapper.appendChild(el);
  textOverlays.push(el);
  showToast("✅ Texto agregado — doble clic para eliminar");
}

function onTextDrag(e) {
  if (!isDraggingText || !dragTarget) return;
  const wrapper = document.getElementById("videoWrapper");
  const wRect   = wrapper.getBoundingClientRect();
  let x = e.clientX - wRect.left - dragOffsetX;
  let y = e.clientY - wRect.top  - dragOffsetY;
  x = Math.max(0, Math.min(x, wrapper.offsetWidth  - dragTarget.offsetWidth));
  y = Math.max(0, Math.min(y, wrapper.offsetHeight - dragTarget.offsetHeight));
  dragTarget.style.left = x + "px";
  dragTarget.style.top  = y + "px";
}

function stopTextDrag() {
  if (dragTarget) dragTarget.style.cursor = "grab";
  isDraggingText = false;
  dragTarget = null;
}

// ── FILTERS ───────────────────────────────────────────────────────────────────
const FILTERS = [
  { name: "Original", value: "none" },
  { name: "B&W",      value: "grayscale(100%)" },
  { name: "Sepia",    value: "sepia(100%)" },
  { name: "Vivid",    value: "saturate(200%) contrast(110%)" },
  { name: "Fade",     value: "opacity(70%) brightness(110%)" },
  { name: "Cool",     value: "hue-rotate(180deg) saturate(120%)" },
  { name: "Warm",     value: "sepia(30%) saturate(150%) hue-rotate(330deg)" },
  { name: "Dramatic", value: "contrast(150%) brightness(90%) grayscale(20%)" },
  { name: "Vintage",  value: "sepia(50%) contrast(120%) brightness(95%) saturate(80%)" },
  { name: "Night",    value: "brightness(60%) contrast(130%) hue-rotate(200deg)" },
];

function openFiltersPanel() {
  const panel = createSubPanel("Filtros");
  panel.style.gridColumn = "1 / -1";
  const grid = document.createElement("div");
  grid.style.cssText = "display:grid;grid-template-columns:repeat(5,1fr);gap:8px;";
  FILTERS.forEach(f => {
    const btn = document.createElement("button");
    btn.className = "subpanel-btn filter-btn";
    btn.textContent = f.name;
    if (currentFilter === f.value) btn.classList.add("active");
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = f.value;
      applyFilterToVideo();
      showToast(`Filtro: ${f.name}`);
    });
    grid.appendChild(btn);
  });
  panel.appendChild(grid);
  document.querySelector(".editor-card").appendChild(panel);
}

function applyFilterToVideo() {
  if (currentVideo) currentVideo.style.filter = currentFilter;
}

// ── ADJUST ────────────────────────────────────────────────────────────────────
function openAdjustPanel() {
  const panel = createSubPanel("Ajustes");
  panel.style.gridColumn = "1 / -1";
  const sliders = [
    { key: "brightness", label: "Brillo",     min: 0, max: 200, unit: "%" },
    { key: "contrast",   label: "Contraste",  min: 0, max: 200, unit: "%" },
    { key: "saturation", label: "Saturación", min: 0, max: 300, unit: "%" },
    { key: "blur",       label: "Desenfoque", min: 0, max: 20,  unit: "px" },
  ];
  const grid = document.createElement("div");
  grid.style.cssText = "display:grid;grid-template-columns:1fr 1fr;gap:16px 24px;";
  sliders.forEach(s => {
    const wrap = document.createElement("div");
    const label = document.createElement("div");
    label.style.cssText = "display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px;";
    const valSpan = document.createElement("span");
    valSpan.style.color = "#33c6b8";
    valSpan.textContent = adjustValues[s.key] + s.unit;
    label.innerHTML = `<span>${s.label}</span>`;
    label.appendChild(valSpan);
    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = s.min; slider.max = s.max;
    slider.value = adjustValues[s.key];
    slider.style.cssText = "width:100%;accent-color:#33c6b8;";
    slider.addEventListener("input", () => {
      adjustValues[s.key] = parseInt(slider.value);
      valSpan.textContent = adjustValues[s.key] + s.unit;
      applyAdjustments();
    });
    wrap.appendChild(label);
    wrap.appendChild(slider);
    grid.appendChild(wrap);
  });
  const resetBtn = document.createElement("button");
  resetBtn.textContent = "↺ Restablecer ajustes";
  resetBtn.className = "subpanel-btn";
  resetBtn.style.cssText = "margin-top:12px;width:100%;";
  resetBtn.addEventListener("click", () => {
    adjustValues = { brightness: 100, contrast: 100, saturation: 100, blur: 0 };
    panel.querySelectorAll("input[type=range]").forEach((sl, i) => { sl.value = sliders[i].key === "blur" ? 0 : 100; });
    panel.querySelectorAll("span[style*='33c6b8']").forEach((sp, i) => { sp.textContent = adjustValues[sliders[i].key] + sliders[i].unit; });
    applyAdjustments();
    showToast("Ajustes restablecidos");
  });
  panel.appendChild(grid);
  panel.appendChild(resetBtn);
  document.querySelector(".editor-card").appendChild(panel);
}

function applyAdjustments() {
  if (!currentVideo) return;
  const { brightness, contrast, saturation, blur } = adjustValues;
  const base = currentFilter !== "none" ? currentFilter + " " : "";
  currentVideo.style.filter = base + `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) blur(${blur}px)`;
}

// ── ACTIONS ───────────────────────────────────────────────────────────────────
document.getElementById("btnAplicar")?.addEventListener("click", () => {
  applyRotation();
  applyAdjustments();
  showToast("✅ Cambios aplicados");
});

document.getElementById("btnDeshacer")?.addEventListener("click", () => {
  if (!currentVideo) return;
  currentRotation = 0;
  currentFilter   = "none";
  adjustValues    = { brightness: 100, contrast: 100, saturation: 100, blur: 0 };
  currentVideo.style.filter    = "none";
  currentVideo.style.transform = "none";
  textOverlays.forEach(t => t.remove());
  textOverlays = [];
  removeCropOverlay();
  document.querySelectorAll(".tool-subpanel").forEach(p => p.remove());
  document.querySelectorAll(".tools-panel button[data-tool]").forEach(b => b.classList.remove("active"));
  showToast("↺ Todo restablecido");
});

// ── HELPERS ───────────────────────────────────────────────────────────────────
function createSubPanel(title) {
  document.querySelectorAll(".tool-subpanel").forEach(p => p.remove());
  const panel = document.createElement("div");
  panel.className = "tool-subpanel";
  const h = document.createElement("h3");
  h.textContent = title;
  h.style.cssText = "margin:0 0 14px;font-size:16px;color:#33c6b8;border-bottom:1px solid #eee;padding-bottom:8px;";
  panel.appendChild(h);
  return panel;
}

function showToast(msg) {
  let toast = document.getElementById("editorToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "editorToast";
    toast.style.cssText = `position:fixed;bottom:32px;left:50%;transform:translateX(-50%);background:#33c6b8;color:white;padding:12px 24px;border-radius:999px;font-size:14px;font-weight:bold;box-shadow:0 8px 24px rgba(0,0,0,0.25);z-index:9999;opacity:0;transition:opacity 0.3s;pointer-events:none;`;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = "1";
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.style.opacity = "0", 2800);
}

