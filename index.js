//import reddit from './redditapi';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');


searchForm.addEventListener('submit', e => {
    //Get search term
    const searchTerm = searchInput.value;

    //Get sort
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;

    //Get limit
    const searchLimit = document.getElementById('limit').value;

    //Check input
    if(searchTerm === '') {
        //show message
        showMessage('Please add a search term', 'alert-danger')
    }

    //clear input
    searchInput.value='';

    //search Reddit
    let search = function(searchTerm, searchLimit, sortBy) {
    return fetch(`http://www.reddit.com/search.json?q=${searchTerm}&limit=${searchLimit}&sort=${sortBy}`)
    .then(res => res.json())
    .then(data => data.data.children.map(data => data.data))
    .catch(err => console.log(err));
    }
    search(searchTerm, searchLimit, sortBy)
    .then(results => {
        console.log(results);
        //get output in UI
        let output = '<div class="card-columns">';
        //Loop through post
        results.forEach(post => {
          //check for image
          let image = post.preview ? post.preview.images[0].source.url: 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg';
          output += `
          <div class="card">
          <img src="${image}" class="card-img-top" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${post.title}</h5>
                <p class="card-text">${truncateText(post.selftext, 100)}</p>
                <a href="${post.url}" target="_blank" class="btn btn-primary">Read More</a>
                <hr>
                <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
                <span class="badge badge-dark">Score: ${post.score}</span>
            </div>
            </div>
          `;  
        });
        output += '</div>'
        document.getElementById('results').innerHTML = output;
    });
    
    e.preventDefault();
})

//Show Message
function showMessage(message, className) {

    const div = document.createElement('div');

    div.className = `alert ${className}`;
    //Add Text
    div.appendChild(document.createTextNode(message));
    //Get Parent
    const searchContainer = document.getElementById('search-container');
    //Get Search
    const search = document.getElementById('search');

    //Insert Message
    searchContainer.insertBefore(div,search);

    //setTime out
    setTimeout(()=> document.querySelector('.alert').remove(), 3000)
}

//Truncate Text
function truncateText(text, limit) {
    const shortened = text.indexOf('', limit)
    if(shortened == -1) return text;
    return text.substring(0, shortened);
}

