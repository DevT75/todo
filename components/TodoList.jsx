import { useState, useEffect } from 'react';
import { fetchTodos, updateTodo, deleteTodo } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import Todo from './Todo';

const TodoList = () => {
    const { todos,setTodos } = useAuth();

    useEffect(() => {
        const loadTodos = async () => {
            const data = await fetchTodos();
            setTodos(data);
            console.log(todos)
        };
        loadTodos();
    },[]);

    const handleUpdateTodo = async (id, done) => {
        await updateTodo(id, { done }, token);
        setTodos(todos.map(todo => (todo.id === id ? { ...todo, done } : todo)));
    };

    const handleDeleteTodo = async (id) => {
        await deleteTodo(id);
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div className='w-full h-full grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 '>
                {todos.map((todo) => (
                    <Todo key={todo.id} title={todo.title} desc={todo.description} isCompleted={todo.completed} id={todo.id} onDelete={handleDeleteTodo} onEdit={handleUpdateTodo} setTodos={setTodos}/>
                    // <div key={todo.id} >
                    //     <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
                    //         {todo.title}: {todo.description}
                    //     </span>
                    //     <button onClick={() => handleUpdateTodo(todo.id, !todo.done)}>
                    //         {todo.done ? 'Mark as Undone' : 'Mark as Done'}
                    //     </button>
                    //     <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                    // </div>
                ))}
        </div>

    );
};

export default TodoList;