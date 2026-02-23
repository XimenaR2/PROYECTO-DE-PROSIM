const btnActivar = document.getElementById("btnActivar");
const btnFoto = document.getElementById("btnFoto");
const btnReset = document.getElementById("btnReset");

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const contexto = canvas.getContext("2d");

let stream = null;

// 1️ Activar cámara
btnActivar.addEventListener("click", async () => {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (error) {
        alert("No se pudo acceder a la cámara");
        console.error(error);
    }
});

// 2️ Tomar foto
btnFoto.addEventListener("click", () => {
    contexto.drawImage(video, 0, 0, canvas.width, canvas.height);
});

// 3️ Reiniciar
btnReset.addEventListener("click", () => {

    // Limpiar canvas
    contexto.clearRect(0, 0, canvas.width, canvas.height);

    // Detener cámara
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        video.srcObject = null;
    }
});