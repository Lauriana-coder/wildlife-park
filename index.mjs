import express from 'express';

const app = express();
const PORT = 5000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
