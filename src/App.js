import React from 'react';
import logo from './logo.svg';
import './App.css';
import MovieTopPopularity from './business/MovieTopPopularity';
import MovieMidPopularity from './business/MovieMidPopularity';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        error:null,
        isLoaded:false,
        imdbConf: null
    };
    this.imdbApiBaseUrl = "https://api.themoviedb.org/3";
    this.imdbApiKey = "c89646cb9c2f9f7a6144c074fff0e9c7";
    this.language = "fr-FR";
  }

  render () {
    const { error, isLoaded, imdbConf } = this.state;

    if(error) {
      return <div>Erreur : {error.message}</div>
    } else if (!isLoaded) {
      return <div>Chargement…</div>;
    } else return (
      <div className="App">
        <header className="App-header">
          <h1>Base de films</h1>
        </header>

        <h2>Les 10 films les plus populaires</h2>
        <MovieTopPopularity imdbApiBaseUrl={this.imdbApiBaseUrl} imdbApiKey={this.imdbApiKey} imdbConf={imdbConf} 
        language={this.language} nbMovies={10} />

        <h2>Les 30 films de popularité moyenne</h2>
        <MovieMidPopularity imdbApiBaseUrl={this.imdbApiBaseUrl} imdbApiKey={this.imdbApiKey} imdbConf={imdbConf} 
         language={this.language} nbMovies={10} />
      </div>
    )
  }


  componentDidMount() {
    console.log("allo ?");
    fetch(this.imdbApiBaseUrl+"/configuration?api_key="+this.imdbApiKey)
      .then(res => res.json())
      .then(
          (result) => {
              console.log(result);
              this.setState({
                isLoaded:true,
                imdbConf: result
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

export default App;
