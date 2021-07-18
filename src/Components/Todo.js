import React, { useEffect, useState } from 'react'

function Todo() {
    //hook for holding all the data
    const [ todos, setTodos ] = useState([]);

    //hook for getting the inout from the input field
    const [ newTodo, setNewTodo ] = useState();

    //function for saving the data into local storage
    const saveData = (newTodos) => {
        localStorage.setItem("tasks", JSON.stringify(newTodos));
    }

    //function for adding the data
    const AddTodo = () => {
        let newTodos =[...todos,{todo:newTodo, id:Date.now()}];
        //updating the tasks list with new task
        setTodos(newTodos);
        //emptying the input field
        setNewTodo("");
        saveData(newTodos);
    }

    //functin for deleting the data
    const deleteTodo = (id) => {
        let newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);

        //removing the data from localstorage
        saveData(newTodos);
    }

    //defining the hook that renders the data instantly when we open the component
    useEffect(() =>{
        if(localStorage.getItem("tasks")){
            setTodos(JSON.parse(localStorage.getItem("tasks")));
        }
    },[])
    return (
        <div className="container">
          <h1 className="text-center display-3">Add Your Tasks</h1>
         <div className="form-group">
             <label>Enter Task:</label>
             <input type="text" value={newTodo} className="form-control"
             onChange={(e) => setNewTodo(e.target.value)} /> 
         </div>
         <div className="form-group">
             <button onClick={AddTodo} className="btn btn-info btn-block">Save Task</button>
         </div>
         <hr />
         <table className="table table-bordered">
             <tr>
                 <th>Task Name</th>
                 <th>Delete</th>
             </tr>
             {
                 todos.map((tod) => (
                     <tr>
                         <td>{tod.todo}</td>
                         <td><button onClick={() => deleteTodo(tod.id)} className="btn btn-danger">X</button></td>
                     </tr>
                 ))
             }
         </table>
        </div>
    )
}

export default Todo
