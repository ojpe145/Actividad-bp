import React, {useState, useEffect} from 'react'
import {db} from '../firebase';
import { collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';

    const Formulario = () => {
    const [fruta, setFruta] = useState('')
    const [Nombre, setNombre] = useState('')
    const [Apellido, setApellido] = useState('')
    const [Edad, setEdad] = useState('')
    const [Ciudad, setCiudad] = useState('')
    const [Departamento, setDepartamento] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [listaFrutas, setListaFrutas] = useState([])
    const [modoEdicion, setModoEdicion] = useState(false)
    const [id, setId] = useState('')

    useEffect(()=> {
        const obtenerDatos = async () => {
            try{
                await onSnapshot(collection(db, 'frutas'), (query) => {
                    setListaFrutas(query.docs.map((doc)=>({...doc.data(),id:doc.id})))
                })
            }catch(error){
                console.log(error)
            }
        }
        obtenerDatos();
    },[])

    const guardarFrutas = async (e) =>{
        e.preventDefault()
        try{
            const data = await addDoc(collection(db,'frutas'), {
                nombreFruta: fruta,
                nombreDescripcion:descripcion,
                nombreUsuario:Nombre,
                apellidoUsuario:Apellido,
                ciudadUsuario:Ciudad,
                departamentoUsuario:Departamento,
                edadUsuario:Edad
            })

            setListaFrutas([
                ...listaFrutas,
                {nombreFruta: fruta, nombreDescripcion: descripcion,nombreUsuario:Nombre,apellidoUsuario:Apellido,ciudadUsuario:Ciudad,departamentoUsuario:Departamento,edadUsuario:Edad, id:data.id}
            ])

            setFruta('')
            setDescripcion('')
            setNombre('')
            setApellido('')
            setCiudad('')
            setDepartamento('')
            setEdad('')

        }catch(error){
            console.log(error)
        }
    } 

    const eliminar = async id => {

        try{
            await deleteDoc(doc(db,'frutas', id))
        }catch(error){
            console.log(error)
        }
    }

    const editar = item => {
        setFruta(item.nombreFruta)
        setDescripcion(item.nombreDescripcion)
        setNombre(item.nombreUsuario)
        setApellido(item.apellidoUsuario)
        setCiudad(item.ciudadUsuario)
        setDepartamento(item.departamentoUsuario)
        setEdad(item.edadUsuario)
        setId(item.id)
        setModoEdicion(true)
    }

    const editarFrutas = async e => {
        e.preventDefault();
        try{
            const docRef = doc(db, "frutas", id);
            await updateDoc(docRef, {
                nombreFruta:fruta,
                nombreDescripcion:descripcion,
                nombreUsuario:Nombre,
                apellidoUsuario:Apellido,
                ciudadUsuario:Ciudad,
                departamentoUsuario:Departamento,
                edadUsuario:Edad
            })

            const nuevoArray = listaFrutas.map(
                item => item.id ===id ? {id: id, nombreFruta: fruta, nombreDescripcion: descripcion,nombreUsuario:Nombre,apellidoUsuario:Apellido,ciudadUsuario:Ciudad,departamentoUsuario:Departamento,edadUsuario:Edad,} : item
            )

            setListaFrutas(nuevoArray)
            setFruta('')
            setDescripcion('')
            setNombre('')
            setApellido('')
            setCiudad('')
            setDepartamento('')
            setEdad('')
            setId('')
            setModoEdicion(false)

        }catch(error){
            console.log(error)
        }
    }

    const cancelar = ()=> {
        setModoEdicion(false)
        setFruta('')
        setDescripcion('')
        setNombre('')
            setApellido('')
            setCiudad('')
            setDepartamento('')
            setEdad('')
        setId('')
    }

    return (
      <div className="container mt-5">
          <h1 className="text-center">CRUD BÁSICO BUENAS PRÁCTICAS</h1>
          <hr/>
          <div className="row">
              <div className="col-8">
                  <h4 className="text-center">Listado de Frutas</h4>
                  <ul className="list-group">
                      {
                          listaFrutas.map(item => (
                              <li className="list-group-item" key={item.id}>
                                  <span className='lead'>{item.nombreFruta}-{item.nombreDescripcion}-{item.nombreUsuario}-{item.apellidoUsuario}-{item.ciudadUsuario}-{item.departamentoUsuario}-{item.edadUsuario}</span>
                                  <button className="btn btn-danger btn-sm float-end mx-2" 
                                  onClick={()=> eliminar(item.id)}> Eliminar</button>
                                  <button className="btn btn-warning btn-sm float-end"
                                  onClick={()=>editar(item)}>Editar</button>
                              </li>
                          ))
                      }
                  </ul>
              </div>

              <div className="col-4">
                  <h4 className="text-center">
                      {
                          modoEdicion ? 'Editar Frutas' : 'Agregar Frutas'
                      }
                  </h4>
                  <form onSubmit={modoEdicion ? editarFrutas : guardarFrutas}>
                      <input type="text" 
                      className="form-control mb-2"
                      placeholder='Ingrese Fruta'
                      value = {fruta}
                      onChange={(e)=>setFruta(e.target.value)}
                      />
                       <input type="text" 
                      className="form-control mb-2"
                      placeholder='Ingrese Descripción'
                      value = {descripcion}
                      onChange={(e)=>setDescripcion(e.target.value)}
                      />
                      <input type="text" 
                      className="form-control mb-2"
                      placeholder='Ingrese Nombre'
                      value = {Nombre}
                      onChange={(e)=>setNombre(e.target.value)}
                      />
                      <input type="text" 
                      className="form-control mb-2"
                      placeholder='Ingrese Apellido'
                      value = {Apellido}
                      onChange={(e)=>setApellido(e.target.value)}
                      />
                      <input type="text" 
                      className="form-control mb-2"
                      placeholder='Ingrese Ciudad'
                      value = {Ciudad}
                      onChange={(e)=>setCiudad(e.target.value)}
                      />
                      <input type="text" 
                      className="form-control mb-2"
                      placeholder='Ingrese Departamento'
                      value = {Departamento}
                      onChange={(e)=>setDepartamento(e.target.value)}
                      />
                      <input type="text" 
                      className="form-control mb-2"
                      placeholder='Ingrese Edad'
                      value = {Edad}
                      onChange={(e)=>setEdad(e.target.value)}
                      />
                      {
                          modoEdicion ?
                          (
                            <>
                                <button 
                                className=" btn btn-warning btn-block"
                                on='submit'>Editar</button>
                                <button 
                                className=" btn btn-dark btn-block mx-2"
                                onClick={()=>cancelar()}>Cancelar</button>
                            </>
                          )
                          :
                          <button className=" btn btn-primary btn-block"
                            type='submit'>Agregar</button>
                      }
                    
                      
                  </form>
              </div>
          </div>
      </div>
  )
}

export default Formulario