import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { app } from "../../firebase-config"
import AddTodo from "./AddTodo"
import Todos from "./Todos"
import { Box, Button, Paper } from "@mui/material"
import LogoutIcon from '@mui/icons-material/Logout';


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
  

  return (
   loggedUser && <div className="home">
      <div className="signOut"><Button variant="outlined"  endIcon={<LogoutIcon fontSize="small"/>} onClick={handleSignOut}></Button></div>
      <Box  >
        <Paper className="homeContent" elevation={3} sx={{padding:5}}>
          <h3>Hello, {loggedUser.email}!</h3>
          <Box >
          <Todos displayTodos={displayTodos} setDisplayTodos={setDisplayTodos} loggedUser={loggedUser}/>
          </Box>
          {!openModal ? <Button variant="contained" color="success"  sx={{margin:5  }} onClick={() => handleModal()}>Add new task</Button> : <AddTodo handleClose={handleClose} setDisplayTodos={setDisplayTodos} loggedUser={loggedUser}/>}
        </Paper>
      </Box>
    </div>
  )
}

export default Home