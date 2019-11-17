var request = require('then-request');

module.exports = class MovieDBAPI{
    constructor(options) {
      const {token,apikey} = options;
      this.token = token;
      this.apikey = apikey;
    }
    SearchByText(text) {
        return request('GET', `https://api.themoviedb.org/4/search/movie?&language=en-US&query=${text}`, {headers:{Authorization:`Bearer ${this.token}`}});
    }
    SearchByID(id) {
        return request('GET', `https://api.themoviedb.org/3/movie/${id}?api_key=${this.apikey}`);
    }
}