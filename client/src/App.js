import './App.css';
import { useState } from "react";
import Axios from "axios";

function App() {
  const [nombre,setNombre]= useState("");
  const [edad,setEdad]= useState(0);
  const [pais,setPais]= useState("");
  const [cargo,setCargo]= useState("");
  const [anios,setAnios]= useState(0);

  const [empleadosList, setEmpleados]= useState([]);
  
  const add = ()=>{
    Axios.post("http://localhost:3000/api/v1/users/",{
      nombre:nombre,
      pais:pais,
      edad:edad,
      anios:anios,
      cargo:cargo
    }).then(()=>{
      alert("Usuario Creado con éxito");
    })
  }

  const getEmpleados = ()=>{
    Axios.get("http://localhost:3000/api/v1/users").then((response)=>{
      setEmpleados(response.data);
    })
  }

  return (
    <div className="App">
      <div className = "datos" >
        <label>Nombre:<input 
        onChange={(event)=>{
          setNombre(event.target.value)
        }}
        type="text"></input></label>        
        <label>Edad:<input 
        onChange={(event)=>{
          setEdad(event.target.value)
        }}
        type="number"></input></label>        
        <label>Pais:<input 
        onChange={(event)=>{
          setPais(event.target.value)
        }}
        type="text"></input></label>       
        <label>Cargo:<input 
        onChange={(event)=>{
          setCargo(event.target.value)
        }}
        type="text"></input></label>
        <label>Años:<input 
        onChange={(event)=>{
          setAnios(event.target.value)
        }}
        type="number"></input></label>

        <button onClick={add}>Registrar</button>
      </div>
        <div className='lista'>
          <button onClick={getEmpleados}>Listar</button>
          {            
            empleadosList.map((val,key)=>{
              return <div className=''>{val.nombre}</div>
            })
          }
        </div>
    </div>
  );
}

export default App;
