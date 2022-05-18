import React,{useEffect} from 'react'
import styled from 'styled-components'
import showOrderInProgress from '../backend/showOrderInProgress'
import Publi from './Publi'
import {selecUserUid} from "../features/user/userSlice"
import {useSelector} from "react-redux"
import { useDispatch } from "react-redux"
import {Link} from "react-router-dom"
import OrderInProgress from './OrderInProgress'


function MyOrderInProgress() {
    
    const dispatch = useDispatch()
    const userUid = useSelector(selecUserUid);

    /**
     * Muestra las publicaciones actuales de la empresa
     */
    useEffect(() => {
        showOrderInProgress(userUid,dispatch);  
    },[]) 
    
  return (
    <Container>
        <Background>
        </Background>
        <Title>Mis Servicios Activos</Title>
        <OrderInProgress inprogress={true}/>
    </Container>
  )
}

export default MyOrderInProgress

const Container = styled.div`
    min-height: calc(100vh - 70px);
    padding: 0 calc(3.5vw + 5px);
    display: flex;
    flex-direction: column;
    position:relative;
    justify-content: center;

`
const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    background: url("/images/home-background.png") center center /cover 
    no-repeat fixed;
    content: "";
    position: absolute;

    img{
        width: 100%;
        height: 100%;
        object-fit:cover;
        filter: brightness(50%);

    }

`
const Title = styled.div`
    color: rgb(249, 249, 249);
    font-size: 8vh;
    min-height: 3vh;
    margin: 3vh;
`    
const Data = styled.div`
        border-radius: 1vh;
        background-color: #929294BA;
        margin-top: 5vh;
        padding: 2vh;
        opacity: 0.9;
        max-height: 200vh;
        width: 70vh;
        overflow: hidden;
        border: 3px solid rgba(249, 249, 249, 0.7); 
        box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
        rgb(0 0 0 / 73%) 0px 16px 10px -10px;
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    `