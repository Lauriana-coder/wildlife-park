import express from 'express'; // Import Express framework to create the server
import db from './database.js'; // Import database connection

const app = express(); // Create the Express application
const PORT = 5000; // Define the port the server will run on

app.set('view engine', 'ejs'); // Set EJS as the template engine for rendering pages
app.use(express.static('public')); // Serve static files (CSS, JS, images) from the public folder
app.use(express.urlencoded({ extended: true })); // Allow the server to read form data
app.use(express.json()); // Allow the server to read JSON data sent via AJAX requests

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

app.post('/contact', (req, res) => { // Route to handle AJAX form submission - returns JSON instead of re-rendering
    const { name, email, message } = req.body; // Extract form data from the request body

    // Server-side validation
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, error: 'Please fill in all fields.' });
    }
    if (!email.includes('@')) {
        return res.status(400).json({ success: false, error: 'Please enter a valid email address.' });
    }

    // Insert into database using prepared statement to prevent SQL injection
    db.run('INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)',
        [name, email, message], (err) => {
            if (err) {
                return res.status(500).json({ success: false, error: 'Something went wrong. Please try again.' });
            }
            res.json({ success: true }); // Send JSON response back to the AJAX request
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

app.get('/search', (req, res) => { // Route for the search page
    res.render('search');
});

// AJAX route - receives a search query and returns matching results as JSON without reloading the page
app.get('/api/search', (req, res) => {
    const query = req.query.q ? req.query.q.trim() : ''; // Get the search query from the URL

    if (!query) {
        return res.json({ habitats: [], exhibits: [] }); // Return empty results if no query
    }

    const searchTerm = `%${query}%`; // Add wildcards for SQL LIKE search

    // Search the habitats table
    db.all('SELECT * FROM habitats WHERE name LIKE ? OR description LIKE ?',
        [searchTerm, searchTerm], (err, habitats) => {
            if (err) return res.status(500).json({ error: 'Database error' });

            // Search the exhibits table and join with habitats to get the habitat name
            db.all(`SELECT exhibits.*, habitats.name AS habitat_name 
                    FROM exhibits 
                    JOIN habitats ON exhibits.habitat_id = habitats.id 
                    WHERE exhibits.animal LIKE ? OR exhibits.description LIKE ?`,
                [searchTerm, searchTerm], (err, exhibits) => {
                    if (err) return res.status(500).json({ error: 'Database error' });
                    res.json({ habitats, exhibits }); // Send JSON results back to the AJAX request
                });
        });
});

app.listen(PORT, () => { // Start the server
    console.log(`Server running at http://localhost:${PORT}`);
});