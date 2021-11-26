import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchMoviesHandler() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://swapi.dev/api/films');

      if (!response.ok) {
        throw new Error('Something got wrong!');
      }

      const data = await response.json();

      setData(data.results);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }

  let content = <h2>Data is loading....</h2>;

  if (!isLoading && data.length > 0) {
    content = <MoviesList movies={data} />;
  }

  if (!isLoading && data.length === 0 && !error) {
    content = <h2>No data received</h2>;
  }

  if (error) {
    content = <h2>{error}</h2>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
