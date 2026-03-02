  const btnImportar = document.getElementById("btnImportar");
  const fileInput = document.getElementById("fileInput");
  const previewPanel = document.getElementById("previewPanel");

  // Abrir explorador al hacer clic en Importar
  btnImportar.addEventListener("click", () => {
    fileInput.click();
  });

  // Cuando el usuario seleccione un archivo
  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];

    if (file) {
      const videoURL = URL.createObjectURL(file);

      // Limpiar contenido anterior
      previewPanel.innerHTML = "";

      // Crear elemento video
      const video = document.createElement("video");
      video.src = videoURL;
      video.controls = true;
      video.style.width = "100%";
      video.style.height = "100%";
      video.style.borderRadius = "14px";

      previewPanel.appendChild(video);
    }
  });