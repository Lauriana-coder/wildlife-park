// Array of quiz questions with options and correct answer
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

let current = 0; // Track current question index
let score = 0; // Track player score

function loadQuestion() { // Display the current question and options
    const q = questions[current]; // Get current question object
    document.getElementById('question').textContent = q.question; // Show question text
    document.getElementById('feedback').textContent = ''; // Clear previous feedback
    document.getElementById('next-btn').style.display = 'none'; // Hide next button

    const optionsDiv = document.getElementById('options'); // Get options container
    optionsDiv.innerHTML = ''; // Clear previous options

    q.options.forEach(option => { // Loop through each option and create a button
        const btn = document.createElement('button'); // Create button element
        btn.textContent = option; // Set button text
        btn.style.display = 'block';
        btn.style.marginBottom = '10px';
        btn.style.width = '200px';
        btn.addEventListener('click', () => checkAnswer(option)); // Check answer on click
        optionsDiv.appendChild(btn); // Add button to page
    });
}

function checkAnswer(selected) { // Check if selected answer is correct
    const correct = questions[current].answer; // Get correct answer
    const feedback = document.getElementById('feedback'); // Get feedback element

    if (selected === correct) { // If answer is correct
        feedback.textContent = '✓ Correct!';
        feedback.style.color = '#2c5f2e'; // Green colour for correct
        score++; // Increase score
    } else { // If answer is wrong
        feedback.textContent = `✗ Wrong! The answer is ${correct}.`;
        feedback.style.color = 'red'; // Red colour for wrong
    }

    document.querySelectorAll('#options button').forEach(btn => {
        btn.disabled = true; // Disable all buttons after answer is selected
    });

    document.getElementById('next-btn').style.display = 'block'; // Show next button
}

document.getElementById('next-btn').addEventListener('click', () => { // Handle next button click
    current++; // Move to next question
    if (current < questions.length) { // If there are more questions
        loadQuestion(); // Load next question
    } else { // If quiz is finished
        document.getElementById('question-box').style.display = 'none'; // Hide question box
        document.getElementById('result').style.display = 'block'; // Show result box
        document.getElementById('score').textContent = 
            `You scored ${score} out of ${questions.length}!`; // Show final score
    }
});

document.getElementById('restart-btn').addEventListener('click', () => { // Handle restart button
    current = 0; // Reset question index
    score = 0; // Reset score
    document.getElementById('question-box').style.display = 'block'; // Show question box
    document.getElementById('result').style.display = 'none'; // Hide result box
    loadQuestion(); // Load first question
});

loadQuestion(); // Start the quiz by loading the first question