import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {selectPublis} from '../features/publi/publiSlice'
import { useSelector } from 'react-redux'


function Publi(props) {
    const publis = useSelector(selectPublis);  

  return (
    <Container>
        <Content>
             { publis && 
                publis.map((publi) => (
                    <Wrap key={publi.id}>
                        <StyledLink to={props.mypubli === false ? `/detail/${publi.id}` : `/mydetail/${publi.id}`}>
                            <img src={publi.publiImg}/>
                        <PubliContent>
                            <h2>{publi.originPlace} - {publi.destinationPlace}</h2>
                            <h3>$ {publi.price}</h3>
                            <p>Fecha: {publi.departureDate}</p>
                        </PubliContent>
                        </StyledLink>
                    </Wrap>
                    ))
                }
        </Content>
    </Container>
  )
}

export default Publi

const Container = styled.div`
    h4{
        color: #ff7300;
        font-size: 5vh;
    }
`
const Content = styled.div`
    display: grid;
    grid-gap: 8vh;
    grid-template-columns: repeat(4, minmax(0,1fr));
`
const Wrap = styled.div`
    border-radius: 10px;
    cursor: pointer;
    overflow: hidden;
    color: black;
    max-height: calc(100vw - 25vh);
    max-width: calc(100vh - 10vw);
    border: 3px solid transparent; 
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    background-color: #B5B5B5ED;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

    img{
        height: 45vh;
        width: 20vw;
        object-fit: cover;
    }

    &:hover {
        transform: scale(1.02);
        box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
        rgb(0 0 0 / 72%) 0px 30px 22px -10px;
        border-color: #FBB03BED;
        color: white;
        background-color: #000000ED;
        opacity: 0.9;
    }
`
const PubliContent = styled.div`
    padding: calc(0.5vw + 0.5vh);
    text-decoration: none;
    font-size: calc(0.8vh + 0.8vw);
    h2{
        font-size: calc(2vw3vh);
    }
    
`
const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
        
    }
    &:hover{
        color: white;
    }
`