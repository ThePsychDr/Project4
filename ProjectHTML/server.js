// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/register.html');
});

app.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  
  fs.writeFile(`users/${username}.json`, JSON.stringify({ username, password }), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred while registering.');
    } else {
      res.send('Registration successful!');
    }
  });
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

// server.js
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    fs.readFile(`users/${username}.json`, (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('An error occurred while logging in.');
      } else {
        const userData = JSON.parse(data);
        if (password === userData.password) {
          res.send('Login successful!');
        } else {
          res.status(401).send('Incorrect password.');
        }
      }
    });
  });

  app.get('/share', (req, res) => {
    res.sendFile(__dirname + '/share.html');
  });
  
  app.post('/share', (req, res) => {
    const video = req.body.video;
  
    fs.appendFile('videos.txt', video + '\n', (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('An error occurred while sharing the video.');
      } else {
        res.send('Video shared successfully!');
      }
    });
  });
  app.get('/dashboard', (req, res) => {
    res.sendFile(__dirname + '/dashboard.html');
  });
  
  app.get('/videos', (req, res) => {
    fs.readFile('videos.txt', 'utf-8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('An error occurred while fetching videos.');
      } else {
        const videos = data.trim().split('\n');
        res.json(videos);
      }
    });
  });
  
  app.listen(3000, () => console.log('Server is running on port 3000'));
  
  
  app.listen(3000, () => console.log('Server is running on port 3000'));
  