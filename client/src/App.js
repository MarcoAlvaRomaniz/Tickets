import './App.css';
import { useState } from "react"
import Axios from "axios";



function App() {
  const [nombre,setNombre]= useState("");
  const [edad,setEdad]= useState(0);
  const [pais,setPais]= useState("");
  const [cargo,setCargo]= useState("");
  const [anios,setAnios]= useState(0);

  const add = () =>{
    Axios.post("https://3000-idx-tickets-1720194196165.cluster-vyr53kd25jc2yvngldrwyq6zc4.cloudworkstations.dev/api/v1/users/",{
      nombre:nombre,
      edad:edad,
      pais:pais,
      cargo:cargo,
      anios:anios
    }).then(()=>{
      alert("Empleado registrado");
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
    </div>
  );
}

export default App;
