import React from 'react';
import MovieDisplay from './MovieDisplay';

/*
<MovieDisplay 
            imageSrc="https://i.pinimg.com/originals/98/1e/ea/981eeadec514e686a80e6175bb05151c.jpg" 
            title="Mon film" category="Thriller" description="description"  />
*/

class MovieTopPopularity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        error:null,
        isLoaded:false,
        items: []
    };
    this.imdbApiBaseUrl = this.props.imdbApiBaseUrl;
    this.imdbApiKey = this.props.imdbApiKey;
    this.language = this.props.language;
    this.imdbConf = this.props.imdbConf;
    this.nbMovies = this.props.nbMovies;

  }

  render() {
    const { error, isLoaded, items } = this.state;

    var description = this.props.description;

    if(error) {
      return <div>Erreur : {error.message}</div>
    } else if (!isLoaded) {
      return <div>Chargement…</div>;
    } else return (
      <div class="movie-top-ten">
        {items.map(movie => (
            <div class="movie-display">
              <img width="300" src={ this.imdbConf.images.base_url+"w500/"+movie.poster_path } alt="movie image" />
              <MovieDisplay movieId={movie.id}
              title={movie.title} category="Thriller" description={movie.overview} 
              language={this.language} imdbApiBaseUrl={this.imdbApiBaseUrl} imdbApiKey={this.imdbApiKey}  />
            </div>
          ))};
         <div class="break"></div>
      </div>
    );
  }

  componentDidMount() {
    fetch(this.imdbApiBaseUrl+"/discover/movie?api_key="+this.imdbApiKey+"&language="+this.language+"&sort_by=popularity.desc&include_adult=false&include_video=false&page=1")
      .then(res => res.json())
      .then(
          (result) => {
              var movieInfos = result.results.slice(0, this.nbMovies);

              this.setState({
                isLoaded:true,
                items: movieInfos
              });
          },
          (error) => {
            this.setState({
              isLoaded:true,
              error
            });
          }
      );
  }
}

export default MovieTopPopularity;