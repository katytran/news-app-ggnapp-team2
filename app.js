let urlEndpoint =
  'https://newsapi.org/v2/top-headlines?country=us&apiKey=1e34783b3b774ec5bdea26967ca444f0';
let newsArticles = [];

async function update() {
  let response = await fetch(urlEndpoint);
  let data = await response.json();
  newsArticles = data.articles;
  render();
}

function renderArticleCard(article) {
   let timeAgo= moment(article.publishedAt).fromNow();
  return `
    <div class="card mb-3 mt-5">
      <img src="${article.urlToImage}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${article.title}</h5>
        <p class="card-text">${article.description}</p>
        <p  class="card-text" id = "time">${timeAgo}</p>
      </div>
    </div>
  `;
 }

function render() {
  let resultsArea = document.getElementById('results');
  resultsArea.innerHTML = newsArticles
    .map((article) => renderArticleCard(article))
    .join('');
  
}

function topHeadlinesClicked() {
  console.log('Top headlines');
  urlEndpoint =
    'https://newsapi.org/v2/top-headlines?country=us&apiKey=1e34783b3b774ec5bdea26967ca444f0';
  update();
}

function everythingClicked() {
  console.log('Everything');

  urlEndpoint =
    'https://newsapi.org/v2/everything?q=bitcoin&apiKey=1e34783b3b774ec5bdea26967ca444f0';
  update();
}

update();

