import React, { useEffect, useState } from 'react'
import Search from './components/search.jsx'
import Spinner from './components/spinner.jsx'
import MoiveCard from './components/MoiveCard.jsx';
import { useDebounce } from 'react-use'; // implement by running `npm i react-use` in the terminal
import { updateSearchCount } from './appwrite.js';

const API_BASE_URL = 'https://api.themoviedb.org/3'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}
const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Debounce the search term so that we don't make a request for every key stroke
  // This will only update the debouncedSearchTerm state after the user has stopped typing for 500ms
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const endpoint = query 
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      
      const response = await fetch(endpoint, API_OPTIONS);
    
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();

      if(data.response === 'false') {
        setErrorMessage(data.error || 'Failed to fetch movies');
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);
      
      if(query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]); // This will run the fetchMovies function whenever the searchTerm changes

  return (
    <main>
        <div className='pattern' />

        <div className='wrapper'>
          <header>
            <img src="./hero.png" alt="Hero Banner" />
            <h1>
              Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hastle
            </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>

        <section className='all-movies'>
          <h2 className='mt-[20px]'>All Movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MoiveCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App