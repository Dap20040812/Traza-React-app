import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ImgSliderPubli from './ImgSliderPubli'


function Info() {
    
  return (
    <Container>
        <PubliTitle>
                Bogota Portal Norte - Chia Terminal de Carga
        </PubliTitle>
            <RigthInfo>    
                <Data>
                    <h2>Información del Flete</h2>
                    <PubliInfo>
                        <li>Empresa que hace la oferta</li>
                        <li>Fecha y hora estimada de salida</li>
                        <li>Vehículo disponible</li>
                        <li>Dirección de Partida</li>
                        <li>FDirección de llegada </li>
                    </PubliInfo> 
                </Data>
                <Data>
                    <h2>Productos transportados:</h2>
                    <PubliInfo>
                        <li></li>
                        <li></li>
                    </PubliInfo>
                </Data>
                <Data>
                    <h2>Detalles del embalaje:</h2>
                    <PubliInfo>
                        <li></li>
                        <li></li>
                        <li>Espacio disponible en el vehículo</li>
                    </PubliInfo>
                </Data>
                <Data>
                    <h2>Restricciones del envío:</h2>
                    <Description>
                        Esto es un texto que define la empresa con toda la información que requiere.
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