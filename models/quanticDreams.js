const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/quanticDreams', {useNewUrlParser:true, useUnifiedTopology:true}).then
(()=> console.log('MongoDB is connected')).catch(error=>console.log('Mongo is NOT connected.' + error))

const usersSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  regdate: {
    type: Date,
    default: Date.now
  }
})

const moviesSchema = mongoose.Schema({

})

const userModel  = mongoose.model('users', usersSchema)

const movieModel = mongoose.model('movies', moviesSchema)

module.exports.userModel = userModel;

module.exports.movieModel = movieModel;
