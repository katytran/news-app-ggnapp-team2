let page = 1;
// let topHeadlinesUrlEndpoint = 'https://newsapi.org/v2/top-headlines';
let everythingUrlEndpoint = "https://newsapi.org/v2/everything";
let newsArticles = [];
let keyword;
const input = document.querySelector("#input");
const inputBtn = document.querySelector("#inputBtn");
let topHeadlines = {
  url: "https://newsapi.org/v2/top-headlines",
  country: "us",
  category: "general",
};

inputBtn.addEventListener("click", (e) => {
  e.preventDefault();
  keyword = input.value;
  everythingClicked();
});

async function update(type) {
  if (type === "everything") {
    console.log(keyword);
    fullURL = `${everythingUrlEndpoint}?q=${keyword}&page=${page}&apiKey=eea74ab76b1a4d13b0822b68e8f136de`;
  } else {
    console.log("get to else");
    fullURL = `${topHeadlines.url}?category=${topHeadlines.category}&page=${page}&country=${topHeadlines.country}&apiKey=eea74ab76b1a4d13b0822b68e8f136de`;
  }
  let response = await fetch(fullURL);
  let data = await response.json();
  console.log(data);
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
  let resultsArea = document.getElementById("results");
  resultsArea.innerHTML = newsArticles
    .map((article) => renderArticleCard(article))
    .join("");
  let loadMoreButton = document.createElement("button");
  loadMoreButton.setAttribute("id", "load-more-btn");
  loadMoreButton.setAttribute("onclick", `loadMoreArticles("${type}")`);
  loadMoreButton.innerText = "Load More";

  resultsArea.appendChild(loadMoreButton);

  let navElement = document.getElementsByClassName("navbar-nav")[0];
  for (const child of navElement.childNodes) {
    if (child.id == "article-count") {
      navElement.removeChild(child);
    }
  }
  let articleCount = document.createElement("li");
  articleCount.setAttribute("id", "article-count");
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
  update("headlines");
}

function everythingClicked() {
  page = 1;
  newsArticles = [];
  update("everything");
}

update("headlines");
