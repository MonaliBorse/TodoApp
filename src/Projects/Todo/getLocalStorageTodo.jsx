const todoKey= "reactTodo";


export const getLocalStorageTodo = () =>{
    const rawTodos= localStorage.getItem(todoKey)

        if(!rawTodos) return []

        return JSON.parse(rawTodos);}

export const setLocalStorageTodo = (task) => {
        localStorage.setItem(todoKey, JSON.stringify(task)
    )}