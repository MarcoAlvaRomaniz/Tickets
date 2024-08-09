import React, { useState, useEffect}  from "react";
import axios from "axios";
import { debounce } from "lodash";
import Swal from 'sweetalert2';

function Usuarios(){
    const [rol, setRol] = useState("");
    const [editar, setEditar] = useState(false);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [usuariosList, setUsuarios]=useState([]);
    const [loading, setLoading] = useState(false);
    const [usuario, setUsuario] =useState({
        nombre:'',
        status:'',
        gerencia:'',
        telefono:'',
        correo:'',
        puesto:''
    });
    useEffect(()=>{
        getUsuarios();
    },[]);
    

    const handleChange = (e)=>{
        const { name, value } = e.target;
        setUsuario({...usuario, [name]:value});
    };

    const add = () =>{
        if(usuario.nombre && usuario.status && usuario.correo ){
            axios.post("http://localhost:3000/api/v1/users/",usuario)
            .then(()=>{
                Swal.fire({
                    title:"<strong>Registro Exitoso</strong>",
                    html:`<i>El usuario ${usuario.nombre} fué registrado con éxito</i>`,
                    icon:'success',
                    timer: 1000
                });
                getUsuarios();
                limpiarCampos();
                setMostrarFormulario(false);
            });
        }else{
            alert("Por favor complete todos los campos");
        }   
    };

    const update=() =>{
        console.log(usuario);
        if(usuario.nombre && usuario.status){
            axios.patch(`http://localhost:3000/api/v1/users/${usuario.id}`,usuario)
            .then(()=>{
                Swal.fire({
                    title:"<strong>Actualizacion exitosa</strong>",
                    html:`<i>El usuarios ${usuario.nombre} Se actualizo con éxito</i>`,
                    icon:'success',
                    timer: 1000
                });
                getUsuarios();
                limpiarCampos();
                setMostrarFormulario(false);
            }).catch((error)=>{
                console.error("Error al actualizar el usuario", error);
            })
        }else{
            limpiarCampos();
            getUsuarios();
            alert("Por favor complete todos los campos");
        }
    };

    const limpiarCampos = () =>{
        setUsuario({
            nombre:'',
            status:'',
            gerencia:'',
            telefono:'',
            correo:'',
            puesto:''

        });
        setEditar(false);
        setMostrarFormulario(false);
    };
    const editarUsuario = (val) => {
        setEditar(true);
        setUsuario(val);
        setMostrarFormulario(true);
    };

    const getUsuarios = debounce(()=>{
        setLoading(true);
        axios.get("http://localhost:3000/api/v1/users/")
        .then((response) => {
            const data = response.data.data;
            if(Array.isArray(data)){
                setUsuarios(data);
            }
            setLoading(false);
        }).catch((error) => {
            setLoading(false);
            console.error("Error al obtener los usuarios",error);
        });
    },300);
    
    return(
        <div>
            <h2 className = "fs-4">
                Gestion de Usuarios
            </h2> 
            {/* botones para mostrar el formulario*/}
            {!mostrarFormulario && (
                <div className="mb-3">
                    <button className="btn btn-primary"
                    onClick={()=>{
                        setMostrarFormulario(true);
                        setEditar(false);
                    }}
                    >Nuevo</button>
                </div>
            )}
            {mostrarFormulario && (
                <div>
                    <div className="input-group mb-1">
                        <span className="input-group-text fs-6"
                        id = "nombre">
                            Nombre:
                        </span>
                        <input
                            type="text"
                            name="nombre"
                            className="form-control"
                            placeholder="Escriba el nombre completo"
                            aria-label="nombre"
                            aria-describedby="nombre"
                            onChange={handleChange}
                            value={usuario.nombre}
                         />
                    </div>
                    <div className="input-group mb-1">
                        <span className="input-group-text fs-6"
                        id = "nombre">
                            Gerencia:
                        </span>
                        <select
                            type="text"
                            name="gerencia"
                            className="form-control"
                            placeholder="Escriba la gerencia del usuario"
                            aria-label="gerencia"
                            aria-describedby="gerencia"
                            onChange={handleChange}
                            value={usuario.gerencia}
                            >
                            <option value = "">Selecciones una Gerencia</option>
                            <option value = "Tecnico"> Tecnico</option>
                            <option value = "Comercial"> Comercial</option>
                            <option value = "Servicio"> Servicio</option>
                            <option value = "Proyectos"> Proyectos</option>
                            <option value = "Direccion"> Direccion</option>
                            <option value = "Administracion"> Administracion</option>
                        </select>
                    </div>
                    <div className="input-group mb-1">
                        <span className="input-group-text fs-6"
                        id = "nombre">
                            Teléfono:
                        </span>
                        <input
                            type="text"
                            name="telefono"
                            className="form-control"
                            placeholder="Escriba el teléfono del usuario"
                            aria-label="telefono"
                            aria-describedby="telefono"
                            onChange={handleChange}
                            value={usuario.telefono}
                         />
                    </div>
                    <div className="input-group mb-1">
                        <span className="input-group-text fs-6"
                        id = "nombre">
                            Correo:
                        </span>
                        <input
                            type="mail"
                            name="correo"
                            className="form-control"
                            placeholder="correo@"
                            aria-label="correo"
                            aria-describedby="correo"
                            onChange={handleChange}
                            value={usuario.correo}
                         />
                    </div>
                    <div className="input-group mb-1">
                        <span className="input-group-text fs-6"
                        id = "nombre">
                            Estatus:
                        </span>
                        <select
                            type="text"
                            name="status"
                            className="form-control"
                            placeholder="seleccione el estatus del usuario"
                            aria-label="status"
                            aria-describedby="status"
                            onChange={handleChange}
                            value={usuario.status}
                         >
                            <option value="">Seleccione un estatus</option>
                            <option value="Activo">Activo</option>
                            <option value="Baja">Baja</option>

                        </select>
                    </div>
                    <div>

                        {editar ?
                        <div>
                            <button 
                            className="btn btn-success fs-6"
                            onClick={update}
                            >
                                Actualizar
                            </button>
                            <br/>
                            
                        </div>
                        :
                        <button
                        className="btn btn-success"
                        onClick={add}
                        >
                            Registrar
                        </button>
                        }
                        <br/>
                        <br/>
                        <button 
                            className="btn btn-danger"
                            onClick={limpiarCampos}
                        >
                                Cancelar
                        </button>
                    </div>
                </div>
            )}
            {/**listar Usuarios */}
            {loading ? <p>Cargando registros ...</p>:(
                <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">
                                    Nombre
                                </th>
                                <th scope="col">
                                    Correo
                                </th>
                                <th scope="col">
                                    Gerencia
                                </th>
                                <th scope="col">
                                    Telefono
                                </th>
                                <th scope="col">
                                    Estatus
                                </th>
                                <th scope="col">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuariosList.map((val)=>(
                               <tr key={val.id}>
                                <td>{val.nombre}</td>
                                <td>{val.correo}</td>
                                <td>{val.gerencia}</td>
                                <td>{val.telefono}</td>
                                <td>{val.status}</td>
                                <td>
                                    <div className="d-grid gap-2 d-md-block">
                                        <button
                                        type="button"
                                        className="btn btn-dark"
                                        onClick={()=>editarUsuario(val)}
                                        >
                                            Editar
                                        </button>
                                    </div>
                                </td>
                               </tr> 
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
export default Usuarios;