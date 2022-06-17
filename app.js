const APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';

const IMGPATH = 'https://image.tmdb.org/t/p/w1280';

const SEARCHMOVIE = 'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';

// parent div where data will be pushed
const insertData = document.querySelector('.insert-data');
const form = document.getElementById('form');
const search = document.getElementById('search');

async function getMovies(url){
    const resp = await fetch(url);
    const respData = await resp.json();
    
    // console.log(respData);
    showMovies(respData.results);
   
}
getMovies(APIURL);

function showMovies(movies){
    // clear insertdata
    insertData.innerHTML = '';

    movies.forEach((movie) => {

        const {poster_path, title, vote_average, overview} = movie;

        const movieEl = document.createElement('div');
        movieEl.classList.add('col-md-3');

        movieEl.innerHTML = `
        <div class="movie">
            <img src="${IMGPATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                ${overview}
            </div>
        </div>
        `

        insertData.appendChild(movieEl);
    });
}

function getClassByRate(vote){
    if(vote >= 8){
        return "white";
    }else if(vote >= 5) {
        return "orange";
    }else {
        return "red";
    }
}


// Search Query
form.addEventListener('submit', (e) => {

    const searchTerm = search.value;

    if(searchTerm){
        getMovies(SEARCHMOVIE + searchTerm);

        search.value = '';
    }else {

    }

    e.preventDefault();
})

