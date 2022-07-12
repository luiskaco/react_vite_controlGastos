import {useState, useEffect} from 'react'

//Depencia
import { CircularProgressbar , buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({
      gastos,
      setGastos,
      presupuesto,
      setPresupuesto,
      setIsValidPresupuesto
}) => {

  const [porcentaje, setporcentaje] = useState(0)

  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)


  useEffect(() => {
      const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0);

      // Disponible
      const totalDisponible = presupuesto - totalGastado;
      // console.log(totalDisponible)
      setDisponible(totalDisponible)
     
      // Gastado
       // console.log(totalGastado)\
      setGastado(totalGastado);

      // Calcular el procenajte gastado
      const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);
    //   console.log(nuevoPorcentaje)

      setTimeout(() => {
        setporcentaje(nuevoPorcentaje)
      }, 1500)
      
    
  }, [gastos])


  const formatearCantidad = cantidad => {

    return cantidad.toLocaleString("en-US", {style:"currency", currency:"USD"})
    
      // No muta el valor original
  }

  const handleResetApp = () => {
      const resultado = confirm(`Deseas reiniciar presupuesto y gastos`)

      if(resultado) {
          setGastos([])
          setPresupuesto(0)
          setIsValidPresupuesto(false)

      }
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
               <CircularProgressbar
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? '#dc2626' : '#3b82f6',
                        trailColor: '#f5f5f5',
                        textSize: '16px',
                        textColor:porcentaje > 100 ? '#dc2626' : '#3b82f6',
                    })}
                    value={porcentaje}
                    text={`${porcentaje}% Gastado`}
               
               ></CircularProgressbar>
            </div>
            <div className="contenido-presupuesto">
                <button
                  className='reset-app'
                  type='button'
                  onClick={handleResetApp}
                >
                   Resetear App
                </button>
                <p>
                    <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
                </p>
                <p className={`${disponible < 0  ? 'negativo' : ''}`}>
                    <span>Disponible: </span> {formatearCantidad(disponible)}
                </p>
                <p>
                    <span>Gastado: </span> {formatearCantidad(gastado)}
                </p>

            </div>

    </div>
  )
}

export default ControlPresupuesto