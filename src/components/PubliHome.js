import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import db from '../firebase'
import Publi from './Publi'
import { useDispatch } from "react-redux"
import { setPublis} from "../features/publi/publiSlice"
import countryData from '../data/countrydata'
import queryPublications from '../backend/queryPublications'
import showRequest from '../backend/showRequest'


function PubliHome() {

    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
    const dispatch = useDispatch()
   
    const ProductData = [
        { name: ''},
        { name: 'Alimentos' },
        { name: 'Refrigerados' },
        { name: 'Quimicos' },
        { name: 'Materiales' },
        { name: 'Telas' }
              
    ]; 
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');
    const [products, setProducts] = useState('');
    
    /**
     * Busca publicaciones actuales disponibles
     */
    useEffect(() => {
        queryPublications(dispatch,'','','','')  
      },[])

    /**
     * Realiza un query con los datos ingresados por el usuario
     * @param {*} e 
     */
    const handleSubmit = e => {
        e.preventDefault();
        queryPublications(dispatch,origin,destination,date,products)
    }
     
    



  return (
    <Container>
        <Background>
            <img src="https://www.ecestaticos.com/imagestatic/clipping/2a9/b8a/2a9b8ad7e8acf162441cde81351c2f16/el-exito-del-primer-camion-100-autonomo-anuncia-el-fin-de-los-transportistas.jpg?mtime=1640954821"/>
        </Background>
        <Navegator>
            <Origin  id="origi" onChange={e => setOrigin(e.target.value)}>
                         {countryData.map((e, key) => {
                            return <option key={key}>{e.name}</option>;
                        })}
            </Origin>
            <Destination id="dest" onChange={e => setDestination(e.target.value)}>
                         {countryData.map((e, key) => {
                            return <option key={key}>{e.name}</option>;
                        })}
            </Destination>
            <Fecha type="date" id="date" name="trip-start"
                        min={today} max ="2022-12-30" />
            <Product id="prod">
                {ProductData.map((e, key) => {
                    return <option key={key}>{e.name}</option>;
                })}
            </Product>  
            <Search onClick={handleSubmit}>
                <span>🔎</span>
            </Search>
        </Navegator>
        <Publi/>
        
    </Container>
  )
}

export default PubliHome

const Container = styled.div`
   min-height: calc(100vh - 70px);
   padding: 20px calc(3.5vw + 5px);
   position: relative;
   overflow-x: hidden;
   overflow-y: hidden;

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
    }
`
const Navegator = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 8vh;
`
const Search = styled.button`
    margin-right: 16px;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 2px solid white;  
    background-color: rgba(0, 0, 0, 0.3);
    cursor: pointer;

    span {
        font-size: 30px;
        color: white; 
    }   
`

const Origin = styled.select`
    font-size: 16px;
    margin: 5px;
    font-size: max(16px, 1em);
    font-family: inherit;
    padding: 0.25em 0.5em;
    background-color: #fff;
    border: 2px solid var(--input-border);
    border-radius: 4px;
`
const Destination = styled(Origin)``

const Fecha = styled.input`
    font-size: 16px;
    margin: 5px;
    font-size: max(16px, 1em);
    font-family: inherit;
    padding: 0.25em 0.5em;
    background-color: #fff;
    border: 2px solid var(--input-border);
    border-radius: 4px;
`

const Product = styled(Origin)``


const Form = styled.form``
