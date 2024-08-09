import React,{useState,useEffect} from "react";
import axios from "axios";
import { debounce } from "lodash";
import Swal from "sweetalert2";

function Computadoras(){
    const [editar, setEditar]=useState(false);
    const [mostrarFormulario,setMostrarFormulario]=useState(false);
    const [computadoraslist, setComputadoras]=useState([]);
    const [loading, setLoading] = useState(false);
    const [computadora, setComputadora]=useState({
        marca:'',
        modelo:'',
        serie:'',
        procesador:'',
        discoDuro:'',
        RAM:'',
        windows:'',
        particiones:'',
        dvd:'',
        velocidad:'',
        antivirus:'',
        office:'',
        certificacion:'',
        tipoBateria:'',
        fechaCompra:'',
        compraPriori:''
    });
    const limpiarCampos=()=>{
        setComputadora({
            marca:'',
            modelo:'',
            serie:'',
            procesador:'',
            discoDuro:'',
            RAM:'',
            windows:'',
            particiones:'',
            dvd:'',
            velocidad:'',
            antivirus:'',
            office:'',
            certificacion:'',
            tipoBateria:'',
            fechaCompra:'',
            compraPriori:'',
            status:'',
            asignado:''
        });
        setEditar(false);
        setMostrarFormulario(false);
    };
    // useEffect(()=>{
    //     getComputadoras();
    // },[]);

    return(
        <div>
            <h2 className="fs-3">
                Gestion de Computadoras
            </h2>
            {/** botones para mostrar formulario*/ }
            {!mostrarFormulario && (
                <div>
                    <button 
                    onClick={()=>{
                        setMostrarFormulario(true);                        
                        }
                    }
                    className="btn btn-primary">
                        Nuevo
                    </button>
                </div>
            )}
            {mostrarFormulario && (
                <div>
                    <div className="input-group mb-1">
                        <span className="input-group-text fs-6">
                            Marca:
                        </span>
                        <input
                        name="marca"
                        // onChange={handleChange}
                        type="text"
                        className="form-control"
                        placeholder="Marca del equipo"
                        aria-label="marca"
                        aria-describedby="marca"
                        value={computadora.marca}
                        />
                    </div>
                    <div className="input-group mb-1">
                        <span className="input-group-text fs-6">
                            Modelo:
                        </span>
                        <input
                        name="modelo"
                        // onChange={handleChange}
                        type="text"
                        className="form-control"
                        placeholder="Modelo del equipo"
                        aria-label="modelo"
                        aria-describedby="modelo"
                        value={computadora.modelo}
                        />
                    </div>
                    <div className="input-group mb-1">
                        <span className="input-group-text fs-6">
                            Serie:
                        </span>
                        <input
                        name="serie"
                        // onChange={handleChange}
                        type="text"
                        className="form-control"
                        placeholder="Serie del equipo"
                        aria-label="serie"
                        aria-describedby="serie"
                        value={computadora.serie}
                        />
                    </div>
                    <div className="input-group mb-1">
                        <span className="input-group-text fs-6">
                            Procesador:
                        </span>
                        <input
                        name="serie"
                        // onChange={handleChange}
                        type="text"
                        className="form-control"
                        placeholder="Procesador del equipo"
                        aria-label="procesador"
                        aria-describedby="procesador"
                        value={computadora.procesador}
                        />
                    </div>
                    <div className="input-group mb-1">
                        <span className="input-group-text fs-6">
                            Almacenamiento:
                        </span>
                        <input
                        name="serie"
                        // onChange={handleChange}
                        type="text"
                        className="form-control"
                        placeholder="Almacenamiento del equipo"
                        aria-label="discoDuro"
                        aria-describedby="discoDuro"
                        value={computadora.discoDuro}
                        />
                    </div>
                    <div className="input-group mb-1">
                        <span className="input-group-text fs-6">
                            RAM:
                        </span>
                        <input
                        name="ram"
                        // onChange={handleChange}
                        type="text"
                        className="form-control"
                        placeholder="RAM del equipo"
                        aria-label="ram"
                        aria-describedby="ram"
                        value={computadora.ram}
                        />
                    </div>
                    <div className="input-group mb-1">
                        <span className="input-group-text fs-6">
                            Windows:
                        </span>
                        <input
                        name="windows"
                        // onChange={handleChange}
                        type="text"
                        className="form-control"
                        placeholder="windows del equipo"
                        aria-label="windows"
                        aria-describedby="windows"
                        value={computadora.windows}
                        />
                    </div>
                    <div className="input-group mb-1">
                        <span className="input-group-text fs-6">
                            Paticiones:
                        </span>
                        <input
                        name="particiones"
                        // onChange={handleChange}
                        type="text"
                        className="form-control"
                        placeholder="Particiones del equipo"
                        aria-label="particiones"
                        aria-describedby="particiones"
                        value={computadora.particiones}                        
                        />
                    </div>
                    <div className="input-group mb-1">
                        <span className="input-group-text fs-6">
                            DVD:
                        </span>
                        <input
                        name="dvd"
                        // onChange={handleChange}
                        type="text"
                        className="form-control"
                        placeholder="DVD del equipo"
                        aria-label="dvd"
                        aria-describedby="dvd"
                        value={computadora.dvd}
                        />
                    </div>
                    <div className="input-group mb-1">
                        <span className="input-group-text fs-6">
                            Velocidad:
                        </span>
                        <input
                        name="serie"
                        // onChange={handleChange}
                        type="text"
                        className="form-control"
                        placeholder="Velocidad del equipo"
                        aria-label="velocidad"
                        aria-describedby="velocidad"
                        value={computadora.velocidad}
                        />
                    </div>
                    <div className="input-group mb-1">
                        <span className="input-group-text fs-6">
                            Antivirus:
                        </span>
                        <input
                        name="serie"
                        // onChange={handleChange}
                        type="text"
                        className="form-control"
                        placeholder="Antivirus del equipo"
                        aria-label="antivirus"
                        aria-describedby="antivirus"
                        value={computadora.antivirus}
                        />
                    </div>
                    <div className="input-group mb-1">
                        <span className="input-group-text fs-6">
                            Office:
                        </span>
                        <input
                        name="office"
                        // onChange={handleChange}
                        type="text"
                        className="form-control"
                        placeholder="Office del equipo"
                        aria-label="office"
                        aria-describedby="office"
                        value={computadora.office}
                        />
                    </div>
                    <div className="input-group mb-1">
                        <span className="input-group-text fs-6">
                            Certificación:
                        </span>
                        <input
                        name="serie"
                        // onChange={handleChange}
                        type="text"
                        className="form-control"
                        placeholder="Procesador del equipo"
                        aria-label="procesador"
                        aria-describedby="procesador"
                        value={computadora.procesador}
                        />
                    </div>
                    <div className="input-group mb-1">
                        <span className="input-group-text fs-6">
                            Tipo Batería:
                        </span>
                        <input
                        name="bateria"
                        // onChange={handleChange}
                        type="text"
                        className="form-control"
                        placeholder="Tipo del batería del equipo"
                        aria-label="bateria"
                        aria-describedby="bateria"
                        value={computadora.bateria}
                        />
                    </div>
                    <div className="input-group mb-1">
                        <span className="input-group-text fs-6">
                            Fecha de Compra:
                        </span>
                        <input
                        name="fecha1"
                        // onChange={handleChange}
                        type="date"
                        className="form-control"
                        aria-label="fecha1"
                        aria-describedby="fecha1"
                        value={computadora.fecha1}
                        />
                    </div>
                    <div className="input-group mb-1">
                        <span className="input-group-text fs-6">
                            Prioridad de compra:
                        </span>
                        <input
                        name="compraPriori"
                        // onChange={handleChange}
                        type="text"
                        placeholder="Prioridad de compra del equipo"
                        className="form-control"
                        aria-label="compraPriori"
                        aria-describedby="compraPriori"
                        value={computadora.compraPriori}
                        />
                    </div>
                    <div>
                        {editar ?
                        <div>
                            <button
                            className="btn btn-success"
                            onClick={update}
                            >
                                Actualizar
                            </button>
                        </div>
                        :
                        <button>
                            Registrar
                        </button>
                        }
                    </div>
                </div>
            )}
            {/**Listar equipos */}
            {loading ? <p>Cargando equipos</p>:(
                <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>
                                    Marca
                                </th>
                                <th>
                                    Modelo
                                </th>
                                <th>
                                    Serie
                                </th>
                                <th>
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {computadoraslist.map((val)=>(
                                <tr key={val.id}>
                                    <td>{val.marca}</td>
                                    <td>{val.modelo}</td>
                                    <td>{val.serie}</td>
                                    <td>
                                        <div 
                                        className="d-grid gap-2 d-md-block"
                                        >
                                            <button
                                            type="button"
                                            className="btn btn-dark"
                                            onClick={()=>editarEquipo}
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
export default Computadoras;