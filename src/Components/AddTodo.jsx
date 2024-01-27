import { addDoc, collection } from "firebase/firestore";
import { useState } from "react"
import { db } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import { green } from '@mui/material/colors';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {  DialogTitle, TextField } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

function AddTodo({setDisplayTodos, loggedUser, handleClose}) {
  const [todo,setTodo] = useState("")
  const navigate = useNavigate()
  const handleAddNewTodo = async () => {
  if(!loggedUser){
    navigate("/login")
  }else{
     try {
        const docRef = await addDoc(collection(db, loggedUser.uid), {
          todo: todo,    
          
        });
        console.log("Document written with ID: ", docRef.id);
        setDisplayTodos(curr => !curr)
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  }

  return (
    <Dialog open={open}
    onClose={handleClose}>
      <DialogTitle>Add new task  </DialogTitle>
      <DialogContent sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>

      <TextField   margin="dense" sx={{  width: '30ch'  }} id="Add new task" label="Add new task" variant="outlined" onChange={event => setTodo(event.target.value)}/>
      <AddCircleOutlineIcon sx={{ color: green[500]}} onClick={handleAddNewTodo}/>

      </DialogContent>


    </Dialog>
  )
}

export default AddTodo