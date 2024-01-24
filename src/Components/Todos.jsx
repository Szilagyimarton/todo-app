import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useEffect, useState } from "react";


function Todos() {
  const [todos,setTodos] = useState([])
 
  useEffect(() => {
    getDocs(collection(db,"todos"))
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data())
        setTodos(data)
      })
  },[])


  return (
    <div>
      {todos && todos.map((todoData,index) => <p key={index}>{todoData.todo}</p>)}
  
    </div>
  )
}

export default Todos