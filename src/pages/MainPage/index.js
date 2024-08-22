import React from 'react'
import requests from '../../api/request';
import Banner from '../../components/Banner';
import Category from '../../components/Category';
import Nav from '../../components/Nav'
import Row from '../../components/Row'
import styled from 'styled-components';

const MainPage = () => {
  return (
    <Container>
        <Nav />
        <Banner />
        <Category />
        <Row title="Trending Now" id="TN" fetchURL={requests.fetchTrending} />
        <Row title="Top Rated" id="TR" fetchURL={requests.fetchTopRated} />
        <Row title="Action Movies" id="AM" fetchURL={requests.fetchActionMovies} />
        <Row title="Comedy Movies" id="CM" fetchURL={requests.fetchComedyMovies} />
  </Container>
  )
}

export default MainPage

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
  
  &:after {
    background: url("/images/home-background.png") center center / cover no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`