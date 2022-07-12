import {useState, useEffect} from 'react'

// Component 
import Mensaje from './Mensaje'

//resource
import CerrarBTn from '../img/cerrar.svg'


const Modal = ({animarModal, setAnimarModal, setModal, guardarGasto, gastoEditar, setGastoEditar}) => {

  const [mensaje, setMensaje] = useState('')

  const [nombre, setNombre] = useState("")
  const [cantidad, setCantidad] = useState(0)
  const [categoria, setCategoria] = useState("")
  const [fecha, setFecha] = useState("")

  // identificar si guardamos o editamos
  const [id, setId] =useState('')


 // Proceso de editar
 useEffect(() => {
   // Editar
    if(Object.keys(gastoEditar).length > 0){
    //          
          // Rellenar campos
          setNombre(gastoEditar.nombre)
          setCantidad(gastoEditar.cantidad)
          setCategoria(gastoEditar.categoria)
          setId(gastoEditar.id)
          setFecha(gastoEditar.fecha)
      }
 }, [])

  // Procesos de guardado
  const handleSubmit = e => {
      e.preventDefault();

      if([nombre, cantidad, categoria].includes('')){
        setMensaje('Todos los campos son obligatorios!!!')

        setTimeout(() => {
          setMensaje('')
        }, 3000);
        return;
      }

      guardarGasto({nombre, cantidad, categoria, id, fecha})
   
  }

  const handleOcultarModal = () => {
   
      setAnimarModal(false)

      //Resetear el state
      setGastoEditar({})
      //end reset

      setTimeout(() => {
          setModal(false)
      }, 500)
  }


  return (
    <div className='modal'>
        <div className='cerrar-modal'>
            <img 
                src={CerrarBTn} 
                alt="imagenes de cerrar" 
                onClick={handleOcultarModal}
            
            />
        </div>

        <form 
              onSubmit={handleSubmit}
              className={`formulario ${animarModal ? "animar" : "cerrar" }`}
              
            >
            <legend>{gastoEditar.nombre ? "Editar Gasto":"Nuevo Gastos"}</legend>
            {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}


            <div className='campo'>
                <label htmlFor="nombre">Nombre Gasto</label>

                <input 
                      id="nombre"
                      type="text" 
                      placeholder='Anade el nombre del gasto'
                      value={nombre}
                      onChange={e => setNombre(e.target.value)}

                    />
            </div>

            <div className='campo'>
                <label htmlFor="cantidad">Cantidad del Gasto</label>

                <input 
                      id="cantidad"
                      type="number" 
                      placeholder='Anade cantidad del gasto - Ej. 300'
                      value={cantidad}
                      onChange={e => setCantidad(Number(e.target.value))}

                    />
            </div>

            <div className='campo'>
                <label htmlFor="categoria">Categoria</label>

                <select 
                    name="categoria" 
                    id="categoria"
                    value={categoria}
                    onChange={e => setCategoria(e.target.value)}
                >
                      <option value="">--- Selecionar ---</option>
                      <option value="ahorro">Ahorro</option>
                      <option value="comida">Comida</option>
                      <option value="casa">Casa</option>
                      <option value="gasto">Gasto</option>
                      <option value="ocio">Ocio</option>
                      <option value="salud">Salud</option>
                      <option value="suscripciones">Suscripciones</option>
                </select>
            </div>

            <input type="submit" value={gastoEditar.nombre ? "Guardar Cambios":"Añadir Gasto"} />
        </form>
    </div>
  )
}

export default Modal
