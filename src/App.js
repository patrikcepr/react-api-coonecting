import React, { useState, useEffect, useCallback } from 'react';
import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';

import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        'https://react-dummy-api-46fd5-default-rtdb.europe-west1.firebasedatabase.app/movies.json'
      );

      if (!response.ok) {
        throw new Error('Something got wrong!');
      }

      const data = await response.json();

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          created: data[key].releaseDate,
          opening_crawl: data[key].openingText,
        });
      }

      setData(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  const addMovieHandler = useCallback(async (movie) => {
    try {
      const response = await fetch(
        'https://react-dummy-api-46fd5-default-rtdb.europe-west1.firebasedatabase.app/movies.json',
        {
          method: 'POST',
          body: JSON.stringify(movie),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Something is wrong!');
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [addMovieHandler, fetchMoviesHandler]);

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
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
