function fetchAndDisplayManga() {
    fetch('/manga')
        .then(response => response.json())
        .then(mangas => {
            const container = document.getElementById('manga-container');
            if (mangas.length === 0) {
                container.innerHTML = '<p>No manga found.</p>';
                return;
            }

            const mangaList = mangas.map(manga => 
                `<li>${manga.MangaName} - Rating: ${manga.Rating}</li>`
            ).join('');

            container.innerHTML = `<ul>${mangaList}</ul>`;
        })
        .catch(error => {
            console.error('Error fetching manga:', error);
        });
}

// If you have a separate manga page, call this function when it's loaded
document.addEventListener('DOMContentLoaded', fetchAndDisplayManga);
