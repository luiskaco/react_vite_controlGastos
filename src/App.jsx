import { useState , useEffect} from 'react'

// Funciones
import {generarID} from './Helper'

// resource
import IconoNuevoGasto from './img/nuevo-gasto.svg'

//compoents
import Header from './components/Header'
import Modal from './components/Modal'
import ListadoGasto from './components/ListadoGasto'
import Filtros from  './components/Filtros'
// import { object } from 'prop-types'


function App() {

  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )

  const [presupuesto, setPresupuesto] = useState(

        Number(localStorage.getItem('presupuesto' ?? 0 )) // Si no existe lo agregamos en 0
        
  )

  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [modal, setModal]= useState(false)

  const [animarModal, setAnimarModal]= useState(false)

  const [gastoEditar, setGastoEditar] = useState([])

  const [filtro, setFiltro] = useState('')
  const [gastosFiltrado, setGastoFiltrado] = useState([])


  useEffect(() => {
        // Editar
        if(Object.keys(gastoEditar).length > 0){

            //console.log('Desde Editar tiene algo')

            // llamado de modal
            setModal(true)

            setTimeout(() => {
                setAnimarModal(true)
            }, 300)
        }

  }, [gastoEditar])


  // Use Para monitrear el presupuesto
  useEffect(() => {
    // console.log(presupuesto)

    localStorage.setItem('presupuesto', presupuesto ?? 0)

  }, [presupuesto])


  useEffect(() => {
        localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])  
        // En local storage se guarda como string

  },[gastos])


  // Cambios en filtro
    useEffect(() => {
        if(filtro){

            // filtrar gasto por categoria
            const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)

            // nota< no podemos cambiar el estado de gasto porque perdemos la referencia
            setGastoFiltrado(gastosFiltrados)
          
        }
    }, [filtro])

  // end filtro


  // Validando exitencia de presupuesto
  useEffect(() => {
        const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;

        // console.log(presupuestoLS)
        if(presupuestoLS > 0) {
            //mostramos el componente de gasto
            setIsValidPresupuesto(true)
        }
    
  }, [])



  
 // Mostrar modal
  const handleNuevoGasto = () => {
    setModal(true)
    // reiniciar gasto editar
    setGastoEditar({})
        // end
    setTimeout(() => {
        setAnimarModal(true)
    }, 300)

  }

  // Guardamos gasto
  const guardarGasto = gasto => {
  
    if(gasto.id){
        // Actualizar
        const gastoActualizado = gastos.map(gastostate => gastostate.id === gasto.id ? gasto : gastostate)

        // guardamso
        setGastos(gastoActualizado)
        //Reseteamos
        setGastoEditar({})
        
    }else{
        // Nuevo gasto

        gasto.fecha = Date.now();
        gasto.id = generarID();
        setGastos([...gastos, gasto])
    }

    // cerrar modal
    setAnimarModal(false)

    setTimeout(() => {
        setModal(false)
    }, 500)
  }


  const eliminarGasto = id => {

      const gastosActualizados = gastos.filter(gasto => gasto.id !== id)

     // Actualizamos
    setGastos(gastosActualizados)
    //   console.log(gastosActualizados)
  }



  return (
      <div className={modal ? 'fijar' : ''}>
         <Header 
              gastos={gastos}
              setGastos={setGastos}
              presupuesto={presupuesto}
              setPresupuesto={setPresupuesto}
              isValidPresupuesto={isValidPresupuesto}
              setIsValidPresupuesto={setIsValidPresupuesto}
         />
        
        {isValidPresupuesto && (
        
            <>
                <main>
                    <Filtros 
                        filtros={filtro}
                        setFiltro={setFiltro}
                    />
                    <ListadoGasto 
                        gastos={gastos}
                        setGastoEditar={setGastoEditar}
                        eliminarGasto={eliminarGasto}

                        filtro={filtro}
                        gastosFiltrado={gastosFiltrado}
                    />

                </main>

                <div className='nuevo-gasto'>
                      <img 
                          src={IconoNuevoGasto} 
                          alt="Icono nuevo gasto" 
                          onClick={handleNuevoGasto}
                      
                      />
                </div>
            </>
        
         
         )}

         {modal && <p> <Modal
                        setModal={setModal} 
                        animarModal={animarModal} 
                        setAnimarModal={setAnimarModal}  
                        guardarGasto={guardarGasto} 

                        // Gasto editar
                        gastoEditar={gastoEditar}
                        setGastoEditar={setGastoEditar}
                      /> 
                      </p>}
   
      </div>
  )
}

export default App
