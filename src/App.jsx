import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons"
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './App.css'

function App() {
  const [title,setTitle]=useState('');
  const [estimation,setEstimation]=useState('');
  const [description,setDescription]=useState('')

  const [todos,setTodos]=useState([])
  const [editIndex,setEditIndex]=useState(null);


  //localstorage
  useEffect(()=>{
    const storeData=JSON.parse(localStorage.getItem('todos'));
    setTodos(storeData);
  },[]);

  //save todo to localstorage
  useEffect(()=>{
    localStorage.setItem('todos',JSON.stringify(todos));
  },[todos])

  const newTodo={title,estimation,description,}

  const AddTodo=()=>{
    setTodos([...todos,newTodo])
    setTitle('')
    setEstimation('')  
    setDescription('')
  
  };
  // const editTodo=(index)=>{
  //   console.log(index);
  //   setEditIndex(index)
  // }

  const editTodo = (index) => {
    console.log("Index value",index);

    const set=setEditIndex(index); // Set the edit mode to true for the selected todo

    console.log(set)

    const todoToEdit = todos[index];
    console.log("Edit Index value", todoToEdit)

    setTitle(todoToEdit.title);
    setEstimation(todoToEdit.estimation);
    setDescription(todoToEdit.description);
  };


  const saveEdit = () => {
    const updatedTodos = [...todos];
    updatedTodos[editIndex] = { title, estimation, description }; // Update the specific todo
    setTodos(updatedTodos);
   
    setTitle('');
    setEstimation('');
    setDescription('');
  };

  const deleteTodo=(index)=>{
    // const updateTodos=todos.filter((todo,todoIndex)=>todoIndex!==index);
    const updateTodos = todos.filter((todo, todoIndex) => {
      console.log(todoIndex)
      if (todoIndex === index) {
        //delete
        console.log('Deleting todo:', todo);  
      }
      return todoIndex !== index;
    });
    
    console.log(updateTodos);
    setTodos(updateTodos);
  }


 return(
  <>
  <div className='containerOne'>
    <div className='sub-container'>
        <h1>ADD TODO</h1>
        <hr className='line' />

        <input type="text" placeholder='Title' value={title} onChange={(e)=>setTitle(e.target.value)}/><br /><br />
        <input type="number" placeholder='Estimation(hrs)' value={estimation} onChange={(e)=>setEstimation(e.target.value)}/><br /><br />
        <input type="text" placeholder='Description' value={description} onChange={(e)=>setDescription(e.target.value)}/><br /><br />

        <button className='bttnAdd' onClick={editIndex !== null ? saveEdit : AddTodo} >ADD</button> 
    </div>

    <div className='containerTwo'>
      <h1>TODO LIST</h1>
      <hr className='line'/>

      {todos.map((todo, index) => (
      <div className='font-container'>
        <input type="text" placeholder='' key={index}  value={`${todo.title} - ${todo.estimation} hrs - ${todo.description}`} />
        <div className='edit'>
      <FontAwesomeIcon icon={faPenToSquare} onClick={() => editTodo(index)} />
    </div>
    <div className='trash'>
      <FontAwesomeIcon icon={faTrash} onClick={()=>deleteTodo(index)}/>
    </div>
  </div>
))}
    </div>
  </div>
  </>
 )
}

export default App

