const apikey = '5439f1cc3fd8484182dd9672c3da4105'


const blogContainer = document.getElementById('blog-container')

const searchField = document.getElementById('search-input')
const searchButton = document.getElementById('search-button')

async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apikey}`
        const response = await fetch(apiUrl)
        const data = await response.json()
        return data.articles
    } catch (error) {
        console.log(error);
        return []
    }
}

searchButton.addEventListener("click", async () => {
    const searchValue = searchField.value.trim()
    if (searchValue !== '') {
        try {
            const articles = await fetchNewsQuery(searchValue)
            displayBlogs(articles)
        } catch (error) {
            console.log('Error Fetch news by search', error);
        }
    }
})

async function fetchNewsQuery(searchValue) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${searchValue}&pageSize=10&apikey=${apikey}`
        const response = await fetch(apiUrl)
        const data = await response.json()
        return data.articles
    } catch (error) {
        console.log(error);
        return []
    }
}

function displayBlogs(articles) {
    blogContainer.innerHTML = ''
    articles.forEach((article) => {
        const blogCard = document.createElement('div')
        blogCard.classList.add('blog-card')

        const img = document.createElement('img')
        img.src = article.urlToImage
        img.alt = article.title

        const title = document.createElement('h2');
        const truncatedTitle = article.title.length > 30 ? article.title.slice(0, 30) + "...." : article.title;
        title.textContent = truncatedTitle;

        const description = document.createElement('p');
        const truncateDescription = article.description.length > 120 ? article.description.slice(0, 120) + "...." : article.description;
        description.textContent = truncateDescription;


        blogCard.appendChild(img)
        blogCard.appendChild(title)
        blogCard.appendChild(description)
        blogCard.addEventListener('click', () => {
            window.open(article.url, '_blank')
        })
        blogContainer.appendChild(blogCard)
    })
}

(async () => {
    try {
        const articles = await fetchRandomNews()
        displayBlogs(articles)
    } catch (error) {
        console.log(error, 'Error ');
    }
})()