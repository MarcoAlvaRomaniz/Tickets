import React, { useState, useEffect } from "react";
import axios from "axios";
import debounce from 'lodash.debounce';
import Swal from 'sweetalert2';

function Usuarios() {
  const [rol, setRol] = useState("");
  const [editar, setEditar] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false); // Estado para mostrar/ocultar el formulario
  const [empleadosList, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [usuario, setUsuario] = useState({
    nombre: '',
    edad: '',
    cargo: '',
    anios: '',
    rol: '',
    status: ''
  });

  useEffect(() => {
    getEmpleados();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const add = () => {
    if (usuario.nombre && usuario.status && usuario.edad && usuario.anios && usuario.cargo) {
      axios.post("http://localhost:3000/api/v1/users/", usuario)
        .then(() => {
          Swal.fire({
            title: "<strong>Registro Exitoso</strong>",
            html: `<i>El Usuario ${usuario.nombre} fue registrado con éxito</i>`,
            icon: 'success',
            timer: 1000
          });
          getEmpleados();
          limpiarCampos();
          setMostrarFormulario(false); // Ocultar el formulario después de agregar
        }).catch((error) => {
          console.error("Error al crear usuario:", error);
        });
    } else {
      alert("Por favor complete todos los campos.");
    }
  };

  const update = () => {
    console.log(usuario)
    if (usuario.nombre && usuario.status && usuario.edad && usuario.anios && usuario.cargo) {
      axios.patch(`http://localhost:3000/api/v1/users/${usuario.id}`, usuario)
        .then(() => {
          Swal.fire({
            title: "<strong>Registro Exitoso</strong>",
            html: `<i>El Usuario ${usuario.nombre} fue actualizado con éxito</i>`,
            icon: 'success',
            timer: 1000
          });
          getEmpleados();
          limpiarCampos();
          setMostrarFormulario(false); // Ocultar el formulario después de actualizar
        }).catch((error) => {
          console.error("Error al actualizar usuario:", error);
        });
    } else {
      limpiarCampos();
      getEmpleados();
      alert("Por favor complete todos los campos.");
    }
  };

  const limpiarCampos = () => {
    setUsuario({
      nombre: '',
      edad: '',
      cargo: '',
      anios: '',
      status: ''
    });
    setEditar(false);
  };

  const editarUsuario = (val) => {
    setEditar(true);
    setUsuario(val);
    setMostrarFormulario(true); // Mostrar el formulario en modo edición
  };

  const getEmpleados = debounce(() => {
    setLoading(true);
    axios.get("http://localhost:3000/api/v1/users/")
      .then((response) => {
        const data = response.data.data;
        if (Array.isArray(data)) {
          setEmpleados(data);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error al obtener empleados:", error);
      });
  }, 300);

  return (
    <div>
      <h2 className="fs-4">Gestión de Usuarios</h2>

      {/* Botones para mostrar el formulario */}
      {!mostrarFormulario && (
        <div className="mb-3">
          <button className='btn btn-primary' onClick={() => { setMostrarFormulario(true); setEditar(false); limpiarCampos(); }}>
            Nuevo
          </button>
          <button className='btn btn-success' onClick={getEmpleados}>Listar</button>
        </div>
      )}

      {/* Formulario */}
      {mostrarFormulario && (
        <div>
          <div className="input-group mb-1">
            <span className="input-group-text fs-6" id="nombre">Nombre:</span>
            <input
              name="nombre"
              onChange={handleChange}
              type="text"
              className="form-control"
              placeholder="Nombre"
              aria-label="nombre"
              aria-describedby="nombre"
              value={usuario.nombre} />
          </div>
          <div className="input-group mb-1">
            <span className="input-group-text fs-6" id="edad">Edad:</span>
            <input
              name="edad"
              onChange={handleChange}
              type="text"
              className="form-control"
              placeholder="Edad"
              aria-label="edad"
              aria-describedby="edad"
              value={usuario.edad} />
          </div>
          <div className="input-group mb-1">
            <span className="input-group-text fs-6" id="cargo">Cargo:</span>
            <input
              name="cargo"
              onChange={handleChange}
              type="text"
              className="form-control"
              placeholder="Cargo"
              aria-label="cargo"
              aria-describedby="cargo"
              value={usuario.cargo} />
          </div>
          <div className="input-group mb-1">
            <span className="input-group-text fs-6" id="anios">Experiencia:</span>
            <input
              name="anios"
              onChange={handleChange}
              type="text"
              className="form-control"
              placeholder="Años de Experiencia"
              aria-label="anios"
              aria-describedby="anios"
              value={usuario.anios} />
          </div>
          <div className="input-group mb-1">
            <span className="input-group-text fs-6" id="status">Estatus:</span>
            <select
              name="status"
              onChange={handleChange}
              className="form-control"
              aria-label="status"
              aria-describedby="status"
              value={usuario.status}>
              <option value="">Selecciona un estatus</option>
              <option value="Activo">Activo</option>
              <option value="Baja">Baja</option>
            </select>
          </div>
          <div>
            {editar ?
              <div>
                <button className='btn btn-success fs-6' onClick={update}>Actualizar</button>
                <button className='btn btn-info fs-6' onClick={() => setMostrarFormulario(false)}>Cancelar</button>
              </div> :
              <button className='btn btn-success' onClick={add}>Registrar</button>
            }
          </div>
        </div>
      )}

      {/* Lista de empleados */}
      {loading ? <p>Cargando...</p> : (
        <div>
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
              {empleadosList.map((val) => (
                <tr key={val.id}>
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
        </div>
      )}
    </div>
  );
}

export default Usuarios;

