const API_KEY = "385535c4ea0b4b9a83c1245196b1389e";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));
function reload() {
  window.location.reload();
}
async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
  const data = await res.json();
  bindData(data.articles);
}

function bindData(articles) {
  const cardContainer = document.getElementById("card-container");
  const newsTemplate = document.getElementById("template-news-card");
  cardContainer.innerHTML = "";
  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = newsTemplate.content.cloneNode(true); // deap cloning in all funtion in the given to the All data
    fillDataInCard(cardClone, article);
    cardContainer.appendChild(cardClone); // all articles make it a clone in line by line
  });
}
function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDescription = cardClone.querySelector("#news-desc");
  newsImg.src = article.urlToImage;
  newsTitle.innerText = article.title;
  newsDescription.innerText = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    // Correct method name
    timeZone: "Asia/Jakarta",
  });
  newsSource.innerHTML = `${article.source.name} • ${date}`;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}
let curSelectedNav = null;
function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
  const query = searchText.value;
  if (!query) return;
  fetchNews(query);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = null;
});
