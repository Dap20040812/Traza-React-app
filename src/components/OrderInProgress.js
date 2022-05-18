import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {selectOrderInProgress} from '../features/inProgress/orderInProgressSlice'
import { useSelector } from 'react-redux'
import { Button } from 'reactstrap'
import deleteRequest from '../backend/deleteRequest'
import { finalRejection } from '../backend/statusRequest'

function OrderInProgress(props) {
    
    const ordersInProgress = useSelector(selectOrderInProgress);  

  return (
    <Container>
        <Content>
             { ordersInProgress && 
                ordersInProgress.map((orderInProgress) => (
                    <Wrap key={orderInProgress.id}>
                        <StyledLink to={`/current/${orderInProgress.id}` }>
                        <PubliContent>
                            <h2>{orderInProgress.originPlace} - {orderInProgress.destinationPlace}</h2>
                            <h3>$ {orderInProgress.price}</h3>
                            <p>Fecha: {orderInProgress.departureDate}</p>
                        </PubliContent>
                        </StyledLink>
                    </Wrap>
                    ))
                }
        </Content>
    </Container>
  )
}

export default OrderInProgress

const Container = styled.div`
    h4{
        color: #ff7300;
        font-size: 5vh;
    }
    padding: 2vw 2vh;
`
const Content = styled.div`
    width: 100%;
    display: grid;
    grid-gap: 8vh; 
`
const Wrap = styled.div`
    padding: 2vw 2vh;
    border-radius: 10px;
    cursor: pointer;
    overflow: hidden;
    width: 100%;
    color: black;
    max-height: calc(100vw - 25vh);
    width: 100%;
    border: 3px solid rgba(249, 249, 249, 0.1); 
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    background-color: #FFFFFFBA;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

    img{
        height: 45vh;
        width: 20vw;
        object-fit: cover;
    }

    &:hover {
        box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
        rgb(0 0 0 / 72%) 0px 30px 22px -10px;
        border-color: rgba(249, 249, 249 , 0.8);
        color: white;
        background-color: #4A4A4AED;
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
`;
const Title = styled.div`
    color: rgb(249, 249, 249);
    font-size: 5vh;
    min-height: 3vh;
    margin: 3vh;
    font-weight: bold;
` 
const Data = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: space-between;
`


const Alert = styled.div`
  position: fixed;
  top: 0;
  right: 30vw;
  background: white;
  border: 3px solid rgba(136, 148, 122, 0.7); 
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
  rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  max-width: 100vh;
  z-index: 16;
  list-style: none;
  padding: 2vw 2vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transform: ${props => props.show ===false ? 'translatey(-200%)': 'translatey(0%)'};
  transition: transform 0.2s;
  li{
    padding: 15px 0;
    border-bottom: 1px solid rgba(0,0,0,.2);

    a{
      font-weight: 600; 
    }
    &:hover {
        border-radius: 0.6vh;
        border-color: rgba(249, 249, 249 , 0.8);
        color: white;
        background-color: #0000003D;
        opacity: 0.9;
    }
  }
`

const Detail = styled.div`
  position: fixed;
  top: 0;
  right: 30vw;
  background: white;
  border: 3px solid rgba(136, 148, 122, 0.7); 
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
  rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  max-width: 100vh;
  z-index: 16;
  list-style: none;
  padding: 2vw 2vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transform: ${props => props.show ===false ? 'translatey(-200%)': 'translatey(0%)'};
  transition: transform 0.2s;
  li{
    padding: 15px 0;
    border-bottom: 1px solid rgba(0,0,0,.2);

    a{
      font-weight: 600; 
    }
    &:hover {
        border-radius: 0.6vh;
        border-color: rgba(249, 249, 249 , 0.8);
        color: white;
        background-color: #0000003D;
        opacity: 0.9;
    }
  }
`
const Button1 = styled.button`
   border: 1px solid #f9f9f9;
   padding: 8px 16px;
   margin: 1vw 1vh;
   border-radius: 4px;
   letter-spacing: 1.5px;
   text-transform: uppercase;
   background-color: #A8A8A8;
   transition: all 0.2s ease 0s;
   cursor: pointer;

   &:hover {
       background-color: #22B14CED;
       color: #000;
       border-color: transparent;
   }

`
const Button2 = styled.button`
   border: 1px solid #f9f9f9;
   padding: 8px 16px;
   border-radius: 4px;
   margin: 1vw 1vh;
   letter-spacing: 1.5px;
   text-transform: uppercase;
   background-color: #A8A8A8;
   transition: all 0.2s ease 0s;
   cursor: pointer;

   &:hover {
       background-color: #E80D0DED;
       color: #000;
       border-color: transparent;
   }

`
const ButtonContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const ButtonContent1 = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`