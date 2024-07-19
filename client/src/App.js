import './App.css';
import { useState, useEffect } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import debounce from 'lodash.debounce';

import Swal from 'sweetalert2'




function App() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState(0);
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState(0);
  const [id, setID] = useState("");
  const [status,setStatus]= useState("");
  const [rol,setRol] = useState("");
  const [editar, setEditar] = useState(false);
  const [empleadosList, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    getEmpleados();
  }, []);

  const add = () => {
    if (nombre && status && edad && anios && cargo && rol) {
      Axios.post("http://localhost:3000/api/v1/users/", {
        nombre: nombre,
        status: status,
        edad: edad,
        anios: anios,
        cargo: cargo
      }).then(() => {
        alert("Usuario Creado con éxito");
        getEmpleados();
        limpiarCampos();
        Swal.fire({
          tittle: "<strong>Registro Exitoso</strong>",
          html:`<i>El Usuario ${nombre} fué registrado con exito</i>`,
          icon: 'success',
          timer: 1000
        })
      }).catch((error) => {
        console.error("Error al crear usuario:", error);
      });
    } else {
      alert("Por favor complete todos los campos.");
    }
  };

  const update = () => {
    if (nombre && status && edad && anios && cargo) {
      Axios.patch(`http://localhost:3000/api/v1/users/${id}`, {
        id:id,
        nombre: nombre,
        status: status,
        edad: edad,
        anios: anios,
        cargo: cargo
      }).then(() => {
        getEmpleados();
      }).catch((error) => {
        console.error("Error al crear usuario:", error);
      });
    } else {
      limpiarCampos();
      getEmpleados();      
      alert("Por favor complete todos los campos.");
    }
  };
const limpiarCampos = ()=>{
  setAnios("");
  setNombre("");
  setCargo("");
  setEdad("");
  setStatus("");
  setID("");
  setEditar(false);
}
  const editarUsuario = (val) => {
    setEditar(true);
    setNombre(val.nombre);
    setEdad(val.edad);
    setStatus(val.status);
    setCargo(val.cargo);
    setAnios(val.anios);
    setID(val.id);
  };

  const getEmpleados = debounce(() => {
    setLoading(true);
    Axios.get("http://localhost:3000/api/v1/users/")
      .then((response) => {
        const data = response.data.data;
        if (Array.isArray(data)) {
          setEmpleados(data);
        } else {
          console.log("La respuesta no es un array");
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          console.log('Error data:', error.response.data.data);
        } else if (error.request) {
          console.log('Error request:', error.request);
        } else {
          console.log('Error Config:', error.config);
        }
      });
  }, 300);

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">
          Gestión de Usuarios
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre:</span>
            <input
              onChange={(event) => setNombre(event.target.value)}
              type="text" className="form-control" placeholder="Nombre" aria-label="nombre" aria-describedby="basic-addon1" value={nombre}/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Edad:</span>
            <input
              onChange={(event) => setEdad(event.target.value)}
              type="text" className="form-control" placeholder="Edad" aria-label="edad" aria-describedby="basic-addon1" value={edad}/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Status:</span>
            <input
              onChange={(event) => setStatus(event.target.value)}
              type="text" className="form-control" placeholder="Pais" aria-label="pais" aria-describedby="basic-addon1" value={status} />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Cargo:</span>
            <input
              onChange={(event) => setCargo(event.target.value)}
              type="text" className="form-control" placeholder="Cargo" aria-label="pais" aria-describedby="basic-addon1" value={cargo}/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Años:</span>
            <input
              onChange={(event) => setAnios(event.target.value)}
              type="text" className="form-control" placeholder="Años" aria-label="pais" aria-describedby="basic-addon1" value={anios} />
          </div>
        </div>
        <div className="card-footer text-body-secondary">
          {
            editar==true?
            <div>
              <button className='btn btn-success' onClick={update}>Actualizar</button>
              <button className='btn btn-info' onClick={limpiarCampos}>Cancelar</button>
            </div>
            :<button className='btn btn-success' onClick={add}>Registrar</button>
          }
          <br></br>
          <button className='btn btn-success' onClick={getEmpleados}>Listar</button>
          {loading ? <p>Cargando...</p> : (
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Edad</th>
                  <th scope="col">Status</th>
                  <th scope="col">Cargo</th>
                  <th scope="col">Experiencia</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {empleadosList.map((val, key) => {
                  return (
                    <tr className='' key={val.id}>
                      <td>{val.nombre}</td>
                      <td>{val.edad}</td>
                      <td>{val.status}</td>
                      <td>{val.cargo}</td>
                      <td>{val.anios}</td>
                      <td>
                        <div className="d-grid gap-2 d-md-block">
                          <button className="btn btn-dark" type="button"                           
                          onClick={() =>{
                            editarUsuario(val);
                          }}
                          >Editar</button>
                          <button className="btn btn-danger"
                            onClick={limpiarCampos}
                           type="button">Eliminar</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

