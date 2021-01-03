let page = 1;
// let topHeadlinesUrlEndpoint = 'https://newsapi.org/v2/top-headlines';
let everythingUrlEndpoint = 'https://newsapi.org/v2/everything';
let newsArticles = [];
let topHeadlines = {
  url: 'https://newsapi.org/v2/top-headlines',
  country: 'us',
  category: 'general',
};

async function update(type) {
  if (type == 'everything') {
    fullURL = `${everythingUrlEndpoint}?q="bitcoin"&page=${page}&apiKey=1e34783b3b774ec5bdea26967ca444f0`;
  } else {
    fullURL = `${topHeadlines.url}?category=${topHeadlines.category}&page=${page}&country=${topHeadlines.country}&apiKey=1e34783b3b774ec5bdea26967ca444f0`;
  }
  let response = await fetch(fullURL);
  let data = await response.json();
  newsArticles = [...newsArticles, ...data.articles];
  render(type);
}

function renderArticleCard(article) {
  let timeAgo = moment(article.publishedAt).fromNow();
  return `
    <div class="card mb-3 mt-5">
      <img src="${article.urlToImage}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${article.title}</h5>
        <p class="card-text">Source: ${article.source.name}</p>
        <p class="card-text">${article.description}</p>
        <div className="link" id="view-more"><a href="${article.url}">View more ...</a></div>
        <p  class="card-text" id = "time">${timeAgo}</p>
      </div>
    </div>
  `;
}

function render(type) {
  let resultsArea = document.getElementById('results');
  resultsArea.innerHTML = newsArticles
    .map((article) => renderArticleCard(article))
    .join('');
  let loadMoreButton = document.createElement('button');
  loadMoreButton.setAttribute('id', 'load-more-btn');
  loadMoreButton.setAttribute('onclick', `loadMoreArticles("${type}")`);
  loadMoreButton.innerText = 'Load More';

  resultsArea.appendChild(loadMoreButton);

  let navElement = document.getElementsByClassName('navbar-nav')[0];
  for (const child of navElement.childNodes) {
    if (child.id == 'article-count') {
      navElement.removeChild(child);
    }
  }
  let articleCount = document.createElement('li');
  articleCount.setAttribute('id', 'article-count');
  articleCount.innerHTML = `Current display: <strong>${newsArticles.length}</strong> articles`;
  navElement.appendChild(articleCount);
}

function loadMoreArticles(type) {
  page++;
  update(type);
}

function topHeadlinesClicked(e) {
  page = 1;
  newsArticles = [];
  let category = e.target.text.toLowerCase();
  topHeadlines.category = category;
  update('headlines');
}

function everythingClicked() {
  page = 1;
  newsArticles = [];
  update('everything');
}

update('headlines');
