import axios from '../api/axios';
import React, { useCallback, useEffect, useState } from 'react'
import MovieModal from './MovieModal/index'
import "./Row.css";


const Row = ({title, id, fetchURL}) => {
    const [movies, setMovies] = useState([])
    const [modalOpen, setModalOpen] = useState(false);
    const [movieSelected, setMovieSelection] = useState({});

    useEffect(()=>{
        fetchMovieData();
    }, [fetchURL])

    const fetchMovieData = useCallback( async () => {
        const response = await axios.get(fetchURL);
        setMovies(response.data.results);
    }, [fetchURL])

    const handleClick = (movie) => {
        setModalOpen(true);
        setMovieSelection(movie);
    }

    return (
        <div>
            <h2>{title}</h2>
            <div className="slider">
                <div className="slider__arrow-left">
                    <span className="arrow"
                        onClick={()=>{
                            document.getElementById(id).scrollLeft -= window.innerWidth - 80;
                        }}
                    >
                        {"<"}
                    </span>
                </div>
                <div id={id} className="row__posters">
                    {movies && movies.map((movie)=>(
                        <img
                            key={movie.id}
                            className="row__poster"
                            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                            alt={movie.name}
                            onClick={()=>handleClick(movie)} 
                        />
                    ))}
                </div>
                <div className="slider__arrow-right">
                    <span className="arrow"
                        onClick={()=>{
                            document.getElementById(id).scrollLeft += window.innerWidth - 80;
                        }}
                    >
                        {">"}
                    </span>
                </div>
            </div>
            {modalOpen && 
                <MovieModal 
                    {...movieSelected}
                    setModalOpen={setModalOpen}
                />
            }
        </div>
    )
}

export default Row;