import React from 'react'
import styled from 'styled-components'
import db from '../firebase'
import {useSelector} from "react-redux"
import {selecUserUid} from "../features/user/userSlice"
import { useState } from 'react';
import chatSetupp from '../backend/chatSetup'


function Chat() 
{
    const [inputValue, setInputValue] = useState("");
    const userUid = useSelector(selecUserUid);
    const text = document.querySelector("#divtext")
    let textInput = React.createRef();
    let sendMessage = e =>{
        
        if(inputValue!="")
        {
               chatSetupp(userUid,inputValue)
        }
        setInputValue("")
    }
    let test = e =>{
        setInputValue(e.target.value)        
    }

    db.collection("orderInProgress").doc("Ingrese id de orderInProgress").collection("chat").orderBy('date').onSnapshot(snapshot=>
        {
            text.innerHTML = ''
            snapshot.forEach(doc=>{
                if(doc.data().company===userUid)
                {
                    text.innerHTML +=`
                        <div>
                            <span class="d-flex justify-content-end">${doc.data().text}</span>
                        </div>       
                    `
                }
                else
                {
                    text.innerHTML +=`
                        <div>
                            <span class="d-flex justify-content-start">${doc.data().text}</span>
                        </div> 
                    `
                }
            })
        })   

    
  return (

    <Container>
        <Background>
        </Background>
        <Data>
            <input type="text" value={inputValue} onChange={test} ref={textInput} />
            <button onClick={sendMessage}>Enviar mensaje</button>
            <div class="mt-3"id="divtext">
            </div>
        </Data>
    </Container>

  )
}

export default Chat

const Container = styled.div`
    min-height: calc(100vh - 70px);
    padding: 0 calc(3.5vw + 5px);
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

const Data = styled.div`
    border-radius: 1vh;
    background-color: #929294BA;
    margin-top: 5vh;
    padding: 2vh;
    opacity: 0.9;
    height: 80vh;
    width: 100vh;
    overflow: hidden;
    border: 3px solid rgba(249, 249, 249, 0.7); 
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
`
const Test = styled.select`
    font-size: 16px;
    margin: 5px;
    font-size: max(16px, 1em);
    font-family: inherit;
    padding: 0.25em 0.5em;
    background-color: #fff;
    border: 2px solid var(--input-border);
    border-radius: 4px;
`