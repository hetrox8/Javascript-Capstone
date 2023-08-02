import './styles.css';

const BASE_API_URL = 'https://api.tvmaze.com/shows';
const showsPerPage = 10;
let currentPage = 0;

const getShowsEndpoint = (page) => `${BASE_API_URL}?page=${page}`;

const fetchAndDisplayShows = async () => {
  try {
    const response = await fetch(getShowsEndpoint(currentPage));
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const listElement = document.querySelector('.list-1');
    //clearList();

    for (let i = 0; i < showsPerPage; i++) {
      const show = data[i];
      if (!show) break;

      const listItem = document.createElement('li');
      const imageElement = document.createElement('img');
      const titleElement = document.createElement('h3');
      const summaryElement = document.createElement('p');
      const premiereDateElement = document.createElement('p');

      imageElement.src = show.image && show.image.medium ? show.image.medium : 'placeholder.png';
      imageElement.alt = show.name;

      titleElement.textContent = show.name;
      summaryElement.textContent = show.summary || 'No summary available';
      premiereDateElement.textContent = show.premiereDate || 'No premiere date available';

      listItem.appendChild(imageElement);
      listItem.appendChild(titleElement);
     /* listItem.appendChild(summaryElement);
      listItem.appendChild(premiereDateElement);
*/
      listElement.appendChild(listItem);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const clearList = () => {
  const listElement = document.querySelector('.list-1');
  while (listElement.firstChild) {
    listElement.removeChild(listElement.firstChild);
  }
};

const fetchNextPage = () => {
  currentPage++;
  fetchAndDisplayShows();
};

const loadMoreButton = document.getElementById('load-more-button');
loadMoreButton.addEventListener('click', fetchNextPage);

window.addEventListener('DOMContentLoaded', () => {
  fetchAndDisplayShows();
});