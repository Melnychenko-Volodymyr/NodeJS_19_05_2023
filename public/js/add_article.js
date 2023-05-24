let input = document.querySelector('.input');
let textarea = document.querySelector('.textarea');
let select = document.querySelector('.select');
let button = document.querySelector('.button');

let contHTML = "";
let authors = [];
let articles = [];
let article = {};
let lastId = 0;

// запит існуючих статей на сервері і пошук останнього id
const getArticles = async () => {
	const result = await axios.get('/article');
    articles = result.data.slice();
    for (let i=0; i<articles.length; i++) {
      if (articles[i].id_article > lastId) lastId = articles[i].id_article;      
    }
  };

  getArticles();

// запит масиву авторів та формування списку select
const getAuthors = async () => {
	const result = await axios.get('/author');
    authors = result.data.slice();
    for (let i=0; i<authors.length; i++) {
        contHTML += `<option value='${authors[i].id_author} ${authors[i].author}'>${authors[i].id_author} ${authors[i].author}</option>`
    }  
    select.innerHTML = contHTML;
  };

  getAuthors();

// відправка масиву статей на сервер
const sendArticle = async () =>  {
	try {
	  const result = await axios.post('/update_articles', articles);
	} catch (error) {
	  console.error(error); // Обробка помилок
	}
  };

// обробка натискання кнопки для відправки статті
  button.addEventListener('click', (ev) => {
    article = {};
    article.id_article = lastId + 1;
    article.id_author = parseInt(select.value,10);
    article.title = input.value;
	  article.text = textarea.value; 
	if (input.value && textarea.value) {
		input.value = '';
		textarea.value = '';
    articles.push(article);
		sendArticle();		
	}
  }
  );

  
