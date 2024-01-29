import './Todo.css'
import { Paper, Radio } from '@mui/material';


function Todo({todoData,onChange,clickedToDel,clickedToDelID}) {

  return (
    <Paper elevation={4} className="todo" key={todoData.id}>
     <Radio onChange={onChange} />
     {clickedToDel && clickedToDelID === todoData.id ? <p className='clickedToDel'>{todoData.todo}</p> 
     : 
      <>
      <p>{todoData.todo}</p>
      <p>{todoData.priority ==="" ? "N/A" : todoData.priority}</p>
      </>
      }
    </Paper>
  )
}

export default Todo