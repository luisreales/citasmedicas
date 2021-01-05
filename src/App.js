import React, {Fragment,useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita'


function App(){

    //Citas en LocalStorage, JsonParse arreglo a string
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));

    if(!citasIniciales){
        citasIniciales = []
    }

    //Arreglo de citas las que se van guardando
    const [citas, guardarCitas] = useState([]);    

    //Use Effect para realizar ciertas operaciones cuando el state cambia
    //useEffect siempre es un arrowfunction, es como el primer metodo que se ejecuta al cargar y cuando el componente cambia
    //para que useEffect se ejecute una sola vez hay que pasarle un array vacio, se le conoce como dependencias
    //cada vez que cambie el state de citas el reacciona
    //componentDidMount  o componenteDidUpdate

    useEffect( () => {
        console.log('documento listo o paso algo con las citas');

        //guardar las citas en el localstorage
        // convertidor de array a string JSON.stringify
        if(citasIniciales){
            localStorage.setItem('citas',JSON.stringify(citas));
        }else{
            localStorage.setItem('citas',JSON.stringify([]));
        }

    },[citas,citasIniciales]);


    //Funcion que se comunica con el componente formulario para guardar las citas, recibe la cita que se crea en el 
    //componente del formulario
    const crearCita = cita => {
        //console.log('desde crear cita',cita)
        guardarCitas([
            ...citas,
            cita
        ]);
    }

    //Funcion para eliminar cita
    const eliminarCita = id => {
        console.log(id)
        const filterCita = citas.filter( item => item.id !== id);
        guardarCitas(filterCita)
        
    }

    //Mensaje condicional si hay citas o no
    const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';

    return(
        <Fragment>
            <h1>Administrador de Pacientes</h1>
            <div className="container">
                <div className="row">
                    <div className="one-half column">
                        <Formulario crearCita={crearCita} />
                    </div>
                    <div className="one-half column">
                        <h2>{titulo}</h2>
                        {
                            citas.map(cita => (
                                <Cita 
                                    key={cita.id}
                                    cita={cita} 
                                    eliminarCita={eliminarCita}

                                />
                                
                            ))
                        }
                    </div>
                </div>
            </div>
        </Fragment>
        
    );
}

export default App;