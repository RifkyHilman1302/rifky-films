import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TV = () => {
  const [tvShows, setTvShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNjYzNDA2NDNlZDgyZmI4YzhjMjZhMGFmZTRhMDc1NCIsInN1YiI6IjY1N2M1YTgzMTc2YTk0MTczMWMyNTNlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GwZHp92NEE4aaEmtoIE7P21UUblBMVkZKJjcUCc1_ME'
        }
      };

      try {
        const response = await fetch('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc', options);
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          setTvShows(data.results);
        } else {
          console.error('No TV shows available');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchGenres = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNjYzNDA2NDNlZDgyZmI4YzhjMjZhMGFmZTRhMDc1NCIsInN1YiI6IjY1N2M1YTgzMTc2YTk0MTczMWMyNTNlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GwZHp92NEE4aaEmtoIE7P21UUblBMVkZKJjcUCc1_ME'
        }
      };

      try {
        const response = await fetch('https://api.themoviedb.org/3/genre/tv/list?language=en', options);
        const data = await response.json();
        if (data.genres && data.genres.length > 0) {
          setGenres(data.genres);
        } else {
          console.error('No genres available');
        }
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchData();
    fetchGenres();
  }, []);

  useEffect(() => {
    const results = tvShows.filter(show =>
      show.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, tvShows]);

  useEffect(() => {
    if (selectedGenre) {
      fetchTvShowsByGenre(selectedGenre);
    }
  }, [selectedGenre]);

  const fetchTvShowsByGenre = async (genreId, page = 1) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNjYzNDA2NDNlZDgyZmI4YzhjMjZhMGFmZTRhMDc1NCIsInN1YiI6IjY1N2M1YTgzMTc2YTk0MTczMWMyNTNlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GwZHp92NEE4aaEmtoIE7P21UUblBMVkZKJjcUCc1_ME'
      }
    };

    try {
      const response = await fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&with_genres=${genreId}&sort_by=popularity.desc`, options);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setSearchResults(data.results);
      } else {
        console.error('No TV shows available for this genre');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleGenreClick = genreId => {
    setSelectedGenre(genreId);
  };

  const handleGenreChange = event => {
    setSelectedGenre(event.target.value);
  };

  const handlePageChange = page => {
    setCurrentPage(page);
    fetchTvShowsByGenre(selectedGenre, page);
  };


  const totalPages = Math.ceil(searchResults.length / perPage);
  const paginatedResults = searchResults.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div className='tv-movie-container'>
      <div className="search-tv">
        <div className="genre-buttons">
          {genres.map(genre => (
            <button key={genre.id} onClick={() => handleGenreClick(genre.id)}>{genre.name}</button>
          ))}
        </div>
        <select value={selectedGenre} onChange={handleGenreChange} className='select-option-tv'>
          <option value="">All Genres</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search TV shows"
          value={searchTerm}
          onChange={handleSearchChange}
        />   
      </div>

      <div className="tv-show-list">
        {paginatedResults.map(show => (
          <Link to={`/tvmovie/${show.id}`} key={show.id}> {/* Wrap each card with Link */}
            <div className="tv-card">
              <img className='tv-card-image' src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`} alt={show.name} />
              <div className="tv-card-overlay">
                <div className="tv-card__title">{show.name}</div>
                <div className="tv-card__runtime">
                  {show ? show.first_air_date : ""}
                  <span className="tv-card__rating">{show ? show.vote_average : ""}<i className="fas fa-star" /></span>
                </div>
                <div className="tv-card__description">{show ? show.overview.slice(0, 118) + "..." : ""}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="tv-pagination">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
          <button key={page} onClick={() => handlePageChange(page)}>{page}</button>
        ))}
      </div>
    </div>
  );
};

export default TV;
