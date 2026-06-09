import express from 'express';
import db from './database.js';


const app = express();
const PORT = 5000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/habitats', (req, res) => {
    db.all('SELECT * FROM habitats', [], (err, habitats) => {
        res.render('habitats', { habitats });
    });
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    db.run('INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)',
        [name, email, message], () => {
        res.render('contact', { success: true });
    });
});

app.get('/faq', (req, res) => {
    res.render('faq');
});

app.get('/activity', (req, res) => {
    res.render('activity');
});

app.get('/opening-times', (req, res) => {
    res.render('opening-times');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
