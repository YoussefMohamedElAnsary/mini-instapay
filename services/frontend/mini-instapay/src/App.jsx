
import {BrowserRouter as Router, Route, Routes , Navigate} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Signup'
import Welcome  from './pages/Welcome'
import Home from './pages/Home'
import Transactions from './pages/Transactions'
import Settings from './pages/Settings'
import Report from './pages/Report'

function App() {

  return (

    <Router>
      <Routes>
        <Route path='/welcome' element={<Welcome/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/transactions' element={<Transactions/>} />
        <Route path='/settings' element={<Settings/>} />
        <Route path='/report' element={<Report/>} />

      

        <Route path='/' element={<Navigate to="/home"/>} />
        <Route path='*' element={<h1>404 page not found</h1>} />

      </Routes>
    </Router>

  )
}

export default App
