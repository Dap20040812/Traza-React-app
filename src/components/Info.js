import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ImgSliderPubli from './ImgSliderPubli'
import db from '../firebase'
import { Favorite, FavoriteBorder, FavoriteBorderOutlined} from '@material-ui/icons'
import {addFavoritePublication, deleteFavoritePulication, searchFavoritePublication} from "../backend/favoritePublications"


function Info (props) {

 const [isHovered, setIsHovered] = useState(props.like)

 

 const setFavorite = () => {
     
     if(isHovered) {
         setIsHovered(false) 
         deleteFavoritePulication(props.user,props.id)
         console.log("mal")
     }
     else if(!isHovered) {
         setIsHovered(true)
         addFavoritePublication(props.user,props.id)
         console.log("bien")
     }
     const prueba = searchFavoritePublication(props.user,props.id)
     console.log(prueba)
    

     
 }
 
  return (
    <Container>
        <PubliTitle> 
            <TitleLeft>
                {props.origin} -- {props.destination}
            </TitleLeft>
            <TitleRight>
                <Icon onClick={setFavorite}>
                    {isHovered ? <Favorite /> : <FavoriteBorder/>}
                </Icon>
            </TitleRight>
        </PubliTitle>
            <RigthInfo>    
                <Data>
                    <h2>Información del Flete</h2>
                    <PubliInfo>
                        <li>Empresa: {props.name}</li>
                        <li>Fecha: {props.date}</li>
                        <li>Vehículo disponible</li>
                        <li>Dirección de Origen: {props.oriAddress} </li>
                        <li>Dirección de Destino:{props.destAddress}</li>
                    </PubliInfo> 
                </Data>
                <Data>
                    <h2>Productos transportados:</h2>
                    <PubliInfo>
                        <li>{props.products}</li>
                        <Description>
                            {props.proDescription}
                        </Description>
                    </PubliInfo>
                </Data>
                <Data>
                    <h2>Detalles del embalaje:</h2>
                    <PubliInfo>
                        <li>Tipo de Embalaje: {props.embalaje}</li>
                        <li>Dimensiones del Camion: {props.truckDimensions1} x {props.truckDimensions2} x {props.truckDimensions3} {props.truckDimensions4}</li>
                        <li>ESpacio disponible {props.freeSpaces1} x {props.freeSpaces2} x {props.freeSpaces3} {props.freeSpaces4}</li>
                    </PubliInfo>
                </Data>
                <Data>
                    <h2>Restricciones del envío:</h2>
                    <Description>
                        {props.restrictions}
                    </Description>
                </Data>
            </RigthInfo>
            <Images>
                <ImgSliderPubli/>        
            </Images>
    </Container>
  )
}

export default Info

const Container = styled.div``
const Images = styled.div`

    margin: 7vh;
`
const Data = styled.div`
   
   h2{
       margin: 3vh;
       font-size: 3vh;
       color: white;

   }
   width: 50vh;
`

const RigthInfo = styled.div`
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
   margin-left: 10vh;
`
const PubliTitle = styled.div`
    margin: 1vh;
    padding: 1vh;
    font-size: 4vh;
    color: white;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;

`

const TitleLeft = styled.div `
    padding-left: 30px;
`

const TitleRight = styled.div `
    padding-right: 30px;
`

const PubliInfo = styled.ul`
    margin: 1vh;
    font-size: 2vh;
    color: white;

`

const Description = styled.div`
    line-height: 3vh;
    max-width: 50vh;
    margin-left: 3vh;
    font-size: 2vh;
    color: white;
`

const Icon = styled.div `
    width: 50px;
    height: 50px;
    border-radius: 50%;
    
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    font-size: large;

    &:hover{
        transform: scale(1.3);
    }
`