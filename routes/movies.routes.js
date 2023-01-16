const express = require('express');
const router = require("express").Router();
const Movies = require('../models/Movie.model');

router.get("/movies/create", (req, res, next) => {
    Celebrity.find()
        .then(dbCelebrities => {
        res.render("movies/new-movie", { celebrities: dbCelebrities })
    })
    .catch(err => console.log(err))
});

router.post("/movies/create", async (req, res, next) => {

    const { title, genre, plot, cast } = req.body;

    Movie.create({ title, genre, plot, cast });
    res.redirect(`/movies`)
    .catch(err => console.log(err)
    .then(res.redirect("movies/new-movie")))
});

module.exports = router;