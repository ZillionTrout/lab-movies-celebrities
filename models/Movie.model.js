const mongoose = require('mongoose');
const Movie = require('./Movie.model');
const Schema = mongoose.Schema;

const movieSchema = new Schema (
    {
        title: { 
            type: String,
            required: true
        },
        genre: {
            type: String,
            required: true
        },
        plot: {
            type: String
        }
    });

    const Movies = mongoose.model('Movie', movieSchema);
    module.exports = Movie;