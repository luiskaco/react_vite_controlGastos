import React from 'react'

// Compontes
import Gasto from './Gasto'

const ListadoGasto = ({gastos, setGastoEditar, eliminarGasto, filtro, gastosFiltrado}) => {
  return (
    <div className='listado-gastos contenedor'>
     

        {
           filtro ? 
              (
               <> 
                  <h2>{gastosFiltrado.length ? 'Gastos' : 'No Hay Gastos aún'}</h2>
                  {
                     gastosFiltrado.map(gasto => (
                      <Gasto 
                            key={gasto.id}
                            gasto={gasto}
                            setGastoEditar={setGastoEditar}
                            eliminarGasto={eliminarGasto}
                        />
                    ))
                  }
               </>
              ) 
          : 
              ( 
                <>
                  <h2>{gastos.length ? 'Gastos' : 'No Hay Gastos aún'}</h2>  
                  {gastos.map(gasto => (
                      <Gasto 
                          key={gasto.id}
                          gasto={gasto}
                          setGastoEditar={setGastoEditar}
                          eliminarGasto={eliminarGasto}
                      />
                  ))}
                </>
              )
        }

    </div>
  )
}

export default ListadoGasto