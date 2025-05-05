const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose(); 

const app = express();
const port = 3000;

// Adjust the database file to your 'showStorage.db'
const db = new sqlite3.Database('showStorage.db'); 

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'userInterface.html'));
});

// Endpoint to fetch movies
app.get('/movies', (req, res) => {
  const query = "SELECT * FROM Movies";

  db.all(query, [], (err, rows) => {
      if (err) {
          console.error('Error executing movies query:', err);
          res.status(500).json({ error: 'Internal Server Error' });
      } else if (rows) {
          res.json(rows);
      } else {
          res.status(404).json({ error: 'Movies not found' });
      }
  });
});

// Endpoint to fetch manga
app.get('/manga', (req, res) => {
  const query = "SELECT * FROM Mangas";

  db.all(query, [], (err, rows) => {
      if (err) {
          console.error('Error executing manga query:', err);
          res.status(500).json({ error: 'Internal Server Error' });
      } else if (rows) {
          res.json(rows);
      } else {
          res.status(404).json({ error: 'Manga not found' });
      }
  });
});

app.get('/randomUnseenMovie', (req, res) => {
    db.get("SELECT * FROM UnseenMovies ORDER BY RANDOM() LIMIT 1", [], (err, row) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.json(row);
    });
});

app.get('/randomUnseenManga', (req, res) => {
    db.get("SELECT * FROM UnseenMangas ORDER BY RANDOM() LIMIT 1", [], (err, row) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.json(row);
    });
});


app.post('/addMovie', (req, res) => {
    const { MovieName, Rating } = req.body;
    const query = "INSERT INTO Movies (MovieName, Rating) VALUES (?, ?)";

    db.run(query, [MovieName, Rating], function(err) {
        if (err) {
            res.status(500).json({ error: 'Error adding movie' });
            return;
        }
        res.json({ success: 'New movie added', id: this.lastID });
    });
});


// Function to fetch and display unseen movies
app.get('/getUnseenMovies', (req, res) => {
    const query = 'SELECT MovieName FROM UnseenMovies';
  
    db.all(query, (err, rows) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(rows);
      }
    });
  });

app.get('/getUnseenMangas', (req, res) => {
    const query = 'SELECT MangaName FROM UnseenMangas';
  
    db.all(query, (err, rows) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(rows);
      }
    });
  });


// Listen on the configured port
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

  
