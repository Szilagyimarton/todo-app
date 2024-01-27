import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { app } from "../../firebase-config"
import AddTodo from "./AddTodo"
import Todos from "./Todos"
import { Button } from "@mui/material"
import LogoutIcon from '@mui/icons-material/Logout';
import { green } from '@mui/material/colors';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { AlignHorizontalCenter } from "@mui/icons-material"


function Home() {

  const [loggedUser,setLoggedUser] = useState(null)
  const [displayTodos,setDisplayTodos] = useState(false)
  const [openModal,setOpenModal] = useState(false)
  const navigate = useNavigate()
  const auth = getAuth(app)
  useEffect(() => {
    onAuthStateChanged(auth,(user) =>{
      if(!user) navigate("/login")
      else{
       setLoggedUser(user)
        navigate("/")
        console.log(user)
      }
    })
  
  },[])

  const handleSignOut = () => {
    signOut(auth)
  }

  const handleModal = () => {
    setOpenModal(true)
  }

  const handleClose = () => {
    setOpenModal(false)
  }
  
console.log(openModal)
  return (
   loggedUser && <div className="home">
      <div className="signOut"><Button variant="outlined"  endIcon={<LogoutIcon/>} onClick={handleSignOut}></Button></div>
      <h1>To Do App</h1>
      <Todos displayTodos={displayTodos} setDisplayTodos={setDisplayTodos} loggedUser={loggedUser}/>
      {!openModal ? <AddCircleOutlineIcon fontSize="large" sx={{ color: green[800]}} onClick={() => handleModal()}/> : <AddTodo handleClose={handleClose} setDisplayTodos={setDisplayTodos} loggedUser={loggedUser}/>}

    </div>
  )
}

export default Home