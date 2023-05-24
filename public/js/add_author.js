let cont = document.querySelector('.container');
let input = document.querySelector('.input');
let button = document.querySelector('.button');
let select = document.querySelector('.select');
let input1 = document.querySelector('.input1');
let button1 = document.querySelector('.button1');

let contHTML = "";
let selectHTML = '';
let authors = [];
let author = {};
let change = {};
let oldAuthor = '';
let newAuthor = '';
let lastIdAuthor = 0;

// відображення списку авторів і формування списку select
const render = () => {
	contHTML = "";
	selectHTML = '';
	lastIdAuthor = 0;
	for (let i=0; i<authors.length; i++) {
		if (authors[i].id_author > lastIdAuthor) lastIdAuthor = authors[i].id_author;
		contHTML += `<p class="author">${authors[i].id_author}  ${authors[i].author}</p>`;
		selectHTML += `<option value='${authors[i].id_author} ${authors[i].author}'>${authors[i].id_author} ${authors[i].author}</option>`
	}
	cont.innerHTML = contHTML;
	select.innerHTML = selectHTML;
};

// початковий запит існуючих авторів на сервері і відображення 
const getAuthors = async () => {
	const result = await axios.get('/author');
    authors = result.data.slice();
	render();
  };

  getAuthors();
 
// відправка  оновленого масиву на сервер 
const sendAuthors = async () =>  {
	try {
	  const result = await axios.post('/update_authors', authors);
	} catch (error) {
	  console.error(error); // Обробка помилок
	}
  };

// обробка натискання кнопки для додавання автора 
  button.addEventListener('click', (ev) => {
	author = {id_author: 0, author: ""};
	author.author = input.value;
	author.id_author = lastIdAuthor + 1;
	if (author.author) {
		input.value = '';
		authors.push(author);
		render();
		sendAuthors();		
	}
  }
  );

// обробка натискання кнопки для коригування автора 
button1.addEventListener('click', (ev) => {
	let n = parseInt(select.value,10);
	console.log(select.value,n);
	newAuthor = input1.value;
	if (newAuthor) {
		input1.value = '';
		for (let i=0; i<authors.length; i++) {
			if (n === authors[i].id_author) authors[i].author = newAuthor;
		}
		render();
		sendAuthors();		
	}
  }
  );
  
