// Quiz questions data
const quizData = [
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: 2,
        funFact: "Jupiter is so big that if it were a basketball, Earth would be a grape! Talk about planetary body-shaming!"
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
        correct: 1,
        funFact: "Oxygen is like that friend who's always there for you - you can't see it, but you'd definitely notice if it left the party!"
    },
    {
        question: "What is the capital of Japan?",
        options: ["Kyoto", "Osaka", "Tokyo", "Yokohama"],
        correct: 2,
        funFact: "Tokyo is so crowded that there are professional 'pushers' whose job is to cram people into trains. Talk about a tight squeeze!"
    },
    {
        question: "Which famous scientist developed the theory of relativity?",
        options: ["Isaac Newton", "Albert Einstein", "Stephen Hawking", "Galileo Galilei"],
        correct: 1,
        funFact: "Einstein's famous wild hair wasn't just a style choice - it was his way of saying 'I'm too busy thinking about the universe to worry about a comb'!"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correct: 3,
        funFact: "The Pacific Ocean is so vast that if you tried to swim across it, you'd probably get really good at backstroke... and really tired of fish!"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1,
        funFact: "Mars is red because it's blushing - it's embarrassed that Earth keeps sending robots to take selfies with it!"
    },
    {
        question: "What is the smallest prime number?",
        options: ["0", "1", "2", "3"],
        correct: 2,
        funFact: "2 is the only even prime number - it's like the odd one out at the odd numbers' party!"
    },
    {
        question: "Which animal can change its color to match its surroundings?",
        options: ["Chameleon", "Octopus", "Both A and B", "Neither A nor B"],
        correct: 2,
        funFact: "Chameleons and octopuses are nature's mood rings - they change colors faster than a teenager changes their profile picture!"
    },
    {
        question: "What is the hardest natural substance on Earth?",
        options: ["Gold", "Diamond", "Platinum", "Titanium"],
        correct: 1,
        funFact: "Diamonds are just chunks of carbon that got really, really stressed out under pressure. They're basically the overachievers of the mineral world!"
    },
    {
        question: "Which country is home to the kangaroo?",
        options: ["New Zealand", "South Africa", "Australia", "Brazil"],
        correct: 2,
        funFact: "Kangaroos are the only large animals that hop as their main way of getting around. They're basically the original pogo stick enthusiasts!"
    }
];

// DOM Elements
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedbackContainer = document.getElementById('feedback-container');
const feedbackMessage = document.querySelector('.feedback-message');
const funFact = document.querySelector('.fun-fact');
const nextButton = document.getElementById('next-button');
const quizResults = document.getElementById('quiz-results');
const finalScore = document.getElementById('final-score');
const totalScore = document.getElementById('total-score');
const restartButton = document.getElementById('restart-button');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const progressFill = document.querySelector('.progress-fill');

// Quiz state
let currentQuestion = 0;
let score = 0;
let selectedOption = null;

// Initialize quiz
function initQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedOption = null;
    totalQuestionsSpan.textContent = quizData.length;
    showQuestion();
    quizResults.classList.remove('show');
    feedbackContainer.classList.remove('show');
}

// Display current question
function showQuestion() {
    const question = quizData[currentQuestion];
    questionText.textContent = question.question;
    currentQuestionSpan.textContent = currentQuestion + 1;
    
    // Update progress bar
    const progress = ((currentQuestion) / quizData.length) * 100;
    progressFill.style.width = `${progress}%`;

    // Clear previous options
    optionsContainer.innerHTML = '';

    // Create new options
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option';
        button.textContent = option;
        button.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(button);
    });
}

// Handle option selection
function selectOption(index) {
    if (selectedOption !== null) return; // Prevent multiple selections

    selectedOption = index;
    const options = optionsContainer.children;
    const correctAnswer = quizData[currentQuestion].correct;

    // Disable all options
    Array.from(options).forEach(option => {
        option.style.pointerEvents = 'none';
    });

    // Show correct/incorrect feedback
    if (index === correctAnswer) {
        options[index].classList.add('correct');
        feedbackMessage.textContent = 'Correct!';
        feedbackMessage.style.color = 'var(--success-color)';
        score++;
    } else {
        options[index].classList.add('incorrect');
        options[correctAnswer].classList.add('correct');
        feedbackMessage.textContent = 'Incorrect!';
        feedbackMessage.style.color = 'var(--error-color)';
    }

    // Show fun fact
    funFact.textContent = quizData[currentQuestion].funFact;
    feedbackContainer.classList.add('show');
}

// Handle next question
nextButton.addEventListener('click', () => {
    selectedOption = null;
    currentQuestion++;

    if (currentQuestion < quizData.length) {
        showQuestion();
        feedbackContainer.classList.remove('show');
    } else {
        showResults();
    }
});

// Show final results
function showResults() {
    document.querySelector('.quiz-content').style.display = 'none';
    finalScore.textContent = score;
    totalScore.textContent = quizData.length;
    quizResults.classList.add('show');
}

// Restart quiz
restartButton.addEventListener('click', () => {
    document.querySelector('.quiz-content').style.display = 'block';
    initQuiz();
});

// Initialize the quiz when the page loads
initQuiz(); 