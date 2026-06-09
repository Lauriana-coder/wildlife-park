const questions = [
    {
        question: "What is the tallest animal on Earth?",
        options: ["Elephant", "Giraffe", "Polar Bear", "Camel"],
        answer: "Giraffe"
    },
    {
        question: "Which animal is known as the king of the jungle?",
        options: ["Tiger", "Leopard", "Lion", "Cheetah"],
        answer: "Lion"
    },
    {
        question: "What is the largest reptile in the world?",
        options: ["Komodo Dragon", "Anaconda", "Nile Crocodile", "Iguana"],
        answer: "Nile Crocodile"
    },
    {
        question: "Which bird is famous for its colourful beak?",
        options: ["Parrot", "Toucan", "Flamingo", "Peacock"],
        answer: "Toucan"
    },
    {
        question: "What is the fastest land animal?",
        options: ["Lion", "Horse", "Cheetah", "Jaguar"],
        answer: "Cheetah"
    }
];

let current = 0;
let score = 0;

function loadQuestion() {
    const q = questions[current];
    document.getElementById('question').textContent = q.question;
    document.getElementById('feedback').textContent = '';
    document.getElementById('next-btn').style.display = 'none';

    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';

    q.options.forEach(option => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.style.display = 'block';
        btn.style.marginBottom = '10px';
        btn.style.width = '200px';
        btn.addEventListener('click', () => checkAnswer(option));
        optionsDiv.appendChild(btn);
    });
}

function checkAnswer(selected) {
    const correct = questions[current].answer;
    const feedback = document.getElementById('feedback');

    if (selected === correct) {
        feedback.textContent = '✓ Correct!';
        feedback.style.color = '#2c5f2e';
        score++;
    } else {
        feedback.textContent = `✗ Wrong! The answer is ${correct}.`;
        feedback.style.color = 'red';
    }

    document.querySelectorAll('#options button').forEach(btn => {
        btn.disabled = true;
    });

    document.getElementById('next-btn').style.display = 'block';
}

document.getElementById('next-btn').addEventListener('click', () => {
    current++;
    if (current < questions.length) {
        loadQuestion();
    } else {
        document.getElementById('question-box').style.display = 'none';
        document.getElementById('result').style.display = 'block';
        document.getElementById('score').textContent = 
            `You scored ${score} out of ${questions.length}!`;
    }
});

document.getElementById('restart-btn').addEventListener('click', () => {
    current = 0;
    score = 0;
    document.getElementById('question-box').style.display = 'block';
    document.getElementById('result').style.display = 'none';
    loadQuestion();
});

loadQuestion();