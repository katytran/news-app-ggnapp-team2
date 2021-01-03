const key = "eea74ab76b1a4d13b0822b68e8f136de";
let newsArticles = [];

async function update() {
  // var url =
  //   "http://newsapi.org/v2/top-headlines?" +
  //   "country=us&" +
  //   "apiKey=eea74ab76b1a4d13b0822b68e8f136de";
  // var req = new Request(url);
  // fetch(req).then(function (response) {
  //   console.log(response.json());
  // });
  var url = `http://newsapi.org/v2/top-headlines?country=us&apiKey=${key}`;
  let response = await fetch(url);
  let data = await response.json();
  console.log(data);
  newsArticles = data.articles;
  render();
}

function renderArticleCard(article) {
  let timeAgo = moment(article.publishedAt).fromNow();
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
  let resultsArea = document.getElementById("results");
  resultsArea.innerHTML = newsArticles
    .map((article) => renderArticleCard(article))
    .join("");
}

function topHeadlinesClicked() {
  console.log("Top headlines");
  urlEndpoint =
    "https://newsapi.org/v2/top-headlines?country=us&apiKey=1e34783b3b774ec5bdea26967ca444f0";
  update();
}

function everythingClicked() {
  console.log("Everything");

  urlEndpoint =
    "https://newsapi.org/v2/everything?q=bitcoin&apiKey=1e34783b3b774ec5bdea26967ca444f0";
  update();
}

update();
