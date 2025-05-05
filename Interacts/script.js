function fetchAndDisplayMovies() {
    fetch('/movies')
        .then(response => response.json())
        .then(movies => {
            const container = document.getElementById('movies-container');
            if (movies.length === 0) {
                container.innerHTML = '<p>No movies found.</p>';
                return;
            }

            const moviesList = movies.map(movie => 
                `<li>${movie.MovieName} - Rating: ${movie.Rating}</li>`
            ).join('');

            container.innerHTML = `<ul>${moviesList}</ul>`;
        })
        .catch(error => {
            console.error('Error fetching movies:', error);
        });
}

// Call this function when the movie page is loaded
document.addEventListener('DOMContentLoaded', fetchAndDisplayMovies);