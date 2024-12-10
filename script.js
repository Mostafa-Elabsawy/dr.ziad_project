const API_KEY = "63937db6b90f498c8caf64fc2443f7c2 ";
const generalBtn = document.getElementById("general");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sports"); // corrected ID
const entertainmentBtn = document.getElementById("entertainment");
const technologyBtn = document.getElementById("technology");
const searchBtn = document.getElementById("searchButton");
const newsSearch = document.getElementById("newsSearch");
const newsType = document.getElementById("newsType");
const newsdetails = document.getElementById("newsdetails");

const HEADLINES_NEWS =`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;
const GENERAL_NEWS =`https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=${API_KEY}`;
const BUSINESS_NEWS =`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${API_KEY}`;
const SPORTS_NEWS =`https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=${API_KEY}`;
const ENTERTAINMENT_NEWS =`https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=${API_KEY}`;
const TECHNOLOGY_NEWS =`https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${API_KEY}`;
const SEARCH_NEWS = `https://newsapi.org/v2/everything?q=`;

window.onload = function () {
  newsType.innerHTML = "<h4>Headlines</h4>";
  Fetch_API(HEADLINES_NEWS);
};

generalBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>General news</h4>";
  Fetch_API(GENERAL_NEWS);
});

businessBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>Business</h4>";
  Fetch_API(BUSINESS_NEWS);
});

sportsBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>Sports</h4>";
  Fetch_API(SPORTS_NEWS);
});

entertainmentBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>Entertainment</h4>";
  Fetch_API(ENTERTAINMENT_NEWS);
});

technologyBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>Technology</h4>";
  Fetch_API(TECHNOLOGY_NEWS);
});

searchBtn.addEventListener("click", function () {
  let QUERY = newsSearch.value;
  newsType.innerHTML = `<h4>Search: ${newsSearch.value}</h4>`;
  Fetch_API(`${SEARCH_NEWS}${QUERY}&apiKey=${API_KEY}`);
});
newsSearch.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    newsSearch.blur();
    let QUERY = newsSearch.value;
    newsType.innerHTML = `<h4>Search: ${newsSearch.value}</h4>`;
    Fetch_API(`${SEARCH_NEWS}${QUERY}&apiKey=${API_KEY}`);
  }
});
const Fetch_API = async (catogry) => {
  const response = await fetch(catogry);
  let newsDataArr = [];
  if (response.ok) {
    const myJson = await response.json();
    newsDataArr = myJson.articles;
  } else {
    console.log(response.status, response.statusText);
    newsdetails.innerHTML = "<h5>No data found.</h5>";
    return;
  }
  displayNews(newsDataArr);
};

function displayNews(newsDataArr) {
  newsdetails.innerHTML = "";
  newsDataArr.forEach((news) => {
    if (news.title == "[Removed]" || news.description == "[Removed]") return;
    let date = news.publishedAt.split("T")[0];
    let image = document.createElement("img");
    image.src = news.urlToImage || "./download.png";
    image.alt = "./download.png";

    let containerOfArticle = document.createElement("div");
    containerOfArticle.className = "news-card";

    let cardContent = document.createElement("div");
    cardContent.className = "card-content";

    let newsHeading = document.createElement("h5");
    newsHeading.innerHTML = news.title;

    let dateHeading = document.createElement("p");
    dateHeading.innerHTML = date;

    let description = document.createElement("p");
    description.innerHTML = news.description;

    let link = document.createElement("a");
    link.href = news.url;
    link.target = "_blank";
    link.innerHTML = "Read more";
    link.className = "";
    cardContent.appendChild(newsHeading);
    cardContent.appendChild(dateHeading);
    cardContent.appendChild(description);
    cardContent.appendChild(link);

    containerOfArticle.appendChild(image);
    containerOfArticle.appendChild(cardContent);

    newsdetails.appendChild(containerOfArticle);
    newsdetails.innerHTML += `
    <div class="news-card">
      <img src="${news.urlToImage}" alt="${"./download.png"}" />
      <div class="card-content">
        <h5>${news.title}</h5>
        <p>${date}</p>
        <p>${news.description}</p>
        <a href="${news.url}" target="${"_blank"}" class="">Read more</a>
      </div>
    </div>
      `;
  });
}
