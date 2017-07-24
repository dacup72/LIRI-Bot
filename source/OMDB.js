function movies() {
  var imdb = require('imdb-api');

  function getId(movieId) {
    imdb.search({
      title: 'Toxic Avenger'
    }, {
      apiKey: '40e9cece'
    }).then(console.log).catch(console.log);
    return(SearchResult.imdbid);
  }
  imdb.getReq({ id: 'movieId', opts: {apiKey: '40e9cece'} }).then(console.log)
}
