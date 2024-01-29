import { addDoc, collection } from "firebase/firestore";
import { useState } from "react"
import { db } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import { green } from '@mui/material/colors';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {  DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';


function AddTodo({setDisplayTodos, loggedUser, handleClose}) {
  const [todo,setTodo] = useState("")
  const [todoPriority, setTodoPriority] = useState("")
  const navigate = useNavigate()
  const handleAddNewTodo = async () => {
  if(!loggedUser){
    navigate("/login")
  }else{
     try {
        const docRef = await addDoc(collection(db, loggedUser.uid), {
          todo: todo,    
          priority: todoPriority
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

      <TextField   margin="dense" sx={{  maxWidth: '30ch', marginBottom:2  }} id="Add new task" label="Add new task" variant="outlined" onChange={event => setTodo(event.target.value)}/>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="priority">Priority</InputLabel>
        <Select
          labelId="priority"
          id="priority"
          value={todoPriority}
          onChange={(event) => setTodoPriority(event.target.value)}
          label="Priority"
        >
          
          <MenuItem value={"High"}>High priority</MenuItem>
          <MenuItem value={"Neutral"}>Neutral</MenuItem>
          <MenuItem value={"Low"}>Low-priority</MenuItem>
        </Select>
      </FormControl>
      <AddCircleOutlineIcon sx={{ color: green[700], fontSize:50,  "&:hover": { cursor: "pointer"} }} onClick={() => {
        handleAddNewTodo()
        handleClose()}}/>

      </DialogContent>


    </Dialog>
  )
}

export default AddTodo