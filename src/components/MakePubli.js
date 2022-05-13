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
import Form from "react-bootstrap/Form"
import cancelledPublicationsRefresh from '../backend/endedPublications'
import {Spinner} from "reactstrap"
import { searchFavoritePublication, addFavoritePublication } from '../backend/favoritePublications'


function MakePubli() {
    var now = new Date();
    const history = useHistory()
    now.setDate(now.getDate()+7)
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear()+"-"+(month)+"-"+(day) ;

    const [ errors, setErrors ] = useState({})
    const [ form, setForm ] = useState({})
    const [publiImg, setPubliImg] = useState('');
    const [unity, setUnity] = useState('');
    const [loading, setLoading] = useState(false);
    const userUid = useSelector(selecUserUid); //Obtiene el UUID del usuario actual
    const userName = useSelector(selecUserName); //Obtiene el nombre del usuario actual
    const userPhoto = useSelector(selecUserPhoto); //Obtiene la foto del usuario actual   
    
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
        const {origin, oriAddress, destination, destAddress, date, price, description, products, prodDescription, embalaje, restrictions, med1, med2, truckHeight, freeSpaceHeight, truckLength, truckUnidades, freeSpaceLength, truckWidth, freeSpaceWidth, freeSpaceUnidades} = form 
        const newErrors = {}

        if ( !origin || origin === '' ) newErrors.origin = 'Escoge un punto de origen para continuar'
        if ( !oriAddress || oriAddress === '' ) newErrors.oriAddress = 'Ingresa la direccion de origen para continuar'
        if ( !destination || destination === '' ) newErrors.destination = 'Escoge un punto de destino para continuar'
        if ( !destAddress || destAddress === '' ) newErrors.destAddress = 'Ingresa la direccion de destino para continuar'
        if ( !date || date === '' ) newErrors.date = 'Escoge una fecha de salida para continuar'
        if ( !price || price === '' ) newErrors.price = 'Ingresa el precio estimado para continuar'
        if ( !description || description === '' ) newErrors.description = 'Ingresa la descripcion del envio para continuar'
        if ( !products || products === '' ) newErrors.products = 'Escoge el tipo de producto transportado para continuar'
        if ( !prodDescription || prodDescription === '' ) newErrors.prodDescription = 'Ingresa la descripcion de los productos para continuar'
        if ( !embalaje || embalaje === '' ) newErrors.embalaje = 'Escoge el tipo de embalaje para continuar'
        if ( !truckHeight || truckHeight === '' ) newErrors.truckHeight = 'Ingresa la altura para continuar'
        if ( !truckLength || truckLength === '' ) newErrors.truckLength = 'Ingresa el largo para continuar'
        if ( !truckWidth || truckWidth === '' )newErrors.truckWidth = 'Ingresa el ancho para continuar'
        if ( !freeSpaceHeight || freeSpaceHeight === '' ) newErrors.freeSpaceHeight = 'Ingresa la altura para continuar'
        if ( !freeSpaceLength || freeSpaceLength === '' ) newErrors.freeSpaceLength = 'Ingresa el largo para continuar'
        if ( !freeSpaceWidth || freeSpaceWidth === ''  )newErrors.freeSpaceWidth = 'Ingresa el ancho para continuar'
        if (med1 < med2 || truckHeight < freeSpaceHeight || truckLength < freeSpaceLength || truckWidth < freeSpaceWidth) {
             newErrors.freeSpaceDimensions = 'Las dimensiones no conciden, revisa las medidas para continuar'
         }
        if( !truckUnidades || truckUnidades === '' ) newErrors.truckUnidades = 'Escoge las unidades para continuar'
        //if( !freeSpaceUnidades || freeSpaceUnidades === '' ) newErrors.freeSpaceUnidades = 'Escoge las unidades para continuar'
        if ( !restrictions || restrictions === '' ) newErrors.restrictions = 'Ingresa las restricciones del envio para continuar'
        
        return newErrors
    }

    /**
     * Verifica los datos registrados en el formulario de la publicacion
     * @param {*} e  
     */

    const handleSubmit = e => {

        e.preventDefault();

        const origin = e.target.elements.origin.value;
        const oriAddress = e.target.elements.oriAddress.value
        const destination = e.target.elements.destination.value;
        const destAddress = e.target.elements.destAddress.value;
        const date = e.target.elements.date.value;
        const price = e.target.elements.price.value;
        const products = e.target.elements.products.value;
        const description = e.target.elements.description.value;
        const prodDescription = e.target.elements.prodDescription.value;
        const embalaje = e.target.elements.embalaje.value;
        const restrictions = e.target.elements.restrictions.value;
        const truckHeight = e.target.elements.truckHeight.value;
        const truckLength = e.target.elements.truckLength.value;
        const truckWidth = e.target.elements.truckWidth.value;
        const truckUnidades = e.target.elements.truckUnidades.value;
        const freeSpaceHeight = e.target.elements.freeSpaceHeight.value;
        const freeSpaceLength = e.target.elements.freeSpaceLength.value;
        const freeSpaceWidth = e.target.elements.freeSpaceWidth.value;
        const freeSpaceUnidades = e.target.elements.freeSpaceUnidades.value;
        setUnity(freeSpaceUnidades)

        const newErrors = findFormErrors()

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        }
        else 
        {
            createPublication(userUid,userName,userPhoto,origin,oriAddress,destination,destAddress,date,price,description,products,prodDescription,embalaje,truckHeight,truckWidth,truckLength,truckUnidades, freeSpaceHeight,freeSpaceWidth,freeSpaceLength,freeSpaceUnidades,restrictions,publiImg);
            window.alert("Publicación Creada con Exito")
            history.push("/homepubli") 
        }
    }

    /**
     * Guarda la imagen de la publicacion en el storage y devuelve un URL con que se mostrará la imagen en la página
     * @param {*} e 
     */

    const archivoMandler = async (e)=>{

        setLoading(true)
        setPubliImg("");
        const archivo = e.target.files[0];
        const storageRef = storage.ref();
        const archivoPath = storageRef.child(archivo.name);
        await archivoPath.put(archivo);
        console.log(archivo.name)
        const url =  await archivoPath.getDownloadURL();
        setPubliImg(url);
        setLoading(false)
    }
  return (
    <Container>
        <Background>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Optimusprimealtmoviemode.jpg/1200px-Optimusprimealtmoviemode.jpg"/>
        </Background>
        <Data>
                <Title>Nueva Publicación</Title>
                <SubTitle> Detalles del Flete: </SubTitle>
                <Form1 onSubmit={handleSubmit} className="row g-3">
                    <Form.Group className='col-md-4 w-50'>
                        <Form.Label className='form-label' > Punto de Origen </Form.Label>
                            <Form.Select id='origin' className='form-control' onChange={e => setField('origin', e.target.value)} isInvalid={!!errors.origin} >
                                {countryData.map((e, key) => {
                                    return <option key={key}>{e.name}</option>;
                                })}
                            </Form.Select>
                            <Form.Control.Feedback type='invalid' >
                                {errors.origin}
                            </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='col-md-4 w-50'>
                        <Form.Label className='form-label' > Dirección Exacta de Origen </Form.Label>
                            <Form.Control id='oriAddress' type='text' className='form-control' onChange={e => setField('oriAddress', e.target.value)} isInvalid={!!errors.oriAddress} />
                            <Form.Control.Feedback type='invalid' >
                                {errors.oriAddress}
                            </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='col-md-6 w-50'>
                        <Form.Label className='form-label' > Punto de Destino </Form.Label>
                            <Form.Select id='destination' className='form-control' onChange={e => setField('destination', e.target.value)} isInvalid={!!errors.destination} >
                                {countryData.map((e, key) => {
                                    return <option key={key}>{e.name}</option>;
                                })}
                            </Form.Select>
                            <Form.Control.Feedback type='invalid' >
                                {errors.destination}
                            </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='col-md-6 w-50'>
                        <Form.Label className='form-label' > Dirección Exacta de Destino </Form.Label>
                            <Form.Control id='destAddress' type='text' className='form-control' onChange={e => setField('destAddress', e.target.value)} isInvalid={!!errors.destAddress} />
                            <Form.Control.Feedback type='invalid' >
                                {errors.destAddress}
                            </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='col-md-8 w-50'>
                        <Form.Label className='form-label' > Fecha de Salida </Form.Label>
                            <Form.Control id='date' type='date' className='form-control' min={today} max ="2022-12-30" onChange={e => setField('date', e.target.value)} isInvalid={!!errors.date} />
                            <Form.Control.Feedback type='invalid' >
                                {errors.date}
                            </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='col-md-8 w-50'>
                        <Form.Label className='form-label' > Precio Estimado </Form.Label>
                            <Form.Control id='price' type='number' min='100' className='form-control' onChange={e => setField('price', e.target.value)} isInvalid={!!errors.price} />
                            <Form.Control.Feedback type='invalid' >
                                {errors.price}
                            </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='col-md-10 w-100'>
                        <Form.Label className='form-label' > Descripción del Envío </Form.Label>
                            <textarea id='description' row='3' className='form-control' onChange={e => setField('description', e.target.value)} isInvalid={!!errors.description} required />
                            <Form.Control.Feedback type='invalid' >
                                {errors.description}
                            </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='col-md-12 w-50'>
                        <Form.Label className='form-label' > Productos Transportados </Form.Label>
                            <Form.Select id='products' className='form-control' onChange={e => setField('products', e.target.value)} isInvalid={!!errors.products} >
                                {ProductData.map((e, key) => {
                                    return <option key={key}>{e.name}</option>;
                                })}
                            </Form.Select>
                            <Form.Control.Feedback type='invalid' >
                                {errors.products}
                            </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='col-md-12 w-50'>
                        <Form.Label className='form-label' > Tipo de Embalaje </Form.Label>
                            <Form.Select id='embalaje' className='form-control' onChange={e => setField('embalaje', e.target.value)} isInvalid={!!errors.embalaje} >
                                {EmbalajeData.map((e, key) => {
                                    return <option key={key}>{e.name}</option>;
                                })}
                            </Form.Select>
                            <Form.Control.Feedback type='invalid' >
                                {errors.embalaje}
                            </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='col-md-14 w-100'>
                        <Form.Label className='form-label' > Descripción de los Productos </Form.Label>
                            <textarea id='prodDescription' row='3' className='form-control' onChange={e => setField('prodDescription', e.target.value)} isInvalid={!!errors.prodDescription} required />
                            <Form.Control.Feedback type='invalid' >
                                {errors.prodDescription}
                            </Form.Control.Feedback>
                    </Form.Group>
                    <SubTitle>Dimensiones del Camion</SubTitle>  
                    <Form.Group className='col-md-2'>
                        <Form.Label className='form-label' >Largo : </Form.Label>
                        <Form.Control id='truckLength' placeholder='Largo' type='number' min='1' className='form-control' onChange={e => setField('truckLength', e.target.value)} isInvalid={!!errors.truckLength} />
                        <Form.Control.Feedback type='invalid' >
                            {errors.truckLength}
                        </Form.Control.Feedback>
                     </Form.Group>  
                     <Form.Group className='col-md-2'>  
                        <Form.Label className='form-label' >Ancho : </Form.Label>
                        <Form.Control id='truckWidth' placeholder='Ancho' type='number' min='1' className='form-control' onChange={e => setField('truckWidth', e.target.value)} isInvalid={!!errors.truckWidth} />
                        <Form.Control.Feedback type='invalid' >
                            {errors.truckWidth}
                        </Form.Control.Feedback>
                    </Form.Group>  
                    <Form.Group className='col-md-2'>  
                        <Form.Label className='form-label' >Alto : </Form.Label>    
                        <Form.Control id='truckHeight' placeholder='Alto' type='number' min='1' className='form-control' onChange={e => setField('truckHeight', e.target.value)} isInvalid={!!errors.truckHeight} />
                        <Form.Control.Feedback type='invalid' >
                            {errors.truckHeight}
                        </Form.Control.Feedback>
                    </Form.Group>    
                    <Form.Group className='col-md-2'>
                        <Form.Label className='form-label' >Unidades : </Form.Label>  
                        <Form.Select id='truckUnidades' placeholder='Unidades' className='form-control' onChange={e => setField('truckUnidades', e.target.value)} isInvalid={!!errors.truckUnidades} >
                            {MedidaData.map((e, key) => {
                                return <option key={key}>{e.name}</option>;
                            })}
                        </Form.Select>
                        <Form.Control.Feedback type='invalid' >
                            {errors.truckUnidades}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <SubTitle>Espacio Disponible</SubTitle>
                    <Form.Group className='col-md-2'>
                        <Form.Label className='form-label' >Largo : </Form.Label>
                        <Form.Control id='freeSpaceLength' placeholder='Largo' type='number' min='1' className='form-control' onChange={e => setField('freeSpaceLength', e.target.value)} isInvalid={!!errors.freeSpaceLength} />
                        <Form.Control.Feedback type='invalid' >
                            {errors.freeSpaceLength}
                        </Form.Control.Feedback>
                    </Form.Group>  
                    <Form.Group className='col-md-2'>  
                        <Form.Label className='form-label' >Ancho : </Form.Label>
                        <Form.Control id='freeSpaceWidth' placeholder='Ancho' type='number' min='1' className='form-control' onChange={e => setField('freeSpaceWidth', e.target.value)} isInvalid={!!errors.freeSpaceWidth} />
                        <Form.Control.Feedback type='invalid' >
                            {errors.freeSpaceWidth}
                        </Form.Control.Feedback>
                    </Form.Group> 
                    <Form.Group className='col-md-2'>    
                        <Form.Label className='form-label'>Alto : </Form.Label>
                        <Form.Control id='freeSpaceHeight' placeholder='Alto' type='number' min='1' className='form-control' onChange={e => setField('freeSpaceHeight', e.target.value)} isInvalid={!!errors.freeSpaceHeight} />
                        <Form.Control.Feedback type='invalid' >
                            {errors.freeSpaceHeight}
                        </Form.Control.Feedback>
                    </Form.Group> 
                    <Form.Group className='col-md-2'>   
                        <Form.Label className='form-label' >Unidades : </Form.Label>
                        <Form.Select id='freeSpaceUnidades' placeholder='Unidades' className='form-control' onChange={e => setField('freeSpaceUnidades', e.target.value)} isInvalid={!!errors.freeSpaceUnidades} >
                            <option>{""}</option>
                            <option>{unity}</option>   
                        </Form.Select>
                        <Form.Control.Feedback type='invalid' > 
                            {errors.freeSpaceUnidades}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='col-md-4 w-100'>
                        <Form.Label className='form-label' > Restricciones del Envío </Form.Label>
                            <textarea id='restrictions' row='3' className='form-control' onChange={e => setField('restrictions', e.target.value)} isInvalid={!!errors.restrictions} required />
                            <Form.Control.Feedback type='invalid' >
                                {errors.restrictions}
                            </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='col-md-4' >
                        <Form.Label id='publiImg' className='form-label' > Imagen Publicación </Form.Label>
                        <Input7 type="file" accept="image/png, image/jpeg, image/jpg"  onChange={archivoMandler} />
                        {loading ? <Spinner/> : ""}
                    </Form.Group>
                    <Form.Group>
                        <Input type='submit' value='PUBLICAR' ></Input>
                    </Form.Group> 
            </Form1>
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

const Input7 = styled.input`
    margin: 2vh;
   
    
`

const Form1 = styled(Form)`
    max-width: 70vw;  
`

const Input = styled.input`
   background: rgb(249, 249, 249);
   border: 1px solid #f9f9f9;
   padding: 8px 16px;
   margin: 1vw 1vh;
   border-radius: 4px;
   letter-spacing: 1.5px;
   text-transform: uppercase;
   transition: all 0.2s ease 0s;
   cursor: pointer;
   &:hover {
       background: rgb(198, 198, 198);
       color: #000;
       border-color: transparent;
   }
`