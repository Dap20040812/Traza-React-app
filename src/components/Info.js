import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ImgSliderPubli from './ImgSliderPubli'


function Info (props) {
    
  return (
    <Container>
        <PubliTitle>
            {props.origin} -- {props.destination}
        </PubliTitle>
            <RigthInfo>    
                <Data>
                    <h2>Información del Flete</h2>
                    <PubliInfo>
                        <li>Empresa: {props.nit}</li>
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