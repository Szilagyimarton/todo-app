import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { app } from "../../firebase-config"
import AddTodo from "./AddTodo"
import Todos from "./Todos"

function Home() {
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
      <AddTodo/>
      <Todos/>

    </div>
  )
}

export default Home