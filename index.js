const newsApiKey = "a3e73d42beef41efb65be754f85d4125";
const defaultSource = "bbc-news";

const newsUrl = `https://newsapi.org/v2/top-headlines?apiKey=${newsApiKey}`;
const sourcesUrl = `https://newsapi.org/v2/sources?apiKey=${newsApiKey}`;

const $main = document.querySelector("main");
const $sourceSelector = document.querySelector("select");

window.addEventListener("load", async () => {
  updateNews();
  await updateSources();

  $sourceSelector.value = defaultSource;

  $sourceSelector.addEventListener("change", e => updateNews(e.target.value));
});

async function updateSources() {
  const response = await fetch(sourcesUrl);
  const json = await response.json();

  $sourceSelector.innerHTML = json.sources.map(createSource).join("\n");
}

const createSource = ({ name, id }) => `<option value="${id}">${name}</option>`;

async function updateNews(source = defaultSource) {
  const response = await fetch(`${newsUrl}&sources=${source}`);
  const json = await response.json();

  $main.innerHTML = json.articles.map(createArticle).join("\n");
}

const createArticle = ({ description, title, urlToImage, url }) => `
<article>
    <a href="${url}" target="_blank">
        <h2>${title}</h2>
        <img src="${urlToImage}" />
        <p>${description}</p>
    </a>
</article>
`;
