import express from 'express'; // Import Express framework to create the server
import db from './database.js'; // Import database connection

const app = express(); // Create the Express application
const PORT = 5000; // Define the port the server will run on

app.set('view engine', 'ejs'); // Set EJS as the template engine for rendering pages
app.use(express.static('public')); // Serve static files (CSS, JS, images) from the public folder
app.use(express.urlencoded({ extended: true })); // Allow the server to read form data

app.get('/', (req, res) => { // Route for the homepage
    res.render('index');
});

app.get('/habitats', (req, res) => { // Route for habitats - fetches data from database
    db.all('SELECT * FROM habitats', [], (err, habitats) => {
        res.render('habitats', { habitats });
    });
});

app.get('/contact', (req, res) => { // Route to display the contact form
    res.render('contact');
});

app.post('/contact', (req, res) => { // Route to handle form submission - saves to database
    const { name, email, message } = req.body;
    db.run('INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)',
        [name, email, message], () => {
        res.render('contact', { success: true });
    });
});

app.get('/faq', (req, res) => { // Route for the FAQ page
    res.render('faq');
});

app.get('/activity', (req, res) => { // Route for the animal quiz page
    res.render('activity');
});

app.get('/opening-times', (req, res) => { // Route for the opening times page
    res.render('opening-times');
});

app.listen(PORT, () => { // Start the server
    console.log(`Server running at http://localhost:${PORT}`);
});