import React from 'react';
import MovieDisplay from './MovieDisplay';
import { Fade } from 'react-slideshow-image';
/*
<MovieDisplay 
            imageSrc="https://i.pinimg.com/originals/98/1e/ea/981eeadec514e686a80e6175bb05151c.jpg" 
            title="Mon film" category="Thriller" description="description"  />
*/

class MovieMidPopularity extends React.Component {
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
      <div className="movie-mid-popularity">
        <Fade>
          {items.map(movie => (
            <div className="each-fade">
              <div className="image-container">
                <img src={this.imdbConf.images.base_url+"w500/"+movie.poster_path} />
              </div>
                <MovieDisplay movieId={movie.id}
                title={movie.title} description={movie.overview} 
                language={this.language} imdbApiBaseUrl={this.imdbApiBaseUrl} imdbApiKey={this.imdbApiKey}  />
            </div>
          ))}
        </Fade>
      </div>
    );
  }

  componentDidMount() {
    var movieInfos = [];

    fetch(this.imdbApiBaseUrl+"/discover/movie?api_key="+this.imdbApiKey+"&language="+this.language+"&sort_by=popularity.desc&include_adult=false&include_video=false&page=1")
      .then(res => res.json())
      .then(
          (result) => {
              console.log(result);

              movieInfos = result.results.slice(10, 20);

              console.log("movieInfos : ");
              console.log(movieInfos);

              fetch(this.imdbApiBaseUrl+"/discover/movie?api_key="+this.imdbApiKey+"&language="+this.language+"&sort_by=popularity.desc&include_adult=false&include_video=false&page=2")
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log(result);

                        result.results.map(movie => {
                          movieInfos.push(movie);
                        });

                        console.log("movieInfos : ");
                        console.log(movieInfos);

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
                )
          },
          (error) => {
            this.setState({
              isLoaded:true,
              error
            });
          }
      )
  }
}

export default MovieMidPopularity;