function Todo({todoData,onClick}) {
 
  return (
    <div className="todo" key={todoData.id}>
      <h1>{todoData.todo}</h1>
      <button onClick={onClick}>Delete</button>
    </div>
  )
}

export default Todo