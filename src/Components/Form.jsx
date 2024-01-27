import { useEffect, useState } from "react"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { app } from "../../firebase-config"
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";

import './Form.css'

function Form({title}) {

  const [email,setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const auth = getAuth(app)

  useEffect(() => {
    onAuthStateChanged(auth,(user) =>{
      if(user) navigate("/")
       console.log(user)
    })
  
  },[])
  const handleAction = () => {
  

    if(title === "registration"){
      createUserWithEmailAndPassword(auth,email,password)
        .then(userCredential => {
          const user = userCredential.user
          console.log(user)
          navigate('/login')
        })
        .catch(error => console.log(error))
    }
    if(title === "login"){
      signInWithEmailAndPassword(auth,email,password)
        .then(userCredential => {
          const user = userCredential.user
          console.log(user)
          navigate('/')
        })
    }
  }

  return (
    <div className="form">
      <h1>{title}</h1>
      <form >
        <div className="emailForm">
          <label htmlFor="email">E-mail address</label>
          <TextField  sx={{  width: '30ch' }} id="email" label="E-mail" variant="outlined" onChange={event => setEmail(event.target.value)}/>
          
        </div>
        <div className="passwordForm">
          <label htmlFor="password">Password</label>
          <TextField sx={{  width: '30ch' }} id="password" label="Password" variant="outlined" onChange={event => setPassword(event.target.value)}/>
         
        </div>
        <button type="button" onClick={handleAction}>{title}</button>
      </form>
      {title === "login"
      ?
        <Button variant="outlined"  onClick={() => navigate("/registration")}>Go to Registration</Button>
      :
        <Button variant="outlined" onClick={() => navigate("/login")}>Go to Login</Button>
      }
    </div>
  )
}

export default Form