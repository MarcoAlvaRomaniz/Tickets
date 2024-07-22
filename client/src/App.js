import './App.css';
import {useState} from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import Usuarios from './Usuarios';
import Computadoras from './Compuradoras';
import Tickets from './Tickets';

function App() {
  const [view, setView] = useState('computadoras');
  return(
    <div className="container">
      <div className='d-flex'>
        <div className='sidebar p-2'>
          
          <ul className="btn-group-vertical list-unstyled" rol="group" aria-label="Vertical button group">
          <li className="btn btn-dark">Menu</li>
          <li className="btn btn-secondary"><a onClick={() => setView('usuarios')}>Usuarios</a></li>
          <li className="btn btn-secondary"><a onClick={() => setView('computadoras')}>Computadoras</a></li>
          <li className="btn btn-secondary"><a onClick={()=> setView('tickets')}>Tickets</a></li>
          </ul>
        </div>
        <div className='conten p-3'>
          {view === 'usuarios' && <Usuarios />}
          {view === 'computadoras' && <Computadoras />}
          {view === 'tickets' && <Tickets/ > }
        </div>
      </div>
    </div>
  )
}

export default App;

