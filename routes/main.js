const express = require('express');
const router = express.Router();
//------------------------------------------------------------
// стартова сторінка (перегляд статей)
router.get('/', (req, res) => {
    res.render('view');
});

let articles = [
    { id_article: 1, id_author: 1, title: 'Заголовок 1', text: 'Це текст статті №1'},
    { id_article: 2, id_author: 1, title: 'Заголовок 2', text: 'Це текст статті №2'},
    { id_article: 3, id_author: 2, title: 'Заголовок 3', text: 'Це текст статті №3'},
    { id_article: 4, id_author: 2, title: 'Заголовок 4', text: 'Це текст статті №4'},
    { id_article: 5, id_author: 3, title: 'Заголовок 5', text: 'Це текст статті №5'}
];

// відправка масиву статей на запит get
router.get('/article', (req, res) => {
    res.send(articles);
});

//-----------------------------------------------------------
// сторінка перегляду та додавання авторів
router.get('/add_author/', (req, res) => {
    res.render('add_author');
});

let authors = [
    { id_author: 1, author: 'Автор 1'},
    { id_author: 2, author: 'Автор 2'},
    { id_author: 3, author: 'Автор 3'}
]

// відправка масиву авторів на запит get
router.get('/author', (req, res) => {
    res.json(authors);
});

// отримання масиву авторів від браузера
router.post('/update_authors', (req, res) => {
    authors = req.body;
  });

// ------------------------------------------------------------
// сторінка додавання статей
router.get('/add_article/', (req, res) => {
    res.render('add_article');
});  
// отримання нової статті, додавання її в масив і відправка у відповідь оновленого масиву
router.post('/update_articles', (req, res) => {
    articles = req.body;
  });


module.exports = router;