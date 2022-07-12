import {useState} from 'react'

import Mensaje from './Mensaje'

const NuevoPresupuesto = ({presupuesto, setPresupuesto, setIsValidPresupuesto}) => {

  const [mensaje, setMensaje] = useState('')

  const handlePresupuesto = (e) => {
      e.preventDefault();

      // console.log(Number(presupuesto))

      if(!Number(presupuesto) || Number(presupuesto) < 0){
        setMensaje('No es un presupuesto valido')
        return;
      }
      setMensaje('')
      setIsValidPresupuesto(true)

  }


  return (
    <div className="contenedor-presupuesto contenedor sombra">
        <form className="formulario" onSubmit={handlePresupuesto}>
            <div className="campo">
                <label htmlFor="">Definir Presupuesto</label>

                <input 
                    type="number" 
                    className="Nuevo-presupuesto"
                    value={presupuesto}
                    placeholder="Anade tu presupuesto"
                    onChange={ e => setPresupuesto(Number(e.target.value))}
                />
            </div>

            <input type="submit" value="Añadir" />


            {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}
        </form>
    </div>
  )
}

export default NuevoPresupuesto