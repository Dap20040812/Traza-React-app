import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {selectPublis} from '../features/publi/publiSlice'
import { useSelector } from 'react-redux'


function Publi() {
    const publis = useSelector(selectPublis);  
    console.log(publis)

  return (
    <Container>
        <Content>
             { publis && 
                publis.map((publi) => (
                    <Wrap key={publi.id}>
                        <StyledLink to={`/detail/${publi.id}`}>
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
    max-width: calc(100vh - 50vh);
    border: 3px solid rgba(249, 249, 249, 0.1); 
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    background-color: #FFFFFFBA;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

    img{
        width: calc(100vh - 50vh);
        height: calc(100vh - 50vh);
        object-fit: cover;
    }

    &:hover {
        transform: scale(1.05);
        box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
        rgb(0 0 0 / 72%) 0px 30px 22px -10px;
        border-color: rgba(249, 249, 249 , 0.8);
        color: white;
        background-color: #000000ED;
        opacity: 0.9;
    }
`
const PubliContent = styled.div`
    padding: 10px;
    text-decoration: none;
    font-size: 2vh;
    
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
`;