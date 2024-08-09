import './App.css'
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM  from 'react';
import Usuarios from './Usuarios';
import Computadoras from './Computadoras';



function App() {
  const [view, setView]=useState('');
  
  return(
    <div className = 'container' >
      <div className="d-flex">
        <div className="sidebar p-2">
          <ul className="btn-group-vertical list-unstyled" role="group">
            <li className="btn btn-dark">
                Menu
            </li>
            <li className="btn btn-secondary">
              <a onClick={()=>setView('usuarios')}>
                Usuarios
              </a>
            </li>
            <li className="btn btn-secondary">
              <a onClick={()=>setView('computadoras')}>
                Computadoras
              </a>
            </li>
          </ul>
        </div>
        <div className="conten p-3">
          {view ==='usuarios' && (
            <>
              <Usuarios />
            </>
          )}
          {view === 'computadoras' && 
          <>
           <Computadoras />
          </>
          }
        </div>
      </div>
    </div>
  )
}

export default App;
