const mongoose = require('mongoose')

const UserActivitySchema = new mongoose.Schema({
    user_id: {
        type: String,
    },
    user_movie_id: {
        type: String,
    },
    vote: {
        type: Boolean,
    }
})

module.exports = mongoose.models.UserActivity || mongoose.model('UserActivity',UserActivitySchema);