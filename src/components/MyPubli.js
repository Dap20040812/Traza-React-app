import React,{useEffect} from 'react'
import styled from 'styled-components'
import queryMyPublications from '../backend/queryMyPublication'
import Publi from './Publi'
import {selecUserUid} from "../features/user/userSlice"
import {useSelector} from "react-redux"
import { useDispatch } from "react-redux"


function MyPubli() {
    
    const dispatch = useDispatch()
    const userUid = useSelector(selecUserUid);

    /**
     * Muestra las publicaciones actuales de la empresa
     */
    useEffect(() => {
        queryMyPublications(userUid,dispatch);  
    },[]) 
    
  return (
    <Container>
        <Background>
            <img src="https://www.semana.com/resizer/pxkdm8iOSLbj0Y3QWYUMj5p5L_U=/1200x675/filters:format(jpg):quality(50)//cloudfront-us-east-1.images.arcpublishing.com/semana/NJC5QSBBZZEQPABT3MEMZPZVOM.jpg" />
        </Background>
        <Title>Mis Publicaciones</Title>
        <Publi mypubli={true}/>
    </Container>
  )
}

export default MyPubli

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
    opacity: 0.8;

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
