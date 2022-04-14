import React, {useState} from 'react'
import styled from 'styled-components'
import db from '../firebase'
import {storage} from '../firebase'
import { useHistory } from 'react-router-dom'


function MakePubli() {
    var now = new Date();
    const history = useHistory()
    now.setDate(now.getDate()+7)
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
    
    const endpoint = 'https://raw.githubusercontent.com/Dap20040812/Traza-Data/main/tipopodructos.json';
    const cities = [];

    
    fetch(endpoint)
        .then(response => response.json())
        .then(data => cities.push(...data));

     console.log(cities)   

    const countryData = [
            { name: ''},
            { name: 'Medellin' },
            { name: 'Bogota' },
            { name: 'Barranquilla' },
            { name: 'Pasto' },
            { name: 'Cali' }

    ];  
    const ProductData = [
        { name: ''},
        { name: 'Alimentos' },
        { name: 'Refrigerados' },
        { name: 'Quimicos' },
        { name: 'Materiales' },
        { name: 'Telas' }              
    ]; 
    console.log(ProductData)
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

        if(origin=== "" || oriAddress === "" || destination === "" || destAddress === "" || date === "" || price === "" || description === "" || products === "" || prodDescription === "" || embalaje === "" || restrictions === "" || truckHeight === "" || truckWidth === "" || truckLength === "" || truckUnidades === "" || freeSpaceHeight === "" || freeSpaceWidth === "" || freeSpaceLength === "" || freeSpaceUnidades ==="")
        {
            window.alert("Completa todos los campos para continuar")
        } else 
        {
            e.preventDefault();
            db.collection("publications").add({

                originPlace: origin,
                originAddress: oriAddress,
                destinationPlace: destination,
                destinationAddress: destAddress,
                departureDate: date,
                price: price,
                serviceDescription: description,
                products: products,
                productsDescription: prodDescription,
                embalaje: embalaje,
                truckDimensions: {

                    truckHeight: truckHeight,
                    truckWidth: truckWidth,
                    truckLength: truckLength,
                    truckUnidades: truckUnidades
                },
                truckFreeSpace: {
                    
                    freeSpaceHeight: freeSpaceHeight,
                    freeSpaceWidth: freeSpaceWidth,
                    freeSpaceLength: freeSpaceLength,
                    freeSpaceUnidades: freeSpaceUnidades
                },
                restrictions: restrictions,
                publiImg: publiImg
            });

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
                <Text>Punto de Origen : </Text>
                <Input2 value={origin} id="origi" onChange={e => setOrigin(e.target.value)}>
                         {countryData.map((e, key) => {
                            return <option key={key}>{e.name}</option>;
                        })}
                </Input2>
            </Inputs>
            <Inputs>
                <Text>Dirección Exacta de Destino : </Text>
                <Input1 value={oriAddress} onChange={e => setOriAddress(e.target.value)}/>

            </Inputs>
            <Inputs>
                <Text>Punto de Destino : </Text>
                <Input2 value={destination} onChange={e => setDestination(e.target.value)}>
                         {countryData.map((e, key) => {
                            return <option key={key} >{e.name}</option>;
                        })}
                </Input2>
            </Inputs>
            <Inputs>
                <Text>Dirección Exacta de LLegada : </Text>
                <Input1 value={destAddress} onChange={e => setDestAddress(e.target.value)}/>

            </Inputs>
            <Inputs>
                <Text>Fecha de Salida : </Text>
                <Input3 type="date" id="start" name="trip-start"
                        min={today} max ="2022-12-30" 
                        value={date} onChange={e => setDate(e.target.value)}/>

            </Inputs>
            <Inputs>
                <Text>Precio Estimado: </Text>
                <Input6 type='number' min="100" value={price} onChange={e => setPrice(e.target.value)}/>

            </Inputs>
            <Inputs1>
                <Text>Description del Envío:  </Text>
                <Input4 value={description} onChange={e => setDescription(e.target.value)}/>

            </Inputs1>
            <Inputs>
                <Text>Productos Tranportados: </Text>
                <Input2 value={products} onChange={e => setProducts(e.target.value)}>
                         {ProductData.map((e, key) => {
                            return <option key={key}>{e.name}</option>;
                        })}
                </Input2>
            </Inputs>
            <Inputs1>
                <Text>Descripción de los Productos: </Text>
                <Input4 value={prodDescription} onChange={e => setProdDescription(e.target.value)}/>

            </Inputs1>
            <SubTitle> Detalles del embalaje: </SubTitle>
            <Inputs>
                <Text>Tipo de Embalaje: </Text>
                <Input2 value={embalaje} onChange={e => setEmbalaje(e.target.value)}>
                         {EmbalajeData.map((e, key) => {
                            return <option key={key}>{e.name}</option>;
                        })}
                </Input2>
            </Inputs>
            <Inputs>
                <Text>Dimensiones del Camion: </Text>
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
                <Text>Espacio Disponible: </Text>
                <Input5 type='number' min="1" placeholder='Largo' value={freeSpaceHeight} onChange={e => setFreeSpaceHeight(e.target.value)}/>
                <Input5 type='number' min="1" placeholder='Ancho' value={freeSpaceWidth} onChange={e => setFreeSpaceWidth(e.target.value)}/>
                <Input5 type='number' min="1" placeholder='Alto' value={freeSpaceLength} onChange={e => setFreeSpaceLength(e.target.value)}/>
                <Input2 value={freeSpaceUnidades} onChange={e => setFreeSpaceUnidades(e.target.value)}>
                         {MedidaData.map((e, key) => {
                            return <option key={key}>{e.name}</option>;
                        })}
            </Input2>
            </Inputs>
            <Inputs1>
                <Text>Restricciones del Envío:  </Text>
                <Input4 value={restrictions} onChange={e => setRestrictions(e.target.value)}/>

            </Inputs1>
            <Inputs1>
                <Text>Imagen Publicación :  </Text>
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