function showUnseenMangas() {
    fetch('/getUnseenMangas')
        .then(response => response.json())
        .then(data => {
            const unseenMangasList = document.getElementById('unseenMangasList');
            unseenMangasList.innerHTML = ''; // Clear previous list
            data.forEach(manga => {
                const listItem = document.createElement('li');
                listItem.textContent = manga.MangaName;
                unseenMangasList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error:', error));
}
document.addEventListener('DOMContentLoaded', showUnseenMangas);