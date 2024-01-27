import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { red } from '@mui/material/colors';
import './Todo.css'

function Todo({todoData,onClick}) {
 
  return (
    <div className="todo" key={todoData.id}>
      <p>{todoData.todo}</p>
     <DeleteOutlineOutlinedIcon onClick={onClick} sx={{ color: red[300] }}/>
    </div>
  )
}

export default Todo