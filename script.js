document.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById("menu");
    const game = document.getElementById("game");
    const questionElement = document.getElementById("question");
    const answerInput = document.getElementById("answer");
    const submitAnswerButton = document.getElementById("submitAnswer");
    const feedbackElement = document.getElementById("feedback");
    const scoreElement = document.getElementById("score");
    const timerElement = document.getElementById("timer");
    const resetGameButton = document.getElementById("resetGame");
    const exerciseButtons = document.querySelectorAll(".exerciseButton");
    const background = document.querySelector('.background');

    let currentAnswer = 0;
    let score = 0;
    let timeLeft = 60;
    let timerInterval;
    let currentExercise = '';

    function generateParticles() {
        for (let i = 0; i < 100; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = `${Math.random() * 100}vw`;
            particle.style.animationDelay = `${Math.random() * 10}s`;
            background.appendChild(particle);
        }
    }

    generateParticles();

    function generateQuestion() {
        const num1 = Math.floor(Math.random() * 100) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        let questionText = '';

        switch (currentExercise) {
            case 'addition':
                currentAnswer = num1 + num2;
                questionText = `${num1} + ${num2}`;
                break;
            case 'subtraction':
                currentAnswer = num1 - num2;
                questionText = `${num1} - ${num2}`;
                break;
            case 'multiplication':
                currentAnswer = num1 * num2;
                questionText = `${num1} * ${num2}`;
                break;
            case 'division':
                currentAnswer = parseFloat((num1 / num2).toFixed(2));
                questionText = `${num1} / ${num2}`;
                break;
            case 'exponentiation':
                currentAnswer = Math.pow(num1, num2);
                questionText = `${num1} ^ ${num2}`;
                break;
            case 'sqrt':
                currentAnswer = parseFloat(Math.sqrt(num1).toFixed(2));
                questionText = `√${num1}`;
                break;
        }

        questionElement.textContent = `Pregunta: ${questionText}`;
    }

    function startGame(exercise) {
        currentExercise = exercise;
        score = 0;
        timeLeft = 60;
        scoreElement.textContent = `Puntuación: ${score}`;
        timerElement.textContent = `Tiempo: ${timeLeft}`;
        generateQuestion();
        menu.classList.add("hidden");
        game.classList.remove("hidden");
        feedbackElement.textContent = '';
        answerInput.value = '';
        answerInput.disabled = false;
        submitAnswerButton.disabled = false;

        timerInterval = setInterval(() => {
            timeLeft--;
            timerElement.textContent = `Tiempo: ${timeLeft}`;
            if (timeLeft === 0) {
                endGame();
            }
        }, 1000);
    }

    function endGame() {
        clearInterval(timerInterval);
        feedbackElement.textContent = `Juego terminado. Tu puntuación final es: ${score}`;
        answerInput.disabled = true;
        submitAnswerButton.disabled = true;
        resetGameButton.classList.remove("hidden");
    }

    submitAnswerButton.addEventListener("click", () => {
        const userAnswer = parseFloat(answerInput.value);
        if (userAnswer === currentAnswer) {
            score++;
            feedbackElement.textContent = '¡Correcto!';
            feedbackElement.style.color = "#4CAF50";
        } else {
            feedbackElement.textContent = 'Incorrecto. Intenta de nuevo.';
            feedbackElement.style.color = "#d9534f";
        }
        scoreElement.textContent = `Puntuación: ${score}`;
        answerInput.value = '';
        generateQuestion();
    });

    resetGameButton.addEventListener("click", () => {
        menu.classList.remove("hidden");
        game.classList.add("hidden");
        resetGameButton.classList.add("hidden");
        answerInput.value = '';
        feedbackElement.textContent = '';
        clearInterval(timerInterval);
    });

    exerciseButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const exercise = e.target.getAttribute("data-exercise");
            startGame(exercise);
        });
    });
});
