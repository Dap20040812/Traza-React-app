import React, {useEffect} from 'react'
import styled from 'styled-components'
import db from '../firebase'
import Publi from './Publi'
import { useDispatch } from "react-redux"
import { setPublis} from "../features/publi/publiSlice"



function PubliHome() {

    const dispatch = useDispatch();
    useEffect(() => {

    db.collection("publications").onSnapshot((snapshot)=>{
        let tempPublis = snapshot.docs.map((doc)=>{
            return {id: doc.id, ...doc.data()}
        }) 
        console.log(tempPublis)
        dispatch(setPublis(tempPublis));
    })
  },[])

  return (
    <Container>
        <Background>
            <img src="https://www.ecestaticos.com/imagestatic/clipping/2a9/b8a/2a9b8ad7e8acf162441cde81351c2f16/el-exito-del-primer-camion-100-autonomo-anuncia-el-fin-de-los-transportistas.jpg?mtime=1640954821"/>
        </Background>
        <Navegator>
            <Origin >
                    <option>Bogota</option>
                    <option>Chia</option>
                    <option>Medellin</option>
                    <option>Barranquilla</option>
                    <option>Cali</option>
                    <option>Pasto</option>
            </Origin>
            <Destination>
                    <option>Bogota</option>
                    <option>Chia</option>
                    <option>Medellin</option>
                    <option>Barranquilla</option>
                    <option>Cali</option>
                    <option>Pasto</option>
            </Destination>
            <Search>
                <span> 🔎</span>
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

