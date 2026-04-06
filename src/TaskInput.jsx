import {useEffect, useState } from 'react'
function TaskInput(){
    const [tasks, setTasks] = useState(() => {
          const tasks =  JSON.parse(localStorage.getItem("tasks")) ;
          return tasks || [] ;
    });
    const [newTask, setNewTask] = useState("");
    const [filter , setFilter] = useState("all");
  
    useEffect(()=>{
     localStorage.setItem("tasks" ,JSON.stringify(tasks));
   
    },[tasks]);
   

     function input(event){
     setNewTask(event.target.value);
     }
     
  
      function AddTask(){

      
        const taskObjct = {
            id: crypto.randomUUID(),
            title : newTask,
            completed : false,
            created_at: new Date().toLocaleString()
        }
        if(taskObjct.title === ""){
          setNewTask("");
          return;
        }
         const lasttasks = [...tasks, taskObjct]
        
         setTasks(lasttasks);
         setNewTask("");

      
     }
     function DeletTask(id){
      const updateTasks = task_f.filter((task) => task.id !== id);
      setTasks(updateTasks);

     }
     function Completed(id){
      
     const updateTask = tasks.map((task) => task.id == id ? {...task, completed :true} :task);
     setTasks(updateTask);

     }
     
    const task_f = tasks.filter((task)=>{
           if(filter === "completed") return task.completed == true
           if(filter === "pending") return task.completed == false 
           return true;
     });
      
    
     
return(
    <>
  <div className='tasks'>
           <h1>Tasks</h1>
            <div>
                  <input type="text" value={newTask} onChange={input} placeholder=' Add task'required/>
                  <button className='add-button' onClick={AddTask}>Add Taske</button>
                  <button className='add-button' onClick={() => setFilter("All")}>All Tasks</button>
                  <button className='add-button' onClick={() => setFilter("completed")}>Taske completed</button>
                  <button className='add-button' onClick={() => setFilter("pending")}>Taske pending</button>
            </div>
        </div>
        <ol>
          {task_f.length > 0 ?
             ( task_f.map((task,index)=>
               <li key={index}>
                     <p className={task.completed === true  ? "completed" : "tasks"}>Title:<br/><h2>{task.title}</h2><br/>Created_at:<br/>{task.created_at}</p>
                     <button className='delete' onClick={()=>DeletTask(task.id)}>Delete</button>
                     <button onClick={()=>Completed(task.id)}>Completed</button>
               </li>
          )) : <p className='empty'>Empty</p>}
        </ol>
   </>
)
   
}

export default TaskInput;
















  // <ol>
  //         {task_f.map((task,index)=>
  //              <li key={index}>
  //                    <p className={task.completed === true  ? "completed" : "tasks"}>Title:<br/><h2>{task.title}</h2><br/>Created_at:<br/>{task.created_at}</p>
  //                    <button className='delete' onClick={()=>DeletTask(task.id)}>Delete</button>
  //                    <button onClick={()=>Completed(task.id)}>Completed</button>
  //              </li>
  //         )}
  //       </ol>