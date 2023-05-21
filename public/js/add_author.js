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

// відображення списку авторів і формування списку select
const render = () => {
	contHTML = "";
	selectHTML = '';
	for (let i=0; i<authors.length; i++) {
		contHTML += `<p class="author">${authors[i].author}</p>`;
		selectHTML += `<option value='${authors[i].author}'>${authors[i].author}</option>`
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

// відправка  даних про зміну автора  для оновлення масиву статей на сервері 
const changeAuthors = async () =>  {
	  try {
		const res = await axios.post('/change', change);
	  } catch (error) {
		console.error(error); // Обробка помилок
	  }
	  	
  };


// обробка натискання кнопки для додавання автора 
  button.addEventListener('click', (ev) => {
	author.author = input.value;
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
	oldAuthor = select.value;
	newAuthor = input1.value;
	if (newAuthor) {
		input1.value = '';
		for (let i=0; i<authors.length; i++) {
			if (oldAuthor === authors[i].author) authors[i].author = newAuthor;
		}
		change.old = oldAuthor;
		change.new = newAuthor;
		render();
		sendAuthors();
		changeAuthors();		
	}
  }
  );
  
