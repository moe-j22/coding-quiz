const questions = [
    {
     question: "What does HTML stand for?",
     options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language"],
     correctAnswer: 0
      },
      {
     question: "Which of the following is used to add styles to a webpage?",
      options: ["HTML", "CSS", "JavaScript", "Python"],
      correctAnswer: 1
      },
      {
     question: "Which programming language is often called the 'mother of all languages'?",
     options: ["Python", "Java", "C++", "C"],
     correctAnswer: 3
      },
      {
     question: "What is the symbol for the 'not equal' comparison operator in JavaScript?",
     options: ["===", "!==", "<>", "><"],
     correctAnswer: 1
       },
        {
         question: "What is the term for a function that calls itself directly or indirectly in its own definition?",
          options: ["Recursive Function", "Circular Function", "Self-invoking Function", "Nested Function"],
        correctAnswer: 0
        }
    ];

    const quizContainer = document.querySelector('.quiz-container');
    const questionElement = document.querySelector('.question');
    const optionsContainer = document.querySelector('.options');
    const scoreElement = document.querySelector('.score');
    const timerElement = document.getElementById('timer');
    let currentQuestionIndex = 0;
    let score = 0;
    let timeLeft = 60;
    
    function startQuiz() {
        quizContainer.addEventListener('click', handleOptionClick);
        renderQuestion();
        startTimer();
    }
    
    function renderQuestion() {
    const question = questions[currentQuestionIndex];
    questionElement.textContent = question.question;
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = option;
        optionElement.setAttribute('data-index', index);
        optionsContainer.appendChild(optionElement);
    });
}

function handleOptionClick(event) {
    const selectedOptionIndex = event.target.getAttribute('data-index');
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;

    if (selectedOptionIndex === correctAnswer.toString()) {
        score += 10;
        scoreElement.textContent = score;
    } else {
        timeLeft -= 10;
    }

    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        renderQuestion();
    } else {
        endQuiz();
    }
}

function startTimer() {
    const timerInterval = setInterval(function () {
        timeLeft--;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        } else {
            timerElement.textContent = `Time left: ${timeLeft}s`;
        }
    }, 1000);
}

function endQuiz() {
    quizContainer.innerHTML = `
        <h2>Quiz Over</h2>
        <p>Your final score is: ${score}</p>
        <p>Enter your initials: <input type="text" id="initials"></p>
        <button onclick="saveScore()">Save Score</button>
    `;
    const highScoresButton = document.querySelector('.high-scores-button');
    highScoresButton.addEventListener('click', showHighScores);
}

function showHighScores() {

}

startQuiz();