import { useEffect, useState } from "react"; 
import { retrieveAllTodosForUser, deleteTodoForUser } from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import {useNavigate } from "react-router-dom";

export default function ShowTodos() {

    const [todos, setTodos] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const authContext = useAuth();
    const userName = authContext.username;
    const navigate = useNavigate();

    useEffect(
        () => {retrieveTodos()}, []
    )

    function retrieveTodos() {
        retrieveAllTodosForUser(userName)
        .then(response => {
            setTodos(response.data) 
        })
        .catch(error => console.log('response  : ', error));
    }

    function deleteTodo (id) {
        console.log("called ", id)
        deleteTodoForUser(userName, id)
        .then(
            () => {
                setSuccessMessage(`Delete of todo with id ${id} is successful`);
                retrieveTodos();
            }
        )
        .catch(error => console.log('response  : ', error));
    }

    function updateTodo (id) {
        navigate(`/todo/${id}`);
    }

    function addNewTodo() {
        navigate(`/todo/-1`);
    }

    return (
        <div className="showTodos container">
            <h1>Show All Todos </h1>
            {successMessage && <div className="alert alert-warning">{successMessage}</div>}
            <div>
               
                <table className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Is Done?</th>
                            <th>Target Date</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map(todo =>
                            <tr className={todo.id} key={todo.id}>
                                <td>{todo.description}</td>
                                <td>{todo.done.toString()}</td>
                                <td>{todo.targetDate.toString()}</td>
                                <td><button className="btn btn-warning" onClick={() => deleteTodo(todo.id)}> Delete</button></td>
                                <td><button className="btn btn-success" onClick={() => updateTodo(todo.id)}> Update</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="btn btn-success m-5" onClick={addNewTodo}>Add new Todo</div>
            </div>
        </div>
    );
}