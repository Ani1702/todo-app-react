import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import './TodoList.css';

export default function TodoList() {
    let [todos, setTodos] = useState([{ task:"sample task", id: uuidv4(), isDone: false }]);
    let [newTodo, setNewTodo] = useState("");

    let addTask = () => {
        setTodos(prevTodos => {
            return [...prevTodos, { task: newTodo, id: uuidv4(), isDone: false }];
        });
        setNewTodo(""); 
    };

    let updateTodoValue = (event) => {
        setNewTodo(event.target.value);
    };

    let deleteTask = (id) => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    };

    let markAsDoneAll = () => {
        setTodos(prevTodos => {
            return prevTodos.map(todo => {
                return {
                    ...todo,
                    isDone: true,
                };
            });
        });
    };

    let markAsDoneOne = (id) => {
        setTodos(prevTodos => {
            return prevTodos.map(todo => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        isDone: true,
                    };
                } else {
                    return todo;
                }
            });
        });
    };

    return (
        <div className="todo-container">
            <h1>Todo-list</h1>
            <input className="todo-input" type="text" placeholder="Add Task" value={newTodo} onChange={updateTodoValue} />
            <button className="todo-button" onClick={addTask}>Add Task</button>
            <hr />
            <h3>Tasks to Do: </h3>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id} className={todo.isDone ? "task-item completed" : "task-item"}>
                        <span className="task-text">{todo.task}</span>
                        <button className="delete-button" onClick={() => deleteTask(todo.id)}>Delete</button>
                        <button className="mark-done-button" onClick={() => markAsDoneOne(todo.id)}>Mark as Done</button>
                    </li>
                ))}
            </ul>
            <button className="mark-all-done-button" onClick={markAsDoneAll}>Mark All as Done</button>
        </div>
    );
}
