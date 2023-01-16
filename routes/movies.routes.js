const router = require("express").Router();
const Movies = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

router.get('/movies/create', async (req, res, next) => {
    try {
        const celebrities = await Celebrity.find();
        res.render("movies/new-movie", { celebrities });
    } catch(err) {
        // console.log(err);
    }
});

router.post('/movies/create', async (req, res, next) => {
    try {
        const { title, genre, plot, cast} = req.body;
        const newMovie = await Movies.create({ title, genre, plot, cast});
        res.redirect('movies');
    } catch(err) {
        res.render('movies/new-movie');
        // console.log(err);
    }
});

router.get('/movies/movies', async (req, res, next) => {
    try {
        const movies = await Movies.find();
        res.render('movies/movies', { movies });
    } catch(err) {
        // console.log(err);
    }
});

router.get('/movies/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const movie = await Movies.findById(id).populate("cast");
        res.render('movies/movie-details', movie);
    } catch(err) {
        // console.log(err);
    }
})

router.post('/movies/:id/delete', (req, res, next) => {

    Movies.findByIdAndDelete(req.params.id)
        .then(() => res.redirect('/movies/movies')) 
        .catch(error => next(error));
});

router.get('/movies/:id/edit', async (req, res, next) => {
    try {
        const { id } = req.params;
        const celebrities = await Celebrity.find();
        const movie = await Movies.findById(id).populate("cast");
        res.render('movies/edit-movie', { celebrities, movie } );
    } catch(err) {
        // console.log(err);
    }
});

// router.post('/edit/:id', async (req, res, next) => {
//     try {
//     const { id } = req.params;
//     const { title, genre, plot, cast } = req.body;
//     const movieEdit = await Movies.findByIdAndUpdate(id, { title, genre, plot, cast });
//     res.redirect('/movies/movie-details/${id}');
//     } catch (error) {
//         next(error);
//     }
// });

module.exports = router;