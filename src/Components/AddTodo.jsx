import { addDoc, collection } from "firebase/firestore";
import { useState } from "react"
import { db } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import { green } from '@mui/material/colors';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';



function AddTodo({setDisplayTodos, loggedUser, handleClose,openModal}) {
  const [todo,setTodo] = useState("")
  const [todoPriority, setTodoPriority] = useState("")

  const navigate = useNavigate()
  const handleAddNewTodo = async () => {
  if(!loggedUser){
    navigate("/login")
  }else{
     try {
      if(todo !== ""){
        const docRef = await addDoc(collection(db, loggedUser.uid), {
          todo: todo,    
          priority: todoPriority
        });
        setDisplayTodos(curr => !curr)

        }else{
        alert("Add a task desription!")
      }
      } catch (e) {
        alert("Something went wrong! Please try again!")
      }
    }
  }
  const handleInputField = (event) => {
     setTodo(event.target.value)
  }
  return (
    <Dialog open={openModal}
            onClose={handleClose}>
      <DialogTitle>Add new task  </DialogTitle>
      <DialogContent sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>

      <TextField   margin="dense" sx={{  maxWidth: '30ch', marginBottom:2  }} id="Add new task" label="Add new task" variant="outlined" onChange={event => handleInputField(event)}/>
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