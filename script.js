const APILINK = 'https://www.googleapis.com/books/v1/volumes?q=technology&orderBy=relevance';
const SEARCHAPI = 'https://www.googleapis.com/books/v1/volumes?q=';

const main = document.getElementById('section');
const form = document.getElementById('form');
const search = document.getElementById('query');

returnBooks(APILINK);
function returnBooks(url, maxRetries = 5) {
  const fetchBooks = (retryCount) => {
    fetch(url)
      .then(res => {
        if (res.status === 429) {
          const retryAfter = res.headers.get('Retry-After') || Math.pow(2, retryCount);
          console.log(`Too many requests. Try again after ${retryAfter} seconds.`);
          if (retryCount < maxRetries) {
            setTimeout(() => {
              fetchBooks(retryCount + 1);
            }, retryAfter * 1000);
          } else {
            console.error('Max retries reached. Unable to fetch data.');
          }
          return Promise.reject(new Error('Too many requests'));
        } else if (res.ok) {
          return res.json();
        } else {
          throw new Error(`Request failed with status ${res.status}`);
        }
      })
      .then(function(data) {
        data.items.forEach(element => {
          const div_card = document.createElement('div');
          div_card.className = 'card';

          const div_row = document.createElement('div');
          div_row.className = 'row';

          const div_column = document.createElement('div');
          div_column.className = 'column';

          const image = document.createElement('img');
          image.className = 'thumbnail';
          image.setAttribute('id', 'image');

          const title = document.createElement('h3');
          title.setAttribute('id', 'title');

          const center = document.createElement('center');

          title.innerHTML = `${element['volumeInfo']['title']}<br><a href='book.html?id=${element['id']}&title=${element['volumeInfo']['title']}'>reviews</a>`;
          if ('imageLinks' in element.volumeInfo) {
            image.src = element['volumeInfo']['imageLinks']['thumbnail'];
          } else {
            image.src = 'na.png';
          }

          center.appendChild(image);
          div_card.appendChild(center);
          div_card.appendChild(title);
          div_column.appendChild(div_card);
          div_row.appendChild(div_column);
          main.appendChild(div_row);
        });
      })
      .catch(error => console.error('Error:', error.message));
  };
  fetchBooks(0);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  main.innerHTML = '';

  const searchItem = search.value;
  
  if (searchItem) {
    returnBooks(SEARCHAPI + searchItem + '&orderBy=relevance');
    search.value = '';
  }
});
