const mongoose = require('mongoose')

const MoviesSchema = new mongoose.Schema({
    tmdb_id: {
        type: Number,
    },
    tmdb_title: {
        type: String,
    },
    total_votes: {
        type: Number
    }
})

module.exports = mongoose.models.Movies || mongoose.model('Movies',MoviesSchema);