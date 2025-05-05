function showUnseenMovies() {
    fetch('/getUnseenMovies')
        .then(response => response.json())
        .then(data => {
            const unseenMoviesList = document.getElementById('unseenMoviesList');
            unseenMoviesList.innerHTML = ''; // Clear previous list
            data.forEach(movie => {
                const listItem = document.createElement('li');
                listItem.textContent = movie.MovieName;
                unseenMoviesList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error:', error));
}
document.addEventListener('DOMContentLoaded', showUnseenMovies);