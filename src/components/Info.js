import React from 'react'
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
                        <li>Ropa</li>
                        <li>Niños Muertos</li>
                    </PubliInfo>
                </Data>
                <Data>
                    <h2>Detalles del embalaje:</h2>
                    <PubliInfo>
                        <li>Tipo de Embalaje</li>
                        <li>Dimensiones del paquete actual enviado</li>
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
    margin: 15vh;
`
const Data = styled.div`
   
   h2{
       margin: 20px;
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
    margin: 10px;
    padding: 10px;
    font-size: 30px;
    color: white;
    font-weight: bold;

`
const PubliInfo = styled.ul`
    margin: 10px;
`

const Description = styled.div`
    line-height: 1.4;
    max-width: 760px;
    margin-left: 20px;

`