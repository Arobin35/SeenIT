function pickRandomUnseenMovie() {
    fetch('/randomUnseenMovie')
        .then(response => response.json())
        .then(movie => {
            const container = document.getElementById('random-movie-container');
            if (movie) {
                container.innerHTML = `<p>Random Unseen Movie: ${movie.MovieName}</p>`;
            } else {
                container.innerHTML = '<p>No unseen movies available.</p>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            container.innerHTML = '<p>Error fetching a random movie.</p>';
        });
}


function pickRandomUnseenManga() {
    fetch('/randomUnseenManga')
        .then(response => response.json())
        .then(manga => {
            const container = document.getElementById('random-manga-container');
            if (manga) {
                container.innerHTML = `<p>Random Unseen Manga: ${manga.MangaName}</p>`;
            } else {
                container.innerHTML = '<p>No unseen mangas available.</p>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            container.innerHTML = '<p>Error fetching a random manga.</p>';
        });
}

