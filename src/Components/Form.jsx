import { useEffect, useState } from "react"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { app } from "../../firebase-config"
import { useNavigate } from "react-router-dom";

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
    <div>
      <h1>{title}</h1>
      <form>
        <label htmlFor="email">E-mail address</label>
        <input type="email" id="email" name="email" onChange={event => setEmail(event.target.value)}/> 
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" onChange={event => setPassword(event.target.value)}/>
        <button type="button" onClick={handleAction}>{title}</button>
      </form>
      {title === "login"
      ?
        <button onClick={() => navigate("/registration")}>Go to Registration</button>
      :
        <button onClick={() => navigate("/login")}>Go to Login</button>
      }
    </div>
  )
}

export default Form