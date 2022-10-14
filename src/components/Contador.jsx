import React, {useState} from 'react'

const Contador = () => {
    const [contador, setContador] = useState(0)

    const aumentar = () => setContador(contador + 1)
    const decrementar = () => setContador(contador - 1)
    const resetear = () => setContador(0)

  return (
    <>
        <hr/>
        <h1>Contador</h1>
        <h1>El valor de la variable contador es: {contador}</h1>
        <h1>
            {
                contador < 0 ? 'Contador es negativo' : 'Contador No es negativo'
            }
        </h1>
        <button onClick={aumentar}>Aumentar</button>
        <button onClick={resetear}>Resetear</button>
        <button onClick={decrementar}>Decrementar</button>


    </>
  )
}

export default Contador