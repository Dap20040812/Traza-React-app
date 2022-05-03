import React, {useEffect} from 'react'
import styled from 'styled-components' 
import ImgSlider from './ImgSlider' 
import Publi from './Publi'
import {selecUserUid} from "../features/user/userSlice"
import {useSelector} from "react-redux"
import { useDispatch } from "react-redux"
import { showRecentPublication } from '../backend/recentPublications'
import recommendedPublications from '../backend/recommendedPublication'
function Home() {
  const userUid = useSelector(selecUserUid);
  const dispatch = useDispatch()
  useEffect(() =>{
    showRecentPublication(userUid,dispatch)
  },[])

  
  return (
    <Container>
        <ImgSlider/>
        <Title>Recomendaciones : </Title>
        <Publi mypubli={false}/>
    </Container>
  )
}

export default Home
 
const Container = styled.main`
   min-height: calc(100vh - 70px);
   padding: 20px calc(3.5vw + 5px);
   position: relative;
   overflow-x: hidden;
   overflow-y: hidden;

   &:before {
       background: url("/images/home-background.png") center center /cover 
       no-repeat fixed;
       content: "";
       position: absolute;
       top: 0;
       left: 0;
       right: 0;
       bottom: 0;
       z-index: -1;
   }
`
const Title = styled.div`
    color: black;
    font-size: 8vh;
    min-height: 3vh;
    margin: 3vh;
` 