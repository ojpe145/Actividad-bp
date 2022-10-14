import React from 'react'

const Variables = () => {
    
    const imagen = 'https://picsum.photos/300'
    const texto_alt = 'Esto es una imagen aleatoria de picsum'
  return (
    <div>
        
        <img src={imagen} alt={texto_alt} />
    </div>
  )
}

export default Variables