
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import Form from './Components/Form'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Form title="login"/>}/>
        <Route path='/registration' element={<Form title="registration"/>}/>
      </Routes>
    </>
  )
}

export default App
