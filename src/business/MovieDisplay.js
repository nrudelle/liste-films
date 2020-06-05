import React from 'react';

class MovieDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        error:null,
        isLoaded:false,
        movieGenres: []
    };
    this.imdbApiBaseUrl = this.props.imdbApiBaseUrl;
    this.imdbApiKey = this.props.imdbApiKey;
    this.language = this.props.language;
  }

  render() {
    var description = this.props.description;
    const { error, isLoaded, movieGenres } = this.state;

    return (
        <div class="movie-display-infos">
          <h3>{ this.props.title }</h3>
          <p>
          { movieGenres.map(genre => (
            <span>{genre}&nbsp;&nbsp;</span>
          ))}
          </p>
          <p>{ description }</p>
        </div>
    );
  }

  componentDidMount() {
    fetch(this.imdbApiBaseUrl+"/movie/"+this.props.movieId+"?api_key="+this.imdbApiKey+"&language="+this.language)
        .then(res => res.json())
        .then(
            (result) => {
                var movieGenres = [];

                result.genres.map(genre => {
                  movieGenres.push(genre.name)
                });

                this.setState({
                  isLoaded:true,
                  movieGenres: movieGenres
                });
            }
        )
   }
}

export default MovieDisplay;