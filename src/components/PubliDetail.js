import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import Info from './Info'
import RequestForm from './RequestForm';
import db from '../firebase'
import { useParams } from 'react-router-dom'
import {saveRecentPublications,showRecentPublication} from '../backend/recentPublications'
import {selecUserUid} from "../features/user/userSlice"
import {useSelector} from "react-redux"
import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux"
//import Publi from './Publi';
import recommendedPublications from '../backend/recommendedPublication';
import { searchFavoritePublication } from '../backend/favoritePublications';
//import { HashLink } from 'react-router-hash-link';


function Detail() {

    const {id} = useParams();
    const [publi, setPubli] = useState()
    const userUid = useSelector(selecUserUid);
    useEffect(() =>{
        db.collection("publications")
        .doc(id)
        .get()
        .then((doc) => {
            if(doc.exists){
                setPubli(doc.data());
            }else {
    
            }
        })
        saveRecentPublications(userUid,id)
      },[])

      
   
  const [page, setPage] = useState('Info')
  
  /**
   * Llama a otros componentes
   * @returns Información de la publicación o el formulario de solicitud
   */
  const getContent = () => {
    
    if(page === 'Info'){
       return(
            <Info like={searchFavoritePublication(userUid,id)} id={id} user={userUid} origin={publi.originPlace} oriAddress={publi.originAddress} destination={publi.destinationPlace} destAddress={publi.destinationAddress} date={publi.departureDate} products={publi.products} proDescription={publi.productsDescription} embalaje={publi.embalaje} truckDimensions1={publi.truckDimensions.truckHeight} truckDimensions2={publi.truckDimensions.truckWidth} truckDimensions3={publi.truckDimensions.truckLength} truckDimensions4={publi.truckDimensions.truckUnidades} freeSpaces1={publi.truckFreeSpace.freeSpaceHeight} freeSpaces2={publi.truckFreeSpace.freeSpaceWidth} freeSpaces3={publi.truckFreeSpace.freeSpaceLength} freeSpaces4={publi.truckFreeSpace.freeSpaceUnidades} restrictions={publi.restrictions} uid={publi.empresaUid} name={publi.empresaName}/> 
            
        )
    }
    else if (page === 'Request'){
      if(publi.empresaUid === userUid)
      {
        window.alert("No puedes realizar una solicitud a tu publicación.")
        return(
            <Info origin={publi.originPlace} oriAddress={publi.originAddress} destination={publi.destinationPlace} destAddress={publi.destinationAddress} date={publi.departureDate} products={publi.products} proDescription={publi.productsDescription} embalaje={publi.embalaje} truckDimensions1={publi.truckDimensions.truckHeight} truckDimensions2={publi.truckDimensions.truckWidth} truckDimensions3={publi.truckDimensions.truckLength} truckDimensions4={publi.truckDimensions.truckUnidades} freeSpaces1={publi.truckFreeSpace.freeSpaceHeight} freeSpaces2={publi.truckFreeSpace.freeSpaceWidth} freeSpaces3={publi.truckFreeSpace.freeSpaceLength} freeSpaces4={publi.truckFreeSpace.freeSpaceUnidades} restrictions={publi.restrictions} uid={publi.empresaUid} name={publi.empresaName}/>   
        )
      } else{
        return(
            <RequestForm publi={publi.id} truckDimensions4={publi.truckDimensions.truckUnidades} freeSpaces1={publi.truckFreeSpace.freeSpaceHeight} freeSpaces2={publi.truckFreeSpace.freeSpaceWidth} freeSpaces3={publi.truckFreeSpace.freeSpaceLength}/>
          )
      } 
      
    }
  }
  const toPage = page => event =>{
    event.preventDefault()
    setPage(page) 
  }
  
  return (
    <Container>
        { publi && (
           <>
                <Background>
                </Background>
                <Data >
                <LeftData>
                    <ImageTitle>
                        <img src={publi.empresaPhoto}/>
                    </ImageTitle>
                    <Price>
                        $ {publi.price}
                    </Price>
                        <Controls>
                            <PlayButton  onClick={toPage('Request')}>
                                <span>SOLICITAR</span>
                            </PlayButton>
                            <TrailerButton  onClick={toPage('Info')}>
                                <span>Información</span>
                            </TrailerButton>
                        </Controls>
                        <SubTitle>{publi.empresaName}</SubTitle>
                        <Description>
                            {publi.serviceDescription}
                        </Description>
                </LeftData> 
                <RigthData>
                    {getContent()}
                </RigthData> 
                </Data>
           </> 
        )

        }
    </Container>
  )
}

export default Detail

const Container = styled.div`
    min-height: calc(100vh - 70px);
    padding: 0 calc(3.5vw + 5px);
    display: flex;
    flex-direction: column;
    position:relative;
    justify-content: center;
`
// const HashLink1 = styled(HashLink)`
//     top: 0;
//     left: 0;
//     text-decoration: none;
// `

const Title = styled.div`
    color: rgb(249, 249, 249);
    font-size: 8vh;
    min-height: 3vh;
    margin: 3vh;
` 
const Data = styled.div`
    display: flex;
    flex-direction: row;
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
const ImageTitle = styled.div`
    max-height: 35vh;
    max-width: 35vh;

    img{ 
        max-width: 35vh;
        max-height: 35vh;
    }

`
const Controls = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
`

const PlayButton = styled.button`
    border-radius: 1vh;
    font-size: 2vh;
    margin-top: 2vh;
    text-align:center;
    padding: 0 3vh;
    margin-right: 3vh;
    display: flex;
    align-items: center;
    width: 100%;
    height: 6vh;
    background: rgb(249, 249, 249);
    border: none;
    letter-spacing: 0.15vh;
    cursor: pointer;
    text-align: center; 
    

    &:hover {
        background: rgb(198, 198, 198);
    }
`

const TrailerButton = styled(PlayButton)`
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgb(249, 249, 249);
    color: rgb(249, 249,249);
  
`
const SubTitle = styled.div`
    color: rgb(249, 249, 249);
    font-size: 2vh;
    min-height: 3vh;
    margin-top: 3vh;
`

const Description = styled.div`
    line-height: 3vh;
    font-size: 2.5vh;
    margin-top: 1.5vh;
    color: rgb(249, 249, 249);
    max-width: 50vh;
`

const LeftData = styled.div`
    border-radius: 1vh;
    background-color: #929294BA;
    display: flex;
    flex-direction: column;
    margin-top: 5vh;
    padding: 2vh;
    opacity: 0.9;
    max-height: 100vh;
    max-width: 40vh;
    overflow: hidden;
    color: black;
    border: 3px solid rgba(249, 249, 249, 0.7); 
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
`
const RigthData = styled.div`
    border-radius: 1vh;
    background-color: #929294BA;
    margin-top: 5vh;
    width: 130vh;
    margin-left: 8vh;
    max-height: max-content;
    overflow: hidden;
    color: black;
    border: 3px solid rgba(249, 249, 249, 0.7); 
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
`
const Price = styled.div`
    margin-top: 3vh;
    margin-bottom: 3vh;
    font-size: 4vh;
`

const Button = styled.button`
    border-radius: 1vh;
    font-size: 2vh;
    margin-top: 2vh;
    text-align:center;
    padding: 0 3vh;
    margin-right: 3vh;
    display: flex;
    align-items: center;
    width: 100%;
    height: 6vh;
    background: rgb(249, 249, 249);
    border: none;
    letter-spacing: 0.15vh;
    cursor: pointer;
    text-align: center; 
    

    &:hover {
        background: rgb(198, 198, 198);
    }
`

const StyledLink = styled(Link)`
text-decoration: none;
color: white;

&:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
}
`