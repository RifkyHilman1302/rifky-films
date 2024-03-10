import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './TvDetail.css'

const TVDetail = () => {
  const { id } = useParams();
  const [tvShow, setTvShow] = useState(null);

  useEffect(() => {
    const fetchTVShow = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNjYzNDA2NDNlZDgyZmI4YzhjMjZhMGFmZTRhMDc1NCIsInN1YiI6IjY1N2M1YTgzMTc2YTk0MTczMWMyNTNlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GwZHp92NEE4aaEmtoIE7P21UUblBMVkZKJjcUCc1_ME'
        }
      };

      try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, options);
        const data = await response.json();
        setTvShow(data);
      } catch (error) {
        console.error('Error fetching TV show details:', error);
      }
    };

    fetchTVShow();
  }, [id]);

  if (!tvShow) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tv">
    <div className="tv__intro">
      <img className="tv__backdrop" src={`https://image.tmdb.org/t/p/original${tvShow.backdrop_path}`} alt="" />
    </div>
    <div className="tv__detail">
      <div className="tv__detailLeft">
        <div className="tv__posterBox">
          <img className="tv__poster" src={`https://image.tmdb.org/t/p/original${tvShow.poster_path}`} alt="" />
        </div>
      </div>
      <div className="tv__detailRight">
        <div className="tv__detailRightTop">
          <div className="tv__name">{tvShow.original_name}</div>
          <div className="tv__tagline">{tvShow.tagline}</div>
          <div className="tv__rating">
            {tvShow.vote_average} <i className="fas fa-star" />
            <span className="tv__voteCount">({tvShow.vote_count} votes)</span>
          </div>
          <div className="tv__runtime">{tvShow.episode_run_time[0]} mins</div>
          <div className="tv__releaseDate">Release date: {tvShow.first_air_date}</div>
          <div className="tv__genres">
            {tvShow.genres.map(genre => (
              <span className="tv__genre" key={genre.id}>{genre.name}</span>
            ))}
          </div>
        </div>
        <div className="tv__detailRightBottom">
          <div className="synopsisText">Synopsis</div>
          <div>{tvShow.overview}</div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default TVDetail;
