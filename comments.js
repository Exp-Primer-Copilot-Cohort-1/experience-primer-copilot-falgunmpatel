// Create web server
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }));

// Set the path of the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Set the path of the views directory
app.set('views', path.join(__dirname, 'views'));

// Set the view engine
app.set('view engine', 'ejs');

// GET request to the root URL
app.get('/', (req, res) => {
  res.render('index');
});

// POST request to the root URL
app.post('/', (req, res) => {
  const comment = req.body.comment;
  fs.appendFile('comments.txt', comment + '\n', (err) => {
    if (err) {
      console.log(err);
    }
  });
  res.redirect('/');
});

// GET request to the comments URL
app.get('/comments', (req, res) => {
  fs.readFile('comments.txt', 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
    }
    const comments = data.split('\n');
    res.render('comments', { comments });
  });
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

