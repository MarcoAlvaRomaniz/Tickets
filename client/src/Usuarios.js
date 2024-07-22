import React, { useState, useEffect } from "react";
import Axios from "axios";
import debounce from 'lodash.debounce';
import Swal from 'sweetalert2';

function Usuarios() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState(0);
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState(0);
  const [id, setID] = useState("");
  const [status, setStatus] = useState("");
  const [rol, setRol] = useState("");
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
        edad: edad,
        status: status,        
        anios: anios,
        cargo: cargo,
        rol:rol
      }).then(() => {
        alert("Usuario Creado con éxito");        
        getEmpleados();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Registro Exitoso</strong>",
          html: `<i>El Usuario ${nombre} fue registrado con éxito</i>`,
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
        id: id,
        nombre: nombre,
        status: status,
        edad: edad,
        anios: anios,
        cargo: cargo
      }).then(() => {
        getEmpleados();
        limpiarCampos();
        Swal.fire({
            title: "<strong>Registro Exitoso</strong>",
            html: `<i>El Usuario ${nombre} fue actualizado con éxito</i>`,
            icon: 'success',
            timer: 1000
        })
      }).catch((error) => {
        console.error("Error al crear usuario:", error);
      });
    } else {
      limpiarCampos();
      getEmpleados();      
      alert("Por favor complete todos los campos.");
    }
  };
  const limpiarCampos = () => {
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
    <div>
      <h2>Gestión de Usuarios</h2>
      <div className="input-group mb-1">
        <span className="input-group-text" id="nombre">Nombre:</span>
        <input
          onChange={(event) => setNombre(event.target.value)}
          type="text" className="form-control" placeholder="Nombre" aria-label="nombre" aria-describedby="nombre" value={nombre}/>
      </div>
      <div className="input-group mb-1">
        <span className="input-group-text" id="edad">Edad:</span>
        <input
          onChange={(event) => setEdad(event.target.value)}
          type="text" className="form-control" placeholder="Edad" aria-label="edad" aria-describedby="edad" value={edad}/>
      </div>
      <div className="input-group mb-1">
        <span className="input-group-text" id="cargo">Cargo:</span>
        <input
          onChange={(event) => setEdad(event.target.value)}
          type="text" className="form-control" placeholder="Cargo" aria-label="cargo" aria-describedby="cargo" value={cargo}/>
      </div>
      <div className="input-group mb-1">
        <span className="input-group-text" id="anios">Experiencia:</span>
        <input
          onChange={(event) => setAnios(event.target.value)}
          type="text" className="form-control" placeholder="Años de Experiencia" aria-label="anios" aria-describedby="anios" value={anios}/>
      </div>
      <div className="input-group mb-1">
        <span className="input-group-text" id="status">Estatus:</span>
        <select
          onChange={(event) => setStatus(event.target.value)}
          type="text" className="form-control" placeholder="Estatus del usuario" aria-label="status" aria-describedby="status" value={status}>
            <option value="">Selecciona un estatus</option>
            <option value="Activo">Activo</option>
            <option value="Baja">Baja</option>
        </select>
      </div>
      <div>
        {editar ? 
          <div>
            <button className='btn btn-success' onClick={update}>Actualizar</button>
            <button className='btn btn-info' onClick={limpiarCampos}>Cancelar</button>
          </div> : 
          <button className='btn btn-success' onClick={add}>Registrar</button>
        }
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
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {empleadosList.map((val, key) => (
                <tr className='' key={val.id}>
                  <td>{val.nombre}</td>
                  <td>{val.edad}</td>
                  <td>{val.status}</td>
                  <td>{val.cargo}</td>
                  <td>{val.anios}</td>
                  <td>
                    <div className="d-grid gap-2 d-md-block">
                      <button className="btn btn-dark" type="button" onClick={() => editarUsuario(val)}>Editar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Usuarios;
