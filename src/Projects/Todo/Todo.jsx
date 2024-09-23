import { useState } from "react"
import "./Todo.css"
import { TodoFrom } from "./TodoFrom"
import { TodoDateTime } from "./TodoDateTime"
import { TodoList } from "./TodoList"
import { getLocalStorageTodo, setLocalStorageTodo } from "./getLocalStorageTodo"


export const Todo = () =>{
    const[task, setTask]= useState(() => getLocalStorageTodo()) 

      //todo add data to localStorage
      setLocalStorageTodo(task)

    const handleFormSubmit = (inputValue) =>{
        const{id, content, checked}=inputValue
            //to check if the i/p field is empty or not
            if(!content) return

            // if(task.includes(inputValue)) return; //check i/p task ha already present ahe ka nahi //this deal with array

            const ifTodoContentMatched = task.find((curTask) => curTask.content === content ) //this use becz we deal with the object 
            if(ifTodoContentMatched) return;
                
            setTask((prevTask) =>[...prevTask, {id, content, checked}])
    }

    //todo handleDeleteTodo function
    const handleDeleteTodo =(value)=>{
        // console.log(task);
        // console.log(value);

        const updateTask= task.filter((curTask => curTask.content != value))
        setTask(updateTask)    
    }
    //todo handleClearTodoData funtion
    const handleClearTodoData = () =>{
        setTask([])
    }

    //todo handleChckedTodo funtion
    const handleChckedTodo = (content) =>{
        const updateTask= task.map((curTask) =>{
            if(curTask.content === content){
                return{...curTask, checked: !curTask.checked}
            }
            else{
                return curTask
            }
        })
        setTask(updateTask)
    }

    return(
        <section className="todo-container">
            <header>
                <h1>Todo List</h1>
                <TodoDateTime/>
            </header>

                    <TodoFrom onAddTodo={handleFormSubmit}/>

            <section className="myUnOrderList">
                <ul>
                    {
                        task.map((curTask) =>{
                            return(
                               <TodoList 
                                key={curTask.id} 
                                checked={curTask.checked}
                                data={curTask.content}
                                onHandleDeletedTodo = {handleDeleteTodo}
                                onHandleCheckedTodo = {handleChckedTodo}
                               />)
                        })
                    }
                </ul>
            </section>
            <section>
                <button className="clear-btn" onClick={handleClearTodoData}> Clear all</button>
            </section>
        </section>
    )
}