const quiz = [
{
    question: "¿Qué países serán sede del Mundial 2026?",
    image: "../MULTIMEDIA/images.jpg",
    answers: [
        "Brasil, Argentina y Uruguay",
        "Estados Unidos, México y Canadá",
        "España, Portugal y Marruecos",
        "Alemania, Francia e Italia"
    ],
    correct: 1
},
{
    question: "¿Cuántos equipos participarán en el Mundial 2026?",
    image: "../MULTIMEDIA/mundial1.jpg",
    answers: [
        "32 equipos",
        "40 equipos",
        "48 equipos",
        "24 equipos"
    ],
    correct: 2
},
{
    question: "¿Qué país albergará la final del Mundial 2026?",
    image: "../MULTIMEDIA/quiz1.jpg",
    answers: [
        "México",
        "Estados Unidos",
        "Canadá",
        "Brasil"
    ],
    correct: 1
}
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const imageEl = document.getElementById("image");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");

const scoreBoard = document.createElement("h4");
scoreBoard.textContent = "Puntos: 0";
document.querySelector(".container").prepend(scoreBoard);

function loadQuestion(){
    nextBtn.style.display = "none";
    answersEl.innerHTML = "";

    const q = quiz[currentQuestion];
    questionEl.textContent = q.question;
    imageEl.src = q.image;

    q.answers.forEach((answer, index)=>{
        const button = document.createElement("button");
        button.textContent = answer;

        button.addEventListener("click", ()=>{
            Array.from(answersEl.children).forEach(btn=>{
                btn.disabled = true;
            });

            if(index === q.correct){
                button.classList.add("correct");
                score += 100;
                scoreBoard.textContent = "Puntos: " + score;
            } else{
                button.classList.add("incorrect");
            }

            Array.from(answersEl.children).forEach((btn, i)=>{
                if(i === q.correct){
                    btn.classList.add("correct");
                }
            });

            nextBtn.style.display = "block";
        });

        answersEl.appendChild(button);
    });
}

nextBtn.addEventListener("click", ()=>{
    currentQuestion++;

    if(currentQuestion >= quiz.length){
        showFinalScreen();
    } else{
        loadQuestion();
    }
});

function showFinalScreen(){
    document.querySelector(".container").innerHTML = `
        <h1>🏆 ¡Juego terminado!</h1>
        <h2>Tu puntaje final es:</h2>
        <h1>${score} puntos</h1>
        <button onclick="restartGame()">Jugar otra vez</button>
    `;
}

function restartGame(){
    currentQuestion = 0;
    score = 0;
    location.reload();
}

loadQuestion();