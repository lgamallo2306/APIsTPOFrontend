import { useState } from "react"
import  { Todo }  from "./Todo"

export const Forn = () =>{

    const [estado, setEstado] = useState([])
    const [todo,setTodo] = useState('')

    return(
        <>
        <form>
            <label>Agregar tarea</label><br />
            <input type="text" 
                    name ="todo" />
            <button >Agregar</button>
        </form>
        
        {estado.map((value, index)=>{
                <Todo todo ={value.todo}/>  
            }

        )}
        </>
    )
}

