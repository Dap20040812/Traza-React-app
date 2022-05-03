import React, {useState} from 'react'
import styled from 'styled-components'
import EmbalajeData from '../data/EmbalajeData';
import createRequest from '../backend/createRequest';
import { useHistory } from 'react-router-dom'
import ProductData from '../data/ProductData';
import {selecUserName, selecUserUid} from "../features/user/userSlice"
import {useSelector} from "react-redux"
import Form from "react-bootstrap/Form"




function RequestForm(props) {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
    const history = useHistory()
    const userUid = useSelector(selecUserUid);
    const name = useSelector(selecUserName);
    const [ errors, setErrors ] = useState({})
    const [description, setDescription] = useState('');
    const [products, setProducts] = useState('');
    const [prodDescription, setProdDescription] = useState('');
    const [embalaje, setEmbalaje] = useState('');
    const [requestHeight, setrequestHeight] = useState(''); 
    const [requestWidth, setrequestWidth] = useState(''); 
    const [requestLength, setrequestLength] = useState('');
    const [requestUnidades, setrequestUnidades] = useState('');
    const [ form, setForm ] = useState({})


    const setField = (field, value) => {
        setForm({
          ...form,
          [field]: value
        })
        // Check and see if errors exist, and remove them from the error object:
        if ( !!errors[field] ) setErrors({
          ...errors,
          [field]: null
        })
      }
    
      const findFormErrors = () => {
        const {description,products, prodDescription,embalaje,requestHeight,requestWidth,requestLength,requestUnidades} = form
        const newErrors = {}
        // name errors
        if ( !description || description === '' ) newErrors.description = 'Ingresa una descripción para continuar'
        if ( !products || products === '' ) newErrors.products = 'Ingresa un tipo de producto para continuar'
        if ( !prodDescription || prodDescription === '' ) newErrors.prodDescription = 'Ingresa ls descripción del producto para continuar'
        if ( !embalaje || embalaje === '' ) newErrors.embalaje = 'Ingresa la razón social de la empresa para continuar'
        if ( !requestHeight || requestHeight === '' ) {
          newErrors.requestHeight = 'Ingresa la altura para continuar'
        }
        else if (requestHeight > props.freeSpaces1) {
          newErrors.requestHeight = 'La altura ingresada supera el espacio disponible'
        }
        if ( !requestWidth|| requestWidth === '' ) {
          newErrors.requestWidth = 'Ingrese el ancho para continuar'
        }
        else if (requestWidth > props.freeSpaces2) {
          newErrors.requestWidth = 'El ancho ingresado supera el espacio disponible'
        }
        if ( !requestLength|| requestLength === '' ) {
            newErrors.requestLength = 'Ingrese el largo para continuar'
        }
        else if (requestLength > props.freeSpaces3) {
            newErrors.requestLength = 'El largo ingresado supera el espacio disponible'
        }
        if ( !requestUnidades || requestUnidades === '' ) newErrors.requestUnidades = 'Ingresa las unidades para continuar'
        
        return newErrors
    }

    const handleSubmit = e => {
        var elem7 = document.getElementById("desc"); //descripción del envío
        var elem8 = document.getElementById("prod"); //productos
        var elem9 = document.getElementById("pdesc"); //descripción de los productos
        var elem10 = document.getElementById("em"); //embalaje
        var elem11 = document.getElementById("dc");
        const newErrors = findFormErrors()

        if ( Object.keys(newErrors).length > 0 ) {
            // We got errors!
            setErrors(newErrors)
        }
        else 
        {
            e.preventDefault();
            createRequest(name,userUid,props.publi,today,embalaje,description,requestHeight,requestWidth,requestLength,requestUnidades,products,prodDescription);
            window.alert("Solicitud Creada con Exito")
            history.push("/homepubli") 
        }
    }
  return (
    <Container>
      <Form1 className="row g-3 "> 
        <Title>Solicitud de Pedido</Title>
        <Form.Group className='col-md-4 w-100'>
            <Form.Label id="desc1" className="form-label">Descripción del Envío :</Form.Label>
            <textarea id="desc" rows="3" placeholder="Descripción de la solicitud" className="form-control" onChange={ e => setField('description', e.target.value) } isInvalid={ !!errors.description }/>
            <Form.Control.Feedback type='invalid'>
              { errors.description } 
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='col-md-6'>
            <Form.Label id="embalaje1" className="form-label">Tipo de Embalaje :</Form.Label>
            <Form.Select id="embalaje" placeholder="Sector" className="form-control" onChange={ e => setField('embalaje', e.target.value) } isInvalid={ !!errors.embalaje }> 
            {
                EmbalajeData.map((e, key) => {
                  return <option key={key}>{e.name}</option>;
                })
              }
            </Form.Select>
            <Form.Control.Feedback type='invalid'>
              { errors.embalaje }
            </Form.Control.Feedback>  
          </Form.Group>
          <Form.Group className='col-md-6'>
            <Form.Label id="prod1" className="form-label">TIpo de Productos a Transportar :</Form.Label>
            <Form.Select id="prod" placeholder="Productos" className="form-control" onChange={ e => setField('products', e.target.value) } isInvalid={ !!errors.products }> 
            {
                ProductData.map((e, key) => {
                  return <option key={key}>{e.name}</option>;
                })
              }
            </Form.Select>
            <Form.Control.Feedback type='invalid'>
              { errors.products }
            </Form.Control.Feedback>  
          </Form.Group>
          <Form.Group className='col-md-4 w-100'>
            <Form.Label id="proDesc1" className="form-label">Descripción del Producto :</Form.Label>
            <textarea id="proDesc" rows="3" placeholder="Descripción del producto" className="form-control" onChange={ e => setField('prodDescription', e.target.value) } isInvalid={ !!errors.prodDescription }/>
            <Form.Control.Feedback type='invalid'>
              { errors.prodDescription } 
            </Form.Control.Feedback>
        </Form.Group>
      </Form1>
        <Inputs>
          <Text id='em'>Tipo de Embalaje: </Text>
            <Input2 value={embalaje} onChange={e => setEmbalaje(e.target.value)}>
                {EmbalajeData.map((e, key) => {
                  return <option key={key}>{e.name}</option>;
                })}
            </Input2>
        </Inputs>
        <Inputs1>
          <Text id='desc'>Description del Envío:  </Text>
          <Input4 value={description} onChange={e => setDescription(e.target.value)}/>
        </Inputs1>
        <Inputs>
          <Text id='dc'>Dimensiones del Paquete: </Text>
          <Input5 type='number' min="1" max={props.freeSpaces1} placeholder='Largo' value={requestHeight} onChange={e => setrequestHeight(e.target.value)}/>
          <Input5 type='number' min="1" max={props.freeSpaces2} placeholder='Ancho' value={requestWidth} onChange={e => setrequestWidth(e.target.value)}/>
          <Input5 type='number' min="1" max={props.freeSpaces3} placeholder='Alto' value={requestLength} onChange={e => setrequestLength(e.target.value)}/>
          <Input2 value={requestUnidades} onChange={e => setrequestUnidades(e.target.value)}>
              <option>{""}</option>
              <option>{props.truckDimensions4}</option>
          </Input2>
        </Inputs>
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
        <PlayButton onClick={handleSubmit}>
          <span>SOLICITAR</span>
        </PlayButton>
    </Container>
  )
}

export default RequestForm

const Container = styled.div`
    padding: 1vh 2vw;
`

const Title = styled.div`
    font-size: 4vh;
    margin-top: 4vh;
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
const Form1 = styled(Form)`
    max-width: 70vw;
    .Form.Group{
        height: 20vh;
    }  
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
    padding: 3vh;

    
`
const Inputs1 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: 3vh;
`
const Input4 = styled.textarea`
    font-size: 2vh;
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
    padding: 3vh;
    margin: 3vh;


    

    &:hover {
        background: rgb(198, 198, 198);
    }
`


