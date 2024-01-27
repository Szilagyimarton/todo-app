import { collection,  deleteDoc,  doc,  getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useEffect, useState } from "react";
import Todo from "./Todo";



function Todos({displayTodos,setDisplayTodos,loggedUser}) {
  const [todos,setTodos] = useState([])
  console.log(todos)
 
  useEffect(() => {
    getDocs(collection(db,loggedUser.uid))
      .then(querySnapshot => {
        const data = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
        setTodos(data)
      
      })
  },[displayTodos])
  const handleDelete = (id) => {
    const docRef = doc(db,loggedUser.uid,id)
    deleteDoc(docRef).then(() => console.log("deleted"))
    setDisplayTodos(curr => !curr)

  }
 

  return (
    <div className="todos">
      {todos && todos.map((todoData,index) => <Todo key={index} todoData={todoData} onClick={() => handleDelete(todoData.id)} />)}
  
    </div>
  )
}

export default Todos