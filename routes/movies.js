const express = require('express');
const router = express.Router();
const { forwardAuthenticated,ensureAuthenticated } = require('../controllers/auth');

const movieDB = require('../controllers/moviedb');

const MovieDB = new movieDB({
    token : `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYWZkZTcwYjU3ZTVmNTA4Y2VkZDVlZDNiZGQ0NzBmZSIsInN1YiI6IjVkY2JjN2QwMWQ3OGYyMDAxMjIzYzg4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Md_c22vPMtchPcQQpjMbe67b90HeAirD70V9lyhres0`,
    apikey : `bafde70b57e5f508cedd5ed3bdd470fe`
});

router.get('/searchbytext', ensureAuthenticated, (req,res,next) => {
    if (!req.query.text) res.send({Result:"Error"});
    MovieDB.SearchByText(req.query.text).then(
        data => {
            var movies = JSON.parse(data.getBody());
            res.send(movies);
        }
    ).catch (
        error => {
            res.send({Error:error});
        }
    );
});

router.get('', ensureAuthenticated, (req,res,next) => {
    if (!req.query.mvdb_id) res.send({Error:"error"});
    MovieDB.SearchByID(req.query.mvdb_id).then(
        data => {
            var movie = JSON.parse(data.getBody());
            res.render('movie',{user: req.user, movie:movie, Page: {Title: `${movie.title}`}});
        }
    ).catch (
        error => {
            res.send({Error:"error"});
        }
    );
});

module.exports = router;
