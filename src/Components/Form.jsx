import { useEffect, useState } from "react"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { app } from "../../firebase-config"
import { useNavigate } from "react-router-dom";
import { Alert, Button, TextField } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { blue } from "@mui/material/colors";

import './Form.css'

function Form({title}) {

  const [email,setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [alert,setAlert] = useState(false)
  const navigate = useNavigate()
  const auth = getAuth(app)

  useEffect(() => {
    onAuthStateChanged(auth,(user) =>{
      if(user) navigate("/")
       console.log(user)
    })
  
  },[])
  const handleAction = () => {
  
console.log(alert)
    if(title === "registration"){
      createUserWithEmailAndPassword(auth,email,password)
        .then(userCredential => {
          const user = userCredential.user
          console.log(user)
          navigate('/login')
        })
        .catch(err => {
          console.log(err)
        })
      }
      if(title === "login"){
        signInWithEmailAndPassword(auth,email,password)
        .then(userCredential => {
          
          const user = userCredential.user
          console.log(user)
          navigate('/')
        })
        .catch(err => {
        if(err) setAlert(true)
        })
    }
  }

  return (
    alert
    ?
    <Alert severity="error" onClose={() => {setAlert(false)}}>Invalid e-mail or password!</Alert>
    :
    <div className="form">
      <CheckCircleOutlineIcon sx={{fontSize:80, color:blue[500]}}/>
      <h4>To Do App</h4>
      <form >
        <div className="emailForm">
          <TextField  sx={{  width: '30ch',marginBottom:3 }} id="email" label="E-mail" variant="outlined" onChange={event => setEmail(event.target.value)}/>
        </div>
        <div className="passwordForm">
          <TextField sx={{  width: '30ch' , marginBottom:3}} type="password" id="password" label="Password" variant="outlined" onChange={event => setPassword(event.target.value)}/> 
        </div>
        <Button variant="contained" type="button" sx={{  marginBottom:3}} onClick={handleAction}>{title}</Button>
      </form>
      {title === "login"
      ?
        
        <Button variant="text"  onClick={() => navigate("/registration")}>Don't have an account? Sign up!</Button>
      :
        <Button variant="text" onClick={() => navigate("/login")}>Login</Button>
      }
    </div>
  )
}

export default Form