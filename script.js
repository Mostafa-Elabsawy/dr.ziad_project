//API KEYS
//c4af72f3416040cd99892cb6707aba8a
//d489e079b88c4e6990a32e301e091e94
//63937db6b90f498c8caf64fc2443f7c2
const API_KEY = "63937db6b90f498c8caf64fc2443f7c2";

//elements in the html
const error = document.getElementById("error");
const error_message = document.getElementById("error_message");
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
  newsType.innerHTML = "<h4>Headlines Trends</h4>";
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
const Fetch_API = async (category) => {
  try {
    newsType.focus();
    // let sorted = ["relevancy", "popularity", "publishedAt"];
    // let orderOfSorting = `&sortby=${sorted[1]}`;
    const response = await fetch(category);
    let newsDataArr = [];

    if (response.ok) {
      newsType.style.display = "block";
      error.style.display = "none";
      const myJson = await response.json();
      newsDataArr = myJson.articles;
      if (newsDataArr.length == 0) {
        newsdetails.innerHTML = "";
        error.style.display = "flex";
        newsType.style.display = "none"
        error_message.innerHTML = `Invalid Search Word : "${newsSearch.value}"`;
        return;
      }
      console.log(category);
    } else {
      console.log(response.status, response.statusText);
      error.style.display = "flex";
      newsType.style.display = "none";
      error_message.innerHTML = "No Data Found";
    }

    displayNews(newsDataArr);
  } catch (err) {
    console.error("Error fetching data:", err);
    newsType.style.display = "none";
    error.style.display = "flex";
    error_message.innerHTML = "Network Error";
  }
};

//prepare ,filter and display data
async function displayNews(newsDataArr) {
  newsdetails.innerHTML = ""; // Clear previous content
  for (const news of newsDataArr) {
    if (
      news.title == "[Removed]" ||
      news.description == "[Removed]" ||
      news.urlToImage == null
    )
      continue; // Skip invalid data

    let date = news.publishedAt.split("T")[0];

    // Create the news card container
    const newsCard = document.createElement("div");
    newsCard.classList.add("news-card");
    newsCard.innerHTML = `
      <img src="${news.urlToImage || "./download.png"}" alt="" />
      <div class="card-content">
        <h5>${news.title}</h5>
        <p>${date}</p>
        <p>${news.description || ""}</p>
        <a href="${news.url}" target="_blank" class="">Read more</a>
      </div>
    `;

    // Add the news card to the news details section
    newsdetails.appendChild(newsCard);

    // Add the animation class after the card is appended
    await sleep(400); // Delay 500ms before adding the next card
    newsCard.classList.add("slide-in"); // Add the animation dynamically
        newsCard.addEventListener("animationend", () => {
          newsCard.classList.remove("slide-in");
          newsCard.style.opacity = "1";
        });
  }
}const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};