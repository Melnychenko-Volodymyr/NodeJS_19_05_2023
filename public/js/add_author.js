let cont = document.querySelector('.container');
let input = document.querySelector('.input');
let button = document.querySelector('.button');

let contHTML = "";
let authors = [];
let author = {};

// відображення списку авторів
const render = () => {
	contHTML = "";
	for (let i=0; i<authors.length; i++) contHTML += `<p class="author">${authors[i].author}</p>`;	
	cont.innerHTML = contHTML;
};

// запит існуючих авторів на сервері і відображення 
const getAuthors = async () => {
	const result = await axios.get('/author');
    authors = result.data.slice();
	render();
  };

  getAuthors();
 
// відправка нової статті на сервер, отримання і відображення оновленого масиву
const sendAuthor = async () =>  {
	try {
	  const result = await axios.post('/add_author', author);
	  authors = result.data.slice(); // Дані, які повернув сервер
      render();
	} catch (error) {
	  console.error(error); // Обробка помилок
	}
  };

// обробка натискання кнопки для відправки 
  button.addEventListener('click', (ev) => {
	author.author = input.value;
	if (author.author) {
		input.value = '';
		sendAuthor();		
	}
  }
  );

  
