let author = document.querySelector('.author');
let title = document.querySelector('.title');
let cont = document.querySelector('.cont');
let button_prev = document.querySelector('.button_prev');
let button_next = document.querySelector('.button_next');

let article = {};
let articles = []; 
let authors = [];
let a = '';
let n = 0;

// пошук автора  за id і відображення  статті
const render = () => {
  a = '';
  for (let i=0; i<authors.length; i++) {
    if (articles[n].id_author === authors[i].id_author) a = authors[i].author ;
  }
  author.innerHTML = 'Автор: ' + a;
  title.innerHTML = 'Назва: ' + articles[n].title;
	cont.innerHTML = articles[n].text;
};

// запит існуючих авторів на сервері
const getAuthors = async () => {
	const result = await axios.get('/author');
    authors = result.data.slice();
  };

  getAuthors();

// запит існуючих статей на сервері і відображення першої статті
const getArticles = async () => {
	const result = await axios.get('/article');
    console.log(result.data);
    articles = result.data.slice();
	render();
  };

  getArticles();


// обробка натискання кнопки для перегляду попередньої статті
  button_prev.addEventListener('click', (ev) => {
    n = n - 1;
	if (n < 0) n = articles.length - 1;
    render();
  }
  );

 // обробка натискання кнопки для перегляду наступної статті
 button_next.addEventListener('click', (ev) => {
    n = n + 1;
	if (n > articles.length-1) n = 0;
    render();
  }
  ); 

  