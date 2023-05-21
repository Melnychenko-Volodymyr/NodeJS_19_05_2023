const express = require('express');
const router = express.Router();
//------------------------------------------------------------
// стартова сторінка (перегляд статей)
router.get('/', (req, res) => {
    res.render('view');
});

let articles = [
    { author: 'Автор 1', title: 'Заголовок 1', text: 'Це текст статті №1'},
    { author: 'Автор 1', title: 'Заголовок 2', text: 'Це текст статті №2'},
    { author: 'Автор 2', title: 'Заголовок 3', text: 'Це текст статті №3'},
    { author: 'Автор 3', title: 'Заголовок 4', text: 'Це текст статті №4'}
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
    { author: 'Автор 1'},
    { author: 'Автор 2'},
    { author: 'Автор 3'}
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
router.post('/add_article', (req, res) => {
    const data = req.body;
    articles.push(data);
    res.json(articles);
  });

// обробка масиву статей при зміні автора
router.post('/change', (req, res) => {
    console.log(req.body);
    const change = req.body;
    for (let i=0; i<articles.length; i++) {
        if (articles[i].author === change.old) articles[i].author = change.new;
    }
  }); 

module.exports = router;