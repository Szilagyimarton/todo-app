import { addDoc, collection } from "firebase/firestore";
import { useState } from "react"
import { db } from "../../firebase-config";

function AddTodo({setDisplayTodos}) {
  const [todo,setTodo] = useState("")


  const handleAddNewTodo = async () => {
    try {
      const docRef = await addDoc(collection(db, "todos"), {
        todo: todo,    
        
      });
      console.log("Document written with ID: ", docRef.id);
      setDisplayTodos(curr => !curr)
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <div className="addTodo">
      <label htmlFor="addTodo">Add new Task</label>
      <input name="addTdod" id="addTodo" onChange={event =>setTodo(event.target.value)}/>
      <button type="button" onClick={handleAddNewTodo}>Add</button>
    </div>
  )
}

export default AddTodo