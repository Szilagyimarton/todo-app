import {useState} from "react"
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import Form from './Components/Form'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Switch from '@mui/material/Switch';


function App() {
  const [toggleDarkMode, setToggleDarkMode] = useState(true);
  const darkTheme = createTheme({
    palette: {
      mode: toggleDarkMode ? 'light' : 'dark', 
    },
  });
  const toggleDarkTheme = () => {
    setToggleDarkMode(!toggleDarkMode);
  };
  return (
    <>
      <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <div className="switchMode">
        <Switch checked={toggleDarkMode} onChange={toggleDarkTheme} />
      </div>
      <Routes  >
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Form title="login"/>}/>
        <Route path='/registration' element={<Form title="registration"/>}/>
      </Routes>

      </ThemeProvider>
    </>
  )
}

export default App
