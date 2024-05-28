import { useState, useEffect } from 'react';
import { fetchTodos, updateTodo, deleteTodo } from '../lib/api';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useAuth } from '../context/AuthContext';
import Todo from './Todo';

const TodoList = () => {
    const { todos, setTodos } = useAuth();
    const [openToolKit, setOpenToolkit] = useState(false);
    const toggleToolkit = () => setOpenToolkit(!openToolKit);
    const [localTodos,setLocalTodos] = useState(todos);
    let arr = todos;
    const loadTodos = async () => {
        const data = await fetchTodos();
        setTodos(data);
        setLocalTodos(data);
        console.log(todos)
    };
    useEffect(() => {
        loadTodos();
    }, []);

    const handleUpdateTodo = async (id, done) => {
        await updateTodo(id, { done }, token);
        setTodos(todos.map(todo => (todo.id === id ? { ...todo, done } : todo)));
    };

    const handleDeleteTodo = async (id) => {
        await deleteTodo(id);
        setTodos(todos.filter(todo => todo.id !== id));
    };
    const sortByCompleted = async () => {
        setLocalTodos(()=>{
            let arr = todos;
            arr = todos.filter((todo) => todo.completed == true);
            return arr;
        })
    };
    const sortByPending = async () => {
        setLocalTodos(()=>{
            let arr = todos;
            arr = todos.filter((todo) => todo.completed == false);
            return arr;
        })
    };
    const getAll = () => {
        setLocalTodos(todos);
    }

    return (
        <div className=''>
            <div className='w-full h-full flex flex-row justify-center items-center gap-2'>
                <button className='rounded-2xl bg-white text-sm text-black border-2 p-1 px-3 border-white' onClick={getAll}>All</button>
                <div
                    class="h-[2em] w-[2px] self-stretch border-t-0 bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-white lg:block" />
                <button className='rounded-2xl bg-white text-sm text-black border-2 p-1 px-2 border-white' onClick={sortByCompleted}>Completed</button>
                <div
                    class="h-[2em] w-[2px] self-stretch border-t-0 bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-white lg:block" />

                <button className='rounded-2xl bg-white text-sm text-black border-2 p-1 px-2 border-white' onClick={sortByPending}>Pending</button>
                <div
                    class="h-[2em] w-[2px] self-stretch border-t-0 bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-white lg:block" />
                <div className='relative rounded-2xl bg-white text-sm text-black border-2 p-1 pl-3 border-white flex flex-row items-center gap-1' onClick={toggleToolkit}>
                    <span className=''>Sort By</span>
                    {
                        openToolKit ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />
                    }

                    {
                        openToolKit &&
                        <div className='absolute flex flex-col w-[100px] bg-white rounded left-[-8px] top-[35px] z-10 shadow-lg border border-black'>
                            <div className='p-2 text-black hover:bg-black hover:text-white hover:font-semibold'>Due Date</div>
                            <div className='p-2 text-black hover:bg-black hover:text-white hover:font-semibold'>Priority</div>
                        </div>
                    }
                </div>
            </div>
            <div className='mt-4 w-full h-full flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center'>
                {localTodos.map((todo) => (
                    <Todo key={todo.id} title={todo.title} desc={todo.description} isCompleted={todo.completed} id={todo.id} onDelete={handleDeleteTodo} onEdit={handleUpdateTodo} setTodos={setTodos} />
                ))}
            </div>
        </div>


    );
};

export default TodoList;