import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import MovieTV from './Pages/Movie-TV';
import MovieDetail from './Pages/movieDetail/movieDetail';
import TvDetail from './Pages/TvDetail/TvDetail';


const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="movie/:id" element={< MovieDetail />}></Route>
          <Route path="/movie" element={<MovieTV />} />
          <Route path="tvmovie/:id" element={< TvDetail />} />
        </Routes>
    </Router>
  );
}

export default App;
