import React, {useState} from 'react'
import styled from 'styled-components'
import db from '../firebase'
import {storage} from '../firebase'
import { useHistory } from 'react-router-dom'
import countryData from '../data/countrydata'
import createPublication from '../backend/createPublication'
import {
    selecUserName,
    selecUserPhoto,
    selecUserUid,
    setUserLogin,
    setSignOut
} from "../features/user/userSlice"
import {useDispatch, useSelector} from "react-redux"
function MakePubli() {
    var now = new Date();
    const history = useHistory()
    now.setDate(now.getDate()+7)
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
    const userUid = useSelector(selecUserUid);
    const userName = useSelector(selecUserName);
    const userPhoto = useSelector(selecUserPhoto);

    console.log(userUid)
    
    const endpoint = 'https://raw.githubusercontent.com/Dap20040812/Traza-Data/main/tipopodructos.json';
    const cities = [];
    const obtenerDatos = async () => {
        await fetch(endpoint)
            .then ((respuesta) => respuesta.json())
            .then ((data) => {
                data.forEach((elemento) =>{
                cities.push(elemento)
            })
        })
    }       
    
    const ProductData = [
        { name: ''},
        { name: 'Alimentos' },
        { name: 'Refrigerados' },
        { name: 'Quimicos' },
        { name: 'Materiales' },
        { name: 'Telas' }              
    ]; 
    const EmbalajeData = [
        { name: ''},
        { name: 'Primario' },
        { name: 'Secundario' },
        { name: 'Terciario' }      
    ];
    const MedidaData = [
        { name: ''},
        { name: 'cm' },
        { name: 'm' },
        { name: 'pulgadas'},
        { name: 'pies'}      
    ];

    const [origin, setOrigin] = useState('');
    const [oriAddress, setOriAddress] = useState('');
    const [destination, setDestination] = useState('');
    const [destAddress, setDestAddress] = useState('');
    const [date, setDate] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [products, setProducts] = useState('');
    const [prodDescription, setProdDescription] = useState('');
    const [embalaje, setEmbalaje] = useState('');
    const [restrictions, setRestrictions] = useState('');
    const [truckHeight, setTruckHeight] = useState('');
    const [truckWidth, setTruckWidth] = useState('');
    const [truckLength, setTruckLength] = useState('');
    const [truckUnidades, setTruckUnidades] = useState('');
    const [freeSpaceHeight, setFreeSpaceHeight] = useState('');
    const [freeSpaceWidth, setFreeSpaceWidth] = useState('');
    const [freeSpaceLength, setFreeSpaceLength] = useState('');
    const [freeSpaceUnidades, setFreeSpaceUnidades] = useState('');
    const [publiImg, setPubliImg] = useState('');

    

    const handleSubmit = e => {
        var elem1 = document.getElementById("origen");
        var elem2 = document.getElementById("origen1");
        var elem3 = document.getElementById("dest");
        var elem4 = document.getElementById("dest1");
        var elem5 = document.getElementById("date");
        var elem6 = document.getElementById("price");
        var elem7 = document.getElementById("desc");
        var elem8 = document.getElementById("prod");
        var elem9 = document.getElementById("pdesc");
        var elem10 = document.getElementById("em");
        var elem11 = document.getElementById("dc");
        var elem12 = document.getElementById("ed");
        var elem13 = document.getElementById("rest");
        var elem14 = document.getElementById("img");
        var med1 = truckHeight*truckLength*truckWidth
        var med2 = freeSpaceHeight*freeSpaceLength*freeSpaceWidth

        if(origin=== "")
        {
            window.alert("Completa la dirección de origen para continuar")
            elem1.style.color = "red";
            elem2.style.color = "white";
            elem3.style.color = "white";
            elem4.style.color = "white";
            elem5.style.color = "white";
            elem6.style.color = "white";
            elem7.style.color = "white";
            elem8.style.color = "white";
            elem9.style.color = "white";
            elem10.style.color = "white";
            elem11.style.color = "white";
            elem12.style.color = "white";
            elem13.style.color = "white";
            elem14.style.color = "white";
        }else if(oriAddress=== ""){
            window.alert("Completa la dirección de origen para continuar")
            elem2.style.color = "red";
            elem1.style.color = "white";
        }else if(destination=== ""){
            window.alert("Completa la dirección de destino para continuar")
            elem3.style.color = "red";
        }else if(destAddress=== ""){
            window.alert("Completa la dirección de destino para continuar")
            elem4.style.color = "red";
        }else if(date=== ""){
            window.alert("Completa la fecha de salida para continuar")
            elem5.style.color = "red";
        }else if(price=== ""){
            window.alert("Completa el precio para continuar")
            elem6.style.color = "red";
        }else if(description=== ""){
            window.alert("Completa la descripción para continuar")
            elem7.style.color = "red";
        }else if(products=== ""){
            window.alert("Completa el tipo de producto para continuar")
            elem8.style.color = "red";
        }else if(prodDescription=== ""){
            window.alert("Completa la descripción del producto para continuar")
            elem9.style.color = "red";
        }else if(embalaje === ""){
            window.alert("Completa el tipo de embalaje para continuar")
            elem10.style.color = "red";
        }else if(restrictions=== ""){
            window.alert("Completa las restriciones para continuar")
            elem13.style.color = "red";
        }else if(truckLength=== "" || truckWidth === "" || truckHeight=== "" || truckUnidades === ""){
            window.alert("Completa las dimensiones del camion para continuar")
            elem11.style.color = "red";
        }else if(freeSpaceLength=== "" || freeSpaceWidth === "" || freeSpaceHeight=== "" || freeSpaceUnidades === "" ){
            window.alert("Completa  las dimensiones del espacio disponible para continuar")
            elem12.style.color = "red";
        }
        else if(med1 < med2 || truckHeight < freeSpaceHeight || truckLength < freeSpaceLength || truckWidth < freeSpaceWidth){
            window.alert("Las dimensiones no conciden, revisa las medidas para continuar")
            elem12.style.color = "red";
        }else if(publiImg === ""){
            window.alert("Carga una imagen para continuar")
            elem14.style.color = "red";
        }
        else 
        {
            e.preventDefault();
            createPublication(userUid,userName,userPhoto,origin,oriAddress,destination,destAddress,date,price,description,products,prodDescription,embalaje,truckHeight,truckWidth,truckLength,truckUnidades, freeSpaceHeight,freeSpaceWidth,freeSpaceLength,freeSpaceUnidades,restrictions,publiImg);
            setOrigin("");
            setOriAddress("");
            setDestination("");
            setDestAddress("");
            setDate("");
            setPrice("");
            setDescription("");
            setProducts("");
            setProdDescription("");
            setEmbalaje("");
            setRestrictions("");
            setTruckHeight("");
            setTruckWidth("");
            setTruckLength("");
            setTruckUnidades("");
            setFreeSpaceHeight("");
            setFreeSpaceWidth("");
            setFreeSpaceLength("");
            setFreeSpaceUnidades("");
            window.alert("Publicación Creada con Exito")
            history.push("/homepubli") 


        }

        

    }

    const archivoMandler = async (e)=>{

        setPubliImg("");
        const archivo = e.target.files[0];
        const storageRef = storage.ref();
        const archivoPath = storageRef.child(archivo.name);
        await archivoPath.put(archivo);
        console.log(archivo.name)
        const url =  await archivoPath.getDownloadURL();
        setPubliImg(url);
    }
  return (
    <Container>
        <Background>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Optimusprimealtmoviemode.jpg/1200px-Optimusprimealtmoviemode.jpg"/>
        </Background>
        <Data>
            <Title>Nueva Publicación</Title>
            <SubTitle> Detalles del Flete: </SubTitle>
            <Inputs>
                <Text id='origen'>Punto de Origen : </Text>
                <Input2 value={origin} id="origi" onChange={e => setOrigin(e.target.value)}>
                         {countryData.map((e, key) => {
                            return <option key={key}>{e.name}</option>;
                        })}
                </Input2>
            </Inputs>
            <Inputs>
                <Text id='origen1'>Dirección Exacta de Destino : </Text>
                <Input1 value={oriAddress} onChange={e => setOriAddress(e.target.value)}/>

            </Inputs>
            <Inputs>
                <Text id='dest'>Punto de Destino : </Text>
                <Input2 value={destination} onChange={e => setDestination(e.target.value)}>
                         {countryData.map((e, key) => {
                            return <option key={key} >{e.name}</option>;
                        })}
                </Input2>
            </Inputs>
            <Inputs>
                <Text id='dest1'>Dirección Exacta de LLegada : </Text>
                <Input1 value={destAddress} onChange={e => setDestAddress(e.target.value)}/>

            </Inputs>
            <Inputs>
                <Text id='date'>Fecha de Salida : </Text>
                <Input3 type="date" id="start" name="trip-start"
                        min={today} max ="2022-12-30" 
                        value={date} onChange={e => setDate(e.target.value)}/>

            </Inputs>
            <Inputs>
                <Text id='price'>Precio Estimado: </Text>
                <Input6 type='number' min="100" value={price} onChange={e => setPrice(e.target.value)}/>

            </Inputs>
            <Inputs1>
                <Text id='desc'>Description del Envío:  </Text>
                <Input4 value={description} onChange={e => setDescription(e.target.value)}/>

            </Inputs1>
            <Inputs>
                <Text id='prod'>Productos Tranportados: </Text>
                <Input2 value={products} onChange={e => setProducts(e.target.value)}>
                         {
                            ProductData.map((e, key) => {
                                return <option key={key}>{e.name}</option>;
                            })
                        }
                </Input2>
            </Inputs>
            <Inputs1>
                <Text id='pdesc'>Descripción de los Productos: </Text>
                <Input4 value={prodDescription} onChange={e => setProdDescription(e.target.value)}/>

            </Inputs1>
            <SubTitle> Detalles del embalaje: </SubTitle>
            <Inputs>
                <Text id='em'>Tipo de Embalaje: </Text>
                <Input2 value={embalaje} onChange={e => setEmbalaje(e.target.value)}>
                         {EmbalajeData.map((e, key) => {
                            return <option key={key}>{e.name}</option>;
                        })}
                </Input2>
            </Inputs>
            <Inputs>
                <Text id='dc'>Dimensiones del Camion: </Text>
                <Input5 type='number' min="1" placeholder='Largo' value={truckHeight} onChange={e => setTruckHeight(e.target.value)}/>
                <Input5 type='number' min="1" placeholder='Ancho' value={truckWidth} onChange={e => setTruckWidth(e.target.value)}/>
                <Input5 type='number' min="1" placeholder='Alto' value={truckLength} onChange={e => setTruckLength(e.target.value)}/>
                <Input2 value={truckUnidades} onChange={e => setTruckUnidades(e.target.value)}>
                         {MedidaData.map((e, key) => {
                            return <option key={key}>{e.name}</option>;
                        })}
                </Input2>
            </Inputs>
            <Inputs>
                <Text id='ed'>Espacio Disponible: </Text>
                <Input5 type='number' min="1" placeholder='Largo' value={freeSpaceHeight} onChange={e => setFreeSpaceHeight(e.target.value)}/>
                <Input5 type='number' min="1" placeholder='Ancho' value={freeSpaceWidth} onChange={e => setFreeSpaceWidth(e.target.value)}/>
                <Input5 type='number' min="1" placeholder='Alto' value={freeSpaceLength} onChange={e => setFreeSpaceLength(e.target.value)}/>
                <Input2 value={freeSpaceUnidades} onChange={e => setFreeSpaceUnidades(e.target.value)}>
                        <option>{""}</option>
                         <option>{truckUnidades}</option>
                </Input2>
            </Inputs>
            <Inputs1>
                <Text id='rest'>Restricciones del Envío:  </Text>
                <Input4 value={restrictions} onChange={e => setRestrictions(e.target.value)}/>

            </Inputs1>
            <Inputs1>
                <Text id='img'>Imagen Publicación :  </Text>
                <Input7 type="file" accept="image/png, image/jpeg, image/jpg"  onChange={archivoMandler} />

            </Inputs1>
            <PlayButton onClick={handleSubmit}>
                <span>PUBLICAR</span>
            </PlayButton>
        </Data>
        
    </Container>
  )
}

export default MakePubli

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
    opacity: 0.8;

    img{
        width: 100%;
        height: 100%;
        object-fit:cover;
    }
`

const Data = styled.div`
    border-radius: 1vh;
    background-color: #929294BA;
    margin-top: 5vh;
    padding: 2vh;
    opacity: 0.9;
    max-height: 200vh;
    max-width: 10       0vh;
    overflow: hidden;
    border: 3px solid rgba(249, 249, 249, 0.7); 
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
`

const Title = styled.div`
    margin: 1vh;
    padding: 1vh;
    font-size: 4vh;
    color: white;
    font-weight: bold;

`
const SubTitle = styled.div`
    color: rgb(249, 249, 249);
    font-size: 2vh;
    min-height: 3vh;
    margin-top: 3vh;
    font-size: 3vh;
    color: white;
    font-weight: bold;

`

const Input1 = styled.input`
    font-size: 2vh;
    type: text;
    margin: 2vh;
    font-size: max(16px, 1em);
    font-family: inherit;
    background-color: #fff;
    border: 2px solid var(--input-border);
    border-radius: 0.5vh;
    
`
const Input7 = styled.input`
    margin: 2vh;
   
    
`

const Input2 = styled.select`
    font-size: 2vh;
    type: text;
    margin: 2vh;
    font-size: max(16px, 1em);
    font-family: inherit;
    background-color: #fff;
    border: 2px solid var(--input-border);
    border-radius: 0.5vh;
    
`
const Input3 = styled.input`
    font-size: 2vh;
    margin: 2vh;
    font-size: max(16px, 1em);
    font-family: inherit;
    background-color: #fff;
    border: 2px solid var(--input-border);
    border-radius: 0.5vh;
    
`
const Inputs = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    
`
const Inputs1 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
`
const Input4 = styled.textarea`
    font-size: 2vh;
    maxlength="100";
    margin: 1vh;
    font-size: 2.5vh;
    font-family: inherit; 
    background-color: #fff;
    border: 2px solid var(--input-border);
    border-radius: 0.5vh;
    width: 100%;
    height: 8vh;
    resize: none; 
  
`
const Input5 = styled.input`
    font-size: 2vh;
    type: text;
    margin: 2vh;
    max-width: 9vh;
    font-family: inherit;
    background-color: #fff;
    border: 2px solid var(--input-border);
    border-radius: 0.5vh;
   
`
const Input6 = styled.input`
    font-size: 2vh;
    margin: 2vh;
    font-size: max(16px, 1em);
    font-family: inherit;
    background-color: #fff;
    border: 2px solid var(--input-border);
    border-radius: 0.5vh;
    
`


const Text = styled.div`
    color: white;
    font-weight: bold;

`   

const PlayButton = styled.button`
    border-radius: 1vh;
    font-size: 2vh;
    margin-top: 2vh;
    text-align:center;
    margin-right: 3vh;
    display: flex;
    align-items: center;
    width: 20%;
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