import React, { useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from '../../api/axios';
import {useDebounce} from '../../hooks/useDebounce'
import './SearchPage.css'

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  
  const useQuery = () => {
      return new URLSearchParams(useLocation().search);
  }
  
  let query = useQuery();
  const searchTerm = query.get("q");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(()=>{
    if(debouncedSearchTerm){
      fetchSearchMovie(debouncedSearchTerm)
    }
  },[debouncedSearchTerm])

  const fetchSearchMovie = async () => {
    try{
      const response = await axios.get(`/search/multi?include_adult=false&query=${searchTerm}`)
      setSearchResults(response.data.results);
    } catch (error) {
      console.log(error);
    }
  }

  if(searchResults.length > 0){
    return(
      <section className='search-container'>
        {searchResults.map((movie) => {
          if(movie.backdrop_path !== null && movie.media_type !== "person"){
            const movieImageUrl = "https://image.tmdb.org/t/p/w500/" + movie.backdrop_path;
            return(
              <div className='movie' key = {movie.id}>
                <div className='movie__column-poster' onClick={()=>navigate(`/${movie.id}`)}>
                  <img src={movieImageUrl} alt='movie' className='movie__poster'/>
                </div>
              </div>
            )
          }
        })}
      </section>
    )
  }else{
    return (
      <section>
        <div className="no-results">
          <p className='no-results__text'>
            찾고자 하는 검색어 "{debouncedSearchTerm}"에 맞는 영화가 없습니다.
          </p>
        </div>
      </section>
    )
  }
}

export default SearchPage
