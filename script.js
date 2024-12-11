//API KEYS
//c4af72f3416040cd99892cb6707aba8a
//d489e079b88c4e6990a32e301e091e94
//63937db6b90f498c8caf64fc2443f7c2
const API_KEY = "63937db6b90f498c8caf64fc2443f7c2 ";

//elements in the html
const generalBtn = document.getElementById("general");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sports"); 
const entertainmentBtn = document.getElementById("entertainment");
const technologyBtn = document.getElementById("technology");
const searchBtn = document.getElementById("searchButton");
const newsSearch = document.getElementById("newsSearch");
const newsType = document.getElementById("newsType");
const newsdetails = document.getElementById("newsdetails");

//API LINKS AND CATOGRYES
const HEADLINES_NEWS = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;
const GENERAL_NEWS = `https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=${API_KEY}`;
const BUSINESS_NEWS = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${API_KEY}`;
const SPORTS_NEWS = `https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=${API_KEY}`;
const ENTERTAINMENT_NEWS = `https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=${API_KEY}`;
const TECHNOLOGY_NEWS = `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${API_KEY}`;
const SEARCH_NEWS = `https://newsapi.org/v2/everything?q=`;

//EVENTS ON THE ELEMENTS  
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

//search events press('enter') and click on button
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

//Fetching API'S LINK
const Fetch_API = async (catogry) => {
  newsType.scrollIntoView({ behavior: "smooth" });
  //let sorted = ["relevancy", "popularity", "publishedAt"];
  //let orderofsorting = `&sortby=${sorted[1]}`;
  const response = await fetch(catogry);
  let newsDataArr = [];
  if (response.ok) {
    const myJson = await response.json();
    newsDataArr = myJson.articles;
    console.log(catogry);
  } else {
    console.log(response.status, response.statusText);
    newsdetails.innerHTML = "<h5>No data found.</h5>";
    return;
  }
  displayNews(newsDataArr);
};

//prepare ,filter and display data
function displayNews(newsDataArr) {
  newsdetails.innerHTML = "";
  newsDataArr.forEach((news) => {
    if (
      news.title == "[Removed]" ||
      news.description == "[Removed]" ||
      news.urlToImage == null
    )
      return;
    let date = news.publishedAt.split("T")[0];
    newsdetails.innerHTML += `
    <div class="news-card">
      <img src="${news.urlToImage || "./download.png"}" alt="" />
      <div class="card-content">
        <h5>${news.title}</h5>
        <p>${date}</p>
        <p>${news.description || ""}</p>
        <a href="${news.url}" target="${"_blank"}" class="">Read more</a>
      </div>
    </div>
      `;
  });
}
