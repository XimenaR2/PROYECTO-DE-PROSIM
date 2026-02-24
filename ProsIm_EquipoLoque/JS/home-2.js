// * * * * * * * * * * * * * * * *  * FOTO * * * * * * * * * * * * * * * * * *  * * * * *


// const btnActivar = document.getElementById("btnActivar");
// const btnFoto = document.getElementById("btnFoto");
// const infoText = document.getElementById("infoText");

// let html5QrCode;
// let scanning = false;

// // 🔥 Abrir cámara
// btnActivar.addEventListener("click", () => {

//     if(scanning) return;

//     html5QrCode = new Html5Qrcode("reader");

//     Html5Qrcode.getCameras().then(devices => {
//         if (devices && devices.length) {

//             html5QrCode.start(
//                 devices[0].id,
//                 {
//                     fps: 10,
//                     qrbox: 250
//                 },
//                 (decodedText) => {
//                     // 🔥 Cuando detecta QR
//                     infoText.textContent = "QR Detectado: " + decodedText;
//                     detenerCamara();
//                 },
//                 (errorMessage) => {
//                     // Ignoramos errores de lectura
//                 }
//             );

//             scanning = true;
//         }
//     }).catch(err => {
//         alert("No se pudo acceder a la cámara");
//         console.error(err);
//     });
// });

// // 🔥 Botón Escanear (solo mensaje si no está activa)
// btnFoto.addEventListener("click", () => {
//     if(!scanning){
//         alert("Primero abre la cámara");
//     }
// });

// // 🔥 Detener cámara
// function detenerCamara(){
//     if(html5QrCode){
//         html5QrCode.stop().then(() => {
//             scanning = false;
//         }).catch(err => console.error(err));
//     }
// }

// * * * * * * * * * * * * * * * *  * ESCANER * * * * * * * * * * * * * * * * * *  * * * * *
// const btnActivar = document.getElementById("btnActivar");
// const infoText = document.getElementById("infoText");

// let html5QrCode;
// let scanning = false;

// btnActivar.addEventListener("click", () => {

//     if(scanning) return;

//     html5QrCode = new Html5Qrcode("reader");

//     html5QrCode.start(
//         { facingMode: "environment" }, // 🔥 fuerza cámara trasera en móvil
//         {
//             fps: 10,
//             qrbox: { width: 250, height: 250 }
//         },
//         (decodedText) => {
//             infoText.textContent = "QR Detectado: " + decodedText;
//             detenerCamara();
//         },
//         (errorMessage) => {
//             // ignoramos errores de lectura
//         }
//     ).then(() => {
//         scanning = true;
//     }).catch(err => {
//         alert("No se pudo acceder a la cámara");
//         console.error(err);
//     });
// });

// function detenerCamara(){
//     if(html5QrCode){
//         html5QrCode.stop().then(() => {
//             scanning = false;
//         }).catch(err => console.error(err));
//     }
// }


// * * * * * * * * * * * * * * * *  * ESCANER con la camara trasera y boton de reinico * * * * * * * * * * * * * * * * * *  * * * * *


const btnActivar = document.getElementById("btnActivar");
const btnReiniciar = document.getElementById("btnReiniciar");
const infoText = document.getElementById("infoText");

let html5QrCode;
let scanning = false;

async function iniciarCamara() {

    if(scanning) return;

    html5QrCode = new Html5Qrcode("reader");

    try {

        // 🔥 Intentar forzar cámara trasera
        await html5QrCode.start(
            { facingMode: { exact: "environment" } },
            {
                fps: 10,
                qrbox: { width: 250, height: 250 }
            },
            onScanSuccess
        );

        scanning = true;

    } catch (error) {

        // 🔥 Si falla, usar cualquier cámara disponible
        try {
            const devices = await Html5Qrcode.getCameras();
            if (devices && devices.length) {

                await html5QrCode.start(
                    devices[0].id,
                    {
                        fps: 10,
                        qrbox: { width: 250, height: 250 }
                    },
                    onScanSuccess
                );

                scanning = true;
            }
        } catch (err) {
            alert("No se pudo acceder a la cámara");
            console.error(err);
        }
    }
}

function onScanSuccess(decodedText) {

    infoText.textContent = "QR Detectado: " + decodedText;

    detenerCamara();

    btnActivar.style.display = "none";
    btnReiniciar.style.display = "inline-block";
}

function detenerCamara() {
    if (html5QrCode && scanning) {
        html5QrCode.stop().then(() => {
            scanning = false;
        }).catch(err => console.error(err));
    }
}

// 🔥 Abrir cámara
btnActivar.addEventListener("click", iniciarCamara);

// 🔥 Escanear otro
btnReiniciar.addEventListener("click", () => {

    infoText.textContent = "";

    btnReiniciar.style.display = "none";
    btnActivar.style.display = "inline-block";

    iniciarCamara();
});