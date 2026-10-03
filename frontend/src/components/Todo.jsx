export const Todo = ({todo}) =>{
    return(
        <>
        <h2>{todo}</h2>
        <button onClick={()=>deleteTodo()}>X</button>
        </>
    )
}
