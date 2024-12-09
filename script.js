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
const HEADLINES_NEWS =
  "https://newsapi.org/v2/top-headlines?country=us&apiKey=";
const GENERAL_NEWS =
  "https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=";
const BUSINESS_NEWS =
  "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=";
const SPORTS_NEWS =
  "https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=";
const ENTERTAINMENT_NEWS =
  "https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=";
const TECHNOLOGY_NEWS =
  "https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=8&apiKey=";
const SEARCH_NEWS = "https://newsapi.org/v2/everything?q=";

window.onload = function () {
  newsType.innerHTML = "<h4>Headlines</h4>";
  fetchHeadlines();
};

generalBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>General news</h4>";
  fetchGeneralNews();
});

businessBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>Business</h4>";
  fetchBusinessNews();
});

sportsBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>Sports</h4>";
  fetchSportsNews();
});

entertainmentBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>Entertainment</h4>";
  fetchEntertainmentNews();
});

technologyBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>Technology</h4>";
  fetchTechnologyNews();
});

searchBtn.addEventListener("click", function () {
  newsType.innerHTML = `<h4>Search: ${newsSearch.value}</h4>`;
  fetchQueryNews(newsSearch.value);
});
newsSearch.addEventListener("keypress", function (event)
{
  if (event.key === 'Enter')
  {
    newsSearch.blur();
    newsType.innerHTML = `<h4>Search: ${newsSearch.value}</h4>`;
    fetchQueryNews(newsSearch.value);
  }
});


const fetchHeadlines = async () => {
  const response = await fetch(HEADLINES_NEWS + API_KEY);
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

const fetchGeneralNews = async () => {
  const response = await fetch(GENERAL_NEWS + API_KEY);
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

const fetchBusinessNews = async () => {
  const response = await fetch(BUSINESS_NEWS + API_KEY);
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

const fetchEntertainmentNews = async () => {
  const response = await fetch(ENTERTAINMENT_NEWS + API_KEY);
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

const fetchSportsNews = async () => {
  const response = await fetch(SPORTS_NEWS + API_KEY);
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

const fetchTechnologyNews = async () => {
  const response = await fetch(TECHNOLOGY_NEWS + API_KEY);
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
const fetchQueryNews = async (search_value) =>
{
    const response = await fetch(SEARCH_NEWS +search_value+"&apiKey="+API_KEY);
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
  newsDataArr.forEach((news) =>
  {
    if (news.title == "[Removed]" || news.description == "[Removed]")
      return;
    let date = news.publishedAt.split("T");
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
    dateHeading.innerHTML = date[0];

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
  });
}
