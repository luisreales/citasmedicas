import React,{Fragment,useState} from 'react'
import uuid from 'uuid/dist/v1'
import PropTypes from 'prop-types';

//se aplica destructuring con la funcion crearCita que se recibe del componente principal
const Formulario = ({crearCita}) => {

    //Crear State de Citas
    const [cita,actualizarCita] = useState({
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''


    })

    //Creamos un state para el manejo del mensaje de errores

    const [error, actualizarError] = useState(false);



    /*
    Definimos un arrow function para actulizar el state de la cita
    */

    const actualizarState = (e) => {

      

        //actualizamos el valor del state del hook, para cada valor del objeto
        //Esto es un destructuring, es decir sacar los valores para asignar al objeto
        //hay que pasar una copia de la cita, usando spreed ... operator  (...cita)
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        })

    }

    //Extraer los valores del formulario utilizando destruturing al objeto
    //y despues se utiliza en el value de cada campo

    const{mascota, propietario,fecha,hora,sintomas} = cita;

    const submitCita = (e) => {  
        //Cancela el evento si este es cancelable, sin detener el resto del funcionamiento del evento     
        //evitar que haga post sin antes validar
        e.preventDefault();
        
        //validar
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '' ){
            console.log('error validacion')
            //actualizamos el state del error
            actualizarError(true);
            return;
        }else{
            actualizarError(false)
        }

        //Generar ID Cita, es necesario agregar el paquete uuid
        //npm i uuid
        cita.id = uuid();

        //Creamos la cita, funcion que viene del componente principal
        crearCita(cita);

        //reiniciar los campos
        actualizarCita({
            mascota:'',
            propietario:'',
            fecha:'',
            hora:'',
            sintomas:''
        })


    }

    return ( 
        <Fragment>
           <h2>Crear Cita</h2>

           { error ?  <p className="alerta-error">Todos los campos son obligatorios</p>: null}

           <form 
                onSubmit={submitCita}
           >
               <label>Nombre Mascota</label>
               <input 
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="nombre de mascota"
                    onChange={actualizarState}
                    value={mascota}
                />
                <label>Nombre Dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Dueño"
                    onChange={actualizarState}
                    value={propietario}
                />

                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                    
                />

                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                    
                />
                <label>Sintomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                    value={sintomas}
                >

                </textarea>
                <button type="submit" className="u-full-width button-primary" >Agregar Cita</button>
           </form>

        </Fragment>
        

        

     );
} 

//propTypes permite identificar el tipo de objeto que se envia en el componente
//si es de tipo funcion, string, bool
//proptype permite hacer un typecheck de las funciones
Formulario.propTypes = {
    crearCita:PropTypes.func.isRequired
}

export default Formulario;