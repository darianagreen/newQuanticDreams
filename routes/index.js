const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../controllers/auth');
const movieDB = require('../controllers/moviedb');
const MovieDB = new movieDB({
  token : `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYWZkZTcwYjU3ZTVmNTA4Y2VkZDVlZDNiZGQ0NzBmZSIsInN1YiI6IjVkY2JjN2QwMWQ3OGYyMDAxMjIzYzg4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Md_c22vPMtchPcQQpjMbe67b90HeAirD70V9lyhres0`,
  apikey : `bafde70b57e5f508cedd5ed3bdd470fe`
});

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('index',{Page:{Title: "Main Page"}}));

// Dashboard
router.get('/main', ensureAuthenticated, (req, res) => {
  res.render('main', {user: req.user, Page: {Title: `${req.user.username}::Personal page`}, movies : {Favourites: null, FromDB : null}});
});

router.post('/main', ensureAuthenticated, (req, res) => {
  if (!req.body.text || req.body.text=='') {
    res.redirect('/main');
  }
  MovieDB.SearchByText(req.body.text).then(
    data => {
      var moviesFromDB = JSON.parse(data.getBody()).results;
      console.log(`length: ${moviesFromDB.length}`);
      res.render('main', {user: req.user, Page: {Title: `${req.user.username}::Personal page`}, movies : {Favourites: null, FromDB : moviesFromDB}});
    }
  ).catch(
    error => {
      res.render('main', {user: req.user, Page: {Title: `${req.user.username}::Personal page`}, movies : {Favourites: null, FromDB : null}});    
    }
  )
});

module.exports = router;
