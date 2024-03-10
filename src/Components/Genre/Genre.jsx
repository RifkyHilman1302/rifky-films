import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 


const Genre = () => {
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchGenres = async () => {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNjYzNDA2NDNlZDgyZmI4YzhjMjZhMGFmZTRhMDc1NCIsInN1YiI6IjY1N2M1YTgzMTc2YTk0MTczMWMyNTNlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GwZHp92NEE4aaEmtoIE7P21UUblBMVkZKJjcUCc1_ME'
                }
            };

            try {
                const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options);
                const data = await response.json();
                setGenres(data.genres);
            } catch (error) {
                console.error(error);
            }
        };

        fetchGenres();
    }, []);

    useEffect(() => {
        const fetchMovies = async () => {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNjYzNDA2NDNlZDgyZmI4YzhjMjZhMGFmZTRhMDc1NCIsInN1YiI6IjY1N2M1YTgzMTc2YTk0MTczMWMyNTNlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GwZHp92NEE4aaEmtoIE7P21UUblBMVkZKJjcUCc1_ME'
                }
            };

            try {
                let url = '';
                if (searchQuery && selectedGenre !== '') {
                    url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&language=en-US&page=${currentPage}&with_genres=${selectedGenre}`;
                } else if (searchQuery === '' && selectedGenre === '') {
                    url = `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${currentPage}`;
                } else if (searchQuery === '') {
                    url = `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${currentPage}&with_genres=${selectedGenre}`;
                } else {
                    url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&language=en-US&page=${currentPage}`;
                }

                const response = await fetch(url, options);
                const data = await response.json();

                setTotalPages(data.total_pages); // Update total pages

                if (currentPage === 15) {
                    setMovies(data.results.slice(0, 50)); // Set first 40 movies
                } else {
                    setMovies(data.results);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovies();
    }, [searchQuery, selectedGenre, currentPage]);


    const handleGenreChange = (event) => {
        setSelectedGenre(event.target.value);
        setCurrentPage(1); // Reset current page to 1 when changing genre
    };

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1); // Reset current page to 1 when changing search query
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        setCurrentPage(1); // Reset current page to 1 when performing a new search
    };

    const handlePageChange = async (page) => {
        setCurrentPage(page);
        try {
            let url = '';
            if (searchQuery && selectedGenre !== '') {
                url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&language=en-US&page=${page}&with_genres=${selectedGenre}`;
            } else if (searchQuery === '' && selectedGenre === '') {
                url = `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${page}`;
            } else if (searchQuery === '') {
                url = `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${page}&with_genres=${selectedGenre}`;
            } else {
                url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&language=en-US&page=${page}`;
            }

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNjYzNDA2NDNlZDgyZmI4YzhjMjZhMGFmZTRhMDc1NCIsInN1YiI6IjY1N2M1YTgzMTc2YTk0MTczMWMyNTNlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GwZHp92NEE4aaEmtoIE7P21UUblBMVkZKJjcUCc1_ME'
                }
            });
            const data = await response.json();

            setMovies(data.results); // Set new set of movies

        } catch (error) {
            console.error(error);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="popular-movie">
            <div className="search-genre">
                <div className="select-genre" value="selectedGenre" onClick={handleGenreChange}>
                    <button value="">All </button>
                    {genres.map(genre => (
                        <button key={genre.id} value={genre.id}>{genre.name}</button>
                    ))}
                </div>
                <select value={selectedGenre} onChange={handleGenreChange} className='select-option-genre'>
                    <option value="">All Genres</option>
                    {genres.map(genre => (
                        <option key={genre.id} value={genre.id}>{genre.name}</option>
                    ))}
                </select>
                <form onSubmit={handleSearchSubmit} className='form-search'>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        placeholder="Search movies..."
                    />
                </form>
            </div>
          
                <div className="movie-container">
                    {movies.map(movie => (
                        <Link to={`/movie/${movie.id}`} key={movie.id}>
                            <div className="movie-card">
                                <img className="movie-card-image" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                                <div className="cards__overlay">
                                <div className="card__title">{movie?movie.original_title:""}</div>
                                <div className="card__runtime">
                                    {movie?movie.release_date:""}
                                    <span className="card__rating">{movie?movie.vote_average:""}<i className="fas fa-star" /></span>
                                </div>
                                <div className="card__description">{movie ? movie.overview.slice(0,118)+"..." : ""}</div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            
            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={currentPage === 1} className='next'>Previous</button>
                {/* Pagination buttons */}
                {Array.from({ length: totalPages > 15 ? 15 : totalPages }, (_, index) => (
                    <button className='pages' key={index + 1} onClick={() => handlePageChange(index + 1)} disabled={currentPage === index + 1}>
                        {index + 1}
                    </button>
                ))}
                <input type='input' disabled className='input-pagination' value={currentPage}/>
                <button onClick={handleNextPage} disabled={currentPage === 30} className='next'>Next</button>
            </div>
        </div>
    );
}

export default Genre;
