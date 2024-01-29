import { collection,  deleteDoc,  doc,  getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useEffect, useState } from "react";
import Todo from "./Todo";



function Todos({displayTodos,setDisplayTodos,loggedUser}) {
  const [todos,setTodos] = useState([])
  const [clickedToDel,setClickedToDel] = useState(false)
  const [clickedToDelID,setClickedToDelID] = useState("") 



  useEffect(() => {
    getDocs(collection(db,loggedUser.uid))
      .then(querySnapshot => {
        const data = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
        setTodos(data)
      
      })
  },[displayTodos,clickedToDel])
  const handleDelete = (id) => {
    const docRef = doc(db,loggedUser.uid,id)
    deleteDoc(docRef).then(() => {
      console.log("deleted")
      setDisplayTodos(curr => !curr)
      setClickedToDel(false)
      
    })

  }
  

  return (
    <div className="todos">
      {todos && todos.map((todoData,index) => <Todo clickedToDel={clickedToDel} clickedToDelID={clickedToDelID} key={index} todoData={todoData} onChange={() =>{
        setClickedToDel(true)
        setClickedToDelID(todoData.id)
        setTimeout(() => {
          handleDelete(todoData.id)
        },1000) 

      }
        } />)}
  
    </div>
  )
}

export default Todos