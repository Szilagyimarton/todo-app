import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { app } from "../../firebase-config"
import AddTodo from "./AddTodo"
import Todos from "./Todos"

function Home() {
  const [displayTodos,setDisplayTodos] = useState(false)
  const navigate = useNavigate()
  const auth = getAuth(app)
  useEffect(() => {
    onAuthStateChanged(auth,(user) =>{
      if(!user) navigate("/login")
      else navigate("/")
      console.log(user)
    })
  
  },[])

  const handleSignOut = () => {
    signOut(auth)
  }
  return (
    <div>
      <button onClick={handleSignOut}>Sign out</button>
      <h1>To Do App</h1>
      <AddTodo setDisplayTodos={setDisplayTodos}/>
      <Todos displayTodos={displayTodos} setDisplayTodos={setDisplayTodos}/>

    </div>
  )
}

export default Home