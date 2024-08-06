import React, { useState, useEffect}  from "react";
import axios from "axios";
import debounce  from "lodash";
import Swal from 'sweetalert2';

function Usuarios(){
    const [rol, setRol] = useState("");
    const [editar, setEditar] = useState(false);
    
    return(
        <div>
            <h2>
                Gestión de Usuarios
            </h2>
        </div>
    )
}
export default Usuarios;